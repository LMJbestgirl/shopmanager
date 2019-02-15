// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/base.css'
import moment from 'moment'
import axios from 'axios'
Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(router)
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
/* eslint-disable no-new */
Vue.filter('fmtDate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
