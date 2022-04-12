import React from 'react';
import { shallow } from 'enzyme';
import { bdlBoxBlue } from '../../../styles/variables';
import RecentsEmptyState from '../RecentsEmptyState';
describe('icons/states/RecentsEmptyState', function () {
  test('should correctly render default svg', function () {
    var wrapper = shallow(React.createElement(RecentsEmptyState, null));
    expect(wrapper.is('AccessibleSVG')).toBe(true);
    expect(wrapper.hasClass('recents-empty-state')).toBe(true);
    expect(wrapper.prop('height')).toEqual(150);
    expect(wrapper.prop('width')).toEqual(150);
    expect(wrapper.find('path').at(0).prop('stroke')).toEqual(bdlBoxBlue);
  });
  test('should correctly render svg with specified class', function () {
    var className = 'my-state';
    var wrapper = shallow(React.createElement(RecentsEmptyState, {
      className: className
    }));
    expect(wrapper.hasClass(className)).toBe(true);
  });
  test('should correctly render svg with specified color', function () {
    var color = '#123456';
    var wrapper = shallow(React.createElement(RecentsEmptyState, {
      color: color
    }));
    expect(wrapper.find('path').at(0).prop('stroke')).toEqual(color);
  });
  test('should correctly render svg with specified width and height', function () {
    var width = 17;
    var height = 21;
    var wrapper = shallow(React.createElement(RecentsEmptyState, {
      height: height,
      width: width
    }));
    expect(wrapper.prop('height')).toEqual(height);
    expect(wrapper.prop('width')).toEqual(width);
  });
  test('should correctly render svg with specified title', function () {
    var title = 'oh hi there';
    var wrapper = shallow(React.createElement(RecentsEmptyState, {
      title: title
    }));
    expect(wrapper.prop('title')).toEqual(title);
  });
});