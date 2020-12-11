//Create variables here
var dog;
var dogImage;
var happyDog;
var database;
var foodS,foodStock;

function preload()
{
  //load images here
  dogImage=loadImage("Dog.png");
  happyDog=loadImage("happydog.png");
}

function setup() {
  createCanvas(500,500);
  dog=createSprite(250,250,1,1);
  dog.scale=0.15;
  dog.addImage(dogImage);

  database = firebase.database();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

}


function draw() {
  background(46,139,87);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();
  //add styles here
  fill("white");
  //stroke("white");
  //strokeWeight(1);
  textSize(12);
  text("Note : Press UP_ARROW Key To Feed Drago Milk!",125,30);
  textSize(15);
  text("Food remaining : "+foodS,190,190);

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}
