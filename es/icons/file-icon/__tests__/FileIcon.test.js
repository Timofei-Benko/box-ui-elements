import React from 'react';
import { shallow } from 'enzyme';
import FileIcon from '../FileIcon';
describe('icons/file-icon/FileIcon', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(FileIcon, props));
  };

  test('should render default 32 icon when no extension and dimension is defined', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test.each(['doc', 'docx', 'docm', 'gdoc', 'gsheet', 'gslides', 'gslide', 'key', 'numbers', 'pages', 'ppt', 'pptx', 'pptm', 'xls', 'xlsm', 'xlsb', 'zip', 'heic', 'heif', 'HEIC', 'HEIF', 'xbd', 'xdw'])("should render the expected icon when %s is defined", function (extension) {
    var wrapper = getWrapper({
      extension: extension
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