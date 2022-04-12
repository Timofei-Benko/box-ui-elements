function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        hasNextMarker | hasPrevMarker\n        ", "      | ", "\n        ", "      | ", "\n        ", "       | ", "\n        ", "       | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../Pagination';
describe('features/pagination/Pagination', function () {
  test.each(_templateObject(), false, false, false, true, true, false, true, true)('should render correctly depending on the props passed for offsetBased or markerBased pagination', function (_ref) {
    var hasNextMarker = _ref.hasNextMarker,
        hasPrevMarker = _ref.hasPrevMarker;
    var wrapper = shallow(React.createElement(Pagination, {
      hasNextMarker: hasNextMarker,
      hasPrevMarker: hasPrevMarker
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should render OffsetBasedPagination when no markers are provided', function () {
    var wrapper = shallow(React.createElement(Pagination, {
      offset: 0,
      onOffsetChange: function onOffsetChange() {
        return null;
      },
      pageSize: 10,
      totalCount: 100
    }));
    expect(wrapper).toMatchSnapshot();
  });
});