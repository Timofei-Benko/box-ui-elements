import React from 'react';
import { shallow } from 'enzyme';
import { bdlBoxBlue, white } from '../../../styles/variables';
import IconBoxSquare from '../IconBoxSquare';
describe('icons/general/IconBoxSquare', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconBoxSquare, null));
    expect(wrapper.is('AccessibleSVG')).toBe(true);
    expect(wrapper.prop('height')).toEqual(72);
    expect(wrapper.prop('height')).toEqual(72);
    expect(wrapper.hasClass('box-square-icon')).toEqual(true);
  });
  test('should correctly render default icon with default color', function () {
    var wrapper = shallow(React.createElement(IconBoxSquare, null));
    expect(wrapper.find('rect').prop('fill')).toEqual(bdlBoxBlue);
    expect(wrapper.find('path').at(0).prop('fill')).toEqual(white);
    expect(wrapper.find('path').at(1).prop('fill')).toEqual(white);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 50;
    var height = 50;
    var wrapper = shallow(React.createElement(IconBoxSquare, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'hellojello';
    var wrapper = shallow(React.createElement(IconBoxSquare, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});