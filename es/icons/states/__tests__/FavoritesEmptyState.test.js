import React from 'react';
import { shallow } from 'enzyme';
import FavoritesEmptyState from '../FavoritesEmptyState';
describe('icons/states/FavoritesEmptyState', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(FavoritesEmptyState, null));
    expect(wrapper.hasClass('favorites-empty-state')).toBeTruthy();
  });
  test('should correctly render the icon with specified class', function () {
    var className = 'my-state';
    var wrapper = shallow(React.createElement(FavoritesEmptyState, {
      className: className
    }));
    expect(wrapper.hasClass(className)).toBeTruthy();
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 17;
    var height = 21;
    var wrapper = shallow(React.createElement(FavoritesEmptyState, {
      height: height,
      width: width
    }));
    expect(wrapper.prop('width')).toEqual(width);
    expect(wrapper.prop('height')).toEqual(height);
  });
  test('should correctly render svg with specified title', function () {
    var title = 'oh hi there';
    var wrapper = shallow(React.createElement(FavoritesEmptyState, {
      title: title
    }));
    expect(wrapper.prop('title')).toEqual(title);
  });
});