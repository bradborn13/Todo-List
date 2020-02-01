import { MutationTree } from 'vuex';
import { IRootState } from './types';
export enum GlobalMutationKeys {
  'setSomething' = 'setSomething',
  'dashboardData' = 'dashboardData',
  'setDashboardFilterByList' = 'setDashboardFilterByList',
  'setDashboardUnfiltered' = 'setDashboardUnfiltered'
}

export const mutations: MutationTree<IRootState> = {
  setSomething() {
    console.log('did something');
  },

  dashboardData(state: IRootState, dashboardData: []) {
    state.dashboardListData = dashboardData;
  },
  setDashboardFilterByList(state: IRootState) {
    state.isDashboardDataFiltered = true;
  },
  setDashboardUnfiltered(state: IRootState) {
    state.isDashboardDataFiltered = false;
  }
};
