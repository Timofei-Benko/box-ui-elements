import React from 'react';
import { shallow } from 'enzyme';
import IconUploadSolid from '../IconUploadSolid';
describe('icons/general/IconUploadSolid', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(IconUploadSolid, props));
  };

  test('should correctly render icon with default values', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with all props specified', function () {
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