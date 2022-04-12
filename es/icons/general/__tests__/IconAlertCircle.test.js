import React from 'react';
import { shallow } from 'enzyme';
import IconAlertCircle from '../IconAlertCircle';
describe('icons/general/IconAlertCircle', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconAlertCircle, null));
    expect(wrapper.hasClass('icon-alert-circle')).toBe(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconAlertCircle, {
      color: color
    }));
    expect(wrapper.find('circle').at(0).prop('stroke')).toEqual(color);
    expect(wrapper.find('circle').at(1).prop('fill')).toEqual(color);
    expect(wrapper.find('rect').prop('fill')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconAlertCircle, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconAlertCircle, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});