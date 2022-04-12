function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import * as constants from '../constants';
import SharedLinkAccessLabel from '../SharedLinkAccessLabel';
describe('features/unified-share-modal/SharedLinkAccessLabel', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(SharedLinkAccessLabel, _extends({
      enterpriseName: "ABC, Inc.",
      isDownloadAllowed: true,
      isEditAllowed: true,
      isPreviewAllowed: true
    }, props)));
  };

  test('should render the component with default prop values', function () {
    expect(getWrapper()).toMatchSnapshot();
  });
  [{
    accessLevel: constants.ANYONE_IN_COMPANY
  }, {
    accessLevel: constants.ANYONE_WITH_LINK
  }, {
    accessLevel: constants.PEOPLE_IN_ITEM
  }].forEach(function (_ref) {
    var accessLevel = _ref.accessLevel;
    test('should respect the access level when a description is applied', function () {
      var wrapper = getWrapper({
        accessLevel: accessLevel,
        itemType: 'file',
        hasDescription: true
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should respect the access level when there is no description applied', function () {
      var wrapper = getWrapper({
        accessLevel: accessLevel,
        itemType: 'file',
        hasDescription: false
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
  test('should render without enterprise name when handling people in company', function () {
    var wrapper = getWrapper({
      accessLevel: constants.ANYONE_IN_COMPANY,
      itemType: 'file',
      enterpriseName: ''
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render with enterprise name when handling people in company', function () {
    var wrapper = getWrapper({
      accessLevel: constants.ANYONE_IN_COMPANY,
      itemType: 'file',
      enterpriseName: 'Box'
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should respect item type folder when handling people in the file', function () {
    var wrapper = getWrapper({
      accessLevel: constants.PEOPLE_IN_ITEM,
      itemType: 'file'
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should respect item type folder when handling people in the folder', function () {
    var wrapper = getWrapper({
      accessLevel: constants.PEOPLE_IN_ITEM,
      itemType: 'folder'
    });
    expect(wrapper).toMatchSnapshot();
  });
});