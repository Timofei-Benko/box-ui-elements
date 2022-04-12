import React from 'react';
import { shallow } from 'enzyme';
import IconInviteCollaborators from '../IconInviteCollaborators';
describe('icons/general/IconInviteCollaborators', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconInviteCollaborators, null));
    expect(wrapper.hasClass('icon-invite-collaborators')).toBe(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconInviteCollaborators, {
      color: color
    }));
    expect(wrapper.find('path').at(0).prop('stroke')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconInviteCollaborators, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconInviteCollaborators, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});