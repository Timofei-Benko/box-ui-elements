function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PresenceAvatar from '../PresenceAvatar';
describe('features/presence/PresenceAvatar', function () {
  describe('render()', function () {
    test('should correctly render an inactive collaborator', function () {
      var inactiveCollaborator = {
        avatarUrl: '',
        id: '5',
        isActive: false,
        name: 'a'
      };
      var wrapper = shallow(React.createElement(PresenceAvatar, inactiveCollaborator));
      expect(wrapper.find('.presence-avatar').length).toBe(1);
      expect(wrapper.find('.presence-avatar.is-active').length).toBe(0);
    });
    test('should correctly render an active collaborator', function () {
      var activeCollaborator = {
        avatarUrl: '',
        id: '5',
        isActive: true,
        name: 'a'
      };
      var wrapper = shallow(React.createElement(PresenceAvatar, activeCollaborator));
      expect(wrapper.find('.presence-avatar').length).toBe(1);
      expect(wrapper.find('.presence-avatar.is-active').length).toBe(1);
    });
    test('should pass through additional attributes when specified', function () {
      var avatarAttr = {
        'data-resin-target': 'avatar'
      };
      var activeCollaborator = {
        avatarUrl: '',
        id: '5',
        isActive: true,
        name: 'a'
      };
      var wrapper = shallow(React.createElement(PresenceAvatar, _extends({}, avatarAttr, activeCollaborator)));
      expect(wrapper.find('.presence-avatar').prop('data-resin-target')).toEqual('avatar');
    });
  });
});