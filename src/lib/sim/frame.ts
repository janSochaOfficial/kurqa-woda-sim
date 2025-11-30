import type { dataType } from "./dataType";
import type { userInputs } from "./userInputs";

const FRAME_RATE = 60;
const ACCELERATION_FACTOR = 0.4;
const TURNING_FACTOR = 0.02;
const RESISTANCE_FACTOR = 0.01;
const WATER_RESISTANCE = 0.02;
const REDIRECTION_FACTOR = 0.5;

export async function frame(
  last: Promise<void>,
  timeout: Promise<void>,
  data: dataType,
  inputs: userInputs,
  onFrame: (data: dataType, inputs: userInputs) => void
): Promise<void> {
  await Promise.all([last, timeout]);
  const newTimeout = new Promise<void>((res) =>
    setTimeout(res, 1000 / FRAME_RATE)
  );
  const currentFrame = new Promise<void>(async (res) => {
    onFrame(data, inputs);

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

    res();
  });
  if (data.stop) return;
  frame(currentFrame, newTimeout, data, inputs, onFrame);
}
