import axios from '@/config/axios-config';
import { ActionContext } from 'vuex';
import RootState from '../state';
import { IRootState } from '../types';
import { GlobalActionKeys } from '../actions';
import { GlobalMutationKeys } from '../mutations';

export default async function getCustomListData(
  { commit, state, dispatch }: ActionContext<IRootState, IRootState>,
  listId: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    axios
      .get(`/api/list/${listId}/getTasks`)
      .then(async (tasks) => {
        await commit(GlobalMutationKeys.setCustomListId, listId);
        await commit(GlobalMutationKeys.setDashboardFilterByList);
        await commit(GlobalMutationKeys.dashboardData, tasks.data);
        return resolve();
        // this.todos = tasks.data;
      })
      .catch((err) => {
        return reject(err);
      });
  });
}
