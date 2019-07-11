import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from './router/Router.js'
import App from './App'

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
    el: '#app',
    router: Router,
    render: h => h(App)
})
