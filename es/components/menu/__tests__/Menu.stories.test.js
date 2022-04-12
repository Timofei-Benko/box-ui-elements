function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('components/menu/Menu', function () {
  var MENU_STORY_WITH_SUBMENU = 'components-menu--with-submenu';
  var MENU_STORY_WITH_SUBMENU_FLIP = 'components-menu--with-submenu-flip';
  var MENU_STORY_WITH_SELECT_MENU = 'components-menu--with-select-menu';
  var MENU_STORY_WITH_CHILD_ON_RESIZE = 'components-menu--with-child-on-resize';
  test.each([MENU_STORY_WITH_SUBMENU, MENU_STORY_WITH_SUBMENU_FLIP, MENU_STORY_WITH_SELECT_MENU, MENU_STORY_WITH_CHILD_ON_RESIZE])('looks visually correct when using story %s',
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
  test.each([MENU_STORY_WITH_SUBMENU, MENU_STORY_WITH_SUBMENU_FLIP])('displays a submenu on hover in story %s',
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(id) {
      var image;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return BoxVisualTestUtils.takeScreenshotAfterInput(id, '.submenu-target', 'hover');

            case 2:
              image = _context2.sent;
              return _context2.abrupt("return", expect(image).toMatchImageSnapshot());

            case 4:
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