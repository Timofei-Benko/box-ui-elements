import React from 'react';
import { shallow } from 'enzyme';
import IconGraduationHat from '../IconGraduationHat';
describe('icons/general/IconGraduationHat', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(IconGraduationHat, props));
  };

  test('should correctly render default icon', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified props', function () {
    var wrapper = getWrapper({
      className: 'test',
      height: 15,
      title: 'title',
      width: 15
    });
    expect(wrapper).toMatchSnapshot();
  });
});