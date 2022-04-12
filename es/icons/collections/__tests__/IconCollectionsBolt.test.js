import React from 'react';
import { shallow } from 'enzyme';
import IconCollectionsBolt from '../IconCollectionsBolt';
describe('icons/collections/IconCollectionsBolt', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(IconCollectionsBolt, props));
  };

  test('should correctly render default icon', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
});