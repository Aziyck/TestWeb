const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const particle = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined,
}

canvas.addEventListener('click', function(mouseclick){
    mouse.x = mouseclick.x;
    mouse.y = mouseclick.y;
    for (let j = 0; j<10; j++){
        particle.push(new Bubble);
    }
})

canvas.addEventListener('mousemove', function(mouseclick){
    mouse.x = mouseclick.x;
    mouse.y = mouseclick.y;
    for (let j = 0; j<2; j++){
        if(getRandomArbitrary(1,20) > 10){
            // particle.push(new Bubble);
        }else{
            particle.push(new Drop);
        }
            
    }
})

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

class Bubble{
    constructor(){
        this.x=mouse.x;
        this.y=mouse.y;
        this.size=getRandomArbitrary(3,12);
        this.speedX=Math.random()*2.5;
        this.speedY=Math.random()*10;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size>0.2) this.size -= 0.1;
    }
    draw(){
        ctx.beginPath();
        ctx.strokeStyle='pink';
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.stroke();
        ctx.closePath();
    }
}

// let col = window.prompt("Color: ");
let col = null;

counterR = 1;
counterG = 1;
counterB = 1;
class Drop{
    constructor(){
        this.x=mouse.x;
        this.y=mouse.y;
        this.size=getRandomArbitrary(3,12);
        this.speedX=getRandomArbitrary(-0.1, 0.1);
        this.speedY=getRandomArbitrary(1, 3);
        // this.counter = 1000;
        if(col == null || col == ""){
            this.color = 'rgb('+ counterR + ',' + counterG + ','+ counterB+')';
        }else{
            this.color = col;
        }
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size>0.2) this.size -= 0.01;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, Math.PI, Math.PI*2, true);
        ctx.strokeStyle = this.color;
        if (col == null || col == ""){
            counterB += 1; 
            if(counterB >= 255) counterB = 1;
        }
        ctx.lineTo(this.x, this.y-this.size*2);
        ctx.lineTo(this.x-this.size, this.y);
        ctx.stroke();
        ctx.closePath();
    }
}

function init(){
    for (let i = 0; i<100; i++){
        particle.push(new Bubble());
    }
}
init();

function drawParticle(){
    for (let i = 0; i < particle.length; i++){
        particle[i].update();
        particle[i].draw();
        if(particle[i].size<=0.2){
            particle.splice(i,1);
            i--;
        }
    }
}
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawParticle();
    requestAnimationFrame(animate);
}

animate();