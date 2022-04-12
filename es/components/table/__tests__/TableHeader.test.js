import React from 'react';
import TableHeader from '../TableHeader';
var TEST_CHILDREN = 'test';
describe('components/table/TableHeader', function () {
  var render = function render() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(TableHeader, props, TEST_CHILDREN));
  };

  test('should render default component', function () {
    var wrapper = render();
    var row = wrapper.children();
    expect(wrapper.is('thead')).toBe(true);
    expect(row.is('TableRow')).toBe(true);
    expect(row.contains(TEST_CHILDREN)).toBe(true);
  });
  test('should render the correct classes when className is specified', function () {
    var className = 'class';
    var wrapper = render({
      className: className
    });
    expect(wrapper.hasClass('table-header')).toBe(true);
    expect(wrapper.hasClass(className)).toBe(true);
  });
  test('should render the correct classes when rowClassName is specified', function () {
    var rowClassName = 'class';
    var wrapper = render({
      rowClassName: rowClassName
    });
    expect(wrapper.find('TableRow').prop('className')).toEqual(rowClassName);
  });
});