function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            alignment   | unspecifiedElement         | submenuElRect      | submenuTriggerElRect                     | expectedClass\n            ", "   | ", "  | ", "  | ", "           | ", "\n            ", " | ", " | ", " | ", " | ", "\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            alignment   | specifiedElement           | submenuElRect      | submenuTriggerElRect                     | expectedClass\n            ", "   | ", "  | ", "  | ", "           | ", "\n            ", " | ", " | ", " | ", " | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import { shallow } from 'enzyme';
import SubmenuItem from '../SubmenuItem';
jest.mock('lodash/debounce', function () {
  return jest.fn(function (fn) {
    fn.cancel = jest.fn();
    return fn;
  });
});
describe('components/menu/SubmenuItem', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(SubmenuItem, props, React.createElement("div", null), React.createElement("div", null)));
  };

  describe('render()', function () {
    test('should correctly render default component', function () {
      var wrapper = getWrapper();
      expect(wrapper).toMatchSnapshot();
    });
    test('should correctly render correctly when isDisabled is true', function () {
      var wrapper = getWrapper({
        isDisabled: true
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should correctly render correctly when isSubmenuOpen is true', function () {
      var wrapper = getWrapper({});
      wrapper.setState({
        isSubmenuOpen: true
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('openSubmenu()', function () {
    test('should set isSubmenuOpen state to true', function () {
      var wrapper = getWrapper();
      wrapper.instance().openSubmenu();
      expect(wrapper.state('isSubmenuOpen')).toBe(true);
    });
  });
  describe('closeSubmenuAndFocusTrigger()', function () {
    test('should set isSubmenuOpen state to false and not focus trigger element if not keyboard event', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      var focusSpy = jest.fn();
      wrapper.setState({
        isSubmenuOpen: true
      });
      instance.submenuTriggerEl = document.createElement('input');
      instance.submenuTriggerEl.focus = focusSpy;
      instance.closeSubmenuAndFocusTrigger(false);
      expect(wrapper.state('isSubmenuOpen')).toBe(false);
      expect(focusSpy).not.toHaveBeenCalled();
    });
    test('should set isSubmenuOpen state to false and focus trigger element if keyboard event', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      var focusSpy = jest.fn();
      wrapper.setState({
        isSubmenuOpen: true
      });
      instance.submenuTriggerEl = document.createElement('input');
      instance.submenuTriggerEl.focus = focusSpy;
      instance.closeSubmenuAndFocusTrigger(true);
      expect(wrapper.state('isSubmenuOpen')).toBe(false);
      expect(focusSpy).toHaveBeenCalled();
    });
  });
  describe('handleKeyDown()', function () {
    test.each([' ', 'Enter', 'ArrowRight'])('should call openSubmenu() when the %s key is pressed', function (key) {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      var openSubmenuSpy = jest.fn();
      var stopPropagationSpy = jest.fn();
      var preventDefaultSpy = jest.fn();
      instance.openSubmenuAndFocus = openSubmenuSpy;
      wrapper.find('li').simulate('keydown', {
        key: key,
        stopPropagation: stopPropagationSpy,
        preventDefault: preventDefaultSpy
      });
      expect(openSubmenuSpy).toHaveBeenCalled();
      expect(stopPropagationSpy).toHaveBeenCalled();
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });
  describe('handleMenuItemClick()', function () {
    test('should call onClick() when isDisable is false', function () {
      var onClickSpy = jest.fn();
      var wrapper = getWrapper({
        isDisabled: false,
        onClick: onClickSpy
      });
      wrapper.find('li').simulate('click', {});
      expect(onClickSpy).toHaveBeenCalled();
    });
    test('should not call onClick() and stop propagation and prevent default when isDisable is true', function () {
      var onClickSpy = jest.fn();
      var stopPropagationSpy = jest.fn();
      var preventDefaultSpy = jest.fn();
      var wrapper = getWrapper({
        isDisabled: true,
        onClick: onClickSpy
      });
      wrapper.find('li').simulate('click', {
        stopPropagation: stopPropagationSpy,
        preventDefault: preventDefaultSpy
      });
      expect(onClickSpy).not.toHaveBeenCalled();
      expect(stopPropagationSpy).toHaveBeenCalled();
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });
  describe('getMenuAlignmentClasses()', function () {
    var SUBMENU_LEFT_ALIGNED_CLASS = 'is-left-aligned';
    var SUBMENU_BOTTOM_ALIGNED_CLASS = 'is-bottom-aligned';
    test.each(_templateObject(), 'left', 'rightBoundaryElement', {
      width: 600
    }, {
      right: 100,
      bottom: 200
    }, SUBMENU_LEFT_ALIGNED_CLASS, 'bottom', 'bottomBoundaryElement', {
      height: 600
    }, {
      right: 100,
      bottom: 200,
      top: 100
    }, SUBMENU_BOTTOM_ALIGNED_CLASS)('should set $expectedClass to true when submenu should be $alignment aligned and $specifiedElement is specified', function (_ref) {
      var specifiedElement = _ref.specifiedElement,
          submenuElRect = _ref.submenuElRect,
          submenuTriggerElRect = _ref.submenuTriggerElRect,
          expectedClass = _ref.expectedClass;
      var wrapper = getWrapper(_defineProperty({}, specifiedElement, {
        getBoundingClientRect: jest.fn(function () {
          return {
            right: 500,
            bottom: 500
          };
        })
      }));
      var instance = wrapper.instance();
      instance.submenuEl = document.createElement('li');
      instance.submenuEl.getBoundingClientRect = jest.fn(function () {
        return submenuElRect;
      });
      instance.submenuTriggerEl = document.createElement('li');
      instance.submenuTriggerEl.getBoundingClientRect = jest.fn(function () {
        return submenuTriggerElRect;
      });
      var classes = instance.getMenuAlignmentClasses();
      expect(classes[expectedClass]).toBe(true);
    });
    test.each(_templateObject2(), 'left', 'rightBoundaryElement', {
      width: 600
    }, {
      right: 100,
      bottom: 200
    }, SUBMENU_LEFT_ALIGNED_CLASS, 'bottom', 'bottomBoundaryElement', {
      height: 600
    }, {
      right: 100,
      bottom: 200,
      top: 100
    }, SUBMENU_BOTTOM_ALIGNED_CLASS)('should set SUBMENU_LEFT_ALIGNED_CLASS to true when submenu should be $alignment aligned and $unspecifiedElement is not specified', function (_ref2) {
      var submenuElRect = _ref2.submenuElRect,
          submenuTriggerElRect = _ref2.submenuTriggerElRect,
          expectedClass = _ref2.expectedClass;
      var wrapper = getWrapper();
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 500
      });
      var instance = wrapper.instance();
      instance.submenuEl = document.createElement('li');
      instance.submenuEl.getBoundingClientRect = jest.fn(function () {
        return submenuElRect;
      });
      instance.submenuTriggerEl = document.createElement('li');
      instance.submenuTriggerEl.getBoundingClientRect = jest.fn(function () {
        return submenuTriggerElRect;
      });
      var classes = instance.getMenuAlignmentClasses();
      expect(classes[expectedClass]).toBe(true);
    });
  });
});