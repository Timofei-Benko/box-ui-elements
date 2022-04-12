import * as React from 'react';
import { shallow } from 'enzyme';
import InfoIconWithTooltip from '../InfoIconWithTooltip';
describe('components/label/InfoIconWithTooltip', function () {
  var defaultProps = {
    className: 'test-class',
    iconProps: {
      a: 'a',
      b: 'b',
      c: 'c'
    },
    tooltipText: 'I am a tooltip'
  };
  test('should render correctly', function () {
    var wrapper = shallow(React.createElement(InfoIconWithTooltip, defaultProps));
    expect(wrapper).toMatchSnapshot();
  });
});