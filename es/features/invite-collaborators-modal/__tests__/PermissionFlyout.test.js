function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { PermissionFlyoutBase as PermissionFlyout } from '../PermissionFlyout';
describe('features/invite-collaborators-modal/PermissionFlyout', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(PermissionFlyout, _extends({
      intl: {
        formatMessage: jest.fn(function () {
          return 'message';
        })
      }
    }, props)));
  };

  describe('render()', function () {
    test('should render a Flyout and an Overlay', function () {
      var wrapper = getWrapper();
      var overlay = wrapper.find('Overlay');
      var icon = wrapper.find('IconInfo');
      expect(wrapper.is('Flyout')).toBe(true);
      expect(wrapper.prop('position')).toEqual('top-center');
      expect(overlay.length).toBe(1);
      expect(icon.length).toBe(1);
    });
    test('should render a Table Properly', function () {
      var wrapper = getWrapper();
      var table = wrapper.find('Table');
      var tableHeader = wrapper.find('TableHeader');
      var tableBody = wrapper.find('TableBody');
      var tableRow = wrapper.find('TableRow');
      var tableHeaderCell = wrapper.find('TableHeaderCell');
      expect(table.length).toBe(1);
      expect(tableHeader.length).toBe(1);
      expect(tableBody.length).toBe(1);
      expect(tableRow.length).toBe(7);
      expect(tableHeaderCell.length).toBe(8);
    });
  });
});