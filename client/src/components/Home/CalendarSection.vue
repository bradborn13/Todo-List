<script>
/* eslint-disable */
import axios from "axios";
import CreateList from "./ListCollection/CreateList";
import ListCollection from "./ListCollection/ListCollection";
export default {
  name: "CalendarSection",

  data() {
    return {
 attributes: [
        {
          bar: {
            color: 'red',
            class: 'my-dot-class',
          },
          dates: [
            new Date(2018, 0, 1), // Jan 1st
            new Date(2018, 0, 10), // Jan 10th
            new Date(2018, 0, 22), // Jan 22nd
          ],
          popover: {
      label: "Lorem Epsilum",
      visibility: 'hover',
      hideIndicator: true,
    }
        },
        {
          bar: 'green',
          dates: [
            new Date(2018, 0, 4), // Jan 4th
            new Date(2018, 0, 10), // Jan 10th
            new Date(2018, 0, 15), // Jan 15th
          ], popover: {
      label: "Lorem Epsilum",
      visibility: 'hover',
      hideIndicator: true,
    }
        },
        {
          bar: 'purple',
          dates: [
            new Date(2018, 0, 12), // Jan 12th
            new Date(2018, 0, 26), // Jan 26th
            new Date(2018, 0, 15), // Jan 15th
          ], popover: {
      label: "Lorem Epsilum",
      visibility: 'hover',
      hideIndicator: true,
    }
        },
      ],
    };
  },
  components: {

  },
  methods: {

  }
};
</script>

<template>

     <div class="col-xl-12 " style="  height: 100vh;">
       <vc-calendar
  :from-date="new Date(2018, 0, 1)"   :attributes=" attributes" is-expanded >
 </vc-calendar>
      <!-- <vc-date-picker></vc-date-picker></div> -->



  </div>
</template>

<style></style>
