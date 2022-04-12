import React from 'react';
import { shallow } from 'enzyme';
import ActivityItem from '../ActivityItem';
describe('src/elements/content-sidebar/activity-feed/activity-feed/ActivityItem', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(ActivityItem, props, "Test"));
  };

  test('should compile its default class and its className prop value', function () {
    var className = 'bcs-Test';
    var wrapper = getWrapper({
      className: className
    });
    expect(wrapper.hasClass('bcs-ActivityItem')).toBe(true);
    expect(wrapper.hasClass(className)).toBe(true);
  });
  test.each([true, false])('should compile its className with isFocused equal to %s', function (isFocused) {
    expect(getWrapper({
      isFocused: isFocused
    }).hasClass('bcs-is-focused')).toBe(isFocused);
  });
});