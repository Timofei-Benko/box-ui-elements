/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from '../../link';
import { BreadcrumbCore as Breadcrumb } from '../Breadcrumb';
var wrapper;
var intl = {
  formatMessage: jest.fn().mockReturnValue('breadcrumb')
};
describe('components/breadcrumb/Breadcrumb', function () {
  test('should render correct breadcrumbs', function () {
    wrapper = shallow(React.createElement(Breadcrumb, {
      className: "my-breadcrumbs",
      intl: intl
    }, React.createElement(Link, null, "Home"), React.createElement(Link, null, "Box Engineering"), React.createElement(Link, null, "Frameworks")));
    expect(wrapper.is('nav')).toBe(true);
    expect(wrapper.prop('aria-label')).toEqual('breadcrumb');
    expect(wrapper.hasClass('my-breadcrumbs')).toBe(true);
    expect(wrapper.find('ol').length).toBe(1);
    expect(wrapper.find('Crumb').length).toBe(3);
  });
  test('should render dotdotdot crumbs if number of children exceeds threshold', function () {
    wrapper = shallow(React.createElement(Breadcrumb, {
      threshold: 4,
      intl: intl
    }, React.createElement(Link, null, "Home"), React.createElement(Link, null, "Box Engineering"), React.createElement(Link, null, "Frameworks"), React.createElement(Link, null, "Front End"), React.createElement(Link, null, "React"))); // test that the ellipsis is inside a Crumb with the "no-shrink" class

    var noShrinkCrumb = wrapper.find('Crumb').at(1);
    expect(noShrinkCrumb.prop('className')).toEqual('no-shrink');
    expect(noShrinkCrumb.find('EllipsisCrumb').length).toBe(1);
    expect(wrapper.find('MenuLinkItem').length).toBe(1);
    expect(wrapper.find('Crumb').length).toBe(5);
  });
});