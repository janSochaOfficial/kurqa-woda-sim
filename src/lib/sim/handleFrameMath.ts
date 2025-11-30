import {
  ACCELERATION_FACTOR,
  REDIRECTION_FACTOR,
  RESISTANCE_FACTOR,
  TURNING_FACTOR,
  WATER_RESISTANCE,
} from "./consts";
import type { dataType } from "./dataType";
import type { userInputs } from "./userInputs";

export function handleFrameMath(data: dataType, inputs: userInputs) {
  // accelleration
  data.boat.speed.x +=
    Math.cos(data.boat.angle) * inputs.acceleration * ACCELERATION_FACTOR;
  data.boat.speed.y +=
    Math.sin(data.boat.angle) * inputs.acceleration * ACCELERATION_FACTOR;

  const speedMagnitude = Math.sqrt(
    data.boat.speed.x * data.boat.speed.x +
      data.boat.speed.y * data.boat.speed.y
  );
  // turning
  if (inputs.left) {
    data.boat.angle -= Math.sqrt(speedMagnitude) * TURNING_FACTOR;
  }
  if (inputs.right) {
    data.boat.angle += Math.sqrt(speedMagnitude) * TURNING_FACTOR;
  }

  if (data.boat.angle > Math.PI * 2) {
    data.boat.angle -= Math.PI * 2;
  }
  if (data.boat.angle < 0) {
    data.boat.angle += Math.PI * 2;
  }
  // speed redirection
  const newSpeedX =
    Math.cos(data.boat.angle) * speedMagnitude * REDIRECTION_FACTOR +
    data.boat.speed.x * (1 - REDIRECTION_FACTOR);
  const newSpeedY =
    Math.sin(data.boat.angle) * speedMagnitude * REDIRECTION_FACTOR +
    data.boat.speed.y * (1 - REDIRECTION_FACTOR);
  data.boat.speed.x = newSpeedX;
  data.boat.speed.y = newSpeedY;
  // resistances
  data.boat.speed.x -=
    Math.sign(data.boat.speed.x) *
    data.boat.speed.x *
    data.boat.speed.x *
    RESISTANCE_FACTOR;
  data.boat.speed.y -=
    Math.sign(data.boat.speed.y) *
    data.boat.speed.y *
    data.boat.speed.y *
    RESISTANCE_FACTOR;
  if (Math.abs(data.boat.speed.x) < WATER_RESISTANCE) {
    data.boat.speed.x = 0;
  } else {
    data.boat.speed.x -= Math.sign(data.boat.speed.x) * WATER_RESISTANCE;
  }
  if (Math.abs(data.boat.speed.y) < WATER_RESISTANCE) {
    data.boat.speed.y = 0;
  } else {
    data.boat.speed.y -= Math.sign(data.boat.speed.y) * WATER_RESISTANCE;
  }

  // position update
  data.boat.x += data.boat.speed.x;
  data.boat.y += data.boat.speed.y;
}
