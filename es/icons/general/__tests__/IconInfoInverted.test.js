import React from 'react';
import { shallow } from 'enzyme';
import IconInfoInverted from '../IconInfoInverted';
describe('icons/general/IconInfoInverted', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconInfoInverted, null));
    expect(wrapper.hasClass('icon-info-inverted')).toEqual(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconInfoInverted, {
      color: color
    }));
    expect(wrapper.find('path').prop('fill')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconInfoInverted, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconInfoInverted, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});