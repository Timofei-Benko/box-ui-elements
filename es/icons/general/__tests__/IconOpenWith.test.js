import React from 'react';
import { shallow } from 'enzyme';
import IconOpenWith from '../IconOpenWith';
describe('icons/general/IconOpenWith', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(IconOpenWith, props));
  };

  test('should correctly render default icon', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified props', function () {
    var wrapper = getWrapper({
      className: 'test',
      color: '#222',
      height: 150,
      title: 'title',
      width: 160
    });
    expect(wrapper).toMatchSnapshot();
  });
});