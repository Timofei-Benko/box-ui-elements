import { shallow } from 'enzyme';
import React from 'react';
import PreviewTitleBodyTwoButtonsPopoutTemplate from '../PreviewTitleBodyTwoButtonsPopoutTemplate';
describe('features/in-app-messenger/contextual/templates/PreviewTitleBodyTwoButtonsPopoutTemplate', function () {
  var onAction = jest.fn();
  var paramsConfigs = {
    all: {
      params: {
        body: 'body',
        button1: {
          label: 'button1',
          actions: 'actions1'
        },
        button2: {
          label: 'button2',
          actions: 'actions2'
        },
        fileUpload: {
          fileId: '1234',
          sharedLinkUrl: 'https://shared-link.com'
        },
        templateID: 'preview-title-body-2buttons-template',
        title: 'title'
      }
    },
    missingButton2: {
      params: {
        body: 'body',
        button1: {
          label: 'button1',
          actions: 'actions1'
        },
        footnote: 'footnote',
        fileUpload: {
          fileId: '1234',
          sharedLinkUrl: 'https://shared-link.com'
        },
        templateID: 'image-title-body-2buttons-template',
        title: 'title'
      }
    }
  };

  var getWrapper = function getWrapper(params) {
    return shallow(React.createElement(PreviewTitleBodyTwoButtonsPopoutTemplate, {
      onAction: onAction,
      params: params
    }));
  };

  beforeEach(function () {});
  afterEach(function () {
    jest.resetAllMocks();
  });
  describe.each([paramsConfigs.all, paramsConfigs.missingButton2])('%o', function (_ref) {
    var params = _ref.params;
    test('renders correctly', function () {
      getWrapper(params);
    });
  });

  function checkClickElement(findElement, expectCalled) {
    var element = findElement(getWrapper(paramsConfigs.all.params));
    element.simulate('click');

    if (expectCalled) {
      var _expect;

      expect(onAction).toHaveBeenCalledTimes(1);

      for (var _len = arguments.length, expectCalledWith = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        expectCalledWith[_key - 2] = arguments[_key];
      }

      (_expect = expect(onAction)).toHaveBeenCalledWith.apply(_expect, expectCalledWith);
    } else {
      expect(onAction).toHaveBeenCalledTimes(0);
    }
  }

  test('should call onAction(button1.actions) if button1 is clicked', function () {
    return checkClickElement(function (wrapper) {
      return wrapper.find('PrimaryButton');
    }, true, 'actions1');
  });
  test('should call onAction(button2.actions) if button2 is clicked', function () {
    return checkClickElement(function (wrapper) {
      return wrapper.find('Button');
    }, true, 'actions2');
  });
  test('should not call onAction if clicked else where', function () {
    return checkClickElement(function (wrapper) {
      return wrapper.find('Overlay');
    }, false);
  });
});