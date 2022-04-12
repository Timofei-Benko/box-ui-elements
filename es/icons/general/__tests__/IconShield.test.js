import React from 'react';
import { shallow } from 'enzyme';
import IconShield from '../IconShield';
describe('icons/states/IconShield', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconShield, null));
    expect(wrapper.hasClass('bdl-IconShield')).toBeTruthy();
  });
  test('should correctly render the icon with specified class', function () {
    var className = 'my-state';
    var wrapper = shallow(React.createElement(IconShield, {
      className: className
    }));
    expect(wrapper.hasClass(className)).toBeTruthy();
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 20;
    var height = 15;
    var wrapper = shallow(React.createElement(IconShield, {
      height: height,
      width: width
    }));
    expect(wrapper.prop('width')).toEqual(width);
    expect(wrapper.prop('height')).toEqual(height);
  });
  test('should correctly render svg with specified title', function () {
    var title = 'oh what ever';
    var wrapper = shallow(React.createElement(IconShield, {
      title: title
    }));
    expect(wrapper.prop('title')).toEqual(title);
  });
  test('should override color in svg when specified', function () {
    var color = '#bdf';
    var wrapper = shallow(React.createElement(IconShield, {
      color: color
    }));
    expect(wrapper).toMatchSnapshot();
  });
});