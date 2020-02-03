import axios from '@/config/axios-config';
import { ActionContext } from 'vuex';
import RootState from '../state';
import { IRootState } from '../types';
import { GlobalMutationKeys } from '../mutations';

export default async function getCustomListHistory(
  { commit }: ActionContext<IRootState, IRootState>,
  listId: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    axios
      .get(`/api/list/${listId}/getAllTasks`)
      .then(async (tasks) => {
        await commit(GlobalMutationKeys.dashboardData, tasks.data);
        await commit(GlobalMutationKeys.setCustomListId, listId);
        return resolve();
      })
      .catch((err) => {
        return reject(err);
      });
  });
}
