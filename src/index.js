import WButton from './components/button';
import WButtonGroup from './components/button-group';
import WCol from './components/col';
import WDatepicker from './components/datepicker';
import WIcon from './components/icon';
import WInput from './components/input';
import WPagination from './components/pagination';
import WRow from './components/row';
import WScrollView from './components/scroll-view';
import WToast from './components/toast';
import WDivider from './components/divider';
import WSliders from './components/slides';
import WSliderItem from './components/slide-item';
import WSticky from './components/sticky';

const components = [
  WButton, WButtonGroup, WCol, WDatepicker, WIcon, WInput, WPagination, WRow, WScrollView, WToast,
  WDivider, WSliders, WSliderItem, WSticky
];

const install = function (Vue) {
  components.forEach(component => {
    Vue.use(component);
  })
};

const WUI = {install, WButton, WButtonGroup, WCol, WDatepicker, WIcon, WInput, WPagination, WRow, WScrollView, WToast,WDivider,WSliders,WSliderItem,WSticky};

export default WUI;