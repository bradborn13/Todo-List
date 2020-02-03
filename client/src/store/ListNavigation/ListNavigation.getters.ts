import ListNavigationState from './ListNavigation.state';
import RootState from '../state';
import { GetterTree } from 'vuex';
export enum ListNavigationGetterKeys {
  'getListCollection' = 'getListCollection'
}
export const getters: GetterTree<ListNavigationState, RootState> = {
  getListCollection: (state: ListNavigationState) => state.listCollection
};
export default getters;
