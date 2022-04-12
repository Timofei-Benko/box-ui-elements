import React from 'react';
import { shallow } from 'enzyme';
import IconCreditCardJCB from '../IconCreditCardJCB';
describe('icons/general/IconCreditCardJCB', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconCreditCardJCB, null));
    expect(wrapper.hasClass('icon-credit-card-jcb')).toBe(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconCreditCardJCB, {
      color: color
    }));
    expect(wrapper.find('g').find('rect').prop('stroke')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconCreditCardJCB, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with specified opacity', function () {
    var opacity = 0.5;
    var wrapper = shallow(React.createElement(IconCreditCardJCB, {
      opacity: opacity
    }));
    expect(wrapper.find('AccessibleSVG').prop('opacity')).toEqual(opacity);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconCreditCardJCB, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});