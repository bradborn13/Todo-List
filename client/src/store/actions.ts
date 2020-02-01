import RootState from './state';
import { ActionTree } from 'vuex';
import getGeneralListData from './actions/getGeneralListData';
import getCustomListData from './actions/getCustomListData';
import getGeneralListHistory from './actions/getGeneralListHistory';
export enum GlobalActionKeys {
  'getGeneralListData' = 'getGeneralListData',
  'getCustomListData' = 'getCustomListData',
  'getGeneralListHistory' = 'getGeneralListHistory'
}
export const actions: ActionTree<RootState, RootState> = {
  getGeneralListData,
  getCustomListData,
  getGeneralListHistory
};
