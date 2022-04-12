import React from 'react';
import { shallow } from 'enzyme'; // @ts-ignore flow import

import PreviewError from '../PreviewError';
import PreviewMask from '../PreviewMask';
import { PreviewLoading } from '../../../components/preview';

var getWrapper = function getWrapper() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return shallow(React.createElement(PreviewMask, props));
};

describe('elements/content-preview/PreviewMask', function () {
  describe('render()', function () {
    test('should render PreviewError if an error code is provided', function () {
      var wrapper = getWrapper({
        errorCode: 'error'
      });
      expect(wrapper.exists(PreviewError)).toBe(true);
    });
    test('should render PreviewLoading if isLoading is true', function () {
      var wrapper = getWrapper({
        isLoading: true
      });
      expect(wrapper.exists(PreviewLoading)).toBe(true);
    });
    test('should not render PreviewLoading if isLoading is true and error code is provided', function () {
      var wrapper = getWrapper({
        errorCode: 'error',
        isLoading: true
      });
      expect(wrapper.exists(PreviewLoading)).toBe(false);
    });
    test('should render nothing if error is missing and isLoading is false', function () {
      var wrapper = getWrapper();
      expect(wrapper.isEmptyRender()).toBe(true);
    });
  });
});