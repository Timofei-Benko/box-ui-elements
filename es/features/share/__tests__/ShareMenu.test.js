function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import sinon from 'sinon';
import ShareMenu, { OWNER_COOWNER_ONLY, INSUFFICIENT_PERMISSIONS } from '../ShareMenu';
var sandbox = sinon.sandbox.create();
describe('features/share/ShareMenu', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(ShareMenu, _extends({
      canInvite: true,
      canShare: true,
      isDownloadAllowed: true,
      isPreviewAllowed: true,
      onGetSharedLinkSelect: sandbox.stub(),
      onInviteCollabSelect: sandbox.stub()
    }, props)));
  };

  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  test('should render a Menu component with invite collab and get shared link options', function () {
    var wrapper = getWrapper({
      onGetSharedLinkSelect: sandbox.mock(),
      onInviteCollabSelect: sandbox.mock(),
      className: 'hello',
      'data-resin-prop': 'hey'
    });
    expect(wrapper.find('Menu').length).toBe(1);
    expect(wrapper.find('Menu').hasClass('hello')).toBe(true);
    expect(wrapper.find('Menu').prop('data-resin-prop')).toEqual('hey');
    expect(wrapper.find('MenuItem').length).toBe(2);
    expect(wrapper.find('IconInviteCollaborators').length).toBe(1);
    expect(wrapper.find('IconSharedLink').length).toBe(1);
    wrapper.find('.invite-collaborators').simulate('click');
    wrapper.find('.get-shared-link').simulate('click');
  });
  test('should disable "invite collaborators" option and render restricted icon when canInvite is false', function () {
    var wrapper = getWrapper({
      canInvite: false
    });
    expect(wrapper.find('.invite-collaborators').prop('isDisabled')).toBe(true);
    expect(wrapper.find('IconCollaboratorsRestricted').length).toBe(1);
  });
  test('should disable "get shared link" option and render restricted icon when canShare is false', function () {
    var wrapper = getWrapper({
      canShare: false
    });
    expect(wrapper.find('MenuItem').at(1).prop('isDisabled')).toBe(true);
    expect(wrapper.find('IconSharedLinkRestricted').length).toBe(1);
  });
  [// Owner Co owner only
  {
    inviteRestrictionCode: OWNER_COOWNER_ONLY,
    expectedMessage: 'boxui.shareMenu.ownerCoownerOnlyTooltip'
  }, // Insufficient Permissions
  {
    inviteRestrictionCode: INSUFFICIENT_PERMISSIONS,
    expectedMessage: 'boxui.shareMenu.insufficientPermissionsTooltip'
  }].forEach(function (_ref) {
    var inviteRestrictionCode = _ref.inviteRestrictionCode,
        expectedMessage = _ref.expectedMessage;
    test('should display correct tooltip when user cannot invite', function () {
      var wrapper = getWrapper({
        inviteRestrictionCode: inviteRestrictionCode,
        canInvite: false
      });
      var message = wrapper.find('Tooltip').prop('text').props.id;
      expect(message).toEqual(expectedMessage);
    });
  });
  [// View and Download
  {
    isDownloadAllowed: true,
    isPreviewAllowed: true,
    expectedMessage: 'boxui.shareMenu.viewAndDownload'
  }, // View Only
  {
    isDownloadAllowed: false,
    isPreviewAllowed: true,
    expectedMessage: 'boxui.shareMenu.viewOnly'
  }, // Download Only
  {
    isDownloadAllowed: true,
    isPreviewAllowed: false,
    expectedMessage: 'boxui.shareMenu.downloadOnly'
  }, // Shortcut Only
  {
    isDownloadAllowed: false,
    isPreviewAllowed: false,
    expectedMessage: 'boxui.shareMenu.shortcutOnly'
  }].forEach(function (_ref2) {
    var isDownloadAllowed = _ref2.isDownloadAllowed,
        isPreviewAllowed = _ref2.isPreviewAllowed,
        expectedMessage = _ref2.expectedMessage;
    test('should display correct permissions for shared link', function () {
      var wrapper = getWrapper({
        isDownloadAllowed: isDownloadAllowed,
        isPreviewAllowed: isPreviewAllowed
      });
      var message = wrapper.find('.get-shared-link .share-option-description').find('FormattedMessage').prop('id');
      expect(message).toEqual(expectedMessage);
    });
  });
});