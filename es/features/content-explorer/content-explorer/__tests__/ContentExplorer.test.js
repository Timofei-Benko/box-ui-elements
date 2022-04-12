function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import ContentExplorer from '..';
import ContentExplorerModes from '../../modes';
import ContentExplorerHeaderActions from '../ContentExplorerHeaderActions';
describe('features/content-explorer/content-explorer/ContentExplorer', function () {
  var sandbox = sinon.sandbox.create();

  var renderComponent = function renderComponent(props, shouldMount) {
    var component = React.createElement(ContentExplorer, _extends({
      contentExplorerMode: ContentExplorerModes.SELECT_FILE,
      initialFoldersPath: [{
        id: '0',
        name: 'folder'
      }],
      onEnterFolder: function onEnterFolder() {},
      onSearchSubmit: function onSearchSubmit() {},
      onExitSearch: function onExitSearch() {},
      items: [],
      numItemsPerPage: 100,
      numTotalItems: 100,
      onLoadMoreItems: function onLoadMoreItems() {},
      listWidth: 500,
      listHeight: 500
    }, props));
    return shouldMount ? mount(component) : shallow(component);
  };

  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  describe('render()', function () {
    test('should render default component', function () {
      var wrapper = renderComponent();
      expect(wrapper.hasClass('content-explorer')).toBe(true);
      expect(wrapper.find('ContentExplorerHeaderActions').length).toBe(1);
      expect(wrapper.find('ItemList').length).toBe(1);
      expect(wrapper.find('ContentExplorerActionButtons').length).toBe(1);
    });
    test('should render component with class when specified', function () {
      var className = 'test';
      var wrapper = renderComponent({
        className: className
      });
      expect(wrapper.hasClass('content-explorer')).toBe(true);
      expect(wrapper.hasClass(className)).toBe(true);
    });
    test('should render component with custom attribute when specified', function () {
      var wrapper = renderComponent({
        'data-resin-feature': 'folderpicker'
      });
      expect(wrapper.prop('data-resin-feature')).toEqual('folderpicker');
    });
    test('should render ContentExplorerHeaderActions with headerActionsAccessory prop', function () {
      var headerActionsAccessory = React.createElement("div", {
        className: "header-actions-accessory"
      });
      var wrapper = renderComponent({
        headerActionsAccessory: headerActionsAccessory
      });
      expect(wrapper.find(ContentExplorerHeaderActions).find('.header-actions-accessory').length).toBe(1);
    });
    test('should pass onSelectedClick to ContentExplorerActionButtons', function () {
      var onSelectedClick = function onSelectedClick() {};

      var wrapper = renderComponent({
        onSelectedClick: onSelectedClick
      });
      expect(wrapper.find('ContentExplorerActionButtons').prop('onSelectedClick')).toEqual(onSelectedClick);
    });
    test('should render ContentExplorerSelectAll with isSelectAllAllowed = true', function () {
      var isSelectAllAllowed = true;
      var wrapper = renderComponent({
        isSelectAllAllowed: isSelectAllAllowed
      });
      expect(wrapper.exists('ContentExplorerSelectAll')).toBeTruthy();
    });
    test('should not render ContentExplorerSelectAll with isSelectAllAllowed = false', function () {
      var isSelectAllAllowed = false;
      var wrapper = renderComponent({
        isSelectAllAllowed: isSelectAllAllowed
      });
      expect(wrapper.find('ContentExplorerSelectAll').length).toBe(0);
    });
    test('should pass numTotalItems to ContentExplorerSelectAll', function () {
      var numTotalItems = 12345;
      var wrapper = renderComponent({
        isSelectAllAllowed: true,
        numTotalItems: numTotalItems
      });
      expect(wrapper.find('ContentExplorerSelectAll').prop('numTotalItems')).toEqual(numTotalItems);
    });
    test('should pass isSelectAllChecked to ContentExplorerSelectAll', function () {
      var isSelectAllChecked = true;
      var wrapper = renderComponent({
        isSelectAllAllowed: true
      });
      wrapper.setState({
        isSelectAllChecked: isSelectAllChecked
      });
      expect(wrapper.find('ContentExplorerSelectAll').prop('isSelectAllChecked')).toEqual(isSelectAllChecked);
    });
    test("customInput should be false if the props isn't passed down", function () {
      var wrapper = renderComponent();
      expect(wrapper.find('ContentExplorerHeaderActions').prop('customInput')).toBe(undefined);
    });
    test('customInput should be contain a custom input if the prop is passed', function () {
      var customInput = function customInput() {
        return React.createElement("div", null, "BLARGH TESTS");
      };

      var wrapper = renderComponent({
        customInput: customInput
      });
      expect(wrapper.find('ContentExplorerHeaderActions').prop('customInput')).toEqual(customInput);
      expect(wrapper).toMatchSnapshot();
    });
    [{
      contentExplorerMode: ContentExplorerModes.SELECT_FILE
    }, {
      contentExplorerMode: ContentExplorerModes.MULTI_SELECT
    }].forEach(function (_ref) {
      var contentExplorerMode = _ref.contentExplorerMode;
      test('should render disabled action buttons if no item is selected', function () {
        var wrapper = renderComponent({
          contentExplorerMode: contentExplorerMode
        });
        expect(wrapper.find('ContentExplorerActionButtons').prop('areButtonsDisabled')).toBe(true);
      });
    });
    [{
      contentExplorerMode: ContentExplorerModes.SELECT_FOLDER
    }, {
      contentExplorerMode: ContentExplorerModes.MOVE_COPY
    }].forEach(function (_ref2) {
      var contentExplorerMode = _ref2.contentExplorerMode;
      test('should render disabled action buttons if currentFolder isActionDisabled is true', function () {
        var wrapper = renderComponent({
          contentExplorerMode: contentExplorerMode
        });
        wrapper.setState({
          foldersPath: [{
            id: '0',
            isActionDisabled: true,
            name: 'name'
          }]
        });
        expect(wrapper.find('ContentExplorerActionButtons').prop('areButtonsDisabled')).toBe(true);
      });
    });
    [{
      contentExplorerMode: ContentExplorerModes.SELECT_FOLDER
    }, {
      contentExplorerMode: ContentExplorerModes.MOVE_COPY
    }].forEach(function (_ref3) {
      var contentExplorerMode = _ref3.contentExplorerMode;
      test('should render disabled action buttons if selected item isActionDisabled is true', function () {
        var wrapper = renderComponent({
          contentExplorerMode: contentExplorerMode
        });
        wrapper.setState({
          selectedItems: {
            '1': {
              id: '1',
              isActionDisabled: true,
              name: 'name'
            }
          }
        });
        expect(wrapper.find('ContentExplorerActionButtons').prop('areButtonsDisabled')).toBe(true);
      });
    });
    [{
      contentExplorerMode: ContentExplorerModes.SELECT_FILE
    }, {
      contentExplorerMode: ContentExplorerModes.SELECT_FOLDER
    }, {
      contentExplorerMode: ContentExplorerModes.MOVE_COPY
    }, {
      contentExplorerMode: ContentExplorerModes.MULTI_SELECT
    }].forEach(function (_ref4) {
      var contentExplorerMode = _ref4.contentExplorerMode;
      test("should render disabled action buttons if selected item's isActionDisabled is true", function () {
        var items = [{
          id: '1',
          name: 'item1',
          isActionDisabled: true
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
          contentExplorerMode: contentExplorerMode,
          items: items
        });
        wrapper.setState({
          selectedItems: selectedItems
        });
        expect(wrapper.find('ContentExplorerActionButtons').prop('areButtonsDisabled')).toBe(true);
      });
    });
    [{
      contentExplorerMode: 'selectFolder'
    }, {
      contentExplorerMode: 'moveCopy'
    }].forEach(function (_ref5) {
      var contentExplorerMode = _ref5.contentExplorerMode;
      test("should render disabled action buttons if current folder's isActionDisabled is true", function () {
        var initialFoldersPath = [{
          id: '0',
          name: 'folder',
          isActionDisabled: true
        }];
        var wrapper = renderComponent({
          contentExplorerMode: contentExplorerMode,
          initialFoldersPath: initialFoldersPath
        });
        expect(wrapper.find('ContentExplorerActionButtons').prop('areButtonsDisabled')).toBe(true);
      });
    });
  });
  describe('onEnterFolder', function () {
    var items = [{
      id: '123',
      name: 'item1',
      type: 'folder'
    }];
    var initialFoldersPath = [{
      id: '0',
      name: 'folder1'
    }, {
      id: '1',
      name: 'folder2'
    }];
    var onEnterFolderSpy;
    var wrapper;
    beforeEach(function () {
      onEnterFolderSpy = sandbox.spy();
      wrapper = renderComponent({
        items: items,
        initialFoldersPath: initialFoldersPath,
        onEnterFolder: onEnterFolderSpy
      }, true);
    });
    test("should call onEnterFolder when clicking a folder's name", function () {
      var clickedFolderIndex = 0;
      var clickedFolder = items[clickedFolderIndex];
      var newFoldersPath = initialFoldersPath.concat([clickedFolder]);
      wrapper.find('.item-list-name').first().simulate('click');
      expect(onEnterFolderSpy.withArgs(clickedFolder, newFoldersPath).calledOnce).toBe(true);
    });
    test('should call onEnterFolder when double clicking a folder', function () {
      var clickedFolderIndex = 0;
      var clickedFolder = items[clickedFolderIndex];
      var newFoldersPath = initialFoldersPath.concat([clickedFolder]);
      wrapper.find('.item-list-name').first().simulate('doubleClick');
      expect(onEnterFolderSpy.withArgs(clickedFolder, newFoldersPath).calledOnce).toBe(true);
    });
    test('should not call onEnterFolder when clicking disabled folder name', function () {
      var disabledItems = [{
        id: '123',
        name: 'item1',
        type: 'folder',
        isDisabled: true
      }];
      wrapper = renderComponent({
        items: disabledItems,
        initialFoldersPath: initialFoldersPath,
        onEnterFolder: onEnterFolderSpy
      }, true);
      var clickedFolderIndex = 0;
      var clickedFolder = items[clickedFolderIndex];
      var newFoldersPath = initialFoldersPath.concat([clickedFolder]);
      wrapper.find('.item-list-name').first().simulate('click');
      expect(onEnterFolderSpy.withArgs(clickedFolder, newFoldersPath).calledOnce).toBe(false);
    });
  });
  describe('onSelectItem', function () {
    var onSelectItemSpy;
    beforeEach(function () {
      onSelectItemSpy = sandbox.spy();
    });
    test('should call onSelectItem with the selected item when clicking an item', function () {
      var clickedItemIndex = 1;
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
        items: items,
        onSelectItem: onSelectItemSpy
      }, true);
      wrapper.find('.table-row').at(clickedItemIndex).simulate('click');
      expect(onSelectItemSpy.withArgs(items[clickedItemIndex], clickedItemIndex).calledOnce).toBe(true);
    });
    test('should call onSelectItem with the selected item and store the latest item in the selectedItems state when clicking multiple items', function () {
      var clickedItemIndex = 1;
      var clickedItemIndex2 = 2;
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
        items: items,
        onSelectItem: onSelectItemSpy
      }, true);
      wrapper.find('.table-row').at(clickedItemIndex).simulate('click');
      wrapper.find('.table-row').at(clickedItemIndex2).simulate('click');
      expect(onSelectItemSpy.withArgs(items[clickedItemIndex], clickedItemIndex).calledOnce).toBe(true);
      expect(onSelectItemSpy.withArgs(items[clickedItemIndex2], clickedItemIndex2).calledOnce).toBe(true);
      expect(Object.keys(wrapper.state('selectedItems')).length).toEqual(1);
      expect(wrapper.state('selectedItems')['3']).toEqual(items[clickedItemIndex2]);
    });
    test('should call onSelectItem with the selected items and store all selected item in the selectedItems state when clicking multiple items [Multi-Select mode]', function () {
      var clickedItemIndex = 1;
      var clickedItemIndex2 = 2;
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
        items: items,
        onSelectItem: onSelectItemSpy,
        contentExplorerMode: ContentExplorerModes.MULTI_SELECT
      }, true);
      wrapper.find('.table-row').at(clickedItemIndex).simulate('click');
      wrapper.find('.table-row').at(clickedItemIndex2).simulate('click');
      expect(onSelectItemSpy.withArgs(items[clickedItemIndex], clickedItemIndex).calledOnce).toBe(true);
      expect(onSelectItemSpy.withArgs(items[clickedItemIndex2], clickedItemIndex2).calledOnce).toBe(true);
      expect(Object.keys(wrapper.state('selectedItems')).length).toEqual(2);
      expect(wrapper.state('selectedItems')['2']).toEqual(items[clickedItemIndex]);
      expect(wrapper.state('selectedItems')['3']).toEqual(items[clickedItemIndex2]);
    });
    test('should not call onSelectItem when clicking a disabled item', function () {
      var items = [{
        id: '1',
        name: 'item1',
        isDisabled: true
      }];
      var wrapper = renderComponent({
        items: items,
        onSelectItem: onSelectItemSpy
      }, true);
      wrapper.find('.table-row').simulate('click');
      expect(onSelectItemSpy.notCalled).toBe(true);
    });
    test('should not call onSelectItem when clicking a loading item', function () {
      var items = [{
        name: 'item1',
        isLoading: true
      }];
      var wrapper = renderComponent({
        items: items,
        onSelectItem: onSelectItemSpy
      }, true);
      wrapper.find('.table-row').simulate('click');
      expect(onSelectItemSpy.notCalled).toBe(true);
    });
  });
  describe('onChooseItems', function () {
    var onChooseItemsSpy;
    beforeEach(function () {
      onChooseItemsSpy = sandbox.spy();
    });
    test('should call onChooseItems with the clicked file when double clicking a file', function () {
      var items = [{
        id: '1',
        name: 'item1',
        type: 'file'
      }];
      var selectedItems = {
        '1': items[0]
      };
      var wrapper = renderComponent({
        items: items,
        onChooseItems: onChooseItemsSpy
      }, true); // Need to make the item selected first because simulating a double click doesn't actually click anything

      wrapper.setState({
        selectedItems: selectedItems
      });
      wrapper.find('.table-row').simulate('doubleClick');
      expect(onChooseItemsSpy.withArgs(items).calledOnce).toBe(true);
    });
  });
  describe('handleExitSearch()', function () {
    test('should set search mode to false and call onExitSearch() when called', function () {
      var folderBeforeSearch = {
        id: 123
      };
      var wrapper = renderComponent({
        onExitSearch: sandbox.mock().withExactArgs(folderBeforeSearch)
      }, false);
      wrapper.setState({
        isInSearchMode: true
      });
      wrapper.instance().handleExitSearch(folderBeforeSearch);
      expect(wrapper.state('isInSearchMode')).toBe(false);
    });
  });
  describe('renderItemListEmptyState()', function () {
    test('should show search empty state when viewing search results', function () {
      var wrapper = renderComponent({}, false);
      wrapper.setState({
        foldersPath: [{
          id: '123',
          name: 'name'
        }],
        isInSearchMode: true
      });
      var Component = wrapper.instance().renderItemListEmptyState;
      var component = shallow(React.createElement(Component, null));
      expect(component.prop('isSearch')).toBe(true);
    });
    test('should not show search empty state when viewing folder in search results', function () {
      var wrapper = renderComponent({}, false);
      wrapper.setState({
        foldersPath: [{
          id: '123',
          name: '123'
        }, {
          id: '234',
          name: '234'
        }],
        isInSearchMode: true
      });
      var Component = wrapper.instance().renderItemListEmptyState;
      var component = shallow(React.createElement(Component, null));
      expect(component.prop('isSearch')).toBe(false);
    });
  });
  describe('handleDocumentClick', function () {
    test('should deselect when the click did not occur inside the content explorer and not in multi select mode', function () {
      var item = {
        id: 'id',
        name: 'name'
      };
      var wrapper = renderComponent({
        contentExplorerMode: ContentExplorerModes.SELECT_FILE
      }, false);
      wrapper.setState({
        selectedItems: {
          id: item
        }
      });
      var domNode = {
        contains: sandbox.spy()
      };
      var event = {
        target: sandbox.spy()
      };
      wrapper.instance().domNode = domNode;
      expect(Object.keys(wrapper.state('selectedItems')).length).toEqual(1);
      wrapper.instance().handleDocumentClick(event);
      expect(Object.keys(wrapper.state('selectedItems')).length).toEqual(0);
    });
    test('should not deselect when the click occurred inside the content explorer', function () {
      var item = {
        id: 'id',
        name: 'name'
      };
      var wrapper = renderComponent({}, false);
      wrapper.setState({
        selectedItems: {
          id: item
        }
      });
      var domNode = {
        contains: sandbox.spy()
      };
      var event = {
        target: domNode
      };
      wrapper.instance().domNode = domNode;
      expect(Object.keys(wrapper.state('selectedItems')).length).toEqual(1);
      wrapper.instance().handleDocumentClick(event);
      expect(Object.keys(wrapper.state('selectedItems')).length).toEqual(1);
    });
  });
  describe('handleContentExplorerClick and shouldDeselectItems', function () {
    test('should deselect when not in multi select mode', function () {
      var item = {
        id: 'id',
        name: 'name'
      };
      var wrapper = renderComponent({
        contentExplorerMode: ContentExplorerModes.SELECT_FILE
      }, false);
      wrapper.setState({
        selectedItems: {
          id: item
        }
      });
      var event = {};
      expect(Object.keys(wrapper.state('selectedItems')).length).toEqual(1);
      wrapper.instance().handleContentExplorerClick(event);
      expect(Object.keys(wrapper.state('selectedItems')).length).toEqual(0);
    });
    test('should not deselect when in multi select mode', function () {
      var item = {
        id: 'id',
        name: 'name'
      };
      var wrapper = renderComponent({
        contentExplorerMode: ContentExplorerModes.MULTI_SELECT
      }, false);
      wrapper.setState({
        selectedItems: {
          id: item
        }
      });
      var event = {};
      wrapper.instance().isEventOnHeadActions = sandbox.stub().returns(false);
      wrapper.instance().isEventOnBreadcrumb = sandbox.stub().returns(false);
      expect(Object.keys(wrapper.state('selectedItems')).length).toBe(1);
      wrapper.instance().handleContentExplorerClick(event);
      expect(Object.keys(wrapper.state('selectedItems')).length).toBe(1);
    });
    [{
      isEventOnHeadActions: true,
      isEventOnBreadcrumb: false
    }, {
      isEventOnHeadActions: false,
      isEventOnBreadcrumb: true
    }].forEach(function (_ref6) {
      var isEventOnHeadActions = _ref6.isEventOnHeadActions,
          isEventOnBreadcrumb = _ref6.isEventOnBreadcrumb;
      test('should assert if unselected have occurred given the different click input targets', function () {
        var item = {
          id: 'id',
          name: 'name'
        };
        var wrapper = renderComponent({
          contentExplorerMode: ContentExplorerModes.MULTI_SELECT
        }, false);
        wrapper.setState({
          selectedItems: {
            id: item
          }
        });
        var event = {};
        wrapper.instance().isEventOnHeadActions = sandbox.stub().returns(isEventOnHeadActions);
        wrapper.instance().isEventOnBreadcrumb = sandbox.stub().returns(isEventOnBreadcrumb);
        expect(Object.keys(wrapper.state('selectedItems')).length).toEqual(1);
        wrapper.instance().handleContentExplorerClick(event);
        expect(Object.keys(wrapper.state('selectedItems')).length).toEqual(1);
      });
    });
  });
  describe('toggleSelectedItem', function () {
    [{
      selectedItems: {
        id: {
          id: 'id',
          name: 'name'
        }
      },
      item: {
        id: 'id',
        name: 'name'
      },
      expectedLength: 0
    }, {
      selectedItems: {
        id: {
          id: 'id',
          name: 'name'
        }
      },
      item: {
        id: 'id2',
        name: 'name'
      },
      expectedLength: 2
    }, {
      selectedItems: {},
      item: {
        id: 'id',
        name: 'name'
      },
      expectedLength: 1
    }].forEach(function (_ref7) {
      var selectedItems = _ref7.selectedItems,
          item = _ref7.item,
          expectedLength = _ref7.expectedLength;
      test('should toggle', function () {
        var wrapper = renderComponent({
          contentExplorerMode: ContentExplorerModes.SELECT_FILE
        }, false);
        var result = wrapper.instance().toggleSelectedItem(selectedItems, item);
        expect(Object.keys(result).length).toEqual(expectedLength);
      });
      test('should set initialSelectedItems', function () {
        var wrapper = renderComponent({
          initialSelectedItems: selectedItems,
          contentExplorerMode: ContentExplorerModes.SELECT_FILE
        }, false);
        var actionButtons = wrapper.find('ContentExplorerActionButtons');
        expect(actionButtons.prop('selectedItems')).toEqual(selectedItems);
      });
    });
  });
  describe('handleSelectAllClick()', function () {
    var items = [{
      id: 'item1',
      name: 'name1'
    }, {
      id: 'item2',
      name: 'name2'
    }];
    var selectedItems = {
      item1: {
        id: 'item1',
        name: 'name1'
      },
      item2: {
        id: 'item2',
        name: 'name2'
      }
    };
    test('should add items to selectedItems when selectAll is called', function () {
      var wrapper = renderComponent({
        items: items
      });
      var result = wrapper.instance().selectAll();
      expect(result).toStrictEqual(selectedItems);
    });
    test('should remove items from selectedItems when unselectAll is called', function () {
      var wrapper = renderComponent({
        items: items
      });
      wrapper.setState({
        selectedItems: selectedItems
      });
      var result = wrapper.instance().unselectAll();
      expect(result).toStrictEqual({});
    });
    test('should call selectAll when handleSelectAllClick and checkbox is not selected', function () {
      var wrapper = renderComponent({
        items: items
      });
      var instance = wrapper.instance();
      wrapper.setState({
        isSelectAllChecked: false
      });
      instance.selectAll = jest.fn();
      instance.unselectAll = jest.fn();
      instance.handleSelectAllClick();
      expect(wrapper.state('isSelectAllChecked')).toBeTruthy();
      expect(instance.selectAll).toHaveBeenCalledTimes(1);
      expect(instance.unselectAll).toHaveBeenCalledTimes(0);
    });
    test('should call unselectAll when handleSelectAllClick and checkbox is selected', function () {
      var wrapper = renderComponent({
        items: items
      });
      wrapper.setState({
        isSelectAllChecked: true
      });
      var instance = wrapper.instance();
      instance.selectAll = jest.fn();
      instance.unselectAll = jest.fn();
      instance.handleSelectAllClick();
      expect(wrapper.state('isSelectAllChecked')).toBeFalsy();
      expect(instance.selectAll).toHaveBeenCalledTimes(0);
      expect(instance.unselectAll).toHaveBeenCalledTimes(1);
    });
    test('should not call selectAll or unselectAll when handleSelectAllClick and checkbox is not selected but items are still loading', function () {
      var wrapper = renderComponent({
        items: [{
          isLoading: true
        }]
      });
      wrapper.setState({
        isSelectAllChecked: true
      });
      var instance = wrapper.instance();
      instance.selectAll = jest.fn();
      instance.unselectAll = jest.fn();
      instance.handleSelectAllClick();
      expect(wrapper.state('isSelectAllChecked')).toBeTruthy();
      expect(instance.selectAll).toHaveBeenCalledTimes(0);
      expect(instance.unselectAll).toHaveBeenCalledTimes(0);
    });
  });
});