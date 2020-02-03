import { MutationTree } from 'vuex';
import ListNavigationState from './ListNavigation.state';
import { IList } from './ListNavigation.types';
export enum ListNavigationMutationKeys {
  'setListCollection' = 'setListCollection'
}
const mutations: MutationTree<ListNavigationState> = {
  setListCollection(state: ListNavigationState, payload: IList[]) {
    state.listCollection = payload;
  }
};
export default mutations;
