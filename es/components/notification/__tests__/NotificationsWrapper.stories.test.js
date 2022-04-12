function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        selector          | description\n        ", "         | ", "\n        ", " | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('components/notification/NotificationsWrapper', function () {
  var NOTIFICATIONSWRAPPER_STORY = 'components-notifications-notificationswrapper--example';
  test("looks visually correct when using story ".concat(NOTIFICATIONSWRAPPER_STORY),
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
            return BoxVisualTestUtils.takeScreenshot(NOTIFICATIONSWRAPPER_STORY);

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
  test.each(_templateObject(), '.btn', 'timed notification', '.btn-primary', 'persistent notification')('shows a $description',
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
              return BoxVisualTestUtils.takeScreenshotAfterInput(NOTIFICATIONSWRAPPER_STORY, selector);

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

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
});