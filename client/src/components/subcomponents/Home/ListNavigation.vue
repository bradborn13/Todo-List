<script lang="ts">
/* eslint-disable */
import CreateList from '@/components/subcomponents/ListNavigation/CreateList.vue';
import ListTab from '@/components/subcomponents/ListNavigation/ListTab.vue';
// import ListSection from "./ListSection.vue";
import * as moment from 'moment';
import Loading from 'vue-loading-overlay';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { GlobalGetterKeys } from '../../../store/getters';
import { Getter } from 'vuex-class';
@Component({
  name: 'ListNavigation',
  components: {
    CreateList,
    ListTab
  }
})
export default class ListNavigation extends Vue {
  @Getter(GlobalGetterKeys.getDashboardDataFilteredStatus)
  isListFiltered!: boolean;
  createListView: boolean = false;

  public returnView() {
    this.createListView = !this.createListView;
  }
  showCreatedList(listId) {
    this.createListView = !this.createListView;
    this.$emit('renderListTasks');
  }
  showListTasks() {
    if (!this.isListFiltered) {
      return this.$emit('renderGeneralTasks');
    }
    this.$emit('renderListTasks');
  }
}
</script>

<template>
  <div>
    <div v-if="createListView">
      <CreateList @returnView="returnView" @onListCreated="showCreatedList" />
    </div>
    <div v-if="!createListView">
      <button class="btn-create-list" v-on:click="returnView" type="submit">
        <font-awesome-icon icon="plus-circle" />
        <div class="btn-text">Create List</div>
      </button>
      <ListTab @showListTasks="showListTasks" class="list-navigation" />
    </div>
    <br />
  </div>
</template>

<style>
@import '../../../assets/css/listNav.css';
</style>
