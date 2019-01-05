const log = console.log




var cvs = document.getElementById('cvs')
var ctx = cvs.getContext('2d')
var btn = document.getElementById('btn')

/**@type {ImageData} */
var cakeSrc

btn.addEventListener('click', makeCake)

window.addEventListener("dragover", function (e) {
    e.preventDefault();
}, true);
window.addEventListener("drop", function (e) {
    e.preventDefault();
    log("load")
    log(e)
    loadfile(e.dataTransfer.files[0]);
}, true);



var memWidth = 10

var direction = 0

document.getElementById('dir').addEventListener('change', e => {direction=e.srcElement.value})

function loadfile(src) {
    if (src === undefined) {} else {
        //	Prevent any non-image file type from being read.
        if (!src.type.match(/image.*/)) {
            log("The dropped file is not an image: ", src.type);
            return;
        }

        //	Create our FileReader and run the results through the render function.
        var reader = new FileReader();
        reader.onload = function (e) {
            var image = new Image();
            image.src = e.target.result;
            image.onload = () => {
                load(image)
            }

            //load(e.target.result);
        };
        reader.readAsDataURL(src);
    }
}

function load(src) {
    cvs.width = src.width
    cvs.height = src.height
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.drawImage(src, 0, 0, src.width, src.height);

    cakeSrc = ctx.getImageData(0, 0, cvs.width, cvs.height)

    ctx.putImageData(cakeSrc, 0, 0)


}

directions = [
    [1, 1, 0, 0, ],
    [0, 1, 0, 0, ],
    [-1, 1, 1, 0, ],
    [-1, 0, 1, 0, ],
    [-1, -1, 1, 1, ],
    [0, -1, 0, 1, ],
    [1, -1, 0, 1, ],
    [1, 0, 0, 0, ],
]

function makeCake() {
    cakeSrc = ctx.getImageData(0, 0, cvs.width, cvs.height)
    var cakeSrcCvs = document.createElement('canvas')
    cakeSrcCvs.width = cakeSrc.width
    cakeSrcCvs.height = cakeSrc.height
    var dir = directions[direction]

    var cakeSrcCtx = cakeSrcCvs.getContext('2d')
    cvs.width = cvs.width + memWidth * Math.abs(dir[0])
    cvs.height = cvs.height + memWidth * Math.abs(dir[1])
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    cakeSrcCtx.putImageData(cakeSrc, 0, 0);
    for (let i = 0; i <= memWidth; i++) {
        ctx.drawImage(cakeSrcCvs, memWidth * dir[2] + i * dir[0], memWidth * dir[3] + i * dir[1])
    }
}