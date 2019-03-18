import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import User from '@/components/User'
import School from '@/components/School'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: 'User',
          name: 'User',
          component: User,
          meta: { title: '用户管理' }
        },
        {
          path: 'School',
          name: 'School',
          component: School,
          meta: { title: '内容管理' }
        }
      ]
    }
  ]
})
