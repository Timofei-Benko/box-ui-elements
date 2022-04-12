import React from 'react';
import { shallow } from 'enzyme';
import IconBreadcrumbArrow from '../IconBreadcrumbArrow';
describe('icons/general/IconBreadcrumbArrow', function () {
  test('should correctly render default breadcrumb arrow icon', function () {
    var wrapper = shallow(React.createElement(IconBreadcrumbArrow, null));
    expect(wrapper.hasClass('icon-breadcrumb-arrow')).toBe(true);
  });
});