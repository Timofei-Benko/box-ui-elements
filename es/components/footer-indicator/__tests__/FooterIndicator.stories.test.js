function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('components/footer-indicator/FooterIndicator', function () {
  var STORIES = [['components-footerindicator--regular'], ['components-footerindicator--with-truncated-text']];
  test.each(STORIES)('looks visually correct when using story %s',
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
  test.each(STORIES)('displays tooltip on hover for story %s',
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(id) {
      var page, footerIndicator, image;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return BoxVisualTestUtils.gotoStory(id);

            case 2:
              page = _context2.sent;
              _context2.next = 5;
              return page.$('.bdl-FooterIndicator');

            case 5:
              footerIndicator = _context2.sent;
              _context2.next = 8;
              return footerIndicator === null || footerIndicator === void 0 ? void 0 : footerIndicator.hover();

            case 8:
              _context2.next = 10;
              return page.waitForSelector('.tooltip-element');

            case 10:
              _context2.next = 12;
              return page.screenshot();

            case 12:
              image = _context2.sent;
              return _context2.abrupt("return", expect(image).toMatchImageSnapshot());

            case 14:
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
});