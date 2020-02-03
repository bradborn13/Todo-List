import { Module } from 'vuex';

import ListNavigationState from './ListNavigation.state';
import actions from './ListNavigation.actions';
import getters from './ListNavigation.getters';
import mutations from './ListNavigation.mutations';

const listNavigationModule: Module<ListNavigationState, any> = {
  state: new ListNavigationState(),
  getters,
  mutations,
  actions,
  namespaced: true
};

export default listNavigationModule;
