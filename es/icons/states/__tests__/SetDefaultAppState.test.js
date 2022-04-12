import React from 'react';
import { shallow } from 'enzyme';
import SetDefaultAppState from '../SetDefaultAppState';
describe('icons/states/SetDefaultAppState', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(SetDefaultAppState, props));
  };

  test('should correctly render default icon', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified class name', function () {
    var wrapper = getWrapper({
      className: 'test'
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified color', function () {
    var wrapper = getWrapper({
      color: '#333'
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified width and height', function () {
    var wrapper = getWrapper({
      width: 16,
      height: 17
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with title', function () {
    var wrapper = getWrapper({
      title: 'fool'
    });
    expect(wrapper).toMatchSnapshot();
  });
});