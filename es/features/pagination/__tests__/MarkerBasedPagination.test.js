function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        hasNextMarker | hasPrevMarker\n        ", "      | ", "\n        ", "      | ", "\n        ", "       | ", "\n        ", "       | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import { mount } from 'enzyme';
import MarkerBasedPagination from '../MarkerBasedPagination';
describe('elements/Pagination/MarkerBasedPagination', function () {
  test.each(_templateObject(), false, false, false, true, true, false, true, true)('should render properly with offset when hasNextMarker is $hasNextMarker and hasPrevMarker is $hasPrevMarker', function (_ref) {
    var hasNextMarker = _ref.hasNextMarker,
        hasPrevMarker = _ref.hasPrevMarker;
    var onMarkerBasedPageChange = jest.fn();
    var wrapper = mount(React.createElement(MarkerBasedPagination, {
      hasNextMarker: hasNextMarker,
      hasPrevMarker: hasPrevMarker,
      onMarkerBasedPageChange: onMarkerBasedPageChange
    }));
    expect(wrapper).toMatchSnapshot();
  });
  describe('change handler', function () {
    test('should go one page forward on navigating to next page', function () {
      var onMarkerBasedPageChange = jest.fn();
      var wrapper = mount(React.createElement(MarkerBasedPagination, {
        hasNextMarker: true,
        hasPrevMarker: true,
        onMarkerBasedPageChange: onMarkerBasedPageChange
      }));
      var buttons = wrapper.find('.btn');
      var nextButton = buttons.at(1);
      nextButton.simulate('click');
      expect(onMarkerBasedPageChange).toBeCalledWith(1);
    });
    test('should go back one page on navigating to previous page', function () {
      var onMarkerBasedPageChange = jest.fn();
      var wrapper = mount(React.createElement(MarkerBasedPagination, {
        hasNextMarker: true,
        hasPrevMarker: true,
        onMarkerBasedPageChange: onMarkerBasedPageChange
      }));
      var buttons = wrapper.find('.btn');
      var prevButton = buttons.at(0);
      prevButton.simulate('click');
      expect(onMarkerBasedPageChange).toBeCalledWith(-1);
    });
  });
});