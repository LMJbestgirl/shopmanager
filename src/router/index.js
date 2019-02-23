import Vue from 'vue'
import VueRouter from 'vue-router'




// const Foo = () => Promise.resolve({ /* component definition */ })
const Login = () => import('../components/login.vue')
const Home = () => import('../components/home.vue')
const Users = () => import('../components/users.vue')
const Rights = () => import('../components/rights.vue')
const Roles = () => import('../components/roles.vue')
const Goodlist = () => import('../components/goodslist.vue')
const GoodsAdd = () => import('../components/goodsadd.vue')
const Cateparams = () => import('../components/cateparams.vue')
const Goodscate = () => import('../components/goodscate.vue')
const Orders = () => import('../components/order.vue')
const Reports = () => import('../components/reports.vue')
import { Message } from 'element-ui'

Vue.use(VueRouter)
const router = new VueRouter({
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