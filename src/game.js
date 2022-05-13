import { initView, drawGame } from "./gameOfLife/view.js";
import { Model } from "./gameOfLife/model.js";
import {
  controller,
  startAction,
  stopAction,
  resetAction
} from "./gameOfLife/controller.js";
if (!document.getElementById)
  document.write('<link rel="stylesheet" type="text/css" href="./style.css">');
initView();

const model = new Model();

model.init();
drawGame(model);
controller(model);
model.add_observer(drawGame);

const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
startButton.addEventListener("click", startAction);
stopButton.addEventListener("click", stopAction);
resetButton.addEventListener("click", resetAction);