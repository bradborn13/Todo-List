import axios from '@/config/axios-config';
import { ActionContext } from 'vuex';
import RootState from '../state';
import { IRootState, ITask } from '../types';
import { GlobalActionKeys } from '../actions';
import { GlobalMutationKeys } from '../mutations';

export default async function addTaskToGeneralList(
  { commit, state, dispatch }: ActionContext<RootState, RootState>,
  newTask: ITask
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    axios
      .post('/api/addTask/general', newTask)
      .then(async (tasks) => {
        return resolve();
      })
      .catch((err) => {
        return reject(err);
      });
  });
}
