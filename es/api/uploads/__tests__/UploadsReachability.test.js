function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            hostUrl        | getCachedResult | makeReachabilityRequestSucceed\n            ", " | ", "         | ", "\n            ", " | ", "         | ", "\n            ", " | ", "         | ", "\n            ", " | ", "         | ", "\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            hostUrl        | expectedIsReachable\n            ", " | ", "\n            ", " | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import axios from 'axios';
import UploadsReachability from '../UploadsReachability';
import { DEFAULT_HOSTNAME_UPLOAD, DEFAULT_HOSTNAME_UPLOAD_APP } from '../../../constants';
var uploadsReachability;
describe('api/uploads/UploadsReachability', function () {
  var hostUrls = ['host0', 'host1', 'host2', 'host3'];
  var currentTimeMS = 1000;
  var validResults = {
    host0: {
      isReachable: false,
      expirationTimestampMS: currentTimeMS + 1000
    },
    host1: {
      isReachable: true,
      expirationTimestampMS: currentTimeMS + 2000
    }
  };
  var validAndInvalidResults = {
    host0: {
      isReachable: true,
      expirationTimestampMS: currentTimeMS - 1
    },
    host2: {
      isReachable: false,
      expirationTimestampMS: currentTimeMS + 20
    },
    host3: {
      isReachable: false,
      expirationTimestampMS: currentTimeMS + 30
    }
  };
  beforeEach(function () {
    uploadsReachability = new UploadsReachability();
  });
  describe('isReachable()', function () {
    // Test cases in order
    // negative cached result
    // positive cached result
    test.each(_templateObject(), hostUrls[0], false, hostUrls[1], true)('should return the cached result when it exists and make no reachability requests',
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref2) {
        var hostUrl, expectedIsReachable, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                hostUrl = _ref2.hostUrl, expectedIsReachable = _ref2.expectedIsReachable;
                uploadsReachability.cachedResults = validResults;
                uploadsReachability.makeReachabilityRequest = jest.fn();
                uploadsReachability.getCachedResult = jest.fn().mockReturnValueOnce(validResults[hostUrl]);
                _context.next = 6;
                return uploadsReachability.isReachable(hostUrl);

              case 6:
                response = _context.sent;
                expect(response).toEqual(expectedIsReachable);
                expect(uploadsReachability.makeReachabilityRequest).not.toBeCalled();

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()); // Test cases in order
    // expired cached result, makeReachabilityRequest() succeeds
    // expired cached result, makeReachabilityRequest() fails
    // no cached result, makeReachabilityRequest() succeeds
    // no cached result, makeReachabilityRequest() fails

    test.each(_templateObject2(), hostUrls[0], null, true, hostUrls[0], null, false, hostUrls[1], null, true, hostUrls[1], null, false)('should return and store the result according to makeReachabilityRequest() when there is no valid cached result',
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(_ref4) {
        var hostUrl, getCachedResult, makeReachabilityRequestSucceed, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                hostUrl = _ref4.hostUrl, getCachedResult = _ref4.getCachedResult, makeReachabilityRequestSucceed = _ref4.makeReachabilityRequestSucceed;
                uploadsReachability.cachedResults = validAndInvalidResults;
                uploadsReachability.makeReachabilityRequest = jest.fn().mockReturnValueOnce(Promise.resolve(makeReachabilityRequestSucceed));
                uploadsReachability.getCachedResult = jest.fn().mockReturnValueOnce(getCachedResult);
                uploadsReachability.updateCachedResult = jest.fn();
                _context2.next = 7;
                return uploadsReachability.isReachable(hostUrl);

              case 7:
                response = _context2.sent;
                expect(response).toEqual(makeReachabilityRequestSucceed);
                expect(uploadsReachability.getCachedResult).toHaveBeenCalled();
                expect(uploadsReachability.updateCachedResult).toHaveBeenCalledWith(hostUrl, makeReachabilityRequestSucceed);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }());
    test('should return true when host is DEFAULT_HOSTNAME_UPLOAD, without checking cache and making a reachability test',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var response;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              uploadsReachability.getCachedResult = jest.fn();
              uploadsReachability.makeReachabilityRequest = jest.fn();
              _context3.next = 4;
              return uploadsReachability.isReachable("".concat(DEFAULT_HOSTNAME_UPLOAD, "/"));

            case 4:
              response = _context3.sent;
              expect(response).toBe(true);
              expect(uploadsReachability.getCachedResult).not.toHaveBeenCalled();
              expect(uploadsReachability.makeReachabilityRequest).not.toHaveBeenCalled();

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    test('should return true when host is DEFAULT_HOSTNAME_UPLOAD_APP, without checking cache and making a reachability test',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var response;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              uploadsReachability.getCachedResult = jest.fn();
              uploadsReachability.makeReachabilityRequest = jest.fn();
              _context4.next = 4;
              return uploadsReachability.isReachable("".concat(DEFAULT_HOSTNAME_UPLOAD_APP, "/"));

            case 4:
              response = _context4.sent;
              expect(response).toBe(true);
              expect(uploadsReachability.getCachedResult).not.toHaveBeenCalled();
              expect(uploadsReachability.makeReachabilityRequest).not.toHaveBeenCalled();

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
  });
  describe("makeReachabilityRequest()", function () {
    test("should return false when there is an error making POST request",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var response;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              axios.post = jest.fn().mockReturnValueOnce(Promise.reject());
              _context5.next = 3;
              return uploadsReachability.makeReachabilityRequest(hostUrls[0]);

            case 3:
              response = _context5.sent;
              expect(response).toBe(false);
              expect(axios.post).toHaveBeenCalled();

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    test('should return true when there is no error making POST reqeust',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var response;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              axios.post = jest.fn().mockReturnValueOnce(Promise.resolve());
              _context6.next = 3;
              return uploadsReachability.makeReachabilityRequest(hostUrls[0]);

            case 3:
              response = _context6.sent;
              expect(response).toBe(true);
              expect(axios.post).toHaveBeenCalled();

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
  });
  describe('getUnreachableHostsUrls()', function () {
    test('should return a empty list when cachedResults is null', function () {
      uploadsReachability.cachedResults = null;
      var response = uploadsReachability.getUnreachableHostsUrls();
      expect(response).toEqual([]);
    });
    test('should return a list of unreachable hosts when cachedResults is not null', function () {
      uploadsReachability.cachedResults = validResults;
      uploadsReachability.isCachedHostValid = jest.fn().mockReturnValueOnce(true);
      var response = uploadsReachability.getUnreachableHostsUrls();
      expect(response).toEqual(['host0']);
    });
  });
});