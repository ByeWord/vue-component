import Toast from './toast.vue';

export default function install(Vue) {
  Vue.prototype.$toast = function (options, cb) {
    const ToastConstructor = Vue.extend(Toast);
    const toast = new ToastConstructor({
      propsData: {
        ...options
      }
    });
    // console.log(toast.$el); undefined
    toast.$mount();
    console.log(toast.$el); // vm mounted后产生$el dom元素
    window.toastEl = toast.$el;
    document.body.appendChild(toast.$el);
  };
}