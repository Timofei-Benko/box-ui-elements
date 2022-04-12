import React from 'react';
import { shallow } from 'enzyme';
import IconRecentFiles from '../IconRecentFiles';
describe('icons/general/IconRecentFiles', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(IconRecentFiles, props));
  };

  test('should correctly render default icon', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified props', function () {
    var className = 'fake-class';
    var height = 123;
    var title = 'Fake Title';
    var width = 987;
    var wrapper = getWrapper({
      className: className,
      height: height,
      title: title,
      width: width
    });
    expect(wrapper.hasClass("icon-recent-files ".concat(className))).toBe(true);
    expect(wrapper.props().height).toBe(height);
    expect(wrapper.props().title).toBe(title);
    expect(wrapper.props().width).toBe(width);
  });
});