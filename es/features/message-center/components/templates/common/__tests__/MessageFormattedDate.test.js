function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { shallow } from 'enzyme';
import MessageFormattedDate from '../MessageFormattedDate';
var defaultProps = {
  date: new Date(1600297599505)
};

var getWrapper = function getWrapper(props) {
  return shallow(React.createElement(MessageFormattedDate, _extends({}, defaultProps, props)));
};

describe('components/message-center/components/templates/common/MessageFormattedDate', function () {
  test('should render date short month short date, year', function () {
    expect(getWrapper()).toMatchSnapshot();
  });
});