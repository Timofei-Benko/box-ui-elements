import React from 'react';
import { shallow } from 'enzyme';
import IconHelp from '../IconHelp';
describe('icons/general/IconHelp', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconHelp, {
      className: "test-class"
    }));
    expect(wrapper.hasClass('icon-help')).toEqual(true);
    expect(wrapper.hasClass('test-class')).toEqual(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#123456';
    var wrapper = shallow(React.createElement(IconHelp, {
      color: color
    }));
    expect(wrapper.find('path').prop('fill')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconHelp, {
      width: width,
      height: height
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconHelp, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});