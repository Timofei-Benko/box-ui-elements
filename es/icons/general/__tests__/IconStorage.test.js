import React from 'react';
import { shallow } from 'enzyme';
import IconStorage from '../IconStorage';
describe('icons/general/IconStorage', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconStorage, null));
    expect(wrapper.is('AccessibleSVG')).toBe(true);
    expect(wrapper.prop('height')).toEqual(12);
    expect(wrapper.prop('width')).toEqual(16);
    expect(wrapper.find('path').prop('fill')).toEqual('#26c281');
  });
  test('should correctly render icon with specified class', function () {
    var wrapper = shallow(React.createElement(IconStorage, {
      className: "test"
    }));
    expect(wrapper.hasClass('bdl-IconStorage')).toBe(true);
    expect(wrapper.hasClass('test')).toBe(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = 'green';
    var wrapper = shallow(React.createElement(IconStorage, {
      color: color
    }));
    expect(wrapper.find('path').prop('fill')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconStorage, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'hello';
    var wrapper = shallow(React.createElement(IconStorage, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});