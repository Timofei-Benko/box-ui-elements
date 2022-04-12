function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { ItemListBase as ItemList } from '../ItemList';
import ContentExplorerMode from '../../modes';
describe('features/content-explorer/item-list/ItemList', function () {
  var sandbox = sinon.sandbox.create();

  var renderComponent = function renderComponent(props) {
    return mount(React.createElement(ItemList, _extends({
      contentExplorerMode: ContentExplorerMode.SELECT_FILE,
      height: 500,
      intl: {
        formatMessage: function formatMessage() {}
      },
      items: [],
      numItemsPerPage: 100,
      numTotalItems: 100,
      onLoadMoreItems: function onLoadMoreItems() {},
      selectedItems: {},
      width: 500
    }, props)));
  };

  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  describe('render()', function () {
    test('should render default component', function () {
      var wrapper = renderComponent();
      expect(wrapper.find('div.content-explorer-item-list').length).toBe(1);
      expect(wrapper.find('InfiniteLoader').length).toBe(1);
      expect(wrapper.find('Table').length).toBe(1);
    });
    test('should not render infinite loader when onLoadMoreItems is undefined', function () {
      var wrapper = renderComponent({
        onLoadMoreItems: undefined
      });
      expect(wrapper.find('InfiniteLoader').length).toBe(0);
    });
    test('should render component with class when specified', function () {
      var className = 'test';
      var wrapper = renderComponent({
        className: className
      });
      expect(wrapper.find('div.content-explorer-item-list').hasClass('table')).toBe(true);
      expect(wrapper.find('div.content-explorer-item-list').hasClass(className)).toBe(true);
    });
    test('should render component with correct number of items', function () {
      var items = [{
        id: '1',
        name: 'item1'
      }, {
        id: '2',
        name: 'item2'
      }, {
        id: '3',
        name: 'item3'
      }];
      var wrapper = renderComponent({
        items: items
      });
      var rows = wrapper.find('.table-row');
      expect(rows.length).toBe(items.length);
      expect(rows.find('.item-list-name-col .table-cell .item-list-name').length).toBe(items.length);
      expect(rows.find('.item-list-icon-col .table-cell svg').length).toBe(items.length);
    });
    test('should render component with disabled items when specified', function () {
      var items = [{
        id: '1',
        name: 'item1',
        isDisabled: false
      }, {
        id: '2',
        name: 'item2',
        isDisabled: true
      }];
      var wrapper = renderComponent({
        items: items
      });
      var rows = wrapper.find('.table-row');
      rows.forEach(function (row, i) {
        expect(row.hasClass('disabled')).toEqual(items[i].isDisabled);
      });
    });
    test('should render component with loading items when specified (loading item does not have id or name)', function () {
      var items = [{
        isLoading: false,
        id: '1',
        name: 'item1'
      }, {
        isLoading: true
      }];
      var wrapper = renderComponent({
        items: items
      });
      var rows = wrapper.find('.table-row');
      rows.forEach(function (row, i) {
        var loadingPlaceholders = row.find('.item-list-loading-placeholder');
        expect(loadingPlaceholders.length).toEqual( // A placeholder is rendered for each of the list's 3 columns
        items[i].isLoading ? 3 : 0);
      });
    });
    test('should render component with selected item when specified', function () {
      var items = [{
        id: '1',
        name: 'item1'
      }, {
        id: '2',
        name: 'item2'
      }, {
        id: '3',
        name: 'item3'
      }];
      var selectedItems = {
        '1': items[0]
      };
      var wrapper = renderComponent({
        items: items,
        selectedItems: selectedItems
      });
      var rows = wrapper.find('.table-row');
      rows.forEach(function (row, i) {
        var isSelected = i === 0;
        expect(row.hasClass('is-selected')).toEqual(isSelected);
        expect(row.find('RadioButton').prop('isSelected')).toEqual(isSelected);
      });
    });
    test('should render items with test ids for e2e testing', function () {
      var items = [{
        id: 'item1',
        name: 'item1'
      }, {
        id: 'item2',
        name: 'item2'
      }];
      var expectedTestId = ['item-row-item1', 'item-row-item2'];
      var wrapper = renderComponent({
        items: items
      });
      var testIds = wrapper.find('[role="row"][data-testid*="item-row-"]').map(function (row) {
        return row.prop('data-testid');
      });
      expect(testIds).toEqual(expectedTestId);
    });
    test('should render component with default item buttons', function () {
      var items = [{
        id: '1',
        name: 'item1'
      }, {
        id: '2',
        name: 'item2'
      }];
      var wrapper = renderComponent({
        items: items
      });
      expect(wrapper.find('.item-list-button-col RadioButton').length).toBe(items.length);
    });
    test('should pass width and height props through to Table', function () {
      var width = 111;
      var height = 222;
      var wrapper = renderComponent({
        width: width,
        height: height
      });
      var table = wrapper.find('Table');
      expect(table.prop('width')).toEqual(width);
      expect(table.prop('height')).toEqual(height);
    });
  });
  describe('onItemClick', function () {
    test('should call onItemClick when item is clicked', function () {
      var items = [{
        id: '1',
        name: 'item1'
      }];
      var onItemClickSpy = sandbox.spy();
      var wrapper = renderComponent({
        items: items,
        onItemClick: onItemClickSpy
      });
      wrapper.find('.table-row').simulate('click');
      expect(onItemClickSpy.calledOnce).toBe(true);
    });
  });
  describe('onItemDoubleClick', function () {
    test('should call onItemDoubleClick when item is double clicked', function () {
      var items = [{
        id: '1',
        name: 'item1'
      }];
      var onItemDoubleClickSpy = sandbox.spy();
      var wrapper = renderComponent({
        items: items,
        onItemDoubleClick: onItemDoubleClickSpy
      });
      wrapper.find('.table-row').simulate('doubleClick');
      expect(onItemDoubleClickSpy.calledOnce).toBe(true);
    });
  });
  describe('onItemNameClick', function () {
    test('should call onItemNameClick when item name is clicked', function () {
      var items = [{
        id: '1',
        name: 'item1',
        type: 'folder'
      }];
      var onItemNameClickSpy = sandbox.spy();
      var wrapper = renderComponent({
        items: items,
        onItemNameClick: onItemNameClickSpy
      });
      wrapper.find('.item-list-name').hostNodes().simulate('click');
      expect(onItemNameClickSpy.calledOnce).toBe(true);
    });
  });
  describe('itemIconRenderer', function () {
    test('should use itemIconRenderer when specified', function () {
      var items = [{
        id: '1',
        name: 'item1'
      }, {
        id: '2',
        name: 'item2'
      }];

      var itemIconRenderer = function itemIconRenderer() {
        return React.createElement("button", {
          type: "button",
          className: "icon-test"
        });
      };

      var wrapper = renderComponent({
        items: items,
        itemIconRenderer: itemIconRenderer
      });
      expect(wrapper.find('.item-list-icon-col button.icon-test').length).toBe(items.length);
    });
  });
  describe('itemButtonRenderer', function () {
    test('should use itemButtonRenderer when specified', function () {
      var items = [{
        id: '1',
        name: 'item1'
      }, {
        id: '2',
        name: 'item2'
      }];

      var itemButtonRenderer = function itemButtonRenderer() {
        return React.createElement("button", {
          type: "button",
          className: "button-test"
        });
      };

      var wrapper = renderComponent({
        items: items,
        itemButtonRenderer: itemButtonRenderer
      });
      expect(wrapper.find('.item-list-button-col button.button-test').length).toBe(items.length);
    });
  });
  describe('noItemsRenderer', function () {
    test('should use noItemsRenderer when no items are specified', function () {
      var emptyText = 'Empty';

      var noItemsRenderer = function noItemsRenderer() {
        return React.createElement("h1", null, emptyText);
      };

      var wrapper = renderComponent({
        items: [],
        noItemsRenderer: noItemsRenderer
      });
      expect(wrapper.find('h1').text()).toEqual(emptyText);
    });
  });
});