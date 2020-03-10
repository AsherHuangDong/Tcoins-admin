import Vue from 'vue'
import Router from 'vue-router'
import { otcs } from './otcs'

import { Message } from "iview";

import Login from '@/components/page/Login'
import index from '@/components/page/index'
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/index',
      name: 'index',
      component: () => import("../components/page/index"),
      children: [
        otcs
      ]
    },
  ]
});
router.beforeEach((to, from, next) => {
  // console.log(to.path)
  // const permPathArr = JSON.parse(localStorage.getItem('permPath'))
  // const noPerm = ['/', '/index']
  // console.log(permPathArr);
  //console.log(permPathArr.indexOf(to.path))
  //if (permPathArr) {
  //   if (permPathArr.indexOf(to.path) !== -1 || noPerm.indexOf(to.path) !== -1) {
  //     sessionStorage.setItem('currentRoute', to.path)
  //     next()
  //     return null
  //   }
  //   Message.error('无权限操作');
  //   return null
  // }else{
  //   next();
  //   return null;
  // }
  next();
})



export default router
