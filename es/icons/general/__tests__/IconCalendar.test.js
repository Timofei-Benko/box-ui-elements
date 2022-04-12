import React from 'react';
import { shallow } from 'enzyme';
import IconCalendar from '../IconCalendar';
describe('icons/general/IconCalendar', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconCalendar, null));
    expect(wrapper.hasClass('icon-calendar')).toEqual(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconCalendar, {
      color: color
    }));
    expect(wrapper.find('path').at(0).prop('fill')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 32;
    var height = 34;
    var wrapper = shallow(React.createElement(IconCalendar, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconCalendar, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});