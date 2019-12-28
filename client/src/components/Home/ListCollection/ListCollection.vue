<template>
  <div>
    <ul>
      <div v-for="list in listArray" v-bind:key="list._id">
        <h2>{{ list.listName }}</h2>
        <h3>{{ list.createdAt }}</h3>
        <button v-on:click="showTasks(list._id)">Show</button>
        <br />
      </div>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  name: "ListCollection",
  data() {
    return {
      listArray: []
    };
  },
  mounted() {
    this.getLists();
  },
  methods: {
    getLists() {
      axios
        .get("/api/listCollection")
        .then(res => {
          console.log(res);
          this.listArray = res.data;
        })
        .catch(err => {
          this.$notify({
            group: "corner-notification",
            type: "error",
            title: "Error",
            text: `Error: ${err}`
          });
        });
    },
    showTasks(listId) {
      this.$emit("showListTasks", listId);
    }
  }
};
</script>
<style></style>
