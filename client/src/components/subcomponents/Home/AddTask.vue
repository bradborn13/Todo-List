<script lang="ts">
/* eslint-disable */
import { Action, Getter, namespace } from 'vuex-class';
import { GlobalGetterKeys } from '../../../store/getters';
import { GlobalActionKeys } from '../../../store/actions';
import {
  ITask,
  ICustomListTask,
  IUpdateTask,
  ModuleNames
} from '../../../store/types';
import moment from 'moment';
import { store } from '../../../store';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ListNavigationActionKeys } from '../../../store/ListNavigation/ListNavigation.actions';

@Component({
  name: 'CalendarSection',
  components: {}
})
export default class AddTask extends Vue {
  @Getter(GlobalGetterKeys.getDashboardDataFilteredStatus)
  isDashboardFiltered!: boolean;
  @Getter(GlobalGetterKeys.getDashboardListData) todos!: any;
  @Getter(GlobalGetterKeys.getCustomListId) listId!: string;
  @Prop({ default: '', required: true }) editTaskWithId!: string;
  taskName: string = '';
  taskDeadline: string = '';
  calendarNoDate: string = 'deadline-icon';
  calendarWithDate: string = 'deadline-icon-selected';
  calendarIcon: string = this.taskDeadline
    ? this.calendarWithDate
    : this.calendarNoDate;
  async beforeMount() {
    if (this.editTaskWithId) {
      const selectedTask = this.todos.find(
        (x) => x._id === this.editTaskWithId
      );
      this.taskName = selectedTask.task_name;
      this.taskDeadline = selectedTask.taskDeadline;
    }
  }

  closeComponent() {
    this.editTaskWithId = '';
    this.$emit('closeComponent');
  }
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

    if (this.isDashboardFiltered) {
      const newCustomListTask: ICustomListTask = {
        task: { name: this.taskName, deadline: this.taskDeadline },
        listId: this.listId
      };
      const getListCollection = [
        ModuleNames.listNav,
        ListNavigationActionKeys.getListCollection
      ].join('/');
      return store
        .dispatch(GlobalActionKeys.addTaskToCustomList, newCustomListTask)
        .then(async (res) => {
          await store
            .dispatch(getListCollection)
            .then(() => {
              this.$emit('handleSuccessOperation');
            })
            .catch((err) => {
              this.$notify({
                group: 'corner-notification',
                type: 'error',
                title: 'Error',
                text: `Error: ${err}`
              });
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
    const newTask: ITask = {
      name: this.taskName,
      deadline: this.taskDeadline
    };
    return store
      .dispatch(GlobalActionKeys.addTaskToGeneralList, newTask)
      .then((res) => {
        this.$emit('handleSuccessOperation');
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
        // this.cleanForm(); --TO DO
      });
  }
  getImage() {
    const image = this.taskDeadline
      ? require('../../../assets/' + this.calendarWithDate + '.svg')
      : require('../../../assets/' + this.calendarNoDate + '.svg');
    return image;
  }
  updateTask() {
    const updatedTask: IUpdateTask = {
      task: {
        name: this.taskName,
        deadline: this.taskDeadline
      },
      taskId: this.editTaskWithId
    };
    store
      .dispatch(GlobalActionKeys.updateTask, updatedTask)
      .then((res) => {
        this.$emit('handleSuccessOperation');
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
  //   cleanForm() {
  //     this.taskDeadline = '';
  //     this.toggleMenuTask = true;
  //   }
}
</script>
<style>
@import '../../../assets/css/calendarSection.css';
</style>
<template>
  <div class="col-xl-12">
    <form v-on:submit.prevent="addNewTask" class="col-xl-12 mx-auto">
      <div class="form-wrapper col-md-12">
        <img
          class="close-create-task-component"
          src="../../../assets/icons8-back-100.png"
          v-on:click="closeComponent"
        />
        <h1 class="header-title">{{editTaskWithId? " Update Task": "Add Task"}}</h1>
        <div class="taskName-section">
          <input
            v-model="taskName"
            class="form-control-taskName shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-100"
            v-bind:placeholder="taskName ? taskName : 'Task Name'"
            listId
          />
          <button
            v-if="taskName"
            type="button"
            class="button-clear-taskName"
            @click="taskName = ''"
          >Clear</button>
        </div>

        <div class="calendar-section">
          <vc-date-picker
            v-model="taskDeadline"
            :popover="{ placement: 'bottom', visibility: 'hover' }"
          >
            <input
              v-model="taskDeadline"
              class="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 form-control-deadline"
              v-bind:placeholder="taskDeadline ? taskDeadline : 'Add deadline'"
              v-on="taskDeadline"
            />
          </vc-date-picker>
          <button
            v-if="taskDeadline"
            type="button"
            class="button-clear-deadline"
            @click="taskDeadline = ''"
          >Clear</button>
        </div>

        <button
          v-if="!this.editTaskWithId"
          type="submit"
          class="btn btn-outline-primary btn-addTask-component"
        >Submit</button>
        <button
          v-else
          type="button"
          v-on:click="updateTask()"
          class="btn btn-primary btn-addTask-component"
        >Update</button>
      </div>
    </form>
  </div>
</template>

<style>
@import '../../../assets/css/createTask.css';
</style>
