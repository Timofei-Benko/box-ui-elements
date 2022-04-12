function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n            extension | isCurrent | showPreview\n            ", " | ", "   | ", "\n            ", " | ", "   | ", "\n            ", " | ", "   | ", "\n            ", " | ", "   | ", "\n            ", " | ", "  | ", "\n            ", " | ", "  | ", "\n            ", " | ", "  | ", "\n            ", " | ", "  | ", "\n        "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n            versionLimit | versionNumber | isLimited\n            ", "         | ", "          | ", "\n            ", "         | ", "          | ", "\n            ", "         | ", "          | ", "\n            ", "         | ", "          | ", "\n            ", "        | ", "          | ", "\n            ", "       | ", "          | ", "\n            ", "  | ", "          | ", "\n            ", "  | ", "       | ", "\n        "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n            created_at     | restored_at    | trashed_at     | expected\n            ", " | ", "        | ", "        | ", "\n            ", " | ", " | ", "        | ", "\n            ", " | ", " | ", " | ", "\n            ", " | ", "        | ", " | ", "\n        "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n            versionUser                                         | expected\n            ", "                                      | ", "\n            ", "                                      | ", "\n            ", "                                      | ", "\n            ", " | ", "\n        "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n            versionUser         | expected\n            ", "      | ", "\n            ", "      | ", "\n            ", "      | ", "\n            ", " | ", "\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            permissions\n            ", "\n            ", "\n            ", "\n            ", "\n            ", "\n            ", "\n            ", "\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            action       | showDelete | showDownload | showPreview | showPromote | showRestore\n            ", "  | ", "   | ", "     | ", "    | ", "    | ", "\n            ", " | ", "    | ", "      | ", "     | ", "     | ", "\n            ", "  | ", "    | ", "      | ", "     | ", "     | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme/build';
import messages from '../messages';
import selectors from '../../../common/selectors/version';
import VersionsItem from '../VersionsItem';
import VersionsItemActions from '../VersionsItemActions';
import VersionsItemButton from '../VersionsItemButton';
import VersionsItemRetention from '../VersionsItemRetention';
import { ReadableTime } from '../../../../components/time';
import { FILE_REQUEST_NAME, PLACEHOLDER_USER, VERSION_UPLOAD_ACTION } from '../../../../constants';
jest.mock('../../../../utils/dom', function () {
  return _objectSpread({}, jest.requireActual('../../../../utils/dom'), {
    scrollIntoView: jest.fn()
  });
});
describe('elements/content-sidebar/versions/VersionsItem', function () {
  var defaultDate = new Date('2019-03-01T00:00:00');
  var defaultUser = {
    name: 'Test User',
    id: 10
  };
  var restoreDate = new Date('2019-05-01T00:00:00');
  var restoreUser = {
    name: 'Restore User',
    id: 12
  };
  var trashedDate = new Date('2019-04-01T00:00:00');
  var trashedUser = {
    name: 'Delete User',
    id: 11
  };
  var unknownUser = React.createElement(FormattedMessage, messages.versionUserUnknown);
  var defaults = {
    created_at: defaultDate,
    extension: 'docx',
    id: '12345',
    is_download_available: true,
    modified_at: defaultDate,
    modified_by: defaultUser,
    permissions: {
      can_delete: true,
      can_preview: true
    },
    size: 10240,
    version_number: '1'
  };

  var getVersion = function getVersion() {
    var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _objectSpread({}, defaults, {}, overrides);
  };

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(VersionsItem, _extends({
      fileId: "123",
      version: defaults
    }, props)));
  };

  beforeEach(function () {
    selectors.getVersionAction = jest.fn().mockReturnValue(VERSION_UPLOAD_ACTION);
    selectors.getVersionUser = jest.fn().mockReturnValue(defaultUser);
  });
  describe('render', function () {
    test.each(_templateObject(), 'delete', false, false, false, false, true, 'restore', true, true, true, true, false, 'upload', true, true, true, true, false)("should show actions correctly when the version's action is $action", function (_ref) {
      var action = _ref.action,
          showDelete = _ref.showDelete,
          showDownload = _ref.showDownload,
          showPreview = _ref.showPreview,
          showPromote = _ref.showPromote,
          showRestore = _ref.showRestore;
      selectors.getVersionAction.mockReturnValueOnce(action);
      var wrapper = getWrapper({
        version: getVersion({
          permissions: {
            can_delete: true,
            can_download: true,
            can_preview: true,
            can_upload: true
          }
        })
      });
      var actions = wrapper.find(VersionsItemActions);
      var button = wrapper.find(VersionsItemButton);
      expect(button.prop('isDisabled')).toBe(!showPreview);
      expect(actions.prop('showDelete')).toBe(showDelete);
      expect(actions.prop('showDownload')).toBe(showDownload);
      expect(actions.prop('showPromote')).toBe(showPromote);
      expect(actions.prop('showPreview')).toBe(showPreview);
      expect(actions.prop('showRestore')).toBe(showRestore);
      expect(wrapper.find(ReadableTime)).toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });
    test.each(_templateObject2(), {
      can_delete: true,
      can_download: true,
      can_preview: true,
      can_upload: true
    }, {
      can_delete: true,
      can_download: true,
      can_preview: true,
      can_upload: false
    }, {
      can_delete: true,
      can_download: true,
      can_preview: false,
      can_upload: false
    }, {
      can_delete: true,
      can_download: false,
      can_preview: false,
      can_upload: false
    }, {
      can_delete: false,
      can_download: true,
      can_preview: false,
      can_upload: false
    }, {
      can_delete: false,
      can_download: false,
      can_preview: true,
      can_upload: false
    }, {
      can_delete: false,
      can_download: false,
      can_preview: false,
      can_upload: true
    })('should show the correct menu items based on permissions', function (_ref2) {
      var permissions = _ref2.permissions;
      var wrapper = getWrapper({
        version: getVersion({
          permissions: permissions
        })
      });
      var actions = wrapper.find(VersionsItemActions);
      var button = wrapper.find(VersionsItemButton);
      expect(button.prop('isDisabled')).toBe(!permissions.can_preview);
      expect(actions.prop('showDelete')).toBe(permissions.can_delete);
      expect(actions.prop('showDownload')).toBe(permissions.can_download);
      expect(actions.prop('showPromote')).toBe(permissions.can_upload);
      expect(actions.prop('showPreview')).toBe(permissions.can_preview);
      expect(wrapper.find(ReadableTime)).toBeTruthy();
    });
    test('should render a selected version correctly', function () {
      var wrapper = getWrapper({
        isSelected: true
      });
      var actions = wrapper.find(VersionsItemActions);
      var button = wrapper.find(VersionsItemButton);
      expect(actions.prop('showPreview')).toBe(false);
      expect(button.prop('isSelected')).toBe(true);
    });
    test.each(_templateObject3(), defaultUser, defaultUser.name, restoreUser, restoreUser.name, trashedUser, trashedUser.name, PLACEHOLDER_USER, unknownUser)('should render the correct user name', function (_ref3) {
      var expected = _ref3.expected,
          versionUser = _ref3.versionUser;
      selectors.getVersionUser.mockReturnValue(versionUser);
      var wrapper = getWrapper();
      var result = wrapper.find('[data-testid="bcs-VersionsItem-log"]').find('FormattedMessage');
      expect(result.prop('values')).toEqual({
        name: expected
      });
    });
    test.each(_templateObject4(), defaultUser, defaultUser.name, restoreUser, restoreUser.name, trashedUser, trashedUser.name, _objectSpread({}, PLACEHOLDER_USER, {
      name: FILE_REQUEST_NAME
    }), React.createElement(FormattedMessage, messages.fileRequestDisplayName))('should render the correct user name if uploader_user_name present', function (_ref4) {
      var expected = _ref4.expected,
          versionUser = _ref4.versionUser;
      selectors.getVersionUser.mockReturnValueOnce(versionUser);
      var wrapper = getWrapper({
        version: _objectSpread({}, defaults, {
          uploader_display_name: FILE_REQUEST_NAME
        })
      });
      var result = wrapper.find('[data-testid="bcs-VersionsItem-log"]').find('FormattedMessage');
      expect(result.prop('values')).toEqual({
        name: expected
      });
    });
    test.each(_templateObject5(), defaultDate, null, null, defaultDate, defaultDate, restoreDate, null, restoreDate, defaultDate, restoreDate, trashedDate, restoreDate, defaultDate, null, trashedDate, trashedDate)('should render the correct date and time', function (_ref5) {
      var expected = _ref5.expected,
          created_at = _ref5.created_at,
          restored_at = _ref5.restored_at,
          trashed_at = _ref5.trashed_at;
      var wrapper = getWrapper({
        version: getVersion({
          created_at: created_at,
          restored_at: restored_at,
          trashed_at: trashed_at
        })
      });
      expect(wrapper.find(ReadableTime).prop('timestamp')).toEqual(expected.getTime());
    });
    test.each(_templateObject6(), 1, 1, true, 1, 5, true, 5, 3, true, 5, 7, false, 10, 1, false, 100, 3, false, Infinity, 3, false, Infinity, 3000, false)('should show version number $versionNumber with a limit of $versionLimit correctly', function (_ref6) {
      var isLimited = _ref6.isLimited,
          versionLimit = _ref6.versionLimit,
          versionNumber = _ref6.versionNumber;
      var wrapper = getWrapper({
        version: getVersion({
          action: 'upload',
          version_number: versionNumber
        }),
        versionCount: 10,
        versionLimit: versionLimit
      });
      var button = wrapper.find(VersionsItemButton);
      expect(button.prop('isDisabled')).toBe(isLimited);
      expect(wrapper.find(VersionsItemActions).length).toBe(isLimited ? 0 : 1);
    });
    test.each(_templateObject7(), 'docx', true, true, 'xlsb', true, true, 'xlsm', true, true, 'xlsx', true, true, 'docx', false, true, 'xlsb', false, false, 'xlsm', false, false, 'xlsx', false, false)('should restrict preview for non-current versions with extensions that could use the office viewer', function (_ref7) {
      var extension = _ref7.extension,
          isCurrent = _ref7.isCurrent,
          showPreview = _ref7.showPreview;
      var wrapper = getWrapper({
        isCurrent: isCurrent,
        version: getVersion({
          extension: extension
        })
      });
      expect(wrapper.find(VersionsItemActions).prop('showPreview')).toBe(showPreview);
      expect(wrapper.find(VersionsItemButton).prop('isDisabled')).toBe(!showPreview);
    });
    test('should disable preview if the file is watermarked', function () {
      var wrapper = getWrapper({
        isWatermarked: true
      });
      var actions = wrapper.find(VersionsItemActions);
      var button = wrapper.find(VersionsItemButton);
      expect(actions.prop('showPreview')).toBe(false);
      expect(button.prop('isDisabled')).toBe(true);
    });
    test('should disable actions as needed and render retention info if retention is provided', function () {
      var dispositionAt = new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000); // Future time

      var wrapper = getWrapper({
        version: getVersion({
          retention: {
            applied_at: defaultDate,
            disposition_at: dispositionAt,
            winning_retention_policy: {
              disposition_action: 'permanently_delete'
            }
          }
        })
      });
      expect(wrapper.exists(VersionsItemRetention)).toBe(true);
      expect(wrapper.find(VersionsItemActions).prop('isRetained')).toBe(true);
    });
  });
});