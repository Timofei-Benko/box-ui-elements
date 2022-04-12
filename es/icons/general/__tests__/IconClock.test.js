import React from 'react';
import { shallow } from 'enzyme';
import IconClock from '../IconClock';
describe('icons/general/IconClock', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconClock, null));
    expect(wrapper.hasClass('bdl-IconClock')).toEqual(true);
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconClock, {
      color: color
    }));
    expect(wrapper.find('path').at(0).prop('fill')).toEqual(color);
    expect(wrapper.find('path').at(1).prop('fill')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconClock, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconClock, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});