function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('components/radio/RadioButton', function () {
  var RADIOGROUP_STORY = 'components-radio-radiogroup--basic';
  test("looks visually correct when using story ".concat(RADIOGROUP_STORY),
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
            return BoxVisualTestUtils.takeScreenshot(RADIOGROUP_STORY);

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
  test('selects a radio button',
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
            return BoxVisualTestUtils.takeScreenshotAfterInput(RADIOGROUP_STORY, 'input[value="radio1"]');

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
});