import React from 'react';
import { shallow } from 'enzyme';
import IconSmallClose from '../IconSmallClose';
describe('icons/general/IconSmallClose', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(IconSmallClose, props));
  };

  test('should correctly render default component', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render component with specified props', function () {
    var wrapper = getWrapper({
      className: 'test',
      color: '#123456',
      height: 100,
      title: 'title',
      width: 200
    });
    expect(wrapper).toMatchSnapshot();
  });
});