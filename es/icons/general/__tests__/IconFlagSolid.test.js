import React from 'react';
import { shallow } from 'enzyme';
import IconFlagSolid from '../IconFlagSolid';
describe('icons/general/IconFlagSolid', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconFlagSolid, null));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconFlagSolid, {
      color: color
    }));
    expect(wrapper.find('path').prop('fill')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 18;
    var height = 18;
    var wrapper = shallow(React.createElement(IconFlagSolid, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconFlagSolid, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});