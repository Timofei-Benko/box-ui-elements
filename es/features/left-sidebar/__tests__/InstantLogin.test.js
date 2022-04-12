function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import InstantLogin from '../InstantLogin';
describe('feature/left-sidebar/InstantLogin', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(InstantLogin, _extends({
      message: "message"
    }, props)));
  };

  test('should render', function () {
    var htmlAttributes = {
      href: '/master'
    };

    var icon = function icon() {
      return React.createElement("div", null);
    };

    var wrapper = getWrapper({
      icon: icon,
      htmlAttributes: htmlAttributes
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render without icon', function () {
    var htmlAttributes = {
      href: '/master'
    };
    var wrapper = getWrapper({
      htmlAttributes: htmlAttributes
    });
    expect(wrapper).toMatchSnapshot();
  });
});