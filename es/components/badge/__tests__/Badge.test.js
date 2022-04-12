import React from 'react';
import { shallow } from 'enzyme';
import Badge from '../Badge';
import { BadgeType } from '../types';
describe('components/badge/Badge', function () {
  test('should correctly render children in badge', function () {
    var children = 'some child text';
    var wrapper = shallow(React.createElement(Badge, null, children));
    expect(wrapper.hasClass('badge')).toBe(true);
    expect(wrapper.text()).toEqual(children);
  });
  test('should accept and propagate className when className prop passed', function () {
    var wrapper = shallow(React.createElement(Badge, {
      className: "some-badge-style"
    }, "test"));
    expect(wrapper.hasClass('some-badge-style')).toBe(true);
  });
  test.each([BadgeType.INFO, BadgeType.WARNING, BadgeType.HIGHLIGHT])("should render a badge with %s styling when initialized", function (type) {
    var wrapper = shallow(React.createElement(Badge, {
      type: type
    }, "test"));
    expect(wrapper).toMatchSnapshot();
  });
});