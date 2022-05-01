class Button{
  constructor(x, y, width, height, id){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.id = id;
  }
  
  draw(p){
    p.fill("yellow");
    p.stroke("yellow");
    p.rect(this.x, this.y, this.width, this.height);
    
    p.fill("black");
    p.stroke("black");
    p.textSize(20);
    p.text(this.id, this.x + this.width / 2 - 15, this.y + this.height / 2 + 6);
  }
  
  inside(x, y){
    if(this.x <= x && x <= (this.x + this.width)){
      if(this.y <= y && y <= (this.y + this.height)){
        return true;
      }
    }
    return false;
  }
}

class Jug{
  constructor(limit, amount, x, y, width, height){
    this.limit = limit;
    this.amount = amount;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  
  draw(p){
    
    for(let i=0; i<this.amount; i++){
      p.fill("blue");
      p.stroke("blue");
      p.rect(this.x - this.width/2 + 10, this.y - 100*(i+1)-10, this.width-10, 100);
    }    
    
    p.fill("silver");
    p.stroke("silver");
    p.rect(this.x - this.width/2, this.y - 10, this.width, 10);
    p.rect(this.x - this.width/2, this.y - this.height-10, 10, this.height+10); 
    p.rect(this.x + this.width/2, this.y - this.height-10, 10, this.height+10);
    
  }
}

class State{
  constructor(jug_3, jug_4){
    this.jug_3 = jug_3;
    this.jug_4 = jug_4;
    this.step = 0;
  }
  
  getState(){
    return [this.jug_3.amount, this.jug_4.amount];
  }
  
  setState(amount_3, amount_4){
    this.jug_3.amount = amount_3;
    this.jug_4.amount = amount_4;
  }
  
  action(action_id){
    if(action_id == "A1"){
      this.jug_3.amount = 3;
    }
    else if(action_id == "A2"){
      this.jug_4.amount = 4;
    }
    else if(action_id == "A3"){
      this.jug_3.amount = 0;
    }  
    else if(action_id == "A4"){
      this.jug_4.amount = 0;
    }      
    else if(action_id == "A5"){
      this.jug_4.amount = this.jug_4.amount + this.jug_3.amount;
      let d = math.max(this.jug_4.amount - this.jug_4.limit, 0);
      this.jug_4.amount = this.jug_4.amount - d;
      this.jug_3.amount = d;
    }
    else if(action_id == "A6"){
      this.jug_3.amount = this.jug_3.amount + this.jug_4.amount;
      let d = math.max(this.jug_3.amount - this.jug_3.limit, 0);
      this.jug_3.amount = this.jug_3.amount - d;
      this.jug_4.amount = d;
    }
    this.step += 1;
  }
  
  draw(p){
    p.stroke("white");
    p.fill("white");
    
    p.textSize(32);
    let state_text = `State: (${this.jug_3.amount}, ${this.jug_4.amount})`;
    p.text(state_text, 50, 50);
    let step_text = `Step: ${this.step}`;
    p.text(step_text, 50, 90);
    
  }
}

jug_3 = new Jug(3, 3, 150, 440, 200, 300);
jug_4 = new Jug(4, 3, 450, 440, 200, 400);

bt1 = new Button(40, 460, 80, 30, "A1");
bt2 = new Button(130, 460, 80, 30, "A2");
bt3 = new Button(220, 460, 80, 30, "A3");
bt4 = new Button(310, 460, 80, 30, "A4");
bt5 = new Button(400, 460, 80, 30, "A5");
bt6 = new Button(490, 460, 80, 30, "A6");
bt_list = [bt1, bt2, bt3, bt4, bt5, bt6];

state = new State(jug_3, jug_4);
state.setState(0, 0);

new Vue({
  el: "#main",
  data: {
    title: "JugProblem",  
  },
  mounted(){
    
    let sketch = function(p){
      p.setup = function(){
        let canvas = p.createCanvas(600, 500);
        canvas.parent("canvas");
      };
      
      p.draw = function(){
        p.background(0);
        
        jug_3.draw(p);
        jug_4.draw(p);
        
        state.draw(p);
        
        for(let bt of bt_list){
          bt.draw(p);
        }
      }
      
      p.mousePressed = function(){
        for(let bt of bt_list){
          if(bt.inside(p.mouseX, p.mouseY)){
            let action_id = bt.id;
            state.action(action_id);
          }
        }
      }
    }
    
    let myp5 = new p5(sketch);
  },
  methods:{
    reset: function(){
      state.setState(0, 0);
      state.step = 0;
    }
  }
})