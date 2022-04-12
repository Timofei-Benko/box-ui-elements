function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n        input        | inputName\n        ", "        | ", "\n        ", "      | ", "\n        ", " | ", "\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n        input        | inputName\n        ", "        | ", "\n        ", "      | ", "\n        ", " | ", "\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        input             | inputName\n        ", "             | ", "\n        ", "           | ", "\n        ", "      | ", "\n        ", "        | ", "\n        ", "      | ", "\n        ", " | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import { isValidTime, parseTimeFromString } from '../TimeInputUtils';
var VALID_TIME_INPUTS = [['3:00 PM', {
  hours: 15,
  minutes: 0
}], ['3:00 P M', {
  hours: 15,
  minutes: 0
}], ['3:00PM', {
  hours: 15,
  minutes: 0
}], ['3:00P M', {
  hours: 15,
  minutes: 0
}], ['300 PM', {
  hours: 15,
  minutes: 0
}], ['300 P M', {
  hours: 15,
  minutes: 0
}], ['300PM', {
  hours: 15,
  minutes: 0
}], ['300P M', {
  hours: 15,
  minutes: 0
}], ['3 PM', {
  hours: 15,
  minutes: 0
}], ['3 P M', {
  hours: 15,
  minutes: 0
}], ['3PM', {
  hours: 15,
  minutes: 0
}], ['3P M', {
  hours: 15,
  minutes: 0
}], ['3:00 P.M.', {
  hours: 15,
  minutes: 0
}], ['3:00 P. M.', {
  hours: 15,
  minutes: 0
}], ['3:00P.M.', {
  hours: 15,
  minutes: 0
}], ['3:00P. M.', {
  hours: 15,
  minutes: 0
}], ['300 P.M.', {
  hours: 15,
  minutes: 0
}], ['300 P. M.', {
  hours: 15,
  minutes: 0
}], ['300P.M.', {
  hours: 15,
  minutes: 0
}], ['300P. M.', {
  hours: 15,
  minutes: 0
}], ['3 P.M.', {
  hours: 15,
  minutes: 0
}], ['3 P. M.', {
  hours: 15,
  minutes: 0
}], ['3P.M.', {
  hours: 15,
  minutes: 0
}], ['3P. M.', {
  hours: 15,
  minutes: 0
}], ['3:00 p.m.', {
  hours: 15,
  minutes: 0
}], ['3:00 p. m.', {
  hours: 15,
  minutes: 0
}], ['3:00p.m.', {
  hours: 15,
  minutes: 0
}], ['3:00p. m.', {
  hours: 15,
  minutes: 0
}], ['300 p.m.', {
  hours: 15,
  minutes: 0
}], ['300 p. m.', {
  hours: 15,
  minutes: 0
}], ['300p.m.', {
  hours: 15,
  minutes: 0
}], ['300p. m.', {
  hours: 15,
  minutes: 0
}], ['3 p.m.', {
  hours: 15,
  minutes: 0
}], ['3 p. m.', {
  hours: 15,
  minutes: 0
}], ['3p.m.', {
  hours: 15,
  minutes: 0
}], ['3p. m.', {
  hours: 15,
  minutes: 0
}], ['3:00 pm', {
  hours: 15,
  minutes: 0
}], ['3:00 p m', {
  hours: 15,
  minutes: 0
}], ['3:00pm', {
  hours: 15,
  minutes: 0
}], ['3:00p m', {
  hours: 15,
  minutes: 0
}], ['300 pm', {
  hours: 15,
  minutes: 0
}], ['300 p m', {
  hours: 15,
  minutes: 0
}], ['300pm', {
  hours: 15,
  minutes: 0
}], ['300p m', {
  hours: 15,
  minutes: 0
}], ['3 pm', {
  hours: 15,
  minutes: 0
}], ['3 p m', {
  hours: 15,
  minutes: 0
}], ['3pm', {
  hours: 15,
  minutes: 0
}], ['3p m', {
  hours: 15,
  minutes: 0
}], ['3.00', {
  hours: 3,
  minutes: 0
}], ['3h00', {
  hours: 3,
  minutes: 0
}], ['3 h 00', {
  hours: 3,
  minutes: 0
}], ['15:00', {
  hours: 15,
  minutes: 0
}], ['1500', {
  hours: 15,
  minutes: 0
}], ['15.00', {
  hours: 15,
  minutes: 0
}], ['15h00', {
  hours: 15,
  minutes: 0
}], ['15 h 00', {
  hours: 15,
  minutes: 0
}], ['12:00', {
  hours: 12,
  minutes: 0
}], ['3', {
  hours: 3,
  minutes: 0
}], ['3am', {
  hours: 3,
  minutes: 0
}], ['3pm', {
  hours: 15,
  minutes: 0
}], ['11', {
  hours: 11,
  minutes: 0
}], ['11am', {
  hours: 11,
  minutes: 0
}], ['01', {
  hours: 1,
  minutes: 0
}], ['01am', {
  hours: 1,
  minutes: 0
}], ['01pm', {
  hours: 13,
  minutes: 0
}], ['3:00', {
  hours: 3,
  minutes: 0
}], ['3:00am', {
  hours: 3,
  minutes: 0
}], ['3:00pm', {
  hours: 15,
  minutes: 0
}], ['11pm', {
  hours: 23,
  minutes: 0
}], ['1125pm', {
  hours: 23,
  minutes: 25
}], ['11:00pm', {
  hours: 23,
  minutes: 0
}], ['12am', {
  hours: 0,
  minutes: 0
}], ['12pm', {
  hours: 12,
  minutes: 0
}], ['22:32', {
  hours: 22,
  minutes: 32
}], ['11:32 π.μ.', {
  hours: 11,
  minutes: 32
}], ['11:32 μ.μ.', {
  hours: 23,
  minutes: 32
}], ['6:32 am', {
  hours: 6,
  minutes: 32
}], ['4:32 p.m.', {
  hours: 16,
  minutes: 32
}], ['21:32', {
  hours: 21,
  minutes: 32
}], ['4:32 PM', {
  hours: 16,
  minutes: 32
}], ['23.32', {
  hours: 23,
  minutes: 32
}], ['16 h 32', {
  hours: 16,
  minutes: 32
}], ['5:32', {
  hours: 5,
  minutes: 32
}], ['오전 5:32', {
  hours: 5,
  minutes: 32
}], ['오후 5:32', {
  hours: 17,
  minutes: 32
}], ['上午4:32', {
  hours: 4,
  minutes: 32
}], ['下午4:32', {
  hours: 16,
  minutes: 32
}]];
var OUT_OF_RANGE_INPUTS = ['154309', '4449292 p.m.', '4444', '3:66 p.m.', '55:55'];
describe('src/components/time-input/TimeInputUtils', function () {
  test.each(VALID_TIME_INPUTS)('should return true for valid input %s', function (input) {
    expect(isValidTime(input)).toBe(true);
  });
  test.each(_templateObject(), '', 'empty string', null, 'null', undefined, 'undefined', 'abcde', 'all alphabetical characters', '%!@#$%^', 'all symbol characters', '%!@#$%^abcde', 'all alphabetical and symbol characters')('should return false when input is $inputName', function (input) {
    expect(isValidTime(input)).toBe(false);
  });
  test.each(VALID_TIME_INPUTS)('should correctly parse %s', function (input, parsedTime) {
    expect(parseTimeFromString(input)).toEqual(parsedTime);
  });
  test.each(OUT_OF_RANGE_INPUTS)('should throw a SyntaxError for input %s', function (input) {
    expect(function () {
      return parseTimeFromString(input);
    }).toThrow(SyntaxError);
  });
  test.each(_templateObject2(), '', 'empty string', null, 'null', undefined, 'undefined')('should throw a SyntaxError when input is $inputName and isRequired is true', function (_ref) {
    var input = _ref.input;
    expect(function () {
      return parseTimeFromString(input, true);
    }).toThrow(SyntaxError);
  });
  test.each(_templateObject3(), '', 'empty string', null, 'null', undefined, 'undefined')('should return the default parsed time when input is $inputName and isRequired is false', function (_ref2) {
    var input = _ref2.input;
    expect(parseTimeFromString(input)).toEqual({
      hours: 0,
      minutes: 0
    });
  });
});