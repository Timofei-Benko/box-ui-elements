function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Versions from '../Versions';
import { PERMISSION_CAN_DELETE, PERMISSION_CAN_UPLOAD } from '../../constants';
import { FILE_VERSIONS_FIELDS_TO_FETCH } from '../../utils/fields';
var versions;
describe('api/Versions', function () {
  var currentVersion = {
    id: 123,
    created_at: '2018-10-02T13:00:24-07:00',
    modified_at: '2018-10-02T13:00:24-07:00',
    modified_by: {
      name: 'FooBar',
      id: 11
    },
    version_number: '4'
  };
  var firstVersion = {
    id: 123,
    created_at: '2018-10-02T13:01:24-07:00',
    modified_at: '2018-10-02T13:01:24-07:00',
    modified_by: {
      name: 'Foo',
      id: 10
    },
    version_number: '2'
  };
  var deleteVersion = {
    id: 456,
    created_at: '2018-10-02T13:01:41-07:00',
    modified_at: '2018-10-02T13:01:41-07:00',
    modified_by: {
      name: 'Bar',
      id: 11
    },
    permissions: {
      can_delete: true
    },
    trashed_at: '2018-10-02T13:01:41-07:00',
    version_number: '2'
  };
  var restoreVersion = {
    id: 789,
    created_at: '2018-11-29T17:47:57-08:00',
    modified_at: '2018-11-29T17:47:57-08:00',
    modified_by: {
      name: 'Baz',
      id: 12
    },
    permissions: {
      can_delete: true
    },
    restored_at: '2018-11-30T17:47:57-08:00',
    trashed_at: null,
    version_number: '3'
  };
  var nonCurrentVersions = {
    entries: [firstVersion, deleteVersion, restoreVersion],
    total_count: 3
  };
  var file = {
    id: '12345',
    modified_at: 1111111111,
    file_version: {
      id: 987
    },
    permissions: {
      can_comment: true
    },
    restored_from: {
      id: firstVersion.id,
      type: firstVersion.type
    }
  };
  var fileId = file.id;
  var response = {
    entries: [firstVersion, deleteVersion, restoreVersion],
    total_count: 3
  };
  beforeEach(function () {
    versions = new Versions({});
  });
  describe('getUrl()', function () {
    test('should throw when called without a file id', function () {
      expect(function () {
        versions.getUrl();
      }).toThrow();
    });
    test('should return correct versions base endpoint url', function () {
      expect(versions.getUrl('foo')).toBe('https://api.box.com/2.0/files/foo/versions');
    });
  });
  describe('getVersionUrl()', function () {
    test('should throw when called without a file id and version id', function () {
      expect(function () {
        versions.getVersionUrl();
      }).toThrow();
      expect(function () {
        versions.getVersionUrl('foo');
      }).toThrow();
    });
    test('should return correct version info endpoint url', function () {
      expect(versions.getVersionUrl('foo', '123')).toBe('https://api.box.com/2.0/files/foo/versions/123');
    });
  });
  describe('successHandler()', function () {
    test('should return API response data', function () {
      versions.successCallback = jest.fn();
      versions.successHandler(response);
      expect(versions.successCallback).toBeCalledWith(response);
    });
  });
  describe('addPermissions()', function () {
    test.each([true, false])('should decorate versions with can_upload permission from parent file', function (canUpload) {
      var fileWithPermissions = _objectSpread({}, file, {
        permissions: {
          can_upload: canUpload
        }
      });

      var _versions$addPermissi = versions.addPermissions(response, fileWithPermissions),
          entries = _versions$addPermissi.entries,
          total_count = _versions$addPermissi.total_count;

      var versionDeleteMatcher = function versionDeleteMatcher(version) {
        return version.permissions.can_delete === true;
      };

      var versionUploadMatcher = function versionUploadMatcher(version) {
        return version.permissions.can_upload === canUpload;
      };

      expect(entries.find(versionDeleteMatcher)).toMatchObject(deleteVersion);
      expect(entries.every(versionUploadMatcher)).toBe(true);
      expect(total_count).toEqual(response.total_count);
    });
  });
  describe('CRUD operations', function () {
    var successCallback = jest.fn();
    var errorCallback = jest.fn();
    var versionId = '123';
    beforeEach(function () {
      versions.checkApiCallValidity = jest.fn(function () {
        return true;
      });
      versions.delete = jest.fn();
      versions.get = jest.fn();
      versions.offsetGet = jest.fn();
      versions.post = jest.fn();
      versions.put = jest.fn();
    });
    describe('deleteVersion()', function () {
      var permissions = _defineProperty({}, PERMISSION_CAN_DELETE, true);

      test('should delete a version from the versions endpoint', function () {
        versions.deleteVersion({
          fileId: fileId,
          versionId: versionId,
          permissions: permissions,
          successCallback: successCallback,
          errorCallback: errorCallback
        });
        expect(versions.checkApiCallValidity).toBeCalledWith(PERMISSION_CAN_DELETE, permissions, fileId);
        expect(versions.delete).toBeCalledWith({
          id: fileId,
          url: "https://api.box.com/2.0/files/".concat(fileId, "/versions/").concat(versionId),
          successCallback: successCallback,
          errorCallback: errorCallback
        });
      });
    });
    describe('getVersions()', function () {
      test('should return a list of versions from the versions endpoint', function () {
        versions.getVersions(fileId, successCallback, errorCallback);
        expect(versions.offsetGet).toBeCalledWith(fileId, successCallback, errorCallback, 0, 1000, FILE_VERSIONS_FIELDS_TO_FETCH, true);
      });
    });
    describe('getVersion()', function () {
      test('should return the version information', function () {
        var url = 'https://box.com/api/file/fileID/versions';
        versions.getVersionUrl = jest.fn().mockReturnValue(url);
        versions.getVersion(fileId, file.file_version.id, successCallback, errorCallback);
        expect(versions.get).toBeCalledWith({
          id: fileId,
          successCallback: successCallback,
          errorCallback: errorCallback,
          url: url,
          requestData: {
            params: {
              fields: FILE_VERSIONS_FIELDS_TO_FETCH.toString()
            }
          }
        });
      });
    });
    describe('addCurrentVersion()', function () {
      test('should return the other versions if no current version is provided', function () {
        var result = versions.addCurrentVersion(null, nonCurrentVersions, file);
        expect(result).toEqual(nonCurrentVersions);
      });
      test('should return the current version if no other versions are provided', function () {
        var result = versions.addCurrentVersion(currentVersion, null, file);
        expect(result).toEqual({
          entries: [currentVersion],
          total_count: 1
        });
      });
      test('should return all versions with restored info added to the current version', function () {
        var result = versions.addCurrentVersion(currentVersion, nonCurrentVersions, file);
        expect(result.total_count).toEqual(nonCurrentVersions.entries.length + 1);
        var resultCurrentVersion = result.entries.pop();
        expect(resultCurrentVersion.version_promoted).toEqual(firstVersion.version_number);
      });
    });
    describe('promoteVersion()', function () {
      var permissions = _defineProperty({}, PERMISSION_CAN_UPLOAD, true);

      test('should post a well formed version promote request to the versions endpoint', function () {
        var requestData = {
          data: {
            id: versionId,
            type: 'file_version'
          }
        };
        versions.promoteVersion({
          fileId: fileId,
          versionId: versionId,
          permissions: permissions,
          successCallback: successCallback,
          errorCallback: errorCallback
        });
        expect(versions.checkApiCallValidity).toBeCalledWith(PERMISSION_CAN_UPLOAD, permissions, fileId);
        expect(versions.post).toBeCalledWith({
          id: fileId,
          url: "https://api.box.com/2.0/files/".concat(fileId, "/versions/current"),
          data: requestData,
          successCallback: successCallback,
          errorCallback: errorCallback
        });
      });
    });
    describe('restoreVersion()', function () {
      var permissions = _defineProperty({}, PERMISSION_CAN_DELETE, true);

      test('should post a well formed version restore request to the versions endpoint', function () {
        var requestData = {
          data: {
            trashed_at: null
          }
        };
        versions.restoreVersion({
          fileId: fileId,
          versionId: versionId,
          permissions: permissions,
          successCallback: successCallback,
          errorCallback: errorCallback
        });
        expect(versions.checkApiCallValidity).toBeCalledWith(PERMISSION_CAN_DELETE, permissions, fileId);
        expect(versions.put).toBeCalledWith({
          id: fileId,
          url: "https://api.box.com/2.0/files/".concat(fileId, "/versions/").concat(versionId),
          data: requestData,
          successCallback: successCallback,
          errorCallback: errorCallback
        });
      });
    });
  });
});