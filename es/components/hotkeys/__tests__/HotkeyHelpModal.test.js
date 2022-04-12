function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import sinon from 'sinon';
import HotkeyRecord from '../HotkeyRecord';
import HotkeyHelpModal from '../HotkeyHelpModal';
var sandbox = sinon.sandbox.create();
describe('components/hotkeys/components/HotkeyHelpModal', function () {
  var HotkeyServiceMock;

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      hotkeyLayer: HotkeyServiceMock
    };
    return shallow(React.createElement(HotkeyHelpModal, _extends({
      onRequestClose: sandbox.stub()
    }, props)), {
      context: context
    });
  };

  beforeEach(function () {
    HotkeyServiceMock = {
      getActiveHotkeys: sandbox.stub().returns({
        other: [new HotkeyRecord()]
      }),
      getActiveTypes: sandbox.stub().returns(['other'])
    };
  });
  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  describe('render()', function () {
    test('should render a HotkeyFriendlyModal', function () {
      var wrapper = getWrapper();
      var modal = wrapper.find('HotkeyFriendlyModal');
      expect(modal.length).toBe(1);
      expect(modal.prop('onRequestClose')).toBeTruthy();
      expect(modal.prop('isOpen')).toBeFalsy();
      expect(wrapper.find('ModalActions').length).toBe(1);
    });
    test('should pass isOpen prop to modal when modal is open', function () {
      var wrapper = getWrapper({
        isOpen: true
      });
      var modal = wrapper.find('HotkeyFriendlyModal');
      expect(modal.prop('isOpen')).toBe(true);
    });
    test('should return null when no hotkeys exist', function () {
      HotkeyServiceMock.getActiveHotkeys = sandbox.stub().returns({});
      HotkeyServiceMock.getActiveTypes = sandbox.stub().returns([]);
      var wrapper = getWrapper();
      expect(wrapper.get(0)).toBeFalsy();
    });
  });
  describe('componentDidUpdate()', function () {
    test('should set state.currentType when state.currentType is null', function () {
      var wrapper = getWrapper();
      wrapper.setState({
        currentType: null
      });
      sandbox.mock(wrapper.instance()).expects('setState');
      wrapper.setProps({
        isOpen: true
      });
    });
    test('should refresh hotkey and hotkey types from hotkeyService when modal is opened', function () {
      var wrapper = getWrapper();
      wrapper.setProps({
        isOpen: true
      }); // should've been called once in constructor and once in componentDidMount

      expect(HotkeyServiceMock.getActiveHotkeys.calledTwice).toBe(true);
      expect(HotkeyServiceMock.getActiveTypes.calledTwice).toBe(true);
    });
  });
  describe('renderDropdownMenu()', function () {
    test('should render DropdownMenu with correct items', function () {
      HotkeyServiceMock.getActiveHotkeys = sandbox.stub().returns({
        hello: [new HotkeyRecord()],
        hi: [new HotkeyRecord()],
        hey: [new HotkeyRecord()]
      });
      HotkeyServiceMock.getActiveTypes = sandbox.stub().returns(['hello', 'hi', 'hey']);
      var wrapper = getWrapper();
      expect(wrapper.find('MenuItem').length).toBe(3);
    });
  });
  describe('renderHotkeyList()', function () {
    test('should render hotkeys for currently selected type', function () {
      HotkeyServiceMock.getActiveHotkeys = sandbox.stub().returns({
        navigation: [{
          description: 'hi',
          key: 'a'
        }, {
          description: 'hi',
          key: 'b'
        }],
        other: [{
          description: 'hi',
          key: 'c'
        }, {
          description: 'hi',
          key: 'd'
        }, {
          description: 'hi',
          key: 'e'
        }]
      });
      HotkeyServiceMock.getActiveTypes = sandbox.stub().returns(['navigation', 'other']);
      var wrapper = getWrapper();
      wrapper.setState({
        currentType: 'navigation'
      }); // should render the two 'navigation' hotkeys

      expect(wrapper.find('.hotkey-item').length).toBe(2);
      wrapper.setState({
        currentType: 'other'
      }); // should render the three 'other' hotkeys

      expect(wrapper.find('.hotkey-item').length).toBe(3);
    });
  });
  describe('renderHotkey()', function () {
    test('should render hotkey correctly', function () {
      HotkeyServiceMock.getActiveHotkeys = sandbox.stub().returns({
        navigation: [{
          description: 'hi',
          key: 'shift+a+b+c'
        }]
      });
      HotkeyServiceMock.getActiveTypes = sandbox.stub().returns(['navigation']);
      var wrapper = getWrapper(); // should render one hotkey

      expect(wrapper.find('.hotkey-key').children().length).toBe(1); // kbd elements should be [ "shift", "a", "b", "c" ]

      expect(wrapper.find('kbd').length).toBe(4);
    });
    test('should render all keys when a hotkey has multiple hotkeys', function () {
      HotkeyServiceMock.getActiveHotkeys = sandbox.stub().returns({
        navigation: [{
          description: 'hi',
          key: ['shift+a', 'alt+a']
        }]
      });
      HotkeyServiceMock.getActiveTypes = sandbox.stub().returns(['navigation']);
      var wrapper = getWrapper(); // elements should be [ "shift+a", "/", "alt+a" ] (i.e. length 3)

      expect(wrapper.find('.hotkey-key').children().length).toBe(3); // kbd elements should be [ "shift", "a", "alt", "a" ]

      expect(wrapper.find('.hotkey-key kbd').length).toBe(4);
    });
  });
});