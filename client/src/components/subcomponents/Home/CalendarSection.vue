<script lang="ts">
/* eslint-disable */
import { Getter } from 'vuex-class';
import moment from 'moment';
import { store } from '../../../store';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { GlobalGetterKeys } from '../../../store/getters';
import { GlobalActionKeys } from '../../../store/actions';
@Component({
  name: 'CalendarSection',
  components: {}
})
export default class CalendarSection extends Vue {
  // @Prop({ default: '', required: true }) taskList!: any[];
  @Getter(GlobalGetterKeys.getDashboardListData) taskList!: any[];

  // @Prop({ default: '', required: true }) currentListId!: String;
  @Getter(GlobalGetterKeys.getDashboardDataFilteredStatus) isListCustom!: any[];
  @Getter(GlobalGetterKeys.getCustomListId) customListId!: any[];

  alertSuccess: string = 'alert-success';
  alertInfo: string = 'alert-info';
  currentDate: number = Date.now();
  attributes: any[] = [];
  notificationDeadline: any[] = []; // -- to do if task close to deadline show it as red mark
  @Getter(GlobalGetterKeys.getNotificationList) notificationGeneral!: any[];

  async beforeMount() {
    this.popultateCalendar();
    this.getListNotification();
  }
  dateNotification() {
    const taskList = this.taskList;
    const upcomingDeadlines: any[] = [];
    taskList.map((task) => {
      const currentDate = moment
        .utc(Date.now())
        .local()
        .format('YYYY-MM-DD');
      const deadlineDate = moment
        .utc(task.taskDeadline)
        .local()
        .format('YYYY-MM-DD');
      if (!task.taskDeadline) {
        return false;
      }
      const daysToDeadline = moment(deadlineDate).diff(
        moment(currentDate),
        'days'
      );
      if (daysToDeadline >= 0 && daysToDeadline <= 5) {
        upcomingDeadlines.push(task);
      }
    });
    return upcomingDeadlines;
  }
  convertToLocalTime(dateToConvert) {
    return moment
      .utc(dateToConvert)
      .local()
      .format('YYYY-MM-DD');
  }
  async getListNotification() {
    if (this.isListCustom) {
      await store
        .dispatch(
          GlobalActionKeys.getCustomListNotifications,
          this.customListId
        )
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
    if (!this.isListCustom) {
      await store
        .dispatch(GlobalActionKeys.getGeneralListNotifications)
        .then(async (res) => {
          // notificationData = await res.data;
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
  }
  popultateCalendar() {
    const calendarData: any[] = [];
    const currentListTasks = this.taskList;
    currentListTasks.forEach((task) => {
      let taskCalendarData = {};
      if (task.taskDeadline) {
        if (task.isCompleted) {
          taskCalendarData = {
            bar: 'green',
            dates: [
              new Date(
                moment
                  .utc(task.taskDeadline)
                  .local()
                  .format('YYYY-MM-DD')
              )
            ],
            popover: {
              label: task.task_name,
              visibility: 'hover',
              hideIndicator: false
            }
          };
        }
        if (!task.isCompleted) {
          taskCalendarData = {
            bar: {
              color: 'red',
              class: 'my-dot-class'
            },
            dates: [
              new Date(
                moment
                  .utc(task.taskDeadline)
                  .local()
                  .format('YYYY-MM-DD')
              )
            ],
            popover: {
              label: task.task_name,
              visibility: 'hover',
              hideIndicator: false
            }
          };
        }

        calendarData.push(taskCalendarData);
      }
    });
    const todayDate = {
      key: 'today',
      highlight: true,
      popover: {
        label: "You just hovered over today's date!"
      },
      dates: new Date()
    };
    calendarData.push(todayDate);

    this.attributes = calendarData;
  }
}
</script>
<style>
@import '../../../assets/css/calendarSection.css';
</style>
<template>
  <div class="col-xl-12" style>
    <vc-calendar
      :from-date="new Date(currentDate)"
      :attributes="attributes"
      is-expanded
    ></vc-calendar>
    <br />
    <div class="wrapper">
      <div class="divider div-transparent div-dot"></div>
    </div>
    <section class="col-12 mx-auto" style="padding-top:30px">
      <div
        class="alert alert-danger"
        role="alert"
        v-for="task in notificationDeadline"
        v-bind:key="task._id"
        v-bind:task_name="task.task_name"
      >
        Task {{ task.task_name }} deadline is on
        {{ convertToLocalTime(task.taskDeadline) }}
      </div>
      <div
        class="alert"
        v-for="task in notificationGeneral"
        v-bind:key="task._id"
        v-bind:task_name="task.task_name"
        v-bind:class="{
          'alert-success': task.isCompleted,
          'alert-info': !task.isCompleted
        }"
      >
        <div></div>
        {{
          task.isCompleted
            ? 'Task ' +
              task.task_name +
              ' completed on ' +
              convertToLocalTime(task.updatedAt)
            : 'Task ' +
              task.task_name +
              ' created on ' +
              convertToLocalTime(task.updatedAt)
        }}
      </div>
    </section>
  </div>
</template>

<style></style>
