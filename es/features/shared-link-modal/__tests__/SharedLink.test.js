function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import sinon from 'sinon';
import { SharedLinkBase as SharedLink } from '../SharedLink';
import { PEOPLE_WITH_LINK, PEOPLE_IN_COMPANY, PEOPLE_IN_ITEM } from '../constants';
var sandbox = sinon.sandbox.create();
describe('features/shared-link-modal/SharedLink', function () {
  var getWrapper = function getWrapper() {
    var _ref;

    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(SharedLink, _extends({
      accessLevel: PEOPLE_WITH_LINK,
      allowedAccessLevels: (_ref = {}, _defineProperty(_ref, PEOPLE_WITH_LINK, true), _defineProperty(_ref, PEOPLE_IN_COMPANY, true), _defineProperty(_ref, PEOPLE_IN_ITEM, true), _ref),
      canRemoveLink: true,
      changeAccessLevel: function changeAccessLevel() {},
      enterpriseName: "enterprise",
      intl: {
        formatMessage: function formatMessage() {
          return 'message';
        }
      },
      itemName: "filename.gif",
      itemType: "folder",
      onCopySuccess: function onCopySuccess() {},
      removeLink: function removeLink() {},
      sharedLink: "http://box.com"
    }, props)));
  };

  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  test('should render an IconExpirationInverted with a tooltip when expiration exists', function () {
    var wrapper = getWrapper({
      expiration: 1234
    });
    expect(wrapper.find('.shared-link-icons').find('Tooltip').length).toBe(1);
    expect(wrapper.find('IconExpirationInverted').length).toBe(1);
  });
  test('should not render an IconExpirationInverted when expiration does not exist', function () {
    var wrapper = getWrapper({
      expiration: undefined
    });
    expect(wrapper.find('IconExpirationInverted').length).toBe(0);
  });
  test('should render settings icon when handler is provided', function () {
    var wrapper = getWrapper({
      onSettingsClick: sandbox.mock(),
      settingsButtonProps: {
        'data-resin-target': 'settings'
      }
    });
    var btn = wrapper.find('.shared-link-settings-btn');
    btn.simulate('click');
    expect(btn).toMatchSnapshot();
  });
  test('should not render settings icon when handler not provided', function () {
    var wrapper = getWrapper({
      onSettingsClick: undefined
    });
    expect(wrapper.find('IconSettingInverted').length).toBe(0);
  });
  test('should render a TextInputWithCopyButton correctly', function () {
    var copyButtonProps = {
      'data-resin-thing': 'copy'
    };
    var wrapper = getWrapper({
      copyButtonProps: copyButtonProps
    });
    var input = wrapper.find('TextInputWithCopyButton');
    expect(input).toMatchSnapshot();
  });
  test('should render a SharedLinkAccess', function () {
    var accessMenuButtonProps = {
      'data-resin-thing': 'menu'
    };
    var removeLinkButtonProps = {
      'data-resin-thing': 'remove'
    };
    var wrapper = getWrapper({
      accessDropdownMenuProps: {
        constrainToWindow: true
      },
      accessMenuButtonProps: accessMenuButtonProps,
      removeLinkButtonProps: removeLinkButtonProps
    });
    var section = wrapper.find('SharedLinkAccess');
    expect(section).toMatchSnapshot();
  });
});