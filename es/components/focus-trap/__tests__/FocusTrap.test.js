import React from 'react';
import tabbable from 'tabbable';
import FocusTrap from '../FocusTrap';
jest.mock('tabbable', function () {
  return jest.fn();
});
jest.useFakeTimers();
describe('components/focus-trap/FocusTrap', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(FocusTrap, props, React.createElement("div", {
      className: "trap-children"
    })), {
      disableLifecycleMethods: true
    });
  };

  afterEach(function () {
    jest.resetModules();
    jest.clearAllMocks();
  });
  describe('componentDidMount()', function () {
    test('should call focusFirstElement when defaultFocus is true', function () {
      var instance = getWrapper({
        shouldDefaultFocus: true
      }).instance();
      instance.focusFirstElement = jest.fn();
      instance.componentDidMount();
      jest.runAllTimers();
      expect(instance.focusFirstElement).toHaveBeenCalled();
    });
    test('should not call focusFirstElement when defaultFocus is false', function () {
      var instance = getWrapper({
        shouldDefaultFocus: false
      }).instance();
      instance.focusFirstElement = jest.fn();
      instance.el = {
        focus: jest.fn()
      };
      instance.componentDidMount();
      jest.runAllTimers();
      expect(instance.focusFirstElement).not.toHaveBeenCalled();
    });
  });
  describe('componentWillUnmount()', function () {
    test('should focus on previousFocusEl', function () {
      var instance = getWrapper().instance();
      instance.previousFocusEl = {
        focus: jest.fn()
      };
      instance.componentWillUnmount();
      jest.runAllTimers();
      expect(instance.previousFocusEl.focus).toHaveBeenCalled();
    });
  });
  describe('focusFirstElement()', function () {
    test('should focus on the first tabbable non-trap element when it exists', function () {
      var shouldNotCallStub = jest.fn();
      var shouldCallStub = jest.fn();
      tabbable.mockReturnValueOnce([{
        focus: shouldNotCallStub
      }, // trap el
      {
        focus: shouldCallStub
      }, // first real el
      {
        focus: shouldNotCallStub
      }, // real el
      {
        focus: shouldNotCallStub
      }, // real el
      {
        focus: shouldNotCallStub
      }, // trap el
      {
        focus: shouldNotCallStub
      } // trap el
      ]);
      var instance = getWrapper().instance();
      instance.el = {};
      instance.focusFirstElement();
      expect(shouldNotCallStub).not.toHaveBeenCalled();
      expect(shouldCallStub).toHaveBeenCalled();
    });
    test('should focus on the trap element when no focusable children exist', function () {
      var shouldNotCallStub = jest.fn();
      tabbable.mockReturnValueOnce([{
        focus: shouldNotCallStub
      }, // trap el
      {
        focus: shouldNotCallStub
      }, // trap el
      {
        focus: shouldNotCallStub
      } // trap el
      ]);
      var instance = getWrapper().instance();
      instance.el = {};
      instance.trapEl = {
        focus: jest.fn()
      };
      instance.focusFirstElement();
      expect(shouldNotCallStub).not.toHaveBeenCalled();
      expect(instance.trapEl.focus).toHaveBeenCalled();
    });
  });
  describe('focusLastElement()', function () {
    test('should focus on the last tabbable non-trap element when it exists', function () {
      var shouldNotCallStub = jest.fn();
      var shouldCallStub = jest.fn();
      tabbable.mockReturnValueOnce([{
        focus: shouldNotCallStub
      }, // trap el
      {
        focus: shouldNotCallStub
      }, // real el
      {
        focus: shouldNotCallStub
      }, // real el
      {
        focus: shouldCallStub
      }, // last real el
      {
        focus: shouldNotCallStub
      }, // trap el
      {
        focus: shouldNotCallStub
      } // trap el
      ]);
      var instance = getWrapper().instance();
      instance.el = {};
      instance.focusLastElement();
      expect(shouldNotCallStub).not.toHaveBeenCalled();
      expect(shouldCallStub).toHaveBeenCalled();
    });
    test('should focus on the trap element when no focusable children exist', function () {
      var shouldNotCallStub = jest.fn();
      tabbable.mockReturnValueOnce([{
        focus: shouldNotCallStub
      }, // trap el
      {
        focus: shouldNotCallStub
      }, // trap el
      {
        focus: shouldNotCallStub
      } // trap el
      ]);
      var instance = getWrapper().instance();
      instance.el = {};
      instance.trapEl = {
        focus: jest.fn()
      };
      instance.focusLastElement();
      expect(shouldNotCallStub).not.toHaveBeenCalled();
      expect(instance.trapEl.focus).toHaveBeenCalled();
    });
  });
  describe('handleTrapElKeyDown()', function () {
    test('should return without doing anything when key is not Tab', function () {
      var instance = getWrapper().instance();
      var event = {
        key: 'Enter',
        stopPropagation: jest.fn(),
        preventDefault: jest.fn()
      };
      instance.handleTrapElKeyDown(event);
      expect(event.stopPropagation).not.toHaveBeenCalled();
      expect(event.preventDefault).not.toHaveBeenCalled();
    });
    test('should stop event propagatioan and prevent default when key is Tab', function () {
      var instance = getWrapper().instance();
      var event = {
        key: 'Tab',
        stopPropagation: jest.fn(),
        preventDefault: jest.fn()
      };
      instance.handleTrapElKeyDown(event);
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });
  describe('render()', function () {
    test('should render a div, the three trap els, and children', function () {
      var wrapper = getWrapper({
        className: 'focus-trap',
        'data-resin-thing': 'test'
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
});