var character,backgroundIMG,characterAnimation;
var ground,groundIMG;
var cliff,thumbsUp
var healthBar1,healthBar2;
var healthBoost,healthGroup,healthBoostIMG;
var spikes,spikesIMG,spikesGroup;
var coins, coinsGroup,coinsIMG;
var Warning,WarningIMG
var sadMario,sadMarioIMG;
var happyMario, happyMarioIMG

var VICTORY = 3;
var cliff,cliffIMG,cliffGroup;
var gem,gemIMG,gemsGroup;
var END = 2;
var PLAY = 1;
var gameState = PLAY;
var blackBlur
var defeatIMG,defeat;
var restart,restartIMG;
var victoryIMG,victory;
var thumbsUpGroup;
var distance = 0;
   var score = 0;
   var time = 450;

function preload() {
  
  backgroundIMG = loadImage("mario game background.jpg");
  groundIMG = loadImage("Screenshot_2.png")
  
  characterAnimation = loadAnimation("mario00-removebg-preview.png","mario01-removebg-preview.png","mario02-removebg-preview.png","mario03-removebg-preview.png")

  
  thumbIMG = loadImage("thumbs-up-mario.png")
  healthBoostIMG = loadImage("health-boost.png")
  spikesIMG = loadImage("Mario-spikes.png");
  WarningIMG = loadImage("WARNING!.png")
  coinsIMG = loadImage("coins-mario.png")
 
  gemIMG = loadImage("mario-gem.png")
  blackBlur = loadImage("blur.jpg")
  defeatIMG = loadImage("mariodefeat1-removebg-preview.png")
 
  sadMarioIMG = loadImage("sad-mario-removebg-preview.png");
  happyMarioIMG = loadImage("happy_mario-removebg-preview.png")

                      
  victoryIMG = loadImage("victory-removebg-preview.png");
  restartIMG = loadImage("try-again-removebg-preview.png")

}
function setup() {
  createCanvas(400,400);
  
  character = createSprite(50,335,20,20)
  character.addAnimation("running",characterAnimation)
  character.scale = 2.6;
  
  coinsGroup = new Group();
 
  healthBar1 = createSprite(25,120,5,80);
  healthBar2 = createSprite(25,120,5,80)
  healthBar1.shapeColor = rgb(73, 68, 68)
  healthBar2.shapeColor = rgb(85, 237, 9);

  
  ground = createSprite(200,390,20,20);
  ground.addImage(groundIMG)
  ground.scale = 1.3;
  ground.velocityX = -5;
  ground.x = ground.width/2
  
  healthGroup = new Group();
  thumbsUpGroup = new Group();
  spikesGroup = new Group();
  cliffGroup = new Group();
  gemsGroup = new Group();
  
  
  
  restart = createSprite(200,370,20,20);
  restart.addImage(restartIMG)
  restart.scale = 0.4
  defeat = createSprite(190,90,20,20);
  defeat.addImage(defeatIMG);
  sadMario = createSprite(190,248,20,20)
  sadMario.addImage(sadMarioIMG)
  sadMario.scale = 0.5
  victory = createSprite(200,110,20,20);
  victory.addImage(victoryIMG)
  victory.scale = 0.4
  happyMario = createSprite(203,263,20,20)
  happyMario.addImage(happyMarioIMG)
  happyMario.scale = 0.35
 
  
  

}

