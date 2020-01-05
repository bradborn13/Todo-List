<template>

    <ul class="col-lg-6 mx-auto" style="

text-align: left; ">
      <div v-for="list in listArray" v-bind:key="list._id" v-on:click="showTasks(list._id)">
             <img v-if="inView !== list._id"
          src="../../../assets/off-list.png"
          height="50px"

        />
               <img v-if="inView === list._id"
          src="../../../assets/on-list.png"
          height="50px"

        /><p style="display:inline; margin-left:50px;  font-family: Times New Roman, Times, serif;
  font-size: 30px;"> {{ list.listName }}</p>

        <br />
      </div>
    </ul>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  name: "ListCollection",
  data() {
    return {
      inView:"default",
      listArray: []
    };
  },
  mounted() {
    this.getLists();
  },
  methods: {
    getLists() {
      axios
        .get("/api/listCollection")
        .then(res => {
          console.log(res);
          this.listArray = res.data;
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
    showTasks(listId) {
      console.log(this.inView,'before')
      this.inView = listId;
            console.log(this.inView,'after')

      this.$emit("showListTasks", listId);
    }
  }
};
</script>
<style></style>
