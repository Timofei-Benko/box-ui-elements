function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { ContentExplorerSelectAllBase as ContentExplorerSelectAll } from '../ContentExplorerSelectAll';
describe('features/content-explorer/content-explorer/ContentExplorerSelectAll', function () {
  var renderComponent = function renderComponent(props) {
    return shallow(React.createElement(ContentExplorerSelectAll, _extends({
      intl: {
        formatMessage: function formatMessage() {},
        formatNumber: function formatNumber(x) {
          return x;
        }
      }
    }, props)));
  };

  describe('render()', function () {
    test('should render the default component', function () {
      var wrapper = renderComponent();
      var handleSelectAllClick = jest.fn();
      var isSelectAllChecked = true;
      wrapper.setProps({
        handleSelectAllClick: handleSelectAllClick,
        isSelectAllChecked: isSelectAllChecked
      });
      var checkbox = wrapper.find('Checkbox');
      expect(wrapper.is('div')).toBe(true);
      expect(wrapper.find('Checkbox').prop('onChange')).toEqual(handleSelectAllClick);
      expect(checkbox.prop('isChecked')).toEqual(isSelectAllChecked);
    });
    test('should render checkbox label correctly', function () {
      var wrapper = renderComponent();
      expect(wrapper.find('label').at(1).find('FormattedMessage').props().id).toEqual('boxui.contentExplorer.selectAll');
    });
    test('should render items count correctly when result !== 1', function () {
      var numTotalItems = 12345;
      var wrapper = renderComponent({
        numTotalItems: numTotalItems
      });
      var itemsCountLabel = wrapper.find('label').at(0).find('FormattedMessage');
      expect(itemsCountLabel.props().id).toEqual('boxui.contentExplorer.results');
      expect(itemsCountLabel.props().values.itemsCount).toEqual(numTotalItems);
    });
    test('should render items count correctly when result === 1', function () {
      var numTotalItems = 1;
      var wrapper = renderComponent({
        numTotalItems: numTotalItems
      });
      var itemsCountLabel = wrapper.find('label').at(0).find('FormattedMessage');
      expect(itemsCountLabel.props().id).toEqual('boxui.contentExplorer.result');
      expect(itemsCountLabel.props().values.itemsCount).toEqual(numTotalItems);
    });
  });
});