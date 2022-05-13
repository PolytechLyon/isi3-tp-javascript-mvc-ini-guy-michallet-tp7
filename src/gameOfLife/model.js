import {
  GAME_SIZE,
  CELL_STATES,
  DEFAULT_ALIVE_PAIRS,
  RENDER_INTERVAL
} from "./constants.js";
import { initView, drawGame } from "./view.js";
export class Model {
  constructor() {
    this.width = GAME_SIZE;
    this.height = GAME_SIZE;
    this.raf = null;
  }

  init() {
    this.state = Array.from(new Array(this.height), () =>
      Array.from(new Array(this.width), () => CELL_STATES.NONE)
    );
    this.observers = [];
    DEFAULT_ALIVE_PAIRS.forEach(([x, y]) => {
      this.state[y][x] = CELL_STATES.ALIVE;
    });
    this.updated();
  }

  run(date = new Date().getTime()) {
    this.raf = requestAnimationFrame(() => {
      const currentTime = new Date().getTime();
      if (currentTime - date > RENDER_INTERVAL) {
        let etat_postCalc = Array.from(new Array(this.height), () =>
            Array.from(new Array(this.width), () => CELL_STATES.NONE)
          );
        for (let i = 0; i < this.width; i++) {
          for (let j = 0; j < this.height; j++) {
            const nbAlive = this.aliveNeighbours(i, j);
            console.log("("+i+","+j+") :" +nbAlive);
            etat_postCalc[j][i] = this.state[j][i];
            if(nbAlive === 3){
              etat_postCalc[j][i] = CELL_STATES.ALIVE;
            }
            else if(this.state[j][i] === CELL_STATES.ALIVE){
                if(nbAlive >= 4 || nbAlive < 2){
                  etat_postCalc[j][i] = CELL_STATES.DEAD;
                }
              }
          }
        }
        this.state = etat_postCalc; 
        this.updated();
        this.run(currentTime);
      } else {
        this.run(date);
      }
    });
  }

  stop() {
    cancelAnimationFrame(this.raf);
    this.raf = null;
  }

  reset() {
    this.init();
  }

  isCellAlive(x, y) {
    return x >= 0 &&
      y >= 0 &&
      y < this.height &&
      x < this.width &&
      this.state[y][x] === CELL_STATES.ALIVE
      ? 1
      : 0;
  }
  aliveNeighbours(x, y) {
    let number = 0;
    for(let i=-1;  i<=1 ; i++){
      for(let j=-1; j<=1; j++){
        if(j!==0 || i!==0){
          if(this.isCellAlive(x+i, y+j)){
            number++;
          }
        }
      }
    }
    return number;
  }

  add_observer(observer){
    this.observers.push(observer);
  }

  updated() {
    for (let i = 0; i < this.observers.length; i++) {
      this.observers[i](this);
    }
  }
}
