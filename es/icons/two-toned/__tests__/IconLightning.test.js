import React from 'react';
import { shallow } from 'enzyme';
import IconLightning from '../IconLightning';
describe('icons/two-toned/IconLightning', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconLightning, null));
    expect(wrapper.hasClass('bdl-IconLightning')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconLightning, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'test';
    var wrapper = shallow(React.createElement(IconLightning, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});