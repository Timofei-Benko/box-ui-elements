import React from 'react';
import sinon from 'sinon';
import HotkeyRecord from '../HotkeyRecord';
import HotkeyLayer from '../HotkeyLayer';
import HotkeyService from '../HotkeyService';
var sandbox = sinon.sandbox.create();
jest.mock('../HotkeyService');
describe('components/hotkeys/HotkeyLayer', function () {
  // This is required to prevent actually invoking HotkeyService, which causes
  // HotkeyService tests to fail
  HotkeyService.mockImplementation(function () {});
  afterEach(function () {
    sandbox.verifyAndRestore();
    HotkeyService.mockClear();
  });
  describe('getChildContext()', function () {
    test('should return the hotkey service', function () {
      var wrapper = shallow(React.createElement(HotkeyLayer, null, React.createElement("div", null)));
      var context = wrapper.instance().getChildContext();
      expect(context.hotkeyLayer).toEqual(wrapper.instance().hotkeyService);
    });
  });
  describe('componentWillUnmount()', function () {
    test('should destroy current layer', function () {
      var wrapper = shallow(React.createElement(HotkeyLayer, null, React.createElement("div", null)), {
        disableLifecycleMethods: true
      });
      wrapper.instance().hotkeyService = {
        destroyLayer: sandbox.mock()
      };
      wrapper.instance().componentWillUnmount();
    });
  });
  describe('render()', function () {
    test('should render children', function () {
      var wrapper = shallow(React.createElement(HotkeyLayer, null, React.createElement("div", {
        className: "content"
      }, "hi")));
      expect(wrapper.find('div.content').length).toBe(1);
    });
    describe('help modal enabled', function () {
      test('should render Hotkeys component, HotkeyHelpModal component, and children', function () {
        var wrapper = shallow(React.createElement(HotkeyLayer, {
          enableHelpModal: true
        }, React.createElement("div", null, "hi")));
        expect(wrapper.find('Hotkeys').length).toBe(1);
        expect(wrapper.find('HotkeyHelpModal').length).toBe(1);
        expect(wrapper.contains(React.createElement("div", null, "hi"))).toBe(true);
      });
      test('should pass shortcut to open help modal', function () {
        var wrapper = shallow(React.createElement(HotkeyLayer, {
          configs: [new HotkeyRecord({
            key: 'a'
          })],
          enableHelpModal: true
        }, React.createElement("div", null, "hi")));
        var hotkeys = wrapper.find('Hotkeys');
        expect(hotkeys.prop('configs').length).toBe(2);
        expect(hotkeys.prop('configs')[0].key).toEqual('?');
      });
    });
    describe('help modal disabled', function () {
      test('should not render HotkeyHelpModal', function () {
        var wrapper = shallow(React.createElement(HotkeyLayer, null, React.createElement("div", null)));
        expect(wrapper.find('HotkeyHelpModal').length).toBe(0);
      });
    });
  });
  describe('getHotkeyConfigs()', function () {
    test('should return "?" shortcut to open help modal when help modal is enabled', function () {
      var wrapper = shallow(React.createElement(HotkeyLayer, {
        enableHelpModal: true
      }));
      sandbox.mock(wrapper.instance()).expects('openHelpModal');
      var configs = wrapper.instance().getHotkeyConfigs();
      configs[0].handler();
      expect(configs[0].key).toEqual('?');
    });
    test('should return custom shortcut to open help modal when custom shortcut is provided', function () {
      var wrapper = shallow(React.createElement(HotkeyLayer, {
        helpModalShortcut: "!",
        enableHelpModal: true
      }, React.createElement("div", null, "hi")));
      var configs = wrapper.instance().getHotkeyConfigs();
      expect(configs[0].key).toEqual('!');
    });
    test('should return empty array when help modal is disabled', function () {
      var wrapper = shallow(React.createElement(HotkeyLayer, null, React.createElement("div", null)));
      var configs = wrapper.instance().getHotkeyConfigs();
      expect(configs.length).toBe(0);
    });
  });
  describe('openHelpModal()', function () {
    test('should set state.isHelpModalOpen to true', function () {
      var wrapper = shallow(React.createElement(HotkeyLayer, {
        enableHelpModal: true
      }));
      wrapper.instance().openHelpModal();
      expect(wrapper.state('isHelpModalOpen')).toBe(true);
    });
  });
  describe('closeHelpModal()', function () {
    test('should set state.isHelpModalOpen to false', function () {
      var wrapper = shallow(React.createElement(HotkeyLayer, {
        enableHelpModal: true
      }));
      wrapper.instance().closeHelpModal();
      expect(wrapper.state('isHelpModalOpen')).toBe(false);
    });
  });
});