import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Row from '../../src/components/row'

describe('test row', () => {
  it('存在.', () => {
    expect(Row).to.exist
  });
  it('接受gutter属性', function () {
    const row = shallowMount(Row, {
      propsData: { gutter:20 }
    });
    console.log(row.html());
  });
});
