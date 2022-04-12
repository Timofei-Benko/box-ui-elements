import React from 'react';
import { shallow } from 'enzyme';
import IconAlignLeft from '../IconAlignLeft';
describe('icons/general/IconAlignLeft', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconAlignLeft, null));
    expect(wrapper.is('AccessibleSVG')).toBe(true);
    expect(wrapper.prop('height')).toEqual(10);
    expect(wrapper.prop('width')).toEqual(13);
    expect(wrapper.find('.stroke-color').prop('stroke')).toEqual('#444');
  });
  test('should correctly render icon with specified class', function () {
    var wrapper = shallow(React.createElement(IconAlignLeft, {
      className: "test"
    }));
    expect(wrapper.hasClass('icon-align-left')).toBe(true);
    expect(wrapper.hasClass('test')).toBe(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconAlignLeft, {
      color: color
    }));
    expect(wrapper.find('.stroke-color').prop('stroke')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconAlignLeft, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconAlignLeft, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});