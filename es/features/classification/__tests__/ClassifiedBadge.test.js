import React from 'react';
import ClassifiedBadge from '../ClassifiedBadge';
describe('features/classification/ClassifiedBadge', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(ClassifiedBadge, props));
  };

  test('should render a classified badge with tooltip disabled', function () {
    var wrapper = getWrapper({
      name: 'Confidential'
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render a classified badge with a tooltip', function () {
    var wrapper = getWrapper({
      name: 'Confidential',
      tooltipText: 'fubar'
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render a classified badge within a button when onClick is provided', function () {
    var wrapper = getWrapper({
      name: 'Confidential',
      tooltipText: 'fubar',
      onClick: function onClick() {}
    });
    expect(wrapper).toMatchSnapshot();
  });
});