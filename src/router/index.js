import Vue from 'vue'
import Router from 'vue-router'
import KeywordSearch from '@/components/KeywordSearch'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'KeywordSearch',
      component: KeywordSearch
    },
  ]
})
