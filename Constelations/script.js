//max number of particles that can exist one on screen
MAX_NUMER_OF_ENTITIES = 500;

//size of circles
MIN_SIZE = 1;
MAX_SIZE = 2;

//distance of lines
MIN_DISTANCE = 10;
MAX_DISTANCE = 100;

//color
BALL_COLOR = "white";
LINE_COLOR = "white";

//initial speed of spreading of shapes n >= MIN_SPEED_POSIBLE
CONST_SPEED = 0.5;

SPEED_LEFT = 0.5;
SPEED_RIGHT = 0.5; 
SPEED_UP = 0.5;
SPEED_DOWN = 0.5; 

MIN_SPEED_POSSIBLE = 0.1;

//make CONST_SPEED to null for individualt speed to take effect
if(CONST_SPEED != null){
    SPEED_LEFT = CONST_SPEED;
    SPEED_RIGHT = CONST_SPEED;
    SPEED_UP = CONST_SPEED;
    SPEED_DOWN = CONST_SPEED;
}

//speed of shape Decay
MIN_SPEED_OF_DECAY = 0.00001;
MAX_SPEED_OF_DECAY = 0.0001;

//min size of shapes until regenerating
MIN_SIZE_DECAY = 0.5;

// radius around mouse that will make shapes move aside
RADIUS_AROUND_MOUSE = 150;

//how faster will shapes decay around mouse
SPEED_OF_DECAY_INCREASE_AROUD_MOUSE = 100;

//atraction force around mouse (high number = low attraction) n >= 1
ATTRACTION_FORCE = 3;

//other global objects
const shapeArray = [];
ctx = createCanvas("canvas1");
let mouse = {
	x: null,
	y: null
}

window.addEventListener('mousemove', 
	function(event){
		mouse.x = event.x + canvas.clientLeft/2;
		mouse.y = event.y + canvas.clientTop/2;
});

window.addEventListener('click', 
	function(event){
		// mouse.x = event.x + canvas.clientLeft/2;
		// mouse.y = event.y + canvas.clientTop/2;
        console.log(mouse.x + " : " + mouse.y);
        for(let i = 0; i < shapeArray.length; i++){
            if(shapeArray[i].distance < RADIUS_AROUND_MOUSE * 20){
                // shapeArray[i].size = MIN_SIZE_DECAY;
                if(Math.sign(shapeArray[i].speedX) != Math.sign(shapeArray[i].dx)){
                    shapeArray[i].speedX = -shapeArray[i].speedX;
                }
                if(Math.sign(shapeArray[i].speedY) != Math.sign(shapeArray[i].dy)){
                    shapeArray[i].speedY = -shapeArray[i].speedY;
                }
                if(shapeArray[i].x.between(mouse.x+20, mouse.x-20)){
                    shapeArray[i].speedX = 0;
                }
                if(shapeArray[i].y.between(mouse.y+20, mouse.y-20)){
                    shapeArray[i].speedY = 0;
                }
                // shapeArray[i].speedX = shapeArray[i].dx / shapeArray.distance;
                // shapeArray[i].speedY = shapeArray[i].dy / shapeArray.distance;
            }
            
        }
});



class Shape{
    constructor(){
        this.x = getRandom(1, w);
        this.y = getRandom(1, h);

        this.size=getRandom(MIN_SIZE, MAX_SIZE);

            // this.speedX=getRandom(-SPEED_LEFT, SPEED_RIGHT);
        this.speedX = getRandomArgument(getRandom(-SPEED_LEFT, -MIN_SPEED_POSSIBLE), getRandom(MIN_SPEED_POSSIBLE, SPEED_RIGHT));
            // this.speedY=getRandom(-SPEED_UP, SPEED_DOWN);
        this.speedY = getRandomArgument(getRandom(-SPEED_UP, -MIN_SPEED_POSSIBLE), getRandom(MIN_SPEED_POSSIBLE, SPEED_DOWN));

        this.color = BALL_COLOR;
        
        //todo: maybe adding density
        this.lineLengh = getRandom(MIN_DISTANCE, MAX_DISTANCE);

        this.speedOfDecay = getRandom(MIN_SPEED_OF_DECAY, MAX_SPEED_OF_DECAY);
    }

    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.hypot(dx, dy);

        this.distance = distance;
        this.dx = dx;
        this.dy = dy;

        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;

        //the closer the stronger the puul
        let force = (RADIUS_AROUND_MOUSE - distance) / RADIUS_AROUND_MOUSE;
        if(force < 0) force = 0;

        this.dirX = (forceDirectionX * force * this.lineLengh) / ATTRACTION_FORCE;
        this.dirY = (forceDirectionY * force * this.lineLengh) / ATTRACTION_FORCE;

        if(distance < RADIUS_AROUND_MOUSE + this.size){
            this.size -= this.speedOfDecay * SPEED_OF_DECAY_INCREASE_AROUD_MOUSE;

            this.x += this.dirX + this.speedX;
            this.y += this.dirY + this.speedY;

            //event horizon radius
            if(distance < RADIUS_AROUND_MOUSE / 10 + this.size){
                this.size = MIN_SIZE_DECAY;
            }
        //depricated
        //{
        }if(distance == RADIUS_AROUND_MOUSE + this.size){
            this.size -= this.speedOfDecay * SPEED_OF_DECAY_INCREASE_AROUD_MOUSE;

            this.speedX = -this.speedX;
            this.speedY = -this.speedY;
        }
        //}  
        else{
            this.x += this.speedX;
            this.y += this.speedY;
        }
        
        this.size -= this.speedOfDecay;
    }

    draw(){
        ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
            ctx.fillStyle = this.color;
            ctx.fill();
        ctx.closePath();
    }
}


function drawConcetions(i){
    for (let j = i+1; j < shapeArray.length; j++) {
        shape1 = shapeArray[i];
        shape2 = shapeArray[j];
        distance = dist(shape1.x, shape1.y, shape2.x, shape2.y);

        if (distance <= shape2.lineLengh) {
            ctx.beginPath();
                ctx.strokeStyle = LINE_COLOR;
                ctx.lineWidth = (1 - distance/shape2.lineLengh);
                ctx.moveTo(shape1.x, shape1.y);
                ctx.lineTo(shape2.x, shape2.y);
                ctx.stroke();
            ctx.closePath();
        }
        
    }
}

function drawShapes(){
    let shapesToRemove = [];

    for (let i = 0; i < shapeArray.length; i++) {
        shapeArray[i].update();
        shapeArray[i].draw();
        drawConcetions(i);

        if (shapeArray[i].x >= w || shapeArray[i].x <= 0) {
            shapeArray[i].speedX = -shapeArray[i].speedX;
        }

        if (shapeArray[i].y >= h || shapeArray[i].y <= 0) {
            shapeArray[i].speedY = -shapeArray[i].speedY;
        }

        if (shapeArray[i].x >= w + 2 || shapeArray[i].x <= -2 ||
            shapeArray[i].y >= h + 2 || shapeArray[i].y <= -2 ||
            shapeArray[i].size <= MIN_SIZE_DECAY) {
            shapesToRemove.push(i);
        }
    }

    for (let i = shapesToRemove.length - 1; i >= 0; i--) {
        shapeArray.splice(shapesToRemove[i], 1);
        shapeArray.push(new Shape());
    }
}



function init(){
    for(let i = 0; i < MAX_NUMER_OF_ENTITIES; i++){
        shapeArray.push(new Shape);
    }
} 
init();

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawShapes();
    requestAnimationFrame(animate);
}
animate();
