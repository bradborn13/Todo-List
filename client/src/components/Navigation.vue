<template>
  <div class="navigation col-lg-6 ">
    <ul>
      <li class="col-lg-2"><a v-on:click="redirectHome">Home</a></li>
      <li class="col-lg-1"><a v-on:click="redirectHome">|</a></li>

      <li class="col-lg-2"><a v-on:click="redirectHistory">History </a></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Navigation extends Vue {
  pageInView: string = '';

  redirectHome() {
    if (this.$route.path === '/') {
      return this.$router.go(-1);
    }
    this.$router.push({ path: '/' });
  }
  redirectHistory() {
    this.$router.push({ path: '/history' });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/css/navigation.css';
</style>
