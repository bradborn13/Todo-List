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
          <span class="badge badge-primary badge-pill">
            {{ list.completedTaskCount + '/' + list.taskCount }}
          </span>
        </li>
        <li
          v-else
          class="list-group-item d-flex justify-content-between align-items-center"
          role="tab"
        >
          {{ list.listName }}
          <span class="badge badge-secondary badge-pill">
            {{ list.completedTaskCount + '/' + list.taskCount }}
          </span>
        </li>
      </section>
    </ul>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import axios from '@/config/axios-config';
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class ListTab extends Vue {
  inView: string = 'default';
  listArray: any[] = [];
  mounted() {
    this.getLists();
  }
  getLists() {
    axios
      .get('/api/listCollection')
      .then((res) => {
        this.listArray = res.data;
      })
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
    this.$emit('showListTasks', listId);
  }
}
</script>
<style></style>
