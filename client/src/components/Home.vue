<script lang="ts">
import axios from '@/config/axios-config';
import ListNavigation from './subcomponents/Home/ListNavigation.vue';
import * as moment from 'moment';
import Loading from 'vue-loading-overlay';
import { Component, Prop, Vue } from 'vue-property-decorator';
import CalendarSection from './subcomponents/Home/CalendarSection.vue';
import { Datetime } from 'vue-datetime';
import { Action, Getter, namespace } from 'vuex-class';
import { GlobalActionKeys } from '../store/actions';
import { GlobalGetterKeys } from '../store/getters';
import { store } from '../store';
@Component({
  name: 'Home',
  components: {
    ListNavigation,
    CalendarSection,
    Loading,
    Datetime
  }
})
export default class Home extends Vue {
  @Getter getVersionState!: number;
  loaderSettings: {} = {
    color: '#ADFF2F',
    loader: 'spinner',
    height: 150,
    width: 150
  };
  @Getter(GlobalGetterKeys.getDashboardListData) todos: any;
  isLoading: boolean = false;
  showCalendar: boolean = true;
  taskId: string = '';
  toggleMenuTask: boolean = true;
  taskName: string = '';
  isEdit: boolean = false;
  listId: string = '';
  taskDeadline: string = '';
  listName: string = '';

