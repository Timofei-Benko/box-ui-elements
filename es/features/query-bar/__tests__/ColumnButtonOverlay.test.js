function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { columnForDateType, columnWithFloatType } from '../components/fixtures';
import ColumnButtonOverlay from '../components/ColumnButtonOverlay';
var columns = [columnForDateType, columnWithFloatType];
describe('features/query-bar/components/ColumnButtonOverlay', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(ColumnButtonOverlay, _extends({
      onColumnChange: jest.fn(),
      columns: columns
    }, props)));
  };

  describe('render', function () {
    test('should render ColumnButtonOverlay default state', function () {
      var wrapper = getWrapper();
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('onDragEnd()', function () {
    [{
      description: 'Should update state with new ordering',
      sourceIndex: 0,
      destinationIndex: 1,
      updatedColumns: [columnWithFloatType, columnForDateType]
    }, {
      description: 'Should not update state due to no destinationIndex',
      sourceIndex: 0,
      updatedColumns: columns
    }].forEach(function (_ref) {
      var description = _ref.description,
          sourceIndex = _ref.sourceIndex,
          destinationIndex = _ref.destinationIndex,
          updatedColumns = _ref.updatedColumns;
      test("".concat(description), function () {
        var wrapper = getWrapper();
        wrapper.instance().onDragEnd(sourceIndex, destinationIndex);
        expect(wrapper.state('pendingColumns')).toEqual(updatedColumns);
      });
    });
  });
  describe('applyFilters()', function () {
    [{
      description: 'Should apply filters to parent state',
      pendingColumns: columns
    }].forEach(function (_ref2) {
      var description = _ref2.description,
          pendingColumns = _ref2.pendingColumns;
      test("".concat(description), function () {
        var wrapper = getWrapper();
        wrapper.setState({
          pendingColumns: pendingColumns
        });
        wrapper.instance().applyFilters();
      });
    });
  });
  describe('updatePendingColumns()', function () {
    test('Should update state with pendingColumns', function () {
      var pendingColumns = columns;
      var wrapper = getWrapper();
      wrapper.setState({
        pendingColumns: pendingColumns
      });
      wrapper.instance().updatePendingColumns(columnForDateType);
      expect(wrapper.state('pendingColumns')[0].isShown).toBeFalsy();
      expect(wrapper.state('pendingColumns')[1].isShown).toBeTruthy();
    });
  });
});