import React from 'react';
import { shallow } from 'enzyme';
import IconThumbsUp from '../IconThumbsUp';
describe('icons/general/IconThumbsUp', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconThumbsUp, null));
    expect(wrapper.hasClass('icon-thumbs-up')).toEqual(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconThumbsUp, {
      color: color
    }));
    expect(wrapper.find('g').prop('fill')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 99;
    var height = 101;
    var wrapper = shallow(React.createElement(IconThumbsUp, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'boop';
    var wrapper = shallow(React.createElement(IconThumbsUp, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});