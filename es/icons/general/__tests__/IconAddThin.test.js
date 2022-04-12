import React from 'react';
import { shallow } from 'enzyme';
import IconAddThin from '../IconAddThin';
describe('icons/general/IconAddThin', function () {
  test('should correctly render default icon, color, width and height', function () {
    var wrapper = shallow(React.createElement(IconAddThin, null));
    expect(wrapper.hasClass('icon-add-thin')).toEqual(true);
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(17);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(17);
    expect(wrapper.find('path').at(0).prop('fill')).toEqual('#222222');
    expect(wrapper.find('path').at(1).prop('fill')).toEqual('#222222');
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconAddThin, {
      color: color
    }));
    expect(wrapper.find('path').at(0).prop('fill')).toEqual(color);
    expect(wrapper.find('path').at(1).prop('fill')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconAddThin, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconAddThin, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});