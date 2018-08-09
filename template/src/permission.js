import router from './router'
import {  constantRouterMap } from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = []// no redirect whitelist
constantRouterMap.forEach(item => {
  whiteList.push(item.path);
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : '西瓜信用';
  NProgress.start() // start progress bar
  if (!store.getters.token&&getToken()) {
    store.commit('SET_TOKEN', getToken());
  }
  if (store.getters.token) { // determine if there has token

    if (store.getters.addRouters.length === 0) {
        store.dispatch('GenerateRoutes').then(() => { // 根据roles权限生成可访问的路由表
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        })
        NProgress.done()
    } else {
      next()
      NProgress.done()
    }
    // }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
      NProgress.done()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  // NProgress.done() // finish progress bar
})
