function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import noop from 'lodash/noop';
import { shallow } from 'enzyme';
import UploadState from '../UploadState';
import { VIEW_ERROR, VIEW_UPLOAD_EMPTY, VIEW_UPLOAD_IN_PROGRESS, VIEW_UPLOAD_SUCCESS } from '../../../constants';
describe('elements/content-uploader/UploadState', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(UploadState, _objectSpread({}, {
      canDrop: false,
      hasItems: false,
      isOver: false,
      isTouch: false,
      view: VIEW_ERROR,
      onSelect: noop,
      isFolderUploadEnabled: false
    }, {}, props)));
  };

  test('should render VIEW_ERROR correctly', function () {
    var wrapper = getWrapper({
      view: VIEW_ERROR
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render VIEW_UPLOAD_EMPTY correctly', function () {
    var wrapper = getWrapper({
      view: VIEW_UPLOAD_EMPTY
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render VIEW_UPLOAD_EMPTY correctly when folder upload is enabled', function () {
    var wrapper = getWrapper({
      view: VIEW_UPLOAD_EMPTY,
      isFolderUploadEnabled: true
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render VIEW_UPLOAD_IN_PROGRESS correctly', function () {
    var wrapper = getWrapper({
      view: VIEW_UPLOAD_IN_PROGRESS
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render VIEW_UPLOAD_SUCCESS correctly', function () {
    var wrapper = getWrapper({
      view: VIEW_UPLOAD_SUCCESS
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render VIEW_UPLOAD_SUCCESS correctly  when folder upload is enabled', function () {
    var wrapper = getWrapper({
      view: VIEW_UPLOAD_SUCCESS,
      isFolderUploadEnabled: true
    });
    expect(wrapper).toMatchSnapshot();
  });
});