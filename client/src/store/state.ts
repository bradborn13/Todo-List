import { IRootState, ITask } from './types';
export default class RootState implements IRootState {
  notificationList: ITask[];
  dashboardListData: [];
  isDashboardDataFiltered: boolean;
  customListId: string;
  constructor() {
    this.dashboardListData = [];
    this.isDashboardDataFiltered = false;
    this.customListId = '';
    this.notificationList = [];
  }
}
