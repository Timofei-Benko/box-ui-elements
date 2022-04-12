import * as React from 'react';
import { columnForItemName, columnForTemplateFieldName, template } from '../components/fixtures';
import QueryBar from '../QueryBar';
var columns = [columnForItemName, columnForTemplateFieldName];
describe('features/query-bar/components/QueryBar', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(QueryBar, props));
  };

  test('should render', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should render when template is not selected', function () {
    var wrapper = getWrapper({
      templates: [template]
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render ColumnButton with columns that do not include item name', function () {
    var wrapper = getWrapper({
      columns: columns
    });
    var ColumnButton = wrapper.find('ColumnButton');
    expect(ColumnButton.props().columns).toEqual([columnForTemplateFieldName]);
  });
  test('should render FilterButton with metadata columns', function () {
    var wrapper = getWrapper({
      columns: columns
    });
    var FilterButton = wrapper.find('FilterButton');
    expect(FilterButton.props().columns).toEqual([columnForTemplateFieldName]);
  });
});