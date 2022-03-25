var bg,bgImg;
var player, pacImg1,pacImg2, pacImg3,pacImg4 ;
var ghost, ghostImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var ghostGroup;

var life = 3

var gameState

function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  pacImg1 = loadImage("assets/pac 1.png")
  pacImg2 = loadImage("assets/pac 2.png")
  pacImg3 = loadImage("assets/pac 3.png")
  pacImg4 = loadImage("assets/pac 4.png")

  ghostImg = loadImage("assets/ghost.png")

  bgImg = loadImage("assets/bg.jpg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 3
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(pacImg1)
   player.scale = 0.3
   player.debug = false;
   player.setCollider("rectangle",0,0,300,300)


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    //creating group for zombies    
    ghostGroup = new Group();
}

function draw() {
  background(0); 
  
  if(gameState === "fight"){
 
   if(life===3){
     heart3.visible = true
     heart1.visible = false
     heart2.visible = false
   }
   if(life===2){
     heart2.visible = true
     heart1.visible = false
     heart3.visible = false
   }
   if(life===1){
     heart1.visible = true
     heart3.visible = false
     heart2.visible = false
   }
 
   //go to gameState "lost" when 0 lives are remaining
   if(life===0){
     heart1.visible = false
     heart3.visible = false
     heart2.visible = false
     gameState = "lost"
 
   }
 
 }
  rect =createSprite(0, 0, 25, 1600);
 
  //moving the player up and down and making the game mobile compatible using touches
 if(keyDown("UP_ARROW")){
  player.y = player.y-30
  player.addImage(pacImg3)
 }
if(keyDown("DOWN_ARROW")){
 player.y = player.y+30
 player.addImage(pacImg4)
}
 
if(keyDown("RIGHT_ARROW")){
  player.x = player.x+30
}

if(keyDown("LEFT_ARROW")){
  player.x = player.x-30;
  player.addImage(pacImg2)
}

if(keyWentUp("LEFT_ARROW")){
  player.addImage(pacImg1)
}

if(keyWentUp("UP_ARROW")){
  player.addImage(pacImg1)
}

if(keyWentUp("DOWN_ARROW")){
  player.addImage(pacImg1)
}


//destroy zombie when player touches it
if(ghostGroup.isTouching(player)){
 

 for(var i=0;i<ghostGroup.length;i++){     
      
  if(ghostGroup[i].isTouching(player)){
       ghostGroup[i].destroy() } 
 }
 
}

if(ghostGroup.isTouching(rect)){

  for(var i=0;i<ghostGroup.length;i++){     
       
   if(ghostGroup[i].isTouching(rect)){
        ghostGroup[i].destroy()
       
 //Decrease the life
        player.life = player.life-1
        } 
  
  }
 }

 

//calling the function to spawn zombies
enemy();

drawSprites();
}



//creating function to spawn zombies
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    ghost = createSprite(random(500,1100),random(100,500),40,40)
    
    ghost.addImage(ghostImg)
    ghost.scale = 0.15
    ghost.velocityX = -15
    ghost.debug= false
    ghost.setCollider("rectangle",0,0,400,400)
   
    ghost.lifetime = 400
   ghostGroup.add(ghost)
  }

}
