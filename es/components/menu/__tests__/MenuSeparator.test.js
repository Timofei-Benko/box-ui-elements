import React from 'react';
import { shallow } from 'enzyme';
import MenuSeparator from '../MenuSeparator';
describe('components/menu/MenuSeparator', function () {
  test('should correctly render a separator list element', function () {
    var wrapper = shallow(React.createElement(MenuSeparator, null));
    expect(wrapper.is('li')).toBe(true);
    expect(wrapper.prop('role')).toEqual('separator');
  });
});