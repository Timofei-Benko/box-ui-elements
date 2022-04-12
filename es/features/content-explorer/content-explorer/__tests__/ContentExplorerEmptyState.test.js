import React from 'react';
import ContentExplorerEmptyState from '../ContentExplorerEmptyState';
describe('features/content-explorer/content-explorer/ContentExplorerEmptyState', function () {
  var renderComponent = function renderComponent(props) {
    return shallow(React.createElement(ContentExplorerEmptyState, props));
  };

  describe('render()', function () {
    test('should render the default component', function () {
      var wrapper = renderComponent();
      expect(wrapper.find('.content-explorer-empty-state').length).toBe(1);
      expect(wrapper.find('FolderEmptyState').length).toBe(1);
      expect(wrapper.find('.content-explorer-empty-state-text').length).toBe(1);
    });
    test('should render the search state when isSearch is true', function () {
      var wrapper = renderComponent({
        isSearch: true
      });
      expect(wrapper.find('SearchEmptyState').length).toBe(1);
    });
  });
});