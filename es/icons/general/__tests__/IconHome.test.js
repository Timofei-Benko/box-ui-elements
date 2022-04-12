import React from 'react';
import { shallow } from 'enzyme';
import IconHome from '../IconHome';
describe('icons/general/IconHome', function () {
  test('should correctly render default home icon', function () {
    var wrapper = shallow(React.createElement(IconHome, null));
    expect(wrapper.hasClass('icon-home')).toBe(true);
  });
  test('should correctly render IconHome specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconHome, {
      color: color
    }));
    expect(wrapper.find('path').prop('fill')).toEqual(color);
  });
});