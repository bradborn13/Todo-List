import axios from '@/config/axios-config';
import { ActionContext } from 'vuex';
import RootState from '../state';
import { IUpdateTask } from '../types';

export default async function updateTask(
  { commit, state, dispatch }: ActionContext<RootState, RootState>,
  newTask: IUpdateTask
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    // axios.put(`/api/task/${this.taskId}`, { task_name: this.taskName });
    axios
      .put(`/api/task/update/${newTask.taskId}`, { ...newTask.task })
      .then(async () => {
        return resolve();
      })
      .catch((err) => {
        return reject(err);
      });
  });
}
