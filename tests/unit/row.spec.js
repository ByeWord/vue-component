import Row from '../../src/components/row';
import Col from '../../src/components/col';
import {expect} from 'chai';
import {shallowMount, mount} from '@vue/test-utils';


describe('row', () => {
  it('row exist', () => {
    expect(Row).to.exist;
  });
  it('col exist', function () {
    expect(Col).to.exist;
  });
  it('accept the gutter', function (done) {
    const rowWrapper = mount(Row, {
      propsData: {
        gutter: 20
      },
      slots: {
        'w-col': Col
      },
      attachToDocument: true
    });
    setTimeout(() => {
      console.log(rowWrapper.vm.$el);
      done();
    })

  });
});