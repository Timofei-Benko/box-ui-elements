import React from 'react';
import { shallow } from 'enzyme';
import IconMetadataColored from '../IconMetadataColored';
describe('icons/general/IconMetadataColored', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(IconMetadataColored, props));
  };

  test('should correctly render default icon', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified props', function () {
    var wrapper = getWrapper({
      className: 'test',
      title: 'title',
      width: 160
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with type cascade', function () {
    var wrapper = getWrapper({
      className: 'test',
      title: 'title',
      type: 'cascade',
      width: 160
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with type default', function () {
    var wrapper = getWrapper({
      className: 'test',
      title: 'title',
      type: 'default',
      width: 160
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with custom color', function () {
    var wrapper = getWrapper({
      color: '#00FF00',
      className: 'test',
      title: 'title',
      type: 'default',
      width: 160
    });
    expect(wrapper).toMatchSnapshot();
  });
});