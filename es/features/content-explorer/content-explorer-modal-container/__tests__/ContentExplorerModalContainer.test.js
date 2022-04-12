function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import sinon from 'sinon';
import ContentExplorerModalContainer from '../ContentExplorerModalContainer';
describe('features/content-explorer/content-explorer-modal-container/ContentExplorerModalContainer', function () {
  var sandbox = sinon.sandbox.create();
  var initialSelectedItems = {
    '123': {
      id: '123',
      name: 'folder123'
    }
  };

  var renderComponent = function renderComponent(props) {
    return shallow(React.createElement(ContentExplorerModalContainer, _extends({
      onRequestClose: function onRequestClose() {},
      isOpen: true,
      contentExplorerMode: "selectFile",
      initialFoldersPath: [{
        id: '0',
        name: 'folder'
      }],
      initialSelectedItems: initialSelectedItems,
      onEnterFolder: function onEnterFolder() {},
      onSearchSubmit: function onSearchSubmit() {},
      onExitSearch: function onExitSearch() {},
      items: [],
      numItemsPerPage: 100,
      numTotalItems: 100,
      onLoadMoreItems: function onLoadMoreItems() {}
    }, props)));
  };

  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  describe('render()', function () {
    test('should render default component', function () {
      var wrapper = renderComponent();
      expect(wrapper.hasClass('content-explorer-modal-container')).toBe(true);
      expect(wrapper.find('ContentExplorerModal').length).toBe(1);
      expect(wrapper.find('ContentExplorerModal').hasClass('hidden')).toBe(false);
      expect(wrapper.find('ContentExplorerModal').prop('initialSelectedItems')).toEqual(initialSelectedItems);
      expect(wrapper.find('NewFolderModal').length).toBe(0);
    });
    test('should render component with class when specified', function () {
      var className = 'test';
      var wrapper = renderComponent({
        className: className
      });
      expect(wrapper.hasClass('content-explorer-modal-container')).toBe(true);
      expect(wrapper.hasClass(className)).toBe(true);
    });
    test('should render ContentExplorerModal as hidden when isNewFolderModalOpen is true', function () {
      var wrapper = renderComponent();
      wrapper.setState({
        isNewFolderModalOpen: true
      });
      expect(wrapper.find('ContentExplorerModal').hasClass('hidden')).toBe(true);
    });
    test('should render NewFolderModal when isNewFolderModalOpen is true', function () {
      var initialFoldersPath = [{
        id: '0',
        name: 'folder'
      }];
      var parentFolderName = initialFoldersPath[0].name;
      var wrapper = renderComponent({
        initialFoldersPath: initialFoldersPath
      });
      wrapper.setState({
        isNewFolderModalOpen: true
      });
      expect(wrapper.find('ContentExplorerModal').length).toBe(1);
      expect(wrapper.find('NewFolderModal').length).toBe(1);
      expect(wrapper.find('NewFolderModal').prop('parentFolderName')).toEqual(parentFolderName);
    });
    test('should pass searchInputProps, chooseButtonText, onSelectItem, and onSelectedClick to ContentExplorerModal', function () {
      var searchInputProps = {
        placeholder: 'test'
      };
      var chooseButtonText = 'test';

      var onSelectedClick = function onSelectedClick() {};

      var onSelectItem = function onSelectItem() {};

      var wrapper = renderComponent({
        searchInputProps: searchInputProps,
        chooseButtonText: chooseButtonText,
        onSelectedClick: onSelectedClick,
        onSelectItem: onSelectItem
      });
      expect(wrapper.find('ContentExplorerModal').prop('searchInputProps')).toEqual(searchInputProps);
      expect(wrapper.find('ContentExplorerModal').prop('chooseButtonText')).toEqual(chooseButtonText);
      expect(wrapper.find('ContentExplorerModal').prop('onSelectedClick')).toEqual(onSelectedClick);
      expect(wrapper.find('ContentExplorerModal').prop('onSelectItem')).toEqual(onSelectItem);
    });
  });
  describe('onNewFolderModalShown', function () {
    test('should call onNewFolderModalShown when new folder button is clicked', function () {
      var onNewFolderModalShownSpy = sandbox.spy();
      var wrapper = renderComponent({
        onNewFolderModalShown: onNewFolderModalShownSpy
      });
      wrapper.find('ContentExplorerModal').prop('onCreateNewFolderButtonClick')();
      expect(onNewFolderModalShownSpy.calledOnce).toBe(true);
    });
  });
  describe('onNewFolderModalClosed', function () {
    test('should call onNewFolderModalClosed when new folder modal is closed', function () {
      var onNewFolderModalClosedSpy = sandbox.spy();
      var wrapper = renderComponent({
        onNewFolderModalClosed: onNewFolderModalClosedSpy
      });
      wrapper.setState({
        isNewFolderModalOpen: true
      });
      wrapper.find('NewFolderModal').prop('onRequestClose')();
      expect(onNewFolderModalClosedSpy.calledOnce).toBe(true);
    });
  });
});