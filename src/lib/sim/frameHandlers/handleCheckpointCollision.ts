import { BOAT_RADIUS, CHECKPOINT_RADIUS } from "../consts";
import type { simData } from "../types/simData";
import type { userInputs } from "../types/userInputs";

export function handleCheckpointCollision(
  data: simData,
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

  if (distance < CHECKPOINT_RADIUS + BOAT_RADIUS) data.checkpointsPassed += 1;
}
