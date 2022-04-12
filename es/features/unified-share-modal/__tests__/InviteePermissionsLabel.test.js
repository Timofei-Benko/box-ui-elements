import React from 'react';
import { EDITOR, CO_OWNER, PREVIEWER, PREVIEWER_UPLOADER, VIEWER, VIEWER_UPLOADER, UPLOADER } from '../constants';
import InviteePermissionsLabel from '../InviteePermissionsLabel';
describe('features/unified-share-modal/InviteePermissionsLabel', function () {
  [{
    hasDescription: true,
    inviteePermissionLevel: EDITOR
  }, {
    hasDescription: false,
    inviteePermissionLevel: EDITOR
  }, {
    hasDescription: true,
    inviteePermissionLevel: CO_OWNER
  }, {
    hasDescription: false,
    inviteePermissionLevel: CO_OWNER
  }, {
    hasDescription: true,
    inviteePermissionLevel: PREVIEWER
  }, {
    hasDescription: false,
    inviteePermissionLevel: PREVIEWER
  }, {
    hasDescription: true,
    inviteePermissionLevel: PREVIEWER_UPLOADER
  }, {
    hasDescription: false,
    inviteePermissionLevel: PREVIEWER_UPLOADER
  }, {
    hasDescription: true,
    inviteePermissionLevel: VIEWER
  }, {
    hasDescription: false,
    inviteePermissionLevel: VIEWER
  }, {
    hasDescription: true,
    inviteePermissionLevel: VIEWER_UPLOADER
  }, {
    hasDescription: false,
    inviteePermissionLevel: VIEWER_UPLOADER
  }, {
    hasDescription: true,
    inviteePermissionLevel: UPLOADER
  }, {
    hasDescription: false,
    inviteePermissionLevel: UPLOADER
  }].forEach(function (_ref) {
    var hasDescription = _ref.hasDescription,
        inviteePermissionLevel = _ref.inviteePermissionLevel;
    test('it should render correct label and description (if applicable)', function () {
      var inviteePermissionLabel = shallow(React.createElement(InviteePermissionsLabel, {
        hasDescription: hasDescription,
        inviteePermissionLevel: inviteePermissionLevel
      }));
      expect(inviteePermissionLabel).toMatchSnapshot();
    });
  });
});