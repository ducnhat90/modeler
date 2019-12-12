import Vue from 'vue';
import i18next from 'i18next';
import VueI18Next from '@panter/vue-i18next';
import ModelerApp from './ModelerApp.vue';
import BootstrapVue from 'bootstrap-vue';
import './setup/initialLoad';
import translations from '@/setup/translations.json';
import * as VueDeepSet from 'vue-deepset';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@/assets/scss/index.scss';

import '@fortawesome/fontawesome-free/css/all.min.css';

Vue.use(BootstrapVue);

Vue.use(VueDeepSet);

Vue.config.productionTip = false;

Vue.use(VueI18Next);

i18next.init({
  lng: 'en',
  resources: { en: { translation: translations } },
});

const i18n = new VueI18Next(i18next);

new Vue({
  render: h => h(ModelerApp),
  i18n,
}).$mount('#modeler-app');
