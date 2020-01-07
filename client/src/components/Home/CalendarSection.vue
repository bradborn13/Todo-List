<script>
/* eslint-disable */
import axios from "axios";
import CreateList from "./ListCollection/CreateList";
import ListCollection from "./ListCollection/ListCollection";
import * as moment from "moment";

export default {
  name: "CalendarSection",
  components: {},
  props: {
    taskList: ""
  },
  data() {
    return {
      currentDate: Date.now(),
      attributes: this.popultateCalendar()
      // attributes: [
      //   {
      //     bar: {
      //       color: "red",
      //       class: "my-dot-class"
      //     },
      //     dates: [
      //       new Date(2018, 0, 1), // Jan 1st
      //       new Date(2018, 0, 10), // Jan 10th
      //       new Date(2018, 0, 22) // Jan 22nd
      //     ],
      //     popover: {
      //       label: "Lorem Epsilum",
      //       visibility: "hover",
      //       hideIndicator: false
      //     }
      //   },
      //   {
      //     bar: "green",
      //     dates: [
      //       new Date(2018, 0, 4), // Jan 4th
      //       new Date(2018, 0, 10), // Jan 10th
      //       new Date(2018, 0, 15) // Jan 15th
      //     ],
      //     popover: {
      //       label: "Lorem Epsilum",
      //       visibility: "hover",
      //       hideIndicator: false
      //     }
      //   },
      //   {
      //     bar: "purple",
      //     dates: [
      //       new Date(2018, 0, 12), // Jan 12th
      //       new Date(2018, 0, 26), // Jan 26th
      //       new Date(2018, 0, 15) // Jan 15th
      //     ],
      //     popover: {
      //       label: "lucian",
      //       visibility: "hover",
      //       hideIndicator: false
      //     }
      //   },
      //   {
      //     bar: "purple",
      //     dates: [
      //       new Date(2018, 0, 15) // Jan 15th
      //     ],
      //     popover: {
      //       label: "ciprian",
      //       visibility: "hover",
      //       hideIndicator: false
      //     }
      //   }
      // ]
    };
  },
  mounted() {
    this.popultateCalendar();
  },
  components: {},
  methods: {
    popultateCalendar() {
      const calendarData = [];
      const currentListTasks = this.taskList;
      currentListTasks.forEach(task => {
        let taskCalendarData = {};
        if (task.taskDeadline) {
          if (task.isCompleted) {
            taskCalendarData = {
              bar: "green",
              dates: [
                new Date(
                  moment
                    .utc(task.taskDeadline)
                    .local()
                    .format("YYYY-MM-DD")
                )
              ],
              popover: {
                label: task.task_name,
                visibility: "hover",
                hideIndicator: false
              }
            };
          }
          if (!task.isCompleted) {
            taskCalendarData = {
              bar: {
                color: "red",
                class: "my-dot-class"
              },
              dates: [
                new Date(
                  moment
                    .utc(task.taskDeadline)
                    .local()
                    .format("YYYY-MM-DD")
                )
              ],
              popover: {
                label: task.task_name,
                visibility: "hover",
                hideIndicator: false
              }
            };
          }
          calendarData.push(taskCalendarData);
        }
      });
      this.attributes = calendarData;
    }
  }
};
</script>

<template>
  <div class="col-xl-12 " style="  height: 100vh;">
    <vc-calendar
      :from-date="new Date(currentDate)"
      :attributes="attributes"
      is-expanded
    >
    </vc-calendar>
  </div>
</template>

<style></style>
