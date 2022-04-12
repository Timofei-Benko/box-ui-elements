function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { shallow } from 'enzyme/build';
import { MenuItem } from '../../../../components/menu';
import VersionsItemAction from '../VersionsItemAction';
describe('elements/content-sidebar/versions/VersionsItemAction', function () {
  var defaultProps = {
    action: 'remove',
    children: React.createElement("div", null),
    fildId: '1234',
    isCurrent: false
  };

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(VersionsItemAction, _extends({}, defaultProps, props)));
  };

  describe('render', function () {
    test('should render the correct menu item', function () {
      var wrapper = getWrapper();
      var menuItem = wrapper.find(MenuItem);
      expect(menuItem.exists()).toBe(true);
      expect(menuItem.prop('className')).toEqual('bcs-VersionsItemAction');
      expect(menuItem.prop('data-resin-iscurrent')).toEqual(defaultProps.isCurrent);
      expect(menuItem.prop('data-resin-itemid')).toEqual(defaultProps.fileId);
      expect(menuItem.prop('data-resin-target')).toEqual(defaultProps.action);
      expect(menuItem.children()).toHaveLength(1);
      expect(wrapper).toMatchSnapshot();
    });
  });
});