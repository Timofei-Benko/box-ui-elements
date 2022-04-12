function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { ITEM_TYPE_WEBLINK, ITEM_TYPE_FOLDER } from '../../../common/constants';
import { EDITOR, CO_OWNER, PREVIEWER, PREVIEWER_UPLOADER, VIEWER, VIEWER_UPLOADER, UPLOADER } from '../constants';
import InviteePermissionsMenu from '../InviteePermissionsMenu';
describe('features/unified-share-modal/InviteePermissionsMenu', function () {
  var inviteePermissions = [{
    value: 'Editor',
    text: 'Editor'
  }, {
    value: 'Co-owner',
    text: 'Co-owner'
  }, {
    value: 'Viewer Uploader',
    text: 'Viewer Uploader'
  }, {
    value: 'Previewer Uploader',
    text: 'Previewer Uploader'
  }, {
    value: 'Viewer',
    text: 'Viewer'
  }, {
    value: 'Previewer',
    text: 'Previewer'
  }, {
    value: 'Uploader',
    text: 'Uploader'
  }];

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(InviteePermissionsMenu, _extends({
      disabled: false,
      inviteePermissionLevel: "Editor",
      inviteePermissions: inviteePermissions
    }, props)));
  }; // TODO: wrap in a describe-render() block


  describe('render()', function () {
    [{
      disabled: true,
      inviteePermissionLevel: EDITOR
    }, {
      disabled: false,
      inviteePermissionLevel: EDITOR
    }, {
      disabled: true,
      inviteePermissionLevel: CO_OWNER
    }, {
      disabled: false,
      inviteePermissionLevel: CO_OWNER
    }, {
      disabled: true,
      inviteePermissionLevel: PREVIEWER
    }, {
      disabled: false,
      inviteePermissionLevel: PREVIEWER
    }, {
      disabled: true,
      inviteePermissionLevel: PREVIEWER_UPLOADER
    }, {
      disabled: false,
      inviteePermissionLevel: PREVIEWER_UPLOADER
    }, {
      disabled: true,
      inviteePermissionLevel: VIEWER
    }, {
      disabled: false,
      inviteePermissionLevel: VIEWER
    }, {
      disabled: true,
      inviteePermissionLevel: VIEWER_UPLOADER
    }, {
      disabled: false,
      inviteePermissionLevel: VIEWER_UPLOADER
    }, {
      disabled: false,
      inviteePermissionLevel: UPLOADER
    }, {
      disabled: true,
      inviteePermissionLevel: UPLOADER
    }].forEach(function (_ref) {
      var disabled = _ref.disabled,
          inviteePermissionLevel = _ref.inviteePermissionLevel;
      test('it should render correct menu', function () {
        var inviteePermissionMenu = getWrapper({
          disabled: disabled,
          inviteePermissionLevel: inviteePermissionLevel
        });
        expect(inviteePermissionMenu).toMatchSnapshot();
      });
    });
    [{
      itemType: ITEM_TYPE_WEBLINK
    }, {
      itemType: ITEM_TYPE_FOLDER
    }].forEach(function (_ref2) {
      var itemType = _ref2.itemType;
      test('should render the correct disabled tooltip', function () {
        var inviteePermissionMenu = getWrapper({
          disabled: true,
          itemType: itemType
        });
        expect(inviteePermissionMenu.find('Tooltip')).toMatchSnapshot();
      });
    });
  });
  describe('onChangeInviteePermissionsLevel', function () {
    test('should call change handler code on menu change', function () {
      var inviteePermissionLevelSpy = jest.fn();
      var inviteePermissionMenu = getWrapper({
        inviteePermissionLevel: EDITOR,
        changeInviteePermissionLevel: inviteePermissionLevelSpy
      });
      inviteePermissionMenu.instance().onChangeInviteePermissionsLevel(CO_OWNER);
      expect(inviteePermissionLevelSpy).toBeCalled();
    });
    test('should not call change handler code on menu change to same value', function () {
      var inviteePermissionLevelSpy = jest.fn();
      var inviteePermissionMenu = getWrapper({
        inviteePermissionLevel: CO_OWNER,
        changeInviteePermissionLevel: inviteePermissionLevelSpy
      });
      inviteePermissionMenu.instance().onChangeInviteePermissionsLevel(CO_OWNER);
      expect(inviteePermissionLevelSpy).not.toBeCalled();
    });
  });
});