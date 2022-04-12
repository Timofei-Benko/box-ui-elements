import React from 'react';
import { shallow } from 'enzyme';
import CollectionSidebarEmptyState from '../CollectionSidebarEmptyState';
describe('icons/states/CollectionSidebarEmptyState', function () {
  test('should correctly render state svg with default state class', function () {
    var wrapper = shallow(React.createElement(CollectionSidebarEmptyState, null));
    expect(wrapper.hasClass('collection-sidebar-empty-state')).toBe(true);
  });
  test('should correctly render state svg with specified class', function () {
    var className = 'my-state';
    var wrapper = shallow(React.createElement(CollectionSidebarEmptyState, {
      className: className
    }));
    expect(wrapper.hasClass(className)).toBe(true);
  });
  test('should correctly render state svg with specified color', function () {
    var color = '#123456';
    var wrapper = shallow(React.createElement(CollectionSidebarEmptyState, {
      color: color
    }));
    expect(wrapper.find('g').at(1).prop('fill')).toEqual(color);
  });
  test('should correctly render state svg with specified width and height', function () {
    var width = 17;
    var height = 21;
    var wrapper = shallow(React.createElement(CollectionSidebarEmptyState, {
      height: height,
      width: width
    }));
    expect(wrapper.prop('width')).toEqual(width);
    expect(wrapper.prop('height')).toEqual(height);
  });
  test('should correctly render svg with specified title', function () {
    var title = 'oh hi there';
    var wrapper = shallow(React.createElement(CollectionSidebarEmptyState, {
      title: title
    }));
    expect(wrapper.prop('title')).toEqual(title);
  });
});