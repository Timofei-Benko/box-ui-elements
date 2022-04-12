import React from 'react';
import { shallow } from 'enzyme';
import UnknownUserAvatar from '../UnknownUserAvatar';
describe('icons/avatars/UnknownUserAvatar', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(UnknownUserAvatar, null));
    expect(wrapper.hasClass('unknown-user-avatar')).toEqual(true);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(UnknownUserAvatar, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(UnknownUserAvatar, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});