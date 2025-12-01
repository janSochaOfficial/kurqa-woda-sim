import { FIELD_WIDTH } from "../consts";
import type { simData } from "../types/simData";
import type { userInputs } from "../types/userInputs";

export function handleDrawCalculations(
  data: simData,
  inputs: userInputs
): void {
  if (!data.fieldSize) return;
  if (data.fieldSize.width >= FIELD_WIDTH || data.boat.x < 200) {
    data.drawing.boat = {
      x: data.boat.x,
      y: data.boat.y,
      angle: data.boat.angle,
    };
    data.drawing.buoys = data.buoys.map((buoy) => ({
      x: buoy.x,
      y: buoy.y,
    }));
    data.drawing.checkpoints = data.checkpoints.map((checkpoint) => ({
      x: checkpoint.x,
      y: checkpoint.y,
    }));
    return;
  }
  const xTranslate = Math.min(
    data.boat.x - 200,
    FIELD_WIDTH - data.fieldSize.width
  );
  data.drawing.boat = {
    x: data.boat.x - xTranslate,
    y: data.boat.y,
    angle: data.boat.angle,
  };

  data.drawing.buoys = data.buoys.map((buoy) => ({
    x: buoy.x - xTranslate,
    y: buoy.y,
  }));
  data.drawing.checkpoints = data.checkpoints.map((checkpoint) => ({
    x: checkpoint.x - xTranslate,
    y: checkpoint.y,
  }));
}
