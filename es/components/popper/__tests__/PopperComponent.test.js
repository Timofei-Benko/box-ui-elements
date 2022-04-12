import React from 'react';
import { Reference, Popper } from 'react-popper';
import PopperComponent from '..';
describe('components/popper/PopperComponent', function () {
  test('should throw an error if not enough children provided', function () {
    expect(function () {
      shallow(React.createElement(PopperComponent, null, React.createElement("div", null, "Reference element")));
    }).toThrow();
  });
  test('should not render popper content if not open', function () {
    var wrapper = shallow(React.createElement(PopperComponent, null, React.createElement("div", null, "Reference element"), React.createElement("div", null, "Popper content")));
    expect(wrapper.exists(Reference)).toBe(true);
    expect(wrapper.exists(Popper)).toBe(false);
  });
  test('should render popper content if is open', function () {
    var wrapper = shallow(React.createElement(PopperComponent, {
      isOpen: true
    }, React.createElement("div", null, "Reference element"), React.createElement("div", null, "Popper content")));
    expect(wrapper.exists(Reference)).toBe(true);
    expect(wrapper.exists(Popper)).toBe(true);
  });
  test('should apply the placement to the Popper', function () {
    var wrapper = shallow(React.createElement(PopperComponent, {
      isOpen: true,
      placement: "bottom-end"
    }, React.createElement("div", null, "Reference element"), React.createElement("div", null, "Popper content")));
    expect(wrapper.exists(Reference)).toBe(true);
    var popperWrapper = wrapper.find(Popper);
    expect(popperWrapper.length).toBe(1);
    expect(popperWrapper.prop('placement')).toBe('bottom-end');
  });
});