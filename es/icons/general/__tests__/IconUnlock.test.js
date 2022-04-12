import React from 'react';
import { shallow } from 'enzyme';
import IconUnlock from '../IconUnlock';
describe('icons/general/IconUnlock', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconUnlock, null));
    expect(wrapper.is('AccessibleSVG')).toBe(true);
    expect(wrapper.prop('height')).toEqual(14);
    expect(wrapper.prop('width')).toEqual(12);
    expect(wrapper.find('.fill-color').prop('fill')).toEqual('#444');
  });
  test('should correctly render icon with specified class', function () {
    var wrapper = shallow(React.createElement(IconUnlock, {
      className: "test"
    }));
    expect(wrapper.hasClass('icon-unlock')).toBe(true);
    expect(wrapper.hasClass('test')).toBe(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconUnlock, {
      color: color
    }));
    expect(wrapper.find('.fill-color').prop('fill')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconUnlock, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconUnlock, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});