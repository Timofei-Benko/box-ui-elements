function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import noop from 'lodash/noop';
import { shallow } from 'enzyme';
import OverallUploadsProgressBar from '../OverallUploadsProgressBar';
import { VIEW_UPLOAD_IN_PROGRESS, VIEW_UPLOAD_SUCCESS, VIEW_ERROR, VIEW_UPLOAD_EMPTY } from '../../../constants';
describe('elements/content-uploader/OverallUploadsProgressBar', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(OverallUploadsProgressBar, _extends({
      isDragging: false,
      isExpanded: true,
      isVisible: true,
      onClick: noop,
      onKeyDown: noop,
      percent: 2,
      view: VIEW_UPLOAD_EMPTY
    }, props)));
  };

  test('should render correctly when view is VIEW_UPLOAD_EMPTY', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should render correctly when view is VIEW_UPLOAD_SUCCESS', function () {
    var wrapper = getWrapper({
      view: VIEW_UPLOAD_SUCCESS
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render correctly when view is VIEW_ERROR', function () {
    var wrapper = getWrapper({
      view: VIEW_ERROR
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render correctly when view is VIEW_UPLOAD_IN_PROGRESS', function () {
    var wrapper = getWrapper({
      view: VIEW_UPLOAD_IN_PROGRESS
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render correctly when isVisible is false', function () {
    var wrapper = getWrapper({
      isVisible: false,
      view: VIEW_UPLOAD_SUCCESS
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render correctly when isDragging is true', function () {
    var wrapper = getWrapper({
      view: VIEW_UPLOAD_SUCCESS,
      isDragging: true
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render correctly when isResumeVisible is false', function () {
    var wrapper = getWrapper({
      isResumeVisible: false
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render correctly when isResumeVisible is true and hasMultipleFailedUploads is false', function () {
    var wrapper = getWrapper({
      isResumeVisible: true,
      hasMultipleFailedUploads: false
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render correctly when isResumeVisible is true and hasMultipleFailedUploads is true', function () {
    var wrapper = getWrapper({
      isResumeVisible: true,
      hasMultipleFailedUploads: true
    });
    expect(wrapper).toMatchSnapshot();
  });
});