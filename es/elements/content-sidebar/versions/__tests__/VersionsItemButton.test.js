function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { shallow } from 'enzyme/build';
import VersionsItemButton from '../VersionsItemButton';
import { scrollIntoView } from '../../../../utils/dom';
jest.mock('../../../../utils/dom', function () {
  return _objectSpread({}, jest.requireActual('../../../../utils/dom'), {
    scrollIntoView: jest.fn()
  });
});
describe('elements/content-sidebar/versions/VersionsItemButton', function () {
  var getMount = function getMount() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return mount(React.createElement(VersionsItemButton, props, "Test"));
  };

  var getShallow = function getShallow() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(VersionsItemButton, props, "Test"));
  };

  describe('componentDidUpdate', function () {
    test('should call setScroll if the selected state changed', function () {
      var wrapper = getShallow({
        isSelected: false
      });
      var instance = wrapper.instance();
      instance.setScroll = jest.fn();
      wrapper.setProps({
        isSelected: false
      });
      expect(instance.setScroll).not.toHaveBeenCalled();
      wrapper.setProps({
        isSelected: true
      });
      expect(instance.setScroll).toHaveBeenCalled();
    });
  });
  describe('setScroll', function () {
    test('should scroll into view if the button is selected', function () {
      var wrapper = getMount({
        isSelected: false
      });
      wrapper.instance().setScroll();
      expect(scrollIntoView).toHaveBeenCalledTimes(0);
      wrapper.setProps({
        isSelected: true
      });
      wrapper.instance().setScroll();
      expect(scrollIntoView).toHaveBeenCalledTimes(2); // Called once by componentDidUpdate, once manually
    });
  });
  describe('render', function () {
    test('should render in enabled state correctly', function () {
      var wrapper = getShallow({
        isDisabled: false,
        isSelected: false
      });
      expect(wrapper.prop('aria-disabled')).toBe(false);
      expect(wrapper.prop('className')).not.toContain('bcs-is-disabled');
      expect(wrapper).toMatchSnapshot();
    });
    test('should render in disabled state correctly', function () {
      var wrapper = getShallow({
        isDisabled: true,
        isSelected: false
      });
      expect(wrapper.prop('aria-disabled')).toBe(true);
      expect(wrapper.prop('className')).toContain('bcs-is-disabled');
      expect(wrapper).toMatchSnapshot();
    });
    test('should render in enabled state correctly', function () {
      var wrapper = getShallow({
        isDisabled: false,
        isSelected: true
      });
      expect(wrapper.prop('className')).toContain('bcs-is-selected');
      expect(wrapper).toMatchSnapshot();
    });
  });
});