import React from 'react';
import { shallow } from 'enzyme';
import IconClose from '../IconClose';
describe('icons/general/IconClose', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconClose, null));
    expect(wrapper.hasClass('icon-close')).toEqual(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconClose, {
      color: color
    }));
    expect(wrapper.find('path').at(0).prop('fill')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconClose, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconClose, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});