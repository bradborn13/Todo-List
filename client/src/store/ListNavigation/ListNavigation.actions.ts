import ListNavigationState from './ListNavigation.state';
import RootState from '../state';
import { ActionTree } from 'vuex';
import createList from './actions/createList';
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
