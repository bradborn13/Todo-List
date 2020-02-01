import axios from '@/config/axios-config';
import { ActionContext } from 'vuex';
import RootState from '../state';
import { IRootState } from '../types';
import { GlobalActionKeys } from '../actions';
import { GlobalMutationKeys } from '../mutations';

export default async function getGeneralListData(
  { commit, state, dispatch }: ActionContext<IRootState, IRootState>,
  emptyVariable: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    axios({ method: 'get', url: '/api/tasks' })
      .then(async (tasks) => {
        await commit(GlobalMutationKeys.setDashboardUnfiltered);
        await commit(GlobalMutationKeys.dashboardData, tasks.data);

        return resolve();
        // this.todos = tasks.data;
      })
      .catch((err) => {
        return reject(err);
      });
  });
}
