import React from 'react';
import { shallow } from 'enzyme';
import SandboxBanner from '../SandboxBanner';
describe('features/sandbox-banner/SandboxBanner', function () {
  test('should correctly render default element', function () {
    var children = 'foo';
    var wrapper = shallow(React.createElement(SandboxBanner, null, children));
    expect(wrapper).toMatchSnapshot();
  });
});