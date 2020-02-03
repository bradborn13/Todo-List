<script lang="ts">
/* eslint-disable */
import { Component, Prop, Vue } from 'vue-property-decorator';
import { store } from '../../../store/index';
import { ListNavigationActionKeys } from '../../../store/ListNavigation/ListNavigation.actions';
import { ModuleNames } from '../../../store/types';
import { GlobalMutationKeys } from '../../../store/mutations';
@Component({
  name: 'CreateList',
  components: {}
})
export default class CreateList extends Vue {
  listName: string = '';

  switchView() {
    this.$emit('returnView');
  }
  addList() {
    if (!this.listName) {
      return this.$notify({
        group: 'center-notification',
        type: 'error',
        title: 'Error',
        text: `List name is required`
      });
    }
    const createNewList = [
      ModuleNames.listNav,
      ListNavigationActionKeys.createList
    ].join('/');
    store
      .dispatch(createNewList, this.listName)
      .then((res) => {
        store.commit(GlobalMutationKeys.setCustomListId, res.data._id);
        store.commit(GlobalMutationKeys.setDashboardFilterByList);
        this.$emit('onListCreated');
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
        class="form-control"
        id="taskNameInput"
        placeholder="List name..."
      />
      <button type="submit" class="btn btn-outline-success btn-block mt-3 mb-4">
        Save
      </button>
    </form>
  </div>
</template>
