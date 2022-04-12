function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { renderHook, cleanup } from '@testing-library/react-hooks';
import useOnClickBody from '../useOnClickBody';
var addEventListener = jest.fn();
var removeEventListener = jest.fn();
var onClick1 = jest.fn();
var onClick2 = jest.fn();
Object.defineProperty(document, 'body', {
  value: {
    addEventListener: addEventListener,
    removeEventListener: removeEventListener
  }
});
describe('components/targeting/utils/useOnClickBody', function () {
  afterEach(function () {
    jest.resetAllMocks();
  });
  test('should attach and remove event listener when enabled',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            renderHook(function (_ref2) {
              var onClick = _ref2.onClick,
                  enable = _ref2.enable;
              return useOnClickBody(onClick, enable);
            }, {
              initialProps: {
                onClick: onClick1,
                enable: true
              }
            });
            expect(addEventListener).toHaveBeenCalledTimes(2);
            expect(removeEventListener).toHaveBeenCalledTimes(0);
            expect(addEventListener).toHaveBeenCalledWith('click', onClick1);
            expect(addEventListener).toHaveBeenCalledWith('contextmenu', onClick1);
            _context.next = 7;
            return cleanup();

          case 7:
            expect(addEventListener).toHaveBeenCalledTimes(2);
            expect(removeEventListener).toHaveBeenCalledTimes(2);
            expect(removeEventListener).toHaveBeenCalledWith('click', onClick1);
            expect(removeEventListener).toHaveBeenCalledWith('contextmenu', onClick1);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  test('should remove event listener when enable is turned off',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var _renderHook, rerender;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _renderHook = renderHook(function (_ref4) {
              var onClick = _ref4.onClick,
                  enable = _ref4.enable;
              return useOnClickBody(onClick, enable);
            }, {
              initialProps: {
                onClick: onClick1,
                enable: true
              }
            }), rerender = _renderHook.rerender;
            expect(addEventListener).toHaveBeenCalledTimes(2);
            expect(removeEventListener).toHaveBeenCalledTimes(0);
            expect(addEventListener).toHaveBeenCalledWith('click', onClick1);
            expect(addEventListener).toHaveBeenCalledWith('contextmenu', onClick1);
            rerender({
              onClick: onClick1,
              enable: false
            });
            expect(addEventListener).toHaveBeenCalledTimes(2);
            expect(removeEventListener).toHaveBeenCalledTimes(2);
            expect(removeEventListener).toHaveBeenCalledWith('click', onClick1);
            expect(removeEventListener).toHaveBeenCalledWith('contextmenu', onClick1);
            _context2.next = 12;
            return cleanup();

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  test('should remove and reattach event listener when onClick changed',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var _renderHook2, rerender;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _renderHook2 = renderHook(function (_ref6) {
              var onClick = _ref6.onClick,
                  enable = _ref6.enable;
              return useOnClickBody(onClick, enable);
            }, {
              initialProps: {
                onClick: onClick1,
                enable: true
              }
            }), rerender = _renderHook2.rerender;
            expect(addEventListener).toHaveBeenCalledTimes(2);
            expect(removeEventListener).toHaveBeenCalledTimes(0);
            expect(addEventListener).toHaveBeenCalledWith('click', onClick1);
            expect(addEventListener).toHaveBeenCalledWith('contextmenu', onClick1);
            rerender({
              onClick: onClick2,
              enable: true
            });
            expect(addEventListener).toHaveBeenCalledTimes(4);
            expect(removeEventListener).toHaveBeenCalledTimes(2);
            expect(removeEventListener).toHaveBeenCalledWith('click', onClick1);
            expect(removeEventListener).toHaveBeenCalledWith('contextmenu', onClick1);
            expect(addEventListener).toHaveBeenCalledWith('click', onClick2);
            expect(addEventListener).toHaveBeenCalledWith('contextmenu', onClick2);
            _context3.next = 14;
            return cleanup();

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  test('should not attach or remove event listener when not enabled',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            renderHook(function (_ref8) {
              var onClick = _ref8.onClick,
                  enable = _ref8.enable;
              return useOnClickBody(onClick, enable);
            }, {
              initialProps: {
                onClick: onClick1,
                enable: false
              }
            });
            expect(addEventListener).toHaveBeenCalledTimes(0);
            expect(removeEventListener).toHaveBeenCalledTimes(0);
            _context4.next = 5;
            return cleanup();

          case 5:
            expect(addEventListener).toHaveBeenCalledTimes(0);
            expect(removeEventListener).toHaveBeenCalledTimes(0);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  test('should add event listener when enable is turned on',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5() {
    var _renderHook3, rerender;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _renderHook3 = renderHook(function (_ref10) {
              var onClick = _ref10.onClick,
                  enable = _ref10.enable;
              return useOnClickBody(onClick, enable);
            }, {
              initialProps: {
                onClick: onClick1,
                enable: false
              }
            }), rerender = _renderHook3.rerender;
            expect(addEventListener).toHaveBeenCalledTimes(0);
            expect(removeEventListener).toHaveBeenCalledTimes(0);
            rerender({
              onClick: onClick1,
              enable: true
            });
            expect(addEventListener).toHaveBeenCalledTimes(2);
            expect(removeEventListener).toHaveBeenCalledTimes(0);
            expect(addEventListener).toHaveBeenCalledWith('click', onClick1);
            expect(addEventListener).toHaveBeenCalledWith('contextmenu', onClick1);
            _context5.next = 10;
            return cleanup();

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  test('should not attach event listener when onClick changed but enable is off',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6() {
    var _renderHook4, rerender;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _renderHook4 = renderHook(function (_ref12) {
              var onClick = _ref12.onClick,
                  enable = _ref12.enable;
              return useOnClickBody(onClick, enable);
            }, {
              initialProps: {
                onClick: onClick1,
                enable: false
              }
            }), rerender = _renderHook4.rerender;
            expect(addEventListener).toHaveBeenCalledTimes(0);
            expect(removeEventListener).toHaveBeenCalledTimes(0);
            rerender({
              onClick: onClick2,
              enable: false
            });
            expect(addEventListener).toHaveBeenCalledTimes(0);
            expect(removeEventListener).toHaveBeenCalledTimes(0);
            _context6.next = 8;
            return cleanup();

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
});