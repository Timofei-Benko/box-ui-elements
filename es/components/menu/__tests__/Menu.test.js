/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Menu from '../Menu';
var sandbox = sinon.sandbox.create();
describe('components/menu/Menu', function () {
  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  describe('render()', function () {
    test('should render a unordered list with correct props when called', function () {
      var wrapper = mount(React.createElement(Menu, {
        className: "awesome-menu"
      }, React.createElement("li", null), React.createElement("li", null)));
      expect(wrapper.find('ul').length).toBe(1);
      expect(wrapper.find('ul').prop('role')).toEqual('menu');
      expect(wrapper.find('ul').prop('className')).toEqual('aria-menu awesome-menu');
      expect(wrapper.find('ul').prop('tabIndex')).toEqual(-1);
    });
  });
  describe('setInitialFocusIndex()', function () {
    test('should set internal menuItemEls to valid items after mount', function () {
      var wrapper = mount(React.createElement(Menu, null, React.createElement("li", {
        className: "menu-item",
        role: "menuitem"
      }), React.createElement("li", {
        role: "separator"
      }), React.createElement("li", {
        className: "menu-item",
        role: "menuitem"
      }), React.createElement("li", {
        "aria-disabled": "true",
        className: "menu-item",
        role: "menuitem"
      }), React.createElement("li", null, React.createElement("a", {
        className: "menu-item",
        role: "menuitem"
      }, "Link"))));
      var instance = wrapper.instance(); // Should have 3 items (li, li, a)

      expect(instance.menuItemEls.length).toBe(3);
    });
    test('should set internal menuItemEls with specified menu item selector after mount', function () {
      var selector = 'div .customized-menu-item:not([aria-disabled])';
      var wrapper = mount(React.createElement(Menu, {
        menuItemSelector: selector
      }, React.createElement("div", {
        className: "wrapper"
      }, React.createElement("div", {
        className: "customized-menu-item",
        role: "menuitem"
      }), React.createElement("div", {
        role: "separator"
      }), React.createElement("div", {
        className: "customized-menu-item",
        role: "menuitem"
      }), React.createElement("div", {
        "aria-disabled": "true",
        className: "customized-menu-item",
        role: "menuitem"
      }), React.createElement("div", null, React.createElement("a", {
        className: "customized-menu-item",
        role: "menuitem"
      }, "Link")), React.createElement("div", {
        className: "menu-item",
        role: "menuitem"
      }))));
      var instance = wrapper.instance(); // Should have 3 items (div, div, a)

      expect(instance.menuItemEls.length).toBe(3);
    });
    test('should call setFocus() asynchronously when initialFocusIndex is set to 0', function () {
      var clock = sandbox.useFakeTimers();
      var wrapper = shallow(React.createElement(Menu, {
        initialFocusIndex: 0
      }, React.createElement("li", {
        role: "menuitem"
      })), {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      instance.setInitialFocusIndex();
      sandbox.mock(instance).expects('setFocus').withArgs(0);
      clock.tick(100);
    });
    test('should call setFocus() asynchronously when initialFocusIndex is set to -1', function () {
      var clock = sandbox.useFakeTimers();
      var wrapper = shallow(React.createElement(Menu, {
        initialFocusIndex: -1
      }, React.createElement("li", {
        role: "menuitem"
      })), {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      instance.setInitialFocusIndex();
      sandbox.mock(instance).expects('setFocus').withArgs(-1);
      clock.tick(100);
    });
    test('should not call setFocus() when no initialFocusIndex prop is passed', function () {
      var clock = sandbox.useFakeTimers();
      var wrapper = shallow(React.createElement(Menu, null, React.createElement("li", {
        role: "menuitem"
      })), {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      instance.setInitialFocusIndex();
      sandbox.mock(instance).expects('setFocus').never();
      clock.tick(100);
    });
  });
  describe('componentDidMount()', function () {
    test('should call setInitialFocusIndex()', function () {
      var wrapper = shallow(React.createElement(Menu, {
        className: "awesome-menu"
      }, React.createElement("li", null)));
      var instance = wrapper.instance();
      instance.setInitialFocusIndex = sandbox.mock();
      instance.componentDidMount();
    });
  });
  describe('componentDidUpdate()', function () {
    test('should call setMenuItemEls() and setFocus() when the number of children changes', function () {
      var clock = sandbox.useFakeTimers();
      var wrapper = mount(React.createElement(Menu, {
        initialFocusIndex: 1
      }, React.createElement("li", {
        key: "1",
        className: "menu-item",
        role: "menuitem"
      }), React.createElement("li", {
        key: "2",
        role: "separator"
      }), false));
      clock.tick(0);
      var instance = wrapper.instance();
      var instanceMock = sandbox.mock(instance);
      instanceMock.expects('setMenuItemEls');
      instanceMock.expects('getMenuItemElFromEventTarget').returns({
        menuIndex: 2
      });
      instanceMock.expects('setFocus').withExactArgs(2);
      wrapper.setProps({
        children: [React.createElement("li", {
          key: "1",
          className: "menu-item",
          role: "menuitem"
        }), React.createElement("li", {
          key: "2",
          role: "separator"
        }), React.createElement("li", {
          key: "3",
          className: "menu-item",
          role: "menuitem"
        })]
      });
    });
    test('should not call setMenuItemEls() when the number of children stays the same', function () {
      var wrapper = mount(React.createElement(Menu, null, React.createElement("li", {
        role: "menuitem"
      })));
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('setMenuItemEls').never();
      wrapper.setProps({
        className: 'test'
      });
    });
    test('should call setInitialFocusIndex() when isSubmenu is true and isHidden changes from false to true', function () {
      var wrapper = shallow(React.createElement(Menu, {
        className: "awesome-menu",
        isHidden: true
      }, React.createElement("li", null)));
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('setInitialFocusIndex');
      wrapper.setProps({
        isHidden: false,
        isSubmenu: true
      });
    });
  });
  describe('handleClick()', function () {
    test('should not call fireOnCloseHandler() when click did not occur on a valid menu item', function () {
      var wrapper = mount(React.createElement(Menu, null, React.createElement("li", {
        role: "menuitem"
      }), React.createElement("li", {
        role: "separator"
      })));
      var listItems = wrapper.find('li');
      var separatorEl = listItems.at(1).getDOMNode();
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('getMenuItemElFromEventTarget').withArgs(separatorEl).returns({
        menuItemEl: null,
        menuIndex: -1
      });
      sandbox.mock(instance).expects('fireOnCloseHandler').never();
      wrapper.simulate('click', {
        target: separatorEl,
        preventDefault: sandbox.mock().never(),
        stopPropagation: sandbox.mock().never()
      });
    });
    test('should call fireOnCloseHandler() when click occurred on a valid menu item', function () {
      var wrapper = mount(React.createElement(Menu, null, React.createElement("li", {
        role: "menuitem"
      }), React.createElement("li", {
        role: "separator"
      })));
      var listItems = wrapper.find('li');
      var menuItemEl = listItems.at(0).getDOMNode();
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('getMenuItemElFromEventTarget').withArgs(menuItemEl).returns({
        menuItemEl: menuItemEl
      });
      sandbox.mock(instance).expects('fireOnCloseHandler');
      wrapper.simulate('click', {
        target: menuItemEl,
        preventDefault: sandbox.mock().never(),
        stopPropagation: sandbox.mock().never()
      });
    });
  });
  describe('handleKeyDown()', function () {
    test('should focusNextItem() when "down" key is pressed', function () {
      var wrapper = mount(React.createElement(Menu, null, React.createElement("li", {
        role: "menuitem"
      })));
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('focusNextItem');
      wrapper.simulate('keydown', {
        key: 'ArrowDown',
        preventDefault: sandbox.mock(),
        stopPropagation: sandbox.mock()
      });
    });
    test('should focusPreviousItem() when "up" key is pressed', function () {
      var wrapper = mount(React.createElement(Menu, null, React.createElement("li", {
        role: "menuitem"
      })));
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('focusPreviousItem');
      wrapper.simulate('keydown', {
        key: 'ArrowUp',
        preventDefault: sandbox.mock(),
        stopPropagation: sandbox.mock()
      });
    });
    test('should call fireOnCloseHandler() when "ArrowLeft" key is pressed and isSubmenu prop is true', function () {
      var wrapper = mount(React.createElement(Menu, {
        isSubmenu: true
      }, React.createElement("li", {
        role: "menuitem"
      })));
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('fireOnCloseHandler');
      wrapper.simulate('keydown', {
        key: 'ArrowLeft',
        preventDefault: sandbox.mock(),
        stopPropagation: sandbox.mock()
      });
    });
    test('should not call fireOnCloseHandler() when "ArrowLeft" key is pressed and isSubmenu prop is false', function () {
      var wrapper = mount(React.createElement(Menu, null, React.createElement("li", {
        role: "menuitem"
      })));
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('fireOnCloseHandler').never();
      wrapper.simulate('keydown', {
        key: 'ArrowLeft',
        preventDefault: sandbox.mock().never(),
        stopPropagation: sandbox.mock().never()
      });
    });
    [{
      key: 'Home'
    }, {
      key: 'PageUp'
    }].forEach(function (_ref) {
      var key = _ref.key;
      test('should focusFirstItem() when "home" or "pageup" key is pressed', function () {
        var wrapper = mount(React.createElement(Menu, null, React.createElement("li", {
          role: "menuitem"
        })));
        var instance = wrapper.instance();
        sandbox.mock(instance).expects('focusFirstItem');
        wrapper.simulate('keydown', {
          key: key,
          preventDefault: sandbox.mock(),
          stopPropagation: sandbox.mock()
        });
      });
    });
    [{
      key: 'End'
    }, {
      key: 'PageDown'
    }].forEach(function (_ref2) {
      var key = _ref2.key;
      test('should focusLastItem() when "end" or "pagedown" key is pressed', function () {
        var wrapper = mount(React.createElement(Menu, null, React.createElement("li", {
          role: "menuitem"
        })));
        var instance = wrapper.instance();
        sandbox.mock(instance).expects('focusLastItem');
        wrapper.simulate('keydown', {
          key: key,
          preventDefault: sandbox.mock(),
          stopPropagation: sandbox.mock()
        });
      });
    });
    test('should call fireOnCloseHandler() when "esc" key is pressed', function () {
      var wrapper = mount(React.createElement(Menu, null, React.createElement("li", {
        role: "menuitem"
      })));
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('fireOnCloseHandler');
      wrapper.simulate('keydown', {
        key: 'Escape',
        preventDefault: sandbox.mock(),
        stopPropagation: sandbox.mock()
      });
    });
    test('should call fireOnCloseHandler() but NOT preventDefault() or stopPropagation() when "tab" key is pressed', function () {
      var wrapper = mount(React.createElement(Menu, null, React.createElement("li", {
        role: "menuitem"
      })));
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('fireOnCloseHandler');
      wrapper.simulate('keydown', {
        key: 'Tab',
        preventDefault: sandbox.mock().never(),
        stopPropagation: sandbox.mock().never()
      });
    });
    [{
      key: ' '
    }, {
      key: 'Enter'
    }].forEach(function (_ref3) {
      var key = _ref3.key;
      test('should trigger click event on event target when "space" or "enter" key is pressed', function () {
        var wrapper = mount(React.createElement(Menu, null, React.createElement("li", {
          role: "menuitem"
        })));
        var menuItemEl = wrapper.find('li').getDOMNode();
        sandbox.mock(menuItemEl).expects('click');
        wrapper.simulate('keydown', {
          target: menuItemEl,
          key: key,
          preventDefault: sandbox.mock(),
          stopPropagation: sandbox.mock()
        });
      });
    });
  });
  describe('setFocus()', function () {
    test('should not do anything when there are no valid menu items', function () {
      var wrapper = mount(React.createElement(Menu, null, React.createElement("li", {
        role: "separator"
      })));
      var instance = wrapper.instance();
      expect(instance.menuItemEls.length).toBe(0);
      instance.setFocus(1);
      expect(instance.focusIndex).toEqual(0);
    });
    test('should wrap to beginning when index is greater than number of items', function () {
      var wrapper = mount(React.createElement(Menu, null, React.createElement("li", {
        className: "menu-item",
        role: "menuitem"
      }), React.createElement("li", {
        className: "menu-item",
        role: "menuitem"
      })));
      var instance = wrapper.instance();
      var listItems = wrapper.find('li');
      sandbox.mock(listItems.at(0).getDOMNode()).expects('focus');
      instance.setFocus(2);
      expect(instance.focusIndex).toEqual(0);
    });
    test('should wrap to end when index is less than 0', function () {
      var wrapper = mount(React.createElement(Menu, null, React.createElement("li", {
        className: "menu-item",
        role: "menuitem"
      }), React.createElement("li", {
        className: "menu-item",
        role: "menuitem"
      })));
      var instance = wrapper.instance();
      var listItems = wrapper.find('li');
      sandbox.mock(listItems.at(1).getDOMNode()).expects('focus');
      instance.setFocus(-2);
      expect(instance.focusIndex).toEqual(1);
    });
    test('should move to specific index when index is in bounds', function () {
      var wrapper = mount(React.createElement(Menu, null, React.createElement("li", {
        className: "menu-item",
        role: "menuitem"
      }), React.createElement("li", {
        className: "menu-item",
        role: "menuitem"
      })));
      var instance = wrapper.instance();
      var listItems = wrapper.find('li');
      sandbox.mock(listItems.at(1).getDOMNode()).expects('focus');
      instance.setFocus(1);
      expect(instance.focusIndex).toEqual(1);
    });
  });
  describe('focusFirstItem()', function () {
    test('should call setFocus(0) when called', function () {
      var wrapper = mount(React.createElement(Menu, null, React.createElement("li", {
        role: "menuitem"
      })));
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('setFocus').withArgs(0);
      instance.focusFirstItem();
    });
  });
  describe('focusLastItem()', function () {
    test('should call setFocus(-1) when called', function () {
      var wrapper = mount(React.createElement(Menu, null, React.createElement("li", {
        role: "menuitem"
      }), React.createElement("li", {
        role: "menuitem"
      }), React.createElement("li", {
        role: "menuitem"
      })));
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('setFocus').withArgs(-1);
      instance.focusLastItem();
    });
  });
  describe('focusNextItem()', function () {
    test('should call setFocus(current+1) when called', function () {
      var wrapper = mount(React.createElement(Menu, null, React.createElement("li", {
        role: "menuitem"
      }), React.createElement("li", {
        role: "menuitem"
      }), React.createElement("li", {
        role: "menuitem"
      })));
      var instance = wrapper.instance();
      instance.focusIndex = 1;
      sandbox.mock(instance).expects('setFocus').withArgs(2);
      instance.focusNextItem();
    });
  });
  describe('focusPreviousItem()', function () {
    test('should call setFocus(current-1) when called', function () {
      var wrapper = mount(React.createElement(Menu, null, React.createElement("li", {
        role: "menuitem"
      }), React.createElement("li", {
        role: "menuitem"
      }), React.createElement("li", {
        role: "menuitem"
      })));
      var instance = wrapper.instance();
      instance.focusIndex = 2;
      sandbox.mock(instance).expects('setFocus').withArgs(1);
      instance.focusPreviousItem();
    });
  });
  describe('getMenuItemElFromEventTarget()', function () {
    test('should return valid menu item when target is contained in a menu item', function () {
      var wrapper = mount(React.createElement(Menu, null, React.createElement("li", {
        className: "menu-item",
        role: "menuitem"
      }), React.createElement("li", {
        className: "menu-item",
        role: "menuitem"
      }, React.createElement("span", null, "Awesome")), React.createElement("li", {
        className: "menu-item",
        role: "menuitem"
      })));
      var instance = wrapper.instance();
      var listWrapper = wrapper.find('li');
      var spanWrapper = wrapper.find('span');
      var result = instance.getMenuItemElFromEventTarget(spanWrapper.at(0).getDOMNode());
      var expectedResult = {
        menuItemEl: listWrapper.at(1).getDOMNode(),
        menuIndex: 1
      };
      expect(result.menuItemEl).toEqual(expectedResult.menuItemEl);
      expect(result.menuIndex).toEqual(expectedResult.menuIndex);
    });
    test('should return null when target is not in a valid menu item', function () {
      var wrapper = mount(React.createElement(Menu, null, React.createElement("li", {
        role: "menuitem"
      }), React.createElement("li", {
        role: "menuitem"
      }), React.createElement("li", {
        role: "menuitem"
      }), React.createElement("li", null, React.createElement("span", null, "Awesome"))));
      var instance = wrapper.instance();
      var spanWrapper = wrapper.find('span');
      var result = instance.getMenuItemElFromEventTarget(spanWrapper.at(0).getDOMNode());
      expect(result.menuItemEl).toBeNull();
    });
  });
  describe('fireOnCloseHandler()', function () {
    test('should call onClose() when prop exists', function () {
      var wrapper = mount(React.createElement(Menu, {
        onClose: sandbox.mock()
      }, React.createElement("li", {
        role: "menuitem"
      })));
      var instance = wrapper.instance();
      instance.fireOnCloseHandler();
    });
  });
});