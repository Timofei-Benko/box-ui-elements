import React from 'react';
import { shallow } from 'enzyme';
import SharedLinkErrorState from '../SharedLinkErrorState';
describe('icons/states/SharedLinkErrorState', function () {
  test('should correctly render default svg', function () {
    var wrapper = shallow(React.createElement(SharedLinkErrorState, null));
    expect(wrapper.is('AccessibleSVG')).toBe(true);
    expect(wrapper.hasClass('shared-link-error-state')).toBe(true);
    expect(wrapper.prop('height')).toEqual(173);
    expect(wrapper.prop('width')).toEqual(175);
  });
  test('should correctly render svg with specified class', function () {
    var className = 'my-state';
    var wrapper = shallow(React.createElement(SharedLinkErrorState, {
      className: className
    }));
    expect(wrapper.hasClass(className)).toBe(true);
  });
  test('should correctly render svg with specified width and height', function () {
    var width = 17;
    var height = 21;
    var wrapper = shallow(React.createElement(SharedLinkErrorState, {
      height: height,
      width: width
    }));
    expect(wrapper.prop('height')).toEqual(height);
    expect(wrapper.prop('width')).toEqual(width);
  });
  test('should correctly render svg with specified title', function () {
    var title = 'oh hi there';
    var wrapper = shallow(React.createElement(SharedLinkErrorState, {
      title: title
    }));
    expect(wrapper.prop('title')).toEqual(title);
  });
});