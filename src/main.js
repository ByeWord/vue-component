import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker';
import toast from './components/toast/toast-plugin.js';

Vue.config.productionTip = false;
Vue.use(toast)

new Vue({
  render: h => h(App),
}).$mount('#app');
