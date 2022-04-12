import { renderHook } from '@testing-library/react-hooks';
import useSuppressed from '../useSuppressed';
describe('components/targeting/utils/useSuppressed', function () {
  var onShow = jest.fn();
  var onClose = jest.fn();
  var onComplete = jest.fn();
  var targetingApi = {
    canShow: true,
    onShow: onShow,
    onClose: onClose,
    onComplete: onComplete
  };

  var useTargetingApi = function useTargetingApi() {
    return targetingApi;
  };

  test('should suppress targetingApi if shouldSuppress is true', function () {
    var _renderHook = renderHook(function (useShouldSuppress) {
      return useSuppressed(useTargetingApi, useShouldSuppress);
    }, {
      initialProps: function initialProps() {
        return false;
      }
    }),
        result = _renderHook.result,
        rerender = _renderHook.rerender; // when not suppressed


    var unsuppressed = result.current;
    expect(unsuppressed.canShow).toBe(true);
    unsuppressed.onShow();
    unsuppressed.onClose();
    unsuppressed.onComplete();
    expect(onShow).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledTimes(1); // when suppressed

    rerender(function () {
      return true;
    });
    var suppressed = result.current;
    expect(suppressed.canShow).toBe(false);
    suppressed.onShow();
    expect(onShow).toHaveBeenCalledTimes(1);
    suppressed.onClose();
    expect(onClose).toHaveBeenCalledTimes(1);
    suppressed.onComplete();
    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});