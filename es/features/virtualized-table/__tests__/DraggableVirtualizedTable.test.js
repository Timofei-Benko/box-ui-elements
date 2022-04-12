function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        destinationValue | expectedDestinationIndex\n        ", "     | ", "\n        ", "  | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { shallow } from 'enzyme';
import { Column } from '@box/react-virtualized/dist/es/Table';
import { bdlGray } from '../../../styles/variables';
import { VIRTUALIZED_TABLE_DEFAULTS } from '../constants';
import DraggableVirtualizedTable from '../DraggableVirtualizedTable';
var ROW_HEIGHT = VIRTUALIZED_TABLE_DEFAULTS.ROW_HEIGHT,
    HEADER_HEIGHT = VIRTUALIZED_TABLE_DEFAULTS.HEADER_HEIGHT;
describe('features/virtualized-table/DraggableVirtualizedTable', function () {
  var wrapper;
  var rowData;

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(DraggableVirtualizedTable, _extends({
      tableId: "tableId"
    }, props), React.createElement(Column, {
      dataKey: "name",
      label: "Name",
      width: 100
    }), React.createElement(Column, {
      dataKey: "description",
      label: "Description",
      width: 100
    })));
  };

  var getRenderPropWrapper = function getRenderPropWrapper() {
    return wrapper.find('Connect(Droppable)').renderProp('children')({
      innerRef: 'innerRef'
    });
  };

  beforeEach(function () {
    rowData = [{
      name: 'name1',
      description: 'description1'
    }, {
      name: 'name2',
      description: 'description2'
    }, {
      name: 'name3',
      description: 'description3'
    }];
    wrapper = getWrapper({
      rowData: rowData
    });
  });
  test('should render a DraggableVirtualizedTable', function () {
    var renderPropWrapper = getRenderPropWrapper();
    expect(wrapper.find('DragDropContext').props().onDragEnd).toEqual(expect.any(Function));
    expect(wrapper.find('Connect(Droppable)').props().droppableId).toBe('tableId');
    expect(renderPropWrapper).toMatchSnapshot();
    expect(renderPropWrapper.find('VirtualizedTable')).toHaveLength(1);
    expect(renderPropWrapper.find('Column')).toHaveLength(3);
  });
  test('should render drag handle when specified', function () {
    var renderPropWrapper;
    wrapper.setProps({
      shouldShowDragHandle: false
    });
    renderPropWrapper = getRenderPropWrapper();
    expect(renderPropWrapper.find('Column').find({
      dataKey: 'dragHandle'
    })).toHaveLength(0);
    wrapper.setProps({
      shouldShowDragHandle: true
    });
    renderPropWrapper = getRenderPropWrapper();
    expect(renderPropWrapper.find('Column').find({
      dataKey: 'dragHandle'
    })).toHaveLength(1);
  });
  test('should add class name to base table when provided', function () {
    wrapper.setProps({
      className: 'myClass'
    });
    var renderPropWrapper = getRenderPropWrapper();
    expect(renderPropWrapper.find('VirtualizedTable').props().className).toBe('bdl-DraggableVirtualizedTable myClass');
  });
  test('should render a drag icon when drag handle cell renderer is called', function () {
    wrapper.setProps({
      className: 'myClass'
    });
    var renderPropWrapper = getRenderPropWrapper();

    var _renderPropWrapper$fi = renderPropWrapper.find('Column').find({
      dataKey: 'dragHandle'
    }).props(),
        cellRenderer = _renderPropWrapper$fi.cellRenderer;

    var renderedCell = cellRenderer();
    expect(renderedCell.type.name).toBe('IconDrag');
    expect(renderedCell.props).toEqual(expect.objectContaining({
      color: bdlGray,
      width: 24,
      height: 24
    }));
  });
  test('should set fixed height on table based on row count', function () {
    rowData.push({
      name: 'name4',
      description: 'description4'
    });
    wrapper.setProps({
      rowData: rowData
    });
    var expectedHeight = rowData.length * ROW_HEIGHT + HEADER_HEIGHT;
    var renderPropWrapper = getRenderPropWrapper();
    expect(renderPropWrapper.find('VirtualizedTable').props().height).toBe(expectedHeight);
  });
  test.each(_templateObject(), undefined, 1, {
    index: 2
  }, 2)('should call onDragEnd with source and destination indices when drag ends and destination is $destinationValue', function (_ref) {
    var destinationValue = _ref.destinationValue,
        expectedDestinationIndex = _ref.expectedDestinationIndex;
    var onDragEnd = jest.fn();
    var dropResult = {
      destination: destinationValue,
      source: {
        index: 1
      }
    };
    wrapper.setProps({
      onDragEnd: onDragEnd
    });
    wrapper.find('DragDropContext').props().onDragEnd(dropResult);
    expect(onDragEnd).toHaveBeenCalledTimes(1);
    expect(onDragEnd).toHaveBeenCalledWith(1, expectedDestinationIndex);
  });
});