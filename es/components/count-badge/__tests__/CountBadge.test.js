import React from 'react';
import { shallow } from 'enzyme';
import CountBadge from '../CountBadge';
describe('components/badgeable/Badgeable', function () {
  test('should correctly render with default props', function () {
    var wrapper = shallow(React.createElement(CountBadge, {
      value: 1
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should render proper classes when animateable', function () {
    var wrapper = shallow(React.createElement(CountBadge, {
      shouldAnimate: true
    }));
    expect(wrapper.hasClass('animate')).toBeTruthy();
  });
  test('should render proper classes when visible', function () {
    var wrapper = shallow(React.createElement(CountBadge, {
      isVisible: false
    }));
    expect(wrapper.hasClass('is-visible')).toBeFalsy();
  });
  test('should handle custom classes', function () {
    var wrapper = shallow(React.createElement(CountBadge, {
      className: "test"
    }));
    expect(wrapper.hasClass('test')).toBeTruthy();
  });
});