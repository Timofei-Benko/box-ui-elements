import React from 'react';
import { shallow } from 'enzyme';
import { bdlBoxBlue } from '../../../styles/variables';
import CollaborationBadge from '../CollaborationBadge';
describe('icons/badges/CollaborationBadge', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(CollaborationBadge, props));
  };

  test('should correctly render default icon', function () {
    var wrapper = getWrapper();
    expect(wrapper.is('AccessibleSVG')).toBe(true);
    expect(wrapper.hasClass('collaboration-badge')).toBe(true);
    expect(wrapper.prop('height')).toEqual(16);
    expect(wrapper.prop('width')).toEqual(16);
    var paths = wrapper.find('path');
    expect(paths.at(0).prop('fill')).toEqual(bdlBoxBlue);
    expect(paths.at(1).prop('fill')).toEqual(bdlBoxBlue);
  });
  test('should correctly render icon with specified class', function () {
    var className = 'test';
    var wrapper = getWrapper({
      className: className
    });
    expect(wrapper.hasClass(className)).toBe(true);
  });
  test('should correctly render icon with specified height', function () {
    var height = 17;
    var wrapper = getWrapper({
      height: height
    });
    expect(wrapper.prop('height')).toEqual(height);
  });
  test('should correctly render icon with specified width', function () {
    var width = 17;
    var wrapper = getWrapper({
      width: width
    });
    expect(wrapper.prop('width')).toEqual(width);
  });
  test('should correctly render icon with specified title', function () {
    var title = 'fool';
    var wrapper = getWrapper({
      title: title
    });
    expect(wrapper.prop('title')).toEqual(title);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#979EA2';
    var wrapper = getWrapper({
      color: color
    });
    var fillColors = wrapper.find('.fill-color');

    for (var i = 0; i < fillColors.length; i += 1) {
      expect(fillColors.at(i).prop('fill')).toEqual(color);
    }
  });
});