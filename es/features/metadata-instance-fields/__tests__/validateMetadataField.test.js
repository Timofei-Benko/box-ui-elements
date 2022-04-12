import { isValidValue } from '../validateMetadataField';
import { FIELD_TYPE_FLOAT, FIELD_TYPE_INTEGER } from '../constants';
[{
  description: "should validate ".concat(FIELD_TYPE_FLOAT, " and return true"),
  type: FIELD_TYPE_FLOAT,
  value: '123.456',
  expected: true
}, {
  description: "should validate ".concat(FIELD_TYPE_FLOAT, " with trailing period and return true"),
  type: FIELD_TYPE_FLOAT,
  value: '123.',
  expected: true
}, {
  description: "should validate ".concat(FIELD_TYPE_FLOAT, " with trailing period and return false"),
  type: FIELD_TYPE_FLOAT,
  value: '123..',
  expected: false
}, {
  description: "should validate ".concat(FIELD_TYPE_INTEGER, " with trailing period and return true"),
  type: FIELD_TYPE_INTEGER,
  value: '123',
  expected: true
}, {
  description: "should validate any random type and return true",
  expected: true
}].forEach(function (_ref) {
  var description = _ref.description,
      type = _ref.type,
      value = _ref.value,
      option = _ref.option,
      expected = _ref.expected;
  test(description, function () {
    var actual = isValidValue(type, value, option);
    expect(actual).toEqual(expected);
  });
});