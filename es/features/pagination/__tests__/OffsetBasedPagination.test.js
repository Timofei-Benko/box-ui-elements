function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            offset | expected\n            ", "  | ", "\n            ", "   | ", "\n            ", "  | ", "\n            ", "  | ", "\n            ", "  | ", "\n            ", " | ", "\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            offset | expected\n            ", "  | ", "\n            ", "   | ", "\n            ", "  | ", "\n            ", "  | ", "\n            ", "  | ", "\n            ", " | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import { mount } from 'enzyme';
import OffsetBasedPagination from '../OffsetBasedPagination';
describe('elements/Pagination/OffsetBasedPagination', function () {
  test.each([-5, 0, 10, 20, 75, 100])('should render properly with offset %i', function (offset) {
    var wrapper = mount(React.createElement(OffsetBasedPagination, {
      offset: offset,
      onOffsetChange: jest.fn(),
      pageSize: 20,
      totalCount: 100
    }));
    expect(wrapper).toMatchSnapshot();
  });
  describe('change handler', function () {
    test.each(_templateObject(), -5, 0, 0, 0, 10, 0, 20, 0, 75, 40, 100, 60)('should return new offset of $expected when previous is clicked with a starting offset of $offset', function (_ref) {
      var offset = _ref.offset,
          expected = _ref.expected;
      var onOffsetChange = jest.fn();
      var wrapper = mount(React.createElement(OffsetBasedPagination, {
        offset: offset,
        onOffsetChange: onOffsetChange,
        pageSize: 20,
        totalCount: 100
      }));
      var buttons = wrapper.find('.btn');
      var prevButton = buttons.at(1);
      prevButton.simulate('click');

      if (prevButton.hasClass('is-disabled')) {
        expect(onOffsetChange).toHaveBeenCalledTimes(0);
      } else {
        expect(onOffsetChange).toBeCalledWith(expected);
      }
    });
    test.each(_templateObject2(), -5, 20, 0, 20, 10, 20, 20, 40, 75, 80, 100, 80)('should return new offset of $expected when next is clicked with a starting offset of $offset', function (_ref2) {
      var offset = _ref2.offset,
          expected = _ref2.expected;
      var onOffsetChange = jest.fn();
      var wrapper = mount(React.createElement(OffsetBasedPagination, {
        offset: offset,
        onOffsetChange: onOffsetChange,
        pageSize: 20,
        totalCount: 100
      }));
      var buttons = wrapper.find('.btn');
      var nextButton = buttons.at(2);
      nextButton.simulate('click');

      if (nextButton.hasClass('is-disabled')) {
        expect(onOffsetChange).toHaveBeenCalledTimes(0);
      } else {
        expect(onOffsetChange).toBeCalledWith(expected);
      }
    });
  });
});