function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Set } from 'immutable';
import sinon from 'sinon';
import makeSelectable from '../makeSelectable';
import shiftSelect from '../shiftSelect';
var sandbox = sinon.sandbox.create();
jest.mock('../shiftSelect');
jest.useFakeTimers();
describe('components/table/makeSelectable', function () {
  var Table = function Table() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return React.createElement("table", props);
  };

  var SelectableTable = makeSelectable(Table);
  var data = ['a', 'b', 'c', 'd', 'e'];

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(SelectableTable, _extends({
      onSelect: sandbox.stub(),
      data: data,
      selectedItems: [],
      enableHotkeys: true
    }, props)));
  };

  afterEach(function () {
    jest.clearAllTimers();
    jest.clearAllMocks();
    sandbox.verifyAndRestore();
  });
  describe('componentDidMount()', function () {
    test('should add keypress listener', function () {
      document.addEventListener = jest.fn();
      var instance = getWrapper().instance();
      expect(document.addEventListener).toBeCalledWith('keypress', instance.handleKeyboardSearch);
    });
  });
  describe('componentDidUpdate()', function () {
    test('should call onFocus handler when focused index changes', function () {
      var onFocus = jest.fn();
      var wrapper = getWrapper({
        onFocus: onFocus
      });
      wrapper.setState({
        focusedIndex: 3
      });
      expect(onFocus).toBeCalledWith(3);
    });
  });
  describe('componentWillUnmount()', function () {
    test('should remove keypress listener', function () {
      document.removeEventListener = jest.fn();
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      wrapper.unmount();
      expect(document.removeEventListener).toBeCalledWith('keypress', instance.handleKeyboardSearch);
    });
  });
  describe('onSelect()', function () {
    test('should set previousIndex to state.focusedIndex, set state.focusedIndex, and call onSelect', function () {
      var wrapper = getWrapper({
        onSelect: sandbox.mock().withArgs(['c'])
      });
      wrapper.setState({
        focusedIndex: 1
      });
      var instance = wrapper.instance();
      instance.onSelect(new Set(['c']), 2);
      expect(instance.previousIndex).toEqual(1);
      expect(wrapper.state('focusedIndex')).toEqual(2);
    });
    test('should call onSelect with Immutable Set when selectedItems is given as a set', function () {
      var wrapper = getWrapper({
        selectedItems: new Set(['a']),
        onSelect: function onSelect(items) {
          expect(items.equals(new Set(['c']))).toBe(true);
        }
      });
      wrapper.setState({
        focusedIndex: 1
      });
      var instance = wrapper.instance();
      instance.onSelect(new Set(['c']), 2);
    });
  });
  describe('getProcessedProps()', function () {
    test('should return selectedItems as Immutable object when given as plain JS', function () {
      var wrapper = getWrapper({
        selectedItems: ['a']
      });
      var instance = wrapper.instance();
      var processedProps = instance.getProcessedProps();
      expect(processedProps.selectedItems.equals(new Set(['a']))).toBe(true);
    });
  });
  describe('selectToggle()', function () {
    test('should remove item from selection when it is selected', function () {
      var wrapper = getWrapper({
        selectedItems: ['a', 'b']
      });
      var instance = wrapper.instance();

      instance.onSelect = function (selectedItems, focusedIndex) {
        expect(selectedItems.equals(new Set(['a']))).toBe(true);
        expect(focusedIndex).toEqual(1);
      };

      instance.selectToggle(1);
    });
    test('should add item to selection when it is not selected', function () {
      var wrapper = getWrapper({
        selectedItems: []
      });
      var instance = wrapper.instance();

      instance.onSelect = function (selectedItems, focusedIndex) {
        expect(selectedItems.equals(new Set(['b']))).toBe(true);
        expect(focusedIndex).toEqual(1);
      };

      instance.selectToggle(1);
    });
  });
  describe('selectRange()', function () {
    afterEach(function () {
      shiftSelect.mockReset();
    });
    test('should call shiftSelect with correct args', function () {
      var selectedItems = ['a', 'b', 'c'];
      var focusedIndex = 1;
      var rowIndex = 2;
      var anchorIndex = 3; // expected computed value

      var selectedRows = new Set([0, 1, 2]);
      shiftSelect.mockImplementation(function () {
        return new Set([1, 2, 3]);
      });
      var wrapper = getWrapper({
        selectedItems: selectedItems
      });
      var instance = wrapper.instance();
      instance.previousIndex = focusedIndex;
      instance.anchorIndex = anchorIndex;

      instance.onSelect = function (newSelectedItems) {
        // newSelectedItems should be the item-mapped equivalent of
        // [1, 2, 3] returned from the call to shiftSelect
        expect(newSelectedItems.equals(new Set(['b', 'c', 'd']))).toBe(true);
      };

      instance.selectRange(rowIndex);
      expect(shiftSelect).toHaveBeenCalledWith(selectedRows, focusedIndex, rowIndex, anchorIndex);
    });
    test('should not change selection if clicking on same row', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.previousIndex = 1;
      instance.selectRange(1);
      expect(shiftSelect).not.toHaveBeenCalled();
    });
  });
  describe('selectOne()', function () {
    test('should not change selection when clicking on the only already-selected row', function () {
      var wrapper = getWrapper({
        selectedItems: ['a']
      });
      var instance = wrapper.instance();
      instance.onSelect = sandbox.mock().never();
      instance.selectOne(0);
    });
    test('should set selection to contain only the target item', function () {
      var wrapper = getWrapper({
        selectedItems: ['a', 'b']
      });
      var instance = wrapper.instance();

      instance.onSelect = function (selectedItems, focusedIndex) {
        expect(selectedItems.equals(new Set(['c']))).toBe(true);
        expect(focusedIndex).toEqual(2);
      };

      instance.selectOne(2);
    });
  });
  describe('handleRowClick()', function () {
    test('should call selectToggle() when meta key pressed', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      var index = 1;
      instance.selectToggle = sandbox.mock().withArgs(index);
      instance.handleRowClick({
        metaKey: true
      }, index);
    });
    test('should call selectToggle() when ctrl key pressed', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      var index = 1;
      instance.selectToggle = sandbox.mock().withArgs(index);
      instance.handleRowClick({
        ctrlKey: true
      }, index);
    });
    test('should call selectRange() when shift key pressed', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      var index = 1;
      instance.selectRange = sandbox.mock().withArgs(index);
      instance.handleRowClick({
        shiftKey: true
      }, index);
    });
    test('should call selectOne() when no modifier key pressed', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      var index = 1;
      instance.selectOne = sandbox.mock().withArgs(index);
      instance.handleRowClick({}, index);
    });
  });
  describe('handleRowFocus()', function () {
    test('should call onSelect() with correct args', function () {
      var wrapper = getWrapper({
        selectedItems: ['a']
      });
      var instance = wrapper.instance();

      instance.onSelect = function (selectedItems, focusedIndex) {
        expect(selectedItems.equals(new Set(['a']))).toBe(true);
        expect(focusedIndex).toEqual(2);
      };

      instance.handleRowFocus({}, 2);
    });
  });
  describe('handleShiftKeyDown()', function () {
    test('should be no-op when target is the boundary and already selected', function () {
      var wrapper = getWrapper({
        selectedItems: ['a'],
        onSelect: sandbox.mock().never()
      });
      wrapper.setState({
        focusedIndex: 0
      });
      wrapper.instance().handleShiftKeyDown(0, 0);
    });
    test('should select target when it is not already selected', function () {
      var wrapper = getWrapper({
        selectedItems: []
      });
      wrapper.setState({
        focusedIndex: 1
      });
      var instance = wrapper.instance();

      instance.onSelect = function (selectedItems, focusedIndex) {
        expect(selectedItems.equals(new Set(['a']))).toBe(true);
        expect(focusedIndex).toEqual(0);
      };

      instance.handleShiftKeyDown(0, 0);
    });
    test('should deselect source when both source and target are selected', function () {
      var wrapper = getWrapper({
        selectedItems: ['a', 'b']
      });
      wrapper.setState({
        focusedIndex: 0
      });
      var instance = wrapper.instance();

      instance.onSelect = function (selectedItems, focusedIndex) {
        expect(selectedItems.equals(new Set(['b']))).toBe(true);
        expect(focusedIndex).toEqual(1);
      };

      instance.handleShiftKeyDown(1, 4);
    });
    test('should select source when target is selected but not source', function () {
      var wrapper = getWrapper({
        selectedItems: ['b']
      });
      wrapper.setState({
        focusedIndex: 0
      });
      var instance = wrapper.instance();

      instance.onSelect = function (selectedItems, focusedIndex) {
        expect(selectedItems.equals(new Set(['a', 'b']))).toBe(true);
        expect(focusedIndex).toEqual(1);
      };

      instance.handleShiftKeyDown(1, 0);
    });
  });
  describe('clearFocus()', function () {
    test('should clear focus', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      wrapper.setState({
        focusedIndex: 1
      });
      instance.clearFocus();
      expect(wrapper.state('focusedIndex')).toBeUndefined();
    });
  });
  describe('blur detection', function () {
    test('should not set timer when table does not have focus', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.clearFocus = jest.fn();
      wrapper.setState({
        focusedIndex: undefined
      });
      instance.handleTableBlur();
      jest.runAllTimers();
      expect(instance.blurTimerID).toBeNull();
      expect(instance.clearFocus).toBeCalledTimes(0);
    });
    test('should clear focus after timeout expires', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.clearFocus = jest.fn();
      wrapper.setState({
        focusedIndex: 1
      });
      instance.handleTableBlur();
      jest.runAllTimers();
      expect(instance.clearFocus).toBeCalledTimes(1);
    });
    test('should not clear focus if focus is regained before timeout expires', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.clearFocus = jest.fn();
      wrapper.setState({
        focusedIndex: 1
      });
      instance.handleTableBlur();
      instance.handleTableFocus(); // regain focus

      jest.runAllTimers();
      expect(instance.clearFocus).toBeCalledTimes(0);
    });
  });
  describe('keyboard shortcuts', function () {
    test('should set and return this.hotkeys when this.hotkeys is null', function () {
      var instance = getWrapper({}).instance(); // should be initially null

      instance.hotkeys = null;
      var shortcuts = instance.getHotkeyConfigs(); // should not be null anymore

      expect(instance.hotkeys).not.toBeNull();
      expect(shortcuts).toEqual(instance.hotkeys);
    });
    test('should use correct description and hotkey type for all shortcuts', function () {
      var hotkeyType = 'item selection';
      var instance = getWrapper({
        hotkeyType: hotkeyType
      }).instance();
      var shortcuts = instance.getHotkeyConfigs();
      shortcuts.forEach(function (shortcut) {
        expect(shortcut.description).toBeTruthy();
        expect(shortcut.type).toEqual(hotkeyType);
      });
    });
    describe('down', function () {
      var hotkeyIndex = 0;
      test('should set focus to first row when no currently focused item', function () {
        var wrapper = getWrapper({
          selectedItems: ['a']
        });
        wrapper.setState({
          focusedIndex: undefined
        });
        var instance = wrapper.instance();
        var shortcut = instance.getHotkeyConfigs()[hotkeyIndex];
        shortcut.handler({
          preventDefault: sandbox.stub()
        });
        expect(wrapper.state('focusedIndex')).toEqual(0);
      });
      test('should call event.preventDefault() and set focus to next item', function () {
        var wrapper = getWrapper({
          selectedItems: ['a']
        });
        wrapper.setState({
          focusedIndex: 0
        });
        var instance = wrapper.instance();
        var shortcut = instance.getHotkeyConfigs()[hotkeyIndex];
        shortcut.handler({
          preventDefault: sandbox.mock()
        });
        expect(wrapper.state('focusedIndex')).toEqual(1);
      });
      test('should not focus on an index higher than the highest index in the table', function () {
        var wrapper = getWrapper({
          selectedItems: ['a']
        });
        wrapper.setState({
          focusedIndex: 4
        });
        var instance = wrapper.instance();
        var shortcut = instance.getHotkeyConfigs()[hotkeyIndex];
        shortcut.handler({
          preventDefault: sandbox.stub()
        });
        expect(wrapper.state('focusedIndex')).toEqual(4);
      });
    });
    describe('up', function () {
      var hotkeyIndex = 1;
      test('should call event.preventDefault() and call onSelect with new focused item', function () {
        var wrapper = getWrapper({
          selectedItems: ['a']
        });
        wrapper.setState({
          focusedIndex: 1
        });
        var instance = wrapper.instance();
        var shortcut = instance.getHotkeyConfigs()[hotkeyIndex];
        shortcut.handler({
          preventDefault: sandbox.mock()
        });
        expect(wrapper.state('focusedIndex')).toEqual(0);
      });
      test('should not focus on an index lower than 0', function () {
        var wrapper = getWrapper({
          selectedItems: ['a']
        });
        wrapper.setState({
          focusedIndex: 0
        });
        var instance = wrapper.instance();
        var shortcut = instance.getHotkeyConfigs()[hotkeyIndex];
        shortcut.handler({
          preventDefault: sandbox.stub()
        });
        expect(wrapper.state('focusedIndex')).toEqual(0);
      });
    });
    describe('shift+x', function () {
      var hotkeyIndex = 2;
      test('should be no-op when focusedIndex is undefined', function () {
        var wrapper = getWrapper({
          onSelect: sandbox.mock().never()
        });
        wrapper.setState({
          focusedIndex: undefined
        });
        var instance = wrapper.instance();
        var shortcut = instance.getHotkeyConfigs()[hotkeyIndex];
        shortcut.handler();
      });
      test('should call selectToggle on focused item', function () {
        var wrapper = getWrapper({
          focusedItem: 'b',
          selectedItems: ['a']
        });
        wrapper.setState({
          focusedIndex: 1
        });
        var instance = wrapper.instance();
        instance.selectToggle = sandbox.mock().withArgs(1);
        var shortcut = instance.getHotkeyConfigs()[hotkeyIndex];
        shortcut.handler();
      });
    });
    describe('meta+a / ctrl+a', function () {
      var hotkeyIndex = 3;
      test('should call event.preventDefault() and select all items', function () {
        var wrapper = getWrapper({
          selectedItems: []
        });
        wrapper.setState({
          focusedIndex: 1
        });
        var instance = wrapper.instance();

        instance.onSelect = function (selectedItems, focusedIndex) {
          expect(selectedItems.equals(new Set(data))).toBe(true);
          expect(focusedIndex).toEqual(1);
        };

        var shortcut = instance.getHotkeyConfigs()[hotkeyIndex];
        shortcut.handler({
          preventDefault: sandbox.mock()
        });
      });
    });
    describe('shift+down', function () {
      var hotkeyIndex = 4;
      test('should be no-op when focusedIndex is undefined', function () {
        var wrapper = getWrapper({
          onSelect: sandbox.mock().never()
        });
        wrapper.setState({
          focusedIndex: undefined
        });
        var instance = wrapper.instance();
        var shortcut = instance.getHotkeyConfigs()[hotkeyIndex];
        shortcut.handler();
      });
      test('should call handleShiftKeyDown() with the index of the next item in the table', function () {
        var wrapper = getWrapper({
          selectedItems: ['a']
        });
        wrapper.setState({
          focusedIndex: 0
        });
        var instance = wrapper.instance();
        instance.handleShiftKeyDown = sandbox.mock().withArgs(1, data.length - 1);
        var shortcut = instance.getHotkeyConfigs()[hotkeyIndex];
        shortcut.handler();
      });
      test('should not call handleShiftKeyDown() with an index greater than the highest index', function () {
        var wrapper = getWrapper({
          selectedItems: ['a']
        });
        wrapper.setState({
          focusedIndex: 4
        });
        var instance = wrapper.instance();
        instance.handleShiftKeyDown = sandbox.mock().withArgs(data.length - 1, data.length - 1);
        var shortcut = instance.getHotkeyConfigs()[hotkeyIndex];
        shortcut.handler();
      });
    });
    describe('shift+up', function () {
      var hotkeyIndex = 5;
      test('should be no-op when focusedIndex is undefined', function () {
        var wrapper = getWrapper({
          onSelect: sandbox.mock().never()
        });
        wrapper.setState({
          focusedIndex: undefined
        });
        var instance = wrapper.instance();
        var shortcut = instance.getHotkeyConfigs()[hotkeyIndex];
        shortcut.handler();
      });
      test('should call handleShiftKeyDown() with index of the next item in the table', function () {
        var wrapper = getWrapper({
          focusedItem: 'b',
          selectedItems: ['a']
        });
        wrapper.setState({
          focusedIndex: 1
        });
        var instance = wrapper.instance();
        instance.handleShiftKeyDown = sandbox.mock().withArgs(0, 0);
        var shortcut = instance.getHotkeyConfigs()[hotkeyIndex];
        shortcut.handler();
      });
      test('should not call handleShiftKeyDown() with an index lower than 0', function () {
        var wrapper = getWrapper({
          focusedItem: 'a',
          selectedItems: ['a']
        });
        wrapper.setState({
          focusedIndex: 0
        });
        var instance = wrapper.instance();
        instance.handleShiftKeyDown = sandbox.mock().withArgs(0, 0);
        var shortcut = instance.getHotkeyConfigs()[hotkeyIndex];
        shortcut.handler();
      });
    });
    describe('esc', function () {
      var hotkeyIndex = 6;
      test('should set selection to empty', function () {
        var wrapper = getWrapper({
          selectedItems: ['a', 'b', 'c']
        });
        wrapper.setState({
          focusedIndex: 1
        });
        var instance = wrapper.instance();

        instance.onSelect = function (selectedItems, focusedIndex) {
          expect(selectedItems.equals(new Set([]))).toBe(true);
          expect(focusedIndex).toEqual(1);
        };

        var shortcut = instance.getHotkeyConfigs()[hotkeyIndex];
        shortcut.handler();
      });
    });
  });
  describe('handleKeyboardSearch()', function () {
    var searchStrings = ['abc', 'bcd', 'cde', 'def', 'efg'];
    var target = document.createElement('div');

    var getWrapperWithSearchStrings = function getWrapperWithSearchStrings() {
      return getWrapper({
        searchStrings: searchStrings
      });
    };

    test('should set index correctly to matching string', function () {
      var wrapper = getWrapperWithSearchStrings();
      var instance = wrapper.instance();
      instance.searchString = 'd';
      instance.handleKeyboardSearch({
        target: target,
        key: 'e'
      });
      expect(wrapper.state('focusedIndex')).toEqual(3); // should focus on "def"
    });
    test('should reset searchString after 1 second', function () {
      var wrapper = getWrapperWithSearchStrings();
      var instance = wrapper.instance(); // start typing "c"

      instance.handleKeyboardSearch({
        target: target,
        key: 'c'
      });
      jest.advanceTimersByTime(1001); // type "d"

      instance.handleKeyboardSearch({
        target: target,
        key: 'd'
      }); // should match "def" rather than "cde" due to timeout

      expect(wrapper.state('focusedIndex')).toEqual(3);
    });
    test('should not change focused index when no string match', function () {
      var wrapper = getWrapperWithSearchStrings();
      wrapper.setState({
        focusedIndex: 3
      });
      var instance = wrapper.instance();
      instance.handleKeyboardSearch({
        target: target,
        key: 'z'
      });
      expect(wrapper.state('focusedIndex')).toEqual(3); // should not change
    });
    test('should be noop when event target is contenteditable', function () {
      var wrapper = getWrapperWithSearchStrings();
      wrapper.setState({
        focusedIndex: 3
      });
      var instance = wrapper.instance();
      instance.handleKeyboardSearch({
        target: {
          hasAttribute: function hasAttribute() {
            return true;
          }
        },
        key: 'a'
      });
      expect(wrapper.state('focusedIndex')).toEqual(3); // should not change
    });
    [{
      nodeName: 'INPUT'
    }, {
      nodeName: 'TEXTAREA'
    }].forEach(function (_ref) {
      var nodeName = _ref.nodeName;
      test('should be noop when event target is text field', function () {
        var wrapper = getWrapperWithSearchStrings();
        wrapper.setState({
          focusedIndex: 3
        });
        var instance = wrapper.instance();
        instance.handleKeyboardSearch({
          target: {
            hasAttribute: function hasAttribute() {
              return false;
            },
            nodeName: nodeName
          },
          key: 'a'
        });
        expect(wrapper.state('focusedIndex')).toEqual(3); // should not change
      });
    });
  });
  describe('render()', function () {
    test('should add "is-selectable" class and pass props to table', function () {
      var wrapper = getWrapper({});
      var instance = wrapper.instance();
      wrapper.setState({
        focusedIndex: 1
      });
      var table = wrapper.find('Table');
      expect(table.hasClass('is-selectable')).toBe(true);
      expect(table.prop('onRowClick')).toEqual(wrapper.instance().handleRowClick);
      expect(table.prop('onRowFocus')).toEqual(wrapper.instance().handleRowFocus);
      expect(table.prop('focusedItem')).toEqual('b');
      expect(table.prop('focusedIndex')).toEqual(1);
      expect(table.prop('onTableBlur')).toBe(instance.handleTableBlur);
      expect(table.prop('onTableFocus')).toBe(instance.handleTableFocus);
    });
  });
});