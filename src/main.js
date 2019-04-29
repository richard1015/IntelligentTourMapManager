// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
import api from './service/api.js'
Vue.use(api)
import ws from './service/web.socket.js'
Vue.use(ws)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
