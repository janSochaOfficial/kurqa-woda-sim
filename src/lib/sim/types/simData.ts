export type simData = {
  boat: {
    x: number;
    y: number;
    angle: number;
    speed: {
      x: number;
      y: number;
    };
  };
  stop: boolean;
  buoys: { x: number; y: number }[];
  checkpoints: { x: number; y: number }[];
  checkpointsPassed: number;
  startTime?: number;
  endTime?: number;
  drawing: {
    boat?: {
      x: number;
      y: number;
      angle: number;
    };
    buoys?: { x: number; y: number }[];
    checkpoints?: { x: number; y: number }[];
  };
  fieldSize?: {
    width: number;
    height: number;
  };
  timeElapsed?: number;
  deltaTime?: number;
};
