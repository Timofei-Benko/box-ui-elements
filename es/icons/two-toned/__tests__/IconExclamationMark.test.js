import React from 'react';
import { shallow } from 'enzyme';
import IconExclamationMark from '../IconExclamationMark';
describe('icons/two-toned/IconExclamationMark', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconExclamationMark, null));
    expect(wrapper.hasClass('icon-exclamation-mark-2')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconExclamationMark, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'test';
    var wrapper = shallow(React.createElement(IconExclamationMark, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});