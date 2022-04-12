function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import sinon from 'sinon';
import SharedLinkSettingsModal from '../SharedLinkSettingsModal';
var sandbox = sinon.sandbox.create();
describe('features/shared-link-settings-modal/SharedLinkSettingsModal', function () {
  var canChangeVanityName = true;
  var vanityName = 'vanity';
  var serverURL = 'box.com/';
  var canChangePassword = true;
  var isPasswordAvailable = true;
  var isPasswordEnabled = false;
  var canChangeExpiration = true;
  var isDownloadAvailable = true;
  var canChangeDownload = true;
  var isDownloadEnabled = true;
  var directLink = 'box.com/download';
  var isDirectLinkAvailable = true;
  var isDirectLinkUnavailableDueToDownloadSettings = true;
  var isDirectLinkUnavailableDueToAccessPolicy = true;

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(SharedLinkSettingsModal, _extends({
      onSubmit: sandbox.stub(),
      canChangeVanityName: canChangeVanityName,
      item: {
        bannerPolicy: {
          body: 'test'
        },
        classification: 'internal',
        grantedPermissions: {
          itemShare: true
        },
        hideCollaborators: false,
        id: 12345,
        name: 'My Example Folder',
        type: 'folder',
        typedID: 'd_12345'
      },
      vanityName: vanityName,
      serverURL: serverURL,
      canChangePassword: canChangePassword,
      isPasswordAvailable: isPasswordAvailable,
      isPasswordEnabled: isPasswordEnabled,
      canChangeExpiration: canChangeExpiration,
      isDownloadAvailable: isDownloadAvailable,
      canChangeDownload: canChangeDownload,
      isDownloadEnabled: isDownloadEnabled,
      directLink: directLink,
      isDirectLinkAvailable: isDirectLinkAvailable,
      isDirectLinkUnavailableDueToDownloadSettings: isDirectLinkUnavailableDueToDownloadSettings,
      isDirectLinkUnavailableDueToAccessPolicy: isDirectLinkUnavailableDueToAccessPolicy
    }, props)));
  };

  describe('componentDidUpdate()', function () {
    test('should update errors in state when error props change', function () {
      var wrapper = getWrapper({
        expirationError: 'first error'
      });
      wrapper.setProps({
        expirationError: 'new error'
      });
      expect(wrapper.state('expirationError')).toEqual('new error');
    });
    test('should not update errors in state when error props do not change', function () {
      var wrapper = getWrapper({
        expirationError: 'first error'
      });
      wrapper.setState({
        expirationError: undefined
      });
      wrapper.setProps({
        directLink: 'hi'
      }); // unrelated prop

      expect(wrapper.state('expirationError')).toBeFalsy();
    });
  });
  describe('onSubmit()', function () {
    test('should preventDefault and call props.onSubmit', function () {
      var expirationDate = new Date();
      var formState = {
        expirationDate: expirationDate,
        isDownloadEnabled: true,
        isExpirationEnabled: true,
        isPasswordEnabled: true,
        password: 'password',
        vanityName: 'vanity'
      };
      var wrapper = getWrapper({
        onSubmit: sandbox.mock().withArgs({
          expirationTimestamp: expirationDate.getTime(),
          isDownloadEnabled: true,
          isExpirationEnabled: true,
          isPasswordEnabled: true,
          password: 'password',
          vanityName: 'vanity'
        })
      });
      wrapper.setState(formState);
      wrapper.instance().onSubmit({
        preventDefault: sandbox.mock()
      });
    });
  });
  describe('onVanityNameChange()', function () {
    test('should update state.vanityName', function () {
      var wrapper = getWrapper({
        vanityNameError: 'hi'
      });
      wrapper.instance().onVanityNameChange({
        target: {
          value: 'new val'
        }
      });
      expect(wrapper.state('vanityName')).toEqual('new val');
      expect(wrapper.state('vanityNameError')).toBeFalsy();
    });
  });
  describe('onPasswordChange()', function () {
    test('should update state.password', function () {
      var wrapper = getWrapper({
        passwordError: 'hey'
      });
      wrapper.instance().onPasswordChange({
        target: {
          value: 'new val'
        }
      });
      expect(wrapper.state('password')).toEqual('new val');
      expect(wrapper.state('passwordError')).toBeFalsy();
    });
  });
  describe('onPasswordCheckboxChange()', function () {
    test('should update state.isPasswordEnabled', function () {
      var wrapper = getWrapper();
      wrapper.instance().onPasswordCheckboxChange({
        target: {
          checked: true
        }
      });
      expect(wrapper.state('isPasswordEnabled')).toBe(true);
    });
  });
  describe('onExpirationDateChange()', function () {
    test('should set state.expirationDate', function () {
      var newDate = new Date();
      var wrapper = getWrapper({
        expirationError: 'hi'
      });
      wrapper.instance().onExpirationDateChange(newDate);
      expect(wrapper.state('expirationDate')).toEqual(newDate);
      expect(wrapper.state('expirationError')).toBeFalsy();
    });
  });
  describe('onExpirationCheckboxChange()', function () {
    test('should set state.isExpirationEnabled', function () {
      var wrapper = getWrapper();
      wrapper.instance().onExpirationCheckboxChange({
        target: {
          checked: true
        }
      });
      expect(wrapper.state('isExpirationEnabled')).toBe(true);
    });
  });
  describe('onAllowDownloadChange()', function () {
    test('should set state.isDownloadEnabled', function () {
      var wrapper = getWrapper();
      wrapper.instance().onAllowDownloadChange({
        target: {
          checked: true
        }
      });
      expect(wrapper.state('isDownloadEnabled')).toBe(true);
    });
  });
  describe('renderVanityNameSection()', function () {
    test('should render a VanityNameSection', function () {
      var wrapper = getWrapper();
      wrapper.setState({
        vanityName: 'another vanity name',
        vanityNameError: 'error'
      });
      var VanitySection = shallow(wrapper.instance().renderVanityNameSection());
      expect(VanitySection.length).toBe(1);
      expect(VanitySection.prop('canChangeVanityName')).toEqual(canChangeVanityName);
      expect(VanitySection.prop('vanityName')).toEqual('another vanity name');
      expect(VanitySection.prop('serverURL')).toEqual(serverURL);
      expect(VanitySection.prop('onChange')).toEqual(wrapper.instance().onVanityNameChange);
      expect(VanitySection.prop('error')).toEqual('error');
    });
    test('should not render VanityNameSection when hideVanityNameSection is true', function () {
      var wrapper = getWrapper({
        hideVanityNameSection: true
      });
      var VanityNameSection = wrapper.instance().renderVanityNameSection();
      expect(VanityNameSection).toBe(null);
    });
  });
  describe('renderPasswordSection()', function () {
    test('should render a PasswordSection', function () {
      var wrapper = getWrapper({
        isPasswordEnabled: false
      });
      wrapper.setState({
        password: 'another password',
        passwordError: 'error',
        isPasswordEnabled: true
      });
      var PasswordSection = shallow(wrapper.instance().renderPasswordSection());
      expect(PasswordSection.length).toBe(1);
      expect(PasswordSection.prop('canChangePassword')).toEqual(canChangePassword);
      expect(PasswordSection.prop('isPasswordAvailable')).toEqual(isPasswordAvailable);
      expect(PasswordSection.prop('isPasswordEnabled')).toBe(true);
      expect(PasswordSection.prop('isPasswordInitiallyEnabled')).toBe(false);
      expect(PasswordSection.prop('onPasswordChange')).toEqual(wrapper.instance().onPasswordChange);
      expect(PasswordSection.prop('onCheckboxChange')).toEqual(wrapper.instance().onPasswordCheckboxChange);
      expect(PasswordSection.prop('password')).toEqual('another password');
      expect(PasswordSection.prop('error')).toEqual('error');
    });
  });
  describe('renderExpirationSection()', function () {
    test('should render an ExpirationSection', function () {
      var expirationDate = new Date('11/7/17');
      var wrapper = getWrapper({
        expirationTimestamp: 123
      });
      wrapper.setState({
        expirationDate: expirationDate,
        expirationError: 'error',
        isExpirationEnabled: true
      });
      var section = wrapper.find('ExpirationSection');
      expect(section.length).toBe(1);
      expect(section.prop('canChangeExpiration')).toEqual(canChangeExpiration);
      expect(section.prop('expirationDate')).toEqual(expirationDate);
      expect(section.prop('isExpirationEnabled')).toBe(true);
      expect(section.prop('onCheckboxChange')).toEqual(wrapper.instance().onExpirationCheckboxChange);
      expect(section.prop('onExpirationDateChange')).toEqual(wrapper.instance().onExpirationDateChange);
      expect(section.prop('error')).toEqual('error');
    });
  });
  describe('renderAllowDownloadSection()', function () {
    test('should render an AllowDownloadSection', function () {
      var wrapper = getWrapper();
      wrapper.setState({
        isDownloadEnabled: false
      });
      var section = wrapper.find('AllowDownloadSection');
      expect(section.length).toBe(1);
      expect(section.prop('isDownloadAvailable')).toEqual(isDownloadAvailable);
      expect(section.prop('isDownloadEnabled')).toBe(false);
      expect(section.prop('canChangeDownload')).toEqual(canChangeDownload);
      expect(section.prop('directLink')).toEqual(directLink);
      expect(section.prop('isDirectLinkAvailable')).toEqual(isDirectLinkAvailable);
      expect(section.prop('isDirectLinkUnavailableDueToDownloadSettings')).toEqual(isDirectLinkUnavailableDueToDownloadSettings);
      expect(section.prop('isDirectLinkUnavailableDueToAccessPolicy')).toEqual(isDirectLinkUnavailableDueToAccessPolicy);
      expect(section.prop('onChange')).toEqual(wrapper.instance().onAllowDownloadChange);
    });
  });
  describe('renderModalTitle()', function () {
    var wrapper = getWrapper();
    var title = shallow(wrapper.instance().renderModalTitle());
    expect(title).toMatchSnapshot();
  });
  describe('render()', function () {
    test('should render a Modal, form, close button, and save button', function () {
      var wrapper = getWrapper();
      var modal = wrapper.find('Modal');
      expect(modal.length).toBe(1);
      var form = wrapper.find('form');
      expect(form.length).toBe(1);
      expect(form.prop('onSubmit')).toEqual(wrapper.instance().onSubmit);
      var closeBtn = wrapper.find('ModalActions').find('Button');
      expect(closeBtn.length).toBe(1);
      var saveBtn = wrapper.find('ModalActions').find('PrimaryButton');
      expect(saveBtn.length).toBe(1);
    });
    test('should set loading state when props.submitting is true', function () {
      var wrapper = getWrapper({
        submitting: true
      });
      var closeBtn = wrapper.find('ModalActions').find('Button');
      expect(closeBtn.prop('isDisabled')).toBe(true);
      var saveBtn = wrapper.find('ModalActions').find('PrimaryButton');
      expect(saveBtn.prop('isDisabled')).toBe(true);
      expect(saveBtn.prop('isLoading')).toBe(true);
    });
    test('should show inaccessible settings notice when at least one setting is inaccessible', function () {
      var wrapper = getWrapper({
        canChangeDownload: false
      });
      expect(wrapper.find('InlineNotice').length).toBe(1);
    });
    test('should disable save button when all settings are inaccessible', function () {
      var wrapper = getWrapper({
        canChangeDownload: false,
        canChangeExpiration: false,
        canChangePassword: false,
        canChangeVanityName: false
      });
      expect(wrapper.find('PrimaryButton').prop('isDisabled')).toBe(true);
    });
  });
});