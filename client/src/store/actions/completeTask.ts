import axios from '@/config/axios-config';
import { ActionContext } from 'vuex';
import RootState from '../state';
import { IUpdateTask } from '../types';

export default async function completeTask(
  { commit, state, dispatch }: ActionContext<RootState, RootState>,
  taskId: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    axios({ method: 'put', url: `/api/task/${taskId}/complete` })
      .then(async () => {
        return resolve();
      })
      .catch((err) => {
        return reject(err);
      });
  });
}
