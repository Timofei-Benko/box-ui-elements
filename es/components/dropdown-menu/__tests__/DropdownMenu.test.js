function _templateObject() {
  var data = _taggedTemplateLiteral(["\n                elementID         | description\n                ", " | ", "\n                ", "       | ", "\n            "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import DropdownMenu from '../DropdownMenu';
import { KEYS } from '../../../constants';
var sandbox = sinon.sandbox.create();
describe('components/dropdown-menu/DropdownMenu', function () {
  // eslint-disable-next-line react/button-has-type
  var FakeButton = function FakeButton(props) {
    return React.createElement("button", props, "Some Button");
  };

  FakeButton.displayName = 'FakeButton';
  /* eslint-disable */

  var FakeMenu = function FakeMenu(_ref) {
    var _ref$initialFocusInde = _ref.initialFocusIndex,
        initialFocusIndex = _ref$initialFocusInde === void 0 ? 0 : _ref$initialFocusInde,
        _ref$onClose = _ref.onClose,
        onClose = _ref$onClose === void 0 ? function () {} : _ref$onClose,
        rest = _objectWithoutProperties(_ref, ["initialFocusIndex", "onClose"]);

    return React.createElement("ul", _extends({}, rest, {
      role: "menu"
    }), "Some Menu");
  };

  FakeMenu.displayName = 'FakeMenu';
  /* eslint-enable */

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(DropdownMenu, props, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
  };

  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  describe('render()', function () {
    test('should throw an error when passed less than 2 children', function () {
      expect(function () {
        shallow(React.createElement(DropdownMenu, null, React.createElement(FakeButton, null)));
      }).toThrow();
    });
    test('should throw an error when passed more than 2 children', function () {
      expect(function () {
        shallow(React.createElement(DropdownMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null), React.createElement("div", null)));
      }).toThrow();
    });
    test('should correctly render a single child button with correct props', function () {
      var wrapper = shallow(React.createElement(DropdownMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      var instance = wrapper.instance();
      var button = wrapper.find(FakeButton);
      expect(button.length).toBe(1);
      expect(button.prop('id')).toEqual(instance.menuButtonID);
      expect(button.key()).toEqual(instance.menuButtonID);
      expect(button.prop('aria-haspopup')).toEqual('true');
      expect(button.prop('aria-expanded')).toEqual('false');
      expect(button.prop('aria-controls')).toBeFalsy();
    });
    test('should set aria-expanded="true" and aria-controls=menuID when menu is open', function () {
      var wrapper = shallow(React.createElement(DropdownMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      var instance = wrapper.instance();
      instance.openMenuAndSetFocusIndex(0);
      wrapper.update();
      var button = wrapper.find(FakeButton);
      expect(button.prop('aria-expanded')).toEqual('true');
      expect(button.prop('aria-controls')).toEqual(instance.menuID);
    });
    test('should not render child menu when menu is closed', function () {
      var wrapper = shallow(React.createElement(DropdownMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      var menu = wrapper.find(FakeMenu);
      expect(menu.length).toBe(0);
    });
    test('should correctly render a single child menu with correct props when menu is open', function () {
      var wrapper = shallow(React.createElement(DropdownMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      var instance = wrapper.instance();
      instance.openMenuAndSetFocusIndex(1);
      wrapper.update();
      var menu = wrapper.find(FakeMenu);
      expect(menu.length).toBe(1);
      expect(menu.prop('id')).toEqual(instance.menuID);
      expect(menu.key()).toEqual(instance.menuID);
      expect(menu.prop('initialFocusIndex')).toEqual(1);
      expect(menu.prop('aria-labelledby')).toEqual(instance.menuButtonID);
    });
    test('should render TetherComponent with correct props with correct default values', function () {
      var wrapper = shallow(React.createElement(DropdownMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      expect(wrapper.is('TetherComponent')).toBe(true);
      expect(wrapper.prop('attachment')).toEqual('top left');
      expect(wrapper.prop('bodyElement')).toEqual(document.body);
      expect(wrapper.prop('classPrefix')).toEqual('dropdown-menu');
      expect(wrapper.prop('targetAttachment')).toEqual('bottom left');
      expect(wrapper.prop('constraints')).toEqual([]);
      expect(wrapper.prop('enabled')).toBe(false);
    });
    test('should render TetherComponent in the body if invalid body element is specified', function () {
      var wrapper = shallow(React.createElement(DropdownMenu, {
        bodyElement: "foo"
      }, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      expect(wrapper.is('TetherComponent')).toBe(true);
      expect(wrapper.prop('attachment')).toEqual('top left');
      expect(wrapper.prop('bodyElement')).toEqual(document.body);
      expect(wrapper.prop('classPrefix')).toEqual('dropdown-menu');
      expect(wrapper.prop('targetAttachment')).toEqual('bottom left');
      expect(wrapper.prop('constraints')).toEqual([]);
      expect(wrapper.prop('enabled')).toBe(false);
    });
    test('should render className in the className is specified', function () {
      var wrapper = shallow(React.createElement(DropdownMenu, {
        className: "foo"
      }, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      expect(wrapper.is('TetherComponent')).toBe(true);
      expect(wrapper.prop('className')).toEqual('foo');
    });
    test('should render TetherComponent with a specific body element', function () {
      var bodyEl = document.createElement('div');
      var wrapper = shallow(React.createElement(DropdownMenu, {
        bodyElement: bodyEl
      }, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      expect(wrapper.is('TetherComponent')).toBe(true);
      expect(wrapper.prop('attachment')).toEqual('top left');
      expect(wrapper.prop('bodyElement')).toEqual(bodyEl);
      expect(wrapper.prop('classPrefix')).toEqual('dropdown-menu');
      expect(wrapper.prop('targetAttachment')).toEqual('bottom left');
      expect(wrapper.prop('constraints')).toEqual([]);
      expect(wrapper.prop('enabled')).toBe(false);
    });
    test('should render TetherComponent with correct props when right aligned', function () {
      var wrapper = shallow(React.createElement(DropdownMenu, {
        isRightAligned: true
      }, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      expect(wrapper.prop('attachment')).toEqual('top right');
      expect(wrapper.prop('targetAttachment')).toEqual('bottom right');
      expect(wrapper.prop('enabled')).toBe(false);
    });
    test('should render TetherComponent with enabled prop when menu is open', function () {
      var wrapper = shallow(React.createElement(DropdownMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      var instance = wrapper.instance();
      instance.openMenuAndSetFocusIndex(0);
      wrapper.update();
      expect(wrapper.prop('enabled')).toBe(true);
    });
    test('should render TetherComponent with scrollParent constraint when constrainToScrollParent=true', function () {
      var wrapper = shallow(React.createElement(DropdownMenu, {
        constrainToScrollParent: true
      }, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      expect(wrapper.prop('constraints')).toEqual([{
        to: 'scrollParent',
        attachment: 'together'
      }]);
    });
    test('should render TetherComponent with window constraint when constrainToScrollParent=true', function () {
      var wrapper = shallow(React.createElement(DropdownMenu, {
        constrainToWindow: true
      }, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      expect(wrapper.prop('constraints')).toEqual([{
        to: 'window',
        attachment: 'together'
      }]);
    });
    test('should render TetherComponent with scrollParent and window constraints when constrainToScrollParent=true and constrainToWindow=true', function () {
      var wrapper = shallow(React.createElement(DropdownMenu, {
        constrainToScrollParent: true,
        constrainToWindow: true
      }, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      expect(wrapper.prop('constraints')).toEqual([{
        to: 'scrollParent',
        attachment: 'together'
      }, {
        to: 'window',
        attachment: 'together'
      }]);
    });
  });
  describe('openMenuAndSetFocusIndex()', function () {
    test('should call setState() with correct values', function () {
      var wrapper = shallow(React.createElement(DropdownMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('setState').withArgs({
        isOpen: true,
        initialFocusIndex: 1
      });
      instance.openMenuAndSetFocusIndex(1);
    });
  });
  describe('closeMenu()', function () {
    test('should call setState() with correct values', function () {
      var wrapper = shallow(React.createElement(DropdownMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('setState').withArgs({
        isOpen: false
      });
      instance.closeMenu();
    });
  });
  describe('handleButtonClick()', function () {
    test('should call openMenuAndSetFocusIndex(null) when menu is currently closed', function () {
      var wrapper = shallow(React.createElement(DropdownMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('openMenuAndSetFocusIndex').withArgs(null);
      wrapper.find(FakeButton).simulate('click', {
        preventDefault: sandbox.mock(),
        stopPropagation: sandbox.mock()
      });
    });
    test('should call closeMenu() when menu is currently open', function () {
      var event = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn()
      };
      var onMenuClose = jest.fn();
      var wrapper = shallow(React.createElement(DropdownMenu, {
        onMenuClose: onMenuClose
      }, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      var instance = wrapper.instance();
      instance.openMenuAndSetFocusIndex(1);
      wrapper.find(FakeButton).simulate('click', event);
      expect(event.stopPropagation).toBeCalled();
      expect(event.preventDefault).toBeCalled();
      expect(onMenuClose).toBeCalledWith(event);
    });
  });
  describe('handleButtonKeyDown()', function () {
    [{
      key: KEYS.space
    }, {
      key: KEYS.enter
    }, {
      key: KEYS.arrowDown
    }].forEach(function (_ref2) {
      var key = _ref2.key;
      test('should call openMenuAndSetFocus(0) when an open keystroke is pressed', function () {
        var wrapper = shallow(React.createElement(DropdownMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
        var instance = wrapper.instance();
        sandbox.mock(instance).expects('openMenuAndSetFocusIndex').withArgs(0);
        wrapper.find(FakeButton).simulate('keydown', {
          key: key,
          preventDefault: sandbox.mock(),
          stopPropagation: sandbox.mock()
        });
      });
    });
    test('shoud not stop esc propagation if dropdown is closed', function () {
      var onMenuClose = jest.fn();
      var wrapper = getWrapper({
        onMenuClose: onMenuClose
      });
      wrapper.setState({
        isOpen: false
      });
      wrapper.find(FakeButton).simulate('keydown', {
        key: KEYS.escape,
        preventDefault: sandbox.mock(),
        stopPropagation: sandbox.mock().never()
      });
      expect(onMenuClose).toBeCalled();
    });
    test('should stop esc propagation if dropdown is open', function () {
      var onMenuClose = jest.fn();
      var wrapper = getWrapper({
        onMenuClose: onMenuClose
      });
      wrapper.setState({
        isOpen: true
      });
      wrapper.find(FakeButton).simulate('keydown', {
        key: KEYS.escape,
        preventDefault: sandbox.mock(),
        stopPropagation: sandbox.mock()
      });
      expect(onMenuClose).toBeCalled();
    });
    test('should call openMenuAndSetFocus(-1) to last item when "up" is pressed', function () {
      var wrapper = shallow(React.createElement(DropdownMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('openMenuAndSetFocusIndex').withArgs(-1);
      wrapper.find(FakeButton).simulate('keydown', {
        key: 'ArrowUp',
        preventDefault: sandbox.mock(),
        stopPropagation: sandbox.mock()
      });
    });
  });
  describe('handleMenuClose()', function () {
    test('should call closeMenu() and focusButton() when called', function () {
      var wrapper = shallow(React.createElement(DropdownMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('closeMenu');
      sandbox.mock(instance).expects('focusButton');
      instance.handleMenuClose();
    });
  });
  describe('componentDidUpdate()', function () {
    describe.each([[false], [true]])('when useBubble=%o', function (useBubble) {
      test('should add click and contextmenu listeners when opening menu', function () {
        var wrapper = mount(React.createElement(DropdownMenu, {
          useBubble: useBubble
        }, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
        var instance = wrapper.instance();
        var documentMock = sandbox.mock(document);
        documentMock.expects('addEventListener').withArgs('click', sinon.match.any, !useBubble);
        documentMock.expects('addEventListener').withArgs('contextmenu', sinon.match.any, !useBubble);
        documentMock.expects('removeEventListener').never();
        instance.openMenuAndSetFocusIndex(0);
      });
      test('should remove click and contextmenu listeners when closing menu', function () {
        var wrapper = mount(React.createElement(DropdownMenu, {
          useBubble: useBubble
        }, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
        var instance = wrapper.instance();
        instance.openMenuAndSetFocusIndex(0);
        var documentMock = sandbox.mock(document);
        documentMock.expects('removeEventListener').withArgs('contextmenu', sinon.match.any, !useBubble);
        documentMock.expects('removeEventListener').withArgs('click', sinon.match.any, !useBubble);
        documentMock.expects('addEventListener').never();
        instance.closeMenu();
      });
      test('should not do anything opening a menu when menu is already open', function () {
        var wrapper = mount(React.createElement(DropdownMenu, {
          useBubble: useBubble
        }, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
        var instance = wrapper.instance();
        var documentMock = sandbox.mock(document);
        instance.openMenuAndSetFocusIndex(0);
        documentMock.expects('addEventListener').never();
        documentMock.expects('removeEventListener').never();
        instance.openMenuAndSetFocusIndex(1);
      });
    });
  });
  describe('componentWillUnmount()', function () {
    describe.each([[false], [true]])('when useBubble=%o', function (useBubble) {
      test('should not do anything when menu is closed', function () {
        var wrapper = mount(React.createElement(DropdownMenu, {
          useBubble: useBubble
        }, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
        var documentMock = sandbox.mock(document);
        documentMock.expects('removeEventListener').never();
        wrapper.unmount();
      });
      test('should remove listeners when menu is open', function () {
        var wrapper = mount(React.createElement(DropdownMenu, {
          useBubble: useBubble
        }, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
        var documentMock = sandbox.mock(document);
        var instance = wrapper.instance();
        instance.openMenuAndSetFocusIndex(0);
        documentMock.expects('removeEventListener').withArgs('contextmenu', sinon.match.any, !useBubble);
        documentMock.expects('removeEventListener').withArgs('click', sinon.match.any, !useBubble);
        wrapper.unmount();
      });
    });
  });
  describe('tests requiring body mounting', function () {
    var attachTo;
    var wrapper = null;
    /**
     * Helper method to mount things to the correct DOM element
     * this makes it easier to clean up after ourselves after each test.
     */

    var mountToBody = function mountToBody(component) {
      wrapper = mount(component, {
        attachTo: attachTo
      });
    };

    beforeEach(function () {
      // Set up a place to mount
      attachTo = document.createElement('div');
      attachTo.setAttribute('data-mounting-point', '');
      document.body.appendChild(attachTo);
    });
    afterEach(function () {
      sandbox.verifyAndRestore(); // Unmount and remove the mounting point after each test

      if (wrapper) {
        wrapper.unmount();
        wrapper = null;
      }

      document.body.removeChild(attachTo);
    });
    describe('handleDocumentClick()', function () {
      var closeMenuSpy = jest.fn();
      test('should call closeMenu() when event target is not within the menu or button', function () {
        mountToBody(React.createElement(DropdownMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
        var instance = wrapper.instance();
        instance.openMenuAndSetFocusIndex(0);
        instance.closeMenu = closeMenuSpy;
        var handleDocumentClickEvent = {
          target: document.createElement('div')
        };
        instance.handleDocumentClick(handleDocumentClickEvent);
        expect(closeMenuSpy).toHaveBeenCalled();
      });
      test('should call onMenuClose() when provided', function () {
        var onMenuCloseSpy = jest.fn();
        mountToBody(React.createElement(DropdownMenu, {
          onMenuClose: onMenuCloseSpy
        }, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
        var instance = wrapper.instance();
        instance.openMenuAndSetFocusIndex(0);
        var handleDocumentClickEvent = {
          target: document.createElement('div')
        };
        instance.handleDocumentClick(handleDocumentClickEvent);
        expect(onMenuCloseSpy).toHaveBeenCalledWith(handleDocumentClickEvent);
      });
      test.each(_templateObject(), 'menuButtonID', 'button', 'menuID', 'menu')('should not call handleMenuClose() when event target is within the $description', function (_ref3) {
        var elementID = _ref3.elementID;
        mountToBody(React.createElement(DropdownMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
        var instance = wrapper.instance();
        instance.openMenuAndSetFocusIndex(0);
        instance.closeMenu = closeMenuSpy;
        var handleDocumentClickEvent = {
          target: document.getElementById(instance[elementID])
        };
        instance.handleDocumentClick(handleDocumentClickEvent);
        expect(closeMenuSpy).not.toHaveBeenCalled();
      });
    });
    describe('focusButton()', function () {
      test('should focus the menu button when called', function () {
        mountToBody(React.createElement(DropdownMenu, null, React.createElement(FakeButton, null), React.createElement(FakeMenu, null)));
        var instance = wrapper.instance();
        var menuButtonEl = document.getElementById(instance.menuButtonID);
        sandbox.mock(menuButtonEl).expects('focus');
        instance.focusButton();
      });
    });
  });
});