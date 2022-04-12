import React from 'react';
import { shallow } from 'enzyme';
import IconFeed from '../IconFeed';
describe('icons/general/IconFeed', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconFeed, null));
    expect(wrapper.hasClass('icon-feed')).toEqual(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconFeed, {
      color: color
    }));
    expect(wrapper.find('path').prop('stroke')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconFeed, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'hungry';
    var wrapper = shallow(React.createElement(IconFeed, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});