import React from 'react';
import { shallow } from 'enzyme';
import IconMetadataColumns from '../IconMetadataColumns';
describe('icons/metadata-view/IconMetadataColumns', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(IconMetadataColumns, props));
  };

  test('should correctly render default icon', function () {
    var wrapper = getWrapper();
    expect(wrapper.is('AccessibleSVG')).toBe(true);
    expect(wrapper.hasClass('metadata-columns')).toBe(true);
    expect(wrapper.prop('height')).toEqual(16);
    expect(wrapper.prop('width')).toEqual(16);
  });
  test('should correctly render icon with specified class', function () {
    var className = 'test';
    var wrapper = getWrapper({
      className: className
    });
    expect(wrapper.hasClass(className)).toBe(true);
  });
});