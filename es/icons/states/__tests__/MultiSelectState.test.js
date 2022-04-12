import React from 'react';
import { shallow } from 'enzyme';
import MultiSelectState from '../MultiSelectState';
describe('icons/states/MultiSelectState', function () {
  test('should correctly render state svg with default state class', function () {
    var wrapper = shallow(React.createElement(MultiSelectState, null));
    expect(wrapper.hasClass('multi-select-state')).toBe(true);
  });
  test('should correctly render state svg with specified class', function () {
    var className = 'my-state';
    var wrapper = shallow(React.createElement(MultiSelectState, {
      className: className
    }));
    expect(wrapper.hasClass(className)).toBe(true);
  });
  test('should correctly render state svg with specified color', function () {
    var color = '#123456';
    var wrapper = shallow(React.createElement(MultiSelectState, {
      color: color
    })); // All 4 paths should be colorized

    expect(wrapper.find("path[fill=\"".concat(color, "\"]")).length).toEqual(4);
  });
  test('should correctly render state svg with specified width and height', function () {
    var width = 17;
    var height = 21;
    var wrapper = shallow(React.createElement(MultiSelectState, {
      height: height,
      width: width
    }));
    expect(wrapper.prop('width')).toEqual(width);
    expect(wrapper.prop('height')).toEqual(height);
  });
  test('should correctly render svg with specified title', function () {
    var title = 'oh hi there';
    var wrapper = shallow(React.createElement(MultiSelectState, {
      title: title
    }));
    expect(wrapper.prop('title')).toEqual(title);
  });
});