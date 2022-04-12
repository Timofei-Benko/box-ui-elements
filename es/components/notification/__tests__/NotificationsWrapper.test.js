import React from 'react';
import NotificationsWrapper from '../NotificationsWrapper';
import Notification from '../Notification';
describe('components/notification/NotificationsWrapper', function () {
  test('should render a Portal with the notifications-wrapper class', function () {
    var wrapper = shallow(React.createElement(NotificationsWrapper, null));
    expect(wrapper.is('Portal')).toBeTruthy();
    expect(wrapper.hasClass('notifications-wrapper')).toBeTruthy();
    expect(wrapper.props('aria-live')).toBeTruthy();
  });
  test('should render a focus trap', function () {
    var wrapper = shallow(React.createElement(NotificationsWrapper, null, React.createElement(Notification, null, "test1")));
    var focusTrap = wrapper.find('FocusTrap');
    expect(focusTrap.length).toEqual(1);
  });
  test('should not render focusTrap if there are no children', function () {
    var wrapper = shallow(React.createElement(NotificationsWrapper, null));
    expect(wrapper.exists('FocusTrap')).toBe(false);
  });
  test('should render child notifications when passed in children', function () {
    var wrapper = shallow(React.createElement(NotificationsWrapper, null, React.createElement(Notification, null, "test1"), React.createElement(Notification, null, "test2")));
    expect(wrapper.find('Notification').length).toEqual(2);
  });
});