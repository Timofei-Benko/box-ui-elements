function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import Throttler from '../Throttler';
describe('features/targeting/utils/makeThrottle', function () {
  afterEach(function () {
    jest.resetAllMocks();
  });
  test('throttle if the one parameter is passed',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var callback, throttler;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            callback = jest.fn().mockImplementation(function (x) {
              return x + 1;
            });
            throttler = new Throttler();
            _context.t0 = expect;
            _context.next = 5;
            return throttler.throttle(function () {
              return callback(1);
            }, 1000, [1]);

          case 5:
            _context.t1 = _context.sent;
            (0, _context.t0)(_context.t1).toEqual(2);
            _context.t2 = expect;
            _context.next = 10;
            return throttler.throttle(function () {
              return callback(1);
            }, 1000, [1]);

          case 10:
            _context.t3 = _context.sent;
            (0, _context.t2)(_context.t3).toEqual(2);
            expect(callback.mock.calls).toEqual([[1]]);
            _context.t4 = expect;
            _context.next = 16;
            return throttler.throttle(function () {
              return callback(3);
            }, 1000, [2]);

          case 16:
            _context.t5 = _context.sent;
            (0, _context.t4)(_context.t5).toEqual(4);
            expect(callback.mock.calls).toEqual([[1], [3]]);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  test('will throttle within expiration date',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var dateNowMockFn, callback, throttler;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dateNowMockFn = jest.spyOn(Date, 'now').mockImplementationOnce(function () {
              return 1479427200000;
            }).mockImplementationOnce(function () {
              return 1479427200999;
            });
            callback = jest.fn().mockImplementation(function (x) {
              return x + 1;
            });
            throttler = new Throttler();
            _context2.t0 = expect;
            _context2.next = 6;
            return throttler.throttle(function () {
              return callback(1);
            }, 1000, [1]);

          case 6:
            _context2.t1 = _context2.sent;
            (0, _context2.t0)(_context2.t1).toEqual(2);
            _context2.t2 = expect;
            _context2.next = 11;
            return throttler.throttle(function () {
              return callback(1);
            }, 1000, [1]);

          case 11:
            _context2.t3 = _context2.sent;
            (0, _context2.t2)(_context2.t3).toEqual(2);
            expect(callback.mock.calls).toEqual([[1]]);
            dateNowMockFn.mockRestore();

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  test('will not throttle on or beyond expiration date',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var dateNowMockFn, callback, throttler;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            dateNowMockFn = jest.spyOn(Date, 'now').mockImplementationOnce(function () {
              return 1479427200000;
            }).mockImplementationOnce(function () {
              return 1479427201000;
            });
            callback = jest.fn().mockImplementation(function (x) {
              return x + 1;
            });
            throttler = new Throttler();
            _context3.t0 = expect;
            _context3.next = 6;
            return throttler.throttle(function () {
              return callback(1);
            }, 1000, [1]);

          case 6:
            _context3.t1 = _context3.sent;
            (0, _context3.t0)(_context3.t1).toEqual(2);
            _context3.t2 = expect;
            _context3.next = 11;
            return throttler.throttle(function () {
              return callback(1);
            }, 1000, [1]);

          case 11:
            _context3.t3 = _context3.sent;
            (0, _context3.t2)(_context3.t3).toEqual(2);
            expect(callback.mock.calls).toEqual([[1], [1]]);
            dateNowMockFn.mockRestore();

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  test('will retrieve value after last promise is resolved',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var callback, throttler, promise1, promise2;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            callback = jest.fn().mockImplementation(function (x) {
              return new Promise(function (resolve) {
                return setTimeout(function () {
                  resolve(x + 1);
                }, 1000);
              });
            });
            throttler = new Throttler();
            promise1 = throttler.throttle(function () {
              return callback(1);
            }, 1000, [1]);
            promise2 = throttler.throttle(function () {
              return callback(1);
            }, 1000, [1]);
            _context4.t0 = expect;
            _context4.next = 7;
            return promise1;

          case 7:
            _context4.t1 = _context4.sent;
            (0, _context4.t0)(_context4.t1).toEqual(2);
            _context4.t2 = expect;
            _context4.next = 12;
            return promise2;

          case 12:
            _context4.t3 = _context4.sent;
            (0, _context4.t2)(_context4.t3).toEqual(2);
            expect(promise1 === promise2).toBe(true);
            expect(callback.mock.calls).toEqual([[1]]);

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  test('will not throttle beyond expiration date',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5() {
    var callback, throttler;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            callback = jest.fn().mockImplementation(function (x) {
              return x + 1;
            });
            throttler = new Throttler();
            _context5.t0 = expect;
            _context5.next = 5;
            return throttler.throttle(function () {
              return callback(1);
            }, 1000, [1]);

          case 5:
            _context5.t1 = _context5.sent;
            (0, _context5.t0)(_context5.t1).toEqual(2);
            _context5.t2 = expect;
            _context5.next = 10;
            return throttler.throttle(function () {
              return callback(1);
            }, 1000, [1]);

          case 10:
            _context5.t3 = _context5.sent;
            (0, _context5.t2)(_context5.t3).toEqual(2);
            expect(callback.mock.calls).toEqual([[1]]);
            _context5.t4 = expect;
            _context5.next = 16;
            return throttler.throttle(function () {
              return callback(3);
            }, 1000, [2]);

          case 16:
            _context5.t5 = _context5.sent;
            (0, _context5.t4)(_context5.t5).toEqual(4);
            expect(callback.mock.calls).toEqual([[1], [3]]);

          case 19:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  test('throttle if the two parameters are passed',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6() {
    var callback, throttler;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            callback = jest.fn().mockImplementation(function (x) {
              return x + 1;
            });
            throttler = new Throttler();
            _context6.next = 4;
            return throttler.throttle(function () {
              return callback(1, 2);
            }, 1000, [1, 2]);

          case 4:
            _context6.next = 6;
            return throttler.throttle(function () {
              return callback(1, 2);
            }, 1000, [1, 2]);

          case 6:
            expect(callback.mock.calls).toEqual([[1, 2]]);
            _context6.next = 9;
            return throttler.throttle(function () {
              return callback(3, 4);
            }, 1000, [2, 3]);

          case 9:
            expect(callback.mock.calls).toEqual([[1, 2], [3, 4]]);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  test('throttle if key is passed',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7() {
    var callback, throttler;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            callback = jest.fn().mockImplementation(function (x) {
              return x + 1;
            });
            throttler = new Throttler();
            _context7.next = 4;
            return throttler.throttle(function () {
              return callback(1, 2);
            }, 1000, [], '1');

          case 4:
            _context7.next = 6;
            return throttler.throttle(function () {
              return callback(1, 2);
            }, 1000, [], '1');

          case 6:
            expect(callback.mock.calls).toEqual([[1, 2]]);
            _context7.next = 9;
            return throttler.throttle(function () {
              return callback(3, 4);
            }, 1000, [], '3');

          case 9:
            expect(callback.mock.calls).toEqual([[1, 2], [3, 4]]);

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
  test('throttle if key and two parametrs are passed',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8() {
    var callback, throttler;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            callback = jest.fn().mockImplementation(function (x) {
              return x + 1;
            });
            throttler = new Throttler();
            _context8.next = 4;
            return throttler.throttle(function () {
              return callback(1, 2);
            }, 1000, [2, 3], '1');

          case 4:
            _context8.next = 6;
            return throttler.throttle(function () {
              return callback(1, 2);
            }, 1000, [2, 3], '1');

          case 6:
            expect(callback.mock.calls).toEqual([[1, 2]]);
            _context8.next = 9;
            return throttler.throttle(function () {
              return callback(3, 4);
            }, 1000, [4, 5], '1');

          case 9:
            expect(callback.mock.calls).toEqual([[1, 2], [3, 4]]);
            _context8.next = 12;
            return throttler.throttle(function () {
              return callback(5, 6);
            }, 1000, [4, 5], '2');

          case 12:
            expect(callback.mock.calls).toEqual([[1, 2], [3, 4], [5, 6]]);

          case 13:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  })));
});