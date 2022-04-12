function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n            itemType       | buttonIndex | invokedFunctionArg                 | errorFn                        | description\n            ", "   | ", "        | ", "               | ", " | ", "\n            ", "   | ", "        | ", "         | ", " | ", "\n            ", "   | ", "        | ", "                       | ", " | ", "\n            ", "   | ", "        | ", "                       | ", " | ", "\n            ", "   | ", "        | ", " | ", " | ", "\n            ", " | ", "        | ", "               | ", " | ", "\n            ", " | ", "        | ", "         | ", " | ", "\n            ", " | ", "        | ", "                       | ", " | ", "\n            ", " | ", "        | ", "                       | ", " | ", "\n            ", " | ", "        | ", " | ", " | ", "\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            itemType       | buttonIndex | invokedFunctionArg                 | sharedLinkData                              | permissions                | description\n            ", "   | ", "        | ", "         | ", " | ", " | ", "\n            ", "   | ", "        | ", " | ", "          | ", "   | ", "\n            ", " | ", "        | ", "         | ", " | ", " | ", "\n            ", " | ", "        | ", " | ", "          | ", "   | ", "\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            itemType       | buttonIndex | invokedFunctionArg   | shareAccess          | description\n            ", "   | ", "        | ", " | ", " | ", "\n            ", "   | ", "        | ", "         | ", "         | ", "\n            ", " | ", "        | ", " | ", " | ", "\n            ", " | ", "        | ", "         | ", "         | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import API from '../../../api';
import useSharedLink from '../hooks/useSharedLink';
import { ACCESS_NONE, PERMISSION_CAN_DOWNLOAD, TYPE_FILE, TYPE_FOLDER } from '../../../constants';
import { MOCK_ITEM_API_RESPONSE, MOCK_ITEM_ID, MOCK_ITEM_PERMISSIONS, MOCK_SETTINGS_WITH_ALL_FEATURES } from '../../../features/unified-share-modal/utils/__mocks__/USMMocks';
import { ANYONE_IN_COMPANY, CAN_VIEW_DOWNLOAD, PEOPLE_IN_ITEM } from '../../../features/unified-share-modal/constants';
import { CONTENT_SHARING_SHARED_LINK_UPDATE_PARAMS } from '../constants';
var handleRemoveSharedLinkError = jest.fn();
var handleUpdateSharedLinkError = jest.fn();
var handleRemoveSharedLinkSuccess = jest.fn().mockReturnValue(MOCK_ITEM_API_RESPONSE);
var handleUpdateSharedLinkSuccess = jest.fn().mockReturnValue(MOCK_ITEM_API_RESPONSE);

function FakeComponent(_ref) {
  var api = _ref.api,
      itemType = _ref.itemType,
      _ref$permissions = _ref.permissions,
      permissions = _ref$permissions === void 0 ? MOCK_ITEM_PERMISSIONS : _ref$permissions,
      options = _ref.options;

  var _React$useState = React.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      onAddLink = _React$useState2[0],
      setOnAddLink = _React$useState2[1];

  var _React$useState3 = React.useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      onRemoveLink = _React$useState4[0],
      setOnRemoveLink = _React$useState4[1];

  var _React$useState5 = React.useState(null),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      changeSharedLinkAccessLevel = _React$useState6[0],
      setChangeSharedLinkAccessLevel = _React$useState6[1];

  var _React$useState7 = React.useState(null),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      changeSharedLinkPermissionLevel = _React$useState8[0],
      setChangeSharedLinkPermissionLevel = _React$useState8[1];

  var _React$useState9 = React.useState(null),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      onSubmitSettings = _React$useState10[0],
      setOnSubmitSettings = _React$useState10[1];

  var _React$useState11 = React.useState(false),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      generatedFunctions = _React$useState12[0],
      setGeneratedFunctions = _React$useState12[1];

  var _useSharedLink = useSharedLink(api, MOCK_ITEM_ID, itemType, permissions, PEOPLE_IN_ITEM, options),
      updatedAccessFn = _useSharedLink.changeSharedLinkAccessLevel,
      updatedPermissionFn = _useSharedLink.changeSharedLinkPermissionLevel,
      updatedAddFn = _useSharedLink.onAddLink,
      updatedRemoveFn = _useSharedLink.onRemoveLink,
      updatedSettingsFn = _useSharedLink.onSubmitSettings;

  if (updatedAccessFn && updatedPermissionFn && updatedAddFn && updatedRemoveFn && updatedSettingsFn && !generatedFunctions) {
    setChangeSharedLinkAccessLevel(function () {
      return updatedAccessFn;
    });
    setChangeSharedLinkPermissionLevel(function () {
      return updatedPermissionFn;
    });
    setOnAddLink(function () {
      return updatedAddFn;
    });
    setOnRemoveLink(function () {
      return updatedRemoveFn;
    });
    setOnSubmitSettings(function () {
      return updatedSettingsFn;
    });
    setGeneratedFunctions(true);
  }

  return generatedFunctions && React.createElement(React.Fragment, null, React.createElement("button", {
    onClick: changeSharedLinkAccessLevel,
    type: "submit"
  }, "\u266B changeSharedLinkAccessLevel \u266B"), React.createElement("button", {
    onClick: changeSharedLinkPermissionLevel,
    type: "submit"
  }, "\u266B changeSharedLinkPermissionLevel \u266B"), React.createElement("button", {
    onClick: onAddLink,
    type: "submit"
  }, "\u266B onAddLink \u266B"), React.createElement("button", {
    onClick: onRemoveLink,
    type: "submit"
  }, "\u266B onRemoveLink \u266B"), React.createElement("button", {
    onClick: onSubmitSettings,
    type: "submit"
  }, "\u266B onSubmitSettings \u266B"));
}

