function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            eventInfo     | expectedData\n            ", "       | ", "\n            ", " | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import BaseMultiput from '../BaseMultiput';
describe('api/uploads/BaseMultiput', function () {
  var BaseMultiputTest;
  beforeEach(function () {
    BaseMultiputTest = new BaseMultiput({
      consoleLog: true
    }, {}, {});
  });
  describe('logEvent()', function () {
    var event_type = 'event_type';
    var event_info = 'event_info';
    test.each(_templateObject(), null, {
      event_type: event_type
    }, event_info, {
      event_type: event_type,
      event_info: event_info
    })('should POST to the correct endpoint',
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref2) {
        var eventInfo, expectedData;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                eventInfo = _ref2.eventInfo, expectedData = _ref2.expectedData;
                BaseMultiputTest.sessionEndpoints.logEvent = 'logEvent';
                BaseMultiputTest.xhr.post = jest.fn().mockReturnValueOnce('expected');
                _context.t0 = expect;
                _context.next = 6;
                return BaseMultiputTest.logEvent(event_type, eventInfo);

              case 6:
                _context.t1 = _context.sent;
                (0, _context.t0)(_context.t1).toBe('expected');
                expect(BaseMultiputTest.xhr.post).toHaveBeenCalledWith({
                  url: 'logEvent',
                  data: expectedData
                });

              case 9:
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
  });
});