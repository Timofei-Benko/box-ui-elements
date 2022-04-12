import React from 'react';
import { shallow } from 'enzyme';
import IconFolderTree from '../IconFolderTree';
describe('icons/general/IconFolderTree', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconFolderTree, null));
    expect(wrapper.hasClass('bdl-IconFolderTree')).toEqual(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconFolderTree, {
      color: color
    }));
    expect(wrapper.find('path').prop('fill')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 20;
    var height = 20;
    var wrapper = shallow(React.createElement(IconFolderTree, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'Folder tree';
    var wrapper = shallow(React.createElement(IconFolderTree, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});