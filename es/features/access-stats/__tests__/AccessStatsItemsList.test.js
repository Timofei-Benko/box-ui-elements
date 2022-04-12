function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import AccessStatsItemsList from '../AccessStatsItemsList';
describe('features/access-stats/AccessStatsItemsList', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(AccessStatsItemsList, _extends({
      commentCount: 0,
      downloadCount: 0,
      editCount: 0,
      isBoxNote: false,
      previewCount: 0,
      commentStatButtonProps: {},
      downloadStatButtonProps: {},
      editStatButtonProps: {},
      previewStatButtonProps: {},
      viewStatButtonProps: {}
    }, props)));
  };

  test('should render download access stats properly when item is box notes', function () {
    var wrapper = getWrapper({
      downloadCount: 100,
      isBoxNote: true
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render view access stats properly when item is box notes', function () {
    var wrapper = getWrapper({
      previewCount: 100,
      isBoxNote: true,
      viewStatButtonProps: {
        value: 1
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render preview access stats properly when item is not box notes', function () {
    var wrapper = getWrapper({
      previewCount: 100
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render access stats list with button props', function () {
    var wrapper = getWrapper({
      commentCount: 10,
      downloadCount: 10,
      editCount: 10,
      isBoxNote: false,
      previewCount: 10,
      commentStatButtonProps: {
        comment: 1
      },
      downloadStatButtonProps: {
        download: 1
      },
      editStatButtonProps: {
        edit: 1
      },
      previewStatButtonProps: {
        preview: 1
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});