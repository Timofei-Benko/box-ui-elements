import React from 'react';
import { shallow } from 'enzyme';
import FileCircleIllustration from '../FileCircleIllustration';
describe('icons/illustrations/FileCircleIllustration', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(FileCircleIllustration, props));
  };

  test('should correctly render default component', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render component with specified props', function () {
    var wrapper = getWrapper({
      className: 'test',
      height: 400,
      title: 'title',
      width: 400
    });
    expect(wrapper).toMatchSnapshot();
  });
});