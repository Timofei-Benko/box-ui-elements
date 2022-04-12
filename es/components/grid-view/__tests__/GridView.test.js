import React from 'react';
import GridView from '../GridView';
describe('components/grid-view/GridView', function () {
  test('should render()', function () {
    var collection = {
      items: [{
        type: 'folder',
        id: '001',
        name: 'Example Folder'
      }]
    };
    var wrapper = shallow(React.createElement(GridView, {
      columnCount: 5,
      currentCollection: collection,
      height: 600,
      onItemClick: function onItemClick() {},
      onItemSelect: function onItemSelect() {},
      slotRenderer: function slotRenderer(index) {
        return React.createElement("div", null, " ", index, " ");
      },
      width: 400
    }));
    expect(wrapper).toMatchSnapshot();
  });
});