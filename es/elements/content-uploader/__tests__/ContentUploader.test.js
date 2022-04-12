function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            view                       | action\n            ", "              | ", "\n            ", "       | ", "\n            ", " | ", "\n            ", "     | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import { shallow } from 'enzyme';
import * as UploaderUtils from '../../../utils/uploads';
import Browser from '../../../utils/Browser';
import { ContentUploaderComponent, CHUNKED_UPLOAD_MIN_SIZE_BYTES } from '../ContentUploader';
import Footer from '../Footer';
import { STATUS_PENDING, STATUS_IN_PROGRESS, STATUS_STAGED, STATUS_COMPLETE, STATUS_ERROR, VIEW_ERROR, VIEW_UPLOAD_EMPTY, VIEW_UPLOAD_IN_PROGRESS, VIEW_UPLOAD_SUCCESS } from '../../../constants';
var EXPAND_UPLOADS_MANAGER_ITEMS_NUM_THRESHOLD = 5;
jest.mock('../../../utils/Browser');
describe('elements/content-uploader/ContentUploader', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(ContentUploaderComponent, props));
  };

  var createMockFiles = function createMockFiles(length) {
    var filesList = [];

    for (var i = 0; i < length; i += 1) {
      var file = new File(['contents'], "upload_file_".concat(i, ".txt"), {
        type: 'text/plain'
      });
      filesList.push(file);
    }

    return filesList;
  };

  var mapToUploadItems = function mapToUploadItems(files) {
    return files.map(function (file) {
      return {
        api: {},
        extension: '',
        file: file,
        name: file.name,
        progress: 0,
        size: 1000,
        status: STATUS_PENDING
      };
    });
  };

  describe('onBeforeUpload()', function () {
    test('should call onBeforeUpload', function () {
      var onBeforeUpload = jest.fn();
      var wrapper = getWrapper({
        onBeforeUpload: onBeforeUpload
      });
      wrapper.instance().addFilesToUploadQueue([{
        name: 'yoyo',
        size: 1000
      }], jest.fn(), false);
      expect(onBeforeUpload).toBeCalled();
    });
  });
  describe('updateViewAndCollection()', function () {
    test('should set itemIds to be an empty when method is called with an empty array', function () {
      var onComplete = jest.fn();
      var useUploadsManager = false;
      var isResumableUploadsEnabled = false;
      var wrapper = getWrapper({
        onComplete: onComplete,
        useUploadsManager: useUploadsManager,
        isResumableUploadsEnabled: isResumableUploadsEnabled
      });
      wrapper.instance().updateViewAndCollection([], null);
      expect(wrapper.state().itemIds).toEqual({});
    });
    test.each([['not', true, 'not', STATUS_PENDING, 0], ['', true, '', STATUS_COMPLETE, 1], ['', false, 'not', STATUS_STAGED, 1]])('should %s call onComplete when isResumableUploadsEnabled is %s and %s all items are finished', function (a, isResumableUploadsEnabled, b, status, expected) {
      var onComplete = jest.fn();
      var useUploadsManager = true;
      var wrapper = getWrapper({
        onComplete: onComplete,
        useUploadsManager: useUploadsManager,
        isResumableUploadsEnabled: isResumableUploadsEnabled
      });
      var instance = wrapper.instance();
      var items = [{
        status: status
      }, {
        status: STATUS_COMPLETE
      }, {
        status: STATUS_ERROR
      }];
      instance.updateViewAndCollection(items, null);
      expect(onComplete).toHaveBeenCalledTimes(expected);
    });
  });
  describe('addFilesToUploadQueue()', function () {
    test('should overwrite itemIds if they already exist', function () {
      var wrapper = getWrapper();
      wrapper.setState({
        itemIds: {
          yoyo: false
        }
      });
      wrapper.instance().addFilesToUploadQueue([{
        name: 'yoyo',
        size: 1000
      }], jest.fn(), false);
      var expected = {
        yoyo: true
      };
      expect(wrapper.state().itemIds).toMatchObject(expected);
    });
    test('should add generated itemId', function () {
      var wrapper = getWrapper({
        rootFolderId: 0
      });
      global.Date.now = jest.fn(function () {
        return 10000;
      });
      wrapper.instance().addFilesToUploadQueue([{
        name: 'yoyo',
        size: 1000
      }], jest.fn(), false);
      var expected = {
        yoyo: true,
        yoyo_0_10000: true
      };
      expect(wrapper.state().itemIds).toEqual(expected);
    });
    test('should handle accepting package "files" separate from folders', function () {
      var mockFile = {
        name: 'hi'
      };
      Browser.isSafari = jest.fn(function () {
        return true;
      });
      var entry = {
        isDirectory: true,
        kind: 'file',
        file: function file(fn) {
          fn(mockFile);
        }
      };
      var wrapper = getWrapper({
        rootFolderId: 0,
        isFolderUploadEnabled: true,
        hasUploads: true,
        useUploadsManager: true
      });
      global.Date.now = jest.fn(function () {
        return 10000;
      });
      wrapper.setProps({
        files: [mockFile],
        dataTransferItems: [{
          kind: 'file',
          type: 'application/zip',
          getAsFile: jest.fn(function () {
            return mockFile;
          }),
          webkitGetAsEntry: function webkitGetAsEntry() {
            return entry;
          },
          name: 'hi'
        }]
      });
      var expected = {
        hi: true,
        hi_0_10000: true
      };
      expect(wrapper.state().itemIds).toEqual(expected);
    });
  });
  describe('removeFileFromUploadQueue()', function () {
    var item = {
      api: {
        cancel: jest.fn()
      },
      status: STATUS_IN_PROGRESS
    };
    var wrapper;
    var instance;
    beforeEach(function () {
      wrapper = getWrapper();
      wrapper.setState({
        items: [item]
      });
      instance = wrapper.instance();
    });
    test('should cancel and remove item from uploading queue', function () {
      instance.removeFileFromUploadQueue(item);
      expect(item.api.cancel).toBeCalled();
      expect(wrapper.state().items.length).toBe(0);
    });
    test.each(_templateObject(), VIEW_ERROR, 'should not', VIEW_UPLOAD_EMPTY, 'should not', VIEW_UPLOAD_IN_PROGRESS, 'should', VIEW_UPLOAD_SUCCESS, 'should not')('$action call upload if the view is $view', function (option) {
      wrapper.setState({
        view: option
      });
      instance.upload = jest.fn();
      instance.removeFileFromUploadQueue(item);

      if (option === VIEW_UPLOAD_IN_PROGRESS) {
        expect(instance.upload).toBeCalled();
      } else {
        expect(instance.upload).not.toBeCalled();
      }
    });
  });
  describe('resetFile()', function () {
    test('should call getUploadAPI and updateViewAndCollection', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      var item = {
        api: {
          cancel: jest.fn()
        },
        file: {
          size: 10
        }
      };
      instance.getUploadAPI = jest.fn();
      instance.updateViewAndCollection = jest.fn();
      instance.resetFile(item);
      expect(instance.getUploadAPI).toBeCalled();
      expect(instance.updateViewAndCollection).toBeCalled();
    });
    test('should reset progress, status, and existing item error', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      var item = {
        api: {
          cancel: jest.fn()
        },
        file: {
          size: 10
        },
        progress: 85,
        status: STATUS_ERROR,
        error: {
          name: 'testerror'
        }
      };
      instance.resetFile(item);
      expect(item.progress).toBe(0);
      expect(item.status).toBe(STATUS_PENDING);
      expect(item.error).toBeUndefined();
    });
  });
  describe('resumeFile()', function () {
    test('should call resume from api and call updateViewAndCollection', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      var item = {
        api: {}
      };
      item.api.resume = jest.fn();
      instance.updateViewAndCollection = jest.fn();
      instance.resumeFile(item);
      expect(item.api.resume).toBeCalled();
      expect(instance.updateViewAndCollection).toBeCalled();
    });
  });
  describe('onClick()', function () {
    test('should cancel folder upload in progress', function () {
      var item = {
        api: {},
        isFolder: true,
        status: STATUS_IN_PROGRESS
      };
      var onClickCancel = jest.fn();
      var wrapper = getWrapper({
        onClickCancel: onClickCancel
      });
      var instance = wrapper.instance();
      instance.removeFileFromUploadQueue = jest.fn();
      instance.onClick(item);
      expect(instance.removeFileFromUploadQueue).toBeCalledWith(item);
      expect(onClickCancel.mock.calls.length).toBe(1);
    });
    test.each([['should set bytesUploadedOnLastResume when status is error and item is resumable', {
      api: {
        sessionId: 123,
        totalUploadedBytes: 123456
      },
      status: STATUS_ERROR,
      file: {
        size: CHUNKED_UPLOAD_MIN_SIZE_BYTES + 1
      }
    }, true, true], ['should not set bytesUploadedOnLastResume when file size <= CHUNKED_UPLOAD_MIN_SIZE_BYTES', {
      api: {
        sessionId: 123,
        totalUploadedBytes: 123456
      },
      status: STATUS_ERROR,
      file: {
        size: CHUNKED_UPLOAD_MIN_SIZE_BYTES
      }
    }, true, true], ['should not set bytesUploadedOnLastResume when resumable uploads is not enabled', {
      api: {
        sessionId: 123,
        totalUploadedBytes: 123456
      },
      status: STATUS_ERROR,
      file: {
        size: CHUNKED_UPLOAD_MIN_SIZE_BYTES + 1
      }
    }, false, true], ['should not set bytesUploadedOnLastResume when not chunked upload', {
      api: {
        sessionId: 123,
        totalUploadedBytes: 123456
      },
      status: STATUS_ERROR,
      file: {
        size: CHUNKED_UPLOAD_MIN_SIZE_BYTES + 1
      }
    }, true, false], ['should not set bytesUploadedOnLastResume when item api has no session id', {
      api: {
        sessionId: undefined,
        totalUploadedBytes: 123456
      },
      status: STATUS_ERROR,
      file: {
        size: CHUNKED_UPLOAD_MIN_SIZE_BYTES + 1
      }
    }, true, true], ['should not set bytesUploadedOnLastResume when status is not error', {
      api: {
        sessionId: 123,
        totalUploadedBytes: 123456
      },
      status: STATUS_COMPLETE,
      file: {
        size: CHUNKED_UPLOAD_MIN_SIZE_BYTES + 1
      }
    }, true, true]])('%o', function (test, item, isResumableUploadsEnabled, chunked) {
      jest.spyOn(UploaderUtils, 'isMultiputSupported').mockImplementation(function () {
        return true;
      });
      var isChunkedUpload = chunked && item.file.size > CHUNKED_UPLOAD_MIN_SIZE_BYTES;
      var isResumable = isResumableUploadsEnabled && isChunkedUpload && item.api.sessionId;
      var onClickCancel = jest.fn();
      var onClickResume = jest.fn();
      var onClickRetry = jest.fn();
      var wrapper = getWrapper({
        chunked: chunked,
        isResumableUploadsEnabled: isResumableUploadsEnabled,
        onClickCancel: onClickCancel,
        onClickResume: onClickResume,
        onClickRetry: onClickRetry
      });
      var instance = wrapper.instance();
      instance.removeFileFromUploadQueue = jest.fn();
      instance.resumeFile = jest.fn();
      instance.resetFile = jest.fn();
      instance.uploadFile = jest.fn();
      instance.onClick(item);

      if (item.status === STATUS_ERROR && isResumable) {
        expect(item.bytesUploadedOnLastResume).toBe(item.api.totalUploadedBytes);
        expect(onClickResume.mock.calls.length).toBe(1);
      } else if (item.status === STATUS_ERROR) {
        expect(onClickRetry.mock.calls.length).toBe(1);
      } else {
        expect(item.bytesUploadedOnLastResume).toBe(undefined);
        expect(onClickCancel.mock.calls.length).toBe(1);
      }
    });
  });
  describe('clickAllWithStatus()', function () {
    test('should call onClick for all items', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      var items = [{
        status: STATUS_COMPLETE
      }, {
        status: STATUS_IN_PROGRESS
      }, {
        status: STATUS_ERROR
      }];
      instance.state.items = items;
      instance.onClick = jest.fn();
      instance.clickAllWithStatus();
      expect(instance.onClick).toBeCalledWith(items[0]);
      expect(instance.onClick).toBeCalledWith(items[1]);
      expect(instance.onClick).toBeCalledWith(items[2]);
    });
    test('should call onClick for only items with given status', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      var items = [{
        status: STATUS_COMPLETE
      }, {
        status: STATUS_ERROR
      }, {
        status: STATUS_IN_PROGRESS
      }, {
        status: STATUS_ERROR
      }];
      instance.state.items = items;
      instance.onClick = jest.fn();
      instance.clickAllWithStatus(STATUS_ERROR);
      expect(instance.onClick).toBeCalledWith(items[1]);
      expect(instance.onClick).toBeCalledWith(items[3]);
    });
  });
  describe('isDone', function () {
    test('should be true if all items are complete or staged', function () {
      var wrapper = getWrapper();
      var files = createMockFiles(3);
      var items = mapToUploadItems(files).map(function (item) {
        return _objectSpread({}, item, {
          status: STATUS_COMPLETE
        });
      });
      items[2].status = STATUS_STAGED;
      wrapper.setState({
        items: items
      });
      expect(wrapper.find(Footer).prop('isDone')).toEqual(true);
    });
    test('should be false if not all items are complete or staged', function () {
      var wrapper = getWrapper();
      var files = createMockFiles(3);
      var items = mapToUploadItems(files).map(function (item) {
        return _objectSpread({}, item, {
          status: STATUS_COMPLETE
        });
      });
      items[2].status = STATUS_PENDING;
      wrapper.setState({
        items: items
      });
      expect(wrapper.find(Footer).prop('isDone')).toEqual(false);
    });
  });
  describe('getUploadAPI()', function () {
    var wrapper;
    var instance;
    var getPlainUploadAPI;
    var getChunkedUploadAPI;
    var file = {
      size: CHUNKED_UPLOAD_MIN_SIZE_BYTES + 1
    };
    beforeEach(function () {
      jest.spyOn(global.console, 'warn').mockImplementation();
      wrapper = getWrapper({
        isResumableUploadsEnabled: false
      });
      instance = wrapper.instance();
      getPlainUploadAPI = jest.fn();
      getChunkedUploadAPI = jest.fn();
      instance.createAPIFactory = jest.fn().mockReturnValue({
        getPlainUploadAPI: getPlainUploadAPI,
        getChunkedUploadAPI: getChunkedUploadAPI
      });
    });
    afterEach(function () {
      global.console.warn.mockRestore();
      UploaderUtils.isMultiputSupported.mockRestore();
    });
    test('should use the chunked upload api', function () {
      jest.spyOn(UploaderUtils, 'isMultiputSupported').mockImplementation(function () {
        return true;
      });
      instance.getUploadAPI(file);
      expect(instance.createAPIFactory).toBeCalled();
      expect(getChunkedUploadAPI).toBeCalled();
    });
    test('should use the regular upload api if the file <= CHUNKED_UPLOAD_MIN_SIZE_BYTES', function () {
      jest.spyOn(UploaderUtils, 'isMultiputSupported').mockImplementation(function () {
        return true;
      });
      instance.getUploadAPI(_objectSpread({}, file, {
        size: CHUNKED_UPLOAD_MIN_SIZE_BYTES
      }));
      expect(getPlainUploadAPI).toBeCalled();
    });
    test('should use the regular upload api if multiput not supported', function () {
      jest.spyOn(UploaderUtils, 'isMultiputSupported').mockImplementation(function () {
        return false;
      });
      instance.getUploadAPI(_objectSpread({}, file, {
        size: CHUNKED_UPLOAD_MIN_SIZE_BYTES
      }));
      expect(getPlainUploadAPI).toBeCalled();
    });
    test('should use the regular upload api if chunked is false', function () {
      wrapper.setProps({
        chunked: false
      });
      jest.spyOn(UploaderUtils, 'isMultiputSupported').mockImplementation(function () {
        return true;
      });
      instance.getUploadAPI(file);
      expect(getPlainUploadAPI).toBeCalled();
    });
  });
  describe('Expand and collapse when more than EXPAND_UPLOADS_MANAGER_ITEMS_NUM_THRESHOLD files uploaded', function () {
    var wrapper;
    var instance;
    var getPlainUploadAPI;
    var getChunkedUploadAPI;

    var expectAutoExpandStateToBe = function expectAutoExpandStateToBe(expectation) {
      expect(instance.isAutoExpanded).toBe(expectation);
      expect(wrapper.state().isUploadsManagerExpanded).toBe(expectation);
    };

    beforeEach(function () {
      wrapper = getWrapper({
        useUploadsManager: true
      });
      instance = wrapper.instance(); // Stub out upload so actual upload doesn't happen

      var mockAPI = {
        upload: function upload() {}
      };

      getPlainUploadAPI = function getPlainUploadAPI() {
        return mockAPI;
      };

      getChunkedUploadAPI = function getChunkedUploadAPI() {
        return mockAPI;
      };

      instance.createAPIFactory = jest.fn().mockReturnValue({
        getPlainUploadAPI: getPlainUploadAPI,
        getChunkedUploadAPI: getChunkedUploadAPI
      });
    });
    test('expand manager on upload when more than EXPAND_UPLOADS_MANAGER_ITEMS_NUM_THRESHOLD files', function () {
      var files = createMockFiles(EXPAND_UPLOADS_MANAGER_ITEMS_NUM_THRESHOLD + 1);
      wrapper.setProps({
        files: files
      });
      expectAutoExpandStateToBe(true);
    });
    test('do not expand manager on upload when less than than EXPAND_UPLOADS_MANAGER_ITEMS_NUM_THRESHOLD files', function () {
      var files = createMockFiles(EXPAND_UPLOADS_MANAGER_ITEMS_NUM_THRESHOLD - 1);
      wrapper.setProps({
        files: files
      });
      expectAutoExpandStateToBe(false);
    });
    test('expand manager on upload when two uploads totaling more than EXPAND_UPLOADS_MANAGER_ITEMS_NUM_THRESHOLD files', function () {
      var files = createMockFiles(EXPAND_UPLOADS_MANAGER_ITEMS_NUM_THRESHOLD + 1);
      wrapper.setProps({
        files: files.slice(0, 3)
      });
      expectAutoExpandStateToBe(false);
      wrapper.setProps({
        files: files.slice(3)
      });
      expectAutoExpandStateToBe(true);
    });
    test('close upload manager when uploads are done', function () {
      var files = createMockFiles(EXPAND_UPLOADS_MANAGER_ITEMS_NUM_THRESHOLD + 1);
      var items = mapToUploadItems(files).map(function (item) {
        return _objectSpread({}, item, {
          api: {
            upload: function upload() {}
          }
        });
      });
      wrapper.setState({
        items: items,
        isUploadsManagerExpanded: true
      });
      instance.isAutoExpanded = true;
      instance.handleUploadSuccess(items[0]); // Verify expanded is true after one file upload succeeds

      expectAutoExpandStateToBe(true);
      items.slice(1).forEach(function (item) {
        return instance.handleUploadSuccess(item);
      });
      expect(wrapper.state().view).toBe(VIEW_UPLOAD_SUCCESS);
      expectAutoExpandStateToBe(false);
    });
  });
});