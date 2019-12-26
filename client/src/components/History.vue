<script>
/* eslint-disable */
import axios from "axios";
export default {
  name: "History",
  data() {
    return {
      tasks: []
    };
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    getTasks() {
      axios({ method: "get", url: "/api/tasksHistory" })
        .then(tasks => {
          console.log(tasks.data);
          this.tasks = tasks.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<template>
  <h1>
    <div class="col-lg-8 mx-auto">
      <table class="table table-hover small ">
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
            <td>{{ task.createdAt }}</td>
            <td>@{{ task.updatedAt }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </h1>
</template>
