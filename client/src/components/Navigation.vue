<template>
  <div class="navigation col-lg-6 mx-auto">
    <ul>
      <li class="col-lg-6"><a v-on:click="redirectHome">Home</a></li>

      <li class="col-lg-6"><a v-on:click="redirectHistory">History</a></li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  name: "Navigation",
  data() {
    return {
      pageInView: ""
    };
  },
  methods: {
    redirectHome() {
      if (this.$route.path === "/") {
        return this.$router.go();
      }
      this.$router.push({ path: "/" }).catch(err => {});
    },
    redirectHistory() {
      this.$router.push({ path: "/history" }).catch(err => {});
    }
  }
};
</script>
<style>
@import "../styling/Navigation.css";
</style>
