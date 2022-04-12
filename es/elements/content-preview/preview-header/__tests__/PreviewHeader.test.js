import React from 'react';
import { shallow } from 'enzyme';
import PreviewHeader from '..';
describe('elements/content-preview/preview-header/PreviewHeader', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(PreviewHeader, props)).dive();
  };

  it('should render only a logo if logoUrl is provided', function () {
    var wrapper = getWrapper({
      logoUrl: 'box'
    });
    expect(wrapper.exists('FileInfo')).toBe(false);
    expect(wrapper.find('Logo').prop('url')).toBe('box');
  });
  it('should render file info by default if logoUrl is not provided', function () {
    var wrapper = getWrapper();
    expect(wrapper.exists('Logo')).toBe(false);
    expect(wrapper.exists('FileInfo')).toBe(true);
  });
  test.each([[true, true], [false, false]])("print button should be %s if canPrint is %s ", function (expected, value) {
    var wrapper = getWrapper({
      canPrint: value
    });
    expect(wrapper.exists('[title="Print"]')).toBe(expected);
  });
});