import { expect } from 'chai';
import sinon from 'sinon';
import {shallowMount} from '@vue/test-utils'
import Taost from '../../src/components/toast/toast';

describe('Toast', () => {
  it('should exist', function () {
    expect(Taost).to.exist;
  });
  it('should auto close', function (done) {
    let wrapper = shallowMount(Taost, {
      propsData: {
        autoClose: true,
        autoCloseDelay: 1
      }
    });
    let target = document.createElement('div');
    wrapper.vm.$mount(target);
    document.body.appendChild(wrapper.vm.$el);
    wrapper.vm.$on('close', () => {
      console.log('close callback in the test unit.')
    });
    setTimeout(() => {
      expect(document.body.contains(wrapper.vm.$el)).to.equal(false);
      done();
    }, 1500);
  });
  it('should accept the closeButton', function () {
    let callback = sinon.fake();

    let wrapper = shallowMount(Taost, {
      propsData: {
        closeButton: {
          text: 'test',
          callback
        },
        autoClose: false
      }
    });
    wrapper.vm.$mount();
    wrapper.vm.$on('close', () => {
      console.log('close callback in the test unit.')
    });
    let actionEl = wrapper.vm.$el.querySelector('.w-toast-action');
    expect(actionEl.textContent.trim()).to.equal('test');
    actionEl.click();
    expect(callback.called).to.equal(true);
  });
  it('should accept enableHTML', function () {
    let wrapper = shallowMount(Taost, {
      propsData: {
        autoClose: false,
        dangerouslyUseHTMLString:true,
        message:'<h1 id="test">Test Html</h1>'
      }
    });
    wrapper.vm.$mount();
    let h1 = wrapper.vm.$el.querySelector('#test');
    expect(h1).to.exist;
  });
  it('should accept position', function () {
    let wrapper = shallowMount(Taost, {
      propsData: {
        autoClose: false,
        dangerouslyUseHTMLString:true,
        message:'<h1 id="test">Test Html</h1>',
        position:'top'
      }
    });
    wrapper.vm.$mount();
    expect(wrapper.vm.$el.classList.contains('wrapper-top')).to.equal(true);
  });
});