import React from 'react';
import { shallow } from 'enzyme';
import IconLogo from '../IconLogo';
import { bdlBoxBlue } from '../../../styles/variables';
describe('icons/general/IconLogo', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconLogo, null));
    expect(wrapper.hasClass('icon-logo')).toBe(true);
    expect(wrapper.is('AccessibleSVG')).toBe(true);
    expect(wrapper.prop('width')).toEqual(45);
    expect(wrapper.prop('height')).toEqual(25);
    expect(wrapper.prop('viewBox')).toEqual('0 0 98 52');
    expect(wrapper.find('path').prop('fill')).toEqual(bdlBoxBlue);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconLogo, {
      color: color
    }));
    expect(wrapper.find('path').prop('fill')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconLogo, {
      height: height,
      width: width
    }));
    expect(wrapper.prop('width')).toEqual(width);
    expect(wrapper.prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = React.createElement("div", null, "Hi There");
    var wrapper = shallow(React.createElement(IconLogo, {
      title: title
    }));
    expect(wrapper.prop('title')).toEqual(title);
  });
});