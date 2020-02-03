import axios from '@/config/axios-config';
import { ActionContext } from 'vuex';
import RootState from '../state';
import { ICustomListTask } from '../types';
import { GlobalActionKeys } from '../actions';
import { GlobalMutationKeys } from '../mutations';

export default async function addTaskToCustomList(
  { commit, state, dispatch }: ActionContext<RootState, RootState>,
  newTask: ICustomListTask
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    axios
      .post(`/api/list/${newTask.listId}/addTask`, newTask.task)
      .then(async (tasks) => {
        return resolve();
      })
      .catch((err) => {
        return reject(err);
      });
  });
}
