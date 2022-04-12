function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            text                                 | length | should\n            ", " | ", "   | ", "\n            ", "                         | ", "   | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import sinon from 'sinon';
import { PasswordSectionBase as PasswordSection } from '../PasswordSection';
var sandbox = sinon.sandbox.create();
describe('features/shared-link-settings-modal/PasswordSection', function () {
  var canChangePassword = true;
  var intl = {
    formatMessage: sandbox.stub()
  };
  var isPasswordAvailable = true;
  var isPasswordEnabled = true;
  var isPasswordInitiallyEnabled = true;
  var onCheckboxChange = sandbox.stub();
  var onPasswordChange = sandbox.stub();
  var password = 'password';

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(PasswordSection, _extends({
      canChangePassword: canChangePassword,
      intl: intl,
      isPasswordAvailable: isPasswordAvailable,
      isPasswordEnabled: isPasswordEnabled,
      isPasswordInitiallyEnabled: isPasswordInitiallyEnabled,
      onCheckboxChange: onCheckboxChange,
      onPasswordChange: onPasswordChange,
      password: password
    }, props)));
  };

  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  test('should render a fieldset with an hr', function () {
    var wrapper = getWrapper();
    var fieldset = wrapper.find('Fieldset');
    expect(fieldset.length).toBe(1);
    expect(fieldset.prop('title')).toBeTruthy();
    expect(wrapper.find('hr').length).toBe(1);
  });
  test('should return null when isPasswordAvailable is false', function () {
    var wrapper = getWrapper({
      isPasswordAvailable: false
    });
    expect(wrapper.type()).toBeNull();
  });
  test('should pass passthrough props to Checkbox', function () {
    var wrapper = getWrapper({
      passwordCheckboxProps: {
        'data-prop': 'checkbox'
      }
    });
    expect(wrapper.find('Checkbox').prop('data-prop')).toEqual('checkbox');
  });
  test('should render a Checkbox with no subsection when isPasswordEnabled is false', function () {
    var wrapper = getWrapper({
      isPasswordEnabled: false,
      onCheckboxChange: sandbox.mock()
    });
    var checkbox = wrapper.find('Checkbox');
    expect(checkbox.length).toBe(1);
    expect(checkbox.prop('subsection')).toBeFalsy();
    checkbox.simulate('change');
  });
  test('should disable Checkbox when canChangePassword is false', function () {
    var wrapper = getWrapper({
      canChangePassword: false
    });
    expect(wrapper.find('Checkbox').prop('isDisabled')).toBe(true);
  });
  describe('isPasswordEnabled === true ', function () {
    var getInputWrapper = function getInputWrapper() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return shallow(getWrapper(props).find('Checkbox').prop('subsection')).find('TextInput');
    };

    test('should render a TextInput subsection when isPasswordEnabled is true', function () {
      var wrapper = getInputWrapper({
        onPasswordChange: sandbox.mock()
      });
      expect(wrapper.is('TextInput')).toBe(true);
      wrapper.simulate('change');
    });
    test('should disable TextInput when canChangePassword is false', function () {
      var wrapper = getInputWrapper({
        canChangePassword: false
      });
      expect(wrapper.prop('disabled')).toBe(true);
    });
    test('should set TextInput to required when isPasswordInitiallyEnabled is false', function () {
      var wrapper = getInputWrapper({
        isPasswordInitiallyEnabled: false
      });
      expect(wrapper.prop('isRequired')).toBe(true);
    });
    test('should pass passthrough props to TextInput', function () {
      var wrapper = getInputWrapper({
        passwordInputProps: {
          'data-prop': 'input'
        }
      });
      expect(wrapper.prop('data-prop')).toEqual('input');
    });
  });
  describe('passwordInformationText', function () {
    var getPassWordInformation = function getPassWordInformation() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return shallow(getWrapper(props).find('Checkbox').prop('subsection')).find('.password-section-information');
    };

    test.each(_templateObject(), 'Password should be 8 chars long', 1, 'should render passwordInformation if message provided', undefined, 0, 'should not render passwordInformationBox if null')('$should', function (_ref) {
      var text = _ref.text,
          length = _ref.length;
      var props = {
        passwordInformationText: text
      };
      var wrapper = getPassWordInformation(props);
      expect(wrapper.find('ExclamationMarkBadge16').length).toEqual(length);
      expect(wrapper.find('.password-section-information-text').length).toEqual(length);
      expect(wrapper.length).toEqual(length);
    });
  });
});