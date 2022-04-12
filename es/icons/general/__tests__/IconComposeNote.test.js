import React from 'react';
import { shallow } from 'enzyme';
import IconComposeNote from '../IconComposeNote';
describe('icons/general/IconComposeNote', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconComposeNote, null));
    expect(wrapper.hasClass('icon-compose-note')).toEqual(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconComposeNote, {
      color: color
    }));
    var paths = wrapper.find('path');

    for (var i = 0; i < paths.length; i += 1) {
      expect(paths.at(i).prop('fill')).toEqual(color);
    }
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconComposeNote, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconComposeNote, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});