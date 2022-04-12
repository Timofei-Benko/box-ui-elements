import React from 'react';
import { shallow } from 'enzyme';
import CheckboxTooltip from '../CheckboxTooltip';
describe('components/checkbox/CheckboxTooltip', function () {
  var wrapper;
  var tooltip;
  beforeEach(function () {
    wrapper = shallow(React.createElement(CheckboxTooltip, {
      tooltip: "foobar"
    }));
    tooltip = wrapper.find('Tooltip');
  });
  test('should correctly render default component', function () {
    expect(wrapper.find('.checkbox-tooltip-wrapper').length).toBeTruthy();
    expect(tooltip.length).toBeTruthy();
  });
});