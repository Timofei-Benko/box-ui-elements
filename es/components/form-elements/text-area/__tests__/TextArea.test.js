import PropTypes from 'prop-types';
import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import TextArea from '..';
var sandbox = sinon.sandbox.create();
describe('components/form-elements/text-area/TextArea', function () {
  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  test('should correctly render default component', function () {
    var wrapper = shallow(React.createElement(TextArea, {
      label: "label",
      name: "textarea"
    }));
    expect(wrapper.find('TextArea').length).toEqual(1);
  });
  test('should update state if value prop changes', function () {
    var wrapper = shallow(React.createElement(TextArea, {
      label: "label",
      name: "textarea",
      value: "test"
    }));
    wrapper.setProps({
      value: 'new prop'
    });
    expect(wrapper.state('value')).toEqual('new prop');
  });
  test('should mark required fields invalid when empty', function () {
    var wrapper = mount(React.createElement(TextArea, {
      className: "coverage",
      isRequired: true,
      label: "label",
      name: "input"
    }));
    var textarea = wrapper.find('textarea');
    textarea.simulate('blur');
    expect(wrapper.find('.text-area-container').hasClass('show-error')).toBeTruthy();
  });
  test('should mark required fields valid when not empty', function () {
    var wrapper = mount(React.createElement(TextArea, {
      isRequired: true,
      label: "label",
      name: "textarea",
      value: "baba"
    }));
    var textarea = wrapper.find('textarea');
    textarea.simulate('blur');
    expect(wrapper.find('.text-area-container').hasClass('show-error')).toBeFalsy();
  });
  test('should correctly validate when change event is fired', function () {
    var wrapper = mount(React.createElement(TextArea, {
      isRequired: true,
      label: "label",
      name: "textarea",
      value: ""
    }));
    var textarea = wrapper.find('textarea');
    textarea.simulate('blur');
    expect(wrapper.find('.text-area-container').hasClass('show-error')).toBeTruthy();
    wrapper.setProps({
      value: 'a'
    });
    textarea.simulate('blur');
    textarea.simulate('change', {
      currentTarget: {
        value: 'a'
      }
    });
    expect(wrapper.find('.text-area-container').hasClass('show-error')).toBeFalsy();
  });
  test('should set an textarea as valid when the validityFn returns an void', function () {
    function validityFn() {}

    var wrapper = mount(React.createElement(TextArea, {
      label: "label",
      name: "textarea",
      type: "custom",
      validation: validityFn
    }));
    var textarea = wrapper.find('textarea');
    textarea.simulate('blur');
    expect(textarea.instance().validity.valid).toBeTruthy();
  });
  test('should set an textarea as invalid when the validityFn returns an error string and input is not empty', function () {
    function validityFn() {
      return {
        code: 'errCode',
        message: 'errMessage'
      };
    }

    var wrapper = mount(React.createElement(TextArea, {
      label: "label",
      name: "textarea",
      type: "custom",
      validation: validityFn,
      value: "yes"
    }));
    var textarea = wrapper.find('textarea');
    textarea.simulate('blur');
    expect(textarea.instance().validity.valid).toBeFalsy();
  });
  test('should set an textarea as valid when intially then fixed when using validityFn', function () {
    var stub = sinon.stub();
    stub.onCall(0).returns({
      code: 'errCode',
      message: 'errMessage'
    });
    stub.onCall(1).returns();
    var wrapper = mount(React.createElement(TextArea, {
      label: "label",
      name: "textarea",
      type: "custom",
      validation: stub,
      value: "yes"
    }));
    var textarea = wrapper.find('textarea');
    textarea.simulate('blur');
    expect(textarea.instance().validity.valid).toBeFalsy(); // Get the re-rendered textarea again

    textarea = wrapper.find('textarea');
    textarea.simulate('blur');
    expect(textarea.instance().validity.valid).toBeTruthy();
  });
  test('should not set textarea invalid when the validityFn returns an error string and textarea is empty and not required', function () {
    function validityFn() {
      return {
        code: 'errCode',
        message: 'errMessage'
      };
    }

    var wrapper = mount(React.createElement(TextArea, {
      label: "label",
      name: "textarea",
      type: "custom",
      validation: validityFn
    }));
    var textarea = wrapper.find('textarea');
    textarea.simulate('blur');
    expect(textarea.instance().validity.valid).toBeTruthy();
  });
  test('should set textarea invalid when the validityFn returns an error string, textarea is empty and is required', function () {
    function validityFn() {
      return {
        code: 'errCode',
        message: 'errMessage'
      };
    }

    var wrapper = mount(React.createElement(TextArea, {
      isRequired: true,
      label: "label",
      name: "textarea",
      type: "custom",
      validation: validityFn
    }));
    var textarea = wrapper.find('textarea');
    textarea.simulate('blur');
    expect(textarea.instance().validity.valid).toBeFalsy();
  });
  test('should re-validate when textarea is set via props programaticallly', function () {
    var wrapper = mount(React.createElement(TextArea, {
      isRequired: true,
      label: "label",
      name: "textarea",
      value: ""
    }));
    var textarea = wrapper.find('textarea');
    textarea.simulate('blur');
    expect(wrapper.find('.text-area-container').hasClass('show-error')).toBeTruthy();
    wrapper.setProps({
      value: 'abba'
    });
    textarea.simulate('blur');
    var textareaEl = textarea.getDOMNode();
    textareaEl.value = 'a';
    textarea.simulate('change', {
      currentTarget: textareaEl
    });
    wrapper.update();
    expect(wrapper.find('.text-area-container').hasClass('show-error')).toBeFalsy();
  });
  test('should validate onChange when textarea is already in error state', function () {
    var wrapper = mount(React.createElement(TextArea, {
      isRequired: true,
      label: "label",
      name: "textarea",
      value: ""
    }));
    var textarea = wrapper.find('textarea');
    textarea.simulate('blur');
    expect(wrapper.find('.text-area-container').hasClass('show-error')).toBeTruthy();
    var textareaEl = textarea.getDOMNode();
    textareaEl.value = 'a';
    textarea.simulate('change', {
      currentTarget: textareaEl
    });
    wrapper.update();
    expect(wrapper.find('.text-area-container').hasClass('show-error')).toBeFalsy();
  });
  test('should set validity state when set validity state handler is called with custom error', function () {
    var validityStateHandlerSpy = sinon.spy();
    var context = {
      form: {
        registerInput: validityStateHandlerSpy,
        unregisterInput: sandbox.mock().never()
      }
    };
    var childContextTypes = {
      form: PropTypes.object
    };
    var error = {
      errorCode: 'errorCode',
      errorMessage: 'Error Message'
    };
    var component = mount(React.createElement(TextArea, {
      label: "label",
      name: "textarea",
      value: ""
    }), {
      context: context,
      childContextTypes: childContextTypes
    });
    validityStateHandlerSpy.callArgWith(1, error);
    expect(component.state('error')).toEqual(error);
  });
  test('should set validity state when set validity state handler is called with ValidityState object', function () {
    var validityStateHandlerSpy = sinon.spy();
    var context = {
      form: {
        registerInput: validityStateHandlerSpy,
        unregisterInput: sandbox.mock().never()
      }
    };
    var childContextTypes = {
      form: PropTypes.object
    };
    var error = {
      valid: false,
      badInput: true
    };
    var component = mount(React.createElement(TextArea, {
      label: "label",
      name: "textarea",
      value: ""
    }), {
      context: context,
      childContextTypes: childContextTypes
    });
    validityStateHandlerSpy.callArgWith(1, error);
    expect(component.state('error').code).toEqual('badInput');
  });
});