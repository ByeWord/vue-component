import SlideItem from './src/slide-item';

SlideItem.install = function (Vue) {
  Vue.component(SlideItem.name, SlideItem);
};

export default SlideItem;