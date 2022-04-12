import React from 'react';
import { shallow } from 'enzyme';
import IconCreditCardMasterCard from '../IconCreditCardMasterCard';
describe('icons/general/IconCreditCardMasterCard', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconCreditCardMasterCard, null));
    expect(wrapper.hasClass('icon-credit-card-mastercard')).toBe(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconCreditCardMasterCard, {
      color: color
    }));
    expect(wrapper.find('path').find({
      opacity: '.5'
    }).prop('fill')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconCreditCardMasterCard, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with specified opacity', function () {
    var opacity = 0.5;
    var wrapper = shallow(React.createElement(IconCreditCardMasterCard, {
      opacity: opacity
    }));
    expect(wrapper.find('AccessibleSVG').prop('opacity')).toEqual(opacity);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconCreditCardMasterCard, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});