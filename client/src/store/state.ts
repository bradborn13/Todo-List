import { IRootState, IVersion } from './types';
export default class RootState implements IRootState {
  generalListState: IVersion;
  dashboardListData: [];
  isDashboardDataFiltered: boolean;
  constructor() {
    this.generalListState = { version: 1.0 };
    this.dashboardListData = [];
    this.isDashboardDataFiltered = false;
  }
}
