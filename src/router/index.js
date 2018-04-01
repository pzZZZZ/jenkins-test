import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import demo from '@/components/demo'
const demo = resolve => require(['../components/demo.vue'], resolve)
const HelloWorld = resolve => require(['../components/HelloWorld.vue'], resolve)
const bridge = resolve => require(['../components/bridge.vue'], resolve)


Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/demo',
      name: 'demo',
      component: demo
    },
    {
      path: '/bridge',
      name: 'bridge',
      component: bridge
    },
    {
      path: '/',
      component: resolve => require(['../pages/index.vue'], resolve)
    }

  ]
})
