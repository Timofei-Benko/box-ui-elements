import React from 'react';
import LeftSidebarIconWrapper from '../LeftSidebarIconWrapper';
describe('feature/left-sidebar/LeftSidebarIconWrapper', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(LeftSidebarIconWrapper, props, React.createElement("div", null)));
  };

  test('should render a LeftSidebarIconWrapper component', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should use passed in className value', function () {
    var wrapper = getWrapper({
      className: 'custom-class'
    });
    expect(wrapper).toMatchSnapshot();
  });
});