import React from 'react';
import { shallow } from 'enzyme';
import IconPhone from '../IconPhone';
describe('icons/general/IconPhone', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(IconPhone, props));
  };

  test('should correctly render default icon', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified props', function () {
    var wrapper = getWrapper({
      className: 'test',
      height: 150,
      title: 'title',
      width: 160
    });
    expect(wrapper).toMatchSnapshot();
  });
});