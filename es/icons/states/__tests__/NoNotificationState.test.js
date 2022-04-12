import React from 'react';
import { shallow } from 'enzyme';
import NoNotificationState from '../NoNotificationState';
describe('icons/states/NoNotificationStae', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(NoNotificationState, null));
    expect(wrapper.hasClass('no-notification-state')).toBeTruthy();
  });
  test('should correctly render the icon with specified class', function () {
    var className = 'my-state';
    var wrapper = shallow(React.createElement(NoNotificationState, {
      className: className
    }));
    expect(wrapper.hasClass(className)).toBeTruthy();
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 140;
    var height = 150;
    var wrapper = shallow(React.createElement(NoNotificationState, {
      height: height,
      width: width
    }));
    expect(wrapper.prop('width')).toEqual(width);
    expect(wrapper.prop('height')).toEqual(height);
  });
  test('should correctly render svg with specified title', function () {
    var title = 'oh hi there';
    var wrapper = shallow(React.createElement(NoNotificationState, {
      title: title
    }));
    expect(wrapper.prop('title')).toEqual(title);
  });
  test('should override color in svg when specified', function () {
    var color = '#acf';
    var wrapper = shallow(React.createElement(NoNotificationState, {
      color: color
    }));
    expect(wrapper).toMatchSnapshot();
  });
});