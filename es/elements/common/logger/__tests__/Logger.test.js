function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { shallow } from 'enzyme';
import Logger from '../Logger';
import { METRIC_TYPE_PREVIEW, METRIC_TYPE_ELEMENTS_LOAD_METRIC } from '../../../../constants';
import { EVENT_DATA_READY, EVENT_JS_READY } from '../constants';
jest.mock('../../../../utils/performance');
describe('elements/common/logger/Logger', function () {
  var WrappedComponent = function WrappedComponent() {
    return React.createElement("div", null, "Test");
  };

  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(Logger, _extends({
      fileId: "123",
      onMetric: jest.fn(),
      source: "foo"
    }, props), React.createElement(WrappedComponent, null)));
  };

  describe('createEventName()', function () {
    var instance;
    beforeEach(function () {
      var wrapper = getWrapper();
      instance = wrapper.instance();
    });
    test('should create an event name', function () {
      var name = 'bar';
      var eventName = instance.createEventName(name);
      var source = instance.props.source;
      expect(eventName).toBe("".concat(source, "::").concat(name));
    });
    test('should create an event name with optional uniqueId', function () {
      var name = 'bar';
      var eventName = instance.createEventName(name, '123');
      var source = instance.props.source;
      expect(eventName).toBe("".concat(source, "::").concat(name, "::123"));
    });
  });
  describe('logMetric()', function () {
    var instance;
    var onMetric;
    var source;
    var TIMESTAMP = '123456';
    var SESSION_ID = '987-654-321';
    beforeEach(function () {
      var wrapper = getWrapper();
      instance = wrapper.instance();
      jest.spyOn(instance, 'sessionId', 'get').mockReturnValue(SESSION_ID);
      instance.getTimestamp = jest.fn().mockReturnValue(TIMESTAMP);
      var _instance$props = instance.props;
      onMetric = _instance$props.onMetric;
      source = _instance$props.source;
    });
    test('should call onMetric with the metric object', function () {
      var data = {
        foo: 'bar',
        bar: 'baz'
      };
      var name = 'foo_event';
      var type = 'foo_type';
      instance.logMetric(type, name, data);

      var metric = _objectSpread({}, data, {
        component: source,
        name: name,
        timestamp: TIMESTAMP,
        sessionId: SESSION_ID,
        type: type
      });

      expect(onMetric).toHaveBeenCalledWith(metric);
    });
  });
  describe('logUniqueMetric()', function () {
    var BASE_EVENT_NAME = 'foo';
    var EVENT_NAME = 'foo_event';
    var TYPE = 'FOO_TYPE';
    var data = {
      foo: 'bar'
    };
    var instance;
    beforeEach(function () {
      var wrapper = getWrapper();
      instance = wrapper.instance();
      instance.createEventName = jest.fn().mockReturnValue(EVENT_NAME);
      instance.hasLoggedEvent = jest.fn().mockReturnValue(true);
      instance.logMetric = jest.fn();
      jest.spyOn(instance, 'uniqueEvents', 'get').mockReturnValue(new Set());
    });
    test('should log a metric if it hasnt been logged before', function () {
      instance.hasLoggedEvent = jest.fn().mockReturnValue(false);
      instance.logUniqueMetric(TYPE, BASE_EVENT_NAME, data);
      expect(instance.logMetric).toHaveBeenCalledWith(TYPE, BASE_EVENT_NAME, data);
    });
    test('should not log a metric if it has been logged before', function () {
      instance.logUniqueMetric(TYPE, BASE_EVENT_NAME, data);
      expect(instance.logMetric).not.toHaveBeenCalled();
    });
  });
  describe('handlePreviewMetric()', function () {
    var instance;
    var onMetric;
    var data = {
      foo: 'bar'
    };
    beforeEach(function () {
      var wrapper = getWrapper();
      instance = wrapper.instance();
      onMetric = instance.props.onMetric;
    });
    test('should call onMetric with the preview metric', function () {
      instance.handlePreviewMetric(data);
      expect(onMetric).toHaveBeenCalledWith(_objectSpread({}, data, {
        type: METRIC_TYPE_PREVIEW
      }));
    });
  });
  describe('handleDataReadyMetric()', function () {
    var END = 'end';
    var START = 'start';
    var data = {
      foo: 'bar',
      endMarkName: END,
      startMarkName: START
    };
    var instance;
    beforeEach(function () {
      var wrapper = getWrapper();
      instance = wrapper.instance();
      instance.logUniqueMetric = jest.fn();
    });
    test('should log a unique metric', function () {
      instance.handleDataReadyMetric(data);
      expect(instance.logUniqueMetric).toHaveBeenCalledWith(METRIC_TYPE_ELEMENTS_LOAD_METRIC, EVENT_DATA_READY, data, undefined);
    });
    test('should log a unique metric with uniqueId', function () {
      instance.handleDataReadyMetric(data, '123');
      expect(instance.logUniqueMetric).toHaveBeenCalledWith(METRIC_TYPE_ELEMENTS_LOAD_METRIC, EVENT_DATA_READY, data, '123');
    });
  });
  describe('handleReadyMetric()', function () {
    var instance;
    var data = {
      foo: 'bar'
    };
    var START = 'foo';
    beforeEach(function () {
      var wrapper = getWrapper({
        startMarkName: START
      });
      instance = wrapper.instance();
      instance.logUniqueMetric = jest.fn();
    });
    test('should log a unique metric', function () {
      instance.handleReadyMetric(data);
      expect(instance.logUniqueMetric).toHaveBeenCalledWith(METRIC_TYPE_ELEMENTS_LOAD_METRIC, EVENT_JS_READY, _objectSpread({}, data, {
        startMarkName: START
      }));
    });
  });
  describe('render()', function () {
    var wrapper;
    beforeEach(function () {
      wrapper = getWrapper();
    });
    test('should decorate with logger prop', function () {
      expect(wrapper).toMatchSnapshot();
    });
  });
});