function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        timestamp                        | timestampName                      | allowFutureTimestamps | alwaysShowTime | showWeekday | description\n        ", "                   | ", "                     | ", "               | ", "       | ", "    | ", "\n        ", "      | ", "      | ", "               | ", "       | ", "    | ", "\n        ", "                  | ", "                  | ", "               | ", "       | ", "    | ", "\n        ", "                  | ", "                  | ", "               | ", "        | ", "    | ", "\n        ", "                  | ", "                  | ", "               | ", "       | ", "     | ", "\n        ", "   | ", "   | ", "               | ", "       | ", "    | ", "\n        ", "               | ", "               | ", "              | ", "       | ", "    | ", "\n        ", "  | ", "  | ", "               | ", "       | ", "    | ", "\n        ", " | ", " | ", "               | ", "       | ", "    | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import sinon from 'sinon';
import 'full-icu';
import { createIntl } from 'react-intl';
import russianMessages from '../../../../i18n/ru-RU.js';
import japaneseMessages from '../../../../i18n/ja-JP.js';
import { ReadableTimeComponent as ReadableTime } from '../ReadableTime';
jest.unmock('react-intl');
var sandbox = sinon.sandbox.create();
var intl = createIntl({
  locale: 'en'
});
describe('components/time/ReadableTime', function () {
  var TEST_TIMESTAMP = 1506551456000; // Some random timestamp [09/27/2017 @ 10:33pm (UTC)]

  beforeEach(function () {
    var clock = sandbox.useFakeTimers();
    clock.tick(TEST_TIMESTAMP);
  });
  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  var oneHourInMs = 60 * 60 * 1000;
  var oneDayInMs = 24 * oneHourInMs; // In order to leverage withData and not have flakey tests, we need to set a consistent test timestamp

  var today = new Date(TEST_TIMESTAMP);
  var now = today.getTime();
  var msYesterday = now - oneDayInMs;
  var msTwoDaysAgo = now - 2 * oneDayInMs;
  var msBeginningOfCenturyTime = new Date(2000, 0, 0).getTime();
  var ms1HourInFuture = now + oneHourInMs;
  var relativeThreshold = oneHourInMs;
  var withinRelativeThresholdAhead = now + relativeThreshold / 2;
  var withinRelativeThresholdBehind = now - relativeThreshold / 2;
  test.each(_templateObject(), msYesterday, 'yesterday', true, false, false, 'Yesterday at hh:mm', msBeginningOfCenturyTime, 'msBeginningOfCenturyTime', true, false, false, 'mm dd yy at hh:mm', msTwoDaysAgo, 'msTwoDaysAgo', true, false, false, 'mm dd', msTwoDaysAgo, 'msTwoDaysAgo', true, true, false, 'mm dd at hh:mm when we show the time', msTwoDaysAgo, 'msTwoDaysAgo', true, false, true, 'Weekday', relativeThreshold * 2 + now, 'relativeThreshold * 2 + now', true, false, false, 'Today at hh:mm', ms1HourInFuture, 'ms1HourInFuture', false, false, false, 'Today at hh:mm', withinRelativeThresholdAhead, 'withinRelativeThresholdAhead', true, false, false, 'in 30 minutes', withinRelativeThresholdBehind, 'withinRelativeThresholdBehind', true, false, false, '30 minutes ago')('timestamp: $timestampName | allowFutureTimestamps: $allowFutureTimestamps | alwaysShowTime: $alwaysShowTime | showWeekday: $showWeekday | $description', function (_ref) {
    var timestamp = _ref.timestamp,
        _ref$allowFutureTimes = _ref.allowFutureTimestamps,
        allowFutureTimestamps = _ref$allowFutureTimes === void 0 ? true : _ref$allowFutureTimes,
        _ref$alwaysShowTime = _ref.alwaysShowTime,
        alwaysShowTime = _ref$alwaysShowTime === void 0 ? false : _ref$alwaysShowTime,
        _ref$showWeekday = _ref.showWeekday,
        showWeekday = _ref$showWeekday === void 0 ? false : _ref$showWeekday;
    var wrapper = mount(React.createElement(ReadableTime, {
      intl: intl,
      allowFutureTimestamps: allowFutureTimestamps,
      alwaysShowTime: alwaysShowTime,
      relativeThreshold: oneHourInMs,
      showWeekday: showWeekday,
      timestamp: timestamp
    }));
    expect(wrapper.children()).toMatchSnapshot();
    wrapper.setProps({
      uppercase: true
    });
    expect(wrapper.children()).toMatchSnapshot('uppercase');
  });
  test('should use default relative threshold if not provided', function () {
    var wrapper = shallow(React.createElement(ReadableTime, {
      intl: intl,
      timestamp: withinRelativeThresholdAhead
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should not uppercase locales that do not have uppercase grammar (e.g. russian)', function () {
    var ruIntl = createIntl({
      locale: 'ru',
      messages: russianMessages
    });
    var wrapperUppercase = mount(React.createElement(ReadableTime, {
      intl: ruIntl,
      timestamp: withinRelativeThresholdAhead,
      uppercase: true
    }));
    var wrapperLowercase = mount(React.createElement(ReadableTime, {
      intl: ruIntl,
      timestamp: withinRelativeThresholdAhead,
      uppercase: false
    }));
    expect(wrapperUppercase.text()).toEqual(wrapperLowercase.text());
  });
  test('CJK languages should look the same for uppercase and lowercase (e.g. japanese)', function () {
    var jaIntl = createIntl({
      locale: 'ja',
      messages: japaneseMessages
    });
    var wrapperUppercaseJa = mount(React.createElement(ReadableTime, {
      intl: jaIntl,
      timestamp: withinRelativeThresholdAhead,
      uppercase: true
    }));
    var wrapperLowercaseJa = mount(React.createElement(ReadableTime, {
      intl: jaIntl,
      timestamp: withinRelativeThresholdAhead,
      uppercase: false
    }));
    expect(wrapperUppercaseJa.text()).toEqual(wrapperLowercaseJa.text());
  });
});