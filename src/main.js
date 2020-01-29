import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './assets/icon/icons'
import './assets/css/index.scss'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
