/*eslint spaced-comment:0*/
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'

import App from './App.vue'
import router from './router'
import store from './store'
import ArgonDashboard from './plugins/argon-dashboard'

Vue.use(ArgonDashboard)
/*eslint import/first:0*/
// import './assets/scss/index.scss'

// Vue.use(BootstrapVue)
// Vue.use(IconsPlugin)
Vue.config.productionTip = false

// vuelidate
Vue.use(Vuelidate)

// axios
Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
