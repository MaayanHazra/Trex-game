var trex, trex_running, trex_collided;

var ground, invisibleGround, groundImage;
var cloud, cloudImage;
var obstacleS;
var obstacle1Image,obstacle2Image,obstacle3Image;
var obstacle4Image,obstacle5Image,obstacle6Image;
var rand;
var gameOver,GOI;
var score=0;
var restart,restartI;
//var gameState=1;
var PLAY=1;
var END=0;
var gameState=PLAY;
function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");
  obstacle1Image=loadImage("obstacle1.png");
  obstacle2Image=loadImage("obstacle2.png");
  obstacle3Image=loadImage("obstacle3.png");
  obstacle4Image=loadImage("obstacle4.png");
  obstacle5Image=loadImage("obstacle5.png");
  obstcale6Image=loadImage("obstacle6.png");
  
  GOI=loadImage("gameOver.png");
  restartI=loadImage("restart.png");
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("collided",trex_collided);
  trex.setCollider("circle",0,0,30);
  //trex.debug=true;
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  restart=createSprite(300,100);
  restart.addImage(restartI);
  restart.scale=0.5;
  restart.visible=false;
  
  gameOver=createSprite(300,100,600,200);
    gameOver.addImage(GOI);
   gameOver.scale=1;
 
  
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  //console.log(rand);
  obstacleGroup=new Group()
  cloudGroup=new Group()
  
}

function draw() {
  //set background color
  background("white");
  text("score:"+score,400,50);
  //(frameCount/60);
  //console.log(trex.y)
  
  if(gameState===PLAY){
    score=score+Math.round(getFrameRate()/60);
    console.log(trex.y);
    invisibleGround.visible = false;
    gameOver.visible=false;
    
    if(keyDown("space")&& trex.y >= 165) {
    trex.velocityY = -15;
     
  
    
  }
  trex.velocityY = trex.velocityY + 0.8;
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
   spawnClouds();
  makingObstacles();
   
   if(obstacleGroup.isTouching(trex)){
     gameState=END;
   }
    
    
  }
  else if(gameState===END){
    ground.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setVelocityXEach(0);
     cloudGroup.setLifetimeEach(-1);
    
    trex.changeAnimation("collided",trex_collided);
    trex.velocityY=0;
    gameOver.visible=true;
   
    restart.visible=true;
    //text("Press 'R'to restart the game",300,200);
    
    if(mousePressedOver(restart)){
    reset();
  }
  
  }
  
  // jump when the space key is pressed
  
  trex.collide(invisibleGround);
  
  
  //stop trex from falling down
  
  
  //Spawn Clouds
 
  
  drawSprites();
}

//function to spawn the clouds
function spawnClouds(){
 // write your code here 
  if(frameCount%80===0){
  //console.log(frameCount%100)
  cloud=createSprite(500,30,10,10);
  cloud.addImage(cloudImage);
  cloud.velocityX=-2; 
  cloud.y=Math.round(random(30,90));
  trex.depth=cloud.depth+1;
  cloud.lifetime=Math.round(random(200,330));
    cloudGroup.add(cloud);
    
  }
  
}
function makingObstacles(){
  if(frameCount%100===0){
    //console.log(frameCount%100);
  obstacleS=createSprite(500,160,10,10);
  
  obstacleS.velocityX=-10;
  obstacleS.scale=0.8;
    rand=Math.round(random(1,6));
    console.log(rand);
    switch(rand){
        case 1: obstacleS.addImage(obstacle1Image);
        break;
         case 2: obstacleS.addImage(obstacle2Image);
        break;
        case 3: obstacleS.addImage(obstacle3Image);
        break;
         case 4: obstacleS.addImage(obstacle4Image);
        break;
         case 5: obstacleS.addImage(obstacle5Image);
       break;
       case 6: obstacleS.addImage(obstacle5Image);
        break;
        default: break;
    }
    obstacleS.scale=0.5;        
    obstacleGroup.add(obstacleS);
    obstacleS.lifetime=300;
  }
}

  

function reset(){
  gameState=PLAY;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  
  score=0;
  restart.visible=false;
  trex.changeAnimation("running",trex_running);
}

