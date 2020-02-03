import ListNavigationState from './ListNavigation.state';
import addTaskToGeneralList from '../actions/addTaskToGeneralList';
import RootState from '../state';
import { ActionTree } from 'vuex';
import createList from './actions/createList';
import CreateList from '../../components/subcomponents/ListNavigation/CreateList.vue';
import getListCollection from './actions/getListCollection';
export enum ListNavigationActionKeys {
  'createList' = 'createList',
  'getListCollection' = 'getListCollection'
}

export const actions: ActionTree<ListNavigationState, RootState> = {
  createList,
  getListCollection
};
export default actions;
