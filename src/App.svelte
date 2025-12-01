<script lang="ts">
  import "./app.css";
  import Router from "svelte-spa-router";
  import Header from "./lib/Header.svelte";
  import Navigation from "./lib/Navigation.svelte";
  import HomePage from "./lib/HomePage.svelte";
  import SlalomPage from "./lib/SlalomPage.svelte";
  import SpeedTestPage from "./lib/SpeedTestPage.svelte";
  import OneVOnePage from "./lib/OneVOnePage.svelte";
  import type { settingsType } from "./lib/sim/types";
  import { setContext } from "svelte";

  let routes = {
    "/": HomePage,
    "/slalom": SlalomPage,
    "/speedtest": SpeedTestPage,
    "/1v1": OneVOnePage,
  };
  export const settings: settingsType = $state({
    touchscreenControls: false,
  });
  setContext("settings", settings);
  function toggleTouchscreenControls(): void {
    settings.touchscreenControls = !settings.touchscreenControls;
    // console.log("Touchscreen Controls:", settings.touchscreenControls);
  }
</script>

<div class="min-h-screen bg-gray-50">
  <Header></Header>
  <Navigation {settings} toggleTouchscreenControlls={toggleTouchscreenControls}
  ></Navigation>

  <Router {routes}></Router>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, sans-serif;
  }
</style>
