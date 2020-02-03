export interface IListNavigationState {
  listCollection: IList[];
}
export interface IList {
  taskCount: number;
  completedTaskCount: number;
  _id: string;
}
