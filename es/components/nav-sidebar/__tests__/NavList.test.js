/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { NavList } from '..';
import { Link } from '../../link';
describe('components/nav-sidebar/NavList', function () {
  test('should render nav list and nest children', function () {
    var children = React.createElement(Link, null, "Test");
    var nav = shallow(React.createElement(NavList, null, children));
    expect(nav.type()).toEqual('nav');
    expect(nav.hasClass('nav-list')).toBe(true);
    expect(nav.childAt(0).type()).toEqual('ul');
    expect(nav.childAt(0).childAt(0).type()).toEqual('li');
    expect(nav.childAt(0).childAt(0).contains(children)).toBe(true);
  });
  test('should render heading when specified', function () {
    var heading = 'Title';
    var nav = shallow(React.createElement(NavList, {
      heading: heading
    }, React.createElement(Link, null, "Test")));
    expect(nav.childAt(0).type()).toEqual('h2');
    expect(nav.childAt(0).children().text()).toEqual(heading);
  });
  test('should render nav list when one child is null', function () {
    var nav = shallow(React.createElement(NavList, null, React.createElement(Link, null, "Test"), null));
    expect(nav.find('li').length).toEqual(1);
  });
  test('should pass down optional ul props', function () {
    var ulProps = {
      hello: 'world'
    };
    var nav = shallow(React.createElement(NavList, {
      ulProps: ulProps
    }, React.createElement(Link, null, "Test"), null));
    expect(nav.find('ul').props().hello).toEqual('world');
  });
});