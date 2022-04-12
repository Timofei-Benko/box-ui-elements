function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { EditableURLBase as EditableURL, VALUE_MISSING, TYPE_MISMATCH } from '../EditableURL';
describe('features/item-details/EditableURL', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(EditableURL, _extends({
      intl: {
        formatMessage: function formatMessage(message) {
          return message.id;
        }
      },
      onValidURLChange: function onValidURLChange() {},
      value: "box.com"
    }, props)));
  };

  describe('componentDidUpdate()', function () {
    test('should update state value when prop value changes', function () {
      var value = 'http://box.com';
      var wrapper = getWrapper();
      wrapper.setProps({
        value: value
      });
      expect(wrapper.state('value')).toBe(value);
    });
  });
  describe('handleBlur()', function () {
    test('should call onValidURLChange() when input is valid', function () {
      var onValidURLChange = jest.fn();
      var wrapper = getWrapper({
        onValidURLChange: onValidURLChange
      });
      wrapper.setState({
        value: 'https://box.com'
      });
      var instance = wrapper.instance();
      instance.inputEl = {
        validity: {
          valid: true
        }
      };
      wrapper.instance().handleBlur();
      expect(onValidURLChange).toHaveBeenCalledWith('https://box.com');
    });
    test('should set required error and not call onValidURLChange() when input is missing value', function () {
      var onValidURLChange = jest.fn();
      var wrapper = getWrapper({
        onValidURLChange: onValidURLChange
      });
      var instance = wrapper.instance();
      instance.inputEl = {
        validity: {
          valid: false,
          valueMissing: true
        }
      };
      wrapper.instance().handleBlur();
      expect(wrapper.state('error')).toBe(VALUE_MISSING);
      expect(onValidURLChange).not.toHaveBeenCalled();
    });
    test('should set url error and not call onValidURLChange() when input is not a url', function () {
      var onValidURLChange = jest.fn();
      var wrapper = getWrapper({
        onValidURLChange: onValidURLChange
      });
      var instance = wrapper.instance();
      instance.inputEl = {
        validity: {
          valid: false,
          valueMissing: false
        }
      };
      wrapper.instance().handleBlur();
      expect(wrapper.state('error')).toBe(TYPE_MISMATCH);
      expect(onValidURLChange).not.toHaveBeenCalled();
    });
  });
  describe('handleChange()', function () {
    test('should update state value when called', function () {
      var url = 'box';
      var wrapper = getWrapper();
      wrapper.instance().handleChange({
        currentTarget: {
          value: url
        }
      });
      expect(wrapper.state('value')).toBe(url);
    });
  });
  describe('handleFocus()', function () {
    test('should reset error state when called', function () {
      var wrapper = getWrapper();
      wrapper.setState({
        error: VALUE_MISSING
      });
      wrapper.instance().handleFocus();
      expect(wrapper.state('error')).toBe('');
    });
  });
  describe('render()', function () {
    test('should render default component', function () {
      var wrapper = getWrapper();
      expect(wrapper).toMatchSnapshot();
    });
    [{
      error: VALUE_MISSING
    }, {
      error: TYPE_MISMATCH
    }].forEach(function (_ref) {
      var error = _ref.error;
      test('should render component with state error and value', function () {
        var wrapper = getWrapper();
        wrapper.setState({
          error: error,
          value: 'box'
        });
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});