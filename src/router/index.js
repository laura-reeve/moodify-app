import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import moodify from '@/components/moodify'
import authorize from '@/components/authorize'
import tracks from '@/components/tracks'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name:'login',
      component: login
    },
    {
      path: '/moodify',
      name: 'moodify',
      component: moodify
    },
    {
      path: '/authorize',
      name: 'authorize',
      component: authorize
    },
    {
      path: '/tracks/:URL/:openURL',
      name: 'tracks',
      component: tracks
    }
  ]
})
