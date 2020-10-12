//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogIMG1, dogIMG2;

function preload()
{
  //load images here
  dogIMG1 = loadImage("images/dogImg.png");
  dogIMG2 = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  dog = createSprite(250, 350, 170, 170);
  dog.addImage(dogIMG1);
  dog.scale = 0.25;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

}


function draw() {  
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(dogIMG2);
  }

if (keyWentUp(UP_ARROW)) {
  dog.addImage(dogIMG1);
}
  
  drawSprites();
  textSize(20);
  fill("white");
  text("Note: PRESS UP ARROW KEY TO FEED YOUR PET", 10,50);
  //add styles here
  text("FOOD LEFT: " + foodS, 180, 250);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x) {

  if (x <= 0) {
    x = 0;
  }else{
    x = x - 1;
  }

   database.ref('/').update({
     Food:x
   })
}



