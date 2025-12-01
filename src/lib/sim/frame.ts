import { FRAME_RATE } from "./consts";
import type { simData } from "./types/simData";
import {
  handleBuoysCollision,
  handleCheckpointCollision,
  handleDrawCalculations,
  handleFrameMath,
  handleTimers,
  type frameHandler,
} from "./frameHandlers";

import type { userInputs } from "./types/userInputs";

export const inFrameFunctions: frameHandler[] = [
  handleFrameMath,
  handleCheckpointCollision,
  handleBuoysCollision,
  handleTimers,
  handleDrawCalculations,
];

export async function frame(
  last: Promise<number>,
  timeout: Promise<void>,
  data: simData,
  inputs: userInputs,
  onFrame: frameHandler,
  onFrameBeforeMath: boolean = false
): Promise<void> {
  const [lastTime, _] = await Promise.all([last, timeout]);
  const newTimeout = new Promise<void>((res) =>
    setTimeout(res, 1000 / FRAME_RATE)
  );
  const currentFrame = new Promise<number>(async (res) => {
    const startTime = performance.now();
    if (!data.startTime) {
      handleDrawCalculations(data, inputs);
      res(startTime);
      return;
    }
    data.deltaTime = startTime - lastTime;
    const functionsStack = onFrameBeforeMath
      ? [onFrame, ...inFrameFunctions]
      : [...inFrameFunctions, onFrame];

    functionsStack.forEach((func) => func(data, inputs));

    res(startTime);
  });
  if (data.stop) return;
  frame(currentFrame, newTimeout, data, inputs, onFrame);
}
