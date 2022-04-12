function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import VersionsSidebarAPI from '../VersionsSidebarAPI';
import { FILE_VERSION_FIELDS_TO_FETCH } from '../../../../utils/fields';
describe('VersionsSidebarAPI', function () {
  var defaultFileId = '123';
  var defaultVersionId = '4567';
  var fileAPI = {
    getDownloadUrl: jest.fn(),
    getFile: jest.fn()
  };
  var versionsAPI = {
    addCurrentVersion: jest.fn(),
    addPermissions: jest.fn(),
    deleteVersion: jest.fn(),
    getVersions: jest.fn(),
    getVersion: jest.fn(),
    promoteVersion: jest.fn(),
    restoreVersion: jest.fn(),
    sortVersions: jest.fn()
  };
  var mockAPI = {
    getFileAPI: function getFileAPI() {
      return fileAPI;
    },
    getVersionsAPI: function getVersionsAPI() {
      return versionsAPI;
    }
  };
  var mockPermissons = {
    can_delete: true,
    can_download: true,
    can_upload: true
  };
  var mockVersion = {
    id: defaultVersionId,
    permissions: mockPermissons
  };

  var getInstance = function getInstance() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return new VersionsSidebarAPI(_objectSpread({
      api: mockAPI,
      fileId: defaultFileId
    }, options));
  };

  describe('deleteVersion', function () {
    test('should call deleteVersion', function () {
      var instance = getInstance();
      expect(instance.deleteVersion(mockVersion)).toBeInstanceOf(Promise);
      expect(versionsAPI.deleteVersion).toBeCalledWith({
        fileId: defaultFileId,
        permissions: mockVersion.permissions,
        errorCallback: expect.any(Function),
        successCallback: expect.any(Function),
        versionId: defaultVersionId
      });
    });
  });
  describe('fetchData', function () {
    test('should call getFile and getVersions', function () {
      var instance = getInstance();
      instance.fetchData().then(function () {
        expect(fileAPI.getFile).toBeCalled();
        expect(versionsAPI.getVersions).toBeCalled();
      });
    });
  });
  describe('fetchDownloadUrl', function () {
    test('should call getDownloadUrl', function () {
      var instance = getInstance();
      var urlPromise = instance.fetchDownloadUrl(mockVersion);
      expect(urlPromise).toBeInstanceOf(Promise);
      expect(fileAPI.getDownloadUrl).toBeCalledWith(defaultFileId, mockVersion, expect.any(Function), expect.any(Function));
    });
  });
  describe('fetchFile', function () {
    test('should call getFile', function () {
      var instance = getInstance();
      expect(instance.fetchFile()).toBeInstanceOf(Promise);
      expect(fileAPI.getFile).toBeCalledWith(defaultFileId, expect.any(Function), expect.any(Function), {
        fields: FILE_VERSION_FIELDS_TO_FETCH,
        forceFetch: true
      });
    });
  });
  describe('fetchVersions', function () {
    test('should call getVersions', function () {
      var instance = getInstance();
      expect(instance.fetchVersions()).toBeInstanceOf(Promise);
      expect(versionsAPI.getVersions).toBeCalledWith(defaultFileId, expect.any(Function), expect.any(Function));
    });
  });
  describe('fetchVersionCurrent', function () {
    test('should get the current version and add it to the versions response', function () {
      var file = {
        id: defaultFileId,
        file_version: {
          id: defaultVersionId
        }
      };
      var instance = getInstance();
      var versions = {
        entries: [mockVersion],
        total_count: 1
      };
      expect(instance.fetchVersionCurrent([file, versions])).toBeInstanceOf(Promise);
      expect(versionsAPI.getVersion).toBeCalledWith(defaultFileId, defaultVersionId, expect.any(Function), expect.any(Function));
    });
  });
  describe('fetchVersion', function () {
    test('should call getVersion', function () {
      var instance = getInstance();
      expect(instance.fetchVersion(defaultVersionId)).toBeInstanceOf(Promise);
      expect(versionsAPI.getVersion).toBeCalledWith(defaultFileId, defaultVersionId, expect.any(Function), expect.any(Function));
    });
  });
  describe('promoteVersion', function () {
    test('should call promoteVersion', function () {
      var instance = getInstance();
      expect(instance.promoteVersion(mockVersion)).toBeInstanceOf(Promise);
      expect(versionsAPI.promoteVersion).toBeCalledWith({
        fileId: defaultFileId,
        permissions: mockVersion.permissions,
        errorCallback: expect.any(Function),
        successCallback: expect.any(Function),
        versionId: defaultVersionId
      });
    });
  });
  describe('restoreVersion', function () {
    test('should call restoreVersion', function () {
      var instance = getInstance();
      expect(instance.restoreVersion(mockVersion)).toBeInstanceOf(Promise);
      expect(versionsAPI.restoreVersion).toBeCalledWith({
        fileId: defaultFileId,
        permissions: mockVersion.permissions,
        errorCallback: expect.any(Function),
        successCallback: expect.any(Function),
        versionId: defaultVersionId
      });
    });
  });
});