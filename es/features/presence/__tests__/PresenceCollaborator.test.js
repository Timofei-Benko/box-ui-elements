import React from 'react';
import { createIntl } from 'react-intl';
import { PresenceCollaboratorComponent as PresenceCollaborator, renderTimestampMessage } from '../PresenceCollaborator';
var intl = createIntl({});
describe('features/presence/PresenceCollaborator', function () {
  describe('renderTimestampMessage()', function () {
    test('should return null when interactionType is an unkown type', function () {
      var res = renderTimestampMessage(123, 'test1234', intl);
      expect(res).toEqual(null);
    });
    test('should not return null when interactionType is a known type', function () {
      var res = renderTimestampMessage(123, 'user.item_preview', intl);
      expect(res).not.toEqual(null);
    });
  });
  describe('render()', function () {
    test('should correctly render a collaborator', function () {
      var collaborator = {
        avatarUrl: '',
        id: '1',
        isActive: false,
        interactedAt: 999,
        interactionType: 'user.item_preview',
        name: 'e'
      };
      var wrapper = shallow(React.createElement(PresenceCollaborator, {
        collaborator: collaborator,
        intl: intl
      }));
      expect(wrapper.find('.bdl-PresenceCollaborator').length).toBe(1);
    });
  });
});