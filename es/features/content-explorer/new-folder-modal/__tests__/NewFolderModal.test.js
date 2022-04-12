function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import sinon from 'sinon';
import { NewFolderModalBase as NewFolderModal } from '../NewFolderModal';
describe('features/content-explorer/new-folder-modal/NewFolderModal', function () {
  var sandbox = sinon.sandbox.create();

  var renderComponent = function renderComponent(props) {
    return shallow(React.createElement(NewFolderModal, _extends({
      intl: {
        formatMessage: function formatMessage() {
          return '';
        }
      },
      isOpen: true,
      onCreateFolderSubmit: function onCreateFolderSubmit() {},
      onRequestClose: function onRequestClose() {}
    }, props)));
  };

  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  describe('render()', function () {
    test('should render default component', function () {
      var wrapper = renderComponent();
      expect(wrapper.hasClass('new-folder-modal')).toBe(true);
      expect(wrapper.find('TextInput.folder-name-input').length).toBe(1);
      expect(wrapper.find('.new-folder-modal-cancel-button').length).toBe(1);
      expect(wrapper.find('.new-folder-modal-create-button').length).toBe(1);
      expect(!wrapper.find('.new-folder-modal-create-button').prop('isLoading')).toBe(true);
      expect(wrapper.find('.new-folder-modal-create-button').prop('isDisabled')).toBe(true);
    });
    test('should render component with class when specified', function () {
      var className = 'test';
      var wrapper = renderComponent({
        className: className
      });
      expect(wrapper.hasClass('new-folder-modal')).toBe(true);
      expect(wrapper.hasClass(className)).toBe(true);
    });
    test('should render component with modal title', function () {
      var wrapper = renderComponent({
        parentFolderName: 'Test Folder'
      });
      expect(wrapper.find('Modal').prop('title')).toBeTruthy();
    });
    test('should render component with error when specified', function () {
      var createFolderError = 'This is an error';
      var wrapper = renderComponent({
        createFolderError: createFolderError
      });
      expect(wrapper.find('.folder-name-input').prop('error')).toEqual(createFolderError);
    });
    test('should render component with loading create button when isCreatingFolder is true', function () {
      var wrapper = renderComponent({
        isCreatingFolder: true
      });
      expect(wrapper.find('.new-folder-modal-create-button').prop('isLoading')).toBe(true);
    });
    test('should render component with disabled create button when error is specified', function () {
      var createFolderError = 'This is an error';
      var wrapper = renderComponent({
        createFolderError: createFolderError
      }); // Make sure the button isn't disabled because of the empty input

      wrapper.setState({
        folderNameInput: 'test'
      });
      expect(wrapper.find('.new-folder-modal-create-button').prop('isDisabled')).toBe(true);
    });
  });
  describe('onRequestClose', function () {
    test('should call onRequestClose when cancel button is clicked', function () {
      var onRequestCloseSpy = sandbox.spy();
      var wrapper = renderComponent({
        onRequestClose: onRequestCloseSpy
      });
      wrapper.find('.new-folder-modal-cancel-button').simulate('click');
      expect(onRequestCloseSpy.calledOnce).toBe(true);
    });
  });
  describe('onCreateFolderSubmit', function () {
    test('should call onCreateFolderSubmit when create button is clicked', function () {
      var input = 'test';
      var onCreateFolderSubmitSpy = sandbox.spy();
      var wrapper = renderComponent({
        onCreateFolderSubmit: onCreateFolderSubmitSpy
      });
      wrapper.setState({
        folderNameInput: input
      });
      wrapper.find('.new-folder-modal-create-button').simulate('click');
      expect(onCreateFolderSubmitSpy.calledOnce).toBe(true);
      expect(onCreateFolderSubmitSpy.calledWithExactly(input)).toBe(true);
    });
  });
  describe('onCreateFolderInput', function () {
    test('should call onCreateFolderInput when typing in folder name input', function () {
      var input = 'test';
      var onCreateFolderInputSpy = sandbox.spy();
      var wrapper = renderComponent({
        onCreateFolderInput: onCreateFolderInputSpy
      });
      wrapper.find('.folder-name-input').simulate('input', {
        target: {
          value: input
        }
      });
      expect(onCreateFolderInputSpy.calledOnce).toBe(true);
      expect(onCreateFolderInputSpy.calledWithExactly(input)).toBe(true);
    });
  });
});