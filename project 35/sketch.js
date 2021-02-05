var balloon, balloonAnimation;
var backGroundImg
var database;

function preload(){
backGroundImg = loadImage("Hot Air Ballon-01.png");
balloonAnimaiton = loadAnimation("Hot Air Ballon-02.png", "Hot Air Ballon-03.png", "Hot Air Ballon-04.png");
}

function setup() {
  createCanvas(500,500);
  createSprite(400, 200, 50, 50);

  balloon = createSprite(250,250,75,75);
  balloon.addAnimation(balloonAnimation);

  datebase = firebase.database();
  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value", readPosition, showError);
}

function draw() {
  background(backGroundImg);  

  if(keyDown(UP_ARROW)){
    writePosition(0,-5);
  }

  if(keyDown(DOWN_ARROW)){
    writePosition(0,5);
  }

  if(keyDown(LEFT_ARROW)){
    writePosition(-5,0);
  }

  if(keyDown(RIGHT_ARROW)){
    writePosition(5,0);
  }

  drawSprites();
}

function writePosition(x,y){
  database.ref('balloon/position').set({
    x: position.x + x,
    y: position.y + y
  })
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("there is an error");
}