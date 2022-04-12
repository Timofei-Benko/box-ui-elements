import React from 'react';
import HotkeyFriendlyOverlay from '../HotkeyFriendlyOverlay';
describe('components/hotkeys/HotkeyFriendlyOverlay', function () {
  test('should render a HotkeyLayer and an Overlay', function () {
    var wrapper = shallow(React.createElement(HotkeyFriendlyOverlay, null, React.createElement("div", null)));
    expect(wrapper).toMatchSnapshot();
  });
  test('should pass properties on to the underlying Overlay', function () {
    var wrapper = shallow(React.createElement(HotkeyFriendlyOverlay, {
      className: "test-class",
      shouldDefaultFocus: true
    }, React.createElement("div", null)));
    var overlay = wrapper.find('Overlay');
    expect(overlay.props().shouldDefaultFocus).toBe(true);
    expect(overlay.props().className).toBe('test-class');
  });
});