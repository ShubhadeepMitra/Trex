//defining different variables
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage,cloud_image,Obstacle1,Obstacle2,Obstacle3,Obstacle4,Obstacle5,Obstacle6;
var cloudsGroup,ObstacleGroup;
var PLAY,END;

function preload(){
  
  //loading the animations and the images
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  cloud_image=loadImage("cloud.png");
  
  Obstacle1=loadImage("obstacle1.png");
  Obstacle2=loadImage("obstacle2.png");
  Obstacle3=loadImage("obstacle3.png");
  Obstacle4=loadImage("obstacle4.png");
  Obstacle5=loadImage("obstacle5.png");
  Obstacle6=loadImage("obstacle6.png");
}

function setup() {
  createCanvas(displayWidth-40,displayHeight/2);
  
  PLAY=1;
  END=0;
  gameState=PLAY;
  //making a trex and definig it's function
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //making a ground and defining it's function
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4
  
  //making groups of obstacle and clouds
  cloudsGroup=createGroup();
  ObstacleGroup=createGroup();
  
  //creating a invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
}

function draw() {
  
  //adding background colour
  background("white");
  
  if(gameState===PLAY){
    
    //using the keys to jump
  if(keyDown("space")&&trex.y>161) {
    trex.velocityY = -12;
  }
  
  //defining the functions
  spawnClouds();
  spawnObstacles();
  
  //console.log(trex.y);
  
  //adding gravity to trex
  trex.velocityY = trex.velocityY + 0.5
  
  //restarting the ground
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    if(trex.isTouching(ObstacleGroup)){
      gameState=END;
    }
  }
    if(gameState===END){
      ObstacleGroup.setLifetimeEach(-1);
      cloudsGroup.setLifetimeEach(-1);
      
      ObstacleGroup.setVelocityXEach(0);
      cloudsGroup.setVelocityXEach(0);
      
      ObstacleGroup.destroyEach();
      cloudsGroup.destroyEach();
      
      ground.velocityX=0;
      
      trex.velocityY=0;
      
  }
  

  //stoping the trex from falling down
  trex.collide(invisibleGround);
  
  drawSprites();
}
   
function spawnClouds(){
if(World.frameCount%70===0){
  
  //creating clouds
  var clouds=createSprite(displayWidth,Math.round(random(25,75)),1,1);
  clouds.addImage(cloud_image);
  clouds.velocityX=-3;
  
  //setting the depth of clouds and trex
  trex.depth=clouds.depth
  trex.depth=trex.depth+1
  
  //adding lifetime to clouds
  clouds.lifetime=displayWidth/3;
  
  //adding the group of clouds
  cloudsGroup.add(clouds);
} 
}

function spawnObstacles (){
  //defining the spawn rate
 if(World.frameCount%60===0){
   
 //creating the obstacles
 var Obstacles=createSprite(displayWidth,160)
 var rand=Math.round(random(1,6));
 
   switch(rand){
       
       //defeing case 1
       case 1:Obstacles.addImage(Obstacle1);
       break; 
       
       //defining case 2
       case 2:Obstacles.addImage(Obstacle2);
       break;
       
       
       //defening case 3
       case 3:Obstacles.addImage(Obstacle3);
       break;
       
       
       //defining case 4
       case 4:Obstacles.addImage(Obstacle4);
       break;
       
       //defening case 5
       case 5:Obstacles.addImage(Obstacle5);
       break;
       
       //defining case 6
       case 6:Obstacles.addImage(Obstacle6);
       break;
       }
   
   //setting length of the obstacles
   Obstacles.scale=0.5;
   
   //adding speed
   Obstacles.velocityX=-4;
   
   //giving lifetime to obstacles
   Obstacles.lifetime=displayWidth/4;
   
   //adding the group of obstacles
   ObstacleGroup.add(Obstacles);
 }
}