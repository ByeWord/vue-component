import Toast from './src/toast';

let currentToast = null;

export default function install(Vue) {
  Vue.prototype.$toast = function (propsData, onClose) {
    if (currentToast) {
      currentToast.close();
    }
    currentToast = createToast(propsData, Vue, onClose);
  };
}

function createToast(propsData, Vue, onClose) {
  const ToastConstructor = Vue.extend(Toast);
  const toast = new ToastConstructor({
    propsData
  });
  toast.$mount();
  // toast.$on('close', onClose);
  window.toastEl = toast.$el;
  document.body.appendChild(toast.$el);
  return toast;
}