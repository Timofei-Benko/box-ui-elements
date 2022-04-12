function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            showSelectedButton | isSingleSelect | shown    | should\n            ", "           | ", "       | ", " | ", "\n            ", "           | ", "        | ", " | ", "\n            ", "            | ", "       | ", "  | ", "\n            ", "            | ", "        | ", " | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { mount } from 'enzyme';
import Footer from '../Footer';
describe('elements/content-picker/Footer', function () {
  var defaultProps = {
    children: React.createElement("div", {
      className: "footer-child"
    }),
    currentCollection: {
      id: '123',
      name: 'Folder'
    },
    hasHitSelectionLimit: false,
    isSingleSelect: false,
    onCancel: function onCancel() {},
    onChoose: function onChoose() {},
    onSelectedClick: function onSelectedClick() {},
    selectedCount: 0,
    selectedItems: []
  };

  var getWrapper = function getWrapper(props) {
    return mount(React.createElement(Footer, _extends({}, defaultProps, props)));
  };

  describe('render()', function () {
    test('should render Footer', function () {
      var wrapper = getWrapper();
      expect(wrapper.find('ButtonGroup').length).toBe(1);
      expect(wrapper.find('.footer-child').length).toBe(1);
    });
    test('should render Footer with custom action button', function () {
      var renderCustomActionButtons = jest.fn();
      var wrapper = getWrapper({
        renderCustomActionButtons: renderCustomActionButtons.mockReturnValue(React.createElement("div", {
          className: "custom-button"
        }))
      });
      expect(wrapper.find('.custom-button').length).toBe(1);
      expect(renderCustomActionButtons).toHaveBeenCalledWith({
        currentFolderId: defaultProps.currentCollection.id,
        currentFolderName: defaultProps.currentCollection.name,
        onCancel: defaultProps.onCancel,
        onChoose: defaultProps.onChoose,
        selectedCount: defaultProps.selectedCount,
        selectedItems: defaultProps.selectedItems
      });
    });
    test.each(_templateObject(), false, false, false, 'should not show selected button', false, true, false, 'should not show selected button', true, false, true, 'should show selected button', true, true, false, 'should not show selected button')('$should', function (_ref) {
      var isSingleSelect = _ref.isSingleSelect,
          shown = _ref.shown,
          showSelectedButton = _ref.showSelectedButton;
      var wrapper = getWrapper({
        isSingleSelect: isSingleSelect,
        showSelectedButton: showSelectedButton
      });
      expect(wrapper.exists('.bcp-selected')).toBe(shown);
    });
  });
});