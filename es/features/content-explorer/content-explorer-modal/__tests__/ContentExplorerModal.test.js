function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import ContentExplorerModal from '../ContentExplorerModal';
describe('features/content-explorer/content-explorer-modal/ContentExplorerModal', function () {
  var renderComponent = function renderComponent(props) {
    return shallow(React.createElement(ContentExplorerModal, _extends({
      isOpen: true,
      contentExplorerMode: "selectFile",
      initialFoldersPath: [],
      onEnterFolder: function onEnterFolder() {},
      onSearchSubmit: function onSearchSubmit() {},
      onExitSearch: function onExitSearch() {},
      items: [],
      numItemsPerPage: 100,
      numTotalItems: 100,
      onLoadMoreItems: function onLoadMoreItems() {},
      formatMessage: function formatMessage() {
        return '';
      }
    }, props)));
  };

  describe('render()', function () {
    test('should render default component', function () {
      var wrapper = renderComponent();
      expect(wrapper.hasClass('content-explorer-modal')).toBe(true);
      expect(wrapper.find('ContentExplorer').length).toBe(1);
    });
    test('should render component with class when specified', function () {
      var className = 'test';
      var wrapper = renderComponent({
        className: className
      });
      expect(wrapper.hasClass('content-explorer-modal')).toBe(true);
      expect(wrapper.hasClass(className)).toBe(true);
    });
    test('should render component with title when specified', function () {
      var title = 'Title';
      var wrapper = renderComponent({
        title: title
      });
      expect(wrapper.find('Modal').prop('title')).toEqual(title);
    });
    test('should render component with description when specified', function () {
      var description = 'Description';
      var wrapper = renderComponent({
        description: description
      });
      expect(wrapper.contains(description)).toBe(true);
    });
    test('customInput should be undefined if nothing is passed in', function () {
      var wrapper = renderComponent();
      expect(wrapper.find('ContentExplorer').prop('customInput')).toEqual(undefined);
    });
    test('customInput should be contain a custom input if the prop is passed', function () {
      var customInput = function customInput() {
        return React.createElement("div", null, "BLARGH TESTS");
      };

      var wrapper = renderComponent({
        customInput: customInput
      });
      expect(wrapper.find('ContentExplorer').prop('customInput')).toEqual(customInput);
      expect(wrapper).toMatchSnapshot();
    });
    test('should pass onSelectedClick and onSelectItem to ContentExplorer', function () {
      var onSelectedClick = function onSelectedClick() {};

      var onSelectItem = function onSelectItem() {};

      var wrapper = renderComponent({
        onSelectedClick: onSelectedClick,
        onSelectItem: onSelectItem
      });
      expect(wrapper.find('ContentExplorer').prop('onSelectedClick')).toEqual(onSelectedClick);
      expect(wrapper.find('ContentExplorer').prop('onSelectItem')).toEqual(onSelectItem);
    });
  });
});