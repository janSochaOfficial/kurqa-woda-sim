import {
  ACCELERATION_FACTOR,
  FRAME_RATE,
  REDIRECTION_FACTOR,
  REDIRECTION_LOSS_FACTOR,
  RESISTANCE_FACTOR,
  TURNING_FACTOR,
  WATER_RESISTANCE,
} from "../consts";
import type { simData } from "../types/simData";
import type { userInputs } from "../types/userInputs";

export function handleFrameMath(data: simData, inputs: userInputs) {
  const dt = ((data.deltaTime ?? 0) / (1000 / FRAME_RATE)) * 0.8;
  // acceleration
  data.boat.speed.x +=
    Math.cos(data.boat.angle) * inputs.acceleration * ACCELERATION_FACTOR * dt;
  data.boat.speed.y +=
    Math.sin(data.boat.angle) * inputs.acceleration * ACCELERATION_FACTOR * dt;

  let speedMagnitude = Math.sqrt(
    data.boat.speed.x * data.boat.speed.x +
      data.boat.speed.y * data.boat.speed.y
  );

  // turning
  const turningRate = Math.log2(1 + speedMagnitude) * TURNING_FACTOR * dt;
  if (inputs.left) {
    data.boat.angle -= turningRate;
  }
  if (inputs.right) {
    data.boat.angle += turningRate;
  }

  // normalize angle to [0, 2π)
  data.boat.angle =
    ((data.boat.angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);

  // resistances - quadratic drag
  const resistanceReduction =
    speedMagnitude * speedMagnitude * RESISTANCE_FACTOR * dt;
  const newMagnitude = Math.max(0, speedMagnitude - resistanceReduction);

  // maintain direction while reducing speed
  if (speedMagnitude > 0) {
    const scale = newMagnitude / speedMagnitude;
    data.boat.speed.x *= scale;
    data.boat.speed.y *= scale;
  }

  // linear drag (water resistance)
  const linearDragReduction = WATER_RESISTANCE * dt;
  if (Math.abs(data.boat.speed.x) < linearDragReduction) {
    data.boat.speed.x = 0;
  } else {
    data.boat.speed.x -= Math.sign(data.boat.speed.x) * linearDragReduction;
  }

  if (Math.abs(data.boat.speed.y) < linearDragReduction) {
    data.boat.speed.y = 0;
  } else {
    data.boat.speed.y -= Math.sign(data.boat.speed.y) * linearDragReduction;
  }

  speedMagnitude = Math.sqrt(
    data.boat.speed.x * data.boat.speed.x +
      data.boat.speed.y * data.boat.speed.y
  );

  // speed redirection
  if (speedMagnitude) {
    const redirectionFactor = Math.min(1, REDIRECTION_FACTOR * dt);
    const newSpeedX =
      Math.cos(data.boat.angle) * speedMagnitude * redirectionFactor +
      data.boat.speed.x * (1 - redirectionFactor);
    const newSpeedY =
      Math.sin(data.boat.angle) * speedMagnitude * redirectionFactor +
      data.boat.speed.y * (1 - redirectionFactor);

    // normalize back to original speed magnitude
    const newMagnitude = Math.sqrt(
      newSpeedX * newSpeedX + newSpeedY * newSpeedY
    );
    const preservedSpeedX = (newSpeedX / newMagnitude) * speedMagnitude;
    const preservedSpeedY = (newSpeedY / newMagnitude) * speedMagnitude;

    data.boat.speed.x = preservedSpeedX;
    data.boat.speed.y = preservedSpeedY;
  }

  // position update
  data.boat.x += data.boat.speed.x * dt;
  data.boat.y += data.boat.speed.y * dt;
}
