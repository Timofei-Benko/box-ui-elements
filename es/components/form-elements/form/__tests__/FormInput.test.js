import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { FormInput } from '..';
var sandbox = sinon.sandbox.create();
describe('components/form-elements/form/FormInput', function () {
  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  test('should register itself with the form when form is exposed on context', function () {
    var context = {
      form: {
        registerInput: sandbox.mock().withArgs('forminput'),
        unregisterInput: sandbox.mock().never()
      }
    };
    mount(React.createElement(FormInput, {
      name: "forminput",
      onValidityStateUpdate: sinon.stub()
    }, React.createElement("input", null)), {
      context: context
    });
  });
  test('should unregister itself with the form when form is exposed on context and component unmounts', function () {
    var context = {
      form: {
        registerInput: sandbox.mock().withArgs('input'),
        unregisterInput: sandbox.mock().withArgs('input')
      }
    };
    var component = mount(React.createElement(FormInput, {
      label: "label",
      name: "input",
      onValidityStateUpdate: sinon.stub(),
      value: ""
    }, "Children"), {
      context: context
    });
    component.unmount();
  });
});