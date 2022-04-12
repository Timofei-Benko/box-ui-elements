function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import VersionHistoryLink from '../VersionHistoryLink';
describe('features/item-details/VersionHistoryLink', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(VersionHistoryLink, _extends({
      versionCount: 3
    }, props)));
  };

  test('should render the formatted message', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should render with PlainButton when onClick is passed, and render additional props', function () {
    var wrapper = getWrapper({
      className: 'test',
      onClick: function onClick() {},
      'data-resin-target': 'versionhistory'
    });
    expect(wrapper).toMatchSnapshot();
  });
});