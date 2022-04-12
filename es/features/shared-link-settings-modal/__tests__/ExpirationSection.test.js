function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import sinon from 'sinon';
import ExpirationSection from '../ExpirationSection';
var sandbox = sinon.sandbox.create();
describe('features/shared-link-settings-modal/ExpirationSection', function () {
  var canChangeExpiration = true;
  var expirationDate = new Date();
  var isExpirationEnabled = true;
  var onCheckboxChange = sandbox.stub();
  var onExpirationDateChange = sandbox.stub();

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(ExpirationSection, _extends({
      canChangeExpiration: canChangeExpiration,
      expirationDate: expirationDate,
      isExpirationEnabled: isExpirationEnabled,
      onCheckboxChange: onCheckboxChange,
      onExpirationDateChange: onExpirationDateChange
    }, props)));
  };

  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  test('should pass passthrough props to Checkbox', function () {
    var wrapper = getWrapper({
      expirationCheckboxProps: {
        'data-prop': 'checkbox'
      }
    });
    expect(wrapper.find('Checkbox').prop('data-prop')).toEqual('checkbox');
  });
  test('should render a fieldset with an hr', function () {
    var wrapper = getWrapper();
    var fieldset = wrapper.find('Fieldset');
    expect(fieldset.length).toBe(1);
    expect(fieldset.prop('title')).toBeTruthy();
  });
  test('should render a Checkbox with no subsection when expiration not enabled', function () {
    var wrapper = getWrapper({
      isExpirationEnabled: false,
      onCheckboxChange: sandbox.mock()
    });
    var checkbox = wrapper.find('Checkbox');
    expect(checkbox.length).toBe(1);
    expect(checkbox.prop('isChecked')).toBe(false);
    expect(checkbox.prop('subsection')).toBeFalsy();
    checkbox.simulate('change');
  });
  test('should disable Checkbox when canChangeExpiration is false', function () {
    var wrapper = getWrapper({
      canChangeExpiration: false
    });
    expect(wrapper.find('Checkbox').prop('isDisabled')).toBe(true);
  });
  describe('expiration is enabled', function () {
    var getSubsection = function getSubsection() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return shallow(getWrapper(props).find('Checkbox').prop('subsection')).find('DatePicker');
    };

    test('should render DatePicker when expiration is enabled', function () {
      var wrapper = getSubsection({
        onExpirationDateChange: sandbox.mock()
      });
      expect(wrapper.is('DatePicker')).toBe(true);
      wrapper.simulate('change');
    });
    test('should disable DatePicker when user cannot change expiration', function () {
      var wrapper = getSubsection({
        canChangeExpiration: false
      });
      expect(wrapper.prop('isDisabled')).toBe(true);
    });
    test('should pass passthrough props to DatePicker', function () {
      var wrapper = getSubsection({
        expirationInputProps: {
          'data-prop': 'input'
        }
      });
      expect(wrapper.prop('inputProps')['data-prop']).toEqual('input');
    });
  });
});