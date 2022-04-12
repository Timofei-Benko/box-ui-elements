import React from 'react';
import { shallow } from 'enzyme';
import UsersEmptyState from '../UsersEmptyState';
describe('icons/states/UsersEmptyState', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(UsersEmptyState, props));
  };

  test('should correctly render default icon', function () {
    var wrapper = getWrapper();
    expect(wrapper.hasClass('users-empty-state')).toBeTruthy();
  });
  test('should correctly render the icon with specified class', function () {
    var className = 'test-class';
    var wrapper = getWrapper({
      className: className
    });
    expect(wrapper.hasClass(className)).toBeTruthy();
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 20;
    var height = 15;
    var wrapper = getWrapper({
      height: height,
      width: width
    });
    expect(wrapper.prop('width')).toEqual(width);
    expect(wrapper.prop('height')).toEqual(height);
  });
  test('should correctly render svg with specified title', function () {
    var title = 'I am the title';
    var wrapper = getWrapper({
      title: title
    });
    expect(wrapper.prop('title')).toEqual(title);
  });
  test('should override color in svg when specified', function () {
    var color = '#abc';
    var wrapper = getWrapper({
      color: color
    });
    expect(wrapper).toMatchSnapshot();
  });
});