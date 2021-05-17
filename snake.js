// var canvas = document.querySelector("canvas");
// canvas.style.border="1px solid black"
// canvas.style.backgroundColor="black"
// canvas.width=400;
// canvas.height=400;
// var totalanime;
// var timeanime;
// var d;
// var ctx= canvas.getContext("2d")
// var snake=[]

// apple={
//     x:0,
//     y:0
// }


// class Game  {
//     constructor(width,height){
//         this.width=width;
//         this.height=height
//     }
//     start (){
// apple.x= Math.floor(Math.random()*19+0)*20
// apple.y= Math.floor(Math.random()*19+0)*20

// snake[0]={
//     x:50,
//     y:50
// }
// snake[1]={
//     x:60,
//     y:50
// }

//     }
//     draw(){
//         ctx.fillStyle="yellow";
//         ctx.fillRect(apple.x,apple.y,this.width,this.height);
//         snake.forEach((item)=>{
//             ctx.strokeStyle="yellow"
//             ctx.strokeRect(item.x,item.y,this.width,this.height)
//             ctx.fillStyle="green"
//             ctx.fillRect(item.x,item.y,this.width,this.height)

//         })
//     }
//     control(){
// document.querySelector("body").addEventListener("keydown", control.blind(this))
// function control (event){
//     if(event.keyCode==37){
//         d="left"
//     }
//     if(event.keyCode==39){
//         d="right"
//     }
//     if(event.keyCode==38){
//         d="up"
//     }
//     if(event.keyCode==40){
//         d="down"
//     }
// }
//     }
//     speed(){
//         if(d=="left"){snake[0].x-=10}
//         if(d=="right"){snake[0].x+=10}
//         if(d=="up"){snake[0].x-=10}
//         if(d=="down"){snake[0].x+=10}
// if( snake[0].x>canvas.width){
//     snake[0].x=0
// }else if(snake[0].x==-10){
//     snake[0].x=canvas.width
// }

// if( snake[0].y>canvas.height){
//     snake[0].y=0
// }else if(snake[0].x==-10){
//     snake[0].y=canvas.height
// }

//     }
//     clear(){

//     }
//     animate(){
// totalanime = anime.bind(this)
// timeanime = setInterval(totalanime,100)
// function anime(){
//     this.clear
//     this.speed()
//     this.control()
//     this.draw()
// }
        
//     }
//     update(){
// this.start();
// this.animate();
//     }
//     gameover(){

//     }
// }
// var game= new Game(10,10)
// game.update()
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');


class SnakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2; 

let appleX = 5;
let appleY = 5;

let xVelocity=0;
let yVelocity=0;

let score = 0;

const gulpSound = new Audio("gulp.mp3");


//game loop
function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;
    }

    clearScreen();

    checkAppleCollision();
    drawApple();
    drawSnake();

    drawScore();

    if(score > 2){
        speed = 11;
    }
    if(score > 5){
        speed = 15;
    }

    setTimeout(drawGame, 1000/ speed);
} 

function isGameOver(){
    let gameOver = false;

    if(yVelocity ===0 && xVelocity ===0){
        return false;
    }

    //walls
    if(headX < 0 ){
        gameOver = true;
    }
    else if(headX === tileCount){
        gameOver = true
    }
    else if( headY < 0){
        gameOver = true;
    }
    else if(headY === tileCount){
        gameOver = true
    }

    for(let i =0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }


    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";

        if (gameOver) {
            ctx.fillStyle = "white";
            ctx.font = "50px Verdana";

            var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
            gradient.addColorStop("0", " magenta");
            gradient.addColorStop("0.5", "blue");
            gradient.addColorStop("1.0", "red");
            // Fill with gradient
            ctx.fillStyle = gradient;

            ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
          }


        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
      }

    return gameOver;
}

function drawScore(){
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana"
    ctx.fillText("Score " + score, canvas.width-50, 10);
}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake(){

    ctx.fillStyle = 'green';
    for(let i =0; i < snakeParts.length; i++){
        let part =  snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY)); //put an item at the end of the list next to the head
    while (snakeParts.length > tailLength){ 
        snakeParts.shift(); // remove the furthet item from the snake parts if have more than our tail size.
    }

    ctx.fillStyle =  'orange';
    ctx.fillRect(headX * tileCount, headY* tileCount, tileSize,tileSize);


}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple(){
    ctx.fillStyle = "red";
    ctx.fillRect(appleX* tileCount, appleY* tileCount, tileSize, tileSize)
}

function checkAppleCollision(){
    if(appleX === headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        gulpSound.play();
    }
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    //up
    if(event.keyCode == 38){
        if(yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }

    //down
    if(event.keyCode == 40){
        if(yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }

    //left
    if(event.keyCode == 37){
        if(xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }

     //right
     if(event.keyCode == 39){
        if(xVelocity == -1)
        return;
        yVelocity = 0;
        xVelocity = 1;
    }
}


drawGame();

