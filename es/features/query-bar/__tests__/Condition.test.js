function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            description                                            | option              | value\n            ", "         | ", "   | ", "\n            ", " | ", " | ", "\n            ", "             | ", "   | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { columnWithEnumType } from '../components/fixtures';
import Condition from '../components/filter/Condition';
import { EQUALS } from '../constants';
var invalidCondition = {
  columnId: '3',
  id: '0',
  operator: EQUALS,
  values: []
};
var columns = [columnWithEnumType];
describe('features/query-bar/components/filter/Condition', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(Condition, _extends({
      index: 0,
      columns: columns,
      condition: invalidCondition,
      deleteCondition: function deleteCondition() {},
      update: function update() {},
      intl: {
        formatMessage: function formatMessage() {}
      }
    }, props)));
  };

  describe('render()', function () {
    test('should render Condition', function () {
      var condition = invalidCondition;
      var wrapper = getWrapper({
        condition: condition
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('handleColumnChange()', function () {
    test('should select a column', function () {
      var condition = invalidCondition;
      var columnId = '1';
      var option = {
        type: 'string',
        value: columnId
      };
      var onColumnChange = jest.fn();
      var wrapper = getWrapper({
        onColumnChange: onColumnChange
      });
      wrapper.find('SingleSelectField').at(0).simulate('change', option);
      expect(onColumnChange).toHaveBeenCalledWith(condition, columnId);
    });
  });
  describe('handleOperatorChange()', function () {
    var displayText = 'Vendor Name';
    var condition = invalidCondition;
    var value = '0';
    var option = {
      displayText: displayText,
      value: value
    };
    test('should select an operator', function () {
      var onOperatorChange = jest.fn();
      var wrapper = getWrapper({
        onOperatorChange: onOperatorChange
      });
      wrapper.find('SingleSelectField').at(1).simulate('change', option);
      expect(onOperatorChange).toHaveBeenCalledWith(condition.id, value);
    });
  });
  describe('handleValueChange()', function () {
    var condition = invalidCondition;
    var textInputValue = 'string';
    var selectFieldValue = '1';
    var dateFieldValue = new Date(2018, 11, 24, 10, 33, 30, 0);
    test.each(_templateObject(), 'should invoke onValueChange with "string"', textInputValue, textInputValue, 'should invoke onValueChange with selectFieldValue', selectFieldValue, selectFieldValue, 'should invoke onValueChange with Date', dateFieldValue, dateFieldValue)('$description', function (_ref) {
      var option = _ref.option,
          value = _ref.value;
      var onValueChange = jest.fn();
      var wrapper = getWrapper({
        onValueChange: onValueChange
      });
      wrapper.find('ValueField').prop('onChange')(option);
      expect(onValueChange).toHaveBeenCalledWith(condition.id, value);
    });
  });
  describe('getColumnOptions()', function () {
    test('should open the value dropdown and see the options', function () {
      var wrapper = getWrapper();
      var ValueField = wrapper.find('ValueField');
      expect(ValueField.props().valueOptions).toEqual([{
        displayText: '$100',
        value: '$100'
      }]);
    });
  });
});