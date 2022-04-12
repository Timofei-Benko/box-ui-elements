function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n                valueType   | should\n                ", " | ", "\n                ", "  | ", "\n                ", " | ", "\n            "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n                valueType        | componentName          | should\n                ", " | ", "  | ", "\n                ", "        | ", " | ", "\n                ", "        | ", "        | ", "\n            "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n                description                                                                                     | valueType        | componentName          | selectedValues     | expectedValue\n                ", "                                | ", " | ", "  | ", " | ", "\n                ", "                                      | ", "        | ", " | ", "   | ", "\n                ", "                                             | ", "        | ", "        | ", "     | ", "\n                ", " | ", "        | ", "        | ", "          | ", "\n                ", "                                            | ", "      | ", "         | ", "   | ", "\n                ", "                                             | ", "       | ", "         | ", "   | ", "\n                ", "                                            | ", "      | ", "         | ", "   | ", "\n            "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n                description                                                | valueType   | componentName          | selectedValues\n                ", " | ", "   | ", " | ", "\n                ", "        | ", "   | ", "        | ", "\n                ", "       | ", " | ", "         | ", "\n                ", "        | ", "  | ", "         | ", "\n                ", "       | ", " | ", "         | ", "\n            "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import ValueField from '../components/filter/ValueField';
describe('features/query-bar/components/filter/ValueField', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var intl = {
      formatMessage: jest.fn()
    };
    return shallow(React.createElement(ValueField, _extends({
      formatMessage: intl.formatMessage,
      onChange: jest.fn(),
      valueKey: "0",
      valueOptions: [{
        displayText: 'Hello',
        type: 'enum',
        value: 0
      }]
    }, props)));
  };

  describe('render value fields', function () {
    var emptyArray = [];
    var valuePropNames = {
      MultiSelectField: 'selectedValues',
      SingleSelectField: 'selectedValue',
      DatePicker: 'value',
      TextInput: 'value'
    };
    describe('when selected values are empty', function () {
      test.each(_templateObject(), 'should render SingleSelectField for valueType of enum', 'enum', 'SingleSelectField', emptyArray, 'should render DatePicker for valueType of date', 'date', 'DatePicker', emptyArray, 'should render TextInput for valueType of string', 'string', 'TextInput', emptyArray, 'should render TextInput for valueType of float', 'float', 'TextInput', emptyArray, 'should render TextInput for valueType of number', 'number', 'TextInput', emptyArray)('$description', function (_ref) {
        var componentName = _ref.componentName,
            selectedValues = _ref.selectedValues,
            valueType = _ref.valueType;
        var wrapper = getWrapper({
          valueType: valueType,
          selectedValues: selectedValues
        });
        var component = wrapper.find(componentName);
        expect(component).toHaveLength(1);
        expect(component.prop(valuePropNames[componentName])).toBeFalsy();
      });
    });
    describe('when selected values are non-empty', function () {
      var stringValue = 'r';
      var dateValue = new Date(1995, 11, 25, 9, 30, 0);
      test.each(_templateObject2(), 'should render MultiSelectField for valueType of multiSelect', 'multiSelect', 'MultiSelectField', ['r', 'g', 'b'], ['r', 'g', 'b'], 'should render SingleSelectField for valueType of enum', 'enum', 'SingleSelectField', [stringValue], stringValue, 'should render DatePicker for valueType of date', 'date', 'DatePicker', [dateValue], dateValue, 'should render DatePicker for valueType of date and user tries to delete the existing input', 'date', 'DatePicker', [null], undefined, 'should render TextInput for valueType of string', 'string', 'TextInput', [stringValue], stringValue, 'should render TextInput for valueType of float', 'float', 'TextInput', [stringValue], stringValue, 'should render TextInput for valueType of number', 'number', 'TextInput', [stringValue], stringValue)('$description', function (_ref2) {
        var componentName = _ref2.componentName,
            expectedValue = _ref2.expectedValue,
            selectedValues = _ref2.selectedValues,
            valueType = _ref2.valueType;
        var wrapper = getWrapper({
          valueType: valueType,
          selectedValues: selectedValues
        });
        var component = wrapper.find(componentName);
        expect(component).toHaveLength(1);
        expect(component.prop(valuePropNames[componentName])).toEqual(expectedValue);
      });
    });
    describe('should not show an error for a', function () {
      test.each(_templateObject3(), 'multiSelect', 'MultiSelectField', 'MultiSelectField of type multiSelect', 'enum', 'SingleSelectField', 'SingleSelectField of type enum', 'date', 'DatePicker', 'DatePicker of type date')('$should', function (_ref3) {
        var componentName = _ref3.componentName,
            valueType = _ref3.valueType;
        var wrapper = getWrapper({
          valueType: valueType,
          error: null,
          selectedValues: []
        });
        var component = wrapper.find(componentName);
        expect(component.prop('error')).toBe(undefined);
      });
    });
    describe('should show an error for a TextInput of ', function () {
      var error = React.createElement("div", null);
      test.each(_templateObject4(), 'string', 'type string', 'float', 'type float', 'number', 'type number')('$should', function (_ref4) {
        var valueType = _ref4.valueType;
        var wrapper = getWrapper({
          valueType: valueType,
          error: error,
          selectedValues: []
        });
        var component = wrapper.find('TextInput');
        expect(component.prop('error')).toBe(error);
      });
    });
  });
});