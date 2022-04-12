import * as React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { MessageContextProvider, useMessage } from '..';

var TargetedComponent = function TargetedComponent() {
  var _useMessage = useMessage('msg'),
      canShow = _useMessage.canShow,
      onClose = _useMessage.onClose,
      onComplete = _useMessage.onComplete,
      onShow = _useMessage.onShow;

  if (canShow) {
    onShow();
    return React.createElement(React.Fragment, null, React.createElement("button", {
      className: "close",
      onClick: onClose,
      type: "button"
    }), React.createElement("button", {
      className: "complete",
      onClick: onComplete,
      type: "button"
    }));
  }

  return null;
};

var ComponentForTest = function ComponentForTest(_ref) {
  var messageApi = _ref.messageApi;
  return React.createElement(MessageContextProvider, {
    messageApi: messageApi
  }, React.createElement(TargetedComponent, null));
};

ComponentForTest.propTypes = {
  messageApi: function messageApi() {
    return (typeof bpfrpt_proptype_MessageApi === "function" ? bpfrpt_proptype_MessageApi.isRequired ? bpfrpt_proptype_MessageApi.isRequired : bpfrpt_proptype_MessageApi : PropTypes.shape(bpfrpt_proptype_MessageApi).isRequired).apply(this, arguments);
  }
};
describe('features/targeting/MessageContext', function () {
  var markMessageAsClosed = jest.fn();
  var markMessageAsSeen = jest.fn();

  var getWrapper = function getWrapper() {
    var eligibleMessageIDMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var messageApi = {
      eligibleMessageIDMap: eligibleMessageIDMap,
      markMessageAsClosed: markMessageAsClosed,
      markMessageAsSeen: markMessageAsSeen
    };
    return mount(React.createElement(ComponentForTest, {
      messageApi: messageApi
    }));
  };

  afterEach(function () {
    jest.resetAllMocks();
  });
  test('should not render button when not eligible', function () {
    var wrapper = getWrapper();
    expect(wrapper.find('button').length).toBe(0);
    expect(markMessageAsSeen).toHaveBeenCalledTimes(0);
    expect(markMessageAsClosed).toHaveBeenCalledTimes(0);
  });
  test('should render button when eligible and call onClose', function () {
    var wrapper = getWrapper({
      msg: 3
    });
    expect(wrapper.find('button').length).toBe(2);
    expect(markMessageAsSeen).toBeCalledWith(3);
    expect(markMessageAsClosed).not.toBeCalled();
    act(function () {
      wrapper.find('button.close').at(0).props().onClick();
    });
    expect(markMessageAsClosed).toBeCalledWith(3);
    expect(markMessageAsSeen).toHaveBeenCalledTimes(1);
    expect(markMessageAsClosed).toHaveBeenCalledTimes(1);
  });
  test('should render button when eligible and call onComplete', function () {
    var wrapper = getWrapper({
      msg: 3
    });
    expect(wrapper.find('button').length).toBe(2);
    expect(markMessageAsSeen).toBeCalledWith(3);
    expect(markMessageAsClosed).not.toBeCalled();
    act(function () {
      wrapper.find('button.complete').at(0).props().onClick();
    });
    expect(markMessageAsClosed).toBeCalledWith(3);
    expect(markMessageAsSeen).toHaveBeenCalledTimes(1);
    expect(markMessageAsClosed).toHaveBeenCalledTimes(1);
  });
});
import { bpfrpt_proptype_MessageApi } from "..";
import PropTypes from "prop-types";