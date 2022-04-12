import React from 'react';
import { shallow } from 'enzyme';
import MenuLinkItem from '../MenuLinkItem';
describe('components/menu/MenuLinkItem', function () {
  test('should correctly render a list element and link with correct props', function () {
    var wrapper = shallow(React.createElement(MenuLinkItem, null, React.createElement("a", {
      className: "test",
      href: "/awesome"
    }, "Foo")));
    expect(wrapper.is('li')).toBe(true);
    expect(wrapper.prop('role')).toEqual('none');
    var link = wrapper.find('a');
    expect(link.length).toBe(1);
    expect(link.hasClass('menu-item')).toBe(true);
    expect(link.hasClass('test')).toBe(true);
    expect(link.prop('role')).toEqual('menuitem');
    expect(link.prop('tabIndex')).toEqual(-1);
  });
  test('should correctly render a selectable item', function () {
    var wrapper = shallow(React.createElement(MenuLinkItem, {
      isSelectItem: true
    }, React.createElement("a", {
      href: "/awesome"
    }, "Foo")));
    var link = wrapper.find('a');
    expect(link.length).toBe(1);
    expect(link.hasClass('is-select-item')).toBe(true);
    expect(link.prop('role')).toEqual('menuitemradio');
    expect(link.prop('aria-checked')).toBe(false);
  });
  test('should correctly render a selected item', function () {
    var wrapper = shallow(React.createElement(MenuLinkItem, {
      isSelected: true,
      isSelectItem: true
    }, React.createElement("a", {
      href: "/awesome"
    }, "Foo")));
    var link = wrapper.find('a');
    expect(link.length).toBe(1);
    expect(link.hasClass('is-selected')).toBe(true);
    expect(link.prop('aria-checked')).toBe(true);
  });
});