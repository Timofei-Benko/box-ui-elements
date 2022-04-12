import React from 'react';
import SecurityBadge from '../SecurityBadge';
describe('features/security/SecurityBadge', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(SecurityBadge, props));
  };

  test('should render a classified badge with default icon (IconAlertDefault)', function () {
    var wrapper = getWrapper({
      message: 'Suspicious'
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render a classified badge with a custom icon', function () {
    var wrapper = getWrapper({
      icon: React.createElement("span", null, "Custom Icon"),
      message: 'Suspicious'
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render custom class when provided', function () {
    var wrapper = getWrapper({
      className: 'custom',
      message: 'Suspicious'
    });
    expect(wrapper.props().className).toBe('bdl-SecurityBadge custom');
  });
});