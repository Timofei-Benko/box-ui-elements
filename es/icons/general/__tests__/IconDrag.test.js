import React from 'react';
import { shallow } from 'enzyme';
import IconDrag from '../IconDrag';
describe('icons/general/IconDrag', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconDrag, null));
    expect(wrapper.hasClass('icon-drag')).toEqual(true);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconDrag, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'drag me';
    var wrapper = shallow(React.createElement(IconDrag, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});