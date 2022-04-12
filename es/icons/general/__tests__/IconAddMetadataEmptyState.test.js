import React from 'react';
import { shallow } from 'enzyme';
import IconAddMetadataEmptyState from '../IconAddMetadataEmptyState';
describe('icons/general/IconAddMetadataEmptyState', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconAddMetadataEmptyState, null));
    expect(wrapper.hasClass('icon-add-metadata-empty-state')).toEqual(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconAddMetadataEmptyState, {
      color: color
    }));
    expect(wrapper.find('path').first().prop('fill')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var wrapper = shallow(React.createElement(IconAddMetadataEmptyState, {
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconAddMetadataEmptyState, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});