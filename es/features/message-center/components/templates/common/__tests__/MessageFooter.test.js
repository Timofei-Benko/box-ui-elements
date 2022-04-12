function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { shallow } from 'enzyme';
import MessageFooter from '../MessageFooter';
var defaultProps = {
  date: new Date(1600297599505),
  name: 'testmessagename'
};

var getWrapper = function getWrapper(props) {
  return shallow(React.createElement(MessageFooter, _extends({}, defaultProps, props)));
};

describe('components/message-center/components/templates/common/MessageFooter', function () {
  test('should render correctly if no action item present', function () {
    expect(getWrapper()).toMatchSnapshot();
  });
  test('should render correctly if action item provided', function () {
    expect(getWrapper({
      actionItem: {
        label: 'label',
        actions: [{
          type: 'openURL',
          url: 'testURL',
          target: '_self'
        }]
      }
    })).toMatchSnapshot();
  });
});