import { MutationTree } from 'vuex';
import { IRootState } from './types';
export enum GlobalMutationKeys {
  'setSomething' = 'setSomething',
  'dashboardData' = 'dashboardData',
  'setDashboardFilterByList' = 'setDashboardFilterByList',
  'setDashboardUnfiltered' = 'setDashboardUnfiltered',
  'setCustomListId' = 'setCustomListId',
  'setDefaultCustomListId' = 'setDefaultCustomListId'
}

export const mutations: MutationTree<IRootState> = {
  dashboardData(state: IRootState, dashboardData: []) {
    state.dashboardListData = dashboardData;
  },
  setDashboardFilterByList(state: IRootState) {
    state.isDashboardDataFiltered = true;
  },
  setDashboardUnfiltered(state: IRootState) {
    state.isDashboardDataFiltered = false;
  },
  setCustomListId(state: IRootState, listId: string) {
    state.customListId = listId;
  },
  setDefaultCustomListId(state: IRootState) {
    state.customListId = '';
  }
};
