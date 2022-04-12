import React from 'react';
import { shallow } from 'enzyme';
import IconMoveCopy from '../IconMoveCopy';
describe('icons/general/IconMoveCopy', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconMoveCopy, null));
    expect(wrapper.is('AccessibleSVG')).toBe(true);
    expect(wrapper.prop('height')).toEqual(16);
    expect(wrapper.prop('width')).toEqual(16);
    var fillColors = wrapper.find('.fill-color');

    for (var i = 0; i < fillColors.length; i += 1) {
      expect(fillColors.at(i).prop('fill')).toEqual('#4e4e4e');
    }
  });
  test('should correctly render icon with specified class', function () {
    var wrapper = shallow(React.createElement(IconMoveCopy, {
      className: "test"
    }));
    expect(wrapper.hasClass('icon-move-copy')).toBe(true);
    expect(wrapper.hasClass('test')).toBe(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconMoveCopy, {
      color: color
    }));
    var fillColors = wrapper.find('.fill-color');

    for (var i = 0; i < fillColors.length; i += 1) {
      expect(fillColors.at(i).prop('fill')).toEqual(color);
    }
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconMoveCopy, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconMoveCopy, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});