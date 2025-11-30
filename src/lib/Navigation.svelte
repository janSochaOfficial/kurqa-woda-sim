<script lang="ts">
  import { push } from "svelte-spa-router";
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
</nav>
