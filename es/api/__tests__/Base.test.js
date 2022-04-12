import Xhr from '../../utils/Xhr';
import Cache from '../../utils/Cache';
import { getBadItemError, getBadPermissionsError } from '../../utils/error';
import Base from '../Base';
import { HTTP_GET, HTTP_POST, HTTP_PUT } from '../../constants';
var base;
describe('api/Base', function () {
  var baseResponse = {
    total_count: 0,
    entries: []
  };
  var errorCode = 'foo';
  beforeEach(function () {
    base = new Base({});
    base.errorCode = errorCode;
  });
  test('should should have correct defaults on construct', function () {
    expect(base.options.apiHost).toBe('https://api.box.com');
    expect(base.options.uploadHost).toBe('https://upload.box.com');
    expect(base.cache).toBeInstanceOf(Cache);
    expect(base.apiHost).toBe('https://api.box.com');
    expect(base.uploadHost).toBe('https://upload.box.com');
    expect(base.xhr).toBeInstanceOf(Xhr);
    expect(base.destroyed).toBeFalsy();
  });
  test('should should have correct values on construct', function () {
    var options = {
      cache: 'cache',
      apiHost: 'apiHost',
      uploadHost: 'uploadHost'
    };
    base = new Base(options);
    expect(base.options).toEqual(options);
    expect(base.cache).toBe('cache');
    expect(base.apiHost).toBe('apiHost');
    expect(base.uploadHost).toBe('uploadHost');
    expect(base.xhr).toBeInstanceOf(Xhr);
    expect(base.destroyed).toBeFalsy();
  });
  describe('destroy()', function () {
    beforeEach(function () {
      base.xhr = {
        abort: jest.fn()
      };
    });
    test('should return false when no destroyed', function () {
      expect(base.isDestroyed()).toBeFalsy();
      expect(base.xhr.abort).not.toHaveBeenCalled();
    });
    test('should return true when destroyed', function () {
      base.destroy();
      expect(base.isDestroyed()).toBeTruthy();
      expect(base.xhr.abort).toHaveBeenCalled();
    });
  });
  describe('checkApiCallValidity()', function () {
    var badItemError = getBadItemError();
    var permissionsError = getBadPermissionsError();
    test('should throw a bad item error for a missing file ID or permissions object', function () {
      try {
        base.checkApiCallValidity('can_edit', undefined, 'id');
      } catch (error) {
        expect(error.message).toBe(badItemError.message);
      }

      try {
        base.checkApiCallValidity('can_edit', {
          permissions: {
            can_edit: false
          }
        }, null);
      } catch (error) {
        expect(error.message).toBe(badItemError.message);
      }

      try {
        base.checkApiCallValidity('can_edit', {
          permissions: {}
        }, 'id');
      } catch (error) {
        expect(error.message).toBe(permissionsError.message);
      }
    });
    test('should throw a bad permissions error if the given permission is missing or false', function () {});
  });
  describe('getBaseApiUrl()', function () {
    test('should return correct api url', function () {
      base = new Base({
        apiHost: 'apiHost'
      });
      expect(base.getBaseApiUrl()).toBe('apiHost/2.0');
    });
    test('should return correct api url with trailing /', function () {
      base = new Base({
        apiHost: 'apiHost/'
      });
      expect(base.getBaseApiUrl()).toBe('apiHost/2.0');
    });
  });
  describe('getBaseUploadUrl()', function () {
    test('should return correct api upload url', function () {
      base = new Base({
        uploadHost: 'uploadHost'
      });
      expect(base.getBaseUploadUrl()).toBe('uploadHost/api/2.0');
    });
    test('should return correct api upload url with trailing /', function () {
      base = new Base({
        uploadHost: 'uploadHost/'
      });
      expect(base.getBaseUploadUrl()).toBe('uploadHost/api/2.0');
    });
  });
  describe('getCache()', function () {
    test('should return correct cache', function () {
      base.cache = 'foo';
      expect(base.getCache()).toBe('foo');
    });
  });
  describe('errorCallback()', function () {
    beforeEach(function () {
      base.errorCallback = jest.fn();
      base.isDestroyed = jest.fn().mockReturnValue(false);
      base.errorCode = 1;
    });
    test('should do nothing if destroyed', function () {
      base.isDestroyed = jest.fn().mockReturnValueOnce(true);
      base.errorHandler(new Error());
      expect(base.errorCallback).not.toBeCalled();
    });
    test('should call the error callback with the response data if present', function () {
      base.errorCallback = jest.fn();
      var error = {
        response: {
          data: 'foo'
        }
      };
      base.errorHandler(error);
      expect(base.errorCallback).toBeCalledWith('foo', 1);
    });
    test('should call the error callback with the whole error if the response data is not present', function () {
      base.errorCallback = jest.fn();
      var error = {
        customStuff: {
          data: 'foo'
        }
      };
      base.errorHandler(error);
      expect(base.errorCallback).toBeCalledWith(error, 1);
    });
  });
  describe('get()', function () {
    test('should make a correct GET request', function () {
      var id = 'id';
      var url = 'https://www.foo.com';
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      var requestData = {
        fields: 'start=0'
      };
      base.makeRequest = jest.fn();
      base.getUrl = jest.fn(function () {
        return url;
      });
      base.get({
        id: id,
        successCallback: successCallback,
        errorCallback: errorCallback,
        requestData: requestData
      });
      expect(base.makeRequest).toHaveBeenCalledWith(HTTP_GET, id, url, successCallback, errorCallback, requestData);
    });
  });
  describe('makeRequest()', function () {
    var url = 'https://foo.bar';
    test('should not do anything if destroyed', function () {
      base.isDestroyed = jest.fn().mockReturnValueOnce(true);
      base.xhr = null;
      var successCb = jest.fn();
      var errorCb = jest.fn();
      return base.makeRequest(HTTP_GET, 'id', url, successCb, errorCb).catch(function () {
        expect(successCb).not.toHaveBeenCalled();
        expect(errorCb).not.toHaveBeenCalled();
      });
    });
    test('should make xhr to get base and call success callback', function () {
      base.xhr = {
        post: jest.fn().mockReturnValueOnce(Promise.resolve({
          data: baseResponse
        }))
      };
      var successCb = jest.fn();
      var errorCb = jest.fn();
      return base.makeRequest(HTTP_POST, 'id', url, successCb, errorCb).then(function () {
        expect(successCb).toHaveBeenCalledWith(baseResponse);
        expect(base.xhr.post).toHaveBeenCalledWith({
          id: 'file_id',
          url: url
        });
      });
    });
    test('should call error callback when xhr fails', function () {
      var error = new Error('error');
      base.xhr = {
        put: jest.fn().mockReturnValueOnce(Promise.reject(error))
      };
      var successCb = jest.fn();
      var errorCb = jest.fn();
      return base.makeRequest(HTTP_PUT, 'id', url, successCb, errorCb).then(function () {
        expect(successCb).not.toHaveBeenCalled();
        expect(errorCb).toHaveBeenCalledWith(error, errorCode);
        expect(base.xhr.put).toHaveBeenCalledWith({
          id: 'file_id',
          url: url
        });
      });
    });
    test('should pass along request data', function () {
      var requestData = {
        data: {
          item: {
            id: 'id',
            type: 'file'
          },
          message: 'hello world'
        }
      };
      base.xhr = {
        post: jest.fn().mockReturnValueOnce(Promise.resolve({
          data: baseResponse
        }))
      };
      var successCb = jest.fn();
      var errorCb = jest.fn();
      return base.makeRequest(HTTP_POST, 'id', url, successCb, errorCb, requestData).then(function () {
        expect(successCb).toHaveBeenCalledWith(baseResponse);
        expect(base.xhr.post).toHaveBeenCalledWith({
          id: 'file_id',
          url: url,
          data: requestData.data
        });
      });
    });
  });
});