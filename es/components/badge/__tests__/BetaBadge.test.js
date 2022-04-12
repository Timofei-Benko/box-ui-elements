import React from 'react';
import { shallow } from 'enzyme';
import BetaBadge from '../BetaBadge';
describe('components/badge/BetaBadge', function () {
  test('should render a beta badge', function () {
    var wrapper = shallow(React.createElement(BetaBadge, null));
    expect(wrapper).toMatchSnapshot();
  });
});