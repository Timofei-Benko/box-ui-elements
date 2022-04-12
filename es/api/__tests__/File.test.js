function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import cloneDeep from 'lodash/cloneDeep';
import Cache from '../../utils/Cache';
import * as fields from '../../utils/fields';
import * as utils from '../../utils/function';
import File from '../File';
import TokenService from '../../utils/TokenService';
import { X_REP_HINTS, ERROR_CODE_FETCH_FILE, ERROR_CODE_GET_DOWNLOAD_URL, FIELD_EXTENSION } from '../../constants';
jest.mock('../../utils/file', function () {
  return {
    getTypedFileId: jest.fn().mockReturnValue('file_id')
  };
});
var TOKEN = 'token';
var file;
var cache;
describe('api/File', function () {
  beforeEach(function () {
    file = new File({
      token: TOKEN
    });
    cache = new Cache();
  });
  describe('getCacheKey()', function () {
    test('should return correct key', function () {
      expect(file.getCacheKey('foo')).toBe('file_foo');
    });
  });
  describe('getUrl()', function () {
    test('should return correct file api url without id', function () {
      expect(file.getUrl()).toBe('https://api.box.com/2.0/files');
    });
    test('should return correct file api url with id', function () {
      expect(file.getUrl('foo')).toBe('https://api.box.com/2.0/files/foo');
    });
  });
  describe('getDownloadUrl()', function () {
    var ERROR = 'Download is missing required fields or token.';
    test('should return a download url for a file', function () {
      var downloadUrl = 'https://api.box.com/2.0/files/foo/content';
      var downloadFile = {
        authenticated_download_url: downloadUrl,
        id: 'foo',
        is_download_available: true
      };
      var success = jest.fn();
      return file.getDownloadUrl('foo', downloadFile, success).then(function () {
        expect(success).toHaveBeenCalledWith("".concat(downloadUrl, "?access_token=").concat(TOKEN));
      });
    });
    test('should return a download url for a file version', function () {
      var downloadVersion = {
        authenticated_download_url: 'https://api.box.com/2.0/files/foo/content?version=bar',
        id: 'bar',
        is_download_available: true
      };
      var success = jest.fn();
      return file.getDownloadUrl('foo', downloadVersion, success).then(function () {
        expect(success).toHaveBeenCalledWith("https://api.box.com/2.0/files/foo/content?access_token=".concat(TOKEN, "&version=bar"));
      });
    });
    test('should return an error if authenticatd_download_url is missing', function () {
      var downloadFile = {
        id: 'foo',
        is_download_available: true
      };
      var error = jest.fn();
      var success = jest.fn();
      return file.getDownloadUrl('foo', downloadFile, success, error).catch(function () {
        expect(success).not.toHaveBeenCalled();
        expect(error).toHaveBeenCalledWith(new Error(ERROR), ERROR_CODE_GET_DOWNLOAD_URL);
      });
    });
    test('should return an error if is_download_available is false', function () {
      var downloadFile = {
        id: 'foo',
        is_download_available: false
      };
      var error = jest.fn();
      var success = jest.fn();
      return file.getDownloadUrl('foo', downloadFile, success, error).catch(function () {
        expect(success).not.toHaveBeenCalled();
        expect(error).toHaveBeenCalledWith(new Error(ERROR), ERROR_CODE_GET_DOWNLOAD_URL);
      });
    });
  });
  describe('generateRepresentation()', function () {
    var representation = {
      info: {
        url: 'info.url'
      }
    };
    test('should return given representation if info.url is not defined', function () {
      var badRepresentation = {
        representation: 'representation'
      };
      file.xhr = {
        get: jest.fn()
      };
      utils.retryNumOfTimes = jest.fn();
      return file.generateRepresentation(badRepresentation).then(function (result) {
        expect(file.xhr.get).not.toHaveBeenCalled();
        expect(result).toBe(badRepresentation);
      });
    });
    test('should throw from get if initial xhr request is rejected', function () {
      file.xhr = {
        get: jest.fn().mockRejectedValue(new Error())
      };
      utils.retryNumOfTimes = jest.fn();
      return file.generateRepresentation(representation).catch(function () {
        expect(file.xhr.get).toThrow();
        expect(utils.retryNumOfTimes).not.toHaveBeenCalled();
      });
    });
    test('should throw from retryNumOfTimes if xhr successful but retryNumOfTimes unsuccessful throws error', function () {
      file.xhr = {
        get: jest.fn().mockResolvedValue('data')
      };
      utils.retryNumOfTimes = jest.fn().mockImplementation(function () {
        throw new Error();
      });
      return file.generateRepresentation(representation).catch(function () {
        expect(utils.retryNumOfTimes).toThrow();
      });
    });
    test('should return updated representation if successful', function () {
      var updatedRepresentation = 'updatedRepresentation';
      file.xhr = {
        get: jest.fn().mockResolvedValue('data')
      };
      utils.retryNumOfTimes = jest.fn().mockReturnValue(updatedRepresentation);
      return file.generateRepresentation(representation).then(function (result) {
        expect(utils.retryNumOfTimes).toHaveBeenCalled();
        expect(result).toBe(updatedRepresentation);
      });
    });
  });
  describe('getThumbnailUrl()', function () {
    var baseUrl = 'baseUrl';
    var url_template = "".concat(baseUrl, "/{+asset_path}");
    var representation = 'jpg';
    var baseItem = {
      representations: {
        entries: [{
          representation: representation,
          status: {
            state: 'success'
          },
          content: {
            url_template: url_template
          }
        }]
      }
    };
    var item;
    beforeEach(function () {
      item = cloneDeep(baseItem);
    });
    test('should return thumbnail url for item with jpg representation', function () {
      TokenService.getReadToken = jest.fn().mockReturnValueOnce(TOKEN);
      return file.getThumbnailUrl(item).then(function (thumbnailUrl) {
        return expect(thumbnailUrl).toBe("".concat(baseUrl, "/?access_token=").concat(TOKEN));
      });
    });
    test('should return thumbnail url for item with png representation', function () {
      TokenService.getReadToken = jest.fn().mockReturnValueOnce(TOKEN);
      item.representations.entries[0].representation = 'png';
      return file.getThumbnailUrl(item).then(function (thumbnailUrl) {
        return expect(thumbnailUrl).toBe("".concat(baseUrl, "/1.png?access_token=").concat(TOKEN));
      });
    });
    test('should return null if item has no representations field', function () {
      item.representations = undefined;
      return file.getThumbnailUrl(item).then(function (thumbnailUrl) {
        return expect(thumbnailUrl).toBe(null);
      });
    });
    test('should return null if item has no entries', function () {
      item.representations.entries = [];
      return file.getThumbnailUrl(item).then(function (thumbnailUrl) {
        return expect(thumbnailUrl).toBe(null);
      });
    });
    test('should return null if TokenService returns null', function () {
      TokenService.getReadToken = jest.fn().mockReturnValueOnce(null);
      return file.getThumbnailUrl(item).then(function (thumbnailUrl) {
        return expect(thumbnailUrl).toBe(null);
      });
    });
    test('should return null if response status is not success', function () {
      item.representations.entries[0].status.state = 'failure';
      return file.getThumbnailUrl(item).then(function (thumbnailUrl) {
        return expect(thumbnailUrl).toBe(null);
      });
    });
    test('should return null if no representation in reponse', function () {
      item.representations.entries[0].representation = undefined;
      return file.getThumbnailUrl(item).then(function (thumbnailUrl) {
        return expect(thumbnailUrl).toBe(null);
      });
    });
    test('should return null if no template in response', function () {
      item.representations.entries[0].content.url_template = undefined;
      return file.getThumbnailUrl(item).then(function (thumbnailUrl) {
        return expect(thumbnailUrl).toBe(null);
      });
    });
  });
  describe('setFileDescription()', function () {
    var success = jest.fn();
    var error = jest.fn();
    test('should fail if the file object is bad', function () {
      file.xhr = jest.fn();
      return file.setFileDescription({}, 'foo', success, error).catch(function () {
        expect(file.xhr).not.toHaveBeenCalled();
        expect(success).not.toHaveBeenCalled();
        expect(error).toHaveBeenCalled();
      });
    });
    test('should fail if we have insufficient permissions', function () {
      file.xhr = jest.fn();
      var mockFile = {
        id: '1',
        permissions: {
          can_rename: false
        }
      };
      return file.setFileDescription(mockFile, 'foo', success, error).catch(function () {
        expect(file.xhr).not.toHaveBeenCalled();
        expect(success).not.toHaveBeenCalled();
        expect(error).toHaveBeenCalled();
      });
    });
    test('should make an xhr', function () {
      file.getUrl = jest.fn().mockReturnValue('url');
      file.merge = jest.fn();
      var mockFile = {
        id: '1',
        permissions: {
          can_rename: true
        },
        description: 'foo'
      };
      file.xhr = {
        put: jest.fn().mockReturnValueOnce(Promise.resolve(mockFile))
      };
      return file.setFileDescription(mockFile, 'foo', success, error).then(function () {
        expect(file.xhr.put).toHaveBeenCalledWith({
          id: 'file_id',
          url: 'url',
          data: {
            description: 'foo'
          }
        });
      });
    });
    test('should merge the new file description in and execute the success callback', function () {
      file.getCacheKey = jest.fn().mockReturnValue('key');
      file.merge = jest.fn();
      var mockFile = {
        id: '1',
        permissions: {
          can_rename: true
        },
        description: 'foo'
      };
      var mockFileResponse = mockFile;
      mockFileResponse.description = 'fo';
      file.xhr = {
        put: jest.fn().mockReturnValueOnce(Promise.resolve({
          data: mockFileResponse
        }))
      };
      return file.setFileDescription(mockFile, 'foo', success, error).then(function () {
        expect(file.xhr.put).toHaveBeenCalled();
        expect(file.merge).toHaveBeenCalledWith('key', 'description', 'fo');
        expect(error).not.toHaveBeenCalled();
      });
    });
    test('should not merge the new file description in and not execute the success callback when destroyed', function () {
      file.getCacheKey = jest.fn().mockReturnValue('key');
      file.merge = jest.fn();
      var mockFile = {
        id: '1',
        permissions: {
          can_rename: true
        },
        description: 'foo'
      };
      var mockFileResponse = mockFile;
      mockFileResponse.description = 'fo';
      file.isDestroyed = jest.fn().mockReturnValueOnce(true);
      file.xhr = {
        put: jest.fn().mockReturnValueOnce(Promise.resolve({
          data: mockFileResponse
        }))
      };
      return file.setFileDescription(mockFile, 'foo', success, error).then(function () {
        expect(file.xhr.put).toHaveBeenCalled();
        expect(file.merge).not.toHaveBeenCalled();
        expect(error).not.toHaveBeenCalled();
      });
    });
    test('should not call the error callback on failure when destroyed', function () {
      file.isDestroyed = jest.fn().mockReturnValueOnce(true);
      file.merge = jest.fn();
      var mockFile = {
        id: '1',
        permissions: {
          can_rename: true
        },
        description: 'foo'
      };
      var mockError = new Error();
      file.xhr = {
        put: jest.fn().mockReturnValueOnce(Promise.reject(mockError))
      };
      return file.setFileDescription(mockFile, 'bar', success, error).then(function () {
        expect(file.xhr.put).toHaveBeenCalled();
        expect(file.merge).not.toHaveBeenCalled();
        expect(error).not.toHaveBeenCalled();
      });
    });
    test('should call the error callback on failure', function () {
      file.merge = jest.fn().mockReturnValueOnce('orig');
      var mockFile = {
        id: '1',
        permissions: {
          can_rename: true
        },
        description: 'foo'
      };
      var mockError = new Error();
      file.xhr = {
        put: jest.fn().mockReturnValueOnce(Promise.reject(mockError))
      };
      return file.setFileDescription(mockFile, 'bar', success, error).then(function () {
        expect(file.xhr.put).toHaveBeenCalled();
        expect(file.merge).toHaveBeenCalledWith('file_1', 'description', 'foo');
        expect(error).toHaveBeenCalledWith('orig');
      });
    });
  });
  describe('getFile()', function () {
    test('should not do anything if destroyed',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var success, error;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              file.isDestroyed = jest.fn().mockReturnValueOnce(true);
              file.getCache = jest.fn();
              file.getCacheKey = jest.fn();
              file.xhr = null;
              success = jest.fn();
              error = jest.fn();
              _context.next = 8;
              return file.getFile('id', success, error);

            case 8:
              expect(file.getCache).not.toHaveBeenCalled();
              expect(file.getCacheKey).not.toHaveBeenCalled();
              expect(success).not.toHaveBeenCalled();
              expect(error).not.toHaveBeenCalled();

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    test('should return cached file',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var success;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              cache.set('key', 'file');
              file.xhr = null;
              file.options = {
                cache: cache
              };
              file.getCache = jest.fn().mockReturnValueOnce(cache);
              file.getCacheKey = jest.fn().mockReturnValueOnce('key');
              fields.findMissingProperties = jest.fn().mockReturnValueOnce([]);
              success = jest.fn();
              _context2.next = 9;
              return file.getFile('id', success);

            case 9:
              expect(file.getCacheKey).toHaveBeenCalledWith('id');
              expect(success).toHaveBeenCalledWith('file');
              expect(fields.findMissingProperties).toHaveBeenCalledWith('file', undefined);

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    test('should make xhr to get file when cached if missing fields',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var success;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              cache.set('key', {
                id: '123'
              });
              file.options = {
                cache: cache
              };
              file.getCache = jest.fn().mockReturnValueOnce(cache);
              file.getCacheKey = jest.fn().mockReturnValueOnce('key');
              fields.findMissingProperties = jest.fn().mockReturnValueOnce(['missing1', 'missing2']);
              fields.fillMissingProperties = jest.fn().mockReturnValueOnce({
                id: '123',
                foo: 'bar',
                missing: null
              });
              file.xhr = {
                get: jest.fn().mockReturnValueOnce(Promise.resolve({
                  data: {
                    foo: 'bar'
                  }
                }))
              };
              success = jest.fn();
              _context3.next = 10;
              return file.getFile('id', success);

            case 10:
              expect(success).toHaveBeenCalledWith({
                id: '123',
                foo: 'bar',
                missing: null
              });
              expect(fields.findMissingProperties).toHaveBeenCalledWith({
                id: '123'
              }, undefined);
              expect(fields.fillMissingProperties).toHaveBeenCalledWith({
                foo: 'bar'
              }, ['missing1', 'missing2']);
              expect(file.xhr.get).toHaveBeenCalledWith({
                id: 'file_id',
                url: 'https://api.box.com/2.0/files/id',
                params: {
                  fields: 'missing1,missing2'
                },
                headers: {
                  'X-Rep-Hints': X_REP_HINTS
                }
              });

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    test('should make xhr to get file and call success callback when missing fields',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var success;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              file.options = {
                cache: cache
              };
              file.getCache = jest.fn().mockReturnValueOnce(cache);
              file.getCacheKey = jest.fn().mockReturnValueOnce('key');
              fields.findMissingProperties = jest.fn().mockReturnValueOnce(['missing1', 'missing2']);
              fields.fillMissingProperties = jest.fn().mockReturnValueOnce('new file');
              file.xhr = {
                get: jest.fn().mockReturnValueOnce(Promise.resolve({
                  data: 'new file'
                }))
              };
              success = jest.fn();
              _context4.next = 9;
              return file.getFile('id', success);

            case 9:
              expect(success).toHaveBeenCalledWith('new file');
              expect(fields.findMissingProperties).toHaveBeenCalledWith({
                id: 'id'
              }, undefined);
              expect(fields.fillMissingProperties).toHaveBeenCalledWith('new file', ['missing1', 'missing2']);
              expect(file.xhr.get).toHaveBeenCalledWith({
                id: 'file_id',
                url: 'https://api.box.com/2.0/files/id',
                params: {
                  fields: 'missing1,missing2'
                },
                headers: {
                  'X-Rep-Hints': X_REP_HINTS
                }
              });

            case 13:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    test('should make xhr to get file and not call success callback when destroyed',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var success;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              fields.findMissingProperties = jest.fn().mockReturnValueOnce([]);
              file.isDestroyed = jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(true);
              file.xhr = {
                get: jest.fn().mockReturnValueOnce(Promise.resolve({
                  data: {
                    file: 'new file'
                  }
                }))
              };
              success = jest.fn();
              _context5.next = 6;
              return file.getFile('id', success);

            case 6:
              expect(success).not.toHaveBeenCalled();
              expect(file.xhr.get).toHaveBeenCalledWith({
                id: 'file_id',
                url: 'https://api.box.com/2.0/files/id',
                headers: {
                  'X-Rep-Hints': X_REP_HINTS
                }
              });

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    test('should call error callback when xhr fails',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var error, successCb, errorCb;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              error = new Error('error');
              fields.findMissingProperties = jest.fn().mockReturnValueOnce([]);
              file.xhr = {
                get: jest.fn().mockReturnValueOnce(Promise.reject(error))
              };
              successCb = jest.fn();
              errorCb = jest.fn();
              _context6.next = 7;
              return file.getFile('id', successCb, errorCb, {
                forceFetch: false,
                includePreviewSidebarFields: true
              });

            case 7:
              expect(successCb).not.toHaveBeenCalled();
              expect(errorCb).toHaveBeenCalledWith(error, ERROR_CODE_FETCH_FILE);
              expect(file.xhr.get).toHaveBeenCalledWith({
                id: 'file_id',
                url: 'https://api.box.com/2.0/files/id',
                headers: {
                  'X-Rep-Hints': X_REP_HINTS
                }
              });

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
    test('should make xhr to get file when forced to clear cache',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var success;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              cache.set('key', {
                id: '123'
              });
              fields.findMissingProperties = jest.fn().mockReturnValueOnce([]);
              fields.fillMissingProperties = jest.fn().mockReturnValueOnce({
                id: '123',
                foo: 'bar'
              });
              file.options = {
                cache: cache
              };
              file.getCache = jest.fn().mockReturnValueOnce(cache);
              file.getCacheKey = jest.fn().mockReturnValueOnce('key');
              file.xhr = {
                get: jest.fn().mockReturnValueOnce(Promise.resolve({
                  data: {
                    foo: 'bar'
                  }
                }))
              };
              success = jest.fn();
              _context7.next = 10;
              return file.getFile('id', success, 'error', {
                forceFetch: true
              });

            case 10:
              expect(file.getCacheKey).toHaveBeenCalledWith('id');
              expect(success).toHaveBeenCalledWith({
                id: '123',
                foo: 'bar'
              });
              expect(fields.findMissingProperties).toHaveBeenCalledWith({
                id: 'id'
              }, undefined);
              expect(fields.fillMissingProperties).toHaveBeenCalledWith({
                foo: 'bar'
              }, []);
              expect(file.xhr.get).toHaveBeenCalledWith({
                id: 'file_id',
                url: 'https://api.box.com/2.0/files/id',
                headers: {
                  'X-Rep-Hints': X_REP_HINTS
                }
              });

            case 15:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
    test('should make xhr to get file even with cached file when asked to update cache',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      var success;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              cache.set('key', {
                id: '123'
              });
              fields.findMissingProperties = jest.fn().mockReturnValueOnce([]);
              fields.fillMissingProperties = jest.fn().mockReturnValueOnce({
                id: 'new',
                foo: 'bar',
                missing: null
              });
              file.options = {
                cache: cache
              };
              file.getCache = jest.fn().mockReturnValueOnce(cache);
              file.getCacheKey = jest.fn().mockReturnValueOnce('key');
              file.xhr = {
                get: jest.fn().mockReturnValueOnce(Promise.resolve({
                  data: {
                    id: 'new',
                    foo: 'bar'
                  }
                }))
              };
              success = jest.fn();
              _context8.next = 10;
              return file.getFile('id', success, 'error', {
                forceFetch: false,
                refreshCache: true
              });

            case 10:
              expect(file.getCacheKey).toHaveBeenCalledWith('id');
              expect(success).toHaveBeenCalledTimes(2);
              expect(success).toHaveBeenNthCalledWith(1, {
                id: '123'
              });
              expect(success).toHaveBeenNthCalledWith(2, {
                id: 'new',
                foo: 'bar',
                missing: null
              });
              expect(fields.findMissingProperties).toHaveBeenCalledWith({
                id: '123'
              }, undefined);
              expect(fields.fillMissingProperties).toHaveBeenCalledWith({
                id: 'new',
                foo: 'bar'
              }, []);
              expect(file.xhr.get).toHaveBeenCalledWith({
                id: 'file_id',
                url: 'https://api.box.com/2.0/files/id',
                headers: {
                  'X-Rep-Hints': X_REP_HINTS
                }
              });

            case 17:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
  });
  describe('getFileExtension()', function () {
    beforeEach(function () {
      file.getFile = jest.fn();
    });
    test('should do nothing if destroyed', function () {
      file.isDestroyed = jest.fn().mockReturnValue(true);
      file.getFileExtension('id', function () {}, function () {});
      expect(file.getFile).not.toBeCalled();
    });
    test('should get the file with the extension field only', function () {
      file.isDestroyed = jest.fn().mockReturnValue(false);
      var id = 'id';
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      file.getFileExtension(id, successCallback, errorCallback);
      expect(file.getFile).toBeCalledWith(id, successCallback, errorCallback, {
        fields: [FIELD_EXTENSION]
      });
    });
  });
});