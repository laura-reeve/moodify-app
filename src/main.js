// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Storage from 'vue-ls';
import VueAnalytics from 'vue-analytics'

let options = {
  namespace: 'auth___',
  name: 'ls',
  storage: 'local',
};

Vue.use(Storage, options);

Vue.use(VueAnalytics, {
  id: 'UA-124672993-1',
  autotracking: {
    exception: true
  },
  router,
  debug: {
    enabled: true
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
