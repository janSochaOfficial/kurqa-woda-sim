<script lang="ts">
  import { push } from "svelte-spa-router";
</script>

<div
  class="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center px-4"
>
  <div class="text-center">
    <h2 class="text-4xl font-bold text-blue-900 mb-12">
      Welcome to the Simulator
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
      <!-- Slalom Card -->
      <button
        on:click={() => push("/slalom")}
        class="group bg-white rounded-lg shadow-lg hover:shadow-2xl transition p-8 cursor-pointer hover:scale-105 transform transition"
      >
        <div class="w-16 h-16 text-blue-600 mx-auto mb-4 text-4xl">≈</div>
        <h3 class="text-2xl font-bold text-gray-800 mb-2">Slalom</h3>
        <p class="text-gray-600 mb-4">
          Navigate through gates and master the slalom course
        </p>
        <span
          class="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Start
        </span>
      </button>

      <!-- Speed Test Card -->
      <button
        on:click={() => push("/speedtest")}
        class="group bg-white rounded-lg shadow-lg hover:shadow-2xl transition p-8 cursor-pointer hover:scale-105 transform transition"
      >
        <div class="w-16 h-16 text-yellow-600 mx-auto mb-4 text-4xl">⚡</div>
        <h3 class="text-2xl font-bold text-gray-800 mb-2">Speed Test</h3>
        <p class="text-gray-600 mb-4">
          Push your limits and reach maximum velocity
        </p>
        <span
          class="inline-block bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
        >
          Start
        </span>
      </button>

      <!-- 1v1 Card -->
      <button
        on:click={() => push("/1v1")}
        class="group bg-white rounded-lg shadow-lg hover:shadow-2xl transition p-8 cursor-pointer hover:scale-105 transform transition"
      >
        <div class="w-16 h-16 text-green-600 mx-auto mb-4 text-4xl">👥</div>
        <h3 class="text-2xl font-bold text-gray-800 mb-2">1v1</h3>
        <p class="text-gray-600 mb-4">
          Compete head-to-head against an opponent
        </p>
        <span
          class="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Start
        </span>
      </button>
    </div>
  </div>
</div>
