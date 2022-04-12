function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import React from 'react';
import defaultCollaborators from '../__mocks__/collaborators';
import PresenceLink from '../PresenceLink';
var collaboratorList = [].concat(_toConsumableArray(defaultCollaborators), [{
  avatarUrl: '',
  id: '6',
  interactedAt: 999,
  isActive: true,
  interactionType: 'user.item_preview',
  name: 'f'
}]);
describe('features/presence/PresenceLink', function () {
  describe('render()', function () {
    test('should correctly render empty state', function () {
      var collaborators = [];
      var wrapper = shallow(React.createElement(PresenceLink, {
        collaborators: collaborators
      }, "Others"));
      expect(wrapper.find('.presence-link-container').length).toBe(0);
      expect(wrapper.find('.PresenceCollaboratorsList').length).toBe(0);
      expect(wrapper).toMatchSnapshot();
    });
    test('should correctly render collaborators when number of collaborators is greater or equal to 1', function () {
      var wrapper = shallow(React.createElement(PresenceLink, {
        collaborators: collaboratorList
      }, "Others"));
      expect(wrapper.find('.presence-link-container').length).toBe(1);
      expect(wrapper.find('PresenceCollaboratorsList').length).toBe(1);
      expect(wrapper).toMatchSnapshot();
    });
    test('should pass through additional attributes when specified', function () {
      var containerAttr = {
        'data-resin-feature': 'presence'
      };
      var wrapper = shallow(React.createElement(PresenceLink, {
        collaborators: collaboratorList,
        containerAttributes: containerAttr
      }, "Others"));
      expect(wrapper.find('.presence-link-container').prop('data-resin-feature')).toEqual('presence');
      expect(wrapper.find('PresenceCollaboratorsList').length).toBe(1);
      expect(wrapper).toMatchSnapshot();
    });
    test('should change the flyoutPosition', function () {
      var containerAttr = {
        'data-resin-feature': 'presence'
      };
      var wrapper = shallow(React.createElement(PresenceLink, {
        collaborators: collaboratorList,
        containerAttributes: containerAttr,
        flyoutPosition: "bottom-right"
      }, "Others"));
      expect(wrapper.find('.presence-link-container').prop('data-resin-feature')).toEqual('presence');
      expect(wrapper.find('PresenceCollaboratorsList').length).toBe(1);
      expect(wrapper).toMatchSnapshot();
    });
  });
});