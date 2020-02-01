import RootState from './state';
import { IRootState } from './types';
import { GetterTree } from 'vuex';

export enum GlobalGetterKeys {
  'getGeneralList' = 'getGeneralList',
  'getVersionState' = 'getVersionState',
  'getDashboardListData' = 'getDashboardListData',
  'getDashboardDataFilteredStatus' = 'getDashboardDataFilteredStatus'
}
export const getters: GetterTree<RootState, IRootState> = {
  getGeneralList: (state) => state.generalListState,
  getVersionState: (state) => state.generalListState.version,
  getDashboardListData: (state) => state.dashboardListData,
  getDashboardDataFilteredStatus: (state) => state.isDashboardDataFiltered
};
