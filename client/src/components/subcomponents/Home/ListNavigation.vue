<script lang="ts">
/* eslint-disable */
import CreateList from '@/components/subcomponents/ListNavigation/CreateList.vue';
import ListTab from '@/components/subcomponents/ListNavigation/ListTab.vue';
import axios from '@/config/axios-config';
// import ListSection from "./ListSection.vue";
import * as moment from 'moment';
import Loading from 'vue-loading-overlay';
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  name: 'ListNavigation',
  components: {
    CreateList,
    ListTab
  }
})
export default class ListNavigation extends Vue {
  createListView: boolean = false;

  public returnView() {
    this.createListView = !this.createListView;
  }
  showCreatedList(listId) {
    this.createListView = !this.createListView;
    this.$emit('renderListTasks', listId);
  }
  showListTasks(listId) {
    if (listId === 'default') {
      return this.$emit('renderGeneralTasks');
    }
    this.$emit('renderListTasks', listId);
  }
}
</script>

<template>
  <div>
    <div v-if="createListView">
      <CreateList @returnView="returnView" @onListCreated="showCreatedList" />
    </div>
    <div v-if="!createListView">
      <section
        style="padding-bottom:30px ;cursor:pointer;color:#A9A9A9"
        v-on:click="returnView"
      >
        <img
          src="@/assets/add-new-list.svg"
          height="50px"
          style="color:white"
        />
        <div style="color:white;display:inline">Create List</div>
      </section>

      <ListTab @showListTasks="showListTasks" />
    </div>
    <br />
  </div>
</template>

<style></style>
