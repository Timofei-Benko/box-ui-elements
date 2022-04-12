function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            condition                      | shouldRetry | method      | retryableStatusCodes | responseCode | hasRequestBody | retryCount | expected\n            ", "         | ", "    | ", "    | ", "         | ", "       | ", "        | ", "       | ", "\n            ", "           | ", "     | ", "    | ", "         | ", "       | ", "        | ", "       | ", "\n            ", "        | ", "     | ", "    | ", "         | ", "       | ", "        | ", "       | ", "\n            ", "        | ", "     | ", "    | ", "         | ", "       | ", "        | ", "       | ", "\n            ", "          | ", "     | ", "    | ", "         | ", " | ", "       | ", "       | ", "\n            ", "   | ", "     | ", "   | ", "             | ", "       | ", "        | ", "       | ", "\n            ", "    | ", "     | ", "    | ", "             | ", "       | ", "        | ", "       | ", "\n            ", " | ", "     | ", " | ", "             | ", "       | ", "        | ", "       | ", "\n            ", "  | ", "     | ", "   | ", "         | ", "       | ", "        | ", "       | ", "\n            ", "     | ", "     | ", "    | ", "         | ", "       | ", "        | ", "       | ", "\n            ", " | ", "     | ", "    | ", "        | ", "       | ", "        | ", "       | ", "\n            ", "   | ", "     | ", "    | ", "         | ", " | ", "        | ", "       | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import noop from 'lodash/noop';
import TokenService from '../TokenService';
import Xhr from '../Xhr';
jest.mock('../TokenService');
TokenService.getReadToken.mockImplementation(function () {
  return Promise.resolve("".concat(Math.random()));
});
describe('util/Xhr', function () {
  var xhrInstance;
  beforeEach(function () {
    xhrInstance = new Xhr({
      token: '123'
    });
  });
  describe('get()', function () {
    test('should make get call with axios', function () {
      var url = 'parsedurl';
      xhrInstance.getParsedUrl = jest.fn().mockReturnValue(url);
      xhrInstance.getHeaders = jest.fn().mockReturnValue(Promise.resolve({}));
      xhrInstance.axios = {
        get: jest.fn().mockReturnValue({})
      };
      return xhrInstance.get({
        url: 'url',
        data: {}
      }).then(function () {
        expect(xhrInstance.axios.get).toHaveBeenCalledWith('url', {
          cancelToken: xhrInstance.axiosSource.token,
          params: {},
          headers: {},
          parsedUrl: url
        });
      });
    });
  });
  describe('post()', function () {
    test('should make post call with axios', function () {
      var url = 'parsedurl';
      xhrInstance.getParsedUrl = jest.fn().mockReturnValue(url);
      xhrInstance.getHeaders = jest.fn().mockReturnValue(Promise.resolve({}));
      xhrInstance.axios = jest.fn().mockReturnValue({});
      return xhrInstance.post({
        url: 'url',
        data: {}
      }).then(function () {
        expect(xhrInstance.axios).toHaveBeenCalledWith({
          url: 'url',
          method: 'POST',
          parsedUrl: url,
          data: {},
          headers: {}
        });
      });
    });
  });
  describe('put()', function () {
    test('should call post() with put method', function () {
      xhrInstance.post = jest.fn();
      xhrInstance.put({
        id: '123',
        url: 'url',
        data: {}
      });
      expect(xhrInstance.post).toHaveBeenCalledWith({
        id: '123',
        url: 'url',
        data: {},
        method: 'PUT',
        headers: {}
      });
    });
  });
  describe('delete()', function () {
    test('should call post() with delete method', function () {
      xhrInstance.post = jest.fn();
      xhrInstance.delete({
        id: '123',
        url: 'url',
        data: {}
      });
      expect(xhrInstance.post).toHaveBeenCalledWith({
        id: '123',
        url: 'url',
        data: {},
        method: 'DELETE',
        headers: {}
      });
    });
  });
  describe('options()', function () {
    test('should make options call with axios and call successHandler on success', function () {
      var response = {
        data: {}
      };
      var successHandler = jest.fn();
      xhrInstance.getHeaders = jest.fn().mockReturnValue(Promise.resolve({}));
      xhrInstance.axios = jest.fn().mockReturnValue(Promise.resolve(response));
      return xhrInstance.options({
        successHandler: successHandler,
        errorHandler: noop
      }).then(function () {
        expect(xhrInstance.axios).toHaveBeenCalledWith({
          method: 'OPTIONS',
          headers: {}
        });
        expect(successHandler).toHaveBeenCalledWith(response);
      });
    });
    test('should call errorHandler on axios error', function () {
      var error = {
        status: ''
      };
      var errorHandler = jest.fn();
      xhrInstance.getHeaders = jest.fn().mockReturnValue(Promise.resolve({}));
      xhrInstance.axios = jest.fn().mockReturnValue(Promise.reject(error));
      return xhrInstance.options({
        successHandler: noop,
        errorHandler: errorHandler
      }).then(function () {
        expect(xhrInstance.axios).toHaveBeenCalledWith({
          method: 'OPTIONS',
          headers: {}
        });
        expect(errorHandler).toHaveBeenCalledWith(error);
      });
    });
    test('should call errorHandler on getHeaders error', function () {
      var error = {
        status: ''
      };
      var errorHandler = jest.fn();
      xhrInstance.getHeaders = jest.fn().mockReturnValue(Promise.reject(error));
      return xhrInstance.options({
        successHandler: noop,
        errorHandler: errorHandler
      }).then(function () {
        expect(errorHandler).toHaveBeenCalledWith(error);
      });
    });
  });
  describe('uploadFile()', function () {
    beforeEach(function () {
      jest.useFakeTimers();
    });
    afterEach(function () {
      jest.clearAllTimers();
    });
    test('should call abort & idleTimeoutHandler if there is no upload progress after idleTimeoutDuration', function () {
      xhrInstance.abort = jest.fn();
      xhrInstance.axios = jest.fn();
      xhrInstance.getHeaders = jest.fn().mockReturnValue(Promise.resolve({}));
      var idleTimoutHandler = jest.fn();
      return xhrInstance.uploadFile({
        successHandler: noop,
        errorHandler: noop,
        progressHandler: noop,
        withIdleTimeout: true,
        idleTimeoutDuration: 100,
        idleTimeoutHandler: idleTimoutHandler
      }).then(function () {
        jest.advanceTimersByTime(101); // 101ms should trigger idle timeout func that calls abort

        expect(xhrInstance.abort).toHaveBeenCalled();
        expect(idleTimoutHandler).toHaveBeenCalled();
      });
    });
    test('should not call abort if there is upload progress before idleTimeoutDuration', function () {
      var uploadHandler = jest.fn();
      xhrInstance.abort = jest.fn();
      xhrInstance.axios = jest.fn(function (_ref) {
        var onUploadProgress = _ref.onUploadProgress;
        jest.advanceTimersByTime(50); // simulate progress event after 50ms

        onUploadProgress();
      });
      xhrInstance.getHeaders = jest.fn().mockReturnValue(Promise.resolve({}));
      return xhrInstance.uploadFile({
        successHandler: noop,
        errorHandler: noop,
        progressHandler: uploadHandler,
        withIdleTimeout: true,
        idleTimeoutDuration: 100
      }).then(function () {
        jest.advanceTimersByTime(51); // 50 + 51ms will original idle timeout func unless cancelled

        expect(uploadHandler).toHaveBeenCalled();
        expect(xhrInstance.abort).not.toHaveBeenCalled();
      });
    });
    test('should call successHandler and not call abort if upload succeeds', function () {
      var successHandler = jest.fn();
      var response = {
        data: {}
      };
      xhrInstance.abort = jest.fn();
      xhrInstance.axios = jest.fn().mockReturnValue(Promise.resolve(response));
      xhrInstance.getHeaders = jest.fn().mockReturnValue(Promise.resolve({}));
      return xhrInstance.uploadFile({
        successHandler: successHandler,
        errorHandler: noop,
        progressHandler: noop,
        withIdleTimeout: true,
        idleTimeoutDuration: 100
      }).then(function () {
        jest.advanceTimersByTime(101);
        expect(xhrInstance.abort).not.toHaveBeenCalled();
        expect(successHandler).toHaveBeenCalledWith(response);
      });
    });
    test('should call errorHandler and not call abort if upload fails', function () {
      var errorHandler = jest.fn();
      var error = {
        status: ''
      };
      xhrInstance.abort = jest.fn();
      xhrInstance.axios = jest.fn().mockReturnValue(Promise.reject(error));
      xhrInstance.getHeaders = jest.fn().mockReturnValue(Promise.resolve({}));
      return xhrInstance.uploadFile({
        successHandler: noop,
        errorHandler: errorHandler,
        progressHandler: noop,
        withIdleTimeout: true,
        idleTimeoutDuration: 100
      }).then(function () {
        jest.advanceTimersByTime(101);
        expect(xhrInstance.abort).not.toHaveBeenCalled();
        expect(errorHandler).toHaveBeenCalledWith(error);
      });
    });
    test('should call errorHandler if getHeaders fails', function () {
      var errorHandler = jest.fn();
      var error = {
        status: ''
      };
      xhrInstance.getHeaders = jest.fn().mockReturnValue(Promise.reject(error));
      return xhrInstance.uploadFile({
        successHandler: noop,
        errorHandler: errorHandler,
        progressHandler: noop
      }).then(function () {
        expect(errorHandler).toHaveBeenCalledWith(error);
      });
    });
  });
  describe('abort()', function () {
    test('should cancel axios request', function () {
      var mockSource = {
        cancel: jest.fn()
      };
      xhrInstance.axiosSource = mockSource;
      xhrInstance.abort();
      expect(mockSource.cancel).toHaveBeenCalled();
    });
  });
  describe('defaultResponseInterceptor()', function () {
    test('should return the response', function () {
      var origResponse = {
        status: 500,
        foo: 'bar'
      };
      var response = xhrInstance.defaultResponseInterceptor(origResponse);
      expect(response).toEqual(origResponse);
    });
  });
  describe('shouldRetryRequest', function () {
    var createXhrInstance = function createXhrInstance(options) {
      xhrInstance = new Xhr(_objectSpread({
        token: '123'
      }, options));
    };

    test.each(_templateObject(), 'shouldRetry=false', false, 'get', undefined, 429, true, 0, false, 'max retries hit', true, 'get', undefined, 429, true, 3, false, 'invalid status 5xx', true, 'get', undefined, 500, true, 0, false, 'invalid status 4xx', true, 'get', undefined, 404, true, 0, false, 'error was thrown', true, 'get', undefined, undefined, false, 0, false, 'unsafe http method POST', true, 'post', [500], 500, true, 0, false, 'unsafe http method PUT', true, 'put', [500], 500, true, 0, false, 'unsafe http method DELETE', true, 'delete', [500], 500, true, 0, false, 'unsafe method w/429 code', true, 'post', undefined, 429, true, 0, true, 'rate limit status 429', true, 'get', undefined, 429, true, 0, true, 'custom retryable statuses', true, 'get', [503, 429], 503, true, 0, true, 'generic error is thrown', true, 'get', undefined, undefined, true, 0, true)("should retry = $expected when $condition", function (_ref2) {
      var shouldRetry = _ref2.shouldRetry,
          method = _ref2.method,
          retryableStatusCodes = _ref2.retryableStatusCodes,
          responseCode = _ref2.responseCode,
          hasRequestBody = _ref2.hasRequestBody,
          retryCount = _ref2.retryCount,
          expected = _ref2.expected;
      createXhrInstance({
        shouldRetry: shouldRetry,
        retryableStatusCodes: retryableStatusCodes
      });
      xhrInstance.retryCount = retryCount;
      var result = xhrInstance.shouldRetryRequest({
        response: responseCode ? {
          status: responseCode
        } : undefined,
        request: hasRequestBody ? {
          data: {
            foo: 'bar'
          }
        } : undefined,
        config: {
          method: method
        } // AxiosXHRConfig for the request

      });
      expect(result).toBe(expected);
    });
  });
  describe('getExponentialRetryTimeoutInMs()', function () {
    beforeEach(function () {
      jest.spyOn(Math, 'random').mockReturnValue(0.5);
    });
    test.each([[1, 1500], [2, 2500], [3, 4500], [4, 8500]])('should get exponential retry timeout %#', function (retryCount, expected) {
      expect(xhrInstance.getExponentialRetryTimeoutInMs(retryCount)).toBe(expected);
    });
  });
  describe('errorInterceptor()', function () {
    var DELAY = 500;
    beforeEach(function () {
      xhrInstance.shouldRetryRequest = jest.fn();
      xhrInstance.getExponentialRetryTimeoutInMs = jest.fn().mockReturnValue(DELAY);
      xhrInstance.responseInterceptor = jest.fn();
      jest.useFakeTimers();
    });
    test('should retry the request before calling the error interceptor', function () {
      var error = {
        status: 429,
        response: {
          data: undefined
        }
      };
      xhrInstance.axios = jest.fn().mockImplementation(function () {
        xhrInstance.errorInterceptor(error).then(function () {}).catch(function () {});
        return Promise.resolve();
      }); // first time return true, then false

      xhrInstance.shouldRetryRequest.mockReturnValue(false).mockReturnValueOnce(true);
      xhrInstance.errorInterceptor(error);
      expect(xhrInstance.retryCount).toBe(1);
      expect(xhrInstance.getExponentialRetryTimeoutInMs).toHaveBeenCalled();
      expect(xhrInstance.responseInterceptor).not.toHaveBeenCalled();
      jest.runAllTimers();
      expect(xhrInstance.axios).toHaveBeenCalled();
      expect(xhrInstance.retryCount).toBe(1);
      expect(xhrInstance.responseInterceptor).toHaveBeenCalledWith(error);
    });
    test('should not retry the request before calling the error interceptor', function () {
      expect.assertions(3);
      var response = {
        data: {
          foo: 'bar'
        }
      };
      var error = {
        status: 500,
        response: response
      };
      xhrInstance.axios = jest.fn().mockImplementation(function () {
        xhrInstance.errorInterceptor(error);
        return Promise.resolve();
      });
      xhrInstance.shouldRetryRequest.mockReturnValue(false);
      xhrInstance.errorInterceptor(error).catch(function () {
        expect(xhrInstance.getExponentialRetryTimeoutInMs).not.toHaveBeenCalled();
        expect(xhrInstance.axios).not.toHaveBeenCalled();
        expect(xhrInstance.responseInterceptor).toHaveBeenCalledWith(response.data);
      });
    });
  });
  describe('getHeaders()', function () {
    it('should not override any existing Accept-Language header',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var actHeaders;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              xhrInstance.language = 'bar';
              _context.next = 3;
              return xhrInstance.getHeaders('123', {
                'Accept-Language': 'foo'
              });

            case 3:
              actHeaders = _context.sent;
              expect(actHeaders['Accept-Language']).toBe('foo');

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('should apply Accept-Language header if language exists',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var actHeaders;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              xhrInstance.language = 'bar';
              _context2.next = 3;
              return xhrInstance.getHeaders('123');

            case 3:
              actHeaders = _context2.sent;
              expect(actHeaders['Accept-Language']).toBe('bar');

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
  });
});