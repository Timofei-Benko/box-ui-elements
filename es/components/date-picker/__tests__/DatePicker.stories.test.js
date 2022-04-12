function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        selector                    | description\n        ", "  | ", "\n        ", " | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('components/date-picker/DatePicker', function () {
  var INPUT_SELECTOR = 'input';
  var DATEPICKER_STORIES = ['components-datepicker--basic', 'components-datepicker--with-description', 'components-datepicker--manually-editable', 'components-datepicker--with-limited-date-range', 'components-datepicker--always-visible-with-custom-input-field', 'components-datepicker--disabled-with-error-message', 'components-datepicker--custom-error-tooltip-position', 'components-datepicker--with-range'];
  test.each(DATEPICKER_STORIES)('looks visually correct when using story %s',
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(id) {
      var image;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return BoxVisualTestUtils.takeScreenshot(id);

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
  test.each(_templateObject(), '.date-picker-open-btn', 'shows calendar and date', '.date-picker-clear-btn', 'closes calendar and clears date')("$description for ".concat(DATEPICKER_STORIES[0]),
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(_ref3) {
      var selector, image;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              selector = _ref3.selector;
              _context2.next = 3;
              return BoxVisualTestUtils.takeScreenshotAfterInput(DATEPICKER_STORIES[0], selector);

            case 3:
              image = _context2.sent;
              return _context2.abrupt("return", expect(image).toMatchImageSnapshot());

            case 5:
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
  test("allows editing in story ".concat(DATEPICKER_STORIES[2]),
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var page, image;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return BoxVisualTestUtils.gotoStory(DATEPICKER_STORIES[2]);

          case 2:
            page = _context3.sent;
            _context3.next = 5;
            return page.waitForSelector(INPUT_SELECTOR);

          case 5:
            _context3.next = 7;
            return BoxVisualTestUtils.clearInput(INPUT_SELECTOR, page);

          case 7:
            _context3.next = 9;
            return page.type(INPUT_SELECTOR, '1/28/2020');

          case 9:
            _context3.next = 11;
            return page.screenshot();

          case 11:
            image = _context3.sent;
            return _context3.abrupt("return", expect(image).toMatchImageSnapshot());

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  test("shows limited range in ".concat(DATEPICKER_STORIES[3]),
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var image;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return BoxVisualTestUtils.takeScreenshotAfterInput(DATEPICKER_STORIES[3], INPUT_SELECTOR);

          case 2:
            image = _context4.sent;
            return _context4.abrupt("return", expect(image).toMatchImageSnapshot());

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  test("reflects changes in ".concat(DATEPICKER_STORIES[4]),
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5() {
    var image;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return BoxVisualTestUtils.takeScreenshotAfterInput(DATEPICKER_STORIES[4], 'td[data-day="10"]');

          case 2:
            image = _context5.sent;
            return _context5.abrupt("return", expect(image).toMatchImageSnapshot());

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  test("allows keyboard selection in ".concat(DATEPICKER_STORIES[4]),
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6() {
    var page, image;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return BoxVisualTestUtils.gotoStory(DATEPICKER_STORIES[4]);

          case 2:
            page = _context6.sent;
            _context6.next = 5;
            return page.waitForSelector(INPUT_SELECTOR);

          case 5:
            _context6.next = 7;
            return page.keyboard.down('Tab');

          case 7:
            _context6.next = 9;
            return page.keyboard.down('Tab');

          case 9:
            _context6.next = 11;
            return page.keyboard.down('ArrowLeft');

          case 11:
            _context6.next = 13;
            return page.keyboard.down('ArrowUp');

          case 13:
            _context6.next = 15;
            return page.screenshot();

          case 15:
            image = _context6.sent;
            return _context6.abrupt("return", expect(image).toMatchImageSnapshot());

          case 17:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
});