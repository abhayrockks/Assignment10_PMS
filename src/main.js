import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import router from './router'
import 'buefy/dist/buefy.css'

import store from "./store"

Vue.use(Buefy)

Vue.config.productionTip = false


new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#app')