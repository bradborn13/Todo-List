import axios from '@/config/axios-config';
import { ActionContext } from 'vuex';
import RootState from '../state';
import { GlobalMutationKeys } from '../mutations';
import { GlobalGetterKeys } from '../getters';

export default async function getGeneralListNotifications({
  commit
}: ActionContext<RootState, RootState>): Promise<any> {
  return new Promise(async (resolve, reject) => {
    axios
      .get(`/api/general/notification`)
      .then(async (resp) => {
        commit(GlobalMutationKeys.setNotificationList, resp.data);
        return resolve();
      })
      .catch((err) => {
        return reject(err);
      });
  });
}
