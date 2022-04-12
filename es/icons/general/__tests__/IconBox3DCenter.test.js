import React from 'react';
import { shallow } from 'enzyme';
import IconBox3DCenter from '../IconBox3DCenter';
describe('icons/general/IconBox3DCenter', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(IconBox3DCenter, props));
  };

  it('should correctly render icon with default values', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  it('should correctly render icon with all props specified', function () {
    var wrapper = getWrapper({
      className: 'test',
      color: '#987654',
      height: 100,
      title: 'title',
      width: 200
    });
    expect(wrapper).toMatchSnapshot();
  });
});