import axios from '@/config/axios-config';
import { ActionContext } from 'vuex';
import RootState from '../state';
import { IUpdateTask } from '../types';
import { GlobalMutationKeys } from '../mutations';

export default async function getAllTasks(
  { commit, state, dispatch }: ActionContext<RootState, RootState>,
  taskId: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    axios({ method: 'get', url: '/api/tasksHistory' })
      .then(async (result) => {
        commit(GlobalMutationKeys.dashboardData, result.data);
        return resolve();
      })
      .catch((err) => {
        return reject(err);
      });
  });
}
