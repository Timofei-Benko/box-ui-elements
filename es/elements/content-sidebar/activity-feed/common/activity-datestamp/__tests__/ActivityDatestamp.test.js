function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { shallow } from 'enzyme';
import * as React from 'react';
import ActivityDatestamp, { MILLISECONDS_PER_YEAR } from '../ActivityDatestamp';
describe('elements/content-sidebar/activity-feed/common/activity-datestamp/ActivityDatestamp', function () {
  var MOCK_DATE = new Date('2021-01-01');
  var MOCK_DATE_STRING = '2021-01-01T00:00:00+00:00';
  var MOCK_DATE_TIME = 1609459200000;

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(ActivityDatestamp, _extends({
      date: MOCK_DATE
    }, props)));
  };

  test.each([MOCK_DATE, MOCK_DATE_STRING, MOCK_DATE_TIME])('should handle date passed in as %s', function (date) {
    var wrapper = getWrapper({
      date: date
    });
    expect(wrapper.find('ReadableTime').prop('timestamp')).toBe(MOCK_DATE_TIME);
  });
  test('should not show time if date occurs outside of the last 12 months', function () {
    var wrapper = getWrapper({
      date: new Date().getTime() - MILLISECONDS_PER_YEAR
    });
    expect(wrapper.find('ReadableTime').prop('alwaysShowTime')).toBe(false);
  });
  test('should show time if date occurs within the last 12 months', function () {
    var wrapper = getWrapper({
      date: new Date().getTime()
    });
    expect(wrapper.find('ReadableTime').prop('alwaysShowTime')).toBe(true);
  });
  test('should pass on ReadableTime overrides', function () {
    var wrapper = getWrapper({
      date: MOCK_DATE,
      uppercase: true
    });
    expect(wrapper.find('ReadableTime').prop('uppercase')).toBe(true);
  });
});