// ID to Number
let bar_id_dict = {
  "A": "0",
  "B": "1",
  "C": "2"
}

// Bar
class Bar{
  constructor(id, x, y, width, height){
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.list = [];
  }
  
  draw(p){
    p.fill("white");
    p.noStroke();
    
    p.rect(this.x - this.width /2, this.y, this.width, 10);
    p.rect(this.x - 5, this.y - this.height, 10, this.height);

    p.stroke("white");
    p.fill("white");
    p.textSize(32);
    p.text(this.id, this.x-12, this.y + 50)
  }
  
}

// Color Box
class Box{
  constructor(color, x, y, width, height, state) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.state = state; // A, B, or C
    this.grab = false;
  }
  
  // Inside (x, y) or not
  inside(x, y){
    if(this.x <= x && x <= (this.x + this.width)){
      if(this.y <= y && y <= (this.y + this.height)){    
        return true;
      }
    }
    return false;
  }
  
  // Move (x, y)
  move(x, y){
    this.x += x;
    this.y += y;
  }
  
  draw(p){
    p.fill(this.color);
    p.stroke("white");
    p.rect(this.x, this.y, this.width, this.height);
  }
}

// State of Game
class State{
  
  constructor(abar, bbar, cbar, rbox, gbox, bbox){
    this.step = 0;
    
    this.abar = abar;
    this.bbar = bbar;
    this.cbar = cbar;
    
    this.rbox = rbox;
    this.gbox = gbox;
    this.bbox = bbox;
    this.boxes = [this.rbox, this.gbox, this.bbox];
    
    // Dictionary of Boxes
    this.bar_dict = {
      "A": this.abar,
      "B": this.bbar,
      "C": this.cbar
    }
    
  }
  
  resetState(){
    for(let key in this.bar_dict){
      let bar = this.bar_dict[key];
      bar.list = [];
    }
    
    for(let box of [...this.boxes].reverse()){
      let bar = this.bar_dict[box.state]
      bar.list.push(box);
    }
    
    //console.log(this.bar_dict);
  }
  
  update(){    
    for(let key in this.bar_dict){
      let bar = this.bar_dict[key];
      for(let i=0; i<bar.list.length; i++){
        let box = bar.list[i];
        box.x = bar.x - (box.width / 2);
        box.y = (bar.y - box.height) - (i * box.height);
      }
    }
  }
  
  isTop(target_box){
    for(let key in this.bar_dict){
      let bar = this.bar_dict[key];
      if(bar.list.length > 0){
        let top_box = bar.list[bar.list.length - 1]
        if(top_box.color == target_box.color){
          return true;
        }
      }
    }
    return false;
  }
  
  draw(p){
    p.stroke("yellow");
    p.fill("yellow");
    
    let rstate = bar_id_dict[this.rbox.state];
    let gstate = bar_id_dict[this.gbox.state];
    let bstate = bar_id_dict[this.bbox.state];
    
    let state_text = `State: (${rstate}, ${bstate}, ${gstate})`
    p.textSize(32);
    p.text(state_text, 20, 40); 
    
    let step_text = `Step: ${this.step}`
    p.text(step_text, 450, 40);
  }
}

let abar = new Bar("A", 110, 400, 200, 300);
let bbar = new Bar("B", 320, 400, 200, 300);
let cbar = new Bar("C", 530, 400, 200, 300);

let rbox = new Box("red", 100, 100, 100, 50, "A");
let gbox = new Box("green", 100, 150, 140, 50, "A");
let bbox = new Box("blue", 100, 200, 180, 50, "A");

let state = new State(abar, bbar, cbar, rbox, gbox, bbox);

new Vue({
  el: "#main",
  data: {
    title: "Tower of Hanoi",  
  },
  mounted(){
    
    let sketch = function(p){
    
      //let abar = new Bar("A", 110, 400, 200, 300);
      //let bbar = new Bar("B", 320, 400, 200, 300);
      //let cbar = new Bar("C", 530, 400, 200, 300);
      let bars = [abar, bbar, cbar];
      
      //let rbox = new Box("red", 100, 100, 100, 50, "A");
      //let gbox = new Box("green", 100, 150, 140, 50, "A");
      //let bbox = new Box("blue", 100, 200, 180, 50, "A");
      let boxes = [rbox, gbox, bbox];
      
      //let state = new State(abar, bbar, cbar, rbox, gbox, bbox);
      state.resetState();
      state.update();
      
      p.setup = function(){
        let canvas = p.createCanvas(640, 480);
        canvas.parent("canvas");
      };
      
      p.draw = function(){
        p.background(0);
        
        // Bar
        for(let bar of bars){
          bar.draw(p);
        }
        
        // Box
        for(let box of boxes){
          box.draw(p);
        }
        
        // State
        state.draw(p);
      };
      
      p.mousePressed = function(){
        for(let box of boxes){
            if(box.inside(p.mouseX, p.mouseY)){
              if(state.isTop(box)){
                box.grab = true;
              }
            }
        }
      }
      
      p.mouseDragged = function(){
        for(let box of boxes){
          if(box.grab == true){
            box.move(p.movedX/2, p.movedY/2);
          }         
        }
      }
    
      p.mouseReleased = function(){
        for(let box of boxes){
          
          // Reset Grab 
          box.grab = false;
          
          // Find the minimum distance bar from the box
          let min_d = Number.POSITIVE_INFINITY;
          let min_bar = null;
          
          for(let bar of bars){
            let d = math.distance([box.x, box.y], [bar.x, bar.y]);
            if(d < min_d){
              min_d = d;
              min_bar = bar;
            }
          }
          
          // Reset the belonging bar of the box
          if(box == rbox){
            if(box.state != min_bar.id){
              box.state = min_bar.id;
              state.step += 1;
            }
          }
          else if(box == gbox){
            if(!min_bar.list.includes(rbox)){
              if(box.state != min_bar.id){
                box.state = min_bar.id;
                state.step += 1;
              }
            }
          }
          else if(box == bbox){
            if(!min_bar.list.includes(rbox)){
              if(!min_bar.list.includes(gbox)){
                if(box.state != min_bar.id){
                  box.state = min_bar.id;
                  state.step += 1;
                }
              }
            }
          }
        }
        
        state.resetState();
        state.update();    
        
      }
    }
    
    let myp5 = new p5(sketch);
  },
  methods:{
    reset: function(){
      rbox.state = "A";
      gbox.state = "A";
      bbox.state = "A";
      state.resetState();
      state.update();     
      state.step = 0;
    }
  }
})