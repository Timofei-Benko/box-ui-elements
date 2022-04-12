import React from 'react';
import { shallow } from 'enzyme';
import IconInfoThin from '../IconInfoThin';
describe('icons/general/IconInfoThin', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconInfoThin, null));
    expect(wrapper.hasClass('icon-info-thin')).toBe(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconInfoThin, {
      color: color
    }));
    expect(wrapper.find('circle').at(0).prop('stroke')).toEqual(color);
    expect(wrapper.find('circle').at(1).prop('fill')).toEqual(color);
    expect(wrapper.find('rect').prop('fill')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconInfoThin, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconInfoThin, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});