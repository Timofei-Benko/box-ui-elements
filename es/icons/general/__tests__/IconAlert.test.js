import React from 'react';
import { shallow } from 'enzyme';
import IconAlert from '../IconAlert';
describe('icons/general/IconAlert', function () {
  test('should correctly render default alert icon', function () {
    var wrapper = shallow(React.createElement(IconAlert, null));
    expect(wrapper.hasClass('icon-alert')).toBe(true);
  });
});