import React from 'react';
import IconReturnToAdminConsole from '../IconReturnToAdminConsole';
describe('icons/left-sidebar', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconReturnToAdminConsole, null));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified color', function () {
    var color = '#abcdef';
    var wrapper = shallow(React.createElement(IconReturnToAdminConsole, {
      color: color
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var wrapper = shallow(React.createElement(IconReturnToAdminConsole, {
      width: width
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconReturnToAdminConsole, {
      title: title
    }));
    expect(wrapper).toMatchSnapshot();
  });
});