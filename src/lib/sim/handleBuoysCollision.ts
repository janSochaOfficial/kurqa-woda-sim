import type { dataType } from "./dataType.js";
export function handleBuoysCollision(data: dataType) {
  const BOAT_RADIUS = 12;
  const BUOY_RADIUS = 2.5;
  for (const buoy of data.buoys) {
    const dx = data.boat.x - buoy.x;
    const dy = data.boat.y - buoy.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < BOAT_RADIUS + BUOY_RADIUS) {
      // Simple collision response: push the boat away from the buoy and invert and reduce speed
      const overlap = BOAT_RADIUS + BUOY_RADIUS - distance;
      const normX = dx / distance;
      const normY = dy / distance;
      data.boat.x += normX * overlap;
      data.boat.y += normY * overlap;
      const speedMagnitude = Math.sqrt(
        data.boat.speed.x * data.boat.speed.x +
          data.boat.speed.y * data.boat.speed.y
      );
      data.boat.speed.x = -data.boat.speed.x * 0.3;
      data.boat.speed.y = -data.boat.speed.y * 0.3;
    }
  }
}
