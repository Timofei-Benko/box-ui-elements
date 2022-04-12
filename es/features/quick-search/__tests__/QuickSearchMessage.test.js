import React from 'react';
import QuickSearchMessage from '../QuickSearchMessage';
describe('features/quick-search/QuickSearchMessage', function () {
  test('should render default component', function () {
    var children = 'hi';
    var wrapper = shallow(React.createElement(QuickSearchMessage, null, children));
    var overlay = wrapper.children();
    expect(wrapper.hasClass('overlay-wrapper')).toBe(true);
    expect(wrapper.hasClass('is-visible')).toBe(false);
    expect(wrapper.hasClass('quick-search-message')).toBe(true);
    expect(overlay.is('p')).toBe(true);
    expect(overlay.hasClass('overlay')).toBe(true);
    expect(overlay.text()).toEqual(children);
  });
  test('should show overlay when isShown prop is true', function () {
    var wrapper = shallow(React.createElement(QuickSearchMessage, {
      isShown: true
    }, "hi"));
    expect(wrapper.hasClass('is-visible')).toBe(true);
  });
});