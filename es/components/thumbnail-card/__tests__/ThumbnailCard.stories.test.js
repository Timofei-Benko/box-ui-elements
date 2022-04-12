function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('components/thumbnail-card/ThumbnailCard', function () {
  var THUMBNAIL_CARD_STORIES = ['components-thumbnailcard--basic', 'components-thumbnailcard--highlight-on-hover'];
  var selector = '.thumbnail-card';
  test.each(THUMBNAIL_CARD_STORIES)('looks visually correct when using story %s',
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
  test('should show a blue border when the card is hovered',
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
            return BoxVisualTestUtils.takeScreenshotAfterInput(THUMBNAIL_CARD_STORIES[1], selector, 'hover');

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
  test('should show an orange border when the card is hovered and focused',
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
            return global.page.goto("http://localhost:6061/iframe.html?id=".concat(THUMBNAIL_CARD_STORIES[1]));

          case 2:
            _context3.next = 4;
            return global.page.waitForSelector(selector);

          case 4:
            _context3.next = 6;
            return global.page.hover(selector);

          case 6:
            _context3.next = 8;
            return global.page.focus(selector);

          case 8:
            _context3.next = 10;
            return global.page.screenshot();

          case 10:
            image = _context3.sent;
            return _context3.abrupt("return", expect(image).toMatchImageSnapshot());

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
});