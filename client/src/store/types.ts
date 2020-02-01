export interface IRootState {
  generalListState: IVersion;
  dashboardListData: [];
  isDashboardDataFiltered: boolean;
}
export interface IVersion {
  version: number;
}
