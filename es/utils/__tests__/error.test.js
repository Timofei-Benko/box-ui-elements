import { getBadItemError, getBadPermissionsError, isUserCorrectableError } from '../error';
describe('util/error', function () {
  describe('getBadItemError()', function () {
    test('should set and get correctly', function () {
      expect(getBadItemError().message).toBe('Bad box item!');
    });
  });
  describe('getBadPermissionsError()', function () {
    test('should set and get correctly', function () {
      expect(getBadPermissionsError().message).toBe('Insufficient Permissions!');
    });
  });
  describe('isUserCorrectableError', function () {
    test('should return true if status is 401', function () {
      expect(isUserCorrectableError(401)).toBe(true);
    });
    test('should return true if status is 409', function () {
      expect(isUserCorrectableError(409)).toBe(true);
    });
    test('should return true if status is >= 500', function () {
      expect(isUserCorrectableError(500)).toBe(true);
      expect(isUserCorrectableError(502)).toBe(true);
    });
    test('should return true if status is 429', function () {
      expect(isUserCorrectableError(429)).toBe(true);
    });
    test('should return false if status is not 401, 409, 429, or >= 500', function () {
      expect(isUserCorrectableError(404)).toBe(false);
    });
  });
});