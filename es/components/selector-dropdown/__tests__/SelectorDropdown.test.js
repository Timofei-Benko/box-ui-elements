function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { Children } from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import * as domUtils from '../../../utils/dom';
import SelectorDropdown from '..';
var sandbox = sinon.sandbox.create();
describe('components/selector-dropdown/SelectorDropdown', function () {
  afterEach(function () {
    sandbox.verifyAndRestore();
  });

  var Selector = function Selector() {
    return React.createElement("input", null);
  };

  var renderEmptyDropdown = function renderEmptyDropdown(props) {
    return shallow(React.createElement(SelectorDropdown, _extends({
      selector: React.createElement(Selector, null)
    }, props)));
  };

  var renderDropdownWithChildren = function renderDropdownWithChildren(children, props) {
    return shallow(React.createElement(SelectorDropdown, _extends({
      selector: React.createElement(Selector, null)
    }, props), Children.map(children, function (item) {
      return React.createElement("li", {
        key: item
      }, item);
    })));
  };

  describe('componentWillUnmount()', function () {
    test('should remove document click listener', function () {
      document.removeEventListener = jest.fn();
      var wrapper = renderEmptyDropdown();
      wrapper.unmount();
      expect(document.removeEventListener.mock.calls.length).toBe(1);
    });
  });
  describe('render()', function () {
    test('should render a div wrapper with the specified class', function () {
      var className = 'test';
      var wrapper = renderEmptyDropdown({
        className: className
      });
      expect(wrapper.hasClass('SelectorDropdown')).toBe(true);
      expect(wrapper.hasClass(className)).toBe(true);
    });
    test('should render the selector with aria props', function () {
      var wrapper = renderEmptyDropdown();
      var selector = wrapper.find('Selector');
      var inputProps = selector.prop('inputProps');
      expect(selector.length).toBe(1);
      expect(inputProps['aria-activedescendant']).toBeNull();
      expect(inputProps['aria-expanded']).toBe(false);
    });
    test('should not set aria-owns and render a listbox when dropdown is closed', function () {
      var wrapper = renderEmptyDropdown();
      var inputProps = wrapper.find('Selector').prop('inputProps');
      expect(inputProps['aria-owns']).toBeFalsy();
      expect(wrapper.find('.overlay-wrapper').length).toBe(0);
    });
    test('should render listbox with children when dropdown is open', function () {
      var wrapper = renderDropdownWithChildren(['Testing', 'Hello']);
      wrapper.setState({
        activeItemIndex: 0,
        shouldOpen: true
      });
      var inputProps = wrapper.find('Selector').prop('inputProps');
      expect(inputProps['aria-owns']).toBeTruthy();
      var overlay = wrapper.find('ul.overlay');
      expect(overlay.length).toBe(1);
      expect(overlay.prop('id')).toBeTruthy();
      var items = wrapper.find('li');
      expect(items.length).toBe(2);
      expect(items.at(0).prop('setActiveItemID')).toBeTruthy();
      expect(items.at(0).prop('isActive')).toBe(true);
    });
    test('should render header that is passed in when dropdown is open', function () {
      var title = React.createElement("div", {
        className: "title"
      });
      var wrapper = renderDropdownWithChildren(['Testing', 'Hello'], {
        title: title
      });
      wrapper.setState({
        activeItemIndex: 0,
        shouldOpen: true
      });
      expect(wrapper.find('.title')).toHaveLength(1);
    });
    test('should render title when passed overlayTitle', function () {
      var wrapper = renderDropdownWithChildren(['Testing', 'Hello'], {
        isAlwaysOpen: true
      });
      expect(wrapper.find('.SelectorDropdown-title')).toHaveLength(0);
    });
    test('should not render titie when not passed overlayTitle', function () {
      var wrapper = renderDropdownWithChildren(['Testing', 'Hello'], {
        isAlwaysOpen: true,
        overlayTitle: 'Some Title'
      });
      expect(wrapper.find('.SelectorDropdown-title')).toHaveLength(1);
    });
    test('should render divider when passed dividerIndex', function () {
      var wrapper = renderDropdownWithChildren(['Testing', 'Hello'], {
        dividerIndex: 1,
        isAlwaysOpen: true
      });
      expect(wrapper.find('.SelectorDropdown-divider')).toHaveLength(1);
    });
    test('should not render divider when not passed dividerIndex', function () {
      var wrapper = renderDropdownWithChildren(['Testing', 'Hello'], {
        isAlwaysOpen: true
      });
      expect(wrapper.find('.SelectorDropdown-divider')).toHaveLength(0);
    });
  });
  describe('onFocus', function () {
    test('should set shouldOpen state to true when called', function () {
      var wrapper = renderEmptyDropdown();
      wrapper.simulate('focus');
      expect(wrapper.state('shouldOpen')).toBe(true);
    });
  });
  describe('handleDocumentClick', function () {
    test('should close dropdown when click occurs outside of selector dropdown', function () {
      var wrapper = renderEmptyDropdown();
      var instance = wrapper.instance();
      wrapper.simulate('focus');
      expect(wrapper.state('shouldOpen')).toBe(true);
      sandbox.mock(instance).expects('closeDropdown');
      instance.handleDocumentClick({
        target: document.createElement('div')
      });
    });
    test('should not close dropdown when click occurs on selector dropdown container', function () {
      var wrapper = renderEmptyDropdown();
      wrapper.simulate('focus');
      expect(wrapper.state('shouldOpen')).toBe(true);
      wrapper.simulate('click');
      expect(wrapper.state('shouldOpen')).toBe(true);
    });
    test('should not close dropdown when click occurs on dropdown menu', function () {
      var wrapper = renderEmptyDropdown();
      var instance = wrapper.instance();
      wrapper.simulate('focus');
      expect(wrapper.state('shouldOpen')).toBe(true);
      sandbox.mock(instance).expects('closeDropdown').never();
      instance.handleDocumentClick({
        target: document.getElementById(instance.listboxID)
      });
    });
  });
  describe('handleInput()', function () {
    test('should call openDropdown() when key is pressed', function () {
      var event = {
        key: 'a'
      };
      var wrapper = renderEmptyDropdown();
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('openDropdown');
      wrapper.simulate('keyDown', event);
    });
    test('should call openDropdown() when text is pasted', function () {
      var wrapper = renderEmptyDropdown();
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('openDropdown');
      wrapper.simulate('paste');
    });
  });
  describe('onArrowDown', function () {
    var event;
    var preventDefault = sandbox.spy();
    var stopPropagation = sandbox.spy();
    beforeEach(function () {
      event = {
        key: 'ArrowDown',
        preventDefault: preventDefault,
        stopPropagation: stopPropagation
      };
    });
    test('should set next active item when key is arrow down and dropdown is open', function () {
      var wrapper = renderDropdownWithChildren(['test']);
      var instance = wrapper.instance();
      sandbox.stub(instance, 'isDropdownOpen').returns(true);
      sandbox.mock(instance).expects('setActiveItem').withArgs(0);
      wrapper.simulate('keyDown', event);
    });
    test('should reset active item when key is arrow down, dropdown is open, and the last item is active', function () {
      var wrapper = renderDropdownWithChildren(['test']);
      var instance = wrapper.instance();
      wrapper.setState({
        activeItemIndex: 0
      });
      sandbox.stub(instance, 'isDropdownOpen').returns(true);
      sandbox.mock(instance).expects('setActiveItem').withArgs(-1);
      wrapper.simulate('keyDown', event);
    });
    test('should open dropdown when key is arrow down and dropdown is closed', function () {
      var wrapper = renderEmptyDropdown();
      var instance = wrapper.instance();
      sandbox.stub(instance, 'isDropdownOpen').returns(false);
      sandbox.stub(instance, 'openDropdown');
      wrapper.simulate('keyDown', event);
      expect(instance.openDropdown.calledOnce).toEqual(true);
    });
  });
  describe('onArrowUp', function () {
    var event;
    var preventDefault = sandbox.spy();
    var stopPropagation = sandbox.spy();
    beforeEach(function () {
      event = {
        key: 'ArrowUp',
        preventDefault: preventDefault,
        stopPropagation: stopPropagation
      };
    });
    test('should set previous active item when key is arrow up and dropdown is open', function () {
      var wrapper = renderDropdownWithChildren(['test']);
      var instance = wrapper.instance();
      wrapper.setState({
        activeItemIndex: 0
      });
      sandbox.stub(instance, 'isDropdownOpen').returns(true);
      sandbox.mock(instance).expects('setActiveItem').withArgs(-1);
      wrapper.simulate('keyDown', event);
    });
    test('should correctly set active item when key is arrow up, dropdown is open, and no item is active', function () {
      var wrapper = renderDropdownWithChildren(['test']);
      var instance = wrapper.instance();
      sandbox.stub(instance, 'isDropdownOpen').returns(true);
      sandbox.mock(instance).expects('setActiveItem').withArgs(0);
      wrapper.simulate('keyDown', event);
    });
    test('should open dropdown when key is arrow up and dropdown is closed', function () {
      var wrapper = renderEmptyDropdown();
      var instance = wrapper.instance();
      sandbox.stub(instance, 'isDropdownOpen').returns(false);
      sandbox.stub(instance, 'openDropdown');
      wrapper.simulate('keyDown', event);
      expect(instance.openDropdown.calledOnce).toEqual(true);
    });
  });
  describe('onEnter', function () {
    test('should not stop default event or select item when no item is active', function () {
      var wrapper = renderEmptyDropdown();
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('selectItem').never();
      wrapper.simulate('keyDown', {
        key: 'Enter',
        preventDefault: sandbox.mock().never(),
        stopPropagation: sandbox.mock().never()
      });
    });
    test('should not stop default event or select item when dropdown is closed', function () {
      var wrapper = renderEmptyDropdown();
      var instance = wrapper.instance();
      wrapper.setState({
        activeItemIndex: 0
      });
      sandbox.stub(instance, 'isDropdownOpen').returns(false);
      sandbox.mock(instance).expects('selectItem').never();
      wrapper.simulate('keyDown', {
        key: 'Enter',
        preventDefault: sandbox.mock().never(),
        stopPropagation: sandbox.mock().never()
      });
    });
    test('should stop default event and select item when an item is active and dropdown is open', function () {
      var activeItemIndex = 0;
      var wrapper = renderEmptyDropdown();
      var instance = wrapper.instance();
      var event = {
        key: 'Enter',
        preventDefault: sandbox.mock(),
        stopPropagation: sandbox.mock()
      };
      wrapper.setState({
        activeItemIndex: activeItemIndex
      });
      sandbox.stub(instance, 'isDropdownOpen').returns(true);
      sandbox.mock(instance).expects('selectItem').withExactArgs(activeItemIndex, event);
      wrapper.simulate('keyDown', event);
    });
    test('should call onEnter() when specified and no item is active', function () {
      var event = {
        key: 'Enter'
      };
      var wrapper = renderEmptyDropdown({
        onEnter: sandbox.mock().withExactArgs(event)
      });
      wrapper.simulate('keyDown', event);
    });
    test('should call onEnter() when specified and dropdown is closed', function () {
      var event = {
        key: 'Enter'
      };
      var wrapper = renderEmptyDropdown({
        onEnter: sandbox.mock().withExactArgs(event)
      });
      var instance = wrapper.instance();
      wrapper.setState({
        activeItemIndex: 0
      });
      sandbox.stub(instance, 'isDropdownOpen').returns(false);
      wrapper.simulate('keyDown', event);
    });
  });
  describe('onTab', function () {
    test('should not close dropdown or reset active item when dropdown is closed', function () {
      var wrapper = renderEmptyDropdown();
      var instance = wrapper.instance();
      var instanceMock = sandbox.mock(instance);
      sandbox.stub(instance, 'isDropdownOpen').returns(false);
      instanceMock.expects('closeDropdown').never();
      instanceMock.expects('resetActiveItem').never();
      wrapper.simulate('keyDown', {
        key: 'Tab'
      });
    });
    test('should call closeDropdown() and reset active item when dropdown is open', function () {
      var wrapper = renderEmptyDropdown();
      var instance = wrapper.instance();
      var instanceMock = sandbox.mock(instance);
      sandbox.stub(instance, 'isDropdownOpen').returns(true);
      instanceMock.expects('closeDropdown');
      instanceMock.expects('resetActiveItem');
      wrapper.simulate('keyDown', {
        key: 'Tab'
      });
    });
  });
  describe('onEscape', function () {
    test('should not stop default event, close dropdown, or reset active item when dropdown is closed', function () {
      var wrapper = renderEmptyDropdown();
      var instance = wrapper.instance();
      var instanceMock = sandbox.mock(instance);
      sandbox.stub(instance, 'isDropdownOpen').returns(false);
      instanceMock.expects('closeDropdown').never();
      instanceMock.expects('resetActiveItem').never();
      wrapper.simulate('keyDown', {
        key: 'Escape',
        preventDefault: sandbox.mock().never(),
        stopPropagation: sandbox.mock().never()
      });
    });
    test('should stop default event, close dropdown, and reset active item when dropdown is open', function () {
      var wrapper = renderEmptyDropdown();
      var instance = wrapper.instance();
      var instanceMock = sandbox.mock(instance);
      sandbox.stub(instance, 'isDropdownOpen').returns(true);
      instanceMock.expects('closeDropdown');
      instanceMock.expects('resetActiveItem');
      wrapper.simulate('keyDown', {
        key: 'Escape',
        preventDefault: sandbox.mock(),
        stopPropagation: sandbox.mock()
      });
    });
    test('should not prevent default event and should not stop propagation', function () {
      var wrapper = renderEmptyDropdown({
        isAlwaysOpen: true
      });
      var instance = wrapper.instance();
      var instanceMock = sandbox.stub(instance, 'isDropdownOpen').returns(true);
      sandbox.mock(instanceMock.closeDropdown).never();
      sandbox.mock(instanceMock.resetActiveItem).never();
      wrapper.simulate('keyDown', {
        key: 'Escape',
        preventDefault: sandbox.mock().never(),
        stopPropagation: sandbox.mock().never()
      });
    });
  });
  describe('onItemMouseDown', function () {
    test('should prevent default when mousedown on item occurs to prevent blur', function () {
      var wrapper = renderDropdownWithChildren(['test']);
      wrapper.setState({
        shouldOpen: true
      });
      wrapper.find('li').simulate('mouseDown', {
        preventDefault: sandbox.mock()
      });
    });
  });
  describe('onItemMouseEnter', function () {
    test('should set correct active item index when hovering over item', function () {
      var wrapper = renderDropdownWithChildren(['test']);
      wrapper.setState({
        shouldOpen: true
      });
      wrapper.find('li').simulate('mouseEnter');
      expect(wrapper.state('activeItemIndex')).toEqual(0);
    });
  });
  describe('componentDidUpdate()', function () {
    [// No Children
    {
      children: null
    }, // same children
    {
      children: ['test']
    }].forEach(function (_ref) {
      var children = _ref.children;
      test('should not call resetActiveItem() when children have not changed', function () {
        var wrapper = renderDropdownWithChildren(children);
        var instance = wrapper.instance();
        sandbox.mock(instance).expects('resetActiveItem').never();
        wrapper.setProps({
          className: 'test'
        });
      });
    });
    [// Children Different Length
    {
      children: ['hi', 'bye'],
      nextChildren: ['hi']
    }, // Next Children
    {
      children: ['hi'],
      nextChildren: ['bye']
    }].forEach(function (_ref2) {
      var children = _ref2.children,
          nextChildren = _ref2.nextChildren;
      test('should call resetActiveItem() when children have changed', function () {
        var wrapper = renderDropdownWithChildren(children);
        var instanceMock = sandbox.mock(wrapper.instance());
        instanceMock.expects('resetActiveItem');
        instanceMock.expects('setActiveItem').never();
        wrapper.setProps({
          children: Children.map(nextChildren, function (item) {
            return React.createElement("li", {
              key: item
            }, item);
          })
        });
      });
      test('should call setActiveItem() with index 0 when children have changed and shouldSetActiveItemOnOpen is set to true', function () {
        var wrapper = renderDropdownWithChildren(children, {
          shouldSetActiveItemOnOpen: true
        });
        var instanceMock = sandbox.mock(wrapper.instance());
        instanceMock.expects('resetActiveItem').never();
        instanceMock.expects('setActiveItem').once().withArgs(0);
        wrapper.setProps({
          children: Children.map(nextChildren, function (item) {
            return React.createElement("li", {
              key: item
            }, item);
          })
        });
      });
    });
  });
  describe('setActiveItem()', function () {
    var wrapper = renderEmptyDropdown();
    var instance = wrapper.instance();
    test('should update activeItemIndex state when called', function () {
      var index = 1;
      sandbox.mock(instance).expects('setActiveItemID').never();
      instance.setActiveItem(index);
      expect(wrapper.state('activeItemIndex')).toEqual(index);
    });
    test('should reset active item ID when index is -1', function () {
      sandbox.mock(instance).expects('setActiveItemID').withArgs(null);
      instance.setActiveItem(-1);
    });
  });
  describe('setActiveItemID()', function () {
    var wrapper = renderEmptyDropdown();
    var instance = wrapper.instance();
    var id = 'test123';
    test('should update activeItemID state when called', function () {
      instance.setActiveItemID(id);
      expect(wrapper.state('activeItemID')).toEqual(id);
    });
    test('should call scrollIntoView', function () {
      var scrollIntoView = jest.spyOn(domUtils, 'scrollIntoView');
      instance.setActiveItemID(id);
      expect(scrollIntoView).toHaveBeenCalled();
    });
  });
  describe('resetActiveItem()', function () {
    test('should update activeItemIndex state when called', function () {
      var wrapper = renderEmptyDropdown();
      var instance = wrapper.instance();
      wrapper.setState({
        activeItemID: 'test',
        activeItemIndex: 1
      });
      instance.resetActiveItem();
      expect(wrapper.state('activeItemID')).toEqual(null);
      expect(wrapper.state('activeItemIndex')).toEqual(-1);
    });
  });
  describe('isDropdownOpen()', function () {
    [// No Children and Open
    {
      hasChildren: false,
      shouldOpen: true,
      isAlwaysOpen: false,
      exp: false
    }, // With Children and Closed
    {
      hasChildren: true,
      shouldOpen: false,
      isAlwaysOpen: false,
      exp: false
    }, // No Children and Closed
    {
      hasChildren: false,
      shouldOpen: false,
      isAlwaysOpen: false,
      exp: false
    }, // With Children and Open
    {
      hasChildren: true,
      shouldOpen: true,
      isAlwaysOpen: false,
      exp: true
    }, // Forced Open with Children
    {
      hasChildren: true,
      shouldOpen: false,
      isAlwaysOpen: true,
      exp: true
    }, // Forced Open Without Children
    {
      hasChildren: false,
      shouldOpen: false,
      isAlwaysOpen: true,
      exp: false
    }].forEach(function (_ref3) {
      var hasChildren = _ref3.hasChildren,
          shouldOpen = _ref3.shouldOpen,
          isAlwaysOpen = _ref3.isAlwaysOpen,
          exp = _ref3.exp;
      test('should open dropdown when all conditions are met', function () {
        var wrapper = hasChildren ? renderDropdownWithChildren(['test'], {
          isAlwaysOpen: isAlwaysOpen
        }) : renderEmptyDropdown({
          isAlwaysOpen: isAlwaysOpen
        });
        var instance = wrapper.instance();
        wrapper.setState({
          shouldOpen: shouldOpen
        });
        expect(instance.isDropdownOpen()).toEqual(exp);
      });
    });
  });
  describe('openDropdown()', function () {
    test('should set shouldOpen state to true when called', function () {
      var wrapper = renderEmptyDropdown();
      var instance = wrapper.instance();
      instance.openDropdown();
      expect(wrapper.state('shouldOpen')).toBe(true);
    });
    test('should add document click listener', function () {
      document.addEventListener = jest.fn();
      var wrapper = renderEmptyDropdown();
      var instance = wrapper.instance();
      instance.openDropdown();
      expect(document.addEventListener.mock.calls.length).toBe(1);
    });
    test('should activate first item when dropdown is opened and shouldSetActiveItemOnOpen is set to true', function () {
      var setActiveItem = jest.fn();
      var wrapper = renderEmptyDropdown();
      var instance = wrapper.instance();
      instance.setActiveItem = setActiveItem;
      wrapper.setProps({
        shouldSetActiveItemOnOpen: false
      });
      instance.openDropdown();
      expect(setActiveItem).toHaveBeenCalledTimes(0);
      instance.closeDropdown();
      wrapper.setProps({
        shouldSetActiveItemOnOpen: true
      });
      instance.openDropdown();
      expect(setActiveItem).toHaveBeenCalledWith(0);
      expect(setActiveItem).toHaveBeenCalledTimes(1);
    });
  });
  describe('closeDropdown()', function () {
    test('should set shouldOpen state to false when called', function () {
      var wrapper = renderEmptyDropdown();
      var instance = wrapper.instance();
      wrapper.setState({
        shouldOpen: true
      });
      instance.closeDropdown();
      expect(wrapper.state('shouldOpen')).toBe(false);
    });
    test('should remove document click listener', function () {
      document.removeEventListener = jest.fn();
      var wrapper = renderEmptyDropdown();
      var instance = wrapper.instance();
      wrapper.setState({
        shouldOpen: true
      });
      instance.closeDropdown();
      expect(document.removeEventListener.mock.calls.length).toBe(1);
    });
  });
  describe('selectItem()', function () {
    test('should call onSelect() with the index and event when prop is specified', function () {
      var onSelectSpy = sandbox.spy();
      var wrapper = renderEmptyDropdown({
        onSelect: onSelectSpy
      });
      var instance = wrapper.instance();
      var index = 1;
      var event = {
        type: 'click'
      };
      instance.selectItem(index, event);
      expect(onSelectSpy.calledWith(index, event)).toBe(true);
    });
    test('should call closeDropdown() when called', function () {
      var wrapper = renderEmptyDropdown();
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('closeDropdown');
      instance.selectItem(0, {});
    });
  });
});