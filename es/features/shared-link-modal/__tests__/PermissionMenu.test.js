function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import sinon from 'sinon';
import PermissionMenu from '../PermissionMenu';
import { CAN_VIEW } from '../constants';
var sandbox = sinon.sandbox.create();
describe('features/shared-link-modal/PermissionMenu', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(PermissionMenu, _extends({
      changePermissionLevel: sandbox.stub(),
      permissionLevel: CAN_VIEW
    }, props)));
  };

  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  test('should return null when changePermissionLevel is falsey', function () {
    var wrapper = getWrapper({
      changePermissionLevel: undefined
    });
    expect(wrapper.type()).toBeNull();
  });
  test('should return null when permissionLevel is falsey', function () {
    var wrapper = getWrapper({
      permissionLevel: undefined
    });
    expect(wrapper.type()).toBeNull();
  });
  test('should render a DropdownMenu with a PlainButton and Menu', function () {
    var wrapper = getWrapper();
    expect(wrapper.find('DropdownMenu').length).toBe(1);
    expect(wrapper.find('PlainButton').length).toBe(1);
    expect(wrapper.find('Menu').length).toBe(1);
  });
  test('should disable button when submitting', function () {
    var wrapper = getWrapper({
      submitting: true
    });
    expect(wrapper.find('PlainButton').prop('disabled')).toBe(true);
  });
  test('should render both options correctly', function () {
    var wrapper = getWrapper({
      changePermissionLevel: sandbox.mock().twice()
    });
    var options = wrapper.find('SelectMenuItem');
    expect(options.length).toBe(2);
    options.forEach(function (option, i) {
      if (i === 0) {
        expect(option.prop('isSelected')).toBe(true);
      }

      option.simulate('click');
    });
  });
});