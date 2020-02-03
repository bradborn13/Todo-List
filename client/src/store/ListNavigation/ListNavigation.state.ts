import { IListNavigationState, IList } from './ListNavigation.types';

export default class ListNavigationState implements IListNavigationState {
  listCollection: IList[];
  constructor() {
    this.listCollection = [];
  }
}
