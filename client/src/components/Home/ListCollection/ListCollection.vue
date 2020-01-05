<template>
  <div class="col-8 mx-auto">
    <ul class="list-group">
      <li
        v-if="inView === 'default'"
        class="list-group-item d-flex justify-content-between align-items-center active"
        role="tab"
      >Default</li>
      <li
        v-else
        class="list-group-item d-flex justify-content-between align-items-center w"
        role="tab"
        v-on:click="showTasks('default')"
      >Default</li>
      <section v-for="list in listArray" v-bind:key="list._id" v-on:click="showTasks(list._id)">
        <li
          v-if="inView === list._id"
          class="list-group-item d-flex justify-content-between align-items-center active"
          role="tab"
        >
          {{ list.listName }}
          <span class="badge badge-primary badge-pill">14</span>
        </li>
        <li
          v-else
          class="list-group-item d-flex justify-content-between align-items-center"
          role="tab"
        >
          {{ list.listName }}
          <span class="badge badge-primary badge-pill">14</span>
        </li>
      </section>
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
      inView: "default",
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
      this.inView = listId;
      this.$emit("showListTasks", listId);
    }
  }
};
</script>
<style></style>
