import React from 'react';
import { NavSidebar } from '..';
describe('components/nav-sidebar/NavSidebar', function () {
  test('should render nav sidebar and children', function () {
    var children = 'hootie hoo';
    var sidebar = shallow(React.createElement(NavSidebar, null, children));
    expect(sidebar.type()).toEqual('aside');
    expect(sidebar.hasClass('nav-sidebar')).toBe(true);
    expect(sidebar.children().text()).toEqual(children);
  });
  test('should render class and custom attributes when specified', function () {
    var sidebar = shallow(React.createElement(NavSidebar, {
      className: "nav",
      "data-resin-component": "leftnav"
    }, "hootie hoo"));
    expect(sidebar.hasClass('nav')).toBe(true);
    expect(sidebar.find('aside').prop('data-resin-component')).toEqual('leftnav');
  });
});