import React from 'react';
import { shallow } from 'enzyme';
import IconChevron from '../IconChevron';
describe('icons/general/IconChevron', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconChevron, null));
    expect(wrapper.is('span')).toBe(true);
    expect(wrapper.hasClass('icon-chevron')).toBe(true);
    expect(wrapper.hasClass('icon-chevron-up')).toBe(true);
    expect(wrapper.prop('style')).toEqual({
      borderColor: '#000',
      borderStyle: 'solid solid none none',
      borderWidth: '2px',
      display: 'inline-block',
      height: '9px',
      transform: 'rotate(315deg)',
      width: '9px'
    });
  });
  test('should correctly render icon with specified class', function () {
    var className = 'test';
    var wrapper = shallow(React.createElement(IconChevron, {
      className: className
    }));
    expect(wrapper.hasClass(className)).toBe(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#fff';
    var wrapper = shallow(React.createElement(IconChevron, {
      color: color
    }));
    expect(wrapper.prop('style').borderColor).toEqual(color);
  });
  [{
    direction: 'down',
    rotation: 135
  }, {
    direction: 'left',
    rotation: 225
  }, {
    direction: 'right',
    rotation: 45
  }, {
    direction: 'up',
    rotation: 315
  }].forEach(function (_ref) {
    var direction = _ref.direction,
        rotation = _ref.rotation;
    test('should correctly render icon with specified direction', function () {
      var wrapper = shallow(React.createElement(IconChevron, {
        direction: direction
      }));
      expect(wrapper.hasClass("icon-chevron-".concat(direction))).toBe(true);
      expect(wrapper.prop('style').transform).toEqual("rotate(".concat(rotation, "deg)"));
    });
  });
  test('should correctly render icon with specified size', function () {
    var size = '5px';
    var wrapper = shallow(React.createElement(IconChevron, {
      size: size
    }));
    expect(wrapper.prop('style').height).toEqual(size);
    expect(wrapper.prop('style').width).toEqual(size);
  });
  test('should correctly render icon with specified thickness', function () {
    var thickness = '2px';
    var wrapper = shallow(React.createElement(IconChevron, {
      thickness: thickness
    }));
    expect(wrapper.prop('style').borderWidth).toEqual(thickness);
  });
});