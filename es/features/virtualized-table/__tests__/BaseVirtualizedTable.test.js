function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { shallow } from 'enzyme';
import { Column, Table } from '@box/react-virtualized/dist/es/Table';
import BaseVirtualizedTable from '../BaseVirtualizedTable';
import loadingRowRenderer from '../../virtualized-table-renderers/loadingRowRenderer';
describe('features/virtualized-table/BaseVirtualizedTable', function () {
  var wrapper;
  var rowData;

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(BaseVirtualizedTable, _extends({
      className: "className",
      height: 50,
      sort: jest.fn(),
      width: 100
    }, props), React.createElement(Column, {
      dataKey: "name",
      label: "Name",
      width: 100
    }), React.createElement(Column, {
      dataKey: "description",
      label: "Description",
      width: 100
    })), {
      disableLifecycleMethods: true
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
  test('should successfully render a BaseVirtualizedTable', function () {
    expect(wrapper).toMatchSnapshot();
  });
  test('should render empty rule data with default row count when isLoading is set to true', function () {
    wrapper.setProps({
      isLoading: true
    });
    expect(wrapper.find(Table).prop('rowCount')).toBe(50);
  });
  test('should render empty rule data with row count when isLoading is set to true and loadingRowCount is provided', function () {
    wrapper.setProps({
      isLoading: true,
      loadingRowCount: 12
    });
    expect(wrapper.find(Table).prop('rowCount')).toBe(12);
  });
  test('should blur current target and call sort prop with sortParams when sort click is triggered', function () {
    var event = {
      currentTarget: {
        blur: jest.fn()
      },
      type: 'keydown'
    };
    var sort = jest.fn();
    var sortParams = {
      event: event
    };
    wrapper.setProps({
      sort: sort
    });
    var table = wrapper.find(Table);
    table.props().sort(sortParams);
    expect(event.currentTarget.blur).toHaveBeenCalledTimes(0);
    expect(sort).toHaveBeenCalledTimes(1);
    event.type = 'click';
    table.props().sort(sortParams);
    expect(event.currentTarget.blur).toHaveBeenCalledTimes(1);
    expect(sort).toHaveBeenCalledTimes(2);
  });
  test('should have loadingRowRender if loading is set to true', function () {
    var rowRendererMock = jest.fn();
    wrapper.setProps({
      isLoading: false,
      rowRenderer: rowRendererMock
    });
    expect(wrapper.find(Table).prop('rowRenderer')).toBe(rowRendererMock);
    wrapper.setProps({
      isLoading: true
    });
    expect(wrapper.find(Table).prop('rowRenderer')).toBe(loadingRowRenderer);
  });
  test('should use rowGetter when provided', function () {
    var tableRow;
    var rowGetter = jest.fn().mockReturnValue('custom row');
    wrapper.setProps({
      rowGetter: null
    });
    tableRow = wrapper.find(Table).props().rowGetter({
      index: 1
    });
    expect(tableRow).toEqual(rowData[1]);
    wrapper.setProps({
      rowGetter: rowGetter
    });
    tableRow = wrapper.find(Table).props().rowGetter({
      index: 1
    });
    expect(tableRow).toBe('custom row');
  });
});