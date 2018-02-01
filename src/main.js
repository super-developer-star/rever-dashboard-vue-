import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './routes'
import AsyncComputed from 'vue-async-computed'

Vue.use(VueRouter)
Vue.use(AsyncComputed, {
  errorHandler (msg) {
    console.log('Hey, an error!')
    console.log('---')
    console.log(msg)
  }
})

const router = new VueRouter({
  base: '/',
  mode: 'history',
  routes: routes
})

/* eslint-disable no-new */
new Vue({
  router: router,
  // store: store,
  el: '#app',
  template: '<App/>',
  components: { App }
})
