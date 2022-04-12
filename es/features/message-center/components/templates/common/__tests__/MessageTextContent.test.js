function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { shallow } from 'enzyme';
import MessageTextContent from '../MessageTextContent';
var defaultProps = {
  title: 'This is a test title'
};

var getWrapper = function getWrapper(props) {
  return shallow(React.createElement(MessageTextContent, _extends({}, defaultProps, props)));
};

describe('components/message-center/components/templates/common/MessageTextContent', function () {
  test('should render correctly without body prop', function () {
    expect(getWrapper()).toMatchSnapshot();
  });
  test('should render correctly with body prop', function () {
    expect(getWrapper({
      body: '<em>test</em>'
    })).toMatchSnapshot();
  });
});