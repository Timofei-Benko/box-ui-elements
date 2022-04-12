function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            modified_by         | restored_by    | trashed_by     | uploader_display_name | expected\n            ", "             | ", "        | ", "        | ", "               | ", "\n            ", "             | ", "        | ", "        | ", "  | ", "\n            ", " | ", "        | ", "        | ", "               | ", "\n            ", " | ", "        | ", "        | ", "  | ", "\n            ", "      | ", "        | ", "        | ", "               | ", "\n            ", "      | ", " | ", "        | ", "               | ", "\n            ", "      | ", " | ", " | ", "               | ", "\n            ", "      | ", "        | ", " | ", "               | ", "\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            restored_at    | trashed_at     | version_promoted | expected\n            ", "        | ", "        | ", "          | ", "\n            ", " | ", "        | ", "          | ", "\n            ", " | ", " | ", "          | ", "\n            ", "        | ", "        | ", "           | ", "\n            ", "        | ", " | ", "          | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import selectors from '../version';
import { FILE_REQUEST_NAME, PLACEHOLDER_USER, VERSION_DELETE_ACTION, VERSION_PROMOTE_ACTION, VERSION_RESTORE_ACTION, VERSION_UPLOAD_ACTION } from '../../../../constants';
describe('elements/common/selectors/version', function () {
  var defaultUser = {
    name: 'Test User',
    id: 10
  };
  var restoreDate = '2019-04-01T00:00:00';
  var restoreUser = {
    name: 'Restore User',
    id: 12
  };
  var trashedDate = '2019-05-01T00:00:00';
  var trashedUser = {
    name: 'Delete User',
    id: 11
  };
  describe('getVersionAction()', function () {
    test.each(_templateObject(), null, null, null, VERSION_UPLOAD_ACTION, restoreDate, null, null, VERSION_RESTORE_ACTION, restoreDate, trashedDate, null, VERSION_RESTORE_ACTION, null, null, '1', VERSION_PROMOTE_ACTION, null, trashedDate, null, VERSION_DELETE_ACTION)('should return the most relevant action', function (_ref) {
      var expected = _ref.expected,
          restored_at = _ref.restored_at,
          trashed_at = _ref.trashed_at,
          version_promoted = _ref.version_promoted;
      var version = {
        restored_at: restored_at,
        trashed_at: trashed_at,
        version_promoted: version_promoted
      };
      expect(selectors.getVersionAction(version)).toEqual(expected);
    });
  });
  describe('getVersionUser()', function () {
    test.each(_templateObject2(), null, null, null, null, PLACEHOLDER_USER, null, null, null, FILE_REQUEST_NAME, _objectSpread({}, PLACEHOLDER_USER, {
      name: FILE_REQUEST_NAME
    }), PLACEHOLDER_USER, null, null, null, PLACEHOLDER_USER, PLACEHOLDER_USER, null, null, FILE_REQUEST_NAME, _objectSpread({}, PLACEHOLDER_USER, {
      name: FILE_REQUEST_NAME
    }), defaultUser, null, null, null, defaultUser, defaultUser, restoreUser, null, null, restoreUser, defaultUser, restoreUser, trashedUser, null, restoreUser, defaultUser, null, trashedUser, null, trashedUser)('should return the most relevant user', function (_ref2) {
      var expected = _ref2.expected,
          modified_by = _ref2.modified_by,
          restored_by = _ref2.restored_by,
          trashed_by = _ref2.trashed_by,
          uploader_display_name = _ref2.uploader_display_name;
      var version = {
        modified_by: modified_by,
        restored_by: restored_by,
        trashed_by: trashed_by,
        uploader_display_name: uploader_display_name
      };
      expect(selectors.getVersionUser(version)).toEqual(expected);
    });
  });
});