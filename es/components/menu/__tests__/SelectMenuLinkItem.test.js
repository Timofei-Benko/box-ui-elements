import React from 'react';
import { shallow } from 'enzyme';
import SelectMenuLinkItem from '../SelectMenuLinkItem';
describe('components/menu/SelectMenuLinkItem', function () {
  test('should correctly render default component', function () {
    var wrapper = shallow(React.createElement(SelectMenuLinkItem, null, React.createElement("a", {
      href: "/awesome"
    }, "Foo")));
    expect(wrapper.is('MenuLinkItem')).toBe(true);
    expect(wrapper.prop('isSelectItem')).toBe(true);
  });
  test('should correctly pass through props', function () {
    var wrapper = shallow(React.createElement(SelectMenuLinkItem, {
      isSelected: true
    }, React.createElement("a", {
      href: "/awesome"
    }, "Foo")));
    expect(wrapper.prop('isSelected')).toBe(true);
  });
});