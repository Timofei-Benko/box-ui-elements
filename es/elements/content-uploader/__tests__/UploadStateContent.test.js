function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { shallow } from 'enzyme';
import UploadStateContent from '../UploadStateContent';
describe('elements/content-uploader/UploadStateContent', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(UploadStateContent, _extends({
      fileInputLabel: "file",
      folderInputLabel: "folder"
    }, props)));
  };

  test('should render correctly when both folder and file inputs are available', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should render correctly when only file input is available', function () {
    var wrapper = getWrapper({
      folderInputLabel: undefined
    });
    expect(wrapper).toMatchSnapshot();
  });
});