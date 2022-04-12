import React from 'react';
import TableBody from '../TableBody';
var TEST_CHILDREN = 'test';
describe('components/table/TableBody', function () {
  var render = function render() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(TableBody, props, TEST_CHILDREN));
  };

  test('should render default component', function () {
    var wrapper = render();
    expect(wrapper.is('tbody')).toBe(true);
    expect(wrapper.contains(TEST_CHILDREN)).toBe(true);
  });
  test('should render the correct classes when className is specified', function () {
    var className = 'class';
    var wrapper = render({
      className: className
    });
    expect(wrapper.hasClass('table-body')).toBe(true);
    expect(wrapper.hasClass(className)).toBe(true);
  });
});