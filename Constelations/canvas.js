var w, width, h, height;
var canvas;

function createCanvas(canvas_name){
    var body = document.querySelector('body');
    
    canvas = document.createElement('canvas');
    canvas.setAttribute('id', canvas_name);
    canvas.style.position = 'absolute';
    canvas.style.left = '0px';
    canvas.style.top = '0px';
    canvas.style.background = "black";

    body.appendChild(canvas);

    var ctx = canvas.getContext('2d');

    resize();
    window.addEventListener('resize', resize, false);

    return ctx;
}

function resize(){
    var canvasList = document.getElementsByTagName('canvas');
    width = w = window.innerWidth;
    height = h = window.innerHeight;

    for(var i = 0; i < canvasList.length; i++){
        canvasList[i].width = width;
        canvasList[i].height = height;
    }

    console.log("resize: " + w + " : " + h + ".");
}