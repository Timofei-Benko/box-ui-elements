function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n            description                                                                | transientConditions  | shouldCloseResult\n            ", " | ", "   | ", "\n            ", "    | ", " | ", "\n        "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n            index\n            ", "\n        "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n            conditionId | values\n            ", "      | ", "\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            conditionId | value\n            ", "      | ", "\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            innerColumns | conditions         | transientConditions | expectedConditions    | should\n            ", "   | ", " | ", "               | ", "    | ", "\n            ", "   | ", "              | ", "               | ", " | ", "\n            ", "        | ", "              | ", "               | ", "                 | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { columnForTemplateFieldName, columnForDateType } from '../components/fixtures';
import FilterButton from '../components/filter/FilterButton';
import { EQUALS, LESS_THAN } from '../constants';
var validCondition = {
  columnId: columnForTemplateFieldName.id,
  id: '0',
  operator: EQUALS,
  values: [1]
};

var invalidCondition = _objectSpread({}, validCondition, {
  values: []
});

var columns = [columnForTemplateFieldName, columnForDateType];
var validConditions = [validCondition];
var invalidConditions = [invalidCondition];
describe('feature/query-bar/components/filter/FilterButton', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(FilterButton, _extends({
      conditions: validConditions
    }, props)));
  };

  describe('render', function () {
    test('should disable FilterButton when columns is undefined', function () {
      var wrapper = getWrapper({
        columns: null
      });
      var Button = wrapper.find('Button');
      expect(Button.props().isDisabled).toBeTruthy();
    });
    test('should enable FilterButton when columns is non-empty', function () {
      var wrapper = getWrapper({
        columns: columns
      });
      var Button = wrapper.find('Button');
      expect(Button.props().isDisabled).toBeFalsy();
    });
    test('Should close the menu and clear out transientConditions when Apply button is clicked', function () {
      var wrapper = getWrapper({
        conditions: validConditions
      });
      wrapper.instance().setState({
        transientConditions: validConditions,
        isMenuOpen: true
      });
      wrapper.find('.apply-filters-button').simulate('click');
      var Flyout = wrapper.find('Flyout');
      expect(Flyout.props().overlayIsVisible).toBeFalsy();
      expect(wrapper.state('transientConditions')).toHaveLength(0);
    });
    test('Should set hasUserSubmitted to true for Condition if any condition is invalid', function () {
      var wrapper = getWrapper({
        conditions: [{
          values: []
        }]
      });
      wrapper.instance().setState({
        transientConditions: invalidConditions,
        isMenuOpen: true
      });
      wrapper.find('.apply-filters-button').simulate('click');
      var Condition = wrapper.find('Condition');
      expect(Condition.props().hasUserSubmitted).toBeTruthy();
    });
  });
  describe('componentDidUpdate()', function () {
    var initialCondition = {
      columnId: columnForTemplateFieldName.id,
      id: '1',
      operator: '=',
      values: []
    };
    test.each(_templateObject(), columns, validConditions, [], validConditions, 'should reinitialize conditions from props.conditions when flyout is opened and props.conditions is not empty', columns, [], [], [initialCondition], 'should set initial condition if props.conditions is empty and transientConditions are empty', [], [], [], [], 'should set empty array if props.conditions is empty and transientConditions are empty and columns are empty')('$should', function (_ref) {
      var innerColumns = _ref.innerColumns,
          conditions = _ref.conditions,
          transientConditions = _ref.transientConditions,
          expectedConditions = _ref.expectedConditions;
      var wrapper = getWrapper({
        columns: innerColumns,
        conditions: conditions
      });
      wrapper.setState({
        isMenuOpen: true,
        transientConditions: transientConditions
      });
      wrapper.instance().componentDidUpdate({}, {
        isMenuOpen: false
      });
      expect(wrapper.state('transientConditions')).toEqual(expectedConditions);
    });
  });
  describe('handleColumnChange()', function () {
    test('should update condition to the selected column', function () {
      var conditions2 = _objectSpread({}, validConditions, {
        columnId: columnForTemplateFieldName.id
      });

      var wrapper = getWrapper({
        columns: columns
      });
      wrapper.setState({
        conditions: conditions2
      });
      wrapper.instance().handleColumnChange(conditions2[0], columnForDateType.id);
      expect(wrapper.state('transientConditions')[0].columnId).toEqual(columnForDateType.id);
    });
  });
  describe('handleOperatorChange()', function () {
    var transientConditions = [{
      columnId: '1',
      id: '4',
      operator: EQUALS,
      values: []
    }];
    var expectedConditions = [{
      columnId: '1',
      id: '4',
      operator: LESS_THAN,
      values: []
    }];
    test.each(_templateObject2(), '4', LESS_THAN)('should update condition.operator', function (_ref2) {
      var conditionId = _ref2.conditionId,
          value = _ref2.value;
      var wrapper = getWrapper({
        columns: columns
      });
      wrapper.setState({
        transientConditions: transientConditions
      });
      wrapper.instance().handleOperatorChange(conditionId, value);
      expect(wrapper.state('transientConditions')).toEqual(expectedConditions);
    });
  });
  describe('handleValueChange()', function () {
    var transientConditions = [{
      columnId: '1',
      id: '5',
      operator: EQUALS,
      values: []
    }];
    var expectedConditions = [{
      columnId: '1',
      id: '5',
      operator: EQUALS,
      values: ['0']
    }];
    test.each(_templateObject3(), '5', ['0'])('should update condition.values', function (_ref3) {
      var conditionId = _ref3.conditionId,
          values = _ref3.values;
      var wrapper = getWrapper({
        columns: columns
      });
      wrapper.setState({
        transientConditions: transientConditions
      });
      wrapper.instance().handleValueChange(conditionId, values);
      expect(wrapper.state('transientConditions')).toEqual(expectedConditions);
    });
  });
  describe('deleteCondition()', function () {
    var transientConditions = [{
      id: '2',
      operator: EQUALS,
      values: []
    }, {
      id: '3',
      operator: EQUALS,
      values: []
    }];
    var expectedConditions = [{
      id: '3',
      operator: EQUALS,
      values: []
    }];
    test.each(_templateObject4(), 0)('should delete condition at index 0', function (_ref4) {
      var index = _ref4.index;
      var wrapper = getWrapper({
        columns: columns
      });
      wrapper.instance().setState({
        transientConditions: transientConditions
      });
      wrapper.instance().deleteCondition(index);
      expect(wrapper.state('transientConditions')).toEqual(expectedConditions);
    });
  });
  describe('onClose()', function () {
    [{
      description: 'Should update state with new ordering',
      updatedState: {
        isMenuOpen: false
      }
    }].forEach(function (_ref5) {
      var description = _ref5.description,
          updatedState = _ref5.updatedState;
      test("".concat(description), function () {
        var wrapper = getWrapper({
          columns: columns
        });
        wrapper.instance().onClose();
        expect(wrapper.state('isMenuOpen')).toEqual(updatedState.isMenuOpen);
      });
    });
  });
  describe('onOpen()', function () {
    [{
      description: 'Should update state with new ordering',
      updatedState: {
        isMenuOpen: true
      }
    }].forEach(function (_ref6) {
      var description = _ref6.description,
          updatedState = _ref6.updatedState;
      test("".concat(description), function () {
        var wrapper = getWrapper({
          columns: columns
        });
        wrapper.instance().onOpen();
        expect(wrapper.state('isMenuOpen')).toEqual(updatedState.isMenuOpen);
      });
    });
  });
  describe('toggleButton()', function () {
    [{
      description: 'Should update state with new ordering',
      updatedState: {
        isMenuOpen: true
      }
    }].forEach(function (_ref7) {
      var description = _ref7.description,
          updatedState = _ref7.updatedState;
      test("".concat(description), function () {
        var wrapper = getWrapper({
          columns: columns
        });
        wrapper.instance().toggleButton();
        expect(wrapper.state('isMenuOpen')).toEqual(updatedState.isMenuOpen);
      });
    });
  });
  describe('createCondition()', function () {
    test('Should return a condition object if columns is non-empty', function () {
      var wrapper = getWrapper({
        columns: columns
      });
      wrapper.instance().setState({
        transientConditions: []
      });
      var condition = wrapper.instance().createCondition();
      expect(condition.columnId).toEqual(columnForTemplateFieldName.id);
      expect(condition.id).toBeDefined();
      expect(condition.operator).toEqual(EQUALS);
      expect(condition.values).toEqual([]);
    });
    test('Should throw an error if columns is empty', function () {
      var wrapper = getWrapper({
        columns: []
      });
      expect(function () {
        wrapper.instance().createCondition();
      }).toThrow('Columns Required');
    });
  });
  describe('closeOnClickPredicate()', function () {
    test.each(_templateObject5(), 'Should return true if Apply button was clicked and value is not empty', validConditions, true, 'Should return false if Apply button was clicked and value is empty', invalidConditions, false)('$description', function (_ref8) {
      var transientConditions = _ref8.transientConditions,
          shouldCloseResult = _ref8.shouldCloseResult;
      var wrapper = getWrapper({
        columns: columns
      });
      var targetWithClassName = {
        target: document.createElement('button')
      };
      wrapper.instance().setState({
        transientConditions: transientConditions
      });
      targetWithClassName.target.className = 'apply-filters-button';
      var closeOnClickPredicateResult = wrapper.instance().shouldClose(targetWithClassName);
      wrapper.update();
      expect(closeOnClickPredicateResult).toEqual(shouldCloseResult);
    });
  });
});