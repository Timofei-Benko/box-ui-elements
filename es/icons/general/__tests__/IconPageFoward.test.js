import React from 'react';
import { shallow } from 'enzyme';
import IconPageForward from '../IconPageForward';
describe('icons/general/IconPageForward', function () {
  test('should correctly render default paging forward icon', function () {
    var wrapper = shallow(React.createElement(IconPageForward, null));
    expect(wrapper.hasClass('icon-page-forward')).toBe(true);
  });
});