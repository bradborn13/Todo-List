<template>
  <h1>
    <div class="col-lg-8 mx-auto">
      <table class="table table-hover small">
        <thead>
          <tr>
            <th scope="col">Task</th>
            <th scope="col">Name</th>
            <th scope="col">Created</th>
            <th scope="col">Completed</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" v-bind:key="task._id">
            <th scope="row">{{ task.task_name }}</th>
            <td>{{ task.task_name }}</td>
            <td>{{ getDate(task.createdAt) }}</td>
            <td>{{ getDate(task.updatedAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </h1>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { GlobalGetterKeys } from '../store/getters';
import { GlobalActionKeys } from '../store/actions';
import { store } from '../store';

@Component
export default class History extends Vue {
  @Getter(GlobalGetterKeys.getDashboardListData) tasks!: any[];
  mounted() {
    this.getTasks();
  }
  getTasks() {
    store
      .dispatch(GlobalActionKeys.getAllTasks)
      .then(() => {})
      .catch((err) => {
        this.$notify({
          group: 'corner-notification',
          type: 'error',
          title: 'Error',
          text: `Error: ${err}`
        });
      });
  }
  getDate(datetime: Date) {
    const date = new Date(datetime).toLocaleString();
    return date;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/css/navigation.css';
</style>
