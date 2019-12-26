<script>
/* eslint-disable */
import axios from "axios";
export default {
  name: "Home",
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
          this.todos = tasks.data;
        })
        .catch(err => {
          this.$notify({
            group: "foo",
            type: "error",
            title: "Error",
            text: `Error: ${err}`
          });
        });
    },
    addNewTask() {
      if (!this.taskName) {
        return this.$notify({
          group: "foo",
          type: "error",
          title: "Error",
          text: `Task name is required`
        });
      }
      const filter = this.todos.filter(x => x.task_name === this.taskName);

      if (filter.length > 0) {
        return this.$notify({
          group: "foo",
          type: "error",
          title: "Error",
          text: `Task already exists`
        });
      }
      axios
        .post("/api/task", { task_name: this.taskName })
        .then(res => {
          this.taskName = "";
          this.getTasks();
        })
        .catch(err => {
          this.$notify({
            group: "foo",
            type: "error",
            title: "Error",
            text: `Error: ${err}`
          });
        });
    },
    completeTask(taskId) {
      axios({ method: "put", url: `/api/task/${taskId}/complete` })
        .then(res => {
          this.taskName = "";
          this.getTasks();
          this.$notify({
            group: "foo",
            type: "success",
            title: "Notification ",
            text: "Task Completed!"
          });
        })
        .catch(err => {
          this.$notify({
            group: "foo",
            type: "error",
            title: "Error",
            text: `Error: ${err}`
          });
        });
    },

    deleteTask(taskId) {
      axios({ method: "delete", url: `/api/task/${taskId}` })
        .then(res => {
          this.taskName = "";
          this.getTasks();
          this.$notify({
            group: "foo",
            type: "success",
            title: "Notification",
            text: "Task removed!"
          });
        })
        .catch(err => {
          this.$notify({
            group: "foo",
            type: "error",
            title: "Error",
            text: `Error: ${err}`
          });
        });
    },
    resetInput() {
      this.isEdit = false;
      this.taskName = "";
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
          this.$notify({
            group: "foo",
            type: "success",
            title: "Notification",
            text: "Task Updated!"
          });
        })
        .catch(err => {
          this.$notify({
            group: "foo",
            type: "error",
            title: "Error",
            text: `Error: ${err}`
          });
        });
    }
  }
};
</script>
<style>
@import "../styling/List.css";
</style>

<template>
  <div class="container" id="todo-list">
    <div class="row">
      <div class="col-md-12 mx-auto">
        <form v-on:submit.prevent="addNewTask" class="col-lg-7 mx-auto">
          <div style="display:flex">
            <input
              v-model="taskName"
              class="form-control"
              id="taskNameInput"
              placeholder="Add New Task"
            />
            <img
              v-if="this.isEdit !== false"
              src="../assets/X CIRCLE.svg"
              v-on:click="resetInput()"
              class="clearUpdate"
            />
          </div>

          <button
            v-if="this.isEdit == false"
            type="submit"
            class=" btn btn-outline-primary btn-block mt-3 mb-4"
          >
            Submit
          </button>
          <button
            v-else
            type="button"
            v-on:click="updateTask()"
            class="btn btn-primary btn-block mt-3 mb-4"
          >
            Update
          </button>
        </form>

        <table class="table">
          <tr
            v-for="todo in todos"
            v-bind:key="todo._id"
            v-bind:task_name="todo.task_name"
          >
            <td class="text-left">
              <img
                v-if="!todo.completedAt"
                src="../assets/check.svg"
                class="completeTask"
                @click="completeTask(todo._id)"
              />
              <span class="task-name">{{ todo.task_name }}</span>
            </td>
            <td class="text-right">
              <button
                v-on:click="editTask(todo.task_name, todo._id)"
                class="btn btn-outline-info"
              >
                Edit
              </button>
              <button
                v-on:click="deleteTask(todo._id)"
                class="btn btn-outline-dark"
              >
                Delete
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
