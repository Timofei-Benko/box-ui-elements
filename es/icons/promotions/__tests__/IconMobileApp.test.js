import React from 'react';
import { shallow } from 'enzyme';
import IconMobileApp from '../IconMobileApp';
describe('icons/promotions/IconMobileApp', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(IconMobileApp, props));
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