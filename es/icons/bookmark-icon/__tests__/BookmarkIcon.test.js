import React from 'react';
import { shallow } from 'enzyme';
import BookmarkIcon from '../BookmarkIcon';
describe('icons/bookmark-icon/BookmarkIcon', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(BookmarkIcon, null));
    expect(wrapper.is('AccessibleSVG')).toBe(true);
    expect(wrapper.hasClass('icon-bookmark')).toBe(true);
  });
  test('should correctly render icon with specified class', function () {
    var className = 'test';
    var wrapper = shallow(React.createElement(BookmarkIcon, {
      className: className
    }));
    expect(wrapper.hasClass('icon-bookmark')).toBe(true);
    expect(wrapper.hasClass(className)).toBe(true);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(BookmarkIcon, {
      height: height,
      width: width
    }));
    expect(wrapper.prop('width')).toEqual(width);
    expect(wrapper.prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'test';
    var wrapper = shallow(React.createElement(BookmarkIcon, {
      title: title
    }));
    expect(wrapper.prop('title')).toEqual(title);
  });
});