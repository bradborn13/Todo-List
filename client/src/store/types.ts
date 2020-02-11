export interface IRootState {
  dashboardListData: [];
  isDashboardDataFiltered: boolean;
  notificationList: ITask[];
  customListId: string;
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
