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
  import Simulation from "./Simulation.svelte";

  const settings: settingsType = getContext("settings");

  let data = $state<simData>(SLALOM_START_DATA);

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
    <Simulation
      bind:data
      inputs={currentUserInputs}
      frameHandlers={[]}
      texts={{
        getReady: "Get Ready for Slalom!",
        tutorial: "Use Arrow Keys to Drive",
        startButton: "Start Slalom",
      }}
    />
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
    </div>
  {/if}
</div>
