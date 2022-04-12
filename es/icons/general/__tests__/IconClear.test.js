import React from 'react';
import { shallow } from 'enzyme';
import IconClear from '../IconClear';
describe('icons/general/IconClear', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconClear, null));
    expect(wrapper.hasClass('icon-clear')).toEqual(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconClear, {
      color: color
    }));
    expect(wrapper.find('g').at(1).prop('fill')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconClear, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconClear, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});