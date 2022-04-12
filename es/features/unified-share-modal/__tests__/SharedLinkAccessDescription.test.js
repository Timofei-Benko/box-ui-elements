import React from 'react';
import { ANYONE_WITH_LINK, ANYONE_IN_COMPANY, PEOPLE_IN_ITEM } from '../constants';
import SharedLinkAccessDescription from '../SharedLinkAccessDescription';
describe('features/unified-share-modal/SharedLinkAccessDescription', function () {
  describe('people with link', function () {
    [{
      itemType: 'file'
    }, {
      itemType: 'folder'
    }].forEach(function (_ref) {
      var itemType = _ref.itemType;
      test('should render correct menu', function () {
        var sharedLinkPermissionMenu = shallow(React.createElement(SharedLinkAccessDescription, {
          accessLevel: ANYONE_WITH_LINK,
          enterpriseName: "Box",
          itemType: itemType
        }));
        expect(sharedLinkPermissionMenu).toMatchSnapshot();
      });
    });
  });
  describe('people in company', function () {
    [{
      itemType: 'file',
      name: ''
    }, {
      itemType: 'file',
      name: 'Box'
    }, {
      itemType: 'folder',
      name: ''
    }, {
      itemType: 'folder',
      name: 'Box'
    }].forEach(function (_ref2) {
      var itemType = _ref2.itemType,
          name = _ref2.name;
      test('should render correct menu', function () {
        var sharedLinkPermissionMenu = shallow(React.createElement(SharedLinkAccessDescription, {
          accessLevel: ANYONE_IN_COMPANY,
          enterpriseName: name,
          itemType: itemType
        }));
        expect(sharedLinkPermissionMenu).toMatchSnapshot();
      });
    });
  });
  describe('people in item', function () {
    [{
      itemType: 'file'
    }, {
      itemType: 'folder'
    }].forEach(function (_ref3) {
      var itemType = _ref3.itemType;
      test('should render correct menu', function () {
        var sharedLinkPermissionMenu = shallow(React.createElement(SharedLinkAccessDescription, {
          accessLevel: PEOPLE_IN_ITEM,
          enterpriseName: "Box",
          itemType: itemType
        }));
        expect(sharedLinkPermissionMenu).toMatchSnapshot();
      });
    });
  });
});