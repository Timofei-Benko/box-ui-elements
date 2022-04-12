import React from 'react';
import { shallow } from 'enzyme';
import IconBoxNotes from '../IconBoxNotes';
describe('icons/box-notes/IconBoxNotes', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconBoxNotes, null));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified class', function () {
    var wrapper = shallow(React.createElement(IconBoxNotes, {
      className: "foo"
    }));
    expect(wrapper.hasClass('foo')).toEqual(true);
    expect(wrapper.hasClass('icon-boxnotes')).toEqual(true);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconBoxNotes, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconBoxNotes, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});