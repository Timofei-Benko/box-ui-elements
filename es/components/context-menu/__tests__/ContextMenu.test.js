function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import ContextMenu from '../ContextMenu';
import Button, { ButtonType } from '../../button/Button';
import Menu from '../../menu/Menu';
var sandbox = sinon.sandbox.create();
describe('components/context-menu/ContextMenu', function () {
  var FakeButton = function FakeButton(props) {
    return React.createElement(Button, _extends({
      className: "bdl-FakeButton",
      isLoading: false,
      showRadar: false,
      type: ButtonType.BUTTON
    }, props), "Some Button");
  };

  FakeButton.displayName = 'FakeButton';

  var FakeMenu = function FakeMenu(props) {
    return React.createElement(Menu, props, React.createElement("ul", {
      role: "menu"
    }, "Some Menu"));
  };

  FakeMenu.displayName = 'FakeMenu';
  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  describe('render()', function () {
    test('should throw an error when passed less than 2 children', function () {
      expect(function () {
        shallow(React.createElement(ContextMenu, null, React.createElement(FakeButton, null)));
      }).toThrow();
    });
    test('should throw an error when passed more than 2 children', function () {
      expect(function () {
        shallow(React.createElement(ContextMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null), React.createElement("div", null)));
      }).toThrow();
    });
    test('should correctly render a single child button with correct props', function () {
      var wrapper = shallow(React.createElement(ContextMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      var instance = wrapper.instance();
      var button = wrapper.find(FakeButton);
      expect(button.length).toBe(1);
      expect(button.prop('id')).toEqual(instance.menuTargetID);
      expect(button.key()).toEqual(instance.menuTargetID);
    });
    test('should not render child menu when menu is closed', function () {
      var wrapper = shallow(React.createElement(ContextMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      var menu = wrapper.find(FakeMenu);
      expect(menu.length).toBe(0);
    });
    test('should correctly render a single child menu with correct props when menu is open', function () {
      var wrapper = shallow(React.createElement(ContextMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      wrapper.setState({
        isOpen: true
      });
      var instance = wrapper.instance();
      var menu = wrapper.find(FakeMenu);
      expect(menu.length).toBe(1);
      expect(menu.prop('id')).toEqual(instance.menuID);
      expect(menu.key()).toEqual(instance.menuID);
      expect(menu.prop('initialFocusIndex')).toEqual(null);
    });
    test('should render TetherComponent with correct props with correct default values', function () {
      var wrapper = shallow(React.createElement(ContextMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      expect(wrapper.is('TetherComponent')).toBe(true);
      expect(wrapper.prop('attachment')).toEqual('top left');
      expect(wrapper.prop('targetAttachment')).toEqual('top left');
      expect(wrapper.prop('constraints')).toEqual([]);
    });
    test('should render TetherComponent with constraints when specified', function () {
      var constraints = [{
        to: 'window',
        attachment: 'together'
      }];
      var wrapper = shallow(React.createElement(ContextMenu, {
        constraints: constraints
      }, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      expect(wrapper.prop('constraints')).toEqual(constraints);
    });
    test('should render TetherComponent with correct target offset when set', function () {
      var targetOffset = '10px 20px';
      var wrapper = shallow(React.createElement(ContextMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      wrapper.setState({
        targetOffset: targetOffset
      });
      expect(wrapper.prop('targetOffset')).toEqual(targetOffset);
    });
  });
  describe('closeMenu()', function () {
    test('should call setState() with correct values', function () {
      var wrapper = shallow(React.createElement(ContextMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('setState').withArgs({
        isOpen: false
      });
      instance.closeMenu();
    });
    test('should call onMenuClose() if onMenuClose prop is set', function () {
      var onMenuCloseSpy = jest.fn();
      var wrapper = shallow(React.createElement(ContextMenu, {
        onMenuClose: onMenuCloseSpy
      }, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      wrapper.instance().closeMenu();
      expect(onMenuCloseSpy).toBeCalled();
    });
  });
  describe('handleMenuClose()', function () {
    test('should call closeMenu() and focusTarget() when called', function () {
      var onMenuCloseSpy = jest.fn();
      var onFocusTargetSpy = jest.fn();
      var wrapper = shallow(React.createElement(ContextMenu, {
        onMenuClose: onMenuCloseSpy
      }, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      wrapper.setState({
        isOpen: true
      });
      var instance = wrapper.instance();
      instance.focusTarget = onFocusTargetSpy;
      instance.handleMenuClose();
      expect(onMenuCloseSpy).toHaveBeenCalled();
      expect(onFocusTargetSpy).toHaveBeenCalled();
    });
  });
  describe('componentDidUpdate()', function () {
    test('should add click and contextmenu listeners when opening menu', function () {
      var wrapper = mount(React.createElement(ContextMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      document.addEventListener = jest.fn();
      wrapper.setState({
        isOpen: true
      });
      expect(document.addEventListener).toHaveBeenCalledWith('click', expect.anything(), expect.anything());
      expect(document.addEventListener).toHaveBeenCalledWith('contextmenu', expect.anything(), expect.anything());
    });
    test('should remove click and contextmenu listeners when closing menu', function () {
      var wrapper = mount(React.createElement(ContextMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      wrapper.setState({
        isOpen: true
      });
      var instance = wrapper.instance();
      document.removeEventListener = jest.fn();
      instance.closeMenu();
      expect(document.removeEventListener).toHaveBeenCalledWith('contextmenu', expect.anything(), expect.anything());
      expect(document.removeEventListener).toHaveBeenCalledWith('click', expect.anything(), expect.anything());
    });
    test('should not do anything opening a menu when menu is already open', function () {
      var wrapper = mount(React.createElement(ContextMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      wrapper.setState({
        isOpen: true
      });
      var instance = wrapper.instance();
      document.addEventListener = jest.fn();
      document.removeEventListener = jest.fn();
      instance.setState({
        isOpen: true
      });
      expect(document.addEventListener).not.toHaveBeenCalledWith('click', expect.anything(), expect.anything());
      expect(document.addEventListener).not.toHaveBeenCalledWith('contextmenu', expect.anything(), expect.anything());
      expect(document.removeEventListener).not.toHaveBeenCalledWith('contextmenu', expect.anything(), expect.anything());
      expect(document.removeEventListener).not.toHaveBeenCalledWith('click', expect.anything(), expect.anything());
    });
    test('should close menu when context menu becomes disabled and the menu is currently open', function () {
      var wrapper = shallow(React.createElement(ContextMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      wrapper.setState({
        isOpen: true
      });
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('handleMenuClose');
      instance.componentDidUpdate({
        isDisabled: true
      }, {
        isOpen: true
      });
    });
  });
  describe('componentWillUnmount()', function () {
    test('should not do anything when menu is closed', function () {
      var wrapper = mount(React.createElement(ContextMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      var documentMock = sandbox.mock(document);
      documentMock.expects('removeEventListener').withArgs('contextmenu').never();
      documentMock.expects('removeEventListener').withArgs('click').never();
      wrapper.unmount();
    });
    test('should remove listeners when menu is open', function () {
      var wrapper = mount(React.createElement(ContextMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      wrapper.setState({
        isOpen: true
      });
      var documentMock = sandbox.mock(document);
      documentMock.expects('removeEventListener').withArgs('contextmenu');
      documentMock.expects('removeEventListener').withArgs('click');
      wrapper.unmount();
    });
  });
  describe('tests requiring body mounting', function () {
    var attachTo;
    var wrapper = null;
    /**
     * Helper method to mount things to the correct DOM element
     * This makes it easier to clean up after ourselves after each test
     */

    var mountToBody = function mountToBody(component) {
      return mount(component, {
        attachTo: attachTo
      });
    };

    var preventDefaultSpy = jest.fn();
    beforeEach(function () {
      // Set up a place to mount
      attachTo = document.createElement('div');
      attachTo.setAttribute('data-mounting-point', '');
      document.body.appendChild(attachTo);
    });
    afterEach(function () {
      // Unmount and remove the mounting point after each test
      if (wrapper) {
        wrapper.unmount();
        wrapper = null;
      }

      document.body.removeChild(attachTo);
    });
    describe('handleContextMenu()', function () {
      test('should be no-op when props.isDisabled is true', function () {
        wrapper = mountToBody(React.createElement(ContextMenu, {
          isDisabled: true
        }, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
        wrapper.find(FakeButton).simulate('contextmenu', {
          preventDefault: preventDefaultSpy
        });
        expect(wrapper.state('isOpen')).toBe(false);
        expect(preventDefaultSpy).not.toHaveBeenCalled();
      });
      test('should call setState() with correct values', function () {
        wrapper = mountToBody(React.createElement(ContextMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
        var instance = wrapper.instance();
        var menuTargetEl = document.getElementById(instance.menuTargetID);
        menuTargetEl.getBoundingClientRect = jest.fn(function () {
          return {
            left: 5,
            top: 10
          };
        });
        wrapper.find(FakeButton).simulate('contextmenu', {
          clientX: 10,
          clientY: 20,
          preventDefault: preventDefaultSpy
        });
        expect(wrapper.state('isOpen')).toBe(true);
        expect(wrapper.state('targetOffset')).toEqual('10px 5px');
      });
      test('should call onMenuOpen handler when given', function () {
        var onMenuOpenSpy = jest.fn();
        wrapper = mountToBody(React.createElement(ContextMenu, {
          onMenuOpen: onMenuOpenSpy
        }, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
        wrapper.find(FakeButton).simulate('contextmenu', {
          preventDefault: function preventDefault() {
            return null;
          }
        });
        expect(onMenuOpenSpy).toBeCalled();
      });
    });
    describe('handleDocumentClick()', function () {
      test('should call closeMenu() when event target is not within the menu', function () {
        var closeMenuSpy = jest.fn();
        wrapper = mountToBody(React.createElement(ContextMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
        var instance = wrapper.instance();
        instance.closeMenu = closeMenuSpy;
        var handleContextMenuEvent = {
          clientX: 10,
          clientY: 15,
          preventDefault: preventDefaultSpy
        };
        instance.handleContextMenu(handleContextMenuEvent);
        var documentClickEvent = {
          target: document.createElement('div')
        };
        instance.handleDocumentClick(documentClickEvent);
        expect(closeMenuSpy).toHaveBeenCalled();
      });
      test('should not call closeMenu() when event target is within the menu', function () {
        var closeMenuSpy = jest.fn();
        wrapper = mountToBody(React.createElement(ContextMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
        var instance = wrapper.instance();
        instance.closeMenu = closeMenuSpy;
        var handleContextMenuEvent = {
          clientX: 10,
          clientY: 15,
          preventDefault: preventDefaultSpy
        };
        instance.handleContextMenu(handleContextMenuEvent);
        var documentClickEvent = {
          target: document.getElementById(instance.menuID)
        };
        instance.handleDocumentClick(documentClickEvent);
        expect(closeMenuSpy).not.toHaveBeenCalled();
      });
    });
    describe('focusTarget()', function () {
      test('should focus the menu target when called', function () {
        var onFocusTargetSpy = jest.fn();
        wrapper = mountToBody(React.createElement(ContextMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
        var instance = wrapper.instance();
        var menuTargetEl = document.getElementById(instance.menuTargetID);
        menuTargetEl.focus = onFocusTargetSpy;
        instance.focusTarget();
        expect(onFocusTargetSpy).toHaveBeenCalled();
      });
    });
  });
});