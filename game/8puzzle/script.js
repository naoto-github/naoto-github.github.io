class Tile{
  constructor(id, i, j, length){
    this.id = id;    
    this.i = i;
    this.j = j;
    this.x = i * length;
    this.y = j * length;
    this.length = length;
    this.grab = false;
  }
  
  // Inside (x, y) or not
  inside(x, y){
    if(this.x <= x && x <= (this.x + this.length)){
      if(this.y <= y && y <= (this.y + this.length)){    
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
    if(this.id == 0){
      p.fill("black");
      p.stroke("black");
      p.rect(this.x, this.y, this.length, this.length)
    }
    else{
      p.fill("blue");
      p.stroke("black");  
      p.rect(this.x, this.y, this.length, this.length)
      
      p.stroke("white");
      p.fill("white");
      p.textSize(32);
      p.text(this.id, this.x + this.length/2 - 10, this.y + this.length/2 + 10)
    }
  }
}

class State{
  constructor(tile_list){
    this.tile_list = tile_list;
    this.step = 0;
  }
  
  getState(){
    let state_list = [-1,-1,-1,-1,-1,-1,-1,-1,-9]
    for(let tile of tile_list){
      let index = tile.i + tile.j * 3;
      state_list[index] = tile.id;
    }
    return state_list;
  }

  update(){
    for(let tile of this.tile_list){
      tile.x = tile.i * tile.length;
      tile.y = tile.j * tile.length;
    }
  }  
  
  setState(state_list){
    for(let k=0; k<state_list.length; k++){
      let i = Math.trunc(k % 3);
      let j = Math.trunc(k / 3);
      let index = state_list[k];
      this.tile_list[index].i = i;
      this.tile_list[index].j = j;
    }
    
    this.update()
  }
  
  draw(p){
    p.fill("white");
    p.rect(0, 450, 450, 50);
    
    p.stroke("black");
    p.fill("black");
    p.textSize(20);
    let state_text = `State: (${this.getState()})`
    p.text(state_text, 40, 470);
    
    let step_text = `Step: ${this.step}`;
    p.text(step_text, 330, 470);
  }
  
}

let tile_0 = new Tile(0, 0, 0, 150);
let tile_1 = new Tile(1, 1, 0, 150);
let tile_2 = new Tile(2, 2, 0, 150);
let tile_3 = new Tile(3, 0, 1, 150);
let tile_4 = new Tile(4, 1, 1, 150);
let tile_5 = new Tile(5, 2, 1, 150);
let tile_6 = new Tile(6, 0, 2, 150);
let tile_7 = new Tile(7, 1, 2, 150);
let tile_8 = new Tile(8, 2, 2, 150);

let tile_list = [tile_0, tile_1, tile_2, tile_3, tile_4, tile_5, tile_6, tile_7, tile_8]

let state = new State(tile_list);
state.setState([3,1,5,0,7,4,6,8,2]);

new Vue({
  el: "#main",
  data: {
    title: "8 Puzzle",  
    state_text: "3,1,5,0,7,4,6,8,2",
  },
  mounted(){
    
    let sketch = function(p){
      
      p.setup = function(){
        let canvas = p.createCanvas(450, 500);
        canvas.parent("canvas");
      };
      
      p.draw = function(){
        p.background(0);
        
        let grabbed_tile = null;
        
        for(let tile of tile_list){
          if(tile.grab == true){
            grabbed_tile = tile 
          }
          else{
            tile.draw(p);
          }
        }
        
        if(grabbed_tile != null){
          grabbed_tile.draw(p);
        }
        
        state.draw(p);
        
      };
      
      p.mousePressed = function(){
        for(let tile of tile_list){
          if(tile.inside(p.mouseX, p.mouseY)){
            if(tile.id != "b"){
              tile.grab = true;
            }
          }
        }
      };
      
      p.mouseDragged = function(){
        for(let tile of tile_list){
          if(tile.grab == true){
            tile.move(p.movedX/2, p.movedY/2);
          }
        }
      }
      
      p.mouseReleased = function(){
        for(let tile of tile_list){
          if(tile.grab == true){
            tile.grab = false;
            
            let d = Math.abs(tile.i - tile_0.i) + Math.abs(tile.j - tile_0.j)
            if(d == 1){
              [tile.i, tile_0.i] = [tile_0.i, tile.i];
              [tile.j, tile_0.j] = [tile_0.j, tile.j];
              state.step += 1;
            }
          }
        }
        state.update();        
      }
    }
    
    let myp5 = new p5(sketch);
  },
  methods:{
    reset: function(){
      state_list = this.state_text.split(",");
      state.setState(state_list);
      state.step = 0;
    }
  }
})