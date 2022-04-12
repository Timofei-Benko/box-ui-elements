function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import sinon from 'sinon';
import RemoveLinkConfirmModal from '../RemoveLinkConfirmModal';
var sandbox = sinon.sandbox.create();
describe('features/shared-link-modal/RemoveLinkConfirmModal', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(RemoveLinkConfirmModal, _extends({
      isOpen: true,
      onRequestClose: sandbox.stub(),
      removeLink: sandbox.stub()
    }, props)));
  };

  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  test('should render a confirmation Modal', function () {
    var wrapper = getWrapper({
      onRequestClose: sandbox.mock(),
      removeLink: sandbox.mock()
    });
    var modal = wrapper.find('Modal');
    expect(modal.length).toBe(1);
    expect(modal.prop('isOpen')).toBe(true);
    expect(modal.prop('onRequestClose')).toBeTruthy();
    var closeBtn = wrapper.find('Button');
    expect(closeBtn.length).toBe(1);
    closeBtn.simulate('click');
    var okayBtn = wrapper.find('PrimaryButton');
    expect(okayBtn.length).toBe(1);
    okayBtn.simulate('click');
  });
  test('should disable modal closing and set loading state when props.submitting is true', function () {
    var wrapper = getWrapper({
      submitting: true
    });
    var modal = wrapper.find('Modal');
    expect(modal.prop('onRequestClose')).toBeFalsy();
    expect(wrapper.find('Button').prop('isDisabled')).toBe(true);
    var okayBtn = wrapper.find('PrimaryButton');
    expect(okayBtn.prop('isDisabled')).toBe(true);
    expect(okayBtn.prop('isLoading')).toBe(true);
  });
});