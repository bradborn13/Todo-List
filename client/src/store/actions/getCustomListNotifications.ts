import axios from '@/config/axios-config';
import { ActionContext } from 'vuex';
import RootState from '../state';
import { GlobalMutationKeys } from '../mutations';
import { GlobalGetterKeys } from '../getters';

export default async function getCustomListNotifications(
  { commit, dispatch }: ActionContext<RootState, RootState>,
  listId: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    axios
      .get(`/api/list/${listId}/generalNotification`)
      .then(async (resp) => {
        commit(GlobalMutationKeys.setNotificationList, resp.data);
        return resolve();
      })
      .catch((err) => {
        return reject(err);
      });
  });
}
