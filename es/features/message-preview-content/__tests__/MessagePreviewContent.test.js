function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import MessagePreviewContent from '../MessagePreviewContent';
var defaultProps = {
  apiHost: 'https://api.box.com/',
  fileId: '89283839922',
  getToken: jest.fn(),
  sharedLink: 'https://cloud.box.com/s/asdf'
};

var getWrapper = function getWrapper(props) {
  return mount(React.createElement(MessagePreviewContent, _extends({}, defaultProps, props)));
};

describe('components/message-preview-content/MessagePreviewContent.js', function () {
  test('should hide ContentPreview behind Ghost component while loading content', function () {
    var wrapper = getWrapper();
    expect(wrapper.find('ForwardRef').first().hasClass('is-loading')).toBe(true);
    expect(wrapper.find('MessagePreviewGhost').exists()).toBe(true);
  });
  test('should show PreviewErrorNotification window on error', function () {
    var wrapper = getWrapper({
      getToken: jest.fn().mockResolvedValue('token')
    });
    var contentPreview = wrapper.find('ForwardRef').first();
    act(function () {
      contentPreview.props().onError();
    });
    wrapper.update();
    expect(wrapper.find('PreviewErrorNotification').exists()).toBe(true);
  });
  test.skip('should remove Ghost component when content is loaded', function () {
    jest.spyOn(React, 'useRef').mockImplementation(function () {
      return {
        current: {
          getViewer: function getViewer() {
            return {
              disableViewerControls: jest.fn()
            };
          }
        }
      };
    });
    var wrapper = getWrapper({
      getToken: jest.fn().mockResolvedValue('token')
    });
    var contentPreview = wrapper.find('ForwardRef').first();
    act(function () {
      contentPreview.props().onLoad();
    });
    wrapper.update();
    expect(wrapper.find('MessagePreviewGhost').exists()).toBe(false);
  });
});