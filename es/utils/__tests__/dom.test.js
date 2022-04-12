function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            ref                                                  | isOverflowed | note\n            ", " | ", "      | ", "\n            ", " | ", "     | ", "\n            ", " | ", "     | ", "\n            ", "                                 | ", "     | ", "\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            innerHTMLValue                                                                       | result   | description\n            ", "                                                                              | ", " | ", "\n            ", "                                         | ", "  | ", "\n            ", "         | ", "  | ", "\n            ", " | ", " | ", "\n            ", "                                                 | ", " | ", "\n            ", "                                                     | ", "  | ", "\n            ", "         | ", "  | ", "\n            ", "  | ", "  | ", "\n            ", "       | ", " | ", "\n            ", "                                            | ", " | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import { renderHook } from '@testing-library/react-hooks';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';
import { isActivateKey, isFocusableElement, isLeftClick, scrollIntoView, useIsContentOverflowed } from '../dom';
jest.mock('scroll-into-view-if-needed');
describe('util/dom', function () {
  describe('isActivateKey', function () {
    test('should return true for enter and space keys', function () {
      expect(isActivateKey({
        key: 'Enter'
      })).toBe(true);
      expect(isActivateKey({
        key: ' '
      })).toBe(true);
    });
    test('should return false for all other keys', function () {
      expect(isActivateKey({
        key: 'Ctrl'
      })).toBe(false);
      expect(isActivateKey({
        key: 'Tab'
      })).toBe(false);
    });
  });
  describe('isLeftClick', function () {
    test('should return true for unmodified left click events', function () {
      expect(isLeftClick({
        button: 0
      })).toBe(true);
    });
    test('should return false for modified left click events', function () {
      expect(isLeftClick({
        button: 0,
        altKey: true
      })).toBe(false);
      expect(isLeftClick({
        button: 0,
        ctrlKey: true
      })).toBe(false);
      expect(isLeftClick({
        button: 0,
        metaKey: true
      })).toBe(false);
      expect(isLeftClick({
        button: 0,
        shiftKey: true
      })).toBe(false);
    });
    test('should return false for unmodified right click events', function () {
      expect(isLeftClick({
        button: 1
      })).toBe(false);
    });
  });
  describe('scrollIntoView()', function () {
    beforeEach(function () {
      // Set up a place to mount
      document.body.innerHTML = '<div class="modal"> <div class="button" /> </div>';
    });
    afterEach(function () {
      document.body.innerHTML = '';
    });
    test('should call scrollIntoViewIfNeeded when parent element is found', function () {
      var itemEl = document.querySelector('.button');
      var parentEl = document.querySelector('.modal');
      scrollIntoView(itemEl);
      expect(scrollIntoViewIfNeeded).toHaveBeenCalledWith(itemEl, {
        boundary: parentEl,
        scrollMode: 'if-needed'
      });
    });
    test('should not call scrollIntoViewIfNeeded when parent element is evaluated as null', function () {
      var itemEl = document.querySelector('.input');
      scrollIntoView(itemEl);
      expect(scrollIntoViewIfNeeded).not.toHaveBeenCalled();
    });
  });
  describe('isFocusableElement', function () {
    afterEach(function () {
      document.body.innerHTML = '';
    });
    test.each(_templateObject(), null, false, 'null', '<span class="checkbox-pointer-target"/>', true, 'an element with a checkbox class', '<div class="checkbox-label"><span class="other-classname"></span></div>', true, 'an element with a parent with a checkbox class', '<div class="other-parent-classname"><span class="other-classname"></span></div>', false, 'an element with no checkbox classes and a parent without a checkbox class', '<span class="other-classname"/>', false, 'an element with no checkbox classes and no parent element', '<span class="btn-content"/>', true, 'an element with a button class', '<button class="btn" type="submit"><span class="other-classname"/></div>', true, 'an element with a parent with a button class', '<button class="bdl-Button" type="submit"><span class="other-classname"/></div>', true, 'an element with a parent with a bdl-namespaced button class', '<div class="other-parent-classname"><span class="other-classname"/></div>', false, 'an element with no button classes and a parent without a button class', '<span className="other-classname" />', false, 'an element with no button classes and no parent element')('returns $result when given $description', function (_ref) {
      var innerHTMLValue = _ref.innerHTMLValue,
          result = _ref.result;
      document.body.innerHTML = innerHTMLValue;
      var spanElement = document.querySelector('span');
      expect(isFocusableElement(spanElement)).toBe(result);
    });
  });
  describe('useIsContentOverflowed', function () {
    test.each(_templateObject2(), {
      current: {
        offsetWidth: 10,
        scrollWidth: 20
      }
    }, true, 'offset < scroll', {
      current: {
        offsetWidth: 20,
        scrollWidth: 10
      }
    }, false, 'offset > scroll', {
      current: {
        offsetWidth: 20,
        scrollWidth: 20
      }
    }, false, 'offset == scroll', {
      current: null
    }, false, 'null ref')('given $note, result is $isOverflowed', function (_ref2) {
      var ref = _ref2.ref,
          isOverflowed = _ref2.isOverflowed;

      var _renderHook = renderHook(function () {
        return useIsContentOverflowed(ref);
      }),
          result = _renderHook.result;

      expect(result.current).toBe(isOverflowed);
    });
    test('responds to change in ref value with new result',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var ref, _renderHook2, result, rerender;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              ref = {
                current: {
                  offsetWidth: 20,
                  scrollWidth: 10
                }
              };
              _renderHook2 = renderHook(function () {
                return useIsContentOverflowed(ref);
              }), result = _renderHook2.result, rerender = _renderHook2.rerender;
              expect(result.current).toBe(false);
              ref.current = {
                offsetWidth: 10,
                scrollWidth: 20
              };
              rerender();
              expect(result.current).toBe(true);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  });
});