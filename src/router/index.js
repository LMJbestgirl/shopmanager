import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login,
      name: 'Login'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
})
