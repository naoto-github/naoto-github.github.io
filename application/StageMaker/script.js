let button_ball;
let button_goal;
let button_slope;
let button_lift;
let button_jump;
let type;

let button_undo;
let button_clear;
let button_download;

let radius;
let p1_x;
let p1_y;

objects = []

function setup(){
  createCanvas(1200, 800);
  background(0, 0, 0);
  
  button_ball = createButton('Ball');
  button_ball.size(100, 50)
  button_ball.position(100, 750);
  button_ball.mousePressed(selectBall);
  
  button_goal = createButton('Goal');
  button_goal.size(100, 50)
  button_goal.position(200, 750);
  button_goal.mousePressed(selectGoal);
  
  button_slope = createButton('Slope');
  button_slope.size(100, 50)
  button_slope.position(300, 750);
  button_slope.mousePressed(selectSlope);
  
  button_lift = createButton('Lift');
  button_lift.size(100, 50)
  button_lift.position(400, 750);
  button_lift.mousePressed(selectLift);
  
  button_jump = createButton('Jump');
  button_jump.size(100, 50)
  button_jump.position(500, 750);
  button_jump.mousePressed(selectJump);
  
  button_undo = createButton('Undo');
  button_undo.size(100, 50)
  button_undo.position(600, 750);
  button_undo.mousePressed(selectUndo);
  button_undo.style("background", "#cc0000");
  
  button_clear = createButton('Clear');
  button_clear.size(100, 50)
  button_clear.position(700, 750);
  button_clear.mousePressed(selectClear);
  button_clear.style("background", "#cc0000");
  
  button_download = createButton('Download');
  button_download.size(100, 50)
  button_download.position(800, 750);
  button_download.mousePressed(selectDownload);
  button_download.style("background", "#cc0000");  
}

function draw(){
  background(0, 0, 0);
  for(let object of objects){
    object.paint();
  }
}

function mousePressed(){
  
  radius;
  
  if(inside(mouseX, mouseY)){
    return
  }
  
  switch(type){
    case 0:
      ball = new Ball(mouseX);
      index = includeBallIndex(objects);
      if(index != -1){
        objects.splice(index, 1);
      }
      objects.push(ball);
      
      break
    case 1:
      goal = new Goal(mouseX, mouseY);
      index = includeGoalIndex(objects);
      if(index != -1){
        objects.splice(index, 1);
      }
      objects.push(goal);
      break
    case 2:
      p1_x = mouseX;
      p1_y = mouseY;
      break
    case 3:
      p1_x = mouseX;
      p1_y = mouseY;
      break
    case 4:
      jump = new Jump(mouseX, mouseY);
      objects.push(jump);
      break
  }
}

function mouseDragged(){
  
  if(inside(mouseX, mouseY)){
    return
  }
  
  switch(type){
    case 2:
      break
   case 3:
      break
  }
}

function mouseReleased(){
  
  if(inside(mouseX, mouseY)){
    return
  }
  
  switch(type){
    case 2:
      slope = new Slope(p1_x, p1_y, mouseX, mouseY);
      objects.push(slope);
      break
    case 3:
      lift = new Lift(p1_x, p1_y, mouseX, mouseY);
      objects.push(lift);
      break
  }
}


function selectBall() {
  type = 0;
}

function selectGoal(){
  type = 1;
}

function selectSlope(){
  type = 2;
}

function selectLift(){
  type = 3;
}

function selectJump(){
  type = 4;
}

function selectUndo(){
  objects.pop();
}

function selectClear(){
  objects = [];
}

function selectDownload(){
  
  let json = toJSON();
  let blob = new Blob([JSON.stringify(json, null, '  ')], {type: 'application\/json'});
  
  var link = document.createElement( 'a' );
	link.href = window.URL.createObjectURL(blob);
	link.download = "stage1.json";
	link.click();

}

function insideButton(button, mouseX, mouseY){
  
  if(button.x <= mouseX && mouseX <= (button.x + button.width)){
    if(button.y <= mouseY && mouseY <= (button.y + button.height)){
      return true
    }
  } 
  
  return false
}

