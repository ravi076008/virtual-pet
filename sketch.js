//Create variables here
var dog,dogImage1,dogImage2,database,foodStock,foodS;
var feed,addFood,foodObj,FeedTime;
var fedTime,lastFed
function preload()
{
  dogImage1=loadImage("images/dogImg.png");
  dogImage2=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(800, 700);
 database=firebase.database()
 dog=createSprite(250,300,150,150);
 dog.scale=0.15
 dog.addImage(dogImage1)

 foodstock=database.ref('food')
foodstock.on("value",readStock)
textSize(20)
 feed=createButton('feed the dog')
 feed.position(700,95)
 feed.mousePressed(feedDog)

 addFood=createButton('add the food')
 addFood.position(800,95)
 addFood.mousePressed(addFoods)
 
 
 foodObj=new Food();
}


function draw() {  
background(0)
foodObj.display();

fedTime=database.ref('FeedTime'); 
fedTime.on("value",function(data){ lastFed=data.val(); })

fill(255,255,254); textSize(15);
 if(lastFed>=12){ 
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }
   else if(lastFed==0){ 
     text("Last Feed : 12 AM",350,30);
     }
   else{ 
     text("Last Feed : "+ lastFed + " AM", 350,30);
 }

  drawSprites();
  fill(255,255,254);
   stroke("yellow"); 
  text("Food remaining : "+foodS,170,200); 
  
  
  //add styles here

}
function readStock(data){
foodS=data.val()

foodObj.updateFoodStock(foodS);

}
function writeStock(x){
if(x<=0){
x=0

}
else{
  x=x-1

}
database.ref('/').update({
  food:x
})

}


  function feedDog(){
     dog.addImage(dogImage2);
     if(foodObj.getFoodStock()<= 0)
    
     { 
       foodObj.updateFoodStock(foodObj.getFoodStock()*0);
       }
     else{ 
       foodObj.updateFoodStock(foodObj.getFoodStock()-1); 
      }
   database.ref('/').update({ food:foodObj.getFoodStock(), FeedTime:hour() }) }


   function addFoods(){ 
    foodS++;
     database.ref('/').update({ food:foodS })
     }






