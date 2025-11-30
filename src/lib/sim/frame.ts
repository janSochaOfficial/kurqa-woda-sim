import { FRAME_RATE } from "./consts";
import type { dataType } from "./dataType";
import { handleCheckpointCollision } from "./handleCheckpointCollision";
import { handleDrawCalculations } from "./handleDrawCalculations";
import { handleFrameMath } from "./handleFrameMath";
import { handleTimers } from "./handleTimers";
import type { inFrameFunction } from "./inFrameFunction";
import type { userInputs } from "./userInputs";

export const inFrameFunctions: inFrameFunction[] = [
  handleFrameMath,
  handleCheckpointCollision,
  handleDrawCalculations,
  handleTimers,
];

export async function frame(
  last: Promise<void>,
  timeout: Promise<void>,
  data: dataType,
  inputs: userInputs,
  onFrame: inFrameFunction,
  onFrameBeforeMath: boolean = false
): Promise<void> {
  await Promise.all([last, timeout]);
  const newTimeout = new Promise<void>((res) =>
    setTimeout(res, 1000 / FRAME_RATE)
  );
  const currentFrame = new Promise<void>(async (res) => {
    if (!data.startTime) {
      handleDrawCalculations(data, inputs);
      res();
      return;
    }
    const functionsStack = onFrameBeforeMath
      ? [onFrame, ...inFrameFunctions]
      : [...inFrameFunctions, onFrame];

    functionsStack.forEach((func) => func(data, inputs));

    res();
  });
  if (data.stop) return;
  frame(currentFrame, newTimeout, data, inputs, onFrame);
}
