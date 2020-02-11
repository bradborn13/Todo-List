import RootState from './state';
import { IRootState } from './types';
import { GetterTree } from 'vuex';

export enum GlobalGetterKeys {
  'getDashboardListData' = 'getDashboardListData',
  'getDashboardDataFilteredStatus' = 'getDashboardDataFilteredStatus',
  'getCustomListId' = 'getCustomListId',
  'getNotificationList' = 'getNotificationList'
}
export const getters: GetterTree<RootState, IRootState> = {
  getNotificationList: (state) => state.notificationList,
  getDashboardListData: (state) => state.dashboardListData,
  getDashboardDataFilteredStatus: (state) => state.isDashboardDataFiltered,
  getCustomListId: (state) => state.customListId
};
