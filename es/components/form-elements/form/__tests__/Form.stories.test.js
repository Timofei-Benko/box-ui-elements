function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        selector                                | userInput          | description\n        ", "                | ", "         | ", "\n        ", "                | ", " | ", "\n        ", " | ", "        | ", "\n        ", " | ", "           | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('components/form-elements/form/Form', function () {
  var FORM_STORY = 'components-form-elements-form--basic';
  var REQUIRED_FIELD_SELECTOR = 'input:required';
  var BUTTON_SELECTOR = 'button';
  test("looks visually correct when using story ".concat(FORM_STORY),
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var image;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return BoxVisualTestUtils.takeScreenshot(FORM_STORY);

          case 2:
            image = _context.sent;
            return _context.abrupt("return", expect(image).toMatchImageSnapshot());

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  test('shows a required field error',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var image;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return BoxVisualTestUtils.takeScreenshotAfterInput(FORM_STORY, BUTTON_SELECTOR);

          case 2:
            image = _context2.sent;
            return _context2.abrupt("return", expect(image).toMatchImageSnapshot());

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  test.each(_templateObject(), 'input[type="email"]', 'abcde', 'shows an email validation error', 'input[type="email"]', 'sally@foo.bar', 'does not show an email validation error', 'input[name="customValidationFunc"]', 'notbox', 'shows a custom validation error', 'input[name="customValidationFunc"]', 'box', 'does not show a custom validation error')('$description',
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(_ref4) {
      var selector, userInput, image;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              selector = _ref4.selector, userInput = _ref4.userInput;
              _context3.next = 3;
              return global.page.goto("http://localhost:6061/iframe.html?id=".concat(FORM_STORY));

            case 3:
              _context3.next = 5;
              return global.page.waitForSelector(REQUIRED_FIELD_SELECTOR);

            case 5:
              _context3.next = 7;
              return BoxVisualTestUtils.clearInput(REQUIRED_FIELD_SELECTOR);

            case 7:
              _context3.next = 9;
              return global.page.type(REQUIRED_FIELD_SELECTOR, 'zyxwv');

            case 9:
              _context3.next = 11;
              return global.page.waitForSelector(selector);

            case 11:
              _context3.next = 13;
              return global.page.type(selector, userInput);

            case 13:
              _context3.next = 15;
              return global.page.click(BUTTON_SELECTOR);

            case 15:
              _context3.next = 17;
              return global.page.screenshot();

            case 17:
              image = _context3.sent;
              return _context3.abrupt("return", expect(image).toMatchImageSnapshot());

            case 19:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }());
});