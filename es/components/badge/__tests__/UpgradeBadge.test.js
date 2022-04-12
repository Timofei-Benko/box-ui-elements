import React from 'react';
import { shallow } from 'enzyme';
import UpgradeBadge from '../UpgradeBadge';
describe('components/badge/UpgradeBadge', function () {
  test('should render a upgrade badge', function () {
    var wrapper = shallow(React.createElement(UpgradeBadge, null));
    expect(wrapper).toMatchSnapshot();
  });
});