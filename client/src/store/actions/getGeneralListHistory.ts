import axios from '@/config/axios-config';
import { ActionContext } from 'vuex';
import RootState from '../state';
import { IRootState } from '../types';
import { GlobalMutationKeys } from '../mutations';

export default async function getGeneralListHistory({
  commit
}: ActionContext<IRootState, IRootState>): Promise<any> {
  return new Promise(async (resolve, reject) => {
    axios({ method: 'get', url: '/api/tasks/all' })
      .then(async (tasks) => {
        await commit(GlobalMutationKeys.dashboardData, tasks.data);
        return resolve();
      })
      .catch((err) => {
        return reject(err);
      });
  });
}
