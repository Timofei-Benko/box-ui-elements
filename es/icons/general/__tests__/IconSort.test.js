import React from 'react';
import { shallow } from 'enzyme';
import IconSort from '../IconSort';
describe('icons/general/IconSort', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconSort, null));
    expect(wrapper.hasClass('icon-sort')).toEqual(true);
    expect(wrapper.find('path').prop('fill')).toEqual('#222222');
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(17);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(13);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconSort, {
      color: color
    }));
    expect(wrapper.find('path').prop('fill')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconSort, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconSort, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});