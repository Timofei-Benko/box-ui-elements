function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Flyout from '../Flyout';
var sandbox = sinon.sandbox.create();
var BOTTOM_CENTER = 'bottom-center';
var BOTTOM_LEFT = 'bottom-left';
var BOTTOM_RIGHT = 'bottom-right';
var MIDDLE_LEFT = 'middle-left';
var MIDDLE_RIGHT = 'middle-right';
var TOP_CENTER = 'top-center';
var TOP_LEFT = 'top-left';
var TOP_RIGHT = 'top-right';
describe('components/flyout/Flyout', function () {
  var FakeButton = function FakeButton(props) {
    return (// eslint-disable-next-line react/button-has-type
      React.createElement("button", _extends({
        className: "fake-button"
      }, props), "Some Button")
    );
  };

  FakeButton.displayName = 'FakeButton';
  /* eslint-disable */

  var FakeOverlay = function FakeOverlay(_ref) {
    var _ref$onClick = _ref.onClick,
        onClick = _ref$onClick === void 0 ? function () {} : _ref$onClick,
        _ref$onClose = _ref.onClose,
        onClose = _ref$onClose === void 0 ? function () {} : _ref$onClose,
        _ref$shouldDefaultFoc = _ref.shouldDefaultFocus,
        shouldDefaultFocus = _ref$shouldDefaultFoc === void 0 ? false : _ref$shouldDefaultFoc,
        rest = _objectWithoutProperties(_ref, ["onClick", "onClose", "shouldDefaultFocus"]);

    return React.createElement("div", _extends({}, rest, {
      className: "overlay-wrapper is-visible"
    }), React.createElement("div", {
      className: "overlay"
    }, React.createElement("input", {
      type: "text"
    }), React.createElement("span", {
      id: "span"
    }), React.createElement("button", {
      id: "button"
    })));
  };

  FakeOverlay.displayName = 'FakeOverlay';
  /* eslint-enable */

  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  describe('render()', function () {
    test('should throw an error when passed less than 2 children', function () {
      expect(function () {
        shallow(React.createElement(Flyout, null, React.createElement(FakeButton, null)));
      }).toThrow();
    });
    test('should throw an error when passed more than 2 children', function () {
      expect(function () {
        shallow(React.createElement(Flyout, null, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null), React.createElement("div", null)));
      }).toThrow();
    });
    test('should correctly render a single child button with correct props', function () {
      var wrapper = shallow(React.createElement(Flyout, null, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null)));
      var instance = wrapper.instance();
      var button = wrapper.find(FakeButton);
      expect(button.length).toBe(1);
      expect(button.prop('id')).toEqual(instance.overlayButtonID);
      expect(button.key()).toEqual(instance.overlayButtonID);
      expect(button.prop('aria-haspopup')).toEqual('true');
      expect(button.prop('aria-expanded')).toEqual('false');
      expect(button.prop('aria-controls')).toBeFalsy();
    });
    test('should set aria-expanded="true" and aria-controls=overlayID when overlay is visible', function () {
      var wrapper = shallow(React.createElement(Flyout, null, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null)));
      wrapper.setState({
        isVisible: true
      });
      var button = wrapper.find(FakeButton);
      expect(button.prop('aria-expanded')).toEqual('true');
      expect(button.prop('aria-controls')).toEqual(wrapper.instance().overlayID);
    });
    test('should not render child overlay when overlay is closed', function () {
      var wrapper = shallow(React.createElement(Flyout, null, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null)));
      var overlay = wrapper.find(FakeOverlay);
      expect(overlay.length).toBe(0);
    });
    test('should correctly render a single child overlay with correct props when overlay is open', function () {
      var wrapper = shallow(React.createElement(Flyout, null, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null)));
      var instance = wrapper.instance();
      wrapper.setState({
        isVisible: true
      });
      var overlay = wrapper.find(FakeOverlay);
      expect(overlay.length).toBe(1);
      expect(overlay.prop('id')).toEqual(instance.overlayID);
      expect(overlay.key()).toEqual(instance.overlayID);
      expect(overlay.prop('role')).toEqual('dialog');
      expect(overlay.prop('onClick')).toEqual(instance.handleOverlayClick);
      expect(overlay.prop('onClose')).toEqual(instance.handleOverlayClose);
      expect(overlay.prop('aria-labelledby')).toEqual(instance.overlayButtonID);
    });
    test('should render TetherComponent with correct props with correct default values', function () {
      var wrapper = shallow(React.createElement(Flyout, null, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null)));
      expect(wrapper.is('TetherComponent')).toBe(true);
      expect(wrapper.prop('attachment')).toEqual('top left');
      expect(wrapper.prop('targetAttachment')).toEqual('bottom left');
      expect(wrapper.prop('classPrefix')).toEqual('flyout-overlay');
      expect(wrapper.prop('enabled')).toBe(false);
    });
    test('should render TetherComponent with correct enable prop when overlay is visible', function () {
      var wrapper = shallow(React.createElement(Flyout, null, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null)));
      wrapper.setState({
        isVisible: true
      });
      expect(wrapper.prop('enabled')).toBe(true);
    });
    test('should render TetherComponent with offset when offset is passed in as a prop', function () {
      var offset = 'wooot';
      var wrapper = shallow(React.createElement(Flyout, {
        offset: offset
      }, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null)));
      expect(wrapper.prop('offset')).toEqual(offset);
    });
    test('should render TetherComponent with passed in className', function () {
      var className = 'the-class-name';
      var wrapper = shallow(React.createElement(Flyout, {
        className: className
      }, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null)));
      expect(wrapper.prop('classes')).toEqual({
        element: "flyout-overlay ".concat(className)
      });
    });
    test('should render TetherComponent without scrollParent constraint when constrainToScrollParent=false', function () {
      var wrapper = shallow(React.createElement(Flyout, {
        constrainToScrollParent: false
      }, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null)));
      expect(wrapper.prop('constraints')).toEqual([]);
    });
    test('should render TetherComponent with window constraint when constrainToScrollParent=true', function () {
      var wrapper = shallow(React.createElement(Flyout, {
        constrainToWindow: true
      }, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null)));
      expect(wrapper.prop('constraints')).toEqual([{
        to: 'scrollParent',
        attachment: 'together'
      }, {
        to: 'window',
        attachment: 'together'
      }]);
    });
    [{
      position: BOTTOM_CENTER,
      offset: '-10px 0'
    }, {
      position: BOTTOM_LEFT,
      offset: '-10px 0'
    }, {
      position: BOTTOM_RIGHT,
      offset: '-10px 0'
    }, {
      position: TOP_CENTER,
      offset: '10px 0'
    }, {
      position: TOP_LEFT,
      offset: '10px 0'
    }, {
      position: TOP_RIGHT,
      offset: '10px 0'
    }, {
      position: MIDDLE_LEFT,
      offset: '0 10px'
    }, {
      position: MIDDLE_RIGHT,
      offset: '0 -10px'
    }].forEach(function (_ref2) {
      var position = _ref2.position,
          offset = _ref2.offset;
      test('should set tether offset correctly when offset props is not passed in', function () {
        var wrapper = shallow(React.createElement(Flyout, {
          position: position
        }, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null)));
        expect(wrapper.prop('offset')).toEqual(offset);
      });
    });
  });
  describe('handleOverlayClick()', function () {
    [{
      closeOnClick: true,
      hasClickableAncestor: true,
      shouldCloseOverlay: true
    }, {
      closeOnClick: true,
      hasClickableAncestor: false,
      shouldCloseOverlay: false
    }, {
      closeOnClick: false,
      hasClickableAncestor: true,
      shouldCloseOverlay: false
    }, {
      closeOnClick: false,
      hasClickableAncestor: false,
      shouldCloseOverlay: false
    }].forEach(function (_ref3) {
      var closeOnClick = _ref3.closeOnClick,
          hasClickableAncestor = _ref3.hasClickableAncestor,
          shouldCloseOverlay = _ref3.shouldCloseOverlay;
      test('should handle clicks within overlay properly', function () {
        var wrapper = mount(React.createElement(Flyout, {
          closeOnClick: closeOnClick
        }, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null)));
        var instance = wrapper.instance();
        instance.setState({
          isVisible: true
        });
        var event = {};

        if (hasClickableAncestor) {
          event.target = document.getElementById('button');
        } else {
          event.target = document.getElementById('span');
        }

        if (shouldCloseOverlay) {
          sandbox.mock(instance).expects('handleOverlayClose');
        } else {
          sandbox.mock(instance).expects('handleOverlayClose').never();
        }

        instance.handleOverlayClick(event);
      });
    });
  });
  describe('handleButtonClick()', function () {
    var instance;
    var wrapper = null;
    beforeEach(function () {
      wrapper = mount(React.createElement(Flyout, null, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null)));
      instance = wrapper.instance();
    });
    afterEach(function () {
      if (wrapper) {
        wrapper.unmount();
        wrapper = null;
      }
    });
    [{
      currentIsVisible: true,
      isVisibleAfterToggle: false
    }, {
      currentIsVisible: false,
      isVisibleAfterToggle: true
    }].forEach(function (_ref4) {
      var currentIsVisible = _ref4.currentIsVisible,
          isVisibleAfterToggle = _ref4.isVisibleAfterToggle;
      test('should toggle isVisible state when called', function () {
        var event = {
          preventDefault: sandbox.stub()
        };
        instance.setState({
          isVisible: currentIsVisible
        });
        instance.handleButtonClick(event);
        expect(instance.state.isVisible).toEqual(isVisibleAfterToggle);
      });
    });
    test('should prevent default when called', function () {
      var event = {
        preventDefault: sandbox.mock()
      };
      instance.handleButtonClick(event);
    });
  });
  describe('handleButtonHover()', function () {
    test('should call openOverlay() when props.openOnHover is true', function () {
      var event = {};
      var wrapper = mount(React.createElement(Flyout, {
        openOnHover: true
      }, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null)));
      var instance = wrapper.instance();
      setTimeout(function () {
        sandbox.mock(instance).expects('openOverlay');
      }, 310); // default timeout is 300ms

      instance.handleButtonHover(event);
    });
    test('should not call openOverlay() when props.openOnHover is false', function () {
      var event = {};
      var wrapper = mount(React.createElement(Flyout, {
        openOnHover: false
      }, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null)));
      var instance = wrapper.instance();
      setTimeout(function () {
        sandbox.mock(instance).expects('openOverlay').never();
      }, 310); // default timeout is 300ms

      instance.handleButtonHover(event);
    });
    test('should be able to set custom timeouts for the openOnHover', function () {
      var timeout = 100;
      var wrapper = mount(React.createElement(Flyout, {
        openOnHover: false,
        openOnHoverDebounceTimeout: timeout
      }, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null)));
      var instance = wrapper.instance();
      setTimeout(function () {
        sandbox.mock(instance).expects('openOverlay').never();
      }, timeout - 10);
      setTimeout(function () {
        sandbox.mock(instance).expects('openOverlay');
      }, timeout + 10);
      instance.handleButtonHover({});
    });
  });
  describe('handleButtonHoverLeave()', function () {
    test('should call closeOverlay', function () {
      var wrapper = mount(React.createElement(Flyout, {
        openOnHover: false
      }, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null)));
      var instance = wrapper.instance();
      setTimeout(function () {
        sandbox.mock(instance).expects('closeOverlay');
      }, 310);
      instance.handleButtonHoverLeave({});
    });
  });
  describe('closeOverlay()', function () {
    [{
      currentIsVisible: true,
      isVisibleAfterOverlayClosed: false
    }, {
      currentIsVisible: false,
      isVisibleAfterOverlayClosed: false
    }].forEach(function (_ref5) {
      var currentIsVisible = _ref5.currentIsVisible,
          isVisibleAfterOverlayClosed = _ref5.isVisibleAfterOverlayClosed;
      test('should toggle isVisible state when called', function () {
        var wrapper = mount(React.createElement(Flyout, null, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null)));
        var instance = wrapper.instance();
        var event = {
          preventDefault: sandbox.stub()
        };
        instance.setState({
          isVisible: currentIsVisible
        });
        instance.closeOverlay(event);
        expect(instance.state.isVisible).toEqual(isVisibleAfterOverlayClosed);
      });
    });
    test('should call onClose when closeOverlay gets called', function () {
      var onClose = sandbox.mock();
      var wrapper = shallow(React.createElement(Flyout, {
        onClose: onClose
      }, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null)));
      var instance = wrapper.instance();
      var event = {
        preventDefault: sandbox.stub()
      };
      instance.closeOverlay(event);
    });
  });
  describe('openOverlay()', function () {
    [{
      currentIsVisible: true,
      isVisibleAfterOverlayOpened: true
    }, {
      currentIsVisible: false,
      isVisibleAfterOverlayOpened: true
    }].forEach(function (_ref6) {
      var currentIsVisible = _ref6.currentIsVisible,
          isVisibleAfterOverlayOpened = _ref6.isVisibleAfterOverlayOpened;
      test('should toggle isVisible state when called', function () {
        var wrapper = mount(React.createElement(Flyout, null, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null)));
        var instance = wrapper.instance();
        var event = {
          preventDefault: sandbox.stub()
        };
        instance.setState({
          isVisible: currentIsVisible
        });
        instance.openOverlay(event);
        expect(instance.state.isVisible).toEqual(isVisibleAfterOverlayOpened);
      });
    });
    test('should call onOpen when openOverlay gets called', function () {
      var onOpen = sandbox.mock();
      var wrapper = shallow(React.createElement(Flyout, {
        onOpen: onOpen
      }, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null)));
      var instance = wrapper.instance();
      var event = {
        preventDefault: sandbox.stub()
      };
      instance.openOverlay(event);
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
    describe('focusButton()', function () {
      test('should focus the flyout button when called', function () {
        mountToBody(React.createElement(Flyout, null, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null)));
        var instance = wrapper.instance();
        var overlayButtonEl = document.getElementById(instance.overlayButtonID);
        sandbox.mock(overlayButtonEl).expects('focus');
        instance.focusButton();
      });
    });
    describe('handleDocumentClickOrWindowBlur()', function () {
      [{
        isInsideToggleButton: true,
        isInsideOverlay: false,
        isVisible: false,
        closeOnClickOutside: false,
        closeOnWindowBlur: false,
        shouldCallCloseOverlay: false
      }, {
        isInsideToggleButton: true,
        isInsideOverlay: false,
        isVisible: true,
        closeOnClickOutside: false,
        closeOnWindowBlur: false,
        shouldCallCloseOverlay: false
      }, {
        isInsideToggleButton: false,
        isInsideOverlay: true,
        isVisible: false,
        closeOnClickOutside: false,
        closeOnWindowBlur: false,
        shouldCallCloseOverlay: false
      }, {
        isInsideToggleButton: false,
        isInsideOverlay: true,
        isVisible: true,
        closeOnClickOutside: false,
        closeOnWindowBlur: false,
        shouldCallCloseOverlay: false
      }, {
        isInsideToggleButton: false,
        isInsideOverlay: false,
        isVisible: false,
        closeOnClickOutside: false,
        closeOnWindowBlur: false,
        shouldCallCloseOverlay: false
      }, {
        isInsideToggleButton: false,
        isInsideOverlay: false,
        isVisible: true,
        closeOnClickOutside: false,
        closeOnWindowBlur: false,
        shouldCallCloseOverlay: false
      }, {
        isInsideToggleButton: false,
        isInsideOverlay: false,
        isVisible: false,
        closeOnClickOutside: false,
        closeOnWindowBlur: false,
        shouldCallCloseOverlay: false
      }, {
        isInsideToggleButton: true,
        isInsideOverlay: false,
        isVisible: false,
        closeOnClickOutside: true,
        closeOnWindowBlur: false,
        shouldCallCloseOverlay: false
      }, {
        isInsideToggleButton: true,
        isInsideOverlay: false,
        isVisible: true,
        closeOnClickOutside: true,
        closeOnWindowBlur: false,
        shouldCallCloseOverlay: false
      }, {
        isInsideToggleButton: false,
        isInsideOverlay: true,
        isVisible: false,
        closeOnClickOutside: true,
        closeOnWindowBlur: false,
        shouldCallCloseOverlay: false
      }, {
        isInsideToggleButton: false,
        isInsideOverlay: true,
        isVisible: true,
        closeOnClickOutside: true,
        closeOnWindowBlur: false,
        shouldCallCloseOverlay: false
      }, {
        isInsideToggleButton: false,
        isInsideOverlay: false,
        isVisible: false,
        closeOnClickOutside: true,
        closeOnWindowBlur: false,
        shouldCallCloseOverlay: false
      }, {
        isInsideToggleButton: false,
        isInsideOverlay: false,
        isVisible: true,
        closeOnClickOutside: true,
        closeOnWindowBlur: false,
        shouldCallCloseOverlay: true
      }, {
        isInsideToggleButton: true,
        isInsideOverlay: false,
        isVisible: false,
        closeOnClickOutside: false,
        closeOnWindowBlur: true,
        shouldCallCloseOverlay: false
      }, {
        isInsideToggleButton: true,
        isInsideOverlay: false,
        isVisible: true,
        closeOnClickOutside: false,
        closeOnWindowBlur: true,
        shouldCallCloseOverlay: false
      }, {
        isInsideToggleButton: false,
        isInsideOverlay: true,
        isVisible: false,
        closeOnClickOutside: false,
        closeOnWindowBlur: true,
        shouldCallCloseOverlay: false
      }, {
        isInsideToggleButton: false,
        isInsideOverlay: false,
        isVisible: false,
        closeOnClickOutside: false,
        closeOnWindowBlur: true,
        shouldCallCloseOverlay: false
      }, {
        isInsideToggleButton: false,
        isInsideOverlay: false,
        isVisible: true,
        closeOnClickOutside: false,
        closeOnWindowBlur: true,
        shouldCallCloseOverlay: true
      }].forEach(function (_ref7) {
        var isInsideToggleButton = _ref7.isInsideToggleButton,
            isInsideOverlay = _ref7.isInsideOverlay,
            isVisible = _ref7.isVisible,
            closeOnClickOutside = _ref7.closeOnClickOutside,
            closeOnWindowBlur = _ref7.closeOnWindowBlur,
            shouldCallCloseOverlay = _ref7.shouldCallCloseOverlay;
        test('should handle document click or window blur correctly', function () {
          mountToBody(React.createElement(Flyout, {
            closeOnClickOutside: closeOnClickOutside,
            closeOnWindowBlur: closeOnWindowBlur
          }, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null)));
          var instance = wrapper.instance();
          var event = {};
          instance.setState({
            isVisible: isVisible
          });

          if (shouldCallCloseOverlay) {
            sandbox.mock(instance).expects('closeOverlay');
          } else {
            sandbox.mock(instance).expects('closeOverlay').never();
          }

          if (isInsideToggleButton) {
            event.target = document.getElementById(instance.overlayButtonID);
          } else if (isInsideOverlay) {
            event.target = document.getElementById(instance.overlayID);
          } else {
            event.target = document.createElement('div');
          }

          instance.handleDocumentClickOrWindowBlur(event);
        });
      });
      test('should not close overlay when event target is inside portaled classes element', function () {
        mountToBody(React.createElement(Flyout, {
          isVisibleByDefault: true,
          portaledClasses: ['fake', 'class']
        }, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null)));
        var instance = wrapper.instance();
        var el = document.createElement('div');
        el.innerHTML = '<div class="class"><div class="target"></div></div>';
        sandbox.mock(instance).expects('closeOverlay').never();
        instance.handleDocumentClickOrWindowBlur({
          target: el.querySelector('.target')
        });
      });
      test('should close overlay when event target is not inside portaled classes element', function () {
        mountToBody(React.createElement(Flyout, {
          isVisibleByDefault: true,
          portaledClasses: ['fake', 'class']
        }, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null)));
        var instance = wrapper.instance();
        sandbox.mock(instance).expects('closeOverlay');
        instance.handleDocumentClickOrWindowBlur({
          target: document.createElement('div')
        });
      });
    });
  });
  describe('componentDidUpdate()', function () {
    [{
      prevIsVisible: true,
      currIsVisible: true,
      shouldAddEventListener: false,
      shouldRemoveEventListener: false
    }, {
      prevIsVisible: false,
      currIsVisible: false,
      shouldAddEventListener: false,
      shouldRemoveEventListener: false
    }, {
      prevIsVisible: true,
      currIsVisible: false,
      shouldAddEventListener: false,
      shouldRemoveEventListener: true
    }, {
      prevIsVisible: false,
      currIsVisible: true,
      shouldAddEventListener: true,
      shouldRemoveEventListener: false
    }].forEach(function (_ref8) {
      var prevIsVisible = _ref8.prevIsVisible,
          currIsVisible = _ref8.currIsVisible,
          shouldAddEventListener = _ref8.shouldAddEventListener,
          shouldRemoveEventListener = _ref8.shouldRemoveEventListener;
      test('should remove and add event listeners properly', function () {
        var wrapper = mount(React.createElement(Flyout, {
          isVisibleByDefault: prevIsVisible
        }, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null)));
        var instance = wrapper.instance();
        var documentMock = sandbox.mock(document);

        if (shouldAddEventListener) {
          documentMock.expects('addEventListener').withArgs('click');
          documentMock.expects('addEventListener').withArgs('contextmenu');
          documentMock.expects('removeEventListener').never();
        } else if (shouldRemoveEventListener) {
          documentMock.expects('removeEventListener').withArgs('click');
          documentMock.expects('removeEventListener').withArgs('contextmenu');
          documentMock.expects('addEventListener').never();
        }

        instance.setState({
          isVisible: currIsVisible
        });
      });
    });
  });
  describe('componentWillUnmount()', function () {
    [{
      isVisible: true,
      shouldRemoveEventListener: true
    }, {
      isVisible: false,
      shouldRemoveEventListener: false
    }].forEach(function (_ref9) {
      var isVisible = _ref9.isVisible,
          shouldRemoveEventListener = _ref9.shouldRemoveEventListener;
      test('should remove event listeners only when the overlay is visible', function () {
        var wrapper = mount(React.createElement(Flyout, null, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null)));
        var instance = wrapper.instance();
        var documentMock = sandbox.mock(document);
        instance.setState({
          isVisible: isVisible
        });

        if (shouldRemoveEventListener) {
          documentMock.expects('removeEventListener').withArgs('click');
          documentMock.expects('removeEventListener').withArgs('contextmenu');
        } else {
          documentMock.expects('removeEventListener').never();
        }

        wrapper.unmount();
      });
    });
  });
  describe('handleOverlayClose()', function () {
    test('should call focusButton() and closeOverlay() when called', function () {
      var wrapper = mount(React.createElement(Flyout, null, React.createElement(FakeButton, null), React.createElement(FakeOverlay, null)));
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('focusButton');
      sandbox.mock(instance).expects('closeOverlay');
      instance.handleOverlayClose();
    });
  });
});