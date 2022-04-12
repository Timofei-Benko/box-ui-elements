import React from 'react';
import { shallow } from 'enzyme';
import IconInformation from '../IconInformation';
describe('icons/general/IconInformation', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(IconInformation, props));
  };

  test('should correctly render default icon', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified props', function () {
    var wrapper = getWrapper({
      className: 'test',
      color: '#000',
      height: 150,
      title: 'title',
      width: 160
    });
    expect(wrapper).toMatchSnapshot();
  });
});