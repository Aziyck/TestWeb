//max number of particles that can exist one on screen
const NUMER_OF_ENTITIES = 1000;

//the number of particles created on mouse mouvement
const MIN_PARTICLES_CREATED_ON_MOUSE_MOVEMENT = 1;
const MAX_PARTICLES_CREATED_ON_MOUSE_MOVEMENT = 3;

//the spawn reagion aground the mouse
const SPREAD_X = 20;
const SPREAD_Y = 20;

//size of circles
const MIN_SIZE = 10;
const MAX_SIZE = 70;

//speed of spreading of cirles
const SPEED_LEFT = 0.5;
const SPEED_RIGHT = 0.5;
const SPEED_UP = 0.5;
const SPEED_DOWN = 0.5;

// 256 >= n >= 0
const INITIAL_RED_SHADE = 256;

//the higher the faster
const SPEED_OF_DECAY = 0.15;
const MIN_SIZE_UNTIL_DECAYING = 1;

//the lower the faster n >= 0
const SPEED_OF_CHANGING_COLOR = 1;


function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
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

const particle = [];

// const MIN_PARTICLES_PER_CLICK = 1;
// const MAX_PARTICLES_PER_CLICK = 10;
// canvas.addEventListener('click', function(mouseclick){
//     mouse.x = mouseclick.x;
//     mouse.y = mouseclick.y;
//     for (let j = 0; j<getRandom(MIN_PARTICLES_PER_CLICK, MAX_PARTICLES_PER_CLICK); j++){
//         let d = new Shape();
//         d.x = getRandom(MIN_SIZE, canvas.width);
//         d.y = getRandom(MIN_SIZE, canvas.height);
//         particle.push(d);
//     }
// })

canvas.addEventListener('mousemove', function(mouseclick){
    mouse.x = mouseclick.x;
    mouse.y = mouseclick.y;
    for (let j = 0; j<getRandom(MIN_PARTICLES_CREATED_ON_MOUSE_MOVEMENT, MAX_PARTICLES_CREATED_ON_MOUSE_MOVEMENT); j++){
        if (particle.length >= NUMER_OF_ENTITIES) {}
        else particle.push(new Shape);
    }
})


class Shape{
    constructor(){
        this.x=mouse.x + getRandom(-SPREAD_X, SPREAD_X);
        this.y=mouse.y + getRandom(-SPREAD_Y, SPREAD_Y);

        this.size=getRandom(MIN_SIZE, MAX_SIZE);

        this.speedX=getRandom(-SPEED_LEFT, SPEED_RIGHT);
        this.speedY=getRandom(-SPEED_UP, SPEED_DOWN);

        this.red = INITIAL_RED_SHADE;
        this.green = 0;
        this.blue = 0;
        this.color = 'rgb('+ this.red + ',' + this.green + ','+ this.blue +')';
        this.colorChangeCounter = 0;
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;

        if(this.size > MIN_SIZE_UNTIL_DECAYING) this.size -= SPEED_OF_DECAY;

        this.red = this.colourModify(this.red);
        this.color = 'rgb('+ this.red + ',' + this.green + ','+ this.blue +')';
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    colourModify(colorParameter){
        if(this.colorChangeCounter >= SPEED_OF_CHANGING_COLOR){
            
            this.colorChangeCounter = 0;
            colorParameter--;
        }
        this.colorChangeCounter++;

        return colorParameter;
    }
}

function drawParticle(){
    for (let i = 0; i < particle.length; i++){
        particle[i].update();
        particle[i].draw();
        if(particle[i].size<= MIN_SIZE_UNTIL_DECAYING){
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