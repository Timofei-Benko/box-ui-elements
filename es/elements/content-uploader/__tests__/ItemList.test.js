function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { mount } from 'enzyme';
import { ERROR_CODE_UPLOAD_FILE_SIZE_LIMIT_EXCEEDED, STATUS_COMPLETE, STATUS_ERROR } from '../../../constants';
import ItemList from '../ItemList';
jest.mock('@box/react-virtualized/dist/es/AutoSizer', function () {
  return function (_ref) {
    var children = _ref.children;
    return children({
      height: 600,
      width: 600
    });
  };
});
describe('elements/content-uploader/ItemList', function () {
  var renderComponent = function renderComponent(props) {
    return mount(React.createElement(ItemList, _extends({
      items: [],
      onClick: function onClick() {}
    }, props)));
  };

  describe('render()', function () {
    test('should render default component', function () {
      var wrapper = renderComponent();
      expect(wrapper.find('Table').length).toBe(1);
      expect(wrapper.find('Table.bcu-item-list').length).toBe(1);
    });
    test('should render component with correct number of items', function () {
      var items = [{
        id: '1',
        name: 'item1',
        status: STATUS_COMPLETE
      }, {
        id: '2',
        name: 'item2',
        status: STATUS_COMPLETE
      }, {
        id: '3',
        name: 'item3',
        status: STATUS_COMPLETE
      }];
      var wrapper = renderComponent({
        items: items
      });
      expect(wrapper.find('div.bcu-item-row').length).toBe(3);
      var actionColumnStyle = wrapper.find('.bcu-item-list-action-column').first().prop('style');
      expect(actionColumnStyle.flex).toEqual('0 0 25px');
    });
    test('should render action column with correct width for upgrade cta', function () {
      var items = [{
        id: '1',
        name: 'item1',
        status: STATUS_ERROR,
        code: ERROR_CODE_UPLOAD_FILE_SIZE_LIMIT_EXCEEDED
      }];
      var wrapper = renderComponent({
        items: items,
        onUpgradeCTAClick: function onUpgradeCTAClick() {}
      });
      expect(wrapper.find('div.bcu-item-row').length).toBe(1);
      var actionColumnStyle = wrapper.find('.bcu-item-list-action-column').prop('style');
      expect(actionColumnStyle.flex).toEqual('0 0 100px');
    });
  });
});