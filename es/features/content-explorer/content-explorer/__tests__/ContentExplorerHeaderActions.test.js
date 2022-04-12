function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { ContentExplorerHeaderActionsBase as ContentExplorerHeaderActions } from '../ContentExplorerHeaderActions';
import ContentExplorerSearch from '../ContentExplorerSearch';
describe('features/content-explorer/content-explorer/ContentExplorerHeaderActions', function () {
  var sandbox = sinon.sandbox.create();

  var renderComponent = function renderComponent(props, shouldMount) {
    var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var component = React.createElement(ContentExplorerHeaderActions, _extends({
      contentExplorerMode: "selectFile",
      foldersPath: [],
      intl: {
        formatMessage: function formatMessage() {}
      },
      onFoldersPathUpdated: function onFoldersPathUpdated() {},
      onEnterFolder: function onEnterFolder() {},
      onSearchSubmit: function onSearchSubmit() {},
      onExitSearch: function onExitSearch() {}
    }, props), children);
    return shouldMount ? mount(component) : shallow(component);
  };

  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  describe('render()', function () {
    test('should render default component', function () {
      var wrapper = renderComponent();
      expect(wrapper.hasClass('content-explorer-header-actions')).toBe(true);
      expect(wrapper.find('ContentExplorerSearch').length).toBe(1);
      expect(wrapper.find('ContentExplorerNewFolderButton').length).toBe(1);
      expect(wrapper.find('ContentExplorerBreadcrumbs').length).toBe(1);
    });
    test('should not render new folder button if showCreateNewFolderButton is false', function () {
      var wrapper = renderComponent({
        showCreateNewFolderButton: false
      });
      expect(wrapper.find('ContentExplorerNewFolderButton').length).toBe(0);
    });
    test('should render disabled new folder button if isCreateNewFolderAllowed is false', function () {
      var wrapper = renderComponent({
        isCreateNewFolderAllowed: false
      });
      expect(wrapper.find('ContentExplorerNewFolderButton').prop('isDisabled')).toBe(true);
    });
    test('should render disabled breadcrumbs up button if breacrumbs only has one folder', function () {
      var wrapper = renderComponent({
        foldersPath: [{
          id: '0',
          name: 'item1',
          type: 'folder'
        }]
      });
      expect(wrapper.find('ContentExplorerBreadcrumbs').prop('isUpButtonDisabled')).toBe(true);
    });
    test('should render children', function () {
      var wrapper = renderComponent({
        foldersPath: [{
          id: '0',
          name: 'item1',
          type: 'folder'
        }]
      }, true, React.createElement("div", {
        className: "child"
      }));
      expect(wrapper.find('.child').length).toEqual(1);
    });
    test("should render the contentExplorerSearch if customInput isn't defined", function () {
      var wrapper = renderComponent();
      expect(wrapper.containsMatchingElement(React.createElement(ContentExplorerSearch, null))).toEqual(true);
    });
    test("should render the contentExplorerSearch if customInput isn't defined", function () {
      var wrapper = renderComponent();
      expect(wrapper.containsMatchingElement(React.createElement(ContentExplorerSearch, null))).toEqual(true);
    });
    test('should render the customInput instead of contentExplorerSearch if customInput is defined', function () {
      var customInput = function customInput() {
        return React.createElement("div", null, "MONSTAHHH");
      };

      var wrapper = renderComponent({
        customInput: customInput
      });
      expect(wrapper.instance().props.customInput).toEqual(customInput);
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('onEnterFolder', function () {
    test("should call onEnterFolder when clicking the folder's breadcrumb", function () {
      var foldersPath = [{
        id: '0',
        name: 'item1'
      }, {
        id: '1',
        name: 'item2'
      }, {
        id: '2',
        name: 'item3'
      }];
      var clickedFolderIndex = 1;
      var clickedFolder = foldersPath[clickedFolderIndex];
      var onEnterFolderSpy = sandbox.spy();
      var wrapper = renderComponent({
        foldersPath: foldersPath,
        onEnterFolder: onEnterFolderSpy
      });
      wrapper.instance().handleBreadcrumbClick(clickedFolderIndex);
      expect(onEnterFolderSpy.withArgs(clickedFolder).calledOnce).toBe(true);
    });
    test('should not call onEnterFolder when clicking the last breadcrumb', function () {
      var foldersPath = [{
        id: '0',
        name: 'item1'
      }, {
        id: '1',
        name: 'item2'
      }];
      var onEnterFolderSpy = sandbox.spy();
      var wrapper = renderComponent({
        foldersPath: foldersPath,
        onEnterFolder: onEnterFolderSpy
      });
      wrapper.instance().handleBreadcrumbClick(1);
      expect(onEnterFolderSpy.notCalled).toBe(true);
    });
  });
  describe('onSearchSubmit', function () {
    test('should call onSearchSubmit when clicking the search results breadcrumb', function () {
      var foldersPath = [{
        id: 'search_results_id',
        name: 'Search Results'
      }, {
        id: '0',
        name: 'folder'
      }];
      var onSearchSubmitSpy = sandbox.spy();
      var searchInput = 'test';
      var wrapper = renderComponent({
        foldersPath: foldersPath,
        onSearchSubmit: onSearchSubmitSpy
      }, true); // Submit search

      wrapper.setState({
        searchInput: searchInput
      });
      wrapper.find('form').simulate('submit', {
        preventDefault: function preventDefault() {}
      }); // Click search results breadcrumb

      wrapper.instance().handleBreadcrumbClick(0);
      expect( // First call is for submitting the search
      // Second call is for clicking the search results breadcrumb
      onSearchSubmitSpy.withArgs(searchInput).calledTwice).toBe(true);
    });
  });
  describe('onExitSearch', function () {
    var foldersPath = [{
      id: 'search_results_id',
      name: 'Search Results'
    }];
    var onExitSearchSpy;
    beforeEach(function () {
      onExitSearchSpy = sandbox.spy();
    });
    test('should call onExitSearch when submitting an empty search input', function () {
      var wrapper = renderComponent({
        foldersPath: foldersPath,
        onExitSearch: onExitSearchSpy
      }, true);
      wrapper.find('form').simulate('submit', {
        preventDefault: function preventDefault() {}
      });
      expect(onExitSearchSpy.calledOnce).toBe(true);
    });
    test('should call onExitSearch when clicking the clear search button', function () {
      var wrapper = renderComponent({
        foldersPath: foldersPath,
        onExitSearch: onExitSearchSpy
      });
      wrapper.setState({
        searchInput: 'test'
      });
      wrapper.instance().handleClearSearchButtonClick();
      expect(onExitSearchSpy.calledOnce).toBe(true);
    });
    test('should call onExitSearch when clicking the breadcrumbs up button to exit search', function () {
      var wrapper = renderComponent({
        foldersPath: foldersPath,
        onExitSearch: onExitSearchSpy
      }, true);
      wrapper.find('.content-explorer-breadcrumbs-up-button').hostNodes().simulate('click');
      expect(onExitSearchSpy.calledOnce).toBe(true);
    });
    test('should call onExitSearch() with folder before search when called', function () {
      var folderBeforeSearch = {
        id: 123
      };
      var wrapper = renderComponent({
        foldersPath: foldersPath,
        onExitSearch: sandbox.mock().withExactArgs(folderBeforeSearch)
      }, false);
      var instance = wrapper.instance();
      instance.foldersPathBeforeSearch = [folderBeforeSearch];
      instance.exitSearch();
    });
  });
  describe('onFoldersPathUpdated', function () {
    test('should call onFoldersPathUpdated when submitting search', function () {
      var foldersPath = [{
        id: 'search_results_id',
        name: 'Search Results'
      }];
      var searchInput = 'test';
      var onFoldersPathUpdatedSpy = sandbox.spy();
      var wrapper = renderComponent({
        foldersPath: foldersPath,
        onFoldersPathUpdated: onFoldersPathUpdatedSpy
      }, true); // Submit search

      wrapper.setState({
        searchInput: searchInput
      });
      wrapper.find('form').simulate('submit', {
        preventDefault: function preventDefault() {}
      });
      expect(onFoldersPathUpdatedSpy.calledOnce).toBe(true);
    });
    test('should call onFoldersPathUpdated when exiting search', function () {
      var foldersPath = [{
        id: 'search_results_id',
        name: 'Search Results'
      }];
      var onFoldersPathUpdatedSpy = sandbox.spy();
      var wrapper = renderComponent({
        foldersPath: foldersPath,
        onFoldersPathUpdated: onFoldersPathUpdatedSpy
      }, true);
      wrapper.find('.content-explorer-breadcrumbs-up-button').hostNodes().simulate('click');
      expect(onFoldersPathUpdatedSpy.calledOnce).toBe(true);
    });
  });
});