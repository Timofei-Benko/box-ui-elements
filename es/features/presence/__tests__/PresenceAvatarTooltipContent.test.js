function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { createIntl } from 'react-intl';
import { shallow } from 'enzyme';
import collaboratorList from '../__mocks__/collaborators'; // @ts-ignore flow import

import messages from '../messages';
import { PresenceAvatarTooltipContentComponent as PresenceAvatarTooltipContent } from '../PresenceAvatarTooltipContent';
var intl = createIntl({
  locale: 'en'
});
describe('features/presence/PresenceAvatarTooltipContent', function () {
  var collaborator = collaboratorList[0];

  var getDefaults = function getDefaults() {
    return _objectSpread({
      intl: intl
    }, collaborator);
  };

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(PresenceAvatarTooltipContent, _extends({}, getDefaults(), props)));
  };

  beforeEach(function () {
    jest.spyOn(Date, 'now').mockImplementation(function () {
      return 1000;
    });
  });
  describe('render()', function () {
    test('should render the name if interaction type is not preview', function () {
      var wrapper = getWrapper(_objectSpread({}, collaborator, {
        interactionType: 'foo'
      }));
      expect(wrapper.find('.bdl-PresenceAvatarTooltipContent-name').text()).toBe('e');
      expect(wrapper.exists('.bdl-PresenceAvatarTooltipContent-event')).toBe(false);
    });
    test('should render the active now message if collaborator is active', function () {
      var wrapper = getWrapper(_objectSpread({}, collaborator, {
        isActive: true
      }));
      expect(wrapper.find('FormattedMessage').props()).toEqual(messages.activeNowText);
    });
    test('should render the last action message if collaborator is not active', function () {
      var wrapper = getWrapper(_objectSpread({}, collaborator, {
        isActive: false
      }));
      expect(wrapper.find('FormattedMessage').props()).toMatchObject(_objectSpread({}, messages.timeSinceLastPreviewedText, {
        values: {
          timeAgo: '1 second ago'
        }
      }));
    });
  });
});