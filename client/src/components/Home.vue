<script lang="ts">
import ListNavigation from './subcomponents/Home/ListNavigation.vue';
import * as moment from 'moment';
import Loading from 'vue-loading-overlay';
import AddTask from './subcomponents/Home/AddTask.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import CalendarSection from './subcomponents/Home/CalendarSection.vue';
import { ListNavigationActionKeys } from '../store/ListNavigation/ListNavigation.actions';
import { Datetime } from 'vue-datetime';
import { Action, Getter, namespace } from 'vuex-class';
import { GlobalActionKeys } from '../store/actions';
import { GlobalGetterKeys } from '../store/getters';
import { ITask, ModuleNames } from '../store/types';
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
  resetHomePage() {
    this.showAddTaskComponent = false;
    this.toggleMenuTask = true;
    this.taskToEdit = '';
  }
  getGeneralListHistory() {
    // if (this.listId) {  TODO: check if this is not needded anymore
    //   this.listId = '';
    // }
    this.showAddTaskComponent = false;

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

  async completeTask(taskId: string) {
    await store
      .dispatch(GlobalActionKeys.completeTask, taskId)
      .then(async (res) => {
        if (this.isDashboardFiltered) {
          const getListCollection = [
            ModuleNames.listNav,
            ListNavigationActionKeys.getListCollection
          ].join('/');
          await store.dispatch(getListCollection);
          this.getCustomListData();
        } else {
          this.getGeneralListData();
        }
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
      this.showAddTaskComponent = false;
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
  async deleteTask(taskId: string) {
    await store
      .dispatch(GlobalActionKeys.deleteTask, taskId)
      .then(async (res) => {
        if (this.isDashboardFiltered) {
          const getListCollection = [
            ModuleNames.listNav,
            ListNavigationActionKeys.getListCollection
          ].join('/');
          await store.dispatch(getListCollection);
        }
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
  // funtion called when general list is loaded
  resetHomeComponentGeneral() {
    this.resetHomePage();
    this.getGeneralListData();
  }
  // funtion called when custom list is loaded
  resetHomeComponentFiltered() {
    this.resetHomePage();
    this.getCustomListData();
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
    if (this.showAddTaskComponent) {
      this.taskToEdit = '';
    }
    this.showAddTaskComponent = !this.showAddTaskComponent;
  }
  reRenderAddTask() {
    this.showAddTaskComponent = false;
    return this.$nextTick(() => {
      this.showAddTaskComponent = true;
    });
  }
  get shouldShowAddTaskComponent() {
    if (!this.showAddTaskComponent) {
      if (!this.toggleMenuTask) {
        return false;
      }
      return true;
    }
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
        @renderListTasks="resetHomeComponentFiltered"
        @renderGeneralTasks="resetHomeComponentGeneral"
        class="side-sections"
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
            >Main</a>
          </li>

          <li class="col-lg-6">
            <a
              v-on:click="
                isDashboardFiltered
                  ? customListHistory(listId)
                  : generalListHistory()
              "
              :class="{ selectedOption: !toggleMenuTask }"
            >All</a>
          </li>
        </ul>
      </div>
      <div class="col-xl-12 mx-auto">
        <button
          class="btn-add-task"
          v-if="shouldShowAddTaskComponent"
          v-on:click="toggleAddTaskComponent"
          type="submit"
        >
          <font-awesome-icon icon="plus-circle" />
          <div class="btn-task-text">Create Task</div>
        </button>
        <AddTask
          v-if="showAddTaskComponent"
          @handleSuccessOperation="handleTaskAddedOrUpdate"
          @closeComponent="toggleAddTaskComponent"
          :editTaskWithId="taskToEdit"
        />
      </div>
      <div class="list-content">
        <table class="table col-lg-12">
          <tr v-for="todo in todos" v-bind:key="todo._id" v-bind:task_name="todo.task_name">
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
                v-if="toggleMenuTask"
                v-on:click="editTask(todo._id)"
                class="btn btn-outline-info"
              >Edit</button>
              <button
                v-if="toggleMenuTask"
                v-on:click="deleteTask(todo._id)"
                class="btn btn-outline-danger"
              >Delete</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="col-lg-3 mx-auto">
      <CalendarSection
        v-if="showCalendarComponent"
        :taskList="todos"
        :currentListId="listId"
        class="side-sections"
      />
    </div>
  </div>
</template>