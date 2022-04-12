import React from 'react';
import { shallow } from 'enzyme';
import IconVerified from '../IconVerified';
describe('icons/general/IconVerified', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconVerified, null));
    expect(wrapper.hasClass('icon-verified')).toBe(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconVerified, {
      color: color
    }));
    expect(wrapper.find('path').prop('fill')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconVerified, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with specified opacity', function () {
    var opacity = 0.5;
    var wrapper = shallow(React.createElement(IconVerified, {
      opacity: opacity
    }));
    expect(wrapper.find('AccessibleSVG').prop('opacity')).toEqual(opacity);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconVerified, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});