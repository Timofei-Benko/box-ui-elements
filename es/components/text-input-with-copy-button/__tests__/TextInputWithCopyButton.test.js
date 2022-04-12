function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import TextInputWithCopyButton from '..';
var sandbox = sinon.sandbox.create();

document.execCommand = function () {};

document.queryCommandSupported = function () {
  return false;
};

describe('components/text-input-with-copy-button/TextInputWithCopyButton', function () {
  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  var buttonDefaultText = 'copy';
  var buttonSuccessText = 'copied';

  var renderComponent = function renderComponent(props) {
    return shallow(React.createElement(TextInputWithCopyButton, _extends({
      buttonDefaultText: buttonDefaultText,
      buttonSuccessText: buttonSuccessText,
      label: "label",
      value: 1
    }, props)));
  };

  describe('render()', function () {
    test('should correctly render default component when copy command is supported', function () {
      var wrapper = renderComponent({
        buttonProps: {
          'data-resin-thing': 'copy'
        }
      });
      wrapper.instance().isCopyCommandSupported = true;
      wrapper.setState({
        copySuccess: true
      });
      var button = wrapper.find('Button');
      expect(button.prop('data-resin-thing')).toEqual('copy');
      var textInputComponent = wrapper.find('TextInput');
      expect(wrapper.hasClass('text-input-with-copy-button-container')).toBe(true);
      expect(wrapper.hasClass('copy-success')).toBe(true);
      expect(textInputComponent.length).toBe(1);
      expect(textInputComponent.prop('readOnly')).toBe(true);
      expect(_typeof(textInputComponent.prop('inputRef'))).toBe('function');
      expect(textInputComponent.prop('hideOptionalLabel')).toBe(true);
      expect(textInputComponent.prop('type')).toEqual('text');
      expect(textInputComponent.prop('value')).toEqual(1);
      expect(textInputComponent.prop('onFocus')).toEqual(wrapper.instance().handleFocus);
    });
    test('should correctly render default component when copy command is not supported', function () {
      var wrapper = renderComponent();
      var instance = wrapper.instance();
      instance.isCopyCommandSupported = false;
      var textInputComponent = wrapper.find('TextInput');
      expect(wrapper.hasClass('text-input-with-copy-button-container')).toBe(false);
      expect(textInputComponent.length).toBe(1);
      expect(textInputComponent.prop('readOnly')).toBe(true);
      expect(textInputComponent.prop('inputRef')).not.toBeDefined();
    });
    test('should autofocus text if autofocus is true', function () {
      var selectMock = jest.fn();
      var wrapper = renderComponent({
        autofocus: true
      });
      var instance = wrapper.instance();
      instance.copyInputRef = {
        select: selectMock
      };
      instance.componentDidMount();
      expect(selectMock).toHaveBeenCalled();
    });
    test('should autofocus if the value updates from empty to something', function () {
      var selectMock = jest.fn();
      var wrapper = renderComponent({
        value: '',
        autofocus: true
      });
      var instance = wrapper.instance();
      instance.copyInputRef = {
        select: selectMock
      };
      instance.componentDidMount();
      wrapper.setProps({
        value: 'http://example.com/'
      });
      expect(selectMock.mock.calls.length).toBe(1);
    });
    test('should not autofocus if autofocus is enabled, but there is no value', function () {
      var selectMock = jest.fn();
      var wrapper = renderComponent({
        autofocus: true,
        value: ''
      });
      var instance = wrapper.instance();
      instance.copyInputRef = {
        select: selectMock
      };
      instance.componentDidMount();
      expect(selectMock).not.toHaveBeenCalled();
    });
  });
  describe('componentWillUnmount()', function () {
    test('should call clearCopySuccessTimeout()', function () {
      var wrapper = mount(React.createElement(TextInputWithCopyButton, {
        buttonDefaultText: buttonDefaultText,
        buttonSuccessText: buttonSuccessText,
        label: "label",
        value: 1
      }));
      var instance = wrapper.instance();
      instance.clearCopySuccessTimeout = sandbox.mock();
      wrapper.unmount();
    });
  });
  describe('clearCopySuccessTimeout()', function () {
    test('should clear the copySuccessTimeout and set it to null when copySuccessTimeout is set', function () {
      var clock = sandbox.useFakeTimers();
      var wrapper = renderComponent();
      var instance = wrapper.instance();
      var func = sandbox.mock().never();
      instance.copySuccessTimeout = setTimeout(func, 1000);
      instance.clearCopySuccessTimeout();
      expect(instance.copySuccessTimeout).toBeNull();
      clock.tick(1001);
    });
  });
  describe('renderCopyButton()', function () {
    test('should render a Button correctly when copy command is supported', function () {
      var wrapper = renderComponent();
      var instance = wrapper.instance();
      instance.isCopyCommandSupported = true;
      var copyButton = wrapper.wrap(instance.renderCopyButton());
      var button = copyButton.find('Button');
      expect(button.length).toBe(1);
      expect(_typeof(button.prop('onClick'))).toBe('function');
      expect(button.prop('type')).toEqual('button');
      expect(button.prop('children')).toEqual(buttonDefaultText);
    });
    test('should not render a copy button when copy command is not supported', function () {
      var wrapper = renderComponent();
      var instance = wrapper.instance();
      instance.isCopyCommandSupported = false;
      expect(instance.renderCopyButton()).toBeNull();
    });
    test('should disable the copy button when props.disabled is true', function () {
      var wrapper = renderComponent({
        disabled: true
      });
      var instance = wrapper.instance();
      instance.isCopyCommandSupported = true;
      var copyButton = wrapper.wrap(instance.renderCopyButton());
      var button = copyButton.find('Button');
      expect(button.prop('isDisabled')).toBe(true);
    });
  });
  describe('handleCopyButtonClick()', function () {
    test('should select input text and copy text when called', function () {
      var wrapper = renderComponent();
      var instance = wrapper.instance();
      instance.copyInputRef = {
        select: sandbox.mock()
      };
      instance.copySelectedText = sandbox.mock();
      wrapper.setProps({});
      instance.handleCopyButtonClick();
    });
    test('should call clearCopySuccessTimeout() when called', function () {
      var wrapper = renderComponent();
      var instance = wrapper.instance();
      instance.copyInputRef = {
        select: sandbox.stub()
      };
      instance.clearCopySuccessTimeout = sandbox.mock();
      instance.handleCopyButtonClick();
    });
    test('should set state correctly and provide correct callback', function () {
      var clock = sandbox.useFakeTimers();
      var wrapper = renderComponent();
      var instance = wrapper.instance();
      var callback;
      var data;
      instance.copyInputRef = {
        select: sandbox.stub()
      };

      instance.setState = function (obj, cb) {
        data = obj;
        callback = cb;
      };

      wrapper.setProps({});
      instance.handleCopyButtonClick();
      instance.restoreCopyButton = sandbox.mock();
      expect(data).toEqual({
        copySuccess: true,
        buttonText: buttonSuccessText,
        hasFocused: true
      });
      callback();
      clock.tick(4000);
    });
  });
  describe('handleCopyEvent()', function () {
    test('should animate copy button when called with cmd + c', function () {
      var wrapper = renderComponent();
      var instance = wrapper.instance();
      sinon.mock(instance, 'animateCopyButton');
      instance.handleCopyEvent();
    });
    test('should call correct callback', function () {
      var wrapper = renderComponent({
        onCopySuccess: sandbox.mock()
      });
      var instance = wrapper.instance();
      instance.handleCopyEvent();
    });
  });
  describe('restoreCopyButton()', function () {
    test('should set state correctly when called', function () {
      var wrapper = renderComponent();
      var instance = wrapper.instance();
      instance.setState = sandbox.mock().withArgs({
        copySuccess: false,
        buttonText: buttonDefaultText
      });
      instance.restoreCopyButton();
    });
  });
  describe('handleFocus()', function () {
    test('should select the input and call onFocus when it exists', function () {
      var wrapper = renderComponent({
        onFocus: sandbox.mock()
      });
      var instance = wrapper.instance();
      instance.copyInputRef = {
        select: sandbox.mock()
      };
      instance.handleFocus({});
    });
  });
});