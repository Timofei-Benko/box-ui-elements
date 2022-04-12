import React from 'react';
import { shallow } from 'enzyme';
import Logo from '..';
import { bdlBoxBlue } from '../../../styles/variables';
describe('components/logo/Logo', function () {
  test('should correctly render default Logo', function () {
    var wrapper = shallow(React.createElement(Logo, null));
    expect(wrapper.hasClass('logo')).toBe(true);
    expect(wrapper.find('IconLogo').prop('width')).toEqual(45);
    expect(wrapper.find('IconLogo').prop('height')).toEqual(25);
    expect(wrapper.find('IconLogo').prop('color')).toEqual(bdlBoxBlue);
  });
  test('should correctly render Logo specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(Logo, {
      color: color
    }));
    expect(wrapper.find('IconLogo').prop('color')).toEqual(color);
  });
  test('should correctly render Logo specified width and height', function () {
    var width = 55;
    var height = 445;
    var wrapper = shallow(React.createElement(Logo, {
      height: height,
      width: width
    }));
    expect(wrapper.find('IconLogo').prop('width')).toEqual(width);
    expect(wrapper.find('IconLogo').prop('height')).toEqual(height);
  });
  test('should correctly render Logo specified title', function () {
    var title = 'Hello there';
    var wrapper = shallow(React.createElement(Logo, {
      title: title
    }));
    expect(wrapper.find('IconLogo').prop('title')).toEqual(title);
  });
});