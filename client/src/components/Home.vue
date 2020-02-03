<script lang="ts">
import ListNavigation from './subcomponents/Home/ListNavigation.vue';
import * as moment from 'moment';
import Loading from 'vue-loading-overlay';
import AddTask from './subcomponents/Home/AddTask.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import CalendarSection from './subcomponents/Home/CalendarSection.vue';
import { Datetime } from 'vue-datetime';
import { Action, Getter, namespace } from 'vuex-class';
import { GlobalActionKeys } from '../store/actions';
import { GlobalGetterKeys } from '../store/getters';
import { ITask } from '../store/types';
import { store } from '../store';
@Component({
  name: 'Home',
  components: {
    ListNavigation,
    CalendarSection,
    Loading,
    Datetime,
    AddTask
  }
})
export default class Home extends Vue {
  loaderSettings: {} = {
    color: '#ADFF2F',
    loader: 'spinner',
    height: 150,
    width: 150
  };
  @Getter(GlobalGetterKeys.getDashboardListData) todos!: any;
  @Getter(GlobalGetterKeys.getCustomListId) listId!: string;
  @Getter(GlobalGetterKeys.getDashboardDataFilteredStatus)
  isDashboardFiltered!: boolean;

  taskToEdit: string = '';
  isLoading: boolean = false;
  showCalendarComponent: boolean = true;
  showAddTaskComponent: boolean = false;
  toggleMenuTask: boolean = true;
  listName: string = ''; // -- not used

  mounted() {
    this.getGeneralListData();
  }
  cleanForm() {
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
  getGeneralListData() {
    store
      .dispatch(GlobalActionKeys.getGeneralListData)
      .then((result) => {
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
  }
  // componentIsLoading() {
  //   this.isLoading = true;
  //   setTimeout(() => {
  //     this.isLoading = false;
  //   }, 5000);
  // },

  completeTask(taskId: string) {
    store
      .dispatch(GlobalActionKeys.completeTask, taskId)
      .then((res) => {
        this.isDashboardFiltered
          ? this.getCustomListData()
          : this.getGeneralListData();
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
      this.getGeneralListData();
      this.toggleMenuTask = true;
      this.isLoading = false;
    }
  }
  customListMainSection(listId: string) {
    if (!this.toggleMenuTask) {
      this.isLoading = true;
      this.getCustomListData();
      this.toggleMenuTask = true;
      this.isLoading = false;
    }
  }
  generalListHistory() {
    if (this.toggleMenuTask) {
      this.isLoading = true;
      this.getGeneralListHistory();
      this.toggleMenuTask = false;
      this.isLoading = false;
    }
  }
  customListHistory(listId: string) {
    if (this.toggleMenuTask) {
      this.isLoading = true;
      this.getCustomListHistory(listId);
      this.toggleMenuTask = false;
      this.isLoading = false;
    }
  }
  getListData() {
    this.isDashboardFiltered
      ? this.toggleMenuTask
        ? this.getCustomListData()
        : this.getCustomListHistory(this.listId)
      : this.toggleMenuTask
      ? this.getGeneralListData()
      : this.getGeneralListHistory();
  }
  deleteTask(taskId: string) {
    store
      .dispatch(GlobalActionKeys.deleteTask, taskId)
      .then((res) => {
        this.getListData();
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

  editTask(taskId: string) {
    this.taskToEdit = taskId;
    this.showAddTaskComponent
      ? this.reRenderAddTask()
      : this.toggleAddTaskComponent();
  }

  reRenderCalendar() {
    this.showCalendarComponent = !this.showCalendarComponent;
    this.$nextTick(() => {
      this.showCalendarComponent = !this.showCalendarComponent;
    });
  }

  convertDateToLocal(localDate: string) {
    return moment
      .utc(localDate)
      .local()
      .format('YYYY-MM-DD');
  }
  getCustomListData() {
    this.cleanForm();
    store
      .dispatch(GlobalActionKeys.getCustomListData, this.listId)
      .then((resp) => {})
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
  handleTaskAddedOrUpdate() {
    if (this.isDashboardFiltered) {
      this.getCustomListData();
      return this.toggleAddTaskComponent();

      // reload dashobard using custom list get method
    }
    this.getGeneralListData();
    this.toggleAddTaskComponent();

    // reload dashobard using general list get method
  }
  toggleAddTaskComponent() {
    this.showAddTaskComponent = !this.showAddTaskComponent;
  }
  reRenderAddTask() {
    this.showAddTaskComponent = false;
    return this.$nextTick(() => {
      this.showAddTaskComponent = true;
    });
  }
  getCustomListHistory(listId: string) {
    this.cleanForm();
    store
      .dispatch(GlobalActionKeys.getCustomListHistory, listId)
      .then((resp) => {})
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
        @renderListTasks="getCustomListData"
        @renderGeneralTasks="getGeneralListData"
        class="list-section"
      />
    </div>
    <div class="col-lg-6 mx-auto center-section">
      <div class="navigation col-lg-6 mx-auto">
        <ul>
          <li class="col-lg-6">
            <a
              v-on:click="
                isDashboardFiltered
                  ? customListMainSection(listId)
                  : generalListMainSection()
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
                isDashboardFiltered
                  ? customListHistory(listId)
                  : generalListHistory()
              "
              :class="{ selectedOption: !toggleMenuTask }"
              >All</a
            >
          </li>
        </ul>
      </div>
      <div v-if="!showAddTaskComponent">
        <img
          src="../assets/add-new-list.svg"
          class="calendar-icon"
          v-on:click="toggleAddTaskComponent"
        />
      </div>
      <AddTask
        v-if="showAddTaskComponent"
        @handleSuccessOperation="handleTaskAddedOrUpdate"
        :editTaskWithId="taskToEdit"
      />

      <table class="table col-lg-12 list-content">
        <tr
          v-for="todo in todos"
          v-bind:key="todo._id"
          v-bind:task_name="todo.task_name"
        >
          <td class="text-left">
            <img
              src="../assets/check.svg"
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
              v-on:click="editTask(todo._id)"
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
        v-if="showCalendarComponent"
        :taskList="todos"
        :currentListId="listId"
        class="list-section"
      />
    </div>
  </div>
</template>
