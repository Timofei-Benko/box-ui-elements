import { renderHook, act } from '@testing-library/react-hooks';
import useCallOnce from '../useCallOnce';
describe('components/targeting/utils/useCallOnce', function () {
  var callback = jest.fn(function () {
    return 1;
  });
  test('should only call callback once', function () {
    var _renderHook = renderHook(function () {
      return useCallOnce(callback);
    }),
        result = _renderHook.result,
        rerender = _renderHook.rerender;

    act(function () {
      return expect(result.current()).toBe(1);
    });
    expect(callback).toHaveBeenCalledTimes(1);
    [1, 2, 3].forEach(function () {
      rerender(function () {});
      act(function () {
        return expect(result.current()).toBe(undefined);
      });
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});