import React from 'react';
import { shallow } from 'enzyme';
import IconPageBack from '../IconPageBack';
describe('icons/general/IconPageBack', function () {
  test('should correctly render default paging back icon', function () {
    var wrapper = shallow(React.createElement(IconPageBack, null));
    expect(wrapper.hasClass('icon-page-back')).toBe(true);
  });
});