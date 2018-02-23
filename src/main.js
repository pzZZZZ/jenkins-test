// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/reset.css'
import jsbridge from './tools/Bridge.js'//接入jsbridge全局使用
import FastClick from 'fastclick'
import store from './store/index.js'
Vue.prototype.$bridge = jsbridge

FastClick.attach(document.body)
Vue.config.productionTip = false
document.documentElement.style.fontSize = window.innerWidth / 7.5 + 'px'; //750设计稿

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
