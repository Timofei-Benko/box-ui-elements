import React from 'react';
import { shallow } from 'enzyme';
import loadingRowRenderer from '../loadingRowRenderer';
describe('features/virtualized-table-renderers/loadingRowRenderer', function () {
  var rowRendererParams;
  beforeEach(function () {
    rowRendererParams = {
      className: 'ReactVirtualized__Table__row',
      columns: [React.createElement("span", {
        key: "1"
      }, React.createElement("span", null, "Replace me 1")), React.createElement("span", {
        key: "2"
      }, React.createElement("span", null, "Replace me 2")), React.createElement("span", {
        key: "3"
      }, React.createElement("span", null, "Replace me 3"))],
      index: 3,
      isScrolling: false,
      key: '3-0',
      rowData: {
        name: 'name',
        owner: 'own',
        size: 'size'
      },
      style: {
        height: 52,
        left: 0,
        position: 'absolute',
        top: 156,
        width: 1083,
        overflow: 'hidden',
        paddingRight: 0
      }
    };
  });
  afterEach(function () {
    jest.resetAllMocks();
  });
  test('should successfully render a row and replace cell content with loading state', function () {
    var wrapper = shallow(loadingRowRenderer(rowRendererParams));
    expect(wrapper).toMatchSnapshot();
  });
});