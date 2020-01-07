<script>
/* eslint-disable */
import axios from "axios";
import ListSection from "./ListSection";
import * as moment from "moment";

import CalendarSection from "./CalendarSection";
// import { Datetime } from "vue-datetime";

export default {
  name: "Home",
  data() {
    return {
      todos: [],
      showCalendar: true,
      taskId: "",
      taskName: "",
      isEdit: false,
      // picker: new Date().toISOString().substr(0, 10),
      taskDeadline: "",
      listName: ""
    };
  },
  components: {
    // Datetime,
    ListSection,
    CalendarSection
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    cleanForm() {
      this.taskDeadline = "";
    },
    getTasks() {
      if (this.listId) {
        this.listId = "";
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
        })
        .finally(() => {
          this.reRenderCalendar();
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
      const isosData = this.taskDeadline.toISOString();
      const changeData = moment.utc(isosData).local();
      console.log(this.taskDeadline.toISOString(), "deadline");
      console.log(changeData.format("DD/MM/YYYY HH:mm:ss"), "after convert");

      if (this.listId) {
        return await axios
          .post(`/api/list/${this.listId}/addTask`, {
            taskName: this.taskName,
            taskDeadline: this.taskDeadline.toISOString()
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
        .post("/api/task/general", {
          task_name: this.taskName,
          taskDeadline: this.taskDeadline
        })
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
        })
        .finally(() => {
          this.cleanForm();
        });
    },
    completeTask(taskId) {
      axios({ method: "put", url: `/api/task/${taskId}/complete` })
        .then(res => {
          this.taskName = "";

          this.listId ? this.getListTasks(this.listId) : this.getTasks();
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
    reRenderCalendar() {
      this.showCalendar = !this.showCalendar;
      this.$nextTick(() => {
        this.showCalendar = !this.showCalendar;
      });
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
      this.cleanForm();
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
        })
        .finally(() => {
          this.reRenderCalendar();
        });
    }
  }
};
</script>
<style>
@import "../../styling/List.css";
</style>

<template>
  <div class="row">
    <div class="col-lg-3 mx-auto">
      <ListSection
        @renderListTasks="getListTasks"
        @renderGeneralTasks="getTasks"
      />
    </div>
    <div class="col-lg-6 mx-auto">
      <form v-on:submit.prevent="addNewTask" class="col-lg-6 mx-auto">
        <div style="display:flex">
          <img
            v-if="this.isEdit !== false"
            src="../../assets/X CIRCLE.svg"
            v-on:click="resetInput()"
            class="clearUpdate"
          />
          <input
            v-model="taskName"
            class="form-control"
            id="taskNameInput"
            placeholder="Add New Task"
            listId
          /><vc-date-picker
            v-model="taskDeadline"
            :popover="{ placement: 'bottom', visibility: 'hover' }"
          >
            <img src="../../assets/calendar.svg" class="calendar-icon" />
          </vc-date-picker>
        </div>
        <!-- <vc-date-picker v-if="showDeadline"></vc-date-picker> -->

        <button
          v-if="this.isEdit == false"
          type="submit"
          class="btn btn-outline-primary btn-block mt-3 mb-4"
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
      <CalendarSection v-if="showCalendar" :taskList="todos" />
    </div>
  </div>
</template>
