import React from 'react';
import { shallow } from 'enzyme';
import IconClockPast from '../IconClockPast';
describe('icons/general/IconClockPast', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconClockPast, null));
    expect(wrapper.hasClass('icon-clock-past')).toEqual(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconClockPast, {
      color: color
    }));
    var rectWrapper = wrapper.find('rect');
    var pathWrapper = wrapper.find('path');
    expect(rectWrapper.at(0).prop('fill')).toEqual(color);
    expect(rectWrapper.at(1).prop('fill')).toEqual(color);
    expect(pathWrapper.at(0).prop('stroke')).toEqual(color);
    expect(pathWrapper.at(1).prop('fill')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 13;
    var height = 17;
    var wrapper = shallow(React.createElement(IconClockPast, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconClockPast, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});