function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import ReadonlyDescription from '../ReadonlyDescription';
describe('features/item-details/ReadonlyDescription', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(ReadonlyDescription, _extends({
      value: "Hi\\ntesting this link https://box.com"
    }, props)));
  };

  test('should render default component', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
});