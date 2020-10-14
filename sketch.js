var plr, plr_running;
var bananaGroup, bananaImage;
var rockGroup, rockImage;
var ground, groundImage, fakeGround;
var score;

function preload(){
  plr_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  groundImage = loadImage("jungle.jpg");
  rockImage = loadImage("stone.png");
  bananaImage = loadImage("banana.png");
}


function setup() {
  createCanvas(600, 600);
  ground = createSprite(300,300,10,10);
  ground.addImage("ground",groundImage)
  ground.scale = 7/8
  ground.velocityX = -5
  
  fakeGround = createSprite(300,525,700,1);
  fakeGround.visible = false;
  
  plr = createSprite(100,475,20,50);
  plr.addAnimation("walking",plr_running);
  plr.scale = 1/6;
  
  bananaGroup = new Group();
  rockGroup = new Group();
  
  score = 0;
  
}

function draw() {
  background(220);
  textSize(20);
  textStyle("Bold");
  fill("Red");
  
  if (ground.x < 200){
    ground.x = ground.width/3;
  }
  banana();
  obstacle();
  if (plr.isTouching(bananaGroup)){
      score = score + 2;
      bananaGroup.destroyEach();
    switch(score){  
      case 10: plr.scale = 3/12;
        break;
      case 20: plr.scale = 4/12;
        break;
      case 30: plr.scale = 5/12;
        break;
      case 40: plr.scale = 6/12;
        break;
        default:break;
    }
      }
  if (plr.isTouching(rockGroup)){
      plr.scale = 1/6;
      rockGroup.destroyEach();
      }
  if (plr.y >= 470 && keyDown("space")) {
    plr.velocityY = -10;
  }
  
  plr.velocityY = plr.velocityY + 1/2;
  plr.collide(fakeGround)
  console.log(plr.y)
  drawSprites();
  text("Score: " + score,450,100);
}

function banana(){
  if (frameCount%80 === 0){
    var rand = Math.round(random(400,500));
    var banana1 = createSprite(600,rand,10,10);
    banana1.addAnimation("Banana",bananaImage);
    banana1.scale = 1/14;
    banana1.velocityX = -15;
    banana1.lifetime = 50;
    bananaGroup.add(banana1);
  }
}

function obstacle(){
  if (frameCount%300===0){
    var obstacle1 = createSprite(600,475,10,10);
    obstacle1.scale = 1/8;
    obstacle1.addAnimation("Stone",rockImage);
    obstacle1.velocityX = -20;
    obstacle1.lifetime = 35;
    rockGroup.add(obstacle1);
  }
}