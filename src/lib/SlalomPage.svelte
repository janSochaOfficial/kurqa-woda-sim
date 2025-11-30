<script lang="ts">
  import type { dataType } from "./sim/dataType";
  import { frame } from "./sim/frame";
  import { handleBuoysCollision } from "./sim/handleBuoysCollision";
  import { type userInputs } from "./sim/userInputs";

  const data = $state<dataType>({
    boat: {
      x: 200,
      y: 250,
      angle: 0,
      speed: {
        x: 0,
        y: 0,
      },
    },
    stop: false,
    buoys: [
      { x: 200, y: 200 },
      { x: 400, y: 200 },
      { x: 600, y: 200 },
      { x: 800, y: 200 },
    ],
  });

  const currentUserInputs = $state<userInputs>({
    acceleration: 0, // Changed default to 0 so it waits for input
    left: false,
    right: false,
  });

  // Handle key presses (Active state)
  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    switch (e.key) {
      case "ArrowUp":
        currentUserInputs.acceleration = 1;
        break;
      case "ArrowLeft":
        currentUserInputs.left = true;
        break;
      case "ArrowRight":
        currentUserInputs.right = true;
        break;
    }
  };

  // Handle key releases (Reset state)
  const handleKeyUp = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
        currentUserInputs.acceleration = 0;
        break;
      case "ArrowLeft":
        currentUserInputs.left = false;
        break;
      case "ArrowRight":
        currentUserInputs.right = false;
        break;
    }
  };

  const promise = new Promise<void>((resolve) => resolve());
  frame(promise, promise, data, currentUserInputs, (data, inputs) => {
    // console.log(data.boat.x);
    handleBuoysCollision(data);
  });

  const stopSimulation = () => {
    data.stop = true;
  };
</script>

<svelte:window onkeydown={handleKeyDown} onkeyup={handleKeyUp} />
<div class="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 px-4 py-12">
  <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
    <h2 class="text-3xl font-bold text-blue-900 mb-6">Slalom Challenge</h2>
    <p class="text-gray-700 mb-4">
      Navigate through the gates as quickly as possible!
    </p>
    <div
      class="relative w-full h-[600px] bg-blue-100 border-2 border-blue-400 rounded overflow-hidden shadow-inner"
    >
      {#each data.buoys || [] as buoy, i}
        {@const colorClass = i % 2 === 0 ? "bg-green-500" : "bg-red-500"}

        <div
          class="absolute top-0 left-0 will-change-transform w-3 h-3 rounded-full border-2 border-black {colorClass} "
          style="transform-origin: center;
      transform: translate({buoy.x - 2}px, {buoy.y - 2}px);"
        ></div>
      {/each}
      <div
        class="absolute top-0 left-0 will-change-transform rounded-full"
        style="
        transform-origin: center;
      transform: translate({data.boat.x - 12}px, {data.boat.y -
          12}px) rotate({data.boat.angle + Math.PI / 2}rad) ;
    "
      >
        <div class="">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 22L12 18L22 22L12 2Z"
              fill="#1F2937"
              stroke="#000"
              stroke-width="2"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>

      <div
        class="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200"
      >
        <div class="flex items-center gap-3 mb-3 border-b pb-2">
          <div class="text-2xl">≈</div>
          <h2 class="font-bold text-gray-800">Boat Stats</h2>
        </div>

        <div class="space-y-1 font-mono text-sm text-gray-700">
          <p>
            Speed: <span class="text-blue-600"
              >{Math.sqrt(
                data.boat.speed.x * data.boat.speed.x +
                  data.boat.speed.y * data.boat.speed.y
              ).toFixed(2)}</span
            >
          </p>
          <p>X: {data.boat.x.toFixed(1)}</p>
          <p>Y: {data.boat.y.toFixed(1)}</p>
          <p>Angle: {data.boat.angle.toFixed(2)}rad</p>
        </div>

        <button
          onclick={stopSimulation}
          class="mt-4 w-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
        >
          Stop
        </button>
      </div>

      <div
        class="absolute bottom-4 right-4 text-xs text-gray-500 bg-white/50 px-2 py-1 rounded"
      >
        Use Arrow Keys to Drive
      </div>
    </div>
  </div>
</div>
