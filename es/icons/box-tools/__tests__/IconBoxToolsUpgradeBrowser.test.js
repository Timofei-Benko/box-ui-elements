import React from 'react';
import { shallow } from 'enzyme';
import IconBoxToolsUpgradeBrowser from '../IconBoxToolsUpgradeBrowser';
describe('icons/box-tools/IconBoxToolsUpgradeBrowser', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(IconBoxToolsUpgradeBrowser, props));
  };

  test('should correctly render default icon', function () {
    var wrapper = getWrapper();
    expect(wrapper.is('AccessibleSVG')).toBe(true);
    expect(wrapper.hasClass('icon-box-tools-upgrade-browser')).toBe(true);
    expect(wrapper.prop('height')).toEqual(113);
    expect(wrapper.prop('width')).toEqual(152);
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
  test('should correctly render icon with specified title', function () {
    var title = 'fool';
    var wrapper = getWrapper({
      title: title
    });
    expect(wrapper.prop('title')).toEqual(title);
  });
  test('should correctly render icon with specified width', function () {
    var width = 17;
    var wrapper = getWrapper({
      width: width
    });
    expect(wrapper.prop('width')).toEqual(width);
  });
});