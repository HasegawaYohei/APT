import Vue from 'vue';
import './plugins/vuetify';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import router from './router';
import store from './store';
import ListPanel from './components/globals/ListPanel.vue';
import TestPanel2Column from './components/globals/TestPanel2Column.vue';
import TestPanel3Column from './components/globals/TestPanel3Column.vue';
import TestPanel4Column from './components/globals/TestPanel4Column.vue';

Vue.config.productionTip = false;

Vue.component('ListPanel', ListPanel);
Vue.component('TestPanel2Column', TestPanel2Column);
Vue.component('TestPanel3Column', TestPanel3Column);
Vue.component('TestPanel4Column', TestPanel4Column);

sync(store, router);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
