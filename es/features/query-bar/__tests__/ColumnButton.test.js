function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            columns             | values          | should\n            ", "   | ", "    | ", "\n            ", "  | ", " | ", "\n            ", " | ", " | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { columnForDateType, columnWithFloatType, template } from '../components/fixtures';
import ColumnButton from '../components/ColumnButton';
describe('features/query-bar/components/ColumnButton', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var columns = [columnForDateType, columnWithFloatType];
    return shallow(React.createElement(ColumnButton, _extends({
      onColumnChange: jest.fn(),
      columns: columns
    }, props)));
  };

  describe('render', function () {
    test('should render ColumnButton default state when menu is closed', function () {
      var wrapper = getWrapper();
      expect(wrapper).toMatchSnapshot();
    });
    test('should render ColumnButton default state when menu is open', function () {
      var wrapper = getWrapper();
      wrapper.instance().setState({
        isColumnMenuOpen: true
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render ColumnButton with template passed in', function () {
      var wrapper = getWrapper({
        template: template
      });
      expect(wrapper).toMatchSnapshot();
    });
    var visibleColumns = [columnForDateType, columnWithFloatType];
    var oneHiddenColumn = [_objectSpread({}, columnForDateType, {
      isShown: false
    })];
    var twoHiddenColumns = [_objectSpread({}, columnForDateType, {
      isShown: false
    }), _objectSpread({}, columnWithFloatType, {
      isShown: false
    })];
    test.each(_templateObject(), visibleColumns, undefined, 'should render ColumnButton with no column count when all columns are visible', oneHiddenColumn, {
      count: 1
    }, 'should render ColumnButton with a column count of 1 when one column is hidden', twoHiddenColumns, {
      count: 2
    }, 'should render ColumnButton with a column count of 2 when multiple columns are hidden')('$should', function (_ref) {
      var columns = _ref.columns,
          values = _ref.values;
      var wrapper = getWrapper({
        columns: columns
      });
      var FormattedMessage = wrapper.find('FormattedMessage');
      expect(FormattedMessage.props().values).toEqual(values);
    });
  });
  describe('onClose()', function () {
    [{
      description: 'Should update state with new ordering',
      updatedState: {
        isColumnMenuOpen: false
      }
    }].forEach(function (_ref2) {
      var description = _ref2.description,
          updatedState = _ref2.updatedState;
      test("".concat(description), function () {
        var wrapper = getWrapper();
        wrapper.instance().onClose();
        expect(wrapper.state('isColumnMenuOpen')).toEqual(updatedState.isColumnMenuOpen);
      });
    });
  });
  describe('onOpen()', function () {
    [{
      description: 'Should update state with new ordering',
      updatedState: {
        isColumnMenuOpen: true
      }
    }].forEach(function (_ref3) {
      var description = _ref3.description,
          updatedState = _ref3.updatedState;
      test("".concat(description), function () {
        var wrapper = getWrapper();
        wrapper.instance().onOpen();
        expect(wrapper.state('isColumnMenuOpen')).toEqual(updatedState.isColumnMenuOpen);
      });
    });
  });
  describe('toggleColumnButton()', function () {
    [{
      description: 'Should update state with new ordering',
      updatedState: {
        isColumnMenuOpen: true
      }
    }].forEach(function (_ref4) {
      var description = _ref4.description,
          updatedState = _ref4.updatedState;
      test("".concat(description), function () {
        var wrapper = getWrapper();
        wrapper.instance().toggleColumnButton();
        expect(wrapper.state('isColumnMenuOpen')).toEqual(updatedState.isColumnMenuOpen);
      });
    });
  });
  describe('getNumberOfHiddenColumns()', function () {
    [{
      description: 'Should return the number of hidden columns',
      numberOfHiddenColumns: 0
    }].forEach(function (_ref5) {
      var description = _ref5.description,
          numberOfHiddenColumns = _ref5.numberOfHiddenColumns;
      test("".concat(description), function () {
        var wrapper = getWrapper();
        var result = wrapper.instance().getNumberOfHiddenColumns();
        expect(result).toEqual(numberOfHiddenColumns);
      });
    });
  });
});