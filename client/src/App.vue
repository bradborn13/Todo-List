<template>
  <div id="app">
    <notifications
      group="corner-notification"
      position="bottom right "
      width="15%"
      v-bind:ignoreDuplicates="ignoreDuplicates"
    />
    <notifications
      group="center-notification"
      position="center top  "
      width="15%"
      v-bind:ignoreDuplicates="ignoreDuplicates"
    />
    <Navigation />
    <div id="musicPlayer" style="position:absolute;right:15px;top:10px"></div>
    <img
      v-if="toggleMusic"
      src=""
      height="25px"
      style="position:absolute;right:15px;top:10px"
      v-on:click="muteMusic"
    />
    <img
      v-if="!toggleMusic"
      src=""
      height="25px"
      style="position:absolute;right:15px;top:10px"
      v-on:click="startMusic"
    />

    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import HelloWorld from './components/HelloWorld.vue';
import Navigation from './components/Navigation.vue';

@Component({
  components: {
    Navigation
  }
})
export default class App extends Vue {
  ignoreDuplicates: boolean = true;
  toggleMusic: boolean = false;

  muteMusic() {
    this.toggleMusic = !this.toggleMusic;
    const musicPlayer = document.getElementById('musicPlayer');
    if (musicPlayer) {
      musicPlayer.innerHTML = '';
    }
  }
  startMusic() {
    this.toggleMusic = !this.toggleMusic;
    const musicPlayer = document.getElementById('musicPlayer');
    if (musicPlayer) {
      musicPlayer.innerHTML = ` <iframe
        width="1"
        height="1"
        wmode="transparent"
        src="https://www.youtube.com/embed/hHW1oY26kxQ?autoplay=1&loop=1&playlist=hHW1oY26kxQ"
        frameborder="0"
        allowfullscreen
      />`;
    }
  }
}
</script>
<style>
body {
  background: #84cfee;
  position: relative;
  height: auto;
  width: auto;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
