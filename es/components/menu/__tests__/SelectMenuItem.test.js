import React from 'react';
import { shallow } from 'enzyme';
import SelectMenuItem from '../SelectMenuItem';
describe('components/menu/SelectMenuItem', function () {
  test('should render a MenuItem with correct props', function () {
    var wrapper = shallow(React.createElement(SelectMenuItem, {
      isSelected: true
    }, "Hello"));
    expect(wrapper.is('MenuItem')).toBe(true);
    expect(wrapper.prop('isSelectItem')).toBe(true);
    expect(wrapper.prop('isSelected')).toBe(true);
  });
});