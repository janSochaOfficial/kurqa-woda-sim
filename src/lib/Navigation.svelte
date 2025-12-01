<script lang="ts">
  import { push } from "svelte-spa-router";
  import type { settingsType } from "./sim/types";
  import { getContext } from "svelte";

  export let settings: settingsType = getContext("settings");
  export let toggleTouchscreenControlls: () => void;

  function toggleTouchscreen(): void {
    toggleTouchscreenControlls();
  }
</script>

<nav class="bg-blue-700 text-white px-4 py-3 shadow">
  <div class="max-w-7xl mx-auto">
    <button
      on:click={() => push("/")}
      class="font-semibold hover:text-blue-200 transition"
    >
      ← Home
    </button>
  </div>
  <div class="flex items-center gap-3">
    <label class="flex items-center gap-2 cursor-pointer">
      <span class="text-sm font-medium">Touchscreen</span>
      <div
        class="relative w-12 h-6 bg-gray-400 rounded-full transition"
        class:bg-green-600={settings.touchscreenControls}
      >
        <div
          class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition"
          class:translate-x-6={settings.touchscreenControls}
        ></div>
        <input
          type="checkbox"
          checked={settings.touchscreenControls}
          on:change={toggleTouchscreen}
          class="absolute opacity-0 w-full h-full cursor-pointer"
        />
      </div>
    </label>
  </div>
</nav>
