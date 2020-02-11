import { MutationTree } from 'vuex';
import { IRootState, ITask } from './types';
export enum GlobalMutationKeys {
  'dashboardData' = 'dashboardData',
  'setDashboardFilterByList' = 'setDashboardFilterByList',
  'setDashboardUnfiltered' = 'setDashboardUnfiltered',
  'setCustomListId' = 'setCustomListId',
  'setDefaultCustomListId' = 'setDefaultCustomListId',
  'setNotificationList' = 'setNotificationList'
}

export const mutations: MutationTree<IRootState> = {
  dashboardData(state: IRootState, dashboardData: []) {
    state.dashboardListData = dashboardData;
  },
  setNotificationList(state: IRootState, notificationList: ITask[]) {
    state.notificationList = notificationList;
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