  mounted() {
    this.getTasks();
  }
  cleanForm() {
    this.taskDeadline = '';
    this.toggleMenuTask = true;
  }
  getGeneralListHistory() {
    // if (this.listId) {  TODO: check if this is not needded anymore
    //   this.listId = '';
    // }
    store
      .dispatch(GlobalActionKeys.getGeneralListHistory)
      .then(() => {})
      .catch((err) => {
        this.$notify({
          group: 'corner-notification',
          type: 'error',
          title: 'Error',
          text: `Error: ${err}`
        });
      })
      .finally(() => {
        this.reRenderCalendar();
      });
  }
  getTasks() {
    store
      .dispatch(GlobalActionKeys.getGeneralListData)
      .then((result) => {
        console.log(result, ' data resulted');
        // this.todos = result.data;
      })
      .catch((err) => {
        this.$notify({
          group: 'corner-notification',
          type: 'error',
          title: 'Error',
          text: `Error: ${err}`
        });
      })
      .finally(() => {
        this.reRenderCalendar();
      });
    // axios({ method: 'get', url: '/api/tasks' })
    //   .then((tasks) => {
    //     this.todos = tasks.data;
    //   })
    //   .catch((err) => {
    //     this.$notify({
    //       group: 'corner-notification',
    //       type: 'error',
    //       title: 'Error',
    //       text: `Error: ${err}`
    //     });
    //   })
    //   .finally(() => {
    //     this.reRenderCalendar();
    //   });
  }
  // componentIsLoading() {
  //   this.isLoading = true;
  //   setTimeout(() => {
  //     this.isLoading = false;
  //   }, 5000);
  // },
  async addNewTask() {
    if (!this.taskName) {
      return this.$notify({
        group: 'center-notification',
        type: 'error',
        title: 'Error',
        text: `Task name is required`
      });
    }
    const filter = this.todos.filter((x) => x.task_name === this.taskName);

    if (filter.length > 0) {
      return this.$notify({
        group: 'center-notification',
        type: 'error',
        title: 'Error',
        text: `Task already exists`
      });
    }

    if (this.listId) {
      return axios
        .post(`/api/list/${this.listId}/addTask`, {
          taskName: this.taskName,
          taskDeadline: this.taskDeadline
        })
        .then((res) => {
          this.taskName = '';
          this.getListTasks(this.listId);
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
    axios
      .post('/api/task/general', {
        task_name: this.taskName,
        taskDeadline: this.taskDeadline
      })
      .then((res) => {
        this.taskName = '';
        this.getTasks();
      })
      .catch((err) => {
        this.$notify({
          group: 'corner-notification',
          type: 'error',
          title: 'Error',
          text: `Error: ${err}`
        });
      })
      .finally(() => {
        this.cleanForm();
      });
  }

  completeTask(taskId: string) {
    axios({ method: 'put', url: `/api/task/${taskId}/complete` })
      .then((res) => {
        this.taskName = '';

        this.listId ? this.getListTasks(this.listId) : this.getTasks();
        return this.$notify({
          group: 'corner-notification',
          type: 'success',
          title: 'Notification ',
          text: 'Task Completed!'
        });
      })
      .catch((err) => {
        return this.$notify({
          group: 'corner-notification',
          type: 'error',
          title: 'Error',
          text: `Error: ${err}`
        });
      });
  }
  generalListMainSection() {
    if (!this.toggleMenuTask) {
      this.isLoading = true;
      this.getTasks();
      this.toggleMenuTask = true;
      this.isLoading = false;
    }
  }
  listMainSection(listId: string) {
    if (!this.toggleMenuTask) {
      this.isLoading = true;
      this.getListTasks(listId);
      this.toggleMenuTask = true;
      this.isLoading = false;
    }
  }
  generalListAllSection() {
    if (this.toggleMenuTask) {
      this.isLoading = true;
      this.getGeneralListHistory();
      this.toggleMenuTask = false;
      this.isLoading = false;
    }
  }
  listAllSection(listId: string) {
    if (this.toggleMenuTask) {
      this.isLoading = true;
      this.getListTasksHistory(listId);
      this.toggleMenuTask = false;
      this.isLoading = false;
    }
  }
  createList() {
    axios({ method: 'post', url: '/api/list' })
      .then((tasks) => {})
      .catch((err) => {
        this.$notify({
          group: 'corner-notification',
          type: 'error',
          title: 'Error',
          text: `Error: ${err}`
        });
      });
  }
  deleteTask(taskId: string) {
    axios({ method: 'delete', url: `/api/task/${taskId}` })
      .then((res) => {
        this.taskName = '';
        this.getTasks();
        this.$notify({
          group: 'corner-notification',
          type: 'success',
          title: 'Notification',
          text: 'Task removed!'
        });
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
  resetInput() {
    this.isEdit = false;
    this.taskName = '';
  }
  editTask(task_name: string, taskId: string) {
    this.taskId = taskId;
    this.taskName = task_name;
    this.isEdit = true;
  }
  reRenderCalendar() {
    this.showCalendar = !this.showCalendar;
    this.$nextTick(() => {
      this.showCalendar = !this.showCalendar;
    });
  }
  updateTask() {
    axios
      .put(`/api/task/${this.taskId}`, { task_name: this.taskName })
      .then((res) => {
        this.taskName = '';
        this.isEdit = false;
        this.getTasks();
        this.$notify({
          group: 'corner-notification',
          type: 'success',
          title: 'Notification',
          text: 'Task Updated!'
        });
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
  convertDateToLocal(localDate: string) {
    return moment
      .utc(localDate)
      .local()
      .format('YYYY-MM-DD');
  }
  getListTasks(listId: string) {
    this.cleanForm();
    store
      .dispatch(GlobalActionKeys.getCustomListData, listId)
      .then((resp) => {
        this.listId = listId;
      })
      .catch((err) => {
        this.$notify({
          group: 'corner-notification',
          type: 'error',
          title: 'Error',
          text: `Error: ${err}`
        });
      })
      .finally(() => {
        this.reRenderCalendar();
      });
  }
  getListTasksHistory(listId: string) {
    this.cleanForm();
    axios
      .get(`/api/list/${listId}/getAllTasks`)
      .then((resp) => {
        this.todos = resp.data;
        this.listId = listId;
      })
      .catch((err) => {
        this.$notify({
          group: 'corner-notification',
          type: 'error',
          title: 'Error',
          text: `Error: ${err}`
        });
      })
      .finally(() => {
        this.reRenderCalendar();
      });
  }
}
</script>
<style>
@import '../assets/css/home.css';
</style>

<template>
  <div class="row">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="false"
      :color="loaderSettings.color"
      :loader="loaderSettings.loader"
      :height="loaderSettings.height"
      :width="loaderSettings.width"
    ></loading>
    <div class="col-lg-3 mx-auto">
      <ListNavigation
        @renderListTasks="getListTasks"
        @renderGeneralTasks="getTasks"
        class="list-section"
      />
    </div>
    <div class="col-lg-6 mx-auto center-section">
      <div class="navigation col-lg-6 mx-auto">
        <ul>
          <li class="col-lg-6">
            <a
              v-on:click="
                listId ? listMainSection(listId) : generalListMainSection()
              "
              :class="{
                selectedOption: toggleMenuTask
              }"
              >Main</a
            >
          </li>

          <li class="col-lg-6">
            <a
              v-on:click="
                listId ? listAllSection(listId) : generalListAllSection()
              "
              :class="{ selectedOption: !toggleMenuTask }"
              >All</a
            >
          </li>
        </ul>
      </div>
      <form v-on:submit.prevent="addNewTask" class="col-lg-6 mx-auto">
        <div style="display:flex">
          <img
            v-if="this.isEdit !== false"
            src
            v-on:click="resetInput()"
            class="clearUpdate"
          />
          <div class="col-md-12">
            <input
              v-model="taskName"
              class="form-control"
              id="taskNameInput"
              placeholder="Add New Task"
              listId
            />
            <vc-date-picker
              v-model="taskDeadline"
              :popover="{ placement: 'bottom', visibility: 'hover' }"
            >
              <img src class="calendar-icon" />
            </vc-date-picker>
          </div>
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

      <table class="table col-lg-12 list-content">
        <tr
          v-for="todo in todos"
          v-bind:key="todo._id"
          v-bind:task_name="todo.task_name"
        >
          <td class="text-left">
            <img
              src
              :class="{
                taskIsCompleted: todo.isCompleted,
                toCompleteTask: !todo.isCompleted
              }"
              @click="todo.completedAt ? '' : completeTask(todo._id)"
            />
            <span class="task-name">{{ todo.task_name }}</span>
          </td>
          <td class="text-right">
            <a
              href="#"
              data-toggle="tooltip"
              data-placement="top"
              :title="'Deadline: ' + convertDateToLocal(todo.taskDeadline)"
            >
              <img
                v-if="todo.taskDeadline"
                src
                :class="{
                  pendingDeadline: !todo.isCompleted,
                  completedDeadline: todo.isCompleted
                }"
              />
            </a>
            <button
              v-on:click="editTask(todo.task_name, todo._id)"
              class="btn btn-outline-info"
            >
              Edit
            </button>
            <button
              v-on:click="deleteTask(todo._id)"
              class="btn btn-outline-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      </table>
    </div>
    <div class="col-lg-3 mx-auto">
      <CalendarSection
        v-if="showCalendar"
        :taskList="todos"
        :currentListId="listId"
        class="list-section"
      />
    </div>
  </div>
</template>
