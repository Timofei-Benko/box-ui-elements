import { isValidTimeSlice } from '../timeSliceUtils';
describe('elements/Transcript/timeSliceUtils/isValidTimeSlice', function () {
  test('should return false when no time slices', function () {
    expect(isValidTimeSlice()).toBeFalsy();
  });
  test('should return false when empty time slices', function () {
    expect(isValidTimeSlice([])).toBeFalsy();
  });
  test('should return false when bad time slice', function () {
    expect(isValidTimeSlice([{}])).toBeFalsy();
  });
  test('should return false when bad time slice start', function () {
    expect(isValidTimeSlice([{
      start: null
    }])).toBeFalsy();
  });
  test('should return true when good time slice start', function () {
    expect(isValidTimeSlice([{
      start: 10
    }])).toBeTruthy();
  });
});