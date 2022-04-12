import React from 'react';
import ItemListLoadingPlaceholder from '../ItemListLoadingPlaceholder';
describe('features/content-explorer/item-list/ItemListLoadingPlaceholder', function () {
  var renderComponent = function renderComponent(props) {
    return shallow(React.createElement(ItemListLoadingPlaceholder, props));
  };

  describe('render()', function () {
    test('should render default component', function () {
      var wrapper = renderComponent();
      expect(wrapper.hasClass('item-list-loading-placeholder')).toBe(true);
    });
    test('should render component with width when specified', function () {
      var width = '500px';
      var wrapper = renderComponent({
        width: width
      });
      expect(wrapper.find('.item-list-loading-placeholder').prop('style')).toEqual({
        width: width
      });
    });
  });
});