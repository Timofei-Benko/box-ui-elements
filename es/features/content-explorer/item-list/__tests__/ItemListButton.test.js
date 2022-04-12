function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import ItemListButton from '../ItemListButton';
import ContentExplorerMode from '../../modes';
describe('features/content-explorer/item-list/ItemListButton', function () {
  describe('render()', function () {
    [// nonMultiSelectMode
    {
      contentExplorerMode: ContentExplorerMode.SELECT_FILE
    }, // multiSelectMode
    {
      contentExplorerMode: ContentExplorerMode.MULTI_SELECT
    }].forEach(function (_ref) {
      var contentExplorerMode = _ref.contentExplorerMode;

      var renderComponent = function renderComponent(props) {
        return shallow(React.createElement(ItemListButton, _extends({
          contentExplorerMode: contentExplorerMode,
          id: "123",
          name: "test"
        }, props)));
      };

      var buttonType = contentExplorerMode === ContentExplorerMode.MULTI_SELECT ? 'Checkbox' : 'RadioButton';
      test('should render default component', function () {
        var wrapper = renderComponent();
        expect(wrapper.find(buttonType).length).toBe(1);
        expect(wrapper.prop('label')).toBeTruthy();
        expect(wrapper.prop('value')).toEqual('123');
      });
      test('should render component with isDisabled when specified', function () {
        var wrapper = renderComponent({
          isDisabled: true
        });
        expect(wrapper.find(buttonType).prop('isDisabled')).toBe(true);
      });
      test('should render component with isSelected when specified', function () {
        var wrapper = renderComponent({
          isSelected: true
        });

        if (contentExplorerMode === ContentExplorerMode.MULTI_SELECT) {
          expect(wrapper.find(buttonType).prop('isChecked')).toBe(true);
        } else {
          expect(wrapper.find(buttonType).prop('isSelected')).toBe(true);
        }
      });
      test('should not render component with isSelected when both isDisabled and isSelected is true', function () {
        var wrapper = renderComponent({
          isDisabled: true,
          isSelected: true
        });
        expect(wrapper.find(buttonType).prop('isDisabled')).toBe(true);

        if (contentExplorerMode === ContentExplorerMode.MULTI_SELECT) {
          expect(wrapper.find(buttonType).prop('isChecked')).toBe(false);
        } else {
          expect(wrapper.find(buttonType).prop('isSelected')).toBe(false);
        }
      });
    });
  });
});