function inside(mouseX, mouseY){
  if(insideButton(button_ball, mouseX, mouseY)){
    return true
  }
  else if(insideButton(button_goal, mouseX, mouseY)){
    return true
  }
  else if(insideButton(button_slope, mouseX, mouseY)){
    return true
  }
  else if(insideButton(button_lift, mouseX, mouseY)){
    return true
  }
  else if(insideButton(button_jump, mouseX, mouseY)){
    return true
  }
  else if(insideButton(button_undo, mouseX, mouseY)){
    return true
  }
  else if(insideButton(button_clear, mouseX, mouseY)){
    return true
  }
  else if(insideButton(button_download, mouseX, mouseY)){
    return true
  }
  
  return false
}

function includeBallIndex(objects){
  for(let i=0; i<objects.length; i++){
    object = objects[i];
    if(object instanceof Ball){
      return i;
    }
  }
  return -1;
}

function includeGoalIndex(objects){
  for(let i=0; i<objects.length; i++){
    object = objects[i];
    if(object instanceof Goal){
      return i;
    }
  }
  return -1;
}

function toJSON(){
  
  json = {};
  
  jumps = [];
  slopes = [];
  lifts = [];
  
  json["author"] = "N.Mukai"
  
  for(let object of objects){
    if(object instanceof Ball){
      json["ball"] = {
        "x": object.x
      }
    }
    else if(object instanceof Goal){
      json["goal"] = {
        "x": object.x,
        "y": object.y
      }
    }
    else if(object instanceof Jump){
      jumps.push(object);
    }
    else if(object instanceof Slope){
      slopes.push(object);
    }
    else if(object instanceof Lift){
      lifts.push(object);
    }
  }
  
  json_list = []
  for(let jump of jumps){
    json_jump = {
      "x": jump.x,
      "y": jump.y
    }
    json_list.push(json_jump);
  }
  json["jumps"] = json_list;
  
  json_list = []
  for(let slope of slopes){
    json_slope = {
      "x": slope.p1_x,
      "y": slope.p1_y,
      "w": slope.p2_x - slope.p1_x,
      "h": slope.p2_y - slope.p1_y
    }
    json_list.push(json_slope);
  }
  json["slopes"] = json_list;
  
  json_list = []
  for(let lift of lifts){
    json_lift = {
      "x": lift.p1_x,
      "y": lift.p1_y,
      "w": lift.p2_x - lift.p1_x,
      "h": 10,
      "l": 200,
      "r": lift.angle
    }
    json_list.push(json_lift);
  }
  json["lifts"] = json_list;
  
  return json;
}

class Ball{
  constructor(x){
    this.x = x
    this.y = 0
    this.radius = 30;
  }
  paint(){
    fill("yellow");
    noStroke();
    ellipse(this.x, this.y, this.radius*2, this.radius*2);
  }
}

class Goal{
  constructor(x, y){
    this.x = x
    this.y = y
    this.radius = 50;
  }
  paint(){
    fill("red");
    noStroke();
    ellipse(this.x, this.y, this.radius*2, this.radius*2);
  }
}

class Jump{
  constructor(x, y){
    this.x = x
    this.y = y
    this.radius = 100;
  }
  paint(){
    fill("green");
    noStroke();
    ellipse(this.x, this.y, this.radius*2, this.radius*2);
  }
}

class Slope{
  constructor(p1_x, p1_y, p2_x, p2_y){
    this.p1_x = p1_x;
    this.p1_y = p1_y;
    this.p2_x = p2_x;
    this.p2_y = p2_y;
  }
  paint(){
    fill("white");
    noStroke();
    rect(this.p1_x, this.p1_y, (this.p2_x - this.p1_x), (this.p2_y - this.p1_y));
  }
}

class Lift{
  constructor(p1_x, p1_y, p2_x, p2_y){
    this.p1_x = p1_x;
    this.p1_y = p1_y;
    this.p2_x = p2_x;
    this.p2_y = p2_y;
    this.angle = Math.atan2(p2_y - p1_y, p2_x - p2_y);
  }
  paint(){
    stroke("blue");
    strokeWeight(20);
    line(this.p1_x, this.p1_y, this.p2_x, this.p2_y);
  }
}