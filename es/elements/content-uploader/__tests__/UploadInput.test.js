function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import noop from 'lodash/noop';
import { shallow } from 'enzyme';
import UploadInput from '../UploadInput';
describe('elements/content-uploader/UploadInput', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(UploadInput, _extends({
      handleChange: noop
    }, props)));
  };

  test('should render correctly when inputLabel is available', function () {
    var wrapper = getWrapper({
      inputLabelClass: 'inputLabelClass',
      inputLabel: 'yo'
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render correctly when inputLabel is not available', function () {
    var wrapper = getWrapper({});
    expect(wrapper).toMatchSnapshot();
  });
  test('should render correctly when isFolderUpload is true', function () {
    var wrapper = getWrapper({
      inputLabel: 'yo',
      isFolderUpload: true
    });
    expect(wrapper).toMatchSnapshot();
  });
});