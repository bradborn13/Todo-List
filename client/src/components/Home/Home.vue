<script>
/* eslint-disable */
import axios from "axios";
import ListSection from "./ListSection";
import CalendarSection from"./CalendarSection";
export default {
  name: "Home",
  data() {
    return {
      todos: [],
      taskId: "",
      taskName: "",
      isEdit: false,
      listName: ""
    };
  },
  components: {
    ListSection,CalendarSection
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    getTasks() {
      if (this.listId) {
        return axios
          .get(`/api/list/${this.listId}/getTasks`)
          .then(resp => {
            this.todos = resp.data;
          })
          .catch(err => {
            this.$notify({
              group: "corner-notification",
              type: "error",
              title: "Error",
              text: `Error: ${err}`
            });
          });
      }
      axios({ method: "get", url: "/api/tasks" })
        .then(tasks => {
          this.todos = tasks.data;
        })
        .catch(err => {
          this.$notify({
            group: "corner-notification",
            type: "error",
            title: "Error",
            text: `Error: ${err}`
          });
        });
    },
    async addNewTask() {
      if (!this.taskName) {
        return this.$notify({
          group: "center-notification",
          type: "error",
          title: "Error",
          text: `Task name is required`
        });
      }
      const filter = this.todos.filter(x => x.task_name === this.taskName);

      if (filter.length > 0) {
        return this.$notify({
          group: "center-notification",
          type: "error",
          title: "Error",
          text: `Task already exists`
        });
      }
      if (this.listId) {
        return await axios
          .post(`/api/list/${this.listId}/addTask`, {
            taskName: this.taskName
          })
          .then(res => {
            this.taskName = "";
            this.getListTasks(this.listId);
          })
          .catch(err => {
            this.$notify({
              group: "corner-notification",
              type: "error",
              title: "Error",
              text: `Error: ${err}`
            });
          });
      }
      axios
        .post("/api/task/general", { task_name: this.taskName })
        .then(res => {
          this.taskName = "";
          this.getTasks();
        })
        .catch(err => {
          this.$notify({
            group: "corner-notification",
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
          return this.$notify({
            group: "corner-notification",
            type: "success",
            title: "Notification ",
            text: "Task Completed!"
          });
        })
        .catch(err => {
          return this.$notify({
            group: "corner-notification",
            type: "error",
            title: "Error",
            text: `Error: ${err}`
          });
        });
    },
    createList() {
      axios({ method: "post", url: "/api/list" })
        .then(tasks => {})
        .catch(err => {
          this.$notify({
            group: "corner-notification",
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
            group: "corner-notification",
            type: "success",
            title: "Notification",
            text: "Task removed!"
          });
        })
        .catch(err => {
          this.$notify({
            group: "corner-notification",
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
      this.taskId = taskId;
      this.taskName = task_name;
      this.isEdit = true;
    },

    updateTask() {
      axios
        .put(`/api/task/${this.taskId}`, { task_name: this.taskName })
        .then(res => {
          this.taskName = "";
          this.isEdit = false;
          this.getTasks();
          this.$notify({
            group: "corner-notification",
            type: "success",
            title: "Notification",
            text: "Task Updated!"
          });
        })
        .catch(err => {
          this.$notify({
            group: "corner-notification",
            type: "error",
            title: "Error",
            text: `Error: ${err}`
          });
        });
    },

    getListTasks(listId) {
      axios
        .get(`/api/list/${listId}/getTasks`)
        .then(resp => {
          this.todos = resp.data;
          this.listId = listId;
        })
        .catch(err => {
          this.$notify({
            group: "corner-notification",
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
@import "../../styling/List.css";
</style>

<template>
  <div class="row ">
    <div class="col-lg-3 mx-auto">
      <ListSection @renderListTasks="getListTasks" />
    </div>
    <div class="col-lg-6 mx-auto">
      <form v-on:submit.prevent="addNewTask" class="col-lg-6 mx-auto">
        <div style="display:flex">
          <input
            v-model="taskName"
            class="form-control"
            id="taskNameInput"
            placeholder="Add New Task"
            listId=""
          />
          <img
            v-if="this.isEdit !== false"
            src="../../assets/X CIRCLE.svg"
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
              src="../../assets/check.svg"
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
    <div class="col-lg-3">
<CalendarSection/>
    </div>
  </div>
</template>
