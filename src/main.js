import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './assets/css/initial.css'
import './assets/css/normalize.css'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
