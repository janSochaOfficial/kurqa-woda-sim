<script lang="ts">
  import { getContext } from "svelte";
  import { SLALOM_START_DATA } from "./sim/data_sets/slalom_data";
  import type { userInputs, simData, settingsType } from "./sim/types";
  import Simulation from "./Simulation.svelte";
  import { SPEED_CHELLAGE } from "./sim/consts";
  import { SPEED_START_DATA } from "./sim/data_sets/speed_test_data";
  const settings: settingsType = getContext("settings");

  let data = $state<simData>(SPEED_START_DATA);

  const currentUserInputs = $state<userInputs>({
    acceleration: 0, // Changed default to 0 so it waits for input
    left: false,
    right: false,
  });

  const onFrame = (data: simData, input: userInputs) => {
    input.acceleration -=
      input.acceleration *
        input.acceleration *
        SPEED_CHELLAGE.ACCELERATION_DECAY_FACTOR +
      SPEED_CHELLAGE.ACCELERATION_DECAY;
    if (input.acceleration < 0) {
      input.acceleration = 0;
    }
  };
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!data.startTime) return;
    e.preventDefault();
    if (e.key === " ") {
      currentUserInputs.acceleration += 0.1;
    }
  };
</script>

<svelte:window on:keyup={handleKeyDown} />
<div
  class="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 px-4 py-12"
>
  <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
    <h2 class="text-3xl font-bold text-yellow-900 mb-6">Speed Test</h2>
    <p class="text-gray-700 mb-4">How fast can you go? Find out here!</p>

    <Simulation
      bind:data
      inputs={currentUserInputs}
      frameHandlers={[onFrame]}
      texts={{
        getReady: "Get Ready for Speed Test!",
        tutorial: "Mash Spacebar to Accelerate",
        startButton: "Start Speed Test",
      }}
    />
    {#if settings?.touchscreenControls}
      <div class="max-w-4xl mx-auto mt-6 bg-white rounded-lg shadow-lg p-4">
        <div class="flex items justify-strech gap-4">
          <button
            ontouchend={() => (currentUserInputs.acceleration += 0.1)}
            class="bg-blue-600 hover:bg-blue-700 text-white justify-self-end font-medium py-2 px-4 rounded transition-colors"
          >
            Accelerate
          </button>
        </div>
        <h3 class="text-lg font-bold text-blue-900 mb-4">
          Touchscreen Controls
        </h3>
      </div>
    {/if}
  </div>
</div>
