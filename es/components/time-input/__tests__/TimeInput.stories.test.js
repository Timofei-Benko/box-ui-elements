function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n        storyId                 | input          | testCase\n        ", " | ", " | ", "\n        ", " | ", "    | ", "\n        ", " | ", "          | ", "\n        ", " | ", " | ", "\n        ", " | ", "    | ", "\n        ", " | ", "          | ", "\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        storyId                 | input           | testCase\n        ", " | ", " | ", "\n        ", " | ", "      | ", "\n        ", " | ", "           | ", "\n        ", " | ", " | ", "\n        ", " | ", "      | ", "\n        ", " | ", "           | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// @ts-ignore flow import
import { DEFAULT_FORMAT_DEBOUNCE } from '../../../constants';
describe('components/time-input/TimeInput', function () {
  var INPUT_SELECTOR = 'input';
  var TIMEINPUT_STORIES = ['components-timeinput--required', 'components-timeinput--optional'];
  test.each(TIMEINPUT_STORIES)("looks correct when using story %s",
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(storyId) {
      var image;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return BoxVisualTestUtils.takeScreenshot(storyId);

            case 2:
              image = _context.sent;
              return _context.abrupt("return", expect(image).toMatchImageSnapshot());

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  test.each(_templateObject(), TIMEINPUT_STORIES[0], '11:51 p.m.', 'sets a valid date based on input after blur', TIMEINPUT_STORIES[0], 'abcde', 'shows an error for invalid input after blur', TIMEINPUT_STORIES[0], '', 'shows an error for empty input after blur', TIMEINPUT_STORIES[1], '11:51 p.m.', 'sets a valid date based on input after blur', TIMEINPUT_STORIES[1], 'abcde', 'shows an error for invalid input after blur', TIMEINPUT_STORIES[1], '', 'shows default time for empty input after blur')('$testCase for story $storyId',
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(_ref3) {
      var storyId, input, page, image;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              storyId = _ref3.storyId, input = _ref3.input;
              _context2.next = 3;
              return BoxVisualTestUtils.gotoStory(storyId);

            case 3:
              page = _context2.sent;
              _context2.next = 6;
              return page.waitForSelector(INPUT_SELECTOR);

            case 6:
              _context2.next = 8;
              return BoxVisualTestUtils.clearInput(INPUT_SELECTOR, page);

            case 8:
              _context2.next = 10;
              return page.type(INPUT_SELECTOR, input);

            case 10:
              _context2.next = 12;
              return BoxVisualTestUtils.blurInput(INPUT_SELECTOR);

            case 12:
              _context2.next = 14;
              return page.screenshot();

            case 14:
              image = _context2.sent;
              return _context2.abrupt("return", expect(image).toMatchImageSnapshot());

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
  test.each(_templateObject2(), TIMEINPUT_STORIES[0], '2:02 a.m.', 'sets a valid date based on input after change', TIMEINPUT_STORIES[0], '134525', 'shows an error for invalid input after change', TIMEINPUT_STORIES[0], '', 'shows an error for empty input after change', TIMEINPUT_STORIES[1], '2:02 a.m.', 'sets a valid date based on input after change', TIMEINPUT_STORIES[1], '134525', 'shows an error for invalid input after change', TIMEINPUT_STORIES[1], '', 'shows default time for empty input after change')('$testCase for story $storyId',
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(_ref5) {
      var storyId, input, page, image;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              storyId = _ref5.storyId, input = _ref5.input;
              _context3.next = 3;
              return BoxVisualTestUtils.gotoStory(storyId);

            case 3:
              page = _context3.sent;
              _context3.next = 6;
              return page.waitForSelector(INPUT_SELECTOR);

            case 6:
              _context3.next = 8;
              return BoxVisualTestUtils.clearInput(INPUT_SELECTOR, page);

            case 8:
              _context3.next = 10;
              return page.type(INPUT_SELECTOR, input);

            case 10:
              _context3.next = 12;
              return BoxVisualTestUtils.sleep(DEFAULT_FORMAT_DEBOUNCE * 1.1);

            case 12:
              _context3.next = 14;
              return page.screenshot();

            case 14:
              image = _context3.sent;
              return _context3.abrupt("return", expect(image).toMatchImageSnapshot());

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x3) {
      return _ref4.apply(this, arguments);
    };
  }());
});