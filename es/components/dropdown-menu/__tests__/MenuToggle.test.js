import React from 'react';
import MenuToggle from '../MenuToggle';
describe('components/dropdown-menu/MenuToggle', function () {
  test('should correctly render toggle', function () {
    var wrapper = shallow(React.createElement(MenuToggle, null, "hi"));
    expect(wrapper).toMatchSnapshot();
  });
});