import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Main from '@/components/Main'
import User from '@/components/User'
import School from '@/components/School'
import Spot from '@/components/Spot'
import Logs from '@/components/Logs'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/Main',
      name: 'Main',
      component: Main,
      children: [{
        path: 'User',
        name: 'User',
        component: User,
        meta: { title: '用户管理' }
      },
      {
        path: 'School',
        name: 'School',
        component: School,
        meta: { title: '学校管理' },
      },
      {
        path: 'Spot',
        name: 'Spot',
        component: Spot,
        meta: { title: '内容管理' }
      },
      {
        path: 'Logs',
        name: 'Logs',
        component: Logs,
        meta: { title: '实时日志' }
      }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
