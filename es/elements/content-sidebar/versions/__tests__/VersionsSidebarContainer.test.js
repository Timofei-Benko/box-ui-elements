function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { shallow } from 'enzyme/build';
import messages from '../messages';
import openUrlInsideIframe from '../../../../utils/iframe';
import VersionsSidebar from '../VersionsSidebarContainer';
jest.mock('react-router-dom', function () {
  return _objectSpread({}, jest.requireActual('react-router-dom'), {
    withRouter: function withRouter(Component) {
      return Component;
    }
  });
});
jest.mock('../../../common/api-context', function () {
  return {
    withAPIContext: function withAPIContext(Component) {
      return Component;
    }
  };
});
jest.mock('../../../../utils/iframe', function () {
  return {
    __esModule: true,
    default: jest.fn()
  };
});
var versions = [{
  id: '123',
  name: 'Version 1'
}, {
  id: '456',
  name: 'Version 2'
}, {
  id: '789',
  name: 'Version 3'
}];
describe('elements/content-sidebar/versions/VersionsSidebarContainer', function () {
  var versionsAPI = {
    addPermissions: jest.fn(),
    sortVersions: jest.fn()
  };
  var api = {
    getVersionsAPI: function getVersionsAPI() {
      return versionsAPI;
    }
  };

  var getWrapper = function getWrapper() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var props = _extends({}, _ref);

    return shallow(React.createElement(VersionsSidebar, _extends({
      api: api,
      fileId: "12345"
    }, props)));
  };

  describe('componentDidUpdate', function () {
    var onVersionChange;
    var wrapper;
    var instance;
    beforeEach(function () {
      onVersionChange = jest.fn();
      wrapper = getWrapper({
        onVersionChange: onVersionChange,
        refreshIdentity: false
      });
      instance = wrapper.instance();
    });
    test('should verify the selected version id exists when it changes', function () {
      var version = {
        id: '45678'
      };
      var currentVersion = {
        id: '54321'
      };
      instance.verifyVersion = jest.fn();
      wrapper.setState({
        versions: [currentVersion, version]
      });
      wrapper.setProps({
        versionId: '45678'
      });
      expect(instance.verifyVersion).toHaveBeenCalled();
    });
  });
  describe('componentWillUnmount', function () {
    test('should forward verison id reset to the parent component', function () {
      var onVersionChange = jest.fn();
      var wrapper = getWrapper({
        onVersionChange: onVersionChange
      });
      wrapper.instance().componentWillUnmount();
      expect(onVersionChange).toBeCalledWith(null);
    });
  });
  describe('componentDidMount', function () {
    test('should call onLoad after a successful fetchData() call',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var onLoad, fetchData, instance;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              onLoad = jest.fn();
              fetchData = jest.fn(function () {
                return Promise.resolve();
              });
              instance = getWrapper({
                onLoad: onLoad
              }).instance();
              instance.fetchData = fetchData;
              _context.next = 6;
              return instance.componentDidMount();

            case 6:
              expect(onLoad).toHaveBeenCalled();

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  });
  describe('handleActionDelete', function () {
    test('should call api endpoint helpers', function () {
      var handleDelete = jest.fn();
      var wrapper = getWrapper({
        onVersionDelete: handleDelete,
        versionId: '123'
      });
      var instance = wrapper.instance();
      var version = {
        id: '456'
      };
      var newVersion = {
        id: '456',
        trash_at: ''
      };
      instance.api.deleteVersion = jest.fn().mockResolvedValueOnce();
      instance.api.fetchVersion = jest.fn().mockResolvedValueOnce(newVersion);
      instance.findVersion = jest.fn(function () {
        return version;
      });
      instance.handleDeleteSuccess = jest.fn();
      instance.handleActionDelete(version.id).then(function () {
        expect(instance.api.deleteVersion).toHaveBeenCalledWith(version);
        expect(instance.api.fetchVersion).toHaveBeenCalled();
        expect(instance.handleDeleteSuccess).toHaveBeenCalledWith(newVersion);
        expect(handleDelete).toHaveBeenCalledWith(version.id);
      });
    });
  });
  describe('handleActionDownload', function () {
    test('should call api endpoint helpers', function () {
      var downloadUrl = 'https://box.com/url';
      var handleDownload = jest.fn();
      var wrapper = getWrapper({
        onVersionDownload: handleDownload,
        versionId: '123'
      });
      var instance = wrapper.instance();
      var version = {
        id: '456'
      };
      instance.api.fetchDownloadUrl = jest.fn().mockResolvedValueOnce(downloadUrl);
      instance.findVersion = jest.fn(function () {
        return version;
      });
      instance.handleActionDownload(version.id).then(function () {
        expect(instance.api.fetchDownloadUrl).toHaveBeenCalledWith(version);
        expect(openUrlInsideIframe).toHaveBeenCalledWith(downloadUrl);
        expect(handleDownload).toHaveBeenCalledWith(version.id);
      });
    });
  });
  describe('handleActionPromote', function () {
    test('should call api endpoint helpers', function () {
      var handlePromote = jest.fn();
      var wrapper = getWrapper({
        onVersionPromote: handlePromote,
        versionId: '123'
      });
      var instance = wrapper.instance();
      var version = {
        id: '456'
      };
      instance.api.fetchData = jest.fn().mockResolvedValueOnce();
      instance.api.promoteVersion = jest.fn().mockResolvedValueOnce();
      instance.findVersion = jest.fn(function () {
        return version;
      });
      instance.handleFetchSuccess = jest.fn();
      instance.handlePromoteSuccess = jest.fn();
      instance.handleActionPromote(version.id).then(function () {
        expect(instance.api.promoteVersion).toHaveBeenCalledWith(version);
        expect(instance.api.fetchData).toHaveBeenCalled();
        expect(instance.handleFetchSuccess).toHaveBeenCalled();
        expect(instance.handlePromoteSuccess).toHaveBeenCalled();
        expect(handlePromote).toHaveBeenCalledWith(version.id);
      });
    });
  });
  describe('handleActionRestore', function () {
    test('should call api endpoint helpers', function () {
      var handleRestore = jest.fn();
      var wrapper = getWrapper({
        onVersionRestore: handleRestore,
        versionId: '123'
      });
      var instance = wrapper.instance();
      var version = {
        id: '456'
      };
      var newVersion = {
        id: '456',
        restored_by: ''
      };
      instance.api.restoreVersion = jest.fn().mockResolvedValueOnce();
      instance.api.fetchVersion = jest.fn().mockResolvedValueOnce(newVersion);
      instance.findVersion = jest.fn(function () {
        return version;
      });
      instance.handleRestoreSuccess = jest.fn();
      instance.handleActionRestore(version.id).then(function () {
        expect(instance.api.restoreVersion).toHaveBeenCalledWith(version);
        expect(instance.api.fetchVersion).toHaveBeenCalled();
        expect(instance.handleRestoreSuccess).toHaveBeenCalledWith(newVersion);
        expect(handleRestore).toHaveBeenCalledWith(version.id);
      });
    });
  });
  describe('handleDeleteSuccess', function () {
    test('should update version if the same id', function () {
      var wrapper = getWrapper({
        versionId: '123'
      });
      var instance = wrapper.instance();
      var version = {
        id: '123'
      };
      instance.updateVersionToCurrent = jest.fn();
      instance.mergeResponse = jest.fn();
      instance.handleDeleteSuccess(version);
      expect(instance.updateVersionToCurrent).toHaveBeenCalled();
      expect(instance.mergeResponse).toHaveBeenCalledWith(version);
    });
  });
  describe('handleRestoreSuccess', function () {
    test('should call mergeResponse', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      var version = {
        id: '123'
      };
      instance.mergeResponse = jest.fn();
      instance.handleRestoreSuccess(version);
      expect(instance.mergeResponse).toHaveBeenCalledWith(version);
    });
  });
  describe('handleFetchError', function () {
    test('should set state to default values with error message', function () {
      var wrapper = getWrapper();
      wrapper.instance().handleFetchError({
        status: 500
      });
      expect(wrapper.state()).toMatchObject({
        error: messages.versionFetchError,
        errorTitle: messages.versionServerError
      });
    });
    test('should set state to default values with error upsell message if onUpgradeClick is set', function () {
      var wrapper = getWrapper({
        onUpgradeClick: function onUpgradeClick() {},
        versionUpsellExperience: 'STATIC_VERSION_HISTORY'
      });
      wrapper.instance().handleFetchError({
        status: 403
      });
      expect(wrapper.state()).toEqual({
        error: messages.versionNotAvailable,
        errorTitle: messages.versionAccessError,
        isLoading: false,
        isWatermarked: false,
        versionCount: 0,
        versionLimit: Infinity,
        versions: []
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should create StaticVersionSidebar if versionUpsellExperience is STATIC_VERSION_HISTORY', function () {
      var wrapper = getWrapper({
        onUpgradeClick: function onUpgradeClick() {},
        versionUpsellExperience: 'STATIC_VERSION_HISTORY'
      });
      wrapper.instance().handleFetchError({
        status: 403
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should create StaticVersionSidebar if versionUpsellExperience is STATIC_VERSION_HISTORY_WITH_PICTURE', function () {
      var wrapper = getWrapper({
        onUpgradeClick: function onUpgradeClick() {},
        versionUpsellExperience: 'STATIC_VERSION_HISTORY_WITH_PICTURE'
      });
      wrapper.instance().handleFetchError({
        status: 403
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('handleFetchSuccess', function () {
    var file;
    var version;
    var currentVersion;
    var versionsWithCurrent;
    beforeEach(function () {
      file = {
        id: '12345',
        permissions: {},
        version_limit: 10
      };
      version = {
        id: '123',
        permissions: {}
      };
      currentVersion = {
        entries: [{
          id: '321',
          permissions: {}
        }],
        total_count: 1
      };
      versionsWithCurrent = {
        entries: [version].concat(_toConsumableArray(currentVersion.entries)),
        total_count: 2
      };
      versionsAPI.addPermissions.mockReturnValueOnce(versionsWithCurrent);
    });
    test('should set state with the updated versions', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.sortVersions = jest.fn().mockReturnValue(versionsWithCurrent.entries);
      instance.verifyVersion = jest.fn();
      instance.handleFetchSuccess([file, versionsWithCurrent]);
      expect(versionsAPI.addPermissions).toBeCalledWith(versionsWithCurrent, file);
      expect(instance.verifyVersion).toBeCalled();
      expect(instance.sortVersions).toBeCalledWith(versionsWithCurrent.entries);
      expect(wrapper.state()).toMatchObject({
        error: undefined,
        isLoading: false,
        isWatermarked: false,
        versionCount: 2,
        versionLimit: 10
      });
      expect(wrapper.state('versions')).toBe(versionsWithCurrent.entries);
    });
    test('should set state with isWatermarked if file is watermarked', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();

      var testFile = _objectSpread({}, file, {
        watermark_info: {
          is_watermarked: true
        }
      });

      instance.verifyVersion = jest.fn();
      instance.handleFetchSuccess([testFile, versionsWithCurrent]);
      expect(wrapper.state('isWatermarked')).toBe(true);
    });
  });
  describe('findVersion', function () {
    test('should return the version stored in state if available', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      wrapper.setState({
        versions: versions
      });
      expect(instance.findVersion('456')).toEqual(versions[1]);
      expect(instance.findVersion('abc')).toEqual(undefined);
    });
  });
  describe('mergeVersions', function () {
    test('should update state', function () {
      var wrapper = getWrapper();
      wrapper.setState({
        versions: versions
      });
      var instance = wrapper.instance();
      var newVersion = {
        id: versions[1].id,
        trashed_at: null
      };
      var newVersions = instance.mergeVersions(newVersion);
      expect(newVersions[0]).toEqual(versions[0]);
      expect(newVersions[1]).toEqual(_extends(versions[1], newVersion));
    });
  });
  describe('mergeResponse', function () {
    test('should update state', function () {
      var wrapper = getWrapper();
      wrapper.setState({
        error: 'error',
        isLoading: true,
        versions: versions
      });
      var instance = wrapper.instance();
      var response = {
        id: '000',
        name: 'Version 0'
      };
      var newVersions = [response];
      instance.mergeVersions = jest.fn().mockReturnValue(newVersions);
      instance.mergeResponse(response);
      expect(wrapper.state('error')).toBe(undefined);
      expect(wrapper.state('isLoading')).toBe(false);
      expect(wrapper.state('versions')).toEqual(newVersions);
      expect(instance.mergeVersions).toHaveBeenCalledWith(response);
    });
  });
  describe('refresh', function () {
    test('should refetch data when refresh is called', function () {
      var instance = getWrapper().instance();
      var fetchData = jest.fn();
      instance.fetchData = fetchData;
      instance.refresh();
      expect(fetchData).toHaveBeenCalled();
    });
  });
  describe('sortVersions', function () {
    test('should sort versions by their created date', function () {
      var instance = getWrapper().instance();
      var unsortedVersions = [{
        id: '123',
        created_at: '2018-10-02T13:01:24-07:00'
      }, {
        id: '456',
        created_at: '2018-10-02T13:01:41-07:00'
      }, {
        id: '789',
        created_at: '2018-11-29T17:47:57-08:00'
      }];
      var sortedVersions = instance.sortVersions(unsortedVersions);
      expect(unsortedVersions).not.toBe(sortedVersions); // Sort call should create a new array

      expect(sortedVersions).toEqual([unsortedVersions[2], unsortedVersions[1], unsortedVersions[0]]);
    });
  });
  describe('verifyVersion', function () {
    var onVersionChange = jest.fn();
    test('should emit an onVersionChange event if the passed version is available', function () {
      var wrapper = getWrapper({
        onVersionChange: onVersionChange,
        versionId: '456'
      });
      wrapper.setState({
        versions: versions
      });
      wrapper.instance().verifyVersion();
      expect(onVersionChange).toHaveBeenCalledWith(versions[1], {
        currentVersionId: versions[0].id,
        updateVersionToCurrent: wrapper.instance().updateVersionToCurrent
      });
    });
    test('should reset the selected version if the passed version is not available', function () {
      var wrapper = getWrapper({
        onVersionChange: onVersionChange,
        versionId: '99999'
      });
      var instance = wrapper.instance();
      instance.updateVersionToCurrent = jest.fn();
      wrapper.setState({
        versions: versions
      });
      instance.verifyVersion();
      expect(onVersionChange).not.toHaveBeenCalled();
      expect(instance.updateVersionToCurrent).toHaveBeenCalled();
    });
  });
  describe('render', function () {
    test('should match its snapshot', function () {
      var wrapper = getWrapper({
        parentName: 'activity'
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
});