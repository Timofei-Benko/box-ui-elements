import { renderHook } from '@testing-library/react-hooks';
import useCombined from '../useCombined';
describe('components/targeting/utils/useCombined', function () {
  var firstOnShow = jest.fn();
  var firstOnClose = jest.fn();
  var firstOnComplete = jest.fn();
  var firstTargetingApi = {
    canShow: false,
    onShow: firstOnShow,
    onClose: firstOnClose,
    onComplete: firstOnComplete
  };

  var useFirstTargetingApi = function useFirstTargetingApi() {
    return firstTargetingApi;
  };

  var secondOnShow = jest.fn();
  var secondOnClose = jest.fn();
  var secondOnComplete = jest.fn();
  var secondTargetingApi = {
    canShow: true,
    onShow: secondOnShow,
    onClose: secondOnClose,
    onComplete: secondOnComplete
  };

  var useSecondTargetingApi = function useSecondTargetingApi() {
    return secondTargetingApi;
  };

  test('should return the first eligible targetingApi from the array', function () {
    var _renderHook = renderHook(function () {
      return useCombined([useFirstTargetingApi, useSecondTargetingApi]);
    }),
        targetingApi = _renderHook.result.current;

    expect(targetingApi.canShow).toBe(true);
    targetingApi.onShow();
    targetingApi.onClose();
    targetingApi.onComplete(); // Should have called the second targetingApi

    expect(secondOnShow).toHaveBeenCalledTimes(1);
    expect(secondOnClose).toHaveBeenCalledTimes(1);
    expect(secondOnComplete).toHaveBeenCalledTimes(1); // First, ineligible targetingApi should not have been called

    expect(firstOnShow).toHaveBeenCalledTimes(0);
    expect(firstOnClose).toHaveBeenCalledTimes(0);
    expect(firstOnComplete).toHaveBeenCalledTimes(0);
  });
  test('should return the neverTargeted if no eligible targetingApi is passed', function () {
    var _renderHook2 = renderHook(function () {
      return useCombined([useFirstTargetingApi]);
    }),
        targetingApi = _renderHook2.result.current;

    expect(targetingApi.canShow).toBe(false);
    targetingApi.onShow();
    targetingApi.onClose();
    targetingApi.onComplete();
    expect(firstOnShow).toHaveBeenCalledTimes(0);
    expect(firstOnClose).toHaveBeenCalledTimes(0);
    expect(firstOnComplete).toHaveBeenCalledTimes(0);
  });
});