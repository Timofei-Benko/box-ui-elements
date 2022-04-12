function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            emailToCheck         | ownerEmailDomain       | isCurrentUserOwner | result   | description\n            ", " | ", "           | ", "            | ", " | ", "\n            ", " | ", "           | ", "           | ", " | ", "\n            ", " | ", " | ", "            | ", "  | ", "\n            ", " | ", " | ", "           | ", " | ", "\n            ", "         | ", "           | ", "            | ", " | ", "\n            ", " | ", "                | ", "            | ", " | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import parseEmails, { checkIsExternalUser } from '../parseEmails';
describe('utils/parseEmails', function () {
  [{
    case: 'input is null',
    input: null,
    result: []
  }, {
    case: 'input is undefined',
    input: undefined,
    result: []
  }, {
    case: 'input is empty',
    input: '',
    result: []
  }, {
    case: 'valid email but with space',
    input: ' fbar@example.com ',
    result: ['fbar@example.com']
  }, {
    case: 'multiple emails space separated',
    input: 'fbar@example.com dvader@example.com',
    result: ['fbar@example.com', 'dvader@example.com']
  }, {
    case: 'multiple emails comma separated',
    input: 'fbar@example.com, dvader@example.com',
    result: ['fbar@example.com', 'dvader@example.com']
  }, {
    case: 'multiple emails semicolon separated',
    input: 'fbar@example.com; dvader@example.com',
    result: ['fbar@example.com', 'dvader@example.com']
  }, {
    case: 'email with <Contact Data>',
    input: 'Bar, Foo <fbar@example.com>',
    result: ['fbar@example.com']
  }, {
    case: 'multiple emails with <Contact Data>',
    input: 'Bar, Foo <fbar@example.com>; Vader, Darth <dvader@example.com>',
    result: ['fbar@example.com', 'dvader@example.com']
  }].forEach(function (testCase) {
    test("should return correct result when ".concat(testCase.case), function () {
      var actualResult = parseEmails(testCase.input);
      var expectedResult = testCase.result;
      expect(actualResult).toEqual(expectedResult);
    });
  });
  describe('checkIsExternalUser', function () {
    test.each(_templateObject(), 'narwhal@box.com', 'box.com', true, false, 'the current user owns the item and the email to check is internal', 'narwhal@box.com', 'box.com', false, false, 'the current user does not own the item and the email to check is internal', 'narwhal@box.com', 'boxuielements.com', true, true, 'the current user owns the item and the email to check is external', 'narwhal@box.com', 'boxuielements.com', false, false, 'the current user does not own the item and the email to check is external', undefined, 'box.com', true, false, 'the email to check is undefined', 'narwhal@box.com', null, true, false, 'the owner email domain is null')('should return $result when $description', function (_ref) {
      var isCurrentUserOwner = _ref.isCurrentUserOwner,
          ownerEmailDomain = _ref.ownerEmailDomain,
          emailToCheck = _ref.emailToCheck,
          result = _ref.result;
      expect(checkIsExternalUser(isCurrentUserOwner, ownerEmailDomain, emailToCheck)).toBe(result);
    });
  });
});