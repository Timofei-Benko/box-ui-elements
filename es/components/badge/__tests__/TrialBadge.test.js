import React from 'react';
import { shallow } from 'enzyme';
import TrialBadge from '../TrialBadge';
describe('components/badge/TrialBadge', function () {
  test('should render a trial badge', function () {
    var wrapper = shallow(React.createElement(TrialBadge, null));
    expect(wrapper).toMatchSnapshot();
  });
});