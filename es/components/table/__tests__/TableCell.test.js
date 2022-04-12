import React from 'react';
import TableCell from '../TableCell';
var TEST_CHILDREN = 'test';
describe('components/table/TableCell', function () {
  var render = function render() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(TableCell, props, TEST_CHILDREN));
  };

  test('should render default component', function () {
    var wrapper = render();
    expect(wrapper.is('td')).toBe(true);
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
  test('should render custom attributes when specified', function () {
    var wrapper = render({
      'data-resin-feature': 'feature'
    });
    expect(wrapper.prop('data-resin-feature')).toEqual('feature');
  });
});