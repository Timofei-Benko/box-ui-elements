function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { renderHook, act } from '@testing-library/react-hooks';
import { alwaysTargeted, neverTargeted } from '..';
import makeUseShowOne from '../useShowOne';
describe('features/targeting/useShowOne', function () {
  beforeEach(function () {
    jest.useFakeTimers('modern');
  });

  function makeAlwaysTargetedHook() {
    var onShow = jest.fn();
    return function () {
      return _objectSpread({}, alwaysTargeted, {
        onShow: onShow
      });
    };
  }

  function makeNeverTargetedHook() {
    var onShow = jest.fn();
    return function () {
      return _objectSpread({}, neverTargeted, {
        onShow: onShow
      });
    };
  }

  describe.each([[[makeAlwaysTargetedHook(), makeAlwaysTargetedHook(), makeAlwaysTargetedHook()], 0], [[makeAlwaysTargetedHook(), makeAlwaysTargetedHook(), makeNeverTargetedHook()], 0], [[makeNeverTargetedHook(), makeNeverTargetedHook(), makeAlwaysTargetedHook()], 2], [[makeNeverTargetedHook(), makeNeverTargetedHook(), makeNeverTargetedHook()], null], [[makeNeverTargetedHook(), makeAlwaysTargetedHook()], 1]])('basic hook usage', function (targetingApis, expectedIndexToBeShown) {
    test("should only show targetingApi at index: ".concat(expectedIndexToBeShown), function () {
      var showOneTargetingApis = makeUseShowOne(targetingApis);
      var hooks = showOneTargetingApis.map(function (useShowOne) {
        return renderHook(function () {
          return useShowOne();
        });
      }); // call onShow on expected first

      if (expectedIndexToBeShown !== null) {
        var result = hooks[expectedIndexToBeShown].result;
        expect(result.current.canShow).toBe(true);
        act(function () {
          return result.current.onShow();
        });
      } // call onShow on rest


      hooks.forEach(function (_ref) {
        var result = _ref.result;
        act(function () {
          return result.current.onShow();
        });
      });
      hooks.forEach(function (_ref2, index) {
        var result = _ref2.result,
            rerender = _ref2.rerender;
        var expected;

        if (expectedIndexToBeShown === null) {
          var _renderHook = renderHook(function () {
            return showOneTargetingApis[index](true);
          }),
              originalHookResult = _renderHook.result; // should be the original value of onShow


          expected = originalHookResult.current.canShow;
        } else {
          rerender(); // only expected can show as it was requested first

          expected = index === expectedIndexToBeShown;
        }

        expect(result.current.canShow).toBe(expected);
      });
      targetingApis.forEach(function (targetingApi, index) {
        if (index === expectedIndexToBeShown) {
          expect(targetingApi().onShow).toHaveBeenCalled();
        } else {
          expect(targetingApi().onShow).not.toHaveBeenCalled();
        }
      });
    });
  });
});