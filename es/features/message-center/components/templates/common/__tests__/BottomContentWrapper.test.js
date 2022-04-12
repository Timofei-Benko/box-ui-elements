import * as React from 'react';
import { shallow } from 'enzyme';
import BottomContentWrapper from '../BottomContentWrapper';

var getWrapper = function getWrapper() {
  return shallow(React.createElement(BottomContentWrapper, null, React.createElement("div", null, "foo")));
};

describe('components/message-center/components/templates/common/BottomContentWrapper', function () {
  test('should render correctly', function () {
    expect(getWrapper()).toMatchSnapshot();
  });
});