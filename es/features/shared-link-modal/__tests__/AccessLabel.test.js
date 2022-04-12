function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import AccessLabel from '../AccessLabel';
import { PEOPLE_WITH_LINK, PEOPLE_IN_COMPANY, PEOPLE_IN_ITEM } from '../constants';
describe('features/shared-link-modal/AccessLabel', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(AccessLabel, _extends({
      accessLevel: PEOPLE_WITH_LINK,
      itemType: "folder"
    }, props)));
  };

  describe('render()', function () {
    [// People with Link
    {
      accessLevel: PEOPLE_WITH_LINK,
      enterpriseName: undefined,
      itemType: 'folder'
    }, // people in enterprise name
    {
      accessLevel: PEOPLE_IN_COMPANY,
      enterpriseName: 'Box',
      itemType: 'folder'
    }, // people in company
    {
      accessLevel: PEOPLE_IN_COMPANY,
      enterpriseName: undefined,
      itemType: 'folder'
    }, // people in folder
    {
      accessLevel: PEOPLE_IN_ITEM,
      enterpriseName: undefined,
      itemType: 'foulder'
    }, // people in file
    {
      accessLevel: PEOPLE_IN_ITEM,
      enterpriseName: undefined,
      itemType: 'file'
    }].forEach(function (_ref) {
      var accessLevel = _ref.accessLevel,
          enterpriseName = _ref.enterpriseName,
          itemType = _ref.itemType;
      test('should render correctly', function () {
        var wrapper = getWrapper({
          accessLevel: accessLevel,
          enterpriseName: enterpriseName,
          itemType: itemType
        });
        expect(wrapper).toMatchSnapshot();
      });
    });
    test('should return null when accessLevel is not recognized', function () {
      var wrapper = getWrapper({
        accessLevel: 'blah'
      });
      expect(wrapper.type()).toBeNull();
    });
  });
});