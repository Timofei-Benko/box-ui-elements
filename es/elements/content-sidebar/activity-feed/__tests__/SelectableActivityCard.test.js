function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { shallow } from 'enzyme';
import * as React from 'react';
import ActivityCard from '../ActivityCard';
import SelectableActivityCard from '../SelectableActivityCard'; // @ts-ignore flow import

import * as keys from '../../../../utils/keys';
describe('elements/content-sidebar/activity-feed/SelectableActivityCard', function () {
  var getDefaults = function getDefaults() {
    return {
      children: React.createElement("span", null, "Child Span"),
      onSelect: jest.fn()
    };
  };

  var getMockEvent = function getMockEvent() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        key = _ref.key,
        _ref$target = _ref.target,
        target = _ref$target === void 0 ? document.createElement('div') : _ref$target;

    return {
      key: key,
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      currentTarget: {
        focus: jest.fn()
      },
      target: target
    };
  };

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(SelectableActivityCard, _extends({}, getDefaults(), props)));
  };

  test('should render children and HTML div props', function () {
    var wrapper = getWrapper({
      className: 'foo',
      'data-prop': 'bar'
    });
    expect(wrapper.find(ActivityCard).hasClass('bcs-SelectableActivityCard')).toBe(true);
    expect(wrapper.find(ActivityCard).hasClass('foo')).toBe(true);
    expect(wrapper.prop('data-prop')).toEqual('bar');
    expect(wrapper.find('span').text()).toEqual('Child Span');
  });
  test('should render ActivityCard with button attributes', function () {
    var wrapper = getWrapper();
    expect(wrapper.props()).toMatchObject({
      'aria-disabled': false,
      onClick: expect.any(Function),
      onKeyDown: expect.any(Function),
      role: 'button',
      tabIndex: 0
    });
  });
  test.each([true, false])('should render aria-disabled based on isDisabled prop as %s', function (isDisabled) {
    var wrapper = getWrapper({
      isDisabled: isDisabled
    });
    expect(wrapper.prop('aria-disabled')).toEqual(isDisabled);
  });
  describe('click handling', function () {
    test('should not call onSelect if card is disabled', function () {
      var onSelect = jest.fn();
      var wrapper = getWrapper({
        isDisabled: true,
        onSelect: onSelect
      });
      wrapper.simulate('click', getMockEvent());
      expect(onSelect).not.toHaveBeenCalled();
    });
    test('should call onSelect if card is not disabled', function () {
      var onSelect = jest.fn();
      var clickEvent = getMockEvent();
      var wrapper = getWrapper({
        isDisabled: false,
        onSelect: onSelect
      });
      wrapper.simulate('click', clickEvent);
      expect(clickEvent.preventDefault).toHaveBeenCalled();
      expect(clickEvent.stopPropagation).toHaveBeenCalled();
      expect(clickEvent.currentTarget.focus).toHaveBeenCalled();
      expect(onSelect).toHaveBeenCalled();
    });
    test.each(['a', 'button'])('should not call onSelect if event target nodeName is %s', function (nodeName) {
      var onSelect = jest.fn();
      var wrapper = getWrapper({
        isDisabled: true,
        onSelect: onSelect
      });
      wrapper.simulate('click', getMockEvent({
        target: document.createElement(nodeName)
      }));
      expect(onSelect).not.toHaveBeenCalled();
    });
  });
  describe('key handling', function () {
    test('should not process if card is disabled', function () {
      var decodeSpy = jest.spyOn(keys, 'decode');
      var onSelect = jest.fn();
      var wrapper = getWrapper({
        isDisabled: true,
        onSelect: onSelect
      });
      wrapper.simulate('keydown', getMockEvent());
      expect(decodeSpy).not.toHaveBeenCalled();
      expect(onSelect).not.toHaveBeenCalled();
    });
    test.each(['a', 'button'])('should not process if event target nodeName is %s', function (nodeName) {
      var decodeSpy = jest.spyOn(keys, 'decode');
      var onSelect = jest.fn();
      var wrapper = getWrapper({
        isDisabled: true,
        onSelect: onSelect
      });
      wrapper.simulate('keydown', getMockEvent({
        target: document.createElement(nodeName)
      }));
      expect(decodeSpy).not.toHaveBeenCalled();
      expect(onSelect).not.toHaveBeenCalled();
    });
    test.each(['Space', 'Enter'])('should call onSelect if key is %s', function (key) {
      var onSelect = jest.fn();
      var wrapper = getWrapper({
        onSelect: onSelect
      });
      wrapper.simulate('keydown', getMockEvent({
        key: key
      }));
      expect(onSelect).toHaveBeenCalled();
    });
    test.each(['ArrowDown', 'ArrowLeft', 'Escape'])('should not call onSelect if key is %s', function (key) {
      var onSelect = jest.fn();
      var wrapper = getWrapper({
        onSelect: onSelect
      });
      wrapper.simulate('keydown', getMockEvent({
        key: key
      }));
      expect(onSelect).not.toHaveBeenCalled();
    });
  });
});