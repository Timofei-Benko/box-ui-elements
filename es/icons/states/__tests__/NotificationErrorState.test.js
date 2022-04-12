import React from 'react';
import { shallow } from 'enzyme';
import NotificationErrorState from '../NotificationErrorState';
describe('icons/states/NoNotificationStae', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(NotificationErrorState, null));
    expect(wrapper.hasClass('notification-error-state')).toBeTruthy();
  });
  test('should correctly render the icon with specified class', function () {
    var className = 'my-state';
    var wrapper = shallow(React.createElement(NotificationErrorState, {
      className: className
    }));
    expect(wrapper.hasClass(className)).toBeTruthy();
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 140;
    var height = 150;
    var wrapper = shallow(React.createElement(NotificationErrorState, {
      height: height,
      width: width
    }));
    expect(wrapper.prop('width')).toEqual(width);
    expect(wrapper.prop('height')).toEqual(height);
  });
  test('should correctly render svg with specified title', function () {
    var title = 'oh hi there';
    var wrapper = shallow(React.createElement(NotificationErrorState, {
      title: title
    }));
    expect(wrapper.prop('title')).toEqual(title);
  });
  test('should override color in svg when specified', function () {
    var color = '#acf';
    var wrapper = shallow(React.createElement(NotificationErrorState, {
      color: color
    }));
    expect(wrapper).toMatchSnapshot();
  });
});