function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import sinon from 'sinon';
import Checkbox from '../../../components/checkbox';
import TextInput from '../../../components/text-input';
import { VanityNameSectionBase as VanityNameSection } from '../VanityNameSection';
var sandbox = sinon.sandbox.create();
describe('features/shared-link-settings-modla/VanityNameSection', function () {
  var vanityName = 'vanity';
  var serverURL = 'url/';

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return mount(React.createElement(VanityNameSection, _extends({
      canChangeVanityName: true,
      intl: {
        formatMessage: sandbox.stub()
      },
      onChange: sandbox.stub(),
      onCheckboxChange: sandbox.stub(),
      serverURL: serverURL,
      vanityName: vanityName,
      isVanityEnabled: true
    }, props)));
  };

  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  test('should render a TextInput and a Checkbox', function () {
    var wrapper = getWrapper();
    var textInput = wrapper.find(TextInput);
    expect(textInput.length).toBe(1);
    expect(textInput.prop('value')).toEqual(vanityName);
    var checkbox = wrapper.find(Checkbox);
    expect(checkbox.length).toBe(1);
    expect(checkbox.prop('isDisabled')).toBe(false);
  });
  test('should pass passthrough props to TextInput', function () {
    var wrapper = getWrapper({
      vanityNameInputProps: {
        'data-prop': 'input'
      }
    });
    expect(wrapper.find(TextInput).prop('data-prop')).toEqual('input');
  });
  test('should render a URL preview', function () {
    var wrapper = getWrapper();
    var preview = wrapper.find('.custom-url-preview');
    expect(preview.text()).toEqual("".concat(serverURL).concat(vanityName));
  });
  test('should not render URL preview when user cannot change vanity name and no vanity name is set', function () {
    var wrapper = getWrapper({
      canChangeVanityName: false,
      vanityName: ''
    });
    expect(wrapper.find('.custom-url-preview').length).toBe(0);
  });
  test('should disable TextInput and Checkbox when user cannot change vanity name', function () {
    var wrapper = getWrapper({
      canChangeVanityName: false
    });
    var textInput = wrapper.find(TextInput);
    expect(textInput.prop('disabled')).toBe(true);
    var checkbox = wrapper.find(Checkbox);
    expect(checkbox.prop('isDisabled')).toBe(true);
  });
  test('should show message in TextInput when user cannot change vanity name and no vanity name is set', function () {
    var message = 'no vanity name set';
    var wrapper = getWrapper({
      canChangeVanityName: false,
      intl: {
        formatMessage: sandbox.stub().returns(message)
      },
      vanityName: ''
    });
    expect(wrapper.find(TextInput).prop('value')).toEqual(message);
    expect(wrapper.find(Checkbox).prop('isDisabled')).toBe(true);
  });
});