import React from 'react';
import { shallow } from 'enzyme';
import IconHamburger from '../IconHamburger';
describe('icons/general/IconHamburger', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconHamburger, {
      className: "test-class"
    }));
    expect(wrapper.hasClass('icon-hamburger')).toEqual(true);
    expect(wrapper.hasClass('test-class')).toEqual(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconHamburger, {
      color: color
    }));
    expect(wrapper.find('path').at(0).prop('fill')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconHamburger, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconHamburger, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});