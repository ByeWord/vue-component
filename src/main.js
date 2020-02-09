import Vue from 'vue'
import App from './App.vue'
import WToast from './components/toast/index';
import './registerServiceWorker'
import './assets/icon/icons'
import './assets/css/index.scss'
import WUI from './index';

Vue.config.productionTip = false;
Vue.use(WToast);
Vue.use(WUI);

new Vue({
  render: h => h(App),
}).$mount('#app');
