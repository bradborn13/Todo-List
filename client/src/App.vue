/ignore
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
    <div id="musicPlayer" style="position:absolute;right:15px;top:10px"></div>
    <img
      v-if="toggleMusic"
      src="../src/assets/audio-off.svg"
      height="25px"
      style="position:absolute;right:15px;top:10px"
      v-on:click="muteMusic"
    />
    <img
      v-if="!toggleMusic"
      src="../src/assets/audio-on.svg"
      height="25px"
      style="position:absolute;right:15px;top:10px"
      v-on:click="startMusic"
    />

    <router-view />
  </div>
</template>

<script>
import Navigation from "../src/components/Navigation";
export default {
  name: "App",
  components: {
    Navigation
  },
  data() {
    return {
      toggleMusic: false
    };
  },
  methods: {
    muteMusic() {
      this.toggleMusic = !this.toggleMusic;
      document.getElementById("musicPlayer").innerHTML = "";
    },
    startMusic() {
      this.toggleMusic = !this.toggleMusic;
      document.getElementById("musicPlayer").innerHTML = ` <iframe
        width="1"
        height="1"
        wmode="transparent"
        src="https://www.youtube.com/embed/hHW1oY26kxQ?autoplay=1&loop=1&playlist=hHW1oY26kxQ"
        frameborder="0"
        allowfullscreen
      />`;
    }
  }
};
</script>

<style>
body {
  background: #84cfee;
  position: relative;
  height: auto;
  width: auto;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 25px;
  background: #e9ebee;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
