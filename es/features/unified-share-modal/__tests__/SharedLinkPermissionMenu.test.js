function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            canShow  | length | should\n            ", "  | ", "   | ", "\n            ", " | ", "   | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import { CAN_EDIT, CAN_VIEW_DOWNLOAD, CAN_VIEW_ONLY } from '../constants';
import SharedLinkPermissionMenu from '../SharedLinkPermissionMenu';
describe('features/unified-share-modal/SharedLinkPermissionMenu', function () {
  var allowedPermissionLevels = [CAN_EDIT, CAN_VIEW_DOWNLOAD, CAN_VIEW_ONLY];
  var defaultSharedLinkEditTagTargetingApi = {
    canShow: false
  };
  describe('render()', function () {
    [{
      submitting: true,
      permissionLevel: CAN_EDIT
    }, {
      submitting: false,
      permissionLevel: CAN_EDIT
    }, {
      submitting: true,
      permissionLevel: CAN_VIEW_DOWNLOAD
    }, {
      submitting: false,
      permissionLevel: CAN_VIEW_DOWNLOAD
    }, {
      submitting: true,
      permissionLevel: CAN_VIEW_ONLY
    }, {
      submitting: false,
      permissionLevel: CAN_VIEW_ONLY
    }].forEach(function (_ref) {
      var submitting = _ref.submitting,
          permissionLevel = _ref.permissionLevel;
      test('it should render correct menu', function () {
        var sharedLinkPermissionMenu = shallow(React.createElement(SharedLinkPermissionMenu, {
          allowedPermissionLevels: allowedPermissionLevels,
          canChangePermissionLevel: true,
          changePermissionLevel: function changePermissionLevel() {},
          permissionLevel: permissionLevel,
          sharedLinkEditTagTargetingApi: defaultSharedLinkEditTagTargetingApi,
          submitting: submitting
        }));
        expect(sharedLinkPermissionMenu).toMatchSnapshot();
      });
    });
    test('should not render if permission level prop is not set', function () {
      var emptySharedLinkPermissionMenu = shallow(React.createElement(SharedLinkPermissionMenu, {
        allowedPermissionLevels: allowedPermissionLevels,
        canChangePermissionLevel: true,
        changePermissionLevel: function changePermissionLevel() {},
        permissionLevel: "",
        sharedLinkEditTagTargetingApi: defaultSharedLinkEditTagTargetingApi,
        submitting: false
      }));
      expect(emptySharedLinkPermissionMenu).toMatchSnapshot();
    });
    test.each(_templateObject(), true, 1, 'should render LabelPillText if canShow is true', false, 0, 'should not render LabelPillText if canShow is false')('$should ', function (_ref2) {
      var canShow = _ref2.canShow,
          length = _ref2.length;
      var wrapper = shallow(React.createElement(SharedLinkPermissionMenu, {
        allowedPermissionLevels: allowedPermissionLevels,
        changePermissionLevel: function changePermissionLevel() {},
        permissionLevel: CAN_EDIT,
        sharedLinkEditTagTargetingApi: {
          canShow: canShow
        },
        submitting: false
      }));
      expect(wrapper.find('LabelPillText')).toHaveLength(length);
    });
  });
  describe('onChangePermissionLevel()', function () {
    test('should call tracking function and handler on menu change if it is set', function () {
      var changeMenuMock = jest.fn();
      var permissionLevelSpy = jest.fn();
      var sharedLinkPermissionMenu = shallow(React.createElement(SharedLinkPermissionMenu, {
        allowedPermissionLevels: allowedPermissionLevels,
        canChangePermissionLevel: false,
        changePermissionLevel: permissionLevelSpy,
        permissionLevel: CAN_VIEW_DOWNLOAD,
        sharedLinkEditTagTargetingApi: defaultSharedLinkEditTagTargetingApi,
        submitting: false,
        trackingProps: {
          onChangeSharedLinkPermissionLevel: changeMenuMock
        }
      }));
      sharedLinkPermissionMenu.instance().onChangePermissionLevel(CAN_VIEW_ONLY);
      expect(changeMenuMock).toBeCalled();
      expect(permissionLevelSpy).toBeCalled();
    });
    test('should not call tracking function or handler on menu change if it is set (when the permissionLevel has not changed)', function () {
      var changeMenuMock = jest.fn();
      var permissionLevelSpy = jest.fn();
      var sharedLinkPermissionMenu = shallow(React.createElement(SharedLinkPermissionMenu, {
        allowedPermissionLevels: allowedPermissionLevels,
        canChangePermissionLevel: false,
        changePermissionLevel: permissionLevelSpy,
        permissionLevel: CAN_VIEW_ONLY,
        sharedLinkEditTagTargetingApi: defaultSharedLinkEditTagTargetingApi,
        submitting: false,
        trackingProps: {
          onChangeSharedLinkPermissionLevel: changeMenuMock
        }
      }));
      sharedLinkPermissionMenu.instance().onChangePermissionLevel(CAN_VIEW_ONLY);
      expect(changeMenuMock).not.toBeCalled();
      expect(permissionLevelSpy).not.toBeCalled();
    });
  });
});