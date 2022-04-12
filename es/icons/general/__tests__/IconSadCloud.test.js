import React from 'react';
import { shallow } from 'enzyme';
import IconSadCloud from '../IconSadCloud';
describe('icons/general/IconSadCloud', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconSadCloud, null));
    expect(wrapper.hasClass('icon-sad-cloud')).toEqual(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconSadCloud, {
      color: color
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconSadCloud, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconSadCloud, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});