const canvas=document.getElementById("canvas");
const score=document.getElementById("score");
const restart=document.getElementById("restart");
const ctx=canvas.getContext("2d");
const gameWidth=canvas.width;
const gameHeight=canvas.height;
const backgroundColor="forestgreen";
const paddleColor="skyblue";
const paddle2Color="red";
const paddleborder="black";
const ballcolor="yellow";
const ballBordeColor="black";
const Radius=12;
const paddleSpeed=50;
let intervalId;
let ballSpeed=1;
let ballX=gameWidth/2
let ballY=gameHeight/2;
let ballXdirection=0;
let ballYdirextion=0;
let player1Score=0;
let player2Score=0;
let paddle1={
    width:25,
    height:100,
    x:0,
    y:0
}
let paddle2={
    width:25,
    height:100,
    x:gameWidth-25,
    y:gameHeight-100
}

window.addEventListener("keydown",changeDirection);
restart.addEventListener("click",resetgame);
gameStart();
// drawPaddle();
function gameStart(){
    createBall();
    nexttick();
};
function changeDirection(event){
    const keyPressed=event.keyCode;
    const paddle1Up=87
    const paddle1down=83
    const paddle2up=38;
    const paddle2down=40;
    console.log(keyPressed);
    switch (keyPressed) {
        case paddle1Up:
            if(paddle1.y>0){

                paddle1.y-=paddleSpeed
            }
            
            break;
        case paddle1down:
            if(paddle1.y<gameHeight-paddle1.height){
                paddle1.y+=paddleSpeed
            }
            break;
        case paddle2up:
            if(paddle2.y>0){

                paddle2.y-=paddleSpeed
            }
            
            break;
        case paddle2down:
            if(paddle2.y<gameHeight-paddle2.height){
                paddle2.y+=paddleSpeed
            }
            
            break;
    
        default:
            break;
    }
}
function nexttick(){
    intervalId=setTimeout(()=>{
        clearboard();
        drawPaddle();
        moveBall();
        drawBall( ballX,ballY);
        checkCollision();
        nexttick();
    },10);
}
function  clearboard(){
    ctx.fillStyle=backgroundColor;
    ctx.fillRect(0,0,gameWidth,gameHeight);
}
function createBall(){
    ballSpeed=1;
    if(Math.round(Math.random())==1){
        ballXdirection=1;
    }else{
        ballXdirection=-1;
        
    }
    if(Math.round(Math.random())==1){
        ballYdirextion=1;
    }else{
        ballYdirextion=-1;

 }
 ballX=gameWidth/2;
 ballY=gameHeight/2;
 drawBall(ballX,ballY);
}
function moveBall(){
    ballX+=ballSpeed*ballXdirection;
    ballY+=ballSpeed*ballYdirextion;
}
function drawBall(ballX,ballY){
    ctx.fillStyle=ballcolor;
    ctx.strokeStyle=ballBordeColor;
    ctx.lineWidth=2;
    ctx.beginPath();
    ctx.arc(ballX,ballY,Radius,0,2*Math.PI);
    ctx.stroke();
    ctx.fill();
    // ctx.fillRect(ballX,ballY,25,30)
}
function checkCollision(){
  if(ballY<=0+Radius){
    ballYdirextion*=-1;
}
if(ballY>=gameHeight-Radius){
    ballYdirextion*=-1;
    
}
if(ballX<=0){
    player2Score+=1;
    updateScore();
    createBall();
    return;
}
if(ballX>=gameWidth){
    player1Score+=1;
    updateScore();
    createBall();
    return;
}
if(ballX<=(paddle1.x+paddle1.width+Radius)){
     if(ballY>paddle1.y&&ballY<paddle1.y+paddle1.height){
        ballX=paddle1.x+paddle1.width+Radius;
        ballXdirection*=-1;
        ballSpeed+=0.25;
    }
}
if(ballX>=(paddle2.x-Radius)){
    if(ballY>paddle2.y&&ballY<paddle2.y+paddle2.height){
        ballX=paddle2.x-Radius;
        ballXdirection*=-1;
        ballSpeed+=0.25;
     }
}

}
function updateScore(){
    score.textContent=`${player1Score} : ${player2Score}`
}
function  drawPaddle(){
    // ctx.beginPath();
    ctx.strokeStyle=paddleborder;
    ctx.fillStyle=paddleColor;
    ctx.fillRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height)
    ctx.strokeRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height);
    ctx.strokeStyle=paddleborder;
    ctx.fillStyle=paddle2Color;
    ctx.fillRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height)
    ctx.strokeRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height)
}

function resetgame(){
    player1Score=0;
    player2Score=0;
 paddle1={
        width:25,
        height:100,
        x:0,
        y:0
    }
     paddle2={
        width:25,
        height:100,
        x:gameWidth-25,
        y:gameHeight-100
    }
    ballSpeed=1;
    ballX=0;
    ballY=0;
    ballXdirection=0;
    ballYdirextion=0;
    updateScore();
    clearInterval(intervalId);
    gameStart();
    
}
