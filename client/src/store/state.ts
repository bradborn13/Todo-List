import { IRootState, IVersion } from './types';
export default class RootState implements IRootState {
  generalListState: IVersion;
  dashboardListData: [];
  isDashboardDataFiltered: boolean;
  customListId: string;
  constructor() {
    this.generalListState = { version: 1.0 };
    this.dashboardListData = [];
    this.isDashboardDataFiltered = false;
    this.customListId = '';
  }
}
