function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('features/unified-share-modal/UnifiedShareModal', function () {
  test.each(['features-unifiedsharemodal--basic', 'features-unifiedsharemodal--with-shared-link', 'features-unifiedsharemodal--with-autofocused-shared-link'])('looks visually correct when button is clicked in story %s',
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
              return BoxVisualTestUtils.takeModalScreenshot(id);

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
  var USF_STORY = 'features-unifiedsharemodal--with-form-only';
  describe("".concat(USF_STORY), function () {
    beforeEach(
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return global.page.goto("http://localhost:6061/iframe.html?id=".concat(USF_STORY));

            case 2:
              _context2.next = 4;
              return global.page.waitFor(2000);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    test('looks visually correct',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var image;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return global.page.screenshot();

            case 2:
              image = _context3.sent;
              return _context3.abrupt("return", expect(image).toMatchImageSnapshot());

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    test('looks visually correct when adding emails',
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
              return global.page.type('textarea', 's');

            case 2:
              _context4.next = 4;
              return global.page.screenshot();

            case 4:
              image = _context4.sent;
              return _context4.abrupt("return", expect(image).toMatchImageSnapshot());

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
  });
});