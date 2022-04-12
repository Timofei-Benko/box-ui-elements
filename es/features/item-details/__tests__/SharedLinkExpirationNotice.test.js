function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { FormattedDate } from 'react-intl';
import SharedLinkExpirationNotice from '../SharedLinkExpirationNotice';
describe('features/item-details/SharedLinkExpirationNotice', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(SharedLinkExpirationNotice, _extends({
      expiration: "May 27, 2018"
    }, props)));
  };

  test('should render default component', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should accept node as expiration', function () {
    var wrapper = getWrapper({
      expiration: React.createElement(FormattedDate, {
        value: "1517533810845"
      })
    });
    expect(wrapper).toMatchSnapshot();
  });
});