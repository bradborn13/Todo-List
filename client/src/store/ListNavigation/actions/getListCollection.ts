import axios from '@/config/axios-config';
import { ActionContext } from 'vuex';
import ListNavigationState from '../ListNavigation.state';
import RootState from '@/store/state';
import { GlobalMutationKeys } from '../../mutations';
import { ListNavigationMutationKeys } from '../ListNavigation.mutations';

export default async function getListCollection(
  { commit }: ActionContext<ListNavigationState, RootState>,
  name: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    axios
      .get('/api/listCollection')
      .then(async (res: any) => {
        commit(ListNavigationMutationKeys.setListCollection, res.data);
        return resolve();
      })
      .catch((err) => {
        return reject(err);
      });
  });
}
