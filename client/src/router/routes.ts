import Home from '../components/Home.vue';
import History from '../components/History.vue';
export const routeHome = {
  path: '/',
  name: 'List',
  component: Home
};
export const routeHistory = {
  path: '/history',
  name: 'History',
  component: History
};
export const routes = [routeHome, routeHistory];
