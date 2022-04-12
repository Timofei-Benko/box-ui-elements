import React from 'react';
import HotkeyFriendlyModal from '../HotkeyFriendlyModal';
describe('components/hotkeys/HotkeyFriendlyModal', function () {
  test('should render a HotkeyLayer and Modal when isOpen is true', function () {
    var wrapper = shallow(React.createElement(HotkeyFriendlyModal, {
      isOpen: true
    }, React.createElement("div", null)));
    var hotkeyLayer = wrapper.find('HotkeyLayer');
    expect(hotkeyLayer.length).toBe(1);
    expect(hotkeyLayer.prop('enableHelpModal')).toBeFalsy();
    expect(wrapper.find('Modal').length).toBe(1);
  });
  test('should render null when isOpen is falsy', function () {
    var wrapper = shallow(React.createElement(HotkeyFriendlyModal, null, React.createElement("div", null)));
    expect(wrapper.type()).toBeNull();
  });
});