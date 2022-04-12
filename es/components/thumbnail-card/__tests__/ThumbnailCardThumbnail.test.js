function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import ThumbnailCardThumbnail from '../ThumbnailCardThumbnail';

var getWrapper = function getWrapper() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return shallow(React.createElement(ThumbnailCardThumbnail, _extends({
    thumbnail: React.createElement("div", null, "Foo Bar!")
  }, props)));
};

describe('components/thumbnail-card/ThumbnailCardThumbnail', function () {
  test('should render', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
});