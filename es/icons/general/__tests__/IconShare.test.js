import React from 'react';
import { shallow } from 'enzyme';
import IconShare from '../IconShare';
describe('icons/general/IconShare', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(IconShare, props));
  };

  test('should correctly render default icon', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with additional props', function () {
    var wrapper = getWrapper({
      className: 'class',
      color: '#000',
      height: 100,
      title: 'title',
      width: 200
    });
    expect(wrapper).toMatchSnapshot();
  });
});