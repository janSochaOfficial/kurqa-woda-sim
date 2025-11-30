export const SLALOM_BOUYS = [
  { x: 200, y: 300 },
  { x: 400, y: 300 },
  { x: 600, y: 300 },
  { x: 800, y: 300 },
];

export const SLALOM_CHECKPOINTS = [
  { x: 200, y: 250 },
  { x: 400, y: 350 },
  { x: 600, y: 250 },
  { x: 800, y: 350 },
  { x: 900, y: 300 },
  { x: 800, y: 250 },
  { x: 600, y: 350 },
  { x: 400, y: 250 },
  { x: 200, y: 350 },
];
export const SLALOM_START_DATA = {
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
  buoys: SLALOM_BOUYS,
  checkpoints: SLALOM_CHECKPOINTS,
  checkpointsPassed: 0,
  drawing: {},
};
