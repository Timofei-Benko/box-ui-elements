function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { Set } from 'immutable';
import shiftSelect from '../shiftSelect';
describe('components/table/shiftSelect', function () {
  [// prevSelection, prevTarget, target, anchor, expected
  // [PrevTarget, Anchor, Target]
  [[1, 2], 0, 3, 1, [1, 2, 3]], [[0], 0, 2, 1, [1, 2]], // [PrevTarget, Target, Anchor]
  [[3, 4], 0, 1, 2, [1, 2, 3, 4]], [[0], 0, 1, 2, [1, 2]], // [Anchor, PrevTarget, Target]
  [[0, 1, 9], 1, 2, 0, [0, 1, 2, 9]], // [Anchor, Target, PrevTarget]
  [[0, 1, 2, 3, 4, 9], 4, 2, 0, [0, 1, 2, 9]], // [Target, Anchor, PrevTarget]
  [[0, 1, 2, 3, 4, 9], 4, 0, 2, [0, 1, 2, 9]], // [Target, PrevTarget, Anchor]
  [[2, 3, 4, 9], 2, 0, 4, [0, 1, 2, 3, 4, 9]]].forEach(function (_ref, index) {
    var _ref2 = _slicedToArray(_ref, 5),
        prevSelection = _ref2[0],
        prevTarget = _ref2[1],
        target = _ref2[2],
        anchor = _ref2[3],
        expected = _ref2[4];

    var expectedSet = new Set(expected);
    test("should select the correct elements (data set #".concat(index, ")"), function () {
      var ret = shiftSelect(new Set(prevSelection), prevTarget, target, anchor);
      expect(ret.equals(expectedSet)).toBeTruthy();
    });
  });
  test('should throw when params are invalid (very rare)', function () {
    var prevSelection = new Set([1, 2, 3, 4]);
    expect(function () {
      shiftSelect(prevSelection, undefined, undefined, undefined);
    }).toThrow();
  });
});