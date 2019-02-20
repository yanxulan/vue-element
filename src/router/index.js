import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login';
import Index from '@/components/Index';
import ErrorApp from '@/components/common/error';  // 错误页面

/** 业务代码 */
import OneApp from '@/components/project/demo/one/one.vue';
import TwoApp from '@/components/project/demo/two/two.vue';


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },{
      path: '/index',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/one',
          name: 'one',
          component: OneApp,
        },
        {
          path: '/two',
          name: 'two',
          component: TwoApp,
        },
        {
          path: '/error',
          name: 'error',
          component: ErrorApp,
        }
      ]
    },{ // 错误页面
      path: "*",
      redirect: "/error"
    }
  ]
})
