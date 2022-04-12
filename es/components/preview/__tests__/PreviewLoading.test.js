function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            extension | theme\n            ", "  | ", "\n            ", "  | ", "\n            ", "  | ", "\n            ", "  | ", "\n            ", "  | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import { shallow } from 'enzyme';
import { PreviewLoading, PreviewLoadingRing, getIcon } from '..';
import { bdlBoxBlue } from '../../../styles/variables';

var getWrapper = function getWrapper() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return shallow(React.createElement(PreviewLoading, props));
};

describe('components/preview/PreviewLoading', function () {
  describe('render()', function () {
    test('should get the color and icon based on the provided extension', function () {
      var PDFIcon = getIcon('pdf');
      var wrapper = getWrapper({
        extension: 'pdf'
      });
      expect(wrapper.children().type()).toEqual(PDFIcon);
      expect(wrapper.find(PreviewLoadingRing).prop('color')).toEqual('#D0021B');
    });
    test('should get a default color and icon if no extension is provided', function () {
      var DefaultIcon = getIcon();
      var wrapper = getWrapper();
      expect(wrapper.children().type()).toEqual(DefaultIcon);
      expect(wrapper.find(PreviewLoadingRing).prop('color')).toEqual(bdlBoxBlue);
    });
    test.each(_templateObject(), 'doc', 'light', 'pdf', 'light', 'mp3', 'light', 'mov', 'dark', 'mp4', 'dark')('should set its theme based on the icon for its extension', function (_ref) {
      var extension = _ref.extension,
          theme = _ref.theme;
      var wrapper = getWrapper({
        extension: extension
      });
      expect(wrapper.prop('theme')).toEqual(theme);
    });
  });
});