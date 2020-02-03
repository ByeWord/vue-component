import Slides from './src/slides';

Slides.install = function (Vue) {
  Vue.component(Slides.name,Slides);
};

export default Slides;