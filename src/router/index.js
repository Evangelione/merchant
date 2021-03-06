import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'
import Home from '@/views/home'
import Order from './order'
import Wallet from './wallet'
import Management from './management'
import Popularze from './popularize'
import Setting from './setting'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index,
    children: [
      {
        path: '',
        component: Home,
      },
      Order,
      {
        path: 'marketing',
        component: () => import('@/views/market'),
        children: [
          {
            path: '',
            component: () => import('@/views/market/MarketTypeCell'),
          },
        ],
      },
      {
        path: 'mine',
        component: () => import('@/views/Mine'),
      },
    ],
  },
  Wallet,
  ...Management,
  ...Popularze,
  ...Setting,
  {
    path: '/login',
    name: 'login',

    component: () => import(/* webpackChunkName: "login" */ '@/views/Login'),
  },
  {
    path: '/joinThePlatform',
    name: 'joinThePlatform',
    component: () => import(/* webpackChunkName: "login" */ '@/views/JoinThePlatform'),
  },
  {
    path: '*',
    name: '404',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "404" */ '@/views/404'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
