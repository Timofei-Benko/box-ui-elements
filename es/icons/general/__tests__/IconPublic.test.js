import React from 'react';
import { shallow } from 'enzyme';
import IconPublic from '../IconPublic';
describe('icons/general/IconPublic', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconPublic, null));
    expect(wrapper.hasClass('bdl-IconPublic')).toEqual(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconPublic, {
      color: color
    }));
    expect(wrapper.find('path').prop('stroke')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconPublic, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconPublic, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});