function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n        enteredInput | displayedInput\n        ", "   | ", "\n        ", "  | ", "\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        storyId                  | userInput                | description\n        ", " | ", "  | ", "\n        ", " | ", " | ", "\n        ", " | ", "         | ", "\n        ", " | ", "               | ", "\n        ", " | ", "              | ", "\n        ", " | ", "                 | ", "\n        ", " | ", "                   | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('components/form-elements/text-input/TextInput', function () {
  var INPUT_SELECTOR = 'input';
  var TEXT_INPUT_STORIES = ['components-form-elements-textinput--basic', 'components-form-elements-textinput--url-input', 'components-form-elements-textinput--with-custom-validation', 'components-form-elements-textinput--with-minimum-length', 'components-form-elements-textinput--with-maximum-length', 'components-form-elements-textinput--with-tooltip-on-hover', 'components-form-elements-textinput--with-hidden-label', 'components-form-elements-textinput--disabled-input'];
  test.each(TEXT_INPUT_STORIES)('looks visually correct when using story %s',
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
  test.each(_templateObject(), TEXT_INPUT_STORIES[1], 'http://www.box.com', 'does not show a URL validation error', TEXT_INPUT_STORIES[1], 'https://www.box.com', 'does not show a URL validation error', TEXT_INPUT_STORIES[1], 'www.box.com', 'shows a URL validation error', TEXT_INPUT_STORIES[1], 'zyxwv', 'shows a URL validation error', TEXT_INPUT_STORIES[2], 'notbox', 'shows a custom validation error', TEXT_INPUT_STORIES[2], 'box', 'does not show a custom validation error', TEXT_INPUT_STORIES[3], 'a', 'shows min length error')('$description for $userInput',
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(_ref3) {
      var storyId, userInput, image;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              storyId = _ref3.storyId, userInput = _ref3.userInput;
              _context2.next = 3;
              return global.page.goto("http://localhost:6061/iframe.html?id=".concat(storyId));

            case 3:
              _context2.next = 5;
              return global.page.waitForSelector(INPUT_SELECTOR);

            case 5:
              _context2.next = 7;
              return BoxVisualTestUtils.clearInput(INPUT_SELECTOR);

            case 7:
              _context2.next = 9;
              return global.page.type(INPUT_SELECTOR, userInput);

            case 9:
              _context2.next = 11;
              return BoxVisualTestUtils.blurInput(INPUT_SELECTOR);

            case 11:
              _context2.next = 13;
              return global.page.screenshot();

            case 13:
              image = _context2.sent;
              return _context2.abrupt("return", expect(image).toMatchImageSnapshot());

            case 15:
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
  test.each(_templateObject2(), 'abcde', 'abcde', 'abcdef', 'abcde')('displays $displayedInput when given $enteredInput',
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(_ref5) {
      var enteredInput, image;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              enteredInput = _ref5.enteredInput;
              _context3.next = 3;
              return BoxVisualTestUtils.takeScreenshotAfterInput(TEXT_INPUT_STORIES[4], INPUT_SELECTOR, 'type', enteredInput);

            case 3:
              image = _context3.sent;
              return _context3.abrupt("return", expect(image).toMatchImageSnapshot());

            case 5:
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