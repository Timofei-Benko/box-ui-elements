import React from 'react';
import Table from '../Table';
var TEST_CHILDREN = 'test';
describe('components/table/Table', function () {
  var render = function render() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(Table, props, TEST_CHILDREN));
  };

  test('should render default component', function () {
    var wrapper = render();
    expect(wrapper.is('table')).toBe(true);
    expect(wrapper.contains(TEST_CHILDREN)).toBe(true);
  });
  test('should render the correct classes when className is specified', function () {
    var className = 'class';
    var wrapper = render({
      className: className
    });
    expect(wrapper.hasClass('table')).toBe(true);
    expect(wrapper.hasClass(className)).toBe(true);
  });
  test('should add the is-compact class when isCompact prop is true', function () {
    var wrapper = render({
      isCompact: true
    });
    expect(wrapper.hasClass('is-compact')).toBe(true);
  });
  test('should pass along other props when specified', function () {
    var wrapper = render({
      'data-resin-feature': 'test'
    });
    expect(wrapper.prop('data-resin-feature')).toEqual('test');
  });
});