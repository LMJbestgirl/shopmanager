// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/base.css'
import moment from 'moment'
import Cusbread from './components/Cusbread.vue'
import axios from './http'
Vue.use(axios)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(router)

/* eslint-disable no-new */
Vue.filter('fmtDate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})
Vue.component(Cusbread.name, Cusbread)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
