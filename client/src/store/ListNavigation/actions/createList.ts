import axios from '@/config/axios-config';
import { ActionContext } from 'vuex';
import ListNavigationState from '../ListNavigation.state';
import RootState from '@/store/state';
import { GlobalMutationKeys } from '../../mutations';

export default async function createList(
  { commit, state }: ActionContext<ListNavigationState, RootState>,
  name: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    axios
      .post('/api/list', { listName: name })
      .then(async (res: any) => {
        console.log(res, 'ce ce ');
        return resolve(res);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}
