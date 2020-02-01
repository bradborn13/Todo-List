import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import { store } from './store';
// const VueSwal = require('vue-swal');
import '@/config/vue-swal-config';
import '@/config/vue-vCalendar-config';
import '@/config/vue-loading-config';
import '@/config/vue-notification-config';
import '@/config/axios-config';
require('../node_modules/bootstrap/dist/css/bootstrap.css');
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
