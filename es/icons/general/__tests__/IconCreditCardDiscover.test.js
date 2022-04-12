import React from 'react';
import { shallow } from 'enzyme';
import IconCreditCardDiscover from '../IconCreditCardDiscover';
describe('icons/general/IconCreditCardDiscover', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconCreditCardDiscover, null));
    expect(wrapper.hasClass('icon-credit-card-discover')).toBe(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconCreditCardDiscover, {
      color: color
    }));
    expect(wrapper.find('g').find('rect').prop('stroke')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconCreditCardDiscover, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with specified opacity', function () {
    var opacity = 0.5;
    var wrapper = shallow(React.createElement(IconCreditCardDiscover, {
      opacity: opacity
    }));
    expect(wrapper.find('AccessibleSVG').prop('opacity')).toEqual(opacity);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconCreditCardDiscover, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});