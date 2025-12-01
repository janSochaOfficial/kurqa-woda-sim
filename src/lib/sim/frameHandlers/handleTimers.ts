import type { simData } from "../types/simData";
import type { userInputs } from "../types/userInputs";

export function handleTimers(data: simData, inputs: userInputs): void {
  if (!data.startTime || data.endTime) return;
  data.timeElapsed = performance.now() - data.startTime;
}
