function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { mount } from 'enzyme';
import MediaMenu from '../MediaMenu';
describe('components/Media/MediaMenu', function () {
  test('props are spread onto button', function () {
    var extraProps = {
      'aria-label': 'label for menu',
      'data-testid': 'a-menu',
      'resin-target': 'my-menu'
    };
    var className = 'foo';
    var wrapper = mount(React.createElement(MediaMenu, _extends({
      className: className
    }, extraProps), React.createElement("div", null, "foo")));
    expect(wrapper.find('PlainButton').props()).toEqual(expect.objectContaining(extraProps));
    expect(wrapper.find('PlainButton').prop('className')).toBe("bdl-Media-menu ".concat(className));
  });
});