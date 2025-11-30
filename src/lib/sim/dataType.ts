export type dataType = {
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
};
