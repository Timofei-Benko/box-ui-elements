import React from 'react';
import { shallow } from 'enzyme';
import IconCaretDown from '../IconCaretDown';
describe('icons/general/IconCaretDown', function () {
  test('should correctly render default caret down icon', function () {
    var wrapper = shallow(React.createElement(IconCaretDown, null));
    expect(wrapper.hasClass('icon-caret-down')).toBe(true);
  });
});