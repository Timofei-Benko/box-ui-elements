import { convertToMs, convertISOStringtoRFC3339String, convertDateToUnixMidnightTime, convertISOStringToUTCDate, isToday, isTomorrow, isValidDate, isYesterday, isCurrentYear, formatTime, addTime } from '../datetime';
describe('utils/datetime', function () {
  describe('convertToMs()', function () {
    test('should convert specified value to ms', function () {
      var value = 534;
      var res = convertToMs(value);
      expect(res).toEqual(value * 1000);
    });
  });
  describe('isToday()', function () {
    test('should return true when date value is today', function () {
      var now = Date.now();
      var res = isToday(now);
      expect(res).toBe(true);
    });
    test('should return false when date value is not today', function () {
      var res = isToday(1473186140000);
      expect(res).toBe(false);
    });
    test('should return true when date value is a Date and istoday', function () {
      expect(isToday(new Date())).toBeTruthy();
      expect(isYesterday(new Date())).toBeFalsy();
    });
  });
  describe('isYesterday()', function () {
    test('should return true when date value is yesterday', function () {
      var yesterday = Date.now() - 24 * 60 * 60 * 1000;
      var res = isYesterday(yesterday);
      expect(res).toBe(true);
    });
    test('should return false when date value is not yesterday', function () {
      var now = Date.now();
      var res = isYesterday(now);
      expect(res).toBe(false);
    }); // disabling as this does not play well with daylight saving time

    test.skip('should return true when date value is a Date and is yesterday', function () {
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isToday(yesterday)).toBeFalsy();
      expect(isYesterday(yesterday)).toBeTruthy();
    });
  });
  describe('isCurrentYear()', function () {
    test('should return true when date value is the current year', function () {
      var currentYear = Date.now();
      var res = isCurrentYear(currentYear);
      expect(res).toBe(true);
    });
    test('should return false when date value is not the current year', function () {
      var previousYear = Date.now() - 365 * 24 * 60 * 60 * 1000;
      var res = isCurrentYear(previousYear);
      expect(res).toBe(false);
    });
    test('should return true when date value is a Date and is current year', function () {
      var currentYear = new Date();
      expect(isCurrentYear(currentYear)).toBeTruthy();
    });
  });
  describe('isTomorrow()', function () {
    test('should return true when date value is tomorrow', function () {
      var tomorrow = Date.now() + 24 * 60 * 60 * 1000;
      var res = isTomorrow(tomorrow);
      expect(res).toBe(true);
    });
    test('should return false when date value is not tomorrow', function () {
      var now = Date.now();
      var res = isTomorrow(now);
      expect(res).toBe(false);
    });
    test('should return true when date value is a Date and is tomorrow', function () {
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      expect(isToday(tomorrow)).toBeFalsy();
      expect(isTomorrow(tomorrow)).toBeTruthy();
    });
  });
  describe('formatTime()', function () {
    test('should correctly format 3 hours', function () {
      var result = formatTime(10800);
      expect(result).toBe('3:00:00');
    });
    test('should correctly format the time', function () {
      var result = formatTime(11211);
      expect(result).toBe('3:06:51');
    });
    test('should correctly format when double-digit minutes', function () {
      var result = formatTime(705);
      expect(result).toBe('11:45');
    });
    test('should correctly format when single-digit minutes', function () {
      var result = formatTime(105);
      expect(result).toBe('1:45');
    });
    test('should correctly format when 0 minutes', function () {
      var result = formatTime(9);
      expect(result).toBe('0:09');
    });
    test('should correctly format 0 seconds', function () {
      var result = formatTime(0);
      expect(result).toBe('0:00');
    });
  });
  describe('isValidDate()', function () {
    test.each([['2019-01-01', true], ['2019-01-01T12:34:56', true], ['2019-01-01T09:41:56-07:00', true], ['some random string', false], ['', false]])('should interpret %s as a %p date', function (dateString, expected) {
      var date = new Date(dateString);
      expect(isValidDate(date)).toBe(expected);
    });
  });
  describe('addTime()', function () {
    test('should correctly add time', function () {
      var TEN_MIN_IN_MS = 600000;
      var date = new Date('1995-12-17T03:24:00');
      var result = addTime(date, TEN_MIN_IN_MS);
      expect(result.getMinutes()).toBe(34);
    });
    test('should correctly add time if the date Value is a number', function () {
      var TEN_MIN_IN_MS = 600000;
      var date = new Date('1995-12-17T03:24:00').getTime();
      var result = addTime(date, TEN_MIN_IN_MS);
      expect(result).toBe(date + 600000);
    });
  });
  describe('convertISOStringToUTCDate()', function () {
    test.each([['2018-06-13T00:00:00.000Z', '2018-06-13T07:00:00.000Z'], ['2018-06-13T01:00:00.000+01:00', '2018-06-13T07:00:00.000Z'], ['2018-06-12T23:00:00.000-0100', '2018-06-13T07:00:00.000Z'], ['2018-06-13T02:00:00.000+02', '2018-06-13T07:00:00.000Z']])('should correctly convert from %s to %s', function (originDateTime, expectedDateTime) {
      var result = convertISOStringToUTCDate(originDateTime);
      expect(result.toISOString()).toBe(expectedDateTime);
    });
  });
  describe('convertDateToUnixMidnightTime()', function () {
    test('should correctly convert date', function () {
      var result = new Date(convertDateToUnixMidnightTime(new Date('2018-06-13T07:00:00.000Z')));
      expect(result.toISOString()).toBe('2018-06-13T00:00:00.000Z');
    });
  });
  describe('convertISOStringtoRFC3339String()', function () {
    test.each([// UTC
    ['2018-06-13T00:00:00.000Z', '2018-06-13T00:00:00.000Z'], // backward-looking timezone examples
    ['2018-06-13T00:00:00-05', '2018-06-13T00:00:00.000-05:00'], ['2018-06-13T00:00:00-0500', '2018-06-13T00:00:00.000-05:00'], ['2018-06-13T00:00:00.000-05', '2018-06-13T00:00:00.000-05:00'], ['2018-06-13T00:00:00.000-0500', '2018-06-13T00:00:00.000-05:00'], ['2018-06-13T00:00:00.000-05:00', '2018-06-13T00:00:00.000-05:00'], // forward-looking timezone examples
    ['2018-06-13T00:00:00.000+05', '2018-06-13T00:00:00.000+05:00'], ['2018-06-13T00:00:00.000+0600', '2018-06-13T00:00:00.000+06:00'], ['2018-06-13T00:00:00.000+07:00', '2018-06-13T00:00:00.000+07:00'], // Half hour examples
    ['2018-06-13T00:00:00.000-07:30', '2018-06-13T00:00:00.000-07:30'], ['2018-06-13T00:00:00.000-05:00', '2018-06-13T00:00:00.000-05:00'], ['2018-06-13T00:00:00.000-0630', '2018-06-13T00:00:00.000-06:30'], // Null-conversion examples
    ['2018-06-13T00:00:00.000-05:45', '2018-06-13T00:00:00.000-05:45'], ['2018-06-13T00:00:00.000+34', '2018-06-13T00:00:00.000+34']])('should convert %s to %s correctly', function (from, to) {
      var input = convertISOStringtoRFC3339String(from);
      expect(input).toEqual(to);
    });
  });
});