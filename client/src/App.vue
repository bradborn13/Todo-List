<template>
  <div id="app">
    <notifications
      group="corner-notification"
      position="bottom right "
      width="15%"
      ignoreDuplicates="true"
    />
    <notifications
      group="center-notification"
      position="center top  "
      width="15%"
      ignoreDuplicates="true"
    />
    <Navigation />

    <router-view />
  </div>
</template>

<script>
import Navigation from "../src/components/Navigation";
export default {
  name: "App",
  components: {
    Navigation
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 25px;
  margin-top: 60px;
}
</style>
