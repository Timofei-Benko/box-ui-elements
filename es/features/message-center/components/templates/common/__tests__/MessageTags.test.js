function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { shallow } from 'enzyme';
import MessageTags from '../MessageTags';
var defaultProps = {
  tags: 'testTag1,testTag2'
};

var getWrapper = function getWrapper(props) {
  return shallow(React.createElement(MessageTags, _extends({}, defaultProps, props)));
};

describe('components/message-center/components/templates/common/MessageTags', function () {
  test('should render correctly', function () {
    expect(getWrapper()).toMatchSnapshot();
  });
  test('should strip out blank tags', function () {
    expect(getWrapper({
      tags: 'foo,bar,,baz'
    }).find('LabelPillText')).toHaveLength(3);
  });
});