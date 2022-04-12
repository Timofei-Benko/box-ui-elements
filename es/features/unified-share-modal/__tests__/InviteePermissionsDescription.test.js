import React from 'react';
import { FormattedMessage } from 'react-intl';
import { EDITOR, CO_OWNER, PREVIEWER, PREVIEWER_UPLOADER, VIEWER, VIEWER_UPLOADER, UPLOADER } from '../constants';
import InviteePermissionsDescription from '../InviteePermissionsDescription';
describe('features/unified-share-modal/InviteePermissionsDescription', function () {
  [{
    inviteePermissionLevel: EDITOR
  }, {
    inviteePermissionLevel: CO_OWNER
  }, {
    inviteePermissionLevel: PREVIEWER
  }, {
    inviteePermissionLevel: PREVIEWER_UPLOADER
  }, {
    inviteePermissionLevel: VIEWER
  }, {
    inviteePermissionLevel: VIEWER_UPLOADER
  }, {
    inviteePermissionLevel: UPLOADER
  }].forEach(function (_ref) {
    var inviteePermissionLevel = _ref.inviteePermissionLevel;
    test('it should render correct description', function () {
      var inviteePermissionDescription = shallow(React.createElement(InviteePermissionsDescription, {
        inviteePermissionLevel: inviteePermissionLevel,
        itemType: "folder"
      }));
      expect(inviteePermissionDescription).toMatchSnapshot();
    });
  });
  test('it should render correct description for editors of files', function () {
    var inviteePermissionDescription = shallow(React.createElement(InviteePermissionsDescription, {
      inviteePermissionLevel: EDITOR,
      itemType: "file"
    }));
    expect(inviteePermissionDescription.find(FormattedMessage).prop('defaultMessage')).toBe('Upload, download, preview, share, and edit');
  });
});