import React from 'react';
import TableRow from '../TableRow';
var TEST_CHILDREN = 'test';
describe('components/table/TableRow', function () {
  var render = function render() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(TableRow, props, TEST_CHILDREN));
  };

  test('should render default component', function () {
    var wrapper = render();
    expect(wrapper.is('tr')).toBe(true);
    expect(wrapper.contains(TEST_CHILDREN)).toBe(true);
  });
  test('should render the correct classes when className is specified', function () {
    var className = 'class';
    var wrapper = render({
      className: className
    });
    expect(wrapper.hasClass('table-row')).toBe(true);
    expect(wrapper.hasClass(className)).toBe(true);
  });
});