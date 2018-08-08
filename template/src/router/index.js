import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'
import Home from '@/views/home/index'


Vue.use(Router)
export const constantRouterMap = [
  { path: '/login', name: 'login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/forget', name: 'forget', component: () => import('@/views/forget/index'), hidden: true },
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: 'home',
    meta: {
      title: '控制台',
      icon: 'icon-kongzhitai'
    },
    children: [
      { path: '/home', component: Home, name: 'home', meta: { title: '控制台', noCache: true } }
    ]
  }

]
