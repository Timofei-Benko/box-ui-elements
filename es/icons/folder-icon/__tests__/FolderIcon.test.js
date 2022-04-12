import React from 'react';
import { shallow } from 'enzyme';
import FolderIcon from '../FolderIcon';
describe('icons/folder-icon/FolderIcon', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(FolderIcon, props));
  };

  test('should render default 32 icon when no props are defined', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should render and external icon when isExternal is true', function () {
    var wrapper = getWrapper({
      isExternal: true
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render and collab icon when isCollab is true', function () {
    var wrapper = getWrapper({
      isCollab: true
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render and external icon when isExternal and isCollab is true', function () {
    var wrapper = getWrapper({
      isCollab: true,
      isExternal: true
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render 64 icon when dimension is defined', function () {
    var wrapper = getWrapper({
      dimension: 64
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render title when title is defined', function () {
    var wrapper = getWrapper({
      title: 'title'
    });
    expect(wrapper).toMatchSnapshot();
  });
});