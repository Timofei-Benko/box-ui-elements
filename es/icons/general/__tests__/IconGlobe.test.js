import React from 'react';
import { shallow } from 'enzyme';
import { white } from '../../../styles/variables';
import IconGlobe from '../IconGlobe';
describe('icons/general/IconGlobe', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconGlobe, null));
    expect(wrapper.hasClass('icon-globe')).toEqual(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = white;
    var wrapper = shallow(React.createElement(IconGlobe, {
      color: color
    }));
    expect(wrapper.find('path').at(1).prop('fill')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconGlobe, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconGlobe, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});