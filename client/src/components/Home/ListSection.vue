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
    showCreatedList(listId) {
      this.createListView = !this.createListView;
      this.$emit("renderListTasks", listId);
    },
    showListTasks(listId) {
      if (listId === "default") {
        return this.$emit("renderGeneralTasks");
      }
      this.$emit("renderListTasks", listId);
    }
  }
};
</script>

<template>
  <div>
    <div v-if="createListView">
      <CreateList @returnView="returnView" @onListCreated="showCreatedList" />
    </div>
    <div v-if="!createListView">
      <section style="padding-bottom:30px ;cursor:pointer;color:#A9A9A9" v-on:click="returnView">
        <img src="../../assets/add-new-list.svg" height="50px" style="opacity:50%" />
        Create List
      </section>

      <ListCollection @showListTasks="showListTasks" />
    </div>
    <br />
  </div>
</template>

<style></style>
