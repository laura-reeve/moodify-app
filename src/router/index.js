import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import KeywordSearch from '@/components/KeywordSearch'
import Authorize from '@/components/Authorize'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name:'Login',
      component: Login
    }
    {
      path: '/keyword-search',
      name: 'KeywordSearch',
      component: KeywordSearch
    },
    {
      path: '/authorize',
      name: 'Authorize',
      component: Authorize
    }
  ]
})
