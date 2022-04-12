/* eslint-disable react/button-has-type */
import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Modal from '../Modal';
var sandbox = sinon.sandbox.create();
describe('components/modal/Modal', function () {
  var onRequestClose;
  var clock;
  var wrapper;
  beforeEach(function () {
    onRequestClose = sinon.spy();
    clock = sandbox.useFakeTimers();
  });
  describe('shallow tests', function () {
    beforeEach(function () {
      wrapper = shallow(React.createElement(Modal, {
        isOpen: true,
        onRequestClose: onRequestClose
      }, "children"));
    });
    test('should render nothing when isOpen is false', function () {
      wrapper.setProps({
        isOpen: false
      });
      expect(wrapper.contains('ModalDialog')).toBeFalsy();
    });
    test('should render a modal dialog with props in a Portal when isOpen is true', function () {
      wrapper.setProps({
        title: 'title'
      });
      var portal = wrapper.find('Portal');
      expect(portal.length).toBeTruthy();
      expect(portal.find('.modal-backdrop').length).toBeTruthy();
      expect(portal.find('style').length).toBeTruthy();
      var dialog = portal.find('ModalDialog');
      expect(dialog.length).toBeTruthy();
      expect(dialog.prop('onRequestClose')).toEqual(onRequestClose);
      expect(dialog.prop('title')).toEqual('title');
    });
    test('should render a modal dialog with props in a div when isOpen is true', function () {
      wrapper.setProps({
        shouldNotUsePortal: true,
        title: 'title'
      });
      var wrapperComponent = wrapper.find('div');
      expect(wrapperComponent.length).toBeTruthy();
      expect(wrapperComponent.find('.modal-backdrop').length).toBeTruthy();
      expect(wrapperComponent.find('style').length).toBeTruthy();
      var dialog = wrapperComponent.find('ModalDialog');
      expect(dialog.length).toBeTruthy();
      expect(dialog.prop('onRequestClose')).toEqual(onRequestClose);
      expect(dialog.prop('title')).toEqual('title');
    });
    test('should not call the modal.close when random key is pressed', function () {
      wrapper.simulate('keyDown', {
        key: 'A'
      });
      sinon.assert.notCalled(onRequestClose);
    });
    test('should call the modal.close and stop event propagation when escape is pressed', function () {
      var event = {
        key: 'Escape',
        stopPropagation: jest.fn()
      };
      wrapper.simulate('keyDown', event);
      sinon.assert.calledOnce(onRequestClose);
      expect(event.stopPropagation).toBeCalled();
    });
    test('should call close when backdrop is clicked on', function () {
      wrapper.find('.modal-backdrop').simulate('click');
      sinon.assert.calledOnce(onRequestClose);
    });
    test('should pass styles in to children components when style prop is passed in', function () {
      var backdrop = {
        backgroundColor: 'red'
      };
      var dialog = {
        color: 'red'
      };
      wrapper.setProps({
        style: {
          backdrop: backdrop,
          dialog: dialog
        },
        isOpen: true
      });
      expect(wrapper.find('.modal-backdrop').prop('style')).toEqual(backdrop);
      expect(wrapper.find('ModalDialog').prop('style')).toEqual(dialog);
    });
    test('should render a LoadingIndicator and NOT a ModalDialog when modal is open and is loading', function () {
      wrapper.setProps({
        isOpen: true,
        isLoading: true
      });
      var loadingIndicator = wrapper.find('LoadingIndicator');
      expect(loadingIndicator.length).toBe(1);
      expect(loadingIndicator.prop('size')).toEqual('large');
      expect(wrapper.find('ModalDialog').length).toBe(0);
    });
  });
  describe('shallow tests with custom backdrop handler', function () {
    var backdropHandler = sinon.spy();
    beforeEach(function () {
      wrapper = shallow(React.createElement(Modal, {
        isOpen: true,
        onBackdropClick: backdropHandler,
        onRequestClose: onRequestClose
      }, "children"));
    });
    test('should call custom backdrop handler when backdrop is clicked on', function () {
      wrapper.find('.modal-backdrop').simulate('click');
      sinon.assert.calledOnce(backdropHandler);
      sinon.assert.notCalled(onRequestClose);
    });
  });
  describe('mount tests', function () {
    beforeEach(function () {
      wrapper = mount(React.createElement(Modal, {
        onRequestClose: onRequestClose
      }, React.createElement("button", {
        id: "first"
      }), React.createElement("button", {
        id: "last"
      })));
    });
    afterEach(function () {
      wrapper.unmount();
    });
    test('should focus first element when mounting', function () {
      wrapper = mount(React.createElement(Modal, {
        isOpen: true,
        onRequestClose: onRequestClose
      }, React.createElement("button", {
        id: "first"
      }), React.createElement("button", {
        id: "last"
      })));
      clock.tick(1);
      expect(document.activeElement.id).toEqual('first');
    });
    test('should focus first element when opening', function () {
      wrapper.setProps({
        isOpen: true
      });
      clock.tick(1);
      expect(document.activeElement.id).toEqual('first');
    });
    test('should focus first element when loading state is removed', function () {
      wrapper = mount(React.createElement(Modal, {
        isLoading: true,
        isOpen: true,
        onRequestClose: onRequestClose
      }, React.createElement("button", {
        id: "first"
      }), React.createElement("button", {
        id: "last"
      })));
      wrapper.setProps({
        isLoading: false
      });
      clock.tick(1);
      expect(document.activeElement.id).toEqual('first');
    });
    test('should focus on close button on mount when no other focusable elements in modal', function () {
      wrapper = mount(React.createElement(Modal, {
        isOpen: true,
        onRequestClose: onRequestClose
      }, React.createElement("div", null)));
      clock.tick(1);
      expect(document.activeElement.className).toContain('modal-close-button');
    });
    test('should focus custom element when opening', function () {
      wrapper = mount(React.createElement(Modal, {
        focusElementSelector: ".custom-element",
        onRequestClose: onRequestClose
      }, React.createElement("button", {
        id: "last"
      }), React.createElement("button", {
        className: "custom-element"
      })));
      wrapper.setProps({
        isOpen: true
      });
      clock.tick(1);
      expect(document.activeElement.className).toContain('custom-element');
    });
    test('should focus custom element when loading state is removed', function () {
      wrapper = mount(React.createElement(Modal, {
        focusElementSelector: ".custom-element",
        isLoading: true,
        isOpen: true,
        onRequestClose: onRequestClose
      }, React.createElement("button", {
        id: "last"
      }), React.createElement("button", {
        className: "custom-element"
      })));
      wrapper.setProps({
        isLoading: false
      });
      clock.tick(1);
      expect(document.activeElement.className).toContain('custom-element');
    });
    test('should throw an error if custom element is not found', function () {
      wrapper = mount(React.createElement(Modal, {
        focusElementSelector: ".selector-with-no-matching-element",
        onRequestClose: onRequestClose
      }, React.createElement("button", {
        id: "last"
      }), React.createElement("button", {
        className: "custom-element"
      })));
      expect(function () {
        wrapper.setProps({
          isOpen: true
        });
        clock.tick(1);
      }).toThrow();
    });
  });
});