function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { shallow } from 'enzyme';
import collaboratorList from '../__mocks__/collaborators'; // @ts-ignore flow import

import PresenceAvatar from '../PresenceAvatar';
import Tooltip from '../../../components/tooltip';
import { PresenceAvatarListComponent as PresenceAvatarList } from '../PresenceAvatarList';
describe('features/presence/PresenceAvatarList', function () {
  var getDefaults = function getDefaults() {
    return {
      collaborators: collaboratorList
    };
  };

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(PresenceAvatarList, _extends({}, getDefaults(), props)));
  };

  describe('render()', function () {
    test('should correctly render empty state', function () {
      var wrapper = getWrapper({
        collaborators: []
      });
      expect(wrapper.exists('.bdl-PresenceAvatarList')).toBe(false);
    });
    test('should correctly render collaborators without additional count when number of collaborators is less than or equal to maxDisplayedAvatars', function () {
      var maxDisplayedAvatars = 3;
      var wrapper = getWrapper({
        collaborators: collaboratorList.slice(0, maxDisplayedAvatars),
        maxDisplayedAvatars: maxDisplayedAvatars
      });
      expect(wrapper.find(PresenceAvatar).length).toBe(maxDisplayedAvatars);
      expect(wrapper.exists('.bdl-PresenceAvatarList-count')).toBe(false);
    });
    test('should correctly render collaborators with additional count when number of collaborators is greater than maxDisplayedAvatars', function () {
      var maxDisplayedAvatars = 3;
      var wrapper = getWrapper({
        maxDisplayedAvatars: maxDisplayedAvatars
      });
      expect(wrapper.find(PresenceAvatar).length).toBe(maxDisplayedAvatars);
      expect(wrapper.exists('.bdl-PresenceAvatarList-count')).toBe(true);
    });
    test('should hide additional count if hideAdditionalCount is specified', function () {
      var maxDisplayedAvatars = 3;
      var wrapper = getWrapper({
        hideAdditionalCount: true,
        maxDisplayedAvatars: maxDisplayedAvatars
      });
      expect(wrapper.exists('.bdl-PresenceAvatarList')).toBe(true);
      expect(wrapper.find(PresenceAvatar).length).toBe(maxDisplayedAvatars);
      expect(wrapper.exists('.bdl-PresenceAvatarList-count')).toBe(false);
    });
    test.each(['focus', 'mouseenter'])('should show tooltip when correponding avatar encounters %s event', function (event) {
      var onAvatarMouseEnter = jest.fn();
      var wrapper = getWrapper({
        onAvatarMouseEnter: onAvatarMouseEnter
      });
      expect(wrapper.find(Tooltip).first().prop('isShown')).toBe(false); // Trigger event on the first avatar

      wrapper.find(PresenceAvatar).first().simulate(event);
      expect(onAvatarMouseEnter).toHaveBeenCalledWith('1');
      expect(wrapper.find(Tooltip).first().prop('isShown')).toBe(true);
    });
    test.each(['blur', 'mouseleave'])('should hide tooltip when correponding avatar encounters %s event', function (event) {
      var onAvatarMouseLeave = jest.fn();
      var wrapper = getWrapper({
        onAvatarMouseLeave: onAvatarMouseLeave
      }); // Cause the tooltip to show

      wrapper.find(PresenceAvatar).first().simulate('focus');
      expect(wrapper.find(Tooltip).first().prop('isShown')).toBe(true); // Trigger event on the first avatar

      wrapper.find(PresenceAvatar).first().simulate(event);
      expect(onAvatarMouseLeave).toHaveBeenCalled();
      expect(wrapper.find(Tooltip).first().prop('isShown')).toBe(false);
    });
    test('should pass through additional attributes when specified', function () {
      var avatarAttr = {
        'data-resin-target': 'avatar'
      };
      var wrapper = getWrapper({
        avatarAttributes: avatarAttr,
        'data-resin-feature': 'presence'
      });
      expect(wrapper.find('.bdl-PresenceAvatarList').prop('data-resin-feature')).toEqual('presence');
      expect(wrapper.find(PresenceAvatar).first().prop('data-resin-target')).toEqual('avatar');
    });
    test('should correctly render collaborators with additional count when number of collaborators is greater than maxAddionalCollaboratorsNum + maxDisplayedAvatars', function () {
      var maxDisplayedAvatars = 2;
      var maxAdditionalCollaborators = 1;
      var wrapper = getWrapper({
        maxAdditionalCollaborators: maxAdditionalCollaborators,
        maxDisplayedAvatars: maxDisplayedAvatars
      });
      expect(wrapper.find(PresenceAvatar).length).toBe(maxDisplayedAvatars);
      expect(wrapper.find('.bdl-PresenceAvatarList-count').text()).toBe('1+');
    });
    test('should correctly render collaborators with additional count when number of collaborators is less than maxAddionalCollaboratorsNum + maxDisplayedAvatars', function () {
      var maxDisplayedAvatars = 2;
      var maxAdditionalCollaborators = 10;
      var wrapper = getWrapper({
        maxAdditionalCollaborators: maxAdditionalCollaborators,
        maxDisplayedAvatars: maxDisplayedAvatars
      });
      expect(wrapper.find(PresenceAvatar).length).toBe(maxDisplayedAvatars);
      expect(wrapper.find('.bdl-PresenceAvatarList-count').text()).toBe('+3');
    });
  });
});