import React from 'react';
import { shallow } from 'enzyme';
import IconAlertDefault from '../IconAlertDefault';
describe('icons/general/IconAlertDefault', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(IconAlertDefault, props));
  };

  test('should correctly render default icon', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with additional props', function () {
    var wrapper = getWrapper({
      className: 'class',
      height: 100,
      title: 'title',
      width: 200
    });
    expect(wrapper).toMatchSnapshot();
  });
});