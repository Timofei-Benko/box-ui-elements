function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n        versionUser                                         | expected\n        ", "                                      | ", "\n        ", "                                      | ", "\n        ", "                                      | ", "\n        ", " | ", "\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        versionUser         | expected\n        ", "      | ", "\n        ", "      | ", "\n        ", "      | ", "\n        ", " | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { shallow } from 'enzyme';
import selectors from '../../../../common/selectors/version';
import { VersionBase as Version } from '../Version';
import { FILE_REQUEST_NAME, PLACEHOLDER_USER, VERSION_UPLOAD_ACTION } from '../../../../../constants';
import messages from '../../../../common/messages';
var translationProps = {
  intl: {
    formatMessage: function formatMessage(anyString) {
      return anyString;
    }
  }
};
describe('elements/content-sidebar/ActivityFeed/version/Version', function () {
  var defaultDate = new Date('2019-03-01T00:00:00');
  var defaultUser = {
    name: 'Test User',
    id: 10
  };
  var restoreUser = {
    name: 'Restore User',
    id: 12
  };
  var trashedUser = {
    name: 'Delete User',
    id: 11
  };
  var defaults = {
    id: '12345',
    action: 'upload',
    created_at: defaultDate,
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

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(Version, _extends({}, defaults, props)));
  };

  beforeEach(function () {
    selectors.getVersionAction = jest.fn().mockReturnValueOnce(VERSION_UPLOAD_ACTION);
    selectors.getVersionUser = jest.fn().mockReturnValueOnce(defaultUser);
  });
  test('should correctly render version', function () {
    var version = {
      id: '148953',
      modified_at: Date.now(),
      modified_by: defaultUser,
      version_number: '1'
    };
    var wrapper = shallow(React.createElement(Version, _extends({}, version, translationProps)));
    expect(wrapper.hasClass('bcs-Version')).toBe(true);
  });
  test('should correctly render info icon if onInfo is passed', function () {
    var version = {
      id: '148953',
      modified_at: Date.now(),
      modified_by: defaultUser,
      onInfo: function onInfo() {},
      version_number: '1'
    };
    var wrapper = shallow(React.createElement(Version, _extends({}, version, translationProps)));
    expect(wrapper.exists('IconInfo')).toBe(true);
    expect(wrapper.hasClass('bcs-Version')).toBe(true);
  });
  test.each(_templateObject(), defaultUser, defaultUser.name, restoreUser, restoreUser.name, trashedUser, trashedUser.name, PLACEHOLDER_USER, '')('should render the correct user name', function (_ref) {
    var expected = _ref.expected,
        versionUser = _ref.versionUser;
    selectors.getVersionUser = jest.fn().mockReturnValueOnce(versionUser);
    var wrapper = getWrapper();
    expect(wrapper.find('FormattedMessage').prop('values')).toEqual({
      name: React.createElement("strong", null, expected),
      version_number: '1'
    });
  });
  test.each(_templateObject2(), defaultUser, defaultUser.name, restoreUser, restoreUser.name, trashedUser, trashedUser.name, _objectSpread({}, PLACEHOLDER_USER, {
    name: FILE_REQUEST_NAME
  }), messages.fileRequestDisplayName)('should render the correct user name if uploader_user_name present', function (_ref2) {
    var expected = _ref2.expected,
        versionUser = _ref2.versionUser;
    selectors.getVersionUser = jest.fn().mockReturnValueOnce(versionUser);
    var wrapper = getWrapper(_objectSpread({}, translationProps, {
      uploader_display_name: FILE_REQUEST_NAME
    }));
    expect(wrapper.find('FormattedMessage').prop('values')).toEqual({
      name: React.createElement("strong", null, expected),
      version_number: '1'
    });
  });
});