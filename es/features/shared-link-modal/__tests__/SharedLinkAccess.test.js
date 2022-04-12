function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import SharedLinkAccess from '../SharedLinkAccess';
import { CAN_VIEW, PEOPLE_WITH_LINK, PEOPLE_IN_COMPANY, PEOPLE_IN_ITEM } from '../constants';
describe('features/shared-link-modal/SharedLinkAccess', function () {
  var _allowedAccessLevels;

  var accessLevel = PEOPLE_WITH_LINK;
  var allowedAccessLevels = (_allowedAccessLevels = {}, _defineProperty(_allowedAccessLevels, PEOPLE_WITH_LINK, true), _defineProperty(_allowedAccessLevels, PEOPLE_IN_COMPANY, true), _defineProperty(_allowedAccessLevels, PEOPLE_IN_ITEM, true), _allowedAccessLevels);

  var changeAccessLevel = function changeAccessLevel() {};

  var itemType = 'folder';

  var removeLink = function removeLink() {};

  var permissionLevel = CAN_VIEW;
  test('should render an AccessDescription, AccessMenu, and PermissionMenu', function () {
    var accessMenuButtonProps = {
      'data-resin-thing': 'menu'
    };
    var removeLinkButtonProps = {
      'data-resin-thing': 'remove'
    };
    var wrapper = shallow(React.createElement(SharedLinkAccess, {
      accessDropdownMenuProps: {
        constrainToWindow: true
      },
      accessLevel: accessLevel,
      accessMenuButtonProps: accessMenuButtonProps,
      allowedAccessLevels: allowedAccessLevels,
      changeAccessLevel: changeAccessLevel,
      itemType: itemType,
      permissionLevel: permissionLevel,
      removeLink: removeLink,
      removeLinkButtonProps: removeLinkButtonProps
    }));
    expect(wrapper).toMatchSnapshot();
  });
});