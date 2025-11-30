import type { dataType } from "./dataType";
import type { userInputs } from "./userInputs";

export function handleTimers(data: dataType, inputs: userInputs): void {
  if (!data.startTime || data.endTime) return;
  data.timeElapsed = performance.now() - data.startTime;
}
