import React from 'react';
import { shallow } from 'enzyme';
import IconSharedLink from '../IconSharedLink';
describe('icons/two-toned/IconSharedLink', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconSharedLink, null));
    expect(wrapper.hasClass('icon-shared-link-2')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconSharedLink, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'test';
    var wrapper = shallow(React.createElement(IconSharedLink, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});