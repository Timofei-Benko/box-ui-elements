import React from 'react';
import { shallow } from 'enzyme';
import AccessStatsEmptyState from '../AccessStatsEmptyState';
describe('icons/states/AccessStatsEmptyState', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(AccessStatsEmptyState, props));
  };

  test('should correctly render default component', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render component with specified props', function () {
    var wrapper = getWrapper({
      className: 'test',
      height: 100,
      title: 'title',
      width: 200,
      color: '#333'
    });
    expect(wrapper).toMatchSnapshot();
  });
});