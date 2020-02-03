export interface IRootState {
  generalListState: IVersion;
  dashboardListData: [];
  isDashboardDataFiltered: boolean;
  customListId: string;
}
export interface IVersion {
  version: number;
}
export interface ITask {
  name: string;
  deadline: string;
}
export interface ICustomListTask {
  task: ITask;
  listId: string;
}
export interface IUpdateTask {
  task: ITask;

  taskId: string;
}
export enum ModuleNames {
  listNav = 'listNav'
}
