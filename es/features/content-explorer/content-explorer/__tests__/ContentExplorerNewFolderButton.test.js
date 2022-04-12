function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import sinon from 'sinon';
import ContentExplorerModes from '../../modes';
import { ContentExplorerNewFolderButtonBase as ContentExplorerNewFolderButton } from '../ContentExplorerNewFolderButton';
describe('features/content-explorer/content-explorer/ContentExplorerNewFolderButton', function () {
  var sandbox = sinon.sandbox.create();

  var renderComponent = function renderComponent(props) {
    return shallow(React.createElement(ContentExplorerNewFolderButton, _extends({
      intl: {
        formatMessage: function formatMessage() {
          return 'message';
        }
      }
    }, props)));
  };

  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  describe('render()', function () {
    test.each([ContentExplorerModes.COPY, ContentExplorerModes.MOVE_COPY, ContentExplorerModes.MULTI_SELECT, ContentExplorerModes.SELECT_FOLDER])('should render the default component when mode is %s', function (contentExplorerMode) {
      var wrapper = renderComponent({
        contentExplorerMode: contentExplorerMode
      });
      expect(wrapper.hasClass('content-explorer-new-folder-button')).toBe(true);
      expect(wrapper.prop('isDisabled')).toBe(false);
      expect(wrapper.prop('title')).toEqual('');
    });
    test('should render nothing when contentExplorerMode does not allow creating folders', function () {
      var wrapper = renderComponent({
        contentExplorerMode: 'selectFile'
      });
      expect(wrapper.isEmptyRender()).toBe(true);
    });
    test('should render the button disabled when isDisabled is true', function () {
      var wrapper = renderComponent({
        contentExplorerMode: 'moveCopy',
        isDisabled: true
      });
      expect(wrapper.prop('isDisabled')).toBe(true);
    });
    test('should render with a tooltip when isCreateNewFolderAllowed is false', function () {
      var wrapper = renderComponent({
        contentExplorerMode: 'moveCopy',
        isCreateNewFolderAllowed: false
      });
      expect(wrapper.prop('title')).toBeTruthy();
    });
  });
  describe('onClick', function () {
    test('should call onClick when clicked', function () {
      var onClickSpy = sandbox.spy();
      var wrapper = renderComponent({
        contentExplorerMode: 'moveCopy',
        onClick: onClickSpy
      });
      wrapper.simulate('click');
      expect(onClickSpy.calledOnce).toBe(true);
    });
  });
});