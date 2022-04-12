function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            submitting\n            ", "\n            ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { ANYONE_WITH_LINK, ANYONE_IN_COMPANY } from '../constants';
import SharedLinkAccessMenu from '../SharedLinkAccessMenu';
describe('features/unified-share-modal/SharedLinkAccessMenu', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(SharedLinkAccessMenu, _extends({
      accessLevel: ANYONE_IN_COMPANY,
      changeAccessLevel: function changeAccessLevel() {},
      classificationName: "Internal",
      enterpriseName: "Box",
      isDownloadAllowed: true,
      isEditAllowed: true,
      isPreviewAllowed: true,
      itemType: "folder",
      onDismissTooltip: function onDismissTooltip() {},
      submitting: false,
      tooltipContent: null
    }, props)));
  };

  describe('render()', function () {
    test.each(_templateObject(), true, false)('should render correct menu when submitting is $submitting', function (_ref) {
      var submitting = _ref.submitting;
      var sharedLinkAccessMenu = getWrapper({
        submitting: submitting
      });
      expect(sharedLinkAccessMenu).toMatchSnapshot();
    });
    test('should render tooltipContent if provided', function () {
      var sharedLinkAccessMenu = getWrapper({
        tooltipContent: 'Hello, world!'
      });
      expect(sharedLinkAccessMenu).toMatchSnapshot();
    });
    test('should render no access level menu items if disabled by something other than access policy', function () {
      var sharedLinkAccessMenu = getWrapper({
        allowedAccessLevels: {
          peopleInThisItem: true,
          peopleInYourCompany: false,
          peopleWithTheLink: false
        }
      });
      expect(sharedLinkAccessMenu).toMatchSnapshot();
    });
    test('should render tooltips for access level menu items if disabled by access policy', function () {
      var sharedLinkAccessMenu = getWrapper({
        accessLevelsDisabledReason: {
          peopleInYourCompany: 'access_policy',
          peopleWithTheLink: 'access_policy'
        },
        allowedAccessLevels: {
          peopleInThisItem: true,
          peopleInYourCompany: false,
          peopleWithTheLink: false
        }
      });
      expect(sharedLinkAccessMenu).toMatchSnapshot();
    });
    test('should render tooltips for access level menu items if disabled by malicious content', function () {
      var sharedLinkAccessMenu = getWrapper({
        accessLevelsDisabledReason: {
          peopleInYourCompany: 'malicious_content',
          peopleWithTheLink: 'malicious_content'
        },
        allowedAccessLevels: {
          peopleInThisItem: true,
          peopleInYourCompany: false,
          peopleWithTheLink: false
        }
      });
      expect(sharedLinkAccessMenu).toMatchSnapshot();
    });
  });
  describe('onChangeAccessLevel()', function () {
    test('should call tracking function on menu change if it is set', function () {
      var changeMenuMock = jest.fn();
      var accessLevelSpy = jest.fn();
      var sharedLinkPermissionMenu = getWrapper({
        changeAccessLevel: accessLevelSpy,
        trackingProps: {
          onChangeSharedLinkAccessLevel: changeMenuMock
        }
      });
      sharedLinkPermissionMenu.instance().onChangeAccessLevel(ANYONE_WITH_LINK);
      expect(changeMenuMock).toBeCalled();
      expect(accessLevelSpy).toBeCalled();
    });
    test('should not call tracking function on menu change if it is set (when accessLevel is the same value)', function () {
      var changeMenuMock = jest.fn();
      var accessLevelSpy = jest.fn();
      var sharedLinkPermissionMenu = getWrapper({
        changeAccessLevel: accessLevelSpy,
        trackingProps: {
          onChangeSharedLinkAccessLevel: changeMenuMock
        }
      });
      sharedLinkPermissionMenu.instance().onChangeAccessLevel(ANYONE_IN_COMPANY);
      expect(changeMenuMock).not.toBeCalled();
      expect(accessLevelSpy).not.toBeCalled();
    });
  });
});