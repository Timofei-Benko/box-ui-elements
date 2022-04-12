import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Form from '..';
var sandbox = sinon.sandbox.create();
describe('components/form-elements/form/Form', function () {
  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  test('should correctly render default component', function () {
    var wrapper = shallow(React.createElement(Form, {
      onInvalidSubmit: function onInvalidSubmit() {},
      onValidSubmit: function onValidSubmit() {}
    }, React.createElement("input", {
      type: "text"
    })));
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('form').prop('noValidate')).toBeTruthy();
  });
  test('should call onChange when onChange event is triggered on child input', function () {
    var onChangeSpy = sinon.spy();
    var onValidSubmitMock = sandbox.mock().never();
    var onInvalidSubmitMock = sandbox.mock().never();
    var wrapper = mount(React.createElement(Form, {
      onChange: onChangeSpy,
      onInvalidSubmit: onInvalidSubmitMock,
      onValidSubmit: onValidSubmitMock
    }, React.createElement("input", {
      id: "input",
      type: "text"
    })));
    var input = wrapper.find('input');
    input.simulate('change', {
      target: {
        value: 'a'
      }
    });
    expect(onChangeSpy.calledOnce).toBeTruthy();
  });
  test('should call onValidSubmit when submit event is triggered and child inputs are valid', function () {
    var onValidSubmit = sinon.spy();
    var onInvalidSubmitMock = sandbox.mock().never();
    var wrapper = mount(React.createElement(Form, {
      onInvalidSubmit: onInvalidSubmitMock,
      onValidSubmit: onValidSubmit
    }, React.createElement("input", {
      id: "input",
      type: "text"
    })));
    var form = wrapper.find('form');
    var formEl = form.getDOMNode();

    formEl.checkValidity = function () {
      return true;
    };

    form.simulate('submit', {
      target: formEl
    });
    expect(onValidSubmit.calledOnce).toBeTruthy();
  });
  test('should call onInvalidSubmit when submit event is triggered and any of the child inputs are not valid', function () {
    var onValidSubmitMock = sandbox.mock().never();
    var onInvalidSubmit = sinon.spy();
    var wrapper = mount(React.createElement(Form, {
      onInvalidSubmit: onInvalidSubmit,
      onValidSubmit: onValidSubmitMock
    }, React.createElement("input", {
      id: "input",
      name: "input1",
      required: true,
      type: "text"
    })));
    var form = wrapper.find('form');
    var formEl = form.getDOMNode();

    formEl.checkValidity = function () {
      return false;
    };

    form.simulate('submit', {
      target: formEl
    });
    expect(onInvalidSubmit.calledOnce).toBeTruthy();
  });
  test('should correctly serialize a forms contents when valid', function (done) {
    var onInvalidSubmitMock = sandbox.mock().never();

    var onValidSubmit = function onValidSubmit(formData) {
      expect(formData).toEqual({
        input1: 'boom'
      });
      done();
    };

    var wrapper = mount(React.createElement(Form, {
      onInvalidSubmit: onInvalidSubmitMock,
      onValidSubmit: onValidSubmit
    }, React.createElement("input", {
      defaultValue: "boom",
      id: "input",
      name: "input1",
      type: "text"
    }), React.createElement("input", {
      id: "input",
      type: "text"
    })));
    var form = wrapper.find('form');
    var formEl = form.getDOMNode();

    formEl.checkValidity = function () {
      return true;
    };

    form.simulate('submit', {
      target: formEl
    });
  });
  test('should correctly serialize a forms validity state when invalid', function (done) {
    var onValidSubmitMock = sandbox.mock().never();

    var onInvalidSubmit = function onInvalidSubmit(formValidityState) {
      expect(formValidityState.input1.validityState).toBeTruthy();
      done();
    };

    var wrapper = mount(React.createElement(Form, {
      onInvalidSubmit: onInvalidSubmit,
      onValidSubmit: onValidSubmitMock
    }, React.createElement("input", {
      id: "input",
      name: "input1",
      required: true,
      type: "text"
    }), React.createElement("input", {
      id: "input",
      type: "text"
    })));
    var form = wrapper.find('form');
    var formEl = form.getDOMNode();

    formEl.checkValidity = function () {
      return false;
    };

    form.simulate('submit', {
      target: formEl
    });
  });
  test('should expose form register/unregister function on the context', function () {
    var wrapper = shallow(React.createElement(Form, {
      onInvalidSubmit: function onInvalidSubmit() {},
      onValidSubmit: function onValidSubmit() {}
    }));
    expect(wrapper.instance().getChildContext().form.registerInput).toBeTruthy();
    expect(wrapper.instance().getChildContext().form.unregisterInput).toBeTruthy();
  });
  test('should register an input when registerInput is called', function () {
    var wrapper = shallow(React.createElement(Form, {
      onInvalidSubmit: function onInvalidSubmit() {},
      onValidSubmit: function onValidSubmit() {}
    }));
    var inputHandlerSpy = sinon.spy();
    wrapper.instance().getChildContext().form.registerInput('testinput', inputHandlerSpy);
    expect(wrapper.state('registeredInputs').testinput).toBe(inputHandlerSpy);
  });
  test('should correctly register multiple inputs when registerInput is called', function () {
    var wrapper = shallow(React.createElement(Form, {
      onInvalidSubmit: function onInvalidSubmit() {},
      onValidSubmit: function onValidSubmit() {}
    }));
    var inputHandlerSpy = sinon.spy();
    wrapper.instance().getChildContext().form.registerInput('testinput1', inputHandlerSpy);
    wrapper.instance().getChildContext().form.registerInput('testinput2', inputHandlerSpy);
    expect(wrapper.state('registeredInputs').testinput1).toBe(inputHandlerSpy);
    expect(wrapper.state('registeredInputs').testinput2).toBe(inputHandlerSpy);
  });
  test('should throw an error if registerInput is called for already registered input', function (done) {
    var wrapper = shallow(React.createElement(Form, {
      onInvalidSubmit: function onInvalidSubmit() {},
      onValidSubmit: function onValidSubmit() {}
    }));
    wrapper.instance().getChildContext().form.registerInput('testinput', function () {});

    try {
      wrapper.instance().getChildContext().form.registerInput('testinput', function () {});
    } catch (e) {
      expect(e.message).toEqual("Input 'testinput' is already registered.");
      done();
    }
  });
  test('should unregister an input when unregisterInput is called', function () {
    var wrapper = shallow(React.createElement(Form, {
      onInvalidSubmit: function onInvalidSubmit() {},
      onValidSubmit: function onValidSubmit() {}
    }));
    var inputHandlerSpy = sinon.spy();
    wrapper.instance().getChildContext().form.registerInput('testinput', inputHandlerSpy);
    expect(wrapper.state('registeredInputs').testinput).toBe(inputHandlerSpy);
    wrapper.instance().getChildContext().form.unregisterInput('testinput', inputHandlerSpy);
    expect(wrapper.state('registeredInputs').testinput).toBeFalsy();
  });
});