/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import EllipsisCrumb from '../EllipsisCrumb';
var wrapper;
describe('components/breadcrumb/EllipsisCrumb', function () {
  beforeEach(function () {
    wrapper = shallow(React.createElement(EllipsisCrumb, null, React.createElement("a", {
      href: "#"
    }, "Home"), React.createElement("a", {
      href: "#"
    }, "Box")));
  });
  test('should render correct EllipsisCrumb', function () {
    var menu = wrapper.find('Menu');
    expect(wrapper.find('DropdownMenu').length).toBe(1);
    expect(wrapper.find('.breadcrumb-toggler').length).toBe(1);
    expect(menu.length).toBe(1);
    expect(menu.find('a').length).toBe(2);
  });
});