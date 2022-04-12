function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { shallow } from 'enzyme';
import DeleteConfirmation from '../DeleteConfirmation';
import messages from '../../../comment/messages';
describe('elements/content-sidebar/ActivityFeed/common/delete-confirmation', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(DeleteConfirmation, _extends({
      isOpen: true,
      message: messages.commentDeletePrompt,
      onDeleteCancel: jest.fn(),
      onDeleteConfirm: jest.fn()
    }, props)));
  };

  describe('render()', function () {
    test('should render component', function () {
      var wrapper = getWrapper();
      expect(wrapper.find('.bcs-DeleteConfirmation-promptMessage')).toMatchSnapshot();
    });
  });
  describe('onKeyDown', function () {
    test('should handle Escape key', function () {
      var onDeleteCancelMock = jest.fn();
      var onDeleteConfirmMock = jest.fn();
      var wrapper = getWrapper({
        onDeleteCancel: onDeleteCancelMock,
        onDeleteConfirm: onDeleteConfirmMock
      });
      wrapper.simulate('keydown', {
        key: 'Escape',
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        nativeEvent: {
          stopImmediatePropagation: jest.fn()
        }
      });
      expect(onDeleteCancelMock).toBeCalled();
      expect(onDeleteConfirmMock).not.toBeCalled();
    });
  });
});