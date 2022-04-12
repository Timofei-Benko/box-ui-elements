function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import sinon from 'sinon';
import SharedLinkModal from '../SharedLinkModal';
import { PEOPLE_WITH_LINK, PEOPLE_IN_COMPANY, PEOPLE_IN_ITEM } from '../constants';
var sandbox = sinon.sandbox.create();
describe('features/shared-link-modal/SharedLinkModal', function () {
  var getWrapper = function getWrapper() {
    var _ref;

    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(SharedLinkModal, _extends({
      accessLevel: PEOPLE_WITH_LINK,
      allowedAccessLevels: (_ref = {}, _defineProperty(_ref, PEOPLE_WITH_LINK, true), _defineProperty(_ref, PEOPLE_IN_COMPANY, true), _defineProperty(_ref, PEOPLE_IN_ITEM, true), _ref),
      canRemoveLink: true,
      changeAccessLevel: sandbox.stub(),
      enterpriseName: "enterprise",
      itemName: "filename.gif",
      itemType: "folder",
      onCopySuccess: sandbox.stub(),
      onRequestClose: sandbox.stub(),
      removeLink: sandbox.stub(),
      sharedLink: "http://box.com"
    }, props)));
  };

  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  describe('renderSharedLink()', function () {
    test('should render a SharedLink correctly', function () {
      var wrapper = getWrapper();
      expect(wrapper.find('SharedLink')).toMatchSnapshot();
    });
  });
  describe('renderEmailSharedLink()', function () {
    test('should not render EmailSharedLink when missing correct props', function () {
      var wrapper = getWrapper();
      expect(wrapper.find('EmailSharedLink').length).toBe(0);
    });
    test('should render EmailSharedLink when correct props are provided', function () {
      var wrapper = getWrapper({
        getContacts: sandbox.stub(),
        contacts: [],
        sendEmail: sandbox.stub()
      });
      expect(wrapper.find('EmailSharedLink').length).toBe(1);
    });
    test('should set state.isEmailSharedLinkExpanded to true when onExpand is called', function () {
      var wrapper = getWrapper({
        getContacts: sandbox.stub(),
        contacts: [],
        sendEmail: sandbox.stub()
      });
      wrapper.find('EmailSharedLink').prop('onExpand')();
      expect(wrapper.state('isEmailSharedLinkExpanded')).toBe(true);
    });
  });
  describe('render()', function () {
    test('should render a Modal', function () {
      var wrapper = getWrapper({
        onRequestClose: sandbox.mock()
      });
      var modal = wrapper.find('Modal');
      expect(modal.length).toBe(1);
      expect(modal.prop('focusElementSelector')).toEqual('.shared-link-container input');
      var closeBtn = wrapper.find('Button');
      expect(closeBtn.length).toBe(1);
      closeBtn.simulate('click');
    });
    test('should disable closing when submission is in progress', function () {
      var wrapper = getWrapper({
        submitting: true
      });
      var modal = wrapper.find('Modal');
      expect(modal.prop('onRequestClose')).toBeFalsy();
      var closeBtn = wrapper.find('Button');
      expect(closeBtn.prop('isDisabled')).toBe(true);
    });
  });
});