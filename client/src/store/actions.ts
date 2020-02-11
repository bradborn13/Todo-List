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
import getCustomListNotifications from './actions/getCustomListNotifications';
import getGeneralListNotifications from './actions/getGeneralListNotifications';
import getAllTasks from './actions/getAllTasks';
export enum GlobalActionKeys {
  'getGeneralListData' = 'getGeneralListData',
  'getCustomListData' = 'getCustomListData',
  'getCustomListHistory' = 'getCustomListHistory',
  'getGeneralListHistory' = 'getGeneralListHistory',
  'addTaskToGeneralList' = 'addTaskToGeneralList',
  'addTaskToCustomList' = 'addTaskToCustomList',
  'updateTask' = 'updateTask',
  'completeTask' = 'completeTask',
  'deleteTask' = 'deleteTask',
  'getCustomListNotifications' = 'getCustomListNotifications',
  'getGeneralListNotifications' = 'getGeneralListNotifications',
  'getAllTasks' = 'getAllTasks'
}

export const actions: ActionTree<RootState, RootState> = {
  getAllTasks,
  getGeneralListData,
  addTaskToCustomList,
  getCustomListData,
  getGeneralListHistory,
  getCustomListHistory,
  addTaskToGeneralList,
  updateTask,
  completeTask,
  deleteTask,
  getCustomListNotifications,
  getGeneralListNotifications
};
