import React from 'react';
import { shallow } from 'enzyme';
import IconDocIllustration from '../IconDocIllustration';
describe('icons/general/IconShield2', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(IconDocIllustration, props));
  };

  test('should correctly render default icon', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified props', function () {
    var wrapper = getWrapper({
      className: 'test',
      height: 150,
      title: 'title',
      width: 150
    });
    expect(wrapper).toMatchSnapshot();
  });
});