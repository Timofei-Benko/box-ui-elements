import React from 'react';
import { shallow } from 'enzyme';
import IconAlertBlank from '../IconAlertBlank';
describe('icons/general/IconAlertBlank', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(IconAlertBlank, props));
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