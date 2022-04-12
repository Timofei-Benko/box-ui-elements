import React from 'react';
import { shallow } from 'enzyme';
import IconGridView from '../IconGridView';
describe('icons/general/IconGridView', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(IconGridView, props));
  };

  test('should correctly render default icon', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified props', function () {
    var wrapper = getWrapper({
      className: 'test',
      color: '#222',
      height: 100,
      opacity: 0.2,
      title: 'title',
      width: 200
    });
    expect(wrapper).toMatchSnapshot();
  });
});