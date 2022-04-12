import React from 'react';
import sinon from 'sinon';
import { ModalDialogBase } from '../ModalDialog';
var sandbox = sinon.sandbox.create();
describe('components/modal/ModalDialog', function () {
  var onRequestClose;
  var wrapper;
  var instance;
  var title = 'hello';
  beforeEach(function () {
    var intlShape = {
      formatMessage: function formatMessage(message) {
        return message.id;
      }
    };
    onRequestClose = sinon.spy();
    wrapper = shallow(React.createElement(ModalDialogBase, {
      intl: intlShape,
      onRequestClose: onRequestClose,
      title: title
    }, "children"));
    instance = wrapper.instance();
  });
  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  test('should set aria props on modal dialog when rendered', function () {
    expect(wrapper.prop('role')).toEqual('dialog');
    expect(wrapper.prop('aria-labelledby')).toEqual("".concat(instance.modalID, "-label"));
  });
  test('should show a title and children with a close button when rendered', function () {
    expect(wrapper.find("h2.modal-title#".concat(instance.modalID, "-label")).text()).toEqual(title);
    expect(wrapper.find('.modal-content').text()).toEqual('children');
  });
  test('should set correct aria props on modal dialog when type is alert', function () {
    var message = 'message';
    wrapper.setProps({
      children: [message, React.createElement("div", {
        className: "actions"
      })],
      // eslint-disable-line react/jsx-key
      type: 'alert'
    });
    var content = wrapper.find('.modal-content');
    expect(wrapper.prop('role')).toEqual('alertdialog');
    expect(wrapper.prop('aria-describedby')).toEqual("".concat(instance.modalID, "-desc"));
    expect(content.find("p#".concat(instance.modalID, "-desc")).text()).toEqual(message);
    expect(wrapper.find('div.actions').length).toBe(1);
  });
  test('should call onRequestClose when close button is clicked on', function () {
    wrapper.find('.modal-close-button').simulate('click');
    sinon.assert.calledOnce(onRequestClose);
  });
  test('should add custom props to close button when passed', function () {
    wrapper.setProps({
      closeButtonProps: {
        'data-custom-close-button': 'asdf'
      }
    });
    var closeButtonWrapper = wrapper.find('.modal-close-button');
    expect(closeButtonWrapper.prop('data-custom-close-button')).toEqual('asdf');
  });
  test('should not render close button when onRequestClose is falsey', function () {
    wrapper.setProps({
      onRequestClose: undefined
    });
    expect(wrapper.find('.modal-close-button').length).toBeFalsy();
  });
});