FakeComponent.propTypes = {
  api: function api() {
    return (typeof API === "function" ? PropTypes.instanceOf(API).isRequired : PropTypes.any.isRequired).apply(this, arguments);
  },
  itemType: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  permissions: function permissions() {
    return (typeof BoxItemPermission === "function" ? PropTypes.instanceOf(BoxItemPermission).isRequired : PropTypes.any.isRequired).apply(this, arguments);
  }
};
describe('elements/content-sharing/hooks/useSharedLink', function () {
  var MOCK_ITEM_DATA = {
    id: MOCK_ITEM_ID,
    permissions: MOCK_ITEM_PERMISSIONS
  };
  var mockAPI;
  var share;
  var updateSharedLink;
  describe('with successful API calls', function () {
    beforeAll(function () {
      share = jest.fn().mockImplementation(function (dataForAPI, accessType, successFn) {
        return successFn(MOCK_ITEM_API_RESPONSE);
      });
      updateSharedLink = jest.fn().mockImplementation(function (dataForAPI, sharedLinkParams, successFn) {
        return successFn(MOCK_ITEM_API_RESPONSE);
      });
      mockAPI = {
        getFileAPI: jest.fn().mockReturnValue({
          share: share,
          updateSharedLink: updateSharedLink
        }),
        getFolderAPI: jest.fn().mockReturnValue({
          share: share,
          updateSharedLink: updateSharedLink
        })
      };
    });
    test.each(_templateObject(), TYPE_FILE, 0, ANYONE_IN_COMPANY, ANYONE_IN_COMPANY, 'changeSharedLinkAccessLevel', TYPE_FILE, 2, undefined, undefined, 'onAddLink', TYPE_FOLDER, 0, ANYONE_IN_COMPANY, ANYONE_IN_COMPANY, 'changeSharedLinkAccessLevel', TYPE_FOLDER, 2, undefined, undefined, 'onAddLink')('should set $description() and call success functions when invoked for a $itemType', function (_ref2) {
      var itemType = _ref2.itemType,
          buttonIndex = _ref2.buttonIndex,
          invokedFunctionArg = _ref2.invokedFunctionArg,
          shareAccess = _ref2.shareAccess;
      var fakeComponent;
      act(function () {
        fakeComponent = mount(React.createElement(FakeComponent, {
          api: mockAPI,
          itemType: itemType,
          permissions: MOCK_ITEM_PERMISSIONS,
          options: {
            handleUpdateSharedLinkError: handleUpdateSharedLinkError,
            handleUpdateSharedLinkSuccess: handleUpdateSharedLinkSuccess
          }
        }));
      });
      fakeComponent.update();
      var btn = fakeComponent.find('button').at(buttonIndex);
      expect(btn.prop('onClick')).toBeDefined();
      btn.invoke('onClick')(invokedFunctionArg);
      expect(share).toHaveBeenCalledWith(MOCK_ITEM_DATA, shareAccess, expect.anything(Function), handleUpdateSharedLinkError, CONTENT_SHARING_SHARED_LINK_UPDATE_PARAMS);
      expect(handleUpdateSharedLinkSuccess).toHaveBeenCalled();
    });
    test.each([TYPE_FILE, TYPE_FOLDER])('should set onRemoveLink() and call success functions when invoked for a %s', function (itemType) {
      var fakeComponent;
      act(function () {
        fakeComponent = mount(React.createElement(FakeComponent, {
          api: mockAPI,
          itemType: itemType,
          permissions: MOCK_ITEM_PERMISSIONS,
          options: {
            handleRemoveSharedLinkError: handleRemoveSharedLinkError,
            handleRemoveSharedLinkSuccess: handleRemoveSharedLinkSuccess
          }
        }));
      });
      fakeComponent.update();
      var btn = fakeComponent.find('button').at(3);
      expect(btn.prop('onClick')).toBeDefined();
      btn.invoke('onClick')();
      expect(share).toHaveBeenCalledWith(MOCK_ITEM_DATA, ACCESS_NONE, expect.anything(Function), handleRemoveSharedLinkError, CONTENT_SHARING_SHARED_LINK_UPDATE_PARAMS);
      expect(handleRemoveSharedLinkSuccess).toHaveBeenCalled();
    });
    test.each(_templateObject2(), TYPE_FILE, 1, PERMISSION_CAN_DOWNLOAD, {
      permissions: PERMISSION_CAN_DOWNLOAD
    }, PERMISSION_CAN_DOWNLOAD, 'changeSharedLinkPermissionLevel', TYPE_FILE, 4, MOCK_SETTINGS_WITH_ALL_FEATURES, MOCK_SETTINGS_WITH_ALL_FEATURES, MOCK_ITEM_PERMISSIONS, 'onSubmitSettings', TYPE_FOLDER, 1, PERMISSION_CAN_DOWNLOAD, {
      permissions: PERMISSION_CAN_DOWNLOAD
    }, PERMISSION_CAN_DOWNLOAD, 'changeSharedLinkPermissionLevel', TYPE_FOLDER, 4, MOCK_SETTINGS_WITH_ALL_FEATURES, MOCK_SETTINGS_WITH_ALL_FEATURES, MOCK_ITEM_PERMISSIONS, 'onSubmitSettings')('should set $description() and call success functions when invoked for a $itemType', function (_ref3) {
      var itemType = _ref3.itemType,
          buttonIndex = _ref3.buttonIndex,
          invokedFunctionArg = _ref3.invokedFunctionArg,
          sharedLinkData = _ref3.sharedLinkData,
          permissions = _ref3.permissions;
      var fakeComponent;
      act(function () {
        fakeComponent = mount(React.createElement(FakeComponent, {
          api: mockAPI,
          itemType: itemType,
          permissions: permissions,
          options: {
            handleUpdateSharedLinkError: handleUpdateSharedLinkError,
            handleUpdateSharedLinkSuccess: handleUpdateSharedLinkSuccess
          }
        }));
      });
      fakeComponent.update();
      var btn = fakeComponent.find('button').at(buttonIndex);
      expect(btn.prop('onClick')).toBeDefined();
      btn.invoke('onClick')(invokedFunctionArg);
      expect(updateSharedLink).toHaveBeenCalledWith({
        id: MOCK_ITEM_ID,
        permissions: permissions
      }, sharedLinkData, expect.anything(Function), handleUpdateSharedLinkError, CONTENT_SHARING_SHARED_LINK_UPDATE_PARAMS);
      expect(handleUpdateSharedLinkSuccess).toHaveBeenCalled();
    });
    var transformAccess = jest.fn();
    var transformPermissions = jest.fn();
    var transformSettings = jest.fn();
    test('should call transformAccess() when changeSharedLinkAccessLevel() is invoked', function () {
      var fakeComponent;
      act(function () {
        fakeComponent = mount(React.createElement(FakeComponent, {
          api: mockAPI,
          itemType: TYPE_FILE,
          permissions: MOCK_ITEM_PERMISSIONS,
          options: {
            handleUpdateSharedLinkError: handleUpdateSharedLinkError,
            transformAccess: transformAccess
          }
        }));
      });
      fakeComponent.update();
      var btn = fakeComponent.find('button').at(0);
      btn.invoke('onClick')(ANYONE_IN_COMPANY);
      expect(transformAccess).toHaveBeenCalledWith(ANYONE_IN_COMPANY);
    });
    test('should call transformPermissions() handler when changeSharedLinkPermissionsLevel() is invoked', function () {
      var fakeComponent;
      act(function () {
        fakeComponent = mount(React.createElement(FakeComponent, {
          api: mockAPI,
          itemType: TYPE_FILE,
          permissions: MOCK_ITEM_PERMISSIONS,
          options: {
            handleUpdateSharedLinkError: handleUpdateSharedLinkError,
            transformPermissions: transformPermissions
          }
        }));
      });
      fakeComponent.update();
      var btn = fakeComponent.find('button').at(1);
      btn.invoke('onClick')(CAN_VIEW_DOWNLOAD);
      expect(transformPermissions).toHaveBeenCalledWith(CAN_VIEW_DOWNLOAD);
    });
    test('should call transformSettings() when onSubmitSettings() is invoked', function () {
      var fakeComponent;
      act(function () {
        fakeComponent = mount(React.createElement(FakeComponent, {
          api: mockAPI,
          itemType: TYPE_FILE,
          permissions: MOCK_ITEM_PERMISSIONS,
          options: {
            handleUpdateSharedLinkError: handleUpdateSharedLinkError,
            transformSettings: transformSettings
          }
        }));
      });
      fakeComponent.update();
      var btn = fakeComponent.find('button').at(4);
      btn.invoke('onClick')(MOCK_SETTINGS_WITH_ALL_FEATURES);
      expect(transformSettings).toHaveBeenCalledWith(MOCK_SETTINGS_WITH_ALL_FEATURES, PEOPLE_IN_ITEM);
    });
  });
  describe('with failed API calls', function () {
    var createShareFailureMock = function createShareFailureMock() {
      return jest.fn().mockImplementation(function (dataForAPI, accessType, successFn, failureFn) {
        return failureFn();
      });
    };

    beforeAll(function () {
      share = createShareFailureMock();
      updateSharedLink = createShareFailureMock();
      mockAPI = {
        getFileAPI: jest.fn().mockReturnValue({
          share: share,
          updateSharedLink: updateSharedLink
        }),
        getFolderAPI: jest.fn().mockReturnValue({
          share: share,
          updateSharedLink: updateSharedLink
        })
      };
    });
    test.each(_templateObject3(), TYPE_FILE, 0, ANYONE_IN_COMPANY, handleUpdateSharedLinkError, 'changeSharedLinkAccessLevel', TYPE_FILE, 1, PERMISSION_CAN_DOWNLOAD, handleUpdateSharedLinkError, 'changeSharedLinkPermissionLevel', TYPE_FILE, 2, undefined, handleUpdateSharedLinkError, 'onAddLink', TYPE_FILE, 3, undefined, handleRemoveSharedLinkError, 'onRemoveLink', TYPE_FILE, 4, MOCK_SETTINGS_WITH_ALL_FEATURES, handleUpdateSharedLinkError, 'onSubmitSettings', TYPE_FOLDER, 0, ANYONE_IN_COMPANY, handleUpdateSharedLinkError, 'changeSharedLinkAccessLevel', TYPE_FOLDER, 1, PERMISSION_CAN_DOWNLOAD, handleUpdateSharedLinkError, 'changeSharedLinkPermissionLevel', TYPE_FOLDER, 2, undefined, handleUpdateSharedLinkError, 'onAddLink', TYPE_FOLDER, 3, undefined, handleRemoveSharedLinkError, 'onRemoveLink', TYPE_FOLDER, 4, MOCK_SETTINGS_WITH_ALL_FEATURES, handleUpdateSharedLinkError, 'onSubmitSettings')('should set $description() and call handleUpdateSharedLinkError() when invoked', function (_ref4) {
      var itemType = _ref4.itemType,
          buttonIndex = _ref4.buttonIndex,
          invokedFunctionArg = _ref4.invokedFunctionArg,
          errorFn = _ref4.errorFn;
      var fakeComponent;
      act(function () {
        fakeComponent = mount(React.createElement(FakeComponent, {
          api: mockAPI,
          itemType: itemType,
          options: {
            handleUpdateSharedLinkError: handleUpdateSharedLinkError,
            handleRemoveSharedLinkError: handleRemoveSharedLinkError
          }
        }));
      });
      fakeComponent.update();
      var btn = fakeComponent.find('button').at(buttonIndex);
      expect(btn.prop('onClick')).toBeDefined();
      btn.invoke('onClick')(invokedFunctionArg);
      expect(errorFn).toHaveBeenCalled();
    });
  });
});
import PropTypes from "prop-types";