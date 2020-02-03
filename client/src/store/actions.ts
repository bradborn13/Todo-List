import RootState from './state';
import { ActionTree } from 'vuex';
import getGeneralListData from './actions/getGeneralListData';
import getCustomListData from './actions/getCustomListData';
import getGeneralListHistory from './actions/getGeneralListHistory';
import getCustomListHistory from './actions/getCustomListHistory';
import addTaskToGeneralList from './actions/addTaskToGeneralList';
import addTaskToCustomList from './actions/addTaskToCustomList';
import completeTask from './actions/completeTask';
import updateTask from './actions/updateTask';
import deleteTask from './actions/deleteTask';
export enum GlobalActionKeys {
  'getGeneralListData' = 'getGeneralListData',
  'getCustomListData' = 'getCustomListData',
  'getCustomListHistory' = 'getCustomListHistory',
  'getGeneralListHistory' = 'getGeneralListHistory',
  'addTaskToGeneralList' = 'addTaskToGeneralList',
  'addTaskToCustomList' = 'addTaskToCustomList',
  'updateTask' = 'updateTask',
  'completeTask' = 'completeTask',
  'deleteTask' = 'deleteTask'
}

export const actions: ActionTree<RootState, RootState> = {
  getGeneralListData,
  addTaskToCustomList,
  getCustomListData,
  getGeneralListHistory,
  getCustomListHistory,
  addTaskToGeneralList,
  updateTask,
  completeTask,
  deleteTask
};
