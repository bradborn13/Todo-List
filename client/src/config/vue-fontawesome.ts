import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faAcquisitionsIncorporated } from '@fortawesome/free-brands-svg-icons';

library.add(faPlus, faPlusCircle);
library.add(faAcquisitionsIncorporated);
Vue.component('font-awesome-icon', FontAwesomeIcon);
