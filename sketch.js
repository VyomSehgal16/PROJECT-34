var dog, dogimg, happyDog, database, foodS, foodStock;

function preload()
{
  dogimg = loadImage("images/Dog.png");
  happyDog = loadImage("images/happydog.png")
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,350,100,100);
  dog.addImage(dogimg);
  dog.scale = 0.2;
  foodStock = database.ref('food');
  foodStock.on("value", readStock);
  
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();
  textSize(20);
  fill("white");
  text("MEET BROWNIE",250,100);
  text("PRESS UP ARROW TO FEED HIM",250,400);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}