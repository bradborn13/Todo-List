<script>
/* eslint-disable */
import axios from "axios";
import CreateList from "./ListCollection/CreateList";
import ListCollection from "./ListCollection/ListCollection";
export default {
  name: "ListSection",
  data() {
    return {
      createListView: false
    };
  },
  components: {
    CreateList,
    ListCollection
  },
  methods: {
    returnView() {
      this.createListView = !this.createListView;
    },
    showListTasks(listId) {
      this.$emit("renderListTasks", listId);
    }
  }
};
</script>

<template>
  <div>
    <div v-if="createListView"><CreateList @returnView="returnView" /></div>
    <div v-if="!createListView">
      <button v-on:click="returnView">New List</button>
      <br />
      <ListCollection @showListTasks="showListTasks" />
    </div>
    <br />
  </div>
</template>

<style></style>
