import React from 'react';
import TableHeaderCell from '../TableHeaderCell';
var TEST_CHILDREN = 'test';
describe('components/table/TableHeaderCell', function () {
  var render = function render() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(TableHeaderCell, props, TEST_CHILDREN));
  };

  test('should render default component', function () {
    var wrapper = render();
    expect(wrapper.is('th')).toBe(true);
    expect(wrapper.contains(TEST_CHILDREN)).toBe(true);
  });
  test('should render the correct classes when className is specified', function () {
    var className = 'class';
    var wrapper = render({
      className: className
    });
    expect(wrapper.hasClass('table-cell')).toBe(true);
    expect(wrapper.hasClass(className)).toBe(true);
  });
  test('should add the is-fixed-width class when isFixedWidth prop is true', function () {
    var wrapper = render({
      isFixedWidth: true
    });
    expect(wrapper.hasClass('is-fixed-width')).toBe(true);
  });
  test('should render additional attributes when specified', function () {
    var wrapper = render({
      colSpan: 2
    });
    expect(wrapper.prop('colSpan')).toEqual(2);
  });
});