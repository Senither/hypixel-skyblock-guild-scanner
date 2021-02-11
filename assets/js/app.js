import Vue from 'vue'
import Axios from 'axios'

window.axios = Axios.create({
  baseURL: 'https://hypixel-api.senither.com/',
  timeout: 10000
})

import store from './store'
import router from './router'
import App from './views/App'

new Vue({
  el: '#app',
  components: {
    App
  },
  router,
  store
})
