import Vue from 'vue';
import './plugins/vuetify';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import router from './router';
import store from './store';
import ListPanel from './components/globals/ListPanel.vue';
import InspectionPanel2Column from './components/globals/InspectionPanel2Column.vue';
import InspectionPanel3Column from './components/globals/InspectionPanel3Column.vue';
import InspectionPanel4Column from './components/globals/InspectionPanel4Column.vue';

Vue.config.productionTip = false;

Vue.component('ListPanel', ListPanel);
Vue.component('InspectionPanel2Column', InspectionPanel2Column);
Vue.component('InspectionPanel3Column', InspectionPanel3Column);
Vue.component('InspectionPanel4Column', InspectionPanel4Column);

sync(store, router);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
