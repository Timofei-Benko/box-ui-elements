function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import TokenService from '../../utils/TokenService';
import Users from '../Users';
jest.mock('../../utils/TokenService');
TokenService.getReadToken.mockImplementation(function () {
  return Promise.resolve("".concat(Math.random()));
});
var users;
describe('api/Users', function () {
  beforeEach(function () {
    users = new Users({});
  });
  describe('getUrl()', function () {
    test('should return correct users api url without id', function () {
      expect(users.getUrl()).toBe('https://api.box.com/2.0/users/me');
    });
  });
  describe('getAvatarUrl()', function () {
    test('should return correct users avatar url', function () {
      expect(users.getAvatarUrl('foo')).toBe('https://api.box.com/2.0/users/foo/avatar');
    });
  });
  describe('getAvatarUrlWithAccessToken()', function () {
    test('should return cached avatar url if called with same user id',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var url1, url2;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return users.getAvatarUrlWithAccessToken('foo');

            case 2:
              url1 = _context.sent;
              _context.next = 5;
              return users.getAvatarUrlWithAccessToken('foo');

            case 5:
              url2 = _context.sent;
              expect(url1).toEqual(url2);
              expect(url1.startsWith('https://api.box.com/2.0/users/foo/avatar?access_token=')).toBe(true);
              expect(url1.indexOf('pic_type') !== -1).toBe(true);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    test('should not return cached avatar url if called with another id',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var url1, url2;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return users.getAvatarUrlWithAccessToken('foo');

            case 2:
              url1 = _context2.sent;
              _context2.next = 5;
              return users.getAvatarUrlWithAccessToken('bar');

            case 5:
              url2 = _context2.sent;
              expect(url1).not.toEqual(url2);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    test('should return null if there is no user id specified',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var url1;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return users.getAvatarUrlWithAccessToken();

            case 2:
              url1 = _context3.sent;
              expect(url1).toBeNull();

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
});