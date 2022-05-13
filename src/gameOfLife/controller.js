
let thismodel;
export const controller = model => {
  model.run();
  thismodel = model;
};

export const startAction = event =>  {
  thismodel.run();
};

export const stopAction = event =>  {
  thismodel.stop();
};

export const resetAction = event =>  {
  thismodel.reset();
};