<template>
  <div class="col-8 mx-auto">
    <ul class="list-group">
      <li
        v-if="inView === 'default'"
        class="list-group-item d-flex justify-content-between align-items-center active"
        role="tab"
      >
        Default
      </li>
      <li
        v-else
        class="list-group-item d-flex justify-content-between align-items-center w"
        role="tab"
        v-on:click="showTasks('default')"
      >
        Default
      </li>
      <section
        v-for="list in listArray"
        v-bind:key="list._id"
        v-on:click="showTasks(list._id)"
      >
        <li
          v-if="inView === list._id"
          class="list-group-item d-flex justify-content-between align-items-center active"
          role="tab"
        >
          {{ list.listName }}
          <span class="badge badge-secondary badge-pill">{{
            list.completedTaskCount + ' / ' + list.taskCount
          }}</span>
        </li>
        <li
          v-else
          class="list-group-item d-flex justify-content-between align-items-center"
          role="tab"
        >
          {{ list.listName }}
          <span class="badge badge-secondary badge-pill">{{
            list.completedTaskCount + ' / ' + list.taskCount
          }}</span>
        </li>
      </section>
    </ul>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { GlobalMutationKeys } from '../../../store/mutations';
import { store } from '../../../store/index';
import { Component, Vue } from 'vue-property-decorator';
import { ListNavigationActionKeys } from '../../../store/ListNavigation/ListNavigation.actions';
import { ListNavigationGetterKeys } from '../../../store/ListNavigation/ListNavigation.getters';
import { Getter, namespace } from 'vuex-class';
import { ModuleNames } from '../../../store/types';

const NavbarGetter = namespace(ModuleNames.listNav);

@Component
export default class ListTab extends Vue {
  inView: string = 'default';
  @NavbarGetter.Getter(ListNavigationGetterKeys.getListCollection)
  listArray!: any[];
  mounted() {
    this.getLists();
  }
  getLists() {
    const getListCollection = [
      ModuleNames.listNav,
      ListNavigationActionKeys.getListCollection
    ].join('/');
    store
      .dispatch(getListCollection)
      .then((res) => {})
      .catch((err) => {
        this.$notify({
          group: 'corner-notification',
          type: 'error',
          title: 'Error',
          text: `Error: ${err}`
        });
      });
  }
  showTasks(listId) {
    this.inView = listId;
    if (listId !== 'default') {
      store.commit(GlobalMutationKeys.setDashboardFilterByList);
      store.commit(GlobalMutationKeys.setCustomListId, listId);
    }
    if (listId === 'default') {
      store.commit(GlobalMutationKeys.setDashboardUnfiltered);
    }
    this.$emit('showListTasks');
  }
}
</script>
<style>
@import '../../../assets/css/listTab.css';
</style>
