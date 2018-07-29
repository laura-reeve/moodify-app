import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Moodify from '@/components/Moodify'
import Authorize from '@/components/Authorize'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name:'Login',
      component: Login
    },
    {
      path: '/moodify',
      name: 'Moodify',
      component: Moodify
    },
    {
      path: '/authorize',
      name: 'Authorize',
      component: Authorize
    }
  ]
})
