import PropTypes from 'prop-types';
import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import TextInput from '..';
var sandbox = sinon.sandbox.create();
describe('components/form-elements/text-input/TextInput', function () {
  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  test('should correctly render default component', function () {
    var wrapper = shallow(React.createElement(TextInput, {
      label: "label",
      name: "input"
    }));
    expect(wrapper.find('TextInput').length).toEqual(1);
  });
  test('should update state if value prop changes', function () {
    var wrapper = shallow(React.createElement(TextInput, {
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
    var wrapper = mount(React.createElement(TextInput, {
      className: "coverage",
      isRequired: true,
      label: "label",
      name: "input"
    }));
    var input = wrapper.find('input');
    input.simulate('blur');
    expect(wrapper.find('.text-input-container').hasClass('show-error')).toBeTruthy();
  });
  test('should mark required fields valid when not empty', function () {
    var wrapper = mount(React.createElement(TextInput, {
      isRequired: true,
      label: "label",
      name: "input",
      value: "baba"
    }));
    var input = wrapper.find('input');
    input.simulate('blur');
    expect(wrapper.find('.text-input-container').hasClass('show-error')).toBeFalsy();
  });
  test('should correctly validate when change event is fired', function () {
    var wrapper = mount(React.createElement(TextInput, {
      isRequired: true,
      label: "label",
      name: "input",
      value: ""
    }));
    var input = wrapper.find('input');
    input.simulate('blur');
    expect(wrapper.find('.text-input-container').hasClass('show-error')).toBeTruthy();
    wrapper.setProps({
      value: 'a'
    });
    input.simulate('blur');
    var inputEl = input.getDOMNode();
    inputEl.value = 'a';
    input.simulate('change', {
      currentTarget: inputEl
    });
    expect(wrapper.find('.text-input-container').hasClass('show-error')).toBeFalsy();
  });
  test('should mark email fields invalid when invalid', function () {
    var wrapper = mount(React.createElement(TextInput, {
      label: "label",
      name: "input",
      type: "email",
      value: "bob"
    }));
    var input = wrapper.find('input');
    input.simulate('blur');
    expect(wrapper.state('isValid')).toBeFalsy();
  });
  test('should mark email fields valid when valid', function () {
    var wrapper = mount(React.createElement(TextInput, {
      label: "label",
      name: "input",
      type: "email",
      value: "bob@bob.com"
    }));
    var input = wrapper.find('input');
    input.simulate('blur');
    expect(wrapper.find('.text-input-container').hasClass('show-error')).toBeFalsy();
  });
  test('should mark url fields invalid when invalid', function () {
    var wrapper = mount(React.createElement(TextInput, {
      label: "label",
      name: "input",
      type: "url",
      value: "bob"
    }));
    var instance = wrapper.instance();
    instance.input = {
      validity: {
        typeMismatch: true
      }
    };
    instance.checkValidity();
    wrapper.update();
    expect(wrapper.find('.text-input-container').hasClass('show-error')).toBeTruthy();
  });
  test('should mark url fields valid when valid', function () {
    var wrapper = mount(React.createElement(TextInput, {
      label: "label",
      name: "input",
      type: "url",
      value: "http://bob.com"
    }));
    var instance = wrapper.instance();
    instance.input = {
      validity: {
        valid: true
      }
    };
    instance.checkValidity();
    wrapper.update();
    expect(wrapper.find('.text-input-container').hasClass('show-error')).toBeFalsy();
    expect(wrapper.state('errorMessage')).toBeFalsy();
  });
  test('should set an input as valid when the validityFn returns an void', function () {
    function validityFn() {}

    var wrapper = mount(React.createElement(TextInput, {
      label: "label",
      name: "input",
      type: "custom",
      validation: validityFn
    }));
    var input = wrapper.find('input');
    input.simulate('blur');
    expect(input.getDOMNode().validity.valid).toBeTruthy();
  });
  test('should set an input as invalid when the validityFn returns an error string and input is not empty', function () {
    function validityFn() {
      return {
        code: 'errCode',
        message: 'errMessage'
      };
    }

    var wrapper = mount(React.createElement(TextInput, {
      label: "label",
      name: "input",
      type: "custom",
      validation: validityFn,
      value: "yes"
    }));
    var input = wrapper.find('input');
    var setCustomValiditySpy = jest.spyOn(input.getDOMNode(), 'setCustomValidity');
    input.simulate('blur');
    expect(setCustomValiditySpy).toHaveBeenCalledWith('errCode');
  });
  test('should set an input as valid when intially then fixed when using validityFn', function () {
    var stub = sinon.stub();
    stub.onCall(0).returns({
      code: 'errCode',
      message: 'errMessage'
    });
    stub.onCall(1).returns();
    var wrapper = mount(React.createElement(TextInput, {
      label: "label",
      name: "input",
      type: "custom",
      validation: stub,
      value: "yes"
    }));
    var input = wrapper.find('input');
    var setCustomValiditySpy = jest.spyOn(input.getDOMNode(), 'setCustomValidity');
    input.simulate('blur');
    expect(setCustomValiditySpy).toHaveBeenCalledWith('errCode'); // Get the re-rendered input again

    input = wrapper.find('input');
    setCustomValiditySpy = jest.spyOn(input.getDOMNode(), 'setCustomValidity');
    input.simulate('blur');
    expect(setCustomValiditySpy).toHaveBeenCalledWith('');
  });
  test('should not set input invalid when the validityFn returns an error string and input is empty and not required', function () {
    function validityFn() {
      return {
        code: 'errCode',
        message: 'errMessage'
      };
    }

    var wrapper = mount(React.createElement(TextInput, {
      label: "label",
      name: "input",
      type: "custom",
      validation: validityFn
    }));
    var input = wrapper.find('input');
    input.simulate('blur');
    expect(input.getDOMNode().validity.valid).toBeTruthy();
  });
  test('should set input invalid when the validityFn returns an error string, input is empty and is required', function () {
    function validityFn() {
      return {
        code: 'errCode',
        message: 'errMessage'
      };
    }

    var wrapper = mount(React.createElement(TextInput, {
      isRequired: true,
      label: "label",
      name: "input",
      type: "custom",
      validation: validityFn
    }));
    var input = wrapper.find('input');
    var setCustomValiditySpy = jest.spyOn(input.getDOMNode(), 'setCustomValidity');
    input.simulate('blur');
    expect(setCustomValiditySpy).toHaveBeenCalledWith('errCode');
  });
  test('should re-validate when input is set via props programaticallly', function () {
    var wrapper = mount(React.createElement(TextInput, {
      isRequired: true,
      label: "label",
      name: "input",
      value: ""
    }));
    var input = wrapper.find('input');
    input.simulate('blur');
    expect(wrapper.find('.text-input-container').hasClass('show-error')).toBeTruthy();
    wrapper.setProps({
      value: 'abba'
    });
    input.simulate('blur');
    var inputEl = input.getDOMNode();
    inputEl.value = 'a';
    input.simulate('change', {
      currentTarget: inputEl
    });
    wrapper.update();
    expect(wrapper.find('.text-input-container').hasClass('show-error')).toBeFalsy();
  });
  test('should validate onChange when input is already in error state', function () {
    var wrapper = mount(React.createElement(TextInput, {
      isRequired: true,
      label: "label",
      name: "input",
      value: ""
    }));
    var input = wrapper.find('input');
    input.simulate('blur');
    expect(wrapper.find('.text-input-container').hasClass('show-error')).toBeTruthy();
    var inputEl = input.getDOMNode();
    inputEl.value = 'a';
    input.simulate('change', {
      currentTarget: inputEl
    });
    wrapper.update();
    expect(wrapper.find('.text-input-container').hasClass('show-error')).toBeFalsy();
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
    var component = mount(React.createElement(TextInput, {
      label: "label",
      name: "input",
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
    var component = mount(React.createElement(TextInput, {
      label: "label",
      name: "input",
      value: ""
    }), {
      context: context,
      childContextTypes: childContextTypes
    });
    validityStateHandlerSpy.callArgWith(1, error);
    expect(component.state('error').code).toEqual('badInput');
  });
  /**
   * Using the context to test these code paths since phantomJS doesn't
   * support the functionality
   */

  test('should correctly validate patternMismatch', function () {
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
      patternMismatch: true
    };
    var component = mount(React.createElement(TextInput, {
      label: "label",
      name: "input",
      value: ""
    }), {
      context: context,
      childContextTypes: childContextTypes
    });
    validityStateHandlerSpy.callArgWith(1, error);
    expect(component.state('error').code).toEqual('patternMismatch');
  });
  test('should correctly validate tooShort', function () {
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
      tooLong: true
    };
    var component = mount(React.createElement(TextInput, {
      label: "label",
      maxLength: 10,
      name: "input",
      value: ""
    }), {
      context: context,
      childContextTypes: childContextTypes
    });
    validityStateHandlerSpy.callArgWith(1, error);
    expect(component.state('error').code).toEqual('tooLong');
  });
  test('should correctly validate tooShort', function () {
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
      tooShort: true
    };
    var component = mount(React.createElement(TextInput, {
      label: "label",
      minLength: 1,
      name: "input",
      value: ""
    }), {
      context: context,
      childContextTypes: childContextTypes
    });
    validityStateHandlerSpy.callArgWith(1, error);
    expect(component.state('error').code).toEqual('tooShort');
  });
});