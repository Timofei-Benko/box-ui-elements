import React from 'react';
import sinon from 'sinon';
import HotkeyRecord from '../HotkeyRecord';
import Hotkeys from '../Hotkeys';
var sandbox = sinon.sandbox.create();
describe('components/hotkeys/Hotkeys', function () {
  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  describe('componentDidMount()', function () {
    test('should call hotkeyLayer.registerHotkey for each hotkey config', function () {
      shallow(React.createElement(Hotkeys, {
        configs: [new HotkeyRecord({
          key: 'a'
        }), new HotkeyRecord({
          key: 'b'
        }), new HotkeyRecord({
          key: 'c'
        })]
      }, React.createElement("div", null)), {
        context: {
          hotkeyLayer: {
            registerHotkey: sandbox.mock().thrice()
          }
        }
      });
    });
    test('should throw error when hotkey layer does not exist', function () {
      var wrapper = shallow(React.createElement(Hotkeys, {
        configs: [new HotkeyRecord({
          key: 'a'
        }), new HotkeyRecord({
          key: 'b'
        }), new HotkeyRecord({
          key: 'c'
        })]
      }, React.createElement("div", null)), {
        disableLifecycleMethods: true
      });
      expect(function () {
        wrapper.instance().componentDidMount();
      }).toThrow();
    });
  });
  describe('componentDidUpdate()', function () {
    test('should remove any hot keys removed from the properties', function () {
      var configs = [new HotkeyRecord({
        key: 'a'
      }), new HotkeyRecord({
        key: 'b'
      }), new HotkeyRecord({
        key: 'c'
      })];
      var wrapper = shallow(React.createElement(Hotkeys, {
        configs: configs
      }, React.createElement("div", null)), {
        context: {
          hotkeyLayer: {
            registerHotkey: sandbox.stub(),
            deregisterHotkey: sandbox.mock().twice()
          }
        }
      });
      wrapper.setProps({
        configs: [configs[1]]
      });
    });
    test('should throw error when hotkey layer does not exist', function () {
      var wrapper = shallow(React.createElement(Hotkeys, {
        configs: [new HotkeyRecord({
          key: 'a'
        }), new HotkeyRecord({
          key: 'b'
        }), new HotkeyRecord({
          key: 'c'
        })]
      }, React.createElement("div", null)), {
        disableLifecycleMethods: true
      });
      expect(function () {
        wrapper.instance().componentDidMount();
      }).toThrow();
    });
  });
  describe('componentWillUnmount()', function () {
    test('should call hotkeyLayer.deregisterHotkey for each hotkey config', function () {
      shallow(React.createElement(Hotkeys, {
        configs: [new HotkeyRecord({
          key: 'a'
        }), new HotkeyRecord({
          key: 'b'
        }), new HotkeyRecord({
          key: 'c'
        })]
      }, React.createElement("div", null)), {
        context: {
          hotkeyLayer: {
            registerHotkey: sandbox.stub(),
            deregisterHotkey: sandbox.mock().thrice()
          }
        }
      }).unmount();
    });
  });
  describe('render()', function () {
    test('should render children', function () {
      var wrapper = shallow(React.createElement(Hotkeys, {
        configs: []
      }, React.createElement("div", null, "hi")), {
        context: {
          hotkeyLayer: {
            registerHotkey: sandbox.stub()
          }
        }
      });
      expect(wrapper.contains(React.createElement("div", null, "hi"))).toBe(true);
    });
    test('should render null when no children', function () {
      var wrapper = shallow(React.createElement(Hotkeys, {
        configs: []
      }), {
        context: {
          hotkeyLayer: {
            registerHotkey: sandbox.stub()
          }
        }
      });
      expect(wrapper.type()).toBeNull();
    });
  });
});