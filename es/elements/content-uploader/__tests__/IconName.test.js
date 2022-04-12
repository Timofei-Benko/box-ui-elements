function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { shallow } from 'enzyme';
import IconName from '../IconName';
import { STATUS_ERROR, STATUS_IN_PROGRESS } from '../../../constants';
describe('elements/content-uploader/IconName', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(IconName, _extends({
      extension: "pdf",
      name: "hi"
    }, props)));
  };

  test('should render file IconName correctly', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should render folder IconName correctly', function () {
    var wrapper = getWrapper({
      isFolder: true
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render file IconName with alert badge correctly', function () {
    var wrapper = getWrapper({
      isResumableUploadsEnabled: true,
      status: STATUS_ERROR
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render folder IconName with alert badge correctly', function () {
    var wrapper = getWrapper({
      isFolder: true,
      isResumableUploadsEnabled: true,
      status: STATUS_ERROR
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should not render alert badge on file IconName when not in error state', function () {
    var wrapper = getWrapper({
      isResumableUploadsEnabled: true,
      status: STATUS_IN_PROGRESS
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should not render alert badge on folder IconName when not in error state', function () {
    var wrapper = getWrapper({
      isFolder: true,
      isResumableUploadsEnabled: true,
      status: STATUS_IN_PROGRESS
    });
    expect(wrapper).toMatchSnapshot();
  });
});