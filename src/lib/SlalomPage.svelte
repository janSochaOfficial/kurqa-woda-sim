<script lang="ts">
  import { CHECKPOINT_RADIUS } from "./sim/consts";
  import { SLALOM_START_DATA } from "./sim/data_sets/slalom_data";
  import type { simData } from "./sim/types/simData";
  import { frame } from "./sim/frame";
  import { handleBuoysCollision } from "./sim/frameHandlers/handleBuoysCollision";
  import { type userInputs } from "./sim/types/userInputs";
  import type { settingsType } from "./sim/types";
  import { handleCheckpointCollision } from "./sim/frameHandlers";
  import { getContext } from "svelte";

  const settings: settingsType = getContext("settings");

  const data = $state<simData>(SLALOM_START_DATA);
  const drawing = $state(data.drawing);

  const currentUserInputs = $state<userInputs>({
    acceleration: 0, // Changed default to 0 so it waits for input
    left: false,
    right: false,
  });
  let fieldContainer: HTMLDivElement | null = null;
  $effect(() => {
    if (fieldContainer) {
      data.fieldSize = {
        width: fieldContainer.clientWidth,
        height: fieldContainer.clientHeight,
      };
    }
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
      bind:this={fieldContainer}
      class="relative w-full h-[600px] bg-blue-100 border-2 border-blue-400 rounded overflow-hidden shadow-inner"
    >
      {#if !data.startTime}
        <div
          class="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 z-10"
        >
          <h3 class="text-2xl font-bold text-gray-800 mb-4">Get Ready!</h3>
          <button
            onclick={() => {
              data.startTime = performance.now();
            }}
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Start Slalom
          </button>
        </div>
      {/if}
      {#each drawing.buoys || [] as buoy, i}
        {@const colorClass = i % 2 === 0 ? "bg-green-500" : "bg-red-500"}

        <div
          class="absolute top-0 left-0 will-change-transform w-3 h-3 rounded-full border-2 border-black {colorClass} "
          style="transform-origin: center;
      transform: translate({buoy.x - 6}px, {buoy.y - 6}px);"
        ></div>
      {/each}

      {#each drawing.checkpoints || [] as checkpoint, i}
        {#if i == data.checkpointsPassed || i == data.checkpointsPassed + 1}
          {@const opacity = i == data.checkpointsPassed ? 0.5 : 0.3}
          <div
            class="absolute top-0 left-0 rounded-full bg-yellow-500"
            style="width: {CHECKPOINT_RADIUS * 2}px; 
              height: {CHECKPOINT_RADIUS * 2}px; 
              opacity: {opacity}; 
              transform: translate({checkpoint.x -
              CHECKPOINT_RADIUS}px, {checkpoint.y - CHECKPOINT_RADIUS}px);"
          ></div>
        {/if}
      {/each}
      {#if data.drawing.boat}
        <div
          class="absolute top-0 left-0 will-change-transform rounded-full"
          style="
        transform-origin: center;
      transform: translate({drawing.boat!.x - 12}px, {drawing.boat!.y -
            12}px) rotate({drawing.boat!.angle + Math.PI / 2}rad) ;
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
      {/if}

      <div
        class="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200"
      >
        <div class="flex items-center gap-3 mb-3 border-b pb-2">
          <div class="text-2xl">≈</div>
          <h2 class="font-bold text-gray-800">Boat Stats</h2>
        </div>

        <div class="space-y-1 font-mono text-sm text-gray-700">
          <p>
            Time: <span class="text-blue-600"
              >{data.timeElapsed
                ? (data.timeElapsed / 1000).toFixed(2)
                : "0.00"}s</span
            >
          </p>
          <p>
            Speed: <span class="text-blue-600"
              >{Math.sqrt(
                data.boat.speed.x * data.boat.speed.x +
                  data.boat.speed.y * data.boat.speed.y
              ).toFixed(2)}</span
            >
          </p>
        </div>
      </div>

      <div
        class="absolute bottom-4 right-4 text-xs text-gray-500 bg-white/50 px-2 py-1 rounded"
      >
        Use Arrow Keys to Drive
      </div>
    </div>
  </div>
  {#if settings?.touchscreenControls}
    <div class="max-w-4xl mx-auto mt-6 bg-white rounded-lg shadow-lg p-4">
      <div class="flex items justify-between gap-4">
        <div class="flex items gap-4 center">
          <button
            ontouchstart={() => (currentUserInputs.left = true)}
            ontouchend={() => (currentUserInputs.left = false)}
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Turn Left
          </button>
          <button
            ontouchstart={() => (currentUserInputs.right = true)}
            ontouchend={() => (currentUserInputs.right = false)}
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Turn Right
          </button>
        </div>
        <button
          ontouchstart={() => (currentUserInputs.acceleration = 1)}
          ontouchend={() => (currentUserInputs.acceleration = 0)}
          class="bg-blue-600 hover:bg-blue-700 text-white justify-self-end font-medium py-2 px-4 rounded transition-colors"
        >
          Accelerate
        </button>
      </div>
      <h3 class="text-lg font-bold text-blue-900 mb-4">Touchscreen Controls</h3>
      <p class="text-gray-700 mb-2">
        Use the buttons below to control the boat:
      </p>
    </div>
  {/if}
</div>
