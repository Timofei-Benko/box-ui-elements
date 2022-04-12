import React from 'react';
import { shallow } from 'enzyme';
import IconCreditCardVisa from '../IconCreditCardVisa';
describe('icons/general/IconCreditCardVisa', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconCreditCardVisa, null));
    expect(wrapper.hasClass('icon-credit-card-visa')).toBe(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconCreditCardVisa, {
      color: color
    }));
    expect(wrapper.find('path').find({
      opacity: '.5'
    }).prop('fill')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconCreditCardVisa, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with specified opacity', function () {
    var opacity = 0.5;
    var wrapper = shallow(React.createElement(IconCreditCardVisa, {
      opacity: opacity
    }));
    expect(wrapper.find('AccessibleSVG').prop('opacity')).toEqual(opacity);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconCreditCardVisa, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});