import React from 'react';
import sinon from 'sinon';
import ContentExplorerActionButtons, { getChosenItemsFromSelectedItems } from '../ContentExplorerActionButtons';
import ContentExplorerModes from '../../modes';
describe('features/content-explorer/content-explorer/ContentExplorerActionButtons', function () {
  var sandbox = sinon.sandbox.create();

  var renderComponent = function renderComponent(props) {
    return shallow(React.createElement(ContentExplorerActionButtons, props));
  };

  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  describe('render()', function () {
    [// select file
    {
      contentExplorerMode: ContentExplorerModes.SELECT_FILE,
      hasChooseButton: true,
      hasMoveButton: false,
      hasCopyButton: false
    }, // select folder
    {
      contentExplorerMode: ContentExplorerModes.SELECT_FOLDER,
      hasChooseButton: true,
      hasMoveButton: false,
      hasCopyButton: false
    }, // move copy
    {
      contentExplorerMode: ContentExplorerModes.MOVE_COPY,
      hasChooseButton: false,
      hasMoveButton: true,
      hasCopyButton: true
    }, // multi select
    {
      contentExplorerMode: ContentExplorerModes.MULTI_SELECT,
      hasChooseButton: true,
      hasMoveButton: false,
      hasCopyButton: false
    }, // copy
    {
      contentExplorerMode: ContentExplorerModes.COPY,
      hasChooseButton: false,
      hasMoveButton: false,
      hasCopyButton: true
    }].forEach(function (_ref) {
      var contentExplorerMode = _ref.contentExplorerMode,
          hasChooseButton = _ref.hasChooseButton,
          hasMoveButton = _ref.hasMoveButton,
          hasCopyButton = _ref.hasCopyButton;
      test('should render correct buttons based on the specified contentExplorerMode', function () {
        var wrapper = renderComponent({
          contentExplorerMode: contentExplorerMode,
          selectedItems: {}
        });
        expect(wrapper.find('.content-explorer-choose-button').length).toBe(hasChooseButton ? 1 : 0);
        expect(wrapper.find('.content-explorer-move-button').length).toBe(hasMoveButton ? 1 : 0);
        expect(wrapper.find('.content-explorer-copy-button').length).toBe(hasCopyButton ? 1 : 0);
      });
      test('should render disabled buttons when areButtonsDisabled is true', function () {
        var wrapper = renderComponent({
          contentExplorerMode: contentExplorerMode,
          areButtonsDisabled: true,
          selectedItems: {}
        });

        if (hasChooseButton) {
          expect(wrapper.find('.content-explorer-choose-button').prop('isDisabled')).toBe(true);
        }

        if (hasMoveButton) {
          expect(wrapper.find('.content-explorer-move-button').prop('isDisabled')).toBe(true);
        }

        if (hasCopyButton) {
          expect(wrapper.find('.content-explorer-copy-button').prop('isDisabled')).toBe(true);
        }
      });
    });
    test('should disable and set buttons to loading when isChooseButtonLoading is true', function () {
      var wrapper = renderComponent({
        contentExplorerMode: ContentExplorerModes.SELECT_FOLDER,
        isChooseButtonLoading: true,
        selectedItems: {}
      });
      var chooseButton = wrapper.find('.content-explorer-choose-button');
      expect(wrapper.find('.content-explorer-cancel-button').prop('isDisabled')).toBe(true);
      expect(chooseButton.prop('isDisabled')).toBe(true);
      expect(chooseButton.prop('isLoading')).toBe(true);
    });
    test('should disable buttons and set move button to loading when isMoveButtonLoading is true', function () {
      var wrapper = renderComponent({
        contentExplorerMode: ContentExplorerModes.MOVE_COPY,
        isMoveButtonLoading: true,
        selectedItems: {}
      });
      expect(wrapper.find('.content-explorer-cancel-button').prop('isDisabled')).toBe(true);
      var moveBtn = wrapper.find('.content-explorer-move-button');
      expect(moveBtn.prop('isDisabled')).toBe(true);
      expect(moveBtn.prop('isLoading')).toBe(true);
      expect(wrapper.find('.content-explorer-copy-button').prop('isDisabled')).toBe(true);
    });
    test('should disable buttons and set copy button to loading when isCopyButtonLoading is true', function () {
      var wrapper = renderComponent({
        contentExplorerMode: ContentExplorerModes.MOVE_COPY,
        isCopyButtonLoading: true,
        selectedItems: {}
      });
      expect(wrapper.find('.content-explorer-cancel-button').prop('isDisabled')).toBe(true);
      var copyBtn = wrapper.find('.content-explorer-copy-button');
      expect(copyBtn.prop('isDisabled')).toBe(true);
      expect(copyBtn.prop('isLoading')).toBe(true);
      expect(wrapper.find('.content-explorer-move-button').prop('isDisabled')).toBe(true);
    });
    test('should render custom choose button text when specified', function () {
      var chooseButtonText = 'Test';
      var wrapper = renderComponent({
        chooseButtonText: chooseButtonText,
        contentExplorerMode: ContentExplorerModes.SELECT_FOLDER,
        selectedItems: {}
      });
      expect(wrapper.find('.content-explorer-choose-button').contains(chooseButtonText)).toBe(true);
    });
    test('should set custom action buttons props when specified', function () {
      var wrapper = renderComponent({
        actionButtonsProps: {
          'data-resin-feature': 'interactions'
        },
        contentExplorerMode: ContentExplorerModes.SELECT_FOLDER,
        selectedItems: {}
      });
      expect(wrapper.prop('data-resin-feature')).toEqual('interactions');
    });
    test('should set custom cancel button props when specified', function () {
      var wrapper = renderComponent({
        cancelButtonProps: {
          'data-resin-target': 'cancel'
        },
        contentExplorerMode: ContentExplorerModes.SELECT_FOLDER,
        selectedItems: {}
      });
      expect(wrapper.find('.content-explorer-cancel-button').prop('data-resin-target')).toEqual('cancel');
    });
    test('should set custom chooose button props when specified', function () {
      var wrapper = renderComponent({
        chooseButtonProps: {
          'data-resin-target': 'choose'
        },
        contentExplorerMode: ContentExplorerModes.SELECT_FOLDER,
        selectedItems: {}
      });
      expect(wrapper.find('.content-explorer-choose-button').prop('data-resin-target')).toEqual('choose');
    });
  });
  describe('onCancelClick', function () {
    test('should call onCancelClick when cancel button is clicked', function () {
      var onCancelClickSpy = sandbox.spy();
      var wrapper = renderComponent({
        contentExplorerMode: ContentExplorerModes.SELECT_FILE,
        onCancelClick: onCancelClickSpy,
        selectedItems: {}
      });
      wrapper.find('.content-explorer-cancel-button').simulate('click');
      expect(onCancelClickSpy.calledOnce).toBe(true);
    });
  });
  describe('onChooseClick', function () {
    [{
      contentExplorerMode: ContentExplorerModes.SELECT_FILE
    }, {
      contentExplorerMode: ContentExplorerModes.SELECT_FOLDER
    }, {
      contentExplorerMode: ContentExplorerModes.MULTI_SELECT
    }].forEach(function (_ref2) {
      var contentExplorerMode = _ref2.contentExplorerMode;
      test('should call onChooseClick with selected items when choose button is clicked', function () {
        var item = {
          id: '0',
          name: 'item1'
        };
        var itemWithIsActionDisabled = {
          id: '1',
          name: 'item1',
          isActionDisabled: true
        };
        var anotherItem = {
          id: '2',
          name: 'item2'
        };
        var selectedItems = {
          '0': item,
          '1': itemWithIsActionDisabled,
          '2': anotherItem
        };
        var onChooseClickSpy = sandbox.spy();
        var wrapper = renderComponent({
          contentExplorerMode: contentExplorerMode,
          selectedItems: selectedItems,
          onChooseClick: onChooseClickSpy
        });
        wrapper.find('.content-explorer-choose-button').simulate('click');
        expect(onChooseClickSpy.withArgs([item, anotherItem]).calledOnce).toBe(true);
      });
    });
    test('should call onChooseItem with the current folder when clicking the choose button and contentExplorerMode is selectFolder', function () {
      var currentFolder = {
        id: '0',
        name: 'item1'
      };
      var onChooseClickSpy = sandbox.spy();
      var wrapper = renderComponent({
        contentExplorerMode: ContentExplorerModes.SELECT_FOLDER,
        currentFolder: currentFolder,
        onChooseClick: onChooseClickSpy,
        selectedItems: {}
      });
      wrapper.find('.content-explorer-choose-button').simulate('click');
      expect(onChooseClickSpy.withArgs([currentFolder]).calledOnce).toBe(true);
    });
  });
  describe('onMoveClick', function () {
    test('should call onMoveClick with selected items when move button is clicked', function () {
      var item = {
        id: '0',
        name: 'item1'
      };
      var selectedItems = {
        '0': item
      };
      var onMoveClickSpy = sandbox.spy();
      var wrapper = renderComponent({
        contentExplorerMode: ContentExplorerModes.MOVE_COPY,
        selectedItems: selectedItems,
        onMoveClick: onMoveClickSpy
      });
      wrapper.find('.content-explorer-move-button').simulate('click');
      expect(onMoveClickSpy.withArgs(item).calledOnce).toBe(true);
    });
    test('should call onMoveClick with current folder when move button is clicked and no item is selected', function () {
      var currentFolder = {
        id: '0',
        name: 'item1',
        type: 'folder'
      };
      var onMoveClickSpy = sandbox.spy();
      var wrapper = renderComponent({
        contentExplorerMode: ContentExplorerModes.MOVE_COPY,
        currentFolder: currentFolder,
        onMoveClick: onMoveClickSpy,
        selectedItems: {}
      });
      wrapper.find('.content-explorer-move-button').simulate('click');
      expect(onMoveClickSpy.withArgs(currentFolder).calledOnce).toBe(true);
    });
  });
  describe('onCopyClick', function () {
    describe.each([ContentExplorerModes.COPY, ContentExplorerModes.MOVE_COPY])('%s mode', function (contentExplorerMode) {
      test('should call onCopyClick with selected item when copy button is clicked', function () {
        var item = {
          id: '0',
          name: 'item1'
        };
        var selectedItems = {
          '0': item
        };
        var onCopyClickSpy = sandbox.spy();
        var wrapper = renderComponent({
          contentExplorerMode: contentExplorerMode,
          selectedItems: selectedItems,
          onCopyClick: onCopyClickSpy
        });
        wrapper.find('.content-explorer-copy-button').simulate('click');
        expect(onCopyClickSpy.withArgs(item).calledOnce).toBe(true);
      });
      test('should call onCopyClick with current folder when when copy button is clicked and no item is selected', function () {
        var currentFolder = {
          id: '0',
          name: 'item1',
          type: 'folder'
        };
        var onCopyClickSpy = sandbox.spy();
        var wrapper = renderComponent({
          contentExplorerMode: contentExplorerMode,
          currentFolder: currentFolder,
          onCopyClick: onCopyClickSpy,
          selectedItems: {}
        });
        wrapper.find('.content-explorer-copy-button').simulate('click');
        expect(onCopyClickSpy.withArgs(currentFolder).calledOnce).toBe(true);
      });
    });
  });
  describe('renderStatus', function () {
    test('should show status message for multi select', function () {
      var item = {
        id: '0',
        name: 'item1'
      };
      var selectedItems = {
        '0': item
      };
      var wrapper = renderComponent({
        contentExplorerMode: ContentExplorerModes.MULTI_SELECT,
        selectedItems: selectedItems
      });
      expect(wrapper.find('.status-message').length).toEqual(1);
    });
    [{
      contentExplorerMode: ContentExplorerModes.SELECT_FILE
    }, {
      contentExplorerMode: ContentExplorerModes.SELECT_FOLDER
    }, {
      contentExplorerMode: ContentExplorerModes.MOVE_COPY
    }, {
      contentExplorerMode: ContentExplorerModes.COPY
    }].forEach(function (_ref3) {
      var contentExplorerMode = _ref3.contentExplorerMode;
      test('should not show status message', function () {
        var item = {
          id: '0',
          name: 'item1'
        };
        var selectedItems = {
          '0': item
        };
        var wrapper = renderComponent({
          contentExplorerMode: contentExplorerMode,
          selectedItems: selectedItems
        });
        expect(wrapper.find('.status-message').length).toEqual(0);
      });
    });
    test('should render statusElement as button when onSelectedClick provided for multi select', function () {
      var item = {
        id: '0',
        name: 'item1'
      };
      var selectedItems = {
        '0': item
      };

      var onSelectedClick = function onSelectedClick() {};

      var wrapper = renderComponent({
        contentExplorerMode: ContentExplorerModes.MULTI_SELECT,
        selectedItems: selectedItems
      });
      expect(wrapper.find('Button.status-message').length).toEqual(0);
      expect(wrapper.find('.status-message').length).toEqual(1);
      wrapper.setProps({
        onSelectedClick: onSelectedClick
      });
      expect(wrapper.find('Button.status-message').length).toEqual(1);
    });
  });
  describe('getChosenItemsFromSelectedItems', function () {
    var item = {
      id: '0',
      name: 'item'
    };
    var isActionDisabledItem = {
      id: '1',
      name: 'item1',
      isActionDisabled: true
    };
    [{
      selectedItems: {
        '0': item,
        '1': isActionDisabledItem
      },
      expectedChosenItemCount: 1
    }, {
      selectedItems: {},
      expectedChosenItemCount: 0
    }].forEach(function (_ref4) {
      var selectedItems = _ref4.selectedItems,
          expectedChosenItemCount = _ref4.expectedChosenItemCount;
      test('should have the right chosen items', function () {
        var chosenItems = getChosenItemsFromSelectedItems(selectedItems);
        expect(chosenItems.length).toEqual(expectedChosenItemCount);
      });
    });
  });
});