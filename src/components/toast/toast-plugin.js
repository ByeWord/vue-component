import Toast from './toast.vue';

export default function install(Vue) {
  Vue.prototype.$toast = function (message, cb) {
    const ToastConstructor = Vue.extend(Toast);
    const toast = new ToastConstructor({
      propsData: {
        message
      }
    });
    // console.log(toast.$el); undefined
    toast.$mount();
    console.log(toast.$el); // vm mounted后产生$el dom元素
    document.body.appendChild(toast.$el);
  };
}