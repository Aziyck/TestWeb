var w, width, h, height;
var canvas;

function createCanvas(canvas_name, parent_element = 'body'){
    
    var pElem = document.querySelector(parent_element);
    
    canvas = document.createElement('canvas');
    canvas.setAttribute('id', canvas_name);
    canvas.style.position = 'absolute';
    // canvas.style.left = '0px';
    canvas.style.top = '0px';

    canvas.style.background = "transparent";
    let blur = "blur(2px)";
    canvas.style.filter = blur;
    canvas.style.webkitFilter = blur;
    canvas.style.zIndex = -999;

    pElem.appendChild(canvas);

    var ctx = canvas.getContext('2d');

    resize();
    window.addEventListener('resize', resize, false);

    return ctx;
}

function resize(){
    var bodyRect = document.body.getBoundingClientRect(),
        elemRect = canvas.parentElement.getBoundingClientRect(),
        offset   = elemRect.top - bodyRect.top;

    if(window.innerWidth > 1900){
        width = w = window.innerWidth;
    } else{
        width = w = 1900;
    }
    height = h = canvas.parentElement.offsetHeight + offset + 48;

    canvas.width = window.innerWidth;
    canvas.height = height;

    console.log("resize: " + w + " : " + h + ".");
}

  