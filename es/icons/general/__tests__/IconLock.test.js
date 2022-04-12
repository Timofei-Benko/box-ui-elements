import React from 'react';
import { shallow } from 'enzyme';
import IconLock from '../IconLock';
describe('icons/general/IconLock', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconLock, null));
    expect(wrapper.is('AccessibleSVG')).toBe(true);
    expect(wrapper.prop('height')).toEqual(14);
    expect(wrapper.prop('width')).toEqual(13);
    var fillColors = wrapper.find('.fill-color');

    for (var i = 0; i < fillColors.length; i += 1) {
      expect(fillColors.at(i).prop('fill')).toEqual('#444');
    }
  });
  test('should correctly render icon with specified class', function () {
    var wrapper = shallow(React.createElement(IconLock, {
      className: "test"
    }));
    expect(wrapper.hasClass('icon-lock')).toBe(true);
    expect(wrapper.hasClass('test')).toBe(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconLock, {
      color: color
    }));
    var fillColors = wrapper.find('.fill-color');

    for (var i = 0; i < fillColors.length; i += 1) {
      expect(fillColors.at(i).prop('fill')).toEqual(color);
    }
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconLock, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with specified opacity', function () {
    var opacity = 0.5;
    var wrapper = shallow(React.createElement(IconLock, {
      opacity: opacity
    }));
    expect(wrapper.find('AccessibleSVG').prop('opacity')).toEqual(opacity);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconLock, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});