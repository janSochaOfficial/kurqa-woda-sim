export const SPEEED_BUOYS = [
  { x: 200, y: 200 },
  { x: 400, y: 200 },
  { x: 600, y: 200 },
  { x: 800, y: 200 },
  { x: 1000, y: 200 },
  { x: 200, y: 400 },
  { x: 400, y: 400 },
  { x: 600, y: 400 },
  { x: 800, y: 400 },
  { x: 1000, y: 400 },
];

export const SPEED_CHECKPOINTS = [
  { x: 200, y: 300 },
  { x: 400, y: 300 },
  { x: 600, y: 300 },
  { x: 800, y: 300 },
  { x: 1000, y: 300 },
];
export const SPEED_START_DATA = {
  boat: {
    x: 50,
    y: 300,
    angle: 0,
    speed: {
      x: 0,
      y: 0,
    },
  },
  stop: false,
  buoys: SPEEED_BUOYS,
  checkpoints: SPEED_CHECKPOINTS,
  checkpointsPassed: 0,
  drawing: {},
};
