import * as React from 'react';
import { shallow } from 'enzyme';
import ContentGhost from '../ContentGhost';

var getWrapper = function getWrapper() {
  return shallow(React.createElement(ContentGhost, null));
};

describe('components/message-center/components/templates/common/ContentGhost', function () {
  test('should render correctly', function () {
    expect(getWrapper()).toMatchSnapshot();
  });
});