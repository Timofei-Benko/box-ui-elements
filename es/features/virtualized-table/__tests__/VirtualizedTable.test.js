import React from 'react';
import { shallow } from 'enzyme';
import { AutoSizer } from '@box/react-virtualized/dist/es/AutoSizer';
import { WindowScroller } from '@box/react-virtualized/dist/es/WindowScroller';
import { Column, Table } from '@box/react-virtualized/dist/es/Table';
import BaseVirtualizedTable from '../BaseVirtualizedTable';
import VirtualizedTable from '../VirtualizedTable';
describe('features/virtualized-table/VirtualizedTable', function () {
  var wrapper;
  var rowData;

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(VirtualizedTable, props, React.createElement(Column, {
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
  afterEach(function () {
    jest.resetAllMocks();
  });
  test('should successfully render a VirtualizedTable', function () {
    var autosizer = wrapper.dive().find(AutoSizer);
    var windowScroller = autosizer.dive().find(WindowScroller);
    var baseTable = windowScroller.dive().find(BaseVirtualizedTable);
    var table = baseTable.dive().find(Table);
    expect(wrapper).toMatchSnapshot();
    expect(autosizer).toMatchSnapshot();
    expect(windowScroller).toMatchSnapshot();
    expect(table).toMatchSnapshot();
  });
  test('should successfully render a VirtualizedTable with fixed height', function () {
    wrapper.setProps({
      height: 10
    });
    var autosizer = wrapper.dive().find(AutoSizer);
    var baseTable = autosizer.dive().find(BaseVirtualizedTable);
    var table = baseTable.dive().find(Table);
    expect(autosizer).toMatchSnapshot();
    expect(table).toMatchSnapshot();
  });
  test('should get row data object that corresponds to row index', function () {
    var table = wrapper.dive().find(AutoSizer).dive().find(WindowScroller).dive().find(BaseVirtualizedTable).dive().find(Table);
    expect(table.props().rowGetter({
      index: 0
    })).toEqual(rowData[0]);
    expect(table.props().rowGetter({
      index: 1
    })).toEqual(rowData[1]);
    expect(table.props().rowGetter({
      index: 2
    })).toEqual(rowData[2]);
  });
  test('should set correct rowCount', function () {
    var table = wrapper.dive().find(AutoSizer).dive().find(WindowScroller).dive().find(BaseVirtualizedTable).dive().find(Table);
    expect(table.props().rowCount).toEqual(rowData.length);
  });
  test('should not render WindowScroller when height is set', function () {
    expect(wrapper.dive().find(AutoSizer).dive().find(WindowScroller)).toHaveLength(1);
    wrapper.setProps({
      height: 10
    });
    expect(wrapper.dive().find(AutoSizer).dive().find(WindowScroller)).toHaveLength(0);
    expect(wrapper.dive().find(AutoSizer).dive().find(BaseVirtualizedTable).props().height).toBe(10);
  });
  test('should set defaultHeight and disableHeight on AutoSizer when height is set', function () {
    expect(wrapper.dive().find(AutoSizer).props()).toEqual(expect.objectContaining({
      defaultHeight: undefined,
      disableHeight: true
    }));
    wrapper.setProps({
      height: 10
    });
    expect(wrapper.dive().find(AutoSizer).props()).toEqual(expect.objectContaining({
      defaultHeight: 10,
      disableHeight: true
    }));
  });
});