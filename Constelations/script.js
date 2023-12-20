//max number of particles that can exist one on screen
const NUMER_OF_ENTITIES = 250;

//size of circles
const MAX_SIZE = 2;
MAX_DISTANCE = 75;

//speed of spreading of cirles
const CONST_SPEED = 0.3;
const SPEED_LEFT = CONST_SPEED;
const SPEED_RIGHT = CONST_SPEED;
const SPEED_UP = CONST_SPEED;
const SPEED_DOWN = CONST_SPEED;

// const SPEED_LEFT = 0.5;
// const SPEED_RIGHT = 0.5;
// const SPEED_UP = 0.5;
// const SPEED_DOWN = 0.5;

function dist(x1, y1, x2, y2) {
    x2-=x1; y2-=y1;
    return Math.sqrt((x2*x2) + (y2*y2));
   }

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

ctx = createCanvas("canvas1");


const particle = [];


// canvas.addEventListener('mousemove', function(mouseclick){
//     mouse.x = mouseclick.x;
//     mouse.y = mouseclick.y;
//     for (let j = 0; j<3; j++){
//         if (particle.length >= NUMER_OF_ENTITIES) {}
//         else particle.push(new Shape);
//     }
// })


class Shape{
    constructor(){
        this.x = getRandom(1, w);
        this.y = getRandom(1, h);

        this.size=getRandom(1, MAX_SIZE);

        this.speedX=getRandom(-SPEED_LEFT, SPEED_RIGHT);
        this.speedY=getRandom(-SPEED_UP, SPEED_DOWN);

        this.color = "white";
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;

        this.size -= getRandom(0.00001, 0.0001);
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

function init(){
    for(let i = 0; i < NUMER_OF_ENTITIES; i++){
        particle.push(new Shape);
    }
} 
init();

function drawConcetions(_i){
    for (var j = 0; j < particle.length; j++) {
        b1 = particle[_i];
        b2 = particle[j];
        var distance = dist(b1.x, b1.y, b2.x, b2.y);
        if (j!=_i) {
          if ( distance <= MAX_DISTANCE) {
                ctx.beginPath();
                ctx.strokeStyle = "white";
                ctx.lineWidth = 1 - distance/MAX_DISTANCE;
                ctx.moveTo(b1.x, b1.y);
                ctx.lineTo(b2.x, b2.y);
                ctx.stroke();
                ctx.closePath();
          }
        }
    }
}

function drawParticle(){
    let particlesToRemove = [];

    for (let i = 0; i < particle.length; i++) {
        particle[i].update();
        particle[i].draw();
        drawConcetions(i);

        if (particle[i].x >= w || particle[i].x <= 0) {
            particle[i].speedX = -particle[i].speedX;
        }

        if (particle[i].y >= h || particle[i].y <= 0) {
            particle[i].speedY = -particle[i].speedY;
        }

        if (particle[i].x >= w + 2 || particle[i].x <= -2 ||
            particle[i].y >= h + 2 || particle[i].y <= -2 ||
            particle[i].size <= 0.5) {
            particlesToRemove.push(i);
        }
    }

    // Remove particles marked for removal
    for (let i = particlesToRemove.length - 1; i >= 0; i--) {
        particle.splice(particlesToRemove[i], 1);
        console.log(particle);
        particle.push(new Shape());
    }
}


function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawParticle();
    requestAnimationFrame(animate);
}

animate();