function draw() {
  background(backgroundIMG);  
  
  character.velocityY = character.velocityY + 0.8;
  character.collide(ground);
  
 if(gameState === PLAY){
   
   

   
   
   
  if(time<30){
    fill("red")
     textSize(16)
    textFont("times new roman")
    text("Time Left : " + time + " Seconds",220,20)
  }
  else{
      textSize(16)
     fill("black")
     textFont("times new roman")
     text("Time Left : " + time + " Seconds",220,20)
  }
   
   textSize(16)
   fill("black")
  textFont("times new roman");
   text("Distance : " +  distance,20,50);
  
  fill("black")
  text("Score : " + score,20,20);
   
   if(frameCount%3 === 0){
    distance = distance + 5
  }
  
   if(distance > 5000 && distance < 5050){
    textSize(30);
    fill("blue");
    textStyle(ITALIC)
    textStyle(BOLD)
    text("Woo-Hoo, Well Played!!",50,195)
  }
  
 
   spawnCoins();
  spawnHealth();
  spawnSpikes();
  
  
  
  
  if(ground.x < 50){
    ground.x = ground.width/2
  }
  
  if(frameCount%10 === 0){
     time = time - 1;
  }
  
  if(keyDown("space")&& character.y >= 230){
       character.velocityY = -5     
     }
   
   character.setCollider("rectangle",0,0,20,30)
   
  
  
  
  
  if(character.isTouching(healthGroup)){
    healthGroup.destroyEach();
    thumbsUp = createSprite(200,200,20,20)
    thumbsUp.scale = 0.15
    thumbsUp.lifetime = 20
    thumbsUp.addImage(thumbIMG);
    healthBar2.height = healthBar2.height * 102/100
    
        }
  
  if(character.isTouching(spikesGroup)){
       healthBar2.height = healthBar2.height * 99/100
    
        }
 
  
  if(character.isTouching(coinsGroup)){
    coinsGroup.destroyEach();
    score = score + 2;
        }
   
   if(character.isTouching(gemsGroup)){
    gemsGroup.destroyEach();
    score = score + 8;
        }
  
  if(healthBar2.height > 50 && healthBar2.height < 75){
    healthBar2.shapeColor="yellow";
  }
  
  
  if(healthBar2.height < 50 && healthBar2.height > 25){
    healthBar2.shapeColor="orange";
  }
  
  
  if(healthBar2.height < 25 && healthBar2.height > 0){
    healthBar2.shapeColor="red";
  }
  if(healthBar2.height > 75){
    healthBar2.shapeColor = rgb(85, 237, 9);
  }
  if(healthBar2.height < 11 ){   
    gameState = END;
  }
   character.visible = true;
   ground.visible = true;
   restart.visible = false;
   healthBar2.visible = true;
   healthBar1.visible = true;
   defeat.visible = false;
   victory.visible = false;
   sadMario.visible = false;
   happyMario.visible = false;
   
   if(time === 0){
     gameState = END;
   }
   if(score >= 100){
     gameState = VICTORY;
   }
  
 }
   
 else if(gameState === END){
   
   character.visible = false;
   ground.visible = false;
   coinsGroup.destroyEach();
   spikesGroup.destroyEach();
   healthGroup.destroyEach();
   healthBar2.visible = false;
   healthBar1.visible = false;
   background(blackBlur)
   defeat.visible = true;
   sadMario.visible = true;
   restart.visible = true;
   score = 0;
   time = 450;
   distance = 0;
   
   
 }
  
 if(gameState === VICTORY){
   
   character.visible = false;
   ground.visible = false;
   coinsGroup.destroyEach();
   spikesGroup.destroyEach();
   healthGroup.destroyEach();
   healthBar2.visible = false;
   healthBar1.visible = false;
   background(blackBlur)
   victory.visible = true;
   restart.visible = true;
   happyMario.visible = true;
   score = 0;
   time = 450;
   distance = 0;
   
   
 }
  
   if(mousePressedOver(restart) && gameState === END){
    gameState = PLAY;
     healthBar2.height = 80;
     character.visible = true;
   }
  
   if(mousePressedOver(restart) && gameState === VICTORY){
    gameState = PLAY;
     healthBar2.height = 80;
     character.visible = true;
   }
  
  
  
  
  
  
  
  drawSprites();
}    

function spawnCoins(){
  
  if(frameCount%70 === 0){
    coins = createSprite(400,320,20,20);
    coins.velocityX = -5;
    coins.addImage(coinsIMG)
    coins.scale = 0.07
    coins.y = random(230,320);
    coins.lifetime = 80;
    coinsGroup.add(coins);
    
  } 
  
  
  if(frameCount%360 === 0){
    gem = createSprite(400,320,20,20);
    gem.velocityX = -5;
    gem.addImage(gemIMG)
    gem.scale = 0.2
    gem.y = random(230,320);
    gem.lifetime = 80;
    gemsGroup.add(gem);
    
  } 
    
}

function spawnSpikes(){
  
  
  if(frameCount%110 === 0){
    
    spikes = createSprite(400,317,20,20);
    spikes.scale = 0.28;
    spikes.addImage(spikesIMG);
    spikes.velocityX = -5;
    spikes.lifetime = 80;
    spikesGroup.add(spikes)
    Warning = createSprite(370,210,20,20);
    Warning.addImage(WarningIMG)
    Warning.scale = 0.2
    Warning.lifetime = 15;
            
  }  
  
}

function spawnHealth(){
  
  if(frameCount%470 === 0){
    var healthBoost = createSprite(400,320,20,20)
    healthBoost.velocityX = -5;
    healthBoost.addImage(healthBoostIMG);
    healthBoost.scale = 0.18;
    healthGroup.add(healthBoost)   
    healthBoost.lifetime = 80;
  }
  
  
}



















































