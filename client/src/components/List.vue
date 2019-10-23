<template>
  <div class="container" id="todo-list">
    <div class="row">
      <div class="col-md-6 mx-auto">
        <h1 class="text-center">TODO List App</h1>
        <form v-on:submit.prevent="addNewTask">
          <label for="taskNameInput">Task Name</label>
          <input
            v-model="taskName"
            class="form-control"
            id="taskNameInput"
            placeholder="Add New Task"
          />
          <button
            v-if="this.isEdit == false"
            type="submit"
            class="btn btn-success btn-block mt-3"
          >Submit</button>
          <button
            v-else
            type="button"
            v-on:click="updateTask()"
            class="btn btn-success btn-block mt-3"
          >Update</button>
        </form>

        <table class="table">
          <tr v-for="(todo) in todos" v-bind:key="todo._id" v-bind:task_name="todo.task_name">
            <td class="text-left">{{todo.task_name}}</td>
            <td class="text-right">
              <button v-on:click="editTask(todo.task_name,todo._id)" class="btn btn-info">Edit</button>
              <button v-on:click="deleteTask(todo._id)" class="btn btn-info">Delete</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  name: "List",
  data() {
    return {
      todos: [],
      id: "",
      taskName: "",
      isEdit: false
    };
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    getTasks() {
      axios({ method: "get", url: "/api/tasks" })
        .then(tasks => {
          console.log(tasks.data);
          this.todos = tasks.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addNewTask() {
      axios
        .post("/api/task", { task_name: this.taskName })
        .then(res => {
          this.taskName = "";
          this.getTasks();
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },

    deleteTask(taskId) {
      axios({ method: "delete", url: `/api/task/${taskId}` })
        .then(res => {
          this.taskName = "";
          this.getTasks();
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },

    editTask(task_name, taskId) {
      this.id = taskId;
      this.taskName = task_name;
      this.isEdit = true;
    },

    updateTask() {
      axios
        .put(`/api/task/${this.id}`, { task_name: this.taskName })
        .then(res => {
          this.taskName = "";

          this.isEdit = false;
          this.getTasks();
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
