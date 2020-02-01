import {shallowMount} from '@vue/test-utils';
import Toast from '../../src/components/toast/src/toast';

import chai,{expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);


describe('Toast Component', () => {
  it('should exits', function () {
    expect(Toast).to.exist;
  });
  describe('props',()=>{
    const wrapper = shallowMount(Toast,{
      propsData:{
        message:'hello'
      }
    });
    let contentEle = wrapper.vm.$el.querySelector('.w-toast-content');
    expect(contentEle.textContent).to.equals('hello')
  });
  describe('events',()=>{
    
  });
});