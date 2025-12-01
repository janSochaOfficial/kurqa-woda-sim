<script lang="ts">
  import { onMount } from "svelte";
  import type { simData } from "./sim/types/simData";
  import { CHECKPOINT_RADIUS } from "./sim/consts";
  import type { userInputs } from "./sim/types";
  import { frame } from "./sim/frame";
  import type { frameHandler } from "./sim/frameHandlers";

  export type Props = {
    data: simData;
    inputs: userInputs;
    frameHandlers: frameHandler[];
    texts: {
      getReady: string;
      startButton: string;
      tutorial: string;
    };
  };
  let { data = $bindable(), inputs, frameHandlers, texts }: Props = $props();
  const drawing = $state(data.drawing);

  let fieldContainer: HTMLDivElement;
  $effect(() => {
    if (fieldContainer) {
      data.fieldSize = {
        width: fieldContainer.clientWidth,
        height: fieldContainer.clientHeight,
      };
    }
  });

  const promise = new Promise<void>((resolve) => resolve());
  frame(promise, promise, data, inputs, (frameData, frameInputs) => {
    for (const handler of frameHandlers) {
      handler(frameData, frameInputs);
    }
  });
</script>

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
        {texts.startButton}
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
      <p>
        Acceleration: <span class="text-blue-600"
          >{inputs.acceleration.toFixed(2)}</span
        >
      </p>
    </div>
  </div>

  <div
    class="absolute bottom-4 right-4 text-xs text-gray-500 bg-white/50 px-2 py-1 rounded"
  >
    {texts.tutorial}
  </div>
</div>
