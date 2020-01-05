<script>
/* eslint-disable */
import axios from "axios";
export default {
  name: "CreateList",
  data() {
    return {
      listName: ""
    };
  },
  methods: {
    switchView() {
      this.$emit("returnView");
    },
    addList() {
      if (!this.listName) {
        return this.$notify({
          group: "center-notification",
          type: "error",
          title: "Error",
          text: `List name is required`
        });
      }

      axios
        .post("/api/list", { listName: this.listName })
        .then(res => {
          this.$emit("onListCreated", res.data._id);
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
<style></style>
<template>
  <div>
    <form v-on:submit.prevent="addList" class="col-lg-8 mx-auto">
      <h3>
        <img
          src="../../../assets/icons8-back-100.png"
          height="30px"
          style="float:left"
          v-on:click="switchView"
        />
        CreateList
      </h3>
      <br />
      <input
        v-model="listName"
        class="form-control "
        id="taskNameInput"
        placeholder="List name..."
      />
      <button
        type="submit"
        class=" btn btn-outline-success  btn-block mt-3 mb-4"
      >
        Save
      </button>
    </form>
  </div>
</template>
