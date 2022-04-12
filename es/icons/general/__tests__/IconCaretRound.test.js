import React from 'react';
import { shallow } from 'enzyme';
import IconCaretRound from '../IconCaretRound';
describe('icons/general/IconCaretRound', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(IconCaretRound, props));
  };

  test('should correctly render default icon', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified props', function () {
    var wrapper = getWrapper({
      className: 'test',
      color: '#444',
      height: 100,
      title: 'title',
      width: 200
    });
    expect(wrapper).toMatchSnapshot();
  });
});