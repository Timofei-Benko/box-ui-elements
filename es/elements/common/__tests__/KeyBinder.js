function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        eventType       | scrollType          | result\n        ", "    | ", "    | ", "\n        ", "  | ", "    | ", "\n        ", "  | ", " | ", "\n        ", " | ", " | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { shallow } from 'enzyme';
import KeyBinder from '../KeyBinder';
describe('KeyBinder', function () {
  var onScrollToChangeMock;

  var getEvent = function getEvent(type) {
    return {
      key: type,
      stopPropagation: jest.fn(),
      preventDefault: jest.fn()
    };
  };

  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(KeyBinder, _extends({
      id: "123",
      onScrollToChange: onScrollToChangeMock,
      rowCount: 10,
      items: [],
      columnCount: 10,
      scrollToRow: 0,
      scrollToColumn: 0
    }, props), function () {}));
  };

  beforeEach(function () {
    onScrollToChangeMock = jest.fn();
  });
  test('should update scrollToRow when props change', function () {
    var wrapper = getWrapper();
    wrapper.setProps({
      scrollToRow: 5
    });
    expect(wrapper.state('scrollToRow')).toEqual(5);
  });
  test('should update scrollToColumn when props change', function () {
    var wrapper = getWrapper();
    wrapper.setProps({
      scrollToColumn: 5
    });
    expect(wrapper.state('scrollToColumn')).toEqual(5);
  });
  test('should update scrollToColumn and scrollToRow when props change', function () {
    var wrapper = getWrapper();
    wrapper.setProps({
      scrollToColumn: 5,
      scrollToRow: 5
    });
    expect(wrapper.state('scrollToColumn')).toEqual(5);
    expect(wrapper.state('scrollToRow')).toEqual(5);
  });
  test.each(_templateObject(), 'ArrowUp', 'scrollToRow', 2, 'ArrowDown', 'scrollToRow', 8, 'ArrowLeft', 'scrollToColumn', 2, 'ArrowRight', 'scrollToColumn', 8)('should exercise the $eventType key for $scrollType', function (_ref) {
    var eventType = _ref.eventType,
        scrollType = _ref.scrollType,
        result = _ref.result;
    var event = getEvent(eventType);
    var wrapper = getWrapper(_defineProperty({}, "".concat(scrollType), 5));
    var instance = wrapper.instance();
    instance.onKeyDown(event);
    instance.onKeyDown(event);
    instance.onKeyDown(event);
    expect(onScrollToChangeMock).toBeCalled();
    expect(wrapper.state(scrollType)).toEqual(result);
  });
});