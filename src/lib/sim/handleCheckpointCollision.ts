import { CHECKPOINT_RADIUS } from "./consts";
import type { dataType } from "./dataType";
import type { userInputs } from "./userInputs";

export function handleCheckpointCollision(
  data: dataType,
  inputs: userInputs
): void {
  if (data.checkpointsPassed >= data.checkpoints.length) {
    //   this.stop = true;
    data.endTime = performance.now();
  }
  const currentCheckpoint = data.checkpoints[data.checkpointsPassed];
  if (!currentCheckpoint) return;

  const dx = data.boat.x - currentCheckpoint.x;
  const dy = data.boat.y - currentCheckpoint.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < CHECKPOINT_RADIUS) data.checkpointsPassed += 1;
}
