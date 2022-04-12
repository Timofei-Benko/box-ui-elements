function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import HTTPChannel from '../HTTPChannel';
import * as cookies from '../cookies';
var fakeXHR;
var APP_NAME = 'AppName';
var URL = 'http://127.0.0.1:';
var CHANNEL_NAME = 'http-channel';
var TIMEOUT_MS = 5000;
var TIMEOUT_SECONDS = 5;
describe('api/box-edit/HTTPChannel', function () {
  beforeEach(function () {
    fakeXHR = {
      open: jest.fn(),
      send: jest.fn(),
      setRequestHeader: jest.fn()
    };
    jest.useFakeTimers();
  });
  afterEach(function () {
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });
  describe('createCORSRequest()', function () {
    beforeEach(function () {
      window.XMLHttpRequest = jest.fn(function () {
        return fakeXHR;
      });
    });
    test('should return XHR when XHR.open does not throw', function () {
      var channel = new HTTPChannel(APP_NAME, URL);
      var result = channel.createCORSRequest('GET', URL);
      expect(result).toEqual(fakeXHR);
    });
    test('should return XHR when XHR.open fails on first attempt', function () {
      fakeXHR.open = jest.fn(function () {
        return true;
      }).mockImplementationOnce(function () {
        throw new Error();
      });
      var channel = new HTTPChannel(APP_NAME, URL);
      var result = channel.createCORSRequest('GET', URL);
      expect(fakeXHR.open.mock.results[0].type).toEqual('throw');
      expect(result).toEqual(fakeXHR);
    }); // // TODO fix when we figure out return / settimeout

    test('should return XHR when XHR.open fails on first and second attempt', function () {
      fakeXHR.open = jest.fn(function () {
        return true;
      }).mockImplementationOnce(function () {
        throw new Error();
      }).mockImplementationOnce(function () {
        throw new Error();
      });
      var channel = new HTTPChannel(APP_NAME, URL);
      var result = channel.createCORSRequest('GET', URL);
      expect(result).toEqual(fakeXHR);
    });
    test('should throw when XHR.open fails on first, second, and third attempt', function () {
      fakeXHR.open = jest.fn(function () {
        throw new Error();
      });
      var catchMock = jest.fn();
      var channel = new HTTPChannel(APP_NAME, URL);

      try {
        channel.createCORSRequest('GET', URL);
      } catch (err) {
        catchMock();
      } finally {
        expect(catchMock).toBeCalled();
      }
    });
  });
  describe('getComServerStatusInstallationPromise()', function () {
    test('should resolve returned promise',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var expected, channel, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              expected = '1234';
              channel = new HTTPChannel(APP_NAME, URL, CHANNEL_NAME);
              channel.checkInstallStatus = jest.fn().mockResolvedValue(expected);
              _context.next = 5;
              return channel.getComServerStatusInstallationPromise(TIMEOUT_MS);

            case 5:
              result = _context.sent;
              expect(result).toEqual(expected);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    test('should reject when checkInstallStatus rejects with notrunning',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var channel, expected, catchMock;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              channel = new HTTPChannel(APP_NAME, URL, CHANNEL_NAME);
              expected = 'notrunning';
              channel.checkInstallStatus = jest.fn().mockRejectedValueOnce(expected);
              catchMock = jest.fn();
              _context2.prev = 4;
              _context2.next = 7;
              return channel.getComServerStatusInstallationPromise(TIMEOUT_MS);

            case 7:
              _context2.next = 12;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](4);
              catchMock();

            case 12:
              _context2.prev = 12;
              expect(catchMock).toBeCalled();
              return _context2.finish(12);

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[4, 9, 12, 15]]);
    })));
    test('should retry with fallback port when checkInstallStatus rejects',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var expected, channel, result;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              expected = '1234';
              channel = new HTTPChannel(APP_NAME, URL, CHANNEL_NAME);
              channel.checkInstallStatus = jest.fn().mockRejectedValueOnce().mockResolvedValueOnce(expected);
              _context3.next = 5;
              return channel.getComServerStatusInstallationPromise(TIMEOUT_MS);

            case 5:
              result = _context3.sent;
              expect(result).toEqual(expected);

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
  describe('sendComServerRequest()', function () {
    test('should return a promise that resolves when its request succeeds', function (done) {
      var channel = new HTTPChannel(APP_NAME, URL);
      channel.createCORSRequest = jest.fn().mockReturnValue(fakeXHR);
      channel.sendComServerRequest('GET', URL, {}, TIMEOUT_MS).then(function (result) {
        expect(result).toEqual(fakeXHR);
        done();
      });
      jest.advanceTimersByTime(1);
      fakeXHR.onload();
    });
    test('should return a promise that rejects when its request errors', function (done) {
      var channel = new HTTPChannel(APP_NAME, URL);
      channel.createCORSRequest = jest.fn().mockReturnValue(fakeXHR);
      channel.sendComServerRequest('GET', URL, {}, TIMEOUT_MS).catch(function (result) {
        expect(result).toEqual(fakeXHR);
        done();
      });
      fakeXHR.onerror();
    });
    test('should return a promise that rejects when it times out', function (done) {
      var channel = new HTTPChannel(APP_NAME, URL);
      channel.createCORSRequest = jest.fn().mockReturnValue(fakeXHR);
      channel.sendComServerRequest('GET', URL, {}, TIMEOUT_MS).catch(function (result) {
        expect(result).toEqual(fakeXHR);
        done();
      });
      fakeXHR.ontimeout();
    });
  });
  describe('checkInstallStatus()', function () {
    test('should return a promise that resolves successfully when its AJAX call succeeds',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var channel, expectedResponse, result;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              channel = new HTTPChannel(APP_NAME, URL);
              expectedResponse = {
                running: true
              };
              channel.sendComServerRequest = jest.fn().mockResolvedValue({
                responseText: JSON.stringify(expectedResponse)
              });
              _context4.next = 5;
              return channel.checkInstallStatus(1234, TIMEOUT_MS);

            case 5:
              result = _context4.sent;
              expect(result).toEqual(expectedResponse);

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    test('should return a promise that rejects when its AJAX call fails',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var channel, catchMock;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              channel = new HTTPChannel(APP_NAME, URL);
              channel.sendComServerRequest = jest.fn().mockRejectedValue();
              catchMock = jest.fn();
              _context5.prev = 3;
              _context5.next = 6;
              return channel.checkInstallStatus(1234, TIMEOUT_MS);

            case 6:
              _context5.next = 11;
              break;

            case 8:
              _context5.prev = 8;
              _context5.t0 = _context5["catch"](3);
              catchMock();

            case 11:
              _context5.prev = 11;
              expect(catchMock).toBeCalled();
              return _context5.finish(11);

            case 14:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[3, 8, 11, 14]]);
    })));
    test('should return a promise that rejects when its AJAX response is invalid ',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var channel, expectedResponse;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              channel = new HTTPChannel(APP_NAME, URL);
              expectedResponse = {
                running: false
              };
              channel.sendComServerRequest = jest.fn().mockResolvedValue({
                responseText: JSON.stringify(expectedResponse)
              });
              _context6.prev = 3;
              _context6.next = 6;
              return channel.checkInstallStatus(1234, TIMEOUT_MS);

            case 6:
              _context6.next = 11;
              break;

            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6["catch"](3);
              expect(_context6.t0.message).toEqual('notrunning');

            case 11:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[3, 8]]);
    })));
  });
  describe('getComChannel()', function () {
    test('should return the appropriate cookie when called', function () {
      var appName = 'foo';

      var expected = _defineProperty({}, appName, 'bar');

      cookies.get = jest.fn(appName).mockReturnValue(expected[appName]);
      var channel = new HTTPChannel(APP_NAME, URL);
      var result = channel.getComChannel(appName);
      expect(result).toEqual('bar');
    });
  });
  describe('setComChannel()', function () {
    test('should set the appropriate cookies and return appropriately when called and bgp-id already set', function () {
      var channel = new HTTPChannel(APP_NAME, URL);
      channel.getComChannel = jest.fn().mockReturnValue('foo-id');
      cookies.set = jest.fn();
      var result = channel.setComChannel('foo');
      expect(cookies.set.mock.calls[0]).toContain('foo-bgp-id');
      expect(cookies.set.mock.calls[1]).toContain('bgp-foo-id');
      expect(result).toEqual('bgp-foo-id');
    });
    test('should set the appropriate cookies and return appropriately when called and bgp-id already set', function () {
      var channel = new HTTPChannel(APP_NAME, URL);
      channel.getComChannel = jest.fn().mockReturnValue(undefined);
      channel.generateId = jest.fn().mockReturnValue('bar-id');
      cookies.set = jest.fn();
      var result = channel.setComChannel('foo');
      expect(cookies.set.mock.calls[0]).toContain('foo-bgp-id');
      expect(cookies.set.mock.calls[1]).toContain('bgp-bar-id');
      expect(result).toEqual('bgp-bar-id');
    });
  });
  describe('getComServerStatus()', function () {
    test('should set and return the com server installation status when called and comserver installation promise not set', function () {
      var expected = {
        foo: 'bar'
      };
      var channel = new HTTPChannel(APP_NAME, URL);
      channel.comServerInstallationPromise = false;
      channel.getComServerStatusInstallationPromise = jest.fn().mockReturnValue(expected);
      var result = channel.getComServerStatus(1234);
      expect(channel.comServerInstallationPromise).toEqual(expected);
      expect(result).toEqual(expected);
    });
    test('should return comserver installation promise without reinitializing when called and it is already set', function () {
      var expected = {
        foo: 'bar'
      };
      var channel = new HTTPChannel(APP_NAME, URL);
      channel.comServerInstallationPromise = expected;
      channel.getComServerStatusInstallationPromise = jest.fn();
      var result = channel.getComServerStatus(111);
      expect(result).toEqual(expected);
      expect(channel.getComServerStatusInstallationPromise).not.toBeCalled();
    });
  });
  describe('sendRequest()', function () {
    test('should return a promise that resolves when its com server request succeeds',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var expectedResponseText, channel, result;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              expectedResponseText = {
                bar: 'baz'
              };
              channel = new HTTPChannel(APP_NAME, URL);
              channel.sendComServerRequest = jest.fn().mockResolvedValue({
                responseText: JSON.stringify(expectedResponseText)
              });
              _context7.next = 5;
              return channel.sendRequest({
                foo: 'bar'
              }, TIMEOUT_MS, TIMEOUT_SECONDS);

            case 5:
              result = _context7.sent;
              expect(result).toEqual(expectedResponseText);

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
    test('should return a promise that rejects when the com server response is not well formed',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      var expectedResponseText, channel;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              expectedResponseText = {
                response_type: 'error',
                message: 'blah'
              };
              channel = new HTTPChannel(APP_NAME, URL);
              channel.sendComServerRequest = jest.fn().mockResolvedValue({
                responseText: JSON.stringify(expectedResponseText)
              });
              _context8.prev = 3;
              _context8.next = 6;
              return channel.sendRequest({
                foo: 'bar'
              }, TIMEOUT_MS, TIMEOUT_SECONDS);

            case 6:
              _context8.next = 11;
              break;

            case 8:
              _context8.prev = 8;
              _context8.t0 = _context8["catch"](3);
              expect(_context8.t0.message).toEqual('Communication error: blah');

            case 11:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[3, 8]]);
    })));
  });
  describe('sendCommand()', function () {
    test('should return a promise that resolves when its com server request succeeds',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9() {
      var expected, channel, result;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              expected = {
                firstName: 'greatest',
                lastName: 'ever'
              };
              channel = new HTTPChannel(APP_NAME, URL);
              channel.sendComServerRequest = jest.fn().mockResolvedValue({
                responseText: JSON.stringify(expected)
              });
              _context9.next = 5;
              return channel.sendCommand({}, TIMEOUT_MS, TIMEOUT_SECONDS);

            case 5:
              result = _context9.sent;
              expect(result).toEqual(expected);

            case 7:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
    test('should return a promise that rejects when the com server response is not well formed',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10() {
      var channel, catchMock;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              channel = new HTTPChannel(APP_NAME, URL);
              channel.sendComServerRequest = jest.fn().mockResolvedValue({
                responseText: 'not json'
              });
              catchMock = jest.fn();
              _context10.prev = 3;
              _context10.next = 6;
              return channel.sendCommand({}, TIMEOUT_MS, TIMEOUT_SECONDS);

            case 6:
              _context10.next = 11;
              break;

            case 8:
              _context10.prev = 8;
              _context10.t0 = _context10["catch"](3);
              catchMock();

            case 11:
              _context10.prev = 11;
              expect(catchMock).toBeCalled();
              return _context10.finish(11);

            case 14:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[3, 8, 11, 14]]);
    })));
  });
});