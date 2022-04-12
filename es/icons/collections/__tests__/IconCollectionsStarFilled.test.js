import React from 'react';
import { shallow } from 'enzyme';
import IconCollectionsStarFilled from '../IconCollectionsStarFilled';
describe('icons/collections/IconCollectionsStarFilled', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(IconCollectionsStarFilled, props));
  };

  test('should correctly render default icon', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
});