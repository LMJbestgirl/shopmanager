import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Users from '../components/users.vue'
import Rights from '../components/rights.vue'
import Roles from '../components/roles.vue'
import Goodlist from '../components/goodslist.vue'
import GoodsAdd from '../components/goodsadd.vue'
import Cateparams from '../components/cateparams.vue'
import Goodscate from '../components/goodscate.vue'
import Orders from '../components/order.vue'
import Reports from '../components/reports.vue'
import { Message } from 'element-ui';

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/login',
      component: Login,
      name: 'login'
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [{
        path: '/users',
        name: 'name',
        component: Users
      },
      {
        path: '/rights',
        name: 'rights',
        component: Rights
      },
      {
        path: '/roles',
        name: 'roles',
        component: Roles
      },
      {
        path: '/goods',
        name: 'goodlist',
        component: Goodlist
      },
      {
        path: '/goodsadd',
        name: 'goodsadd',
        component: GoodsAdd
      },
      {
        path: '/params',
        name: 'cateparams',
        component: Cateparams
      },
      {
        path: '/categories',
        name: 'goodscate',
        component: Goodscate
      },
      {
        path: '/orders',
        name: 'orders',
        component: Orders
      },
      {
        path: '/reports',
        name: 'reports',
        component: Reports
      }
      ]
    }
  ]
})





router.beforeEach((to, from, next) => {

  if (to.name === 'login') {
    next()
  } else {
    const token = localStorage.getItem("token")
    if (!token) {
      Message.warning('请先登录')
      router.push({
        name: 'login'
      })
      return
    }
    next()
  }
})



export default router;