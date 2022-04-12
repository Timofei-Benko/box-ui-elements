/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from '../../link';
import Crumb from '../Crumb';
var wrapper;
describe('components/breadcrumb/Crumb', function () {
  beforeEach(function () {
    wrapper = shallow(React.createElement(Crumb, {
      className: "my-crumb",
      isLastCrumb: false
    }, React.createElement(Link, null, "Home")));
  });
  test('should render correct crumb', function () {
    expect(wrapper.find('.breadcrumb-item').hasClass('my-crumb')).toBeTruthy();
    expect(wrapper.find('.breadcrumb-item').hasClass('breadcrumb-item-last')).toBeFalsy();
  });
  test('should render correct last crumb', function () {
    wrapper.setProps({
      isLastCrumb: true
    });
    expect(wrapper.find('.breadcrumb-item').hasClass('breadcrumb-item-last')).toBeTruthy();
  });
});