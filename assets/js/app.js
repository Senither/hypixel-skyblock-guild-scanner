import Vue from 'vue'
import Axios from 'axios'

window.axios = Axios.create({
  baseURL: 'https://api.hypixel.net/',
  timeout: 10000,
})

import store from './store'
import router from './router'
import App from './views/App'

const app = new Vue({
  el: '#app',
  components: {
    App,
  },
  router,
  store,
})
