function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        isDisabled | expected\n        ", "   | ", "\n        ", "    | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { shallow } from 'enzyme';
import { AnnotationActivityLinkBase as AnnotationActivityLink } from '../AnnotationActivityLink';
import messages from '../messages';
describe('elements/content-sidebar/ActivityFeed/annotations/AnnotationActivityLink', function () {
  var wrapperProps = {
    'data-resin-iscurrent': 'true',
    'data-resin-itemid': '123',
    'data-resin-target': 'annotationLink',
    id: '123',
    intl: {
      formatMessage: jest.fn()
    },
    message: _objectSpread({}, messages.annotationActivityPageItem, {
      values: {
        number: 1
      }
    })
  };

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(AnnotationActivityLink, _extends({}, wrapperProps, props)));
  };

  test('should correctly render annotation activity link', function () {
    var wrapper = getWrapper();
    expect(wrapper.find('PlainButton').length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('should fire onClick when the button is clicked', function () {
    var onClickFn = jest.fn();
    var wrapper = getWrapper({
      onClick: onClickFn
    });
    var onClick = wrapper.find('PlainButton').prop('onClick');
    var event = {
      currentTarget: {
        focus: jest.fn()
      },
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    };
    onClick(event);
    expect(onClickFn).toHaveBeenCalledWith('123');
    expect(event.currentTarget.focus).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
  });
  test('should stop propagation of the native mousedown event', function () {
    var wrapper = getWrapper();
    var onMouseDown = wrapper.find('PlainButton').prop('onMouseDown');
    var event = {
      currentTarget: {
        focus: jest.fn()
      },
      nativeEvent: {
        stopImmediatePropagation: jest.fn()
      }
    };
    onMouseDown(event);
    expect(event.nativeEvent.stopImmediatePropagation).toHaveBeenCalled();
  });
  test.each(_templateObject(), false, 1, true, 0)('should handle the mousedown event if isDisabled is $isDisabled', function (_ref) {
    var expected = _ref.expected,
        isDisabled = _ref.isDisabled;
    var wrapper = getWrapper({
      isDisabled: isDisabled
    });
    var onMouseDown = wrapper.find('PlainButton').prop('onMouseDown');
    var event = {
      currentTarget: {
        focus: jest.fn()
      },
      nativeEvent: {
        stopImmediatePropagation: jest.fn()
      }
    };
    onMouseDown(event);
    expect(event.nativeEvent.stopImmediatePropagation).toHaveBeenCalledTimes(expected);
  });
});