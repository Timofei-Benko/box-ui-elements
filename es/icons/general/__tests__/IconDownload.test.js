import React from 'react';
import { shallow } from 'enzyme';
import IconDownload from '../IconDownload';
describe('icons/general/IconDownload', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconDownload, null));
    expect(wrapper.is('AccessibleSVG')).toBe(true);
    expect(wrapper.prop('height')).toEqual(16);
    expect(wrapper.prop('width')).toEqual(16);
    var strokeColors = wrapper.find('.stroke-color');

    for (var i = 0; i < strokeColors.length; i += 1) {
      expect(strokeColors.at(i).prop('stroke')).toEqual('#444');
    }
  });
  test('should correctly render icon with specified class', function () {
    var wrapper = shallow(React.createElement(IconDownload, {
      className: "test"
    }));
    expect(wrapper.hasClass('icon-download')).toBe(true);
    expect(wrapper.hasClass('test')).toBe(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconDownload, {
      color: color
    }));
    var strokeColors = wrapper.find('.stroke-color');

    for (var i = 0; i < strokeColors.length; i += 1) {
      expect(strokeColors.at(i).prop('stroke')).toEqual(color);
    }
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconDownload, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconDownload, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});