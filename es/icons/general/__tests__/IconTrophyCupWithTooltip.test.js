import React from 'react';
import { shallow } from 'enzyme';
import IconTrophyCupWithTooltip from '../IconTrophyCupWithTooltip';
describe('icons/general/IconTrophyCupWithTooltip', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(IconTrophyCupWithTooltip, props));
  };

  test('should correctly render default icon', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified props', function () {
    var wrapper = getWrapper({
      className: 'test',
      height: 27,
      title: 'title',
      tooltipColor: '#6d83ff',
      tooltipText: 'text',
      width: 30
    });
    expect(wrapper).toMatchSnapshot();
  });
});