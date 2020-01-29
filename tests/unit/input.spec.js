import {shallowMount} from '@vue/test-utils';
import WInput from '../../src/components/input/src/input';
import chai,{expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai)


describe('Input Component', () => {
  it('should exits', function () {
    expect(WInput).to.exist;
  });
  describe('props', () => {
    it('should accept value', function () {
      const wrapper = shallowMount(WInput,
        {
          propsData: {
            value: 'Hello World'
          }
        });
      const inputElement = wrapper.vm.$el.querySelector('input');
      expect(inputElement.value).to.equals('Hello World');
    });
    it('should accept disabled', function () {
      const wrapper = shallowMount(WInput,
        {
          propsData: {
            disabled: true
          }
        });
      const inputElement = wrapper.vm.$el.querySelector('input');
      expect(inputElement.disabled).to.equals(true);
    });
    it('should accept readOnly', function () {
      const wrapper = shallowMount(WInput,
        {
          propsData: {
            readonly: true
          }
        });
      const inputElement = wrapper.vm.$el.querySelector('input');
      expect(inputElement.readOnly).to.equals(true);
    });
    it('should accept error', function () {
      const wrapper = shallowMount(WInput,
        {
          propsData: {
            error: 'error msg'
          }
        });
      const errorEle = wrapper.vm.$el.querySelector('.error-info');
      expect(errorEle.textContent).to.equals('error msg');
    });
  });
  describe('事件', () => {
    it('should support input event', function () {
      const wrapper = shallowMount(WInput);
      let callback = sinon.fake();
      wrapper.vm.$on('input',callback);
      let event = new Event('input');
      Object.defineProperty(event,'target',{
        value:{value:'hi'},
        enumerable:true
      });
      const inputElement = wrapper.vm.$el.querySelector('input');
      inputElement.dispatchEvent(event);
      expect(callback.called).to.equals(true);
      expect(callback).to.have.been.calledWith('hi');
    });
    it('should support focus event', function () {
      const wrapper = shallowMount(WInput);
      let callback = sinon.fake();
      wrapper.vm.$on('focus',callback);
      let event = new Event('focus');
      const inputElement = wrapper.vm.$el.querySelector('input');
      inputElement.dispatchEvent(event);
      expect(callback.called).to.equals(true);
    });
    it('should support blur event', function () {
      const wrapper = shallowMount(WInput);
      let callback = sinon.fake();
      wrapper.vm.$on('blur',callback);
      let event = new Event('blur');
      const inputElement = wrapper.vm.$el.querySelector('input');
      inputElement.dispatchEvent(event);
      expect(callback).to.have.been.calledWith(event);
    });
  })
});