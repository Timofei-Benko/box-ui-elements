import React from 'react';
import sinon from 'sinon';
import { SingleSelectFieldBase } from '../SingleSelectField';
import CLEAR from '../constants';
var sandbox = sinon.sandbox.create();
describe('components/select-field/SingleSelectField', function () {
  afterEach(function () {
    sandbox.verifyAndRestore();
  });

  var onChangeStub = function onChangeStub() {};

  var options = [{
    displayText: 'Foo',
    value: 'foo'
  }, {
    displayText: 'Bar',
    value: 'bar'
  }, {
    displayText: 'Baz',
    value: 'baz'
  }];
  describe('render()', function () {
    test('should render a BaseSelectField with a selectedValues prop matching passed in selected value when called', function () {
      var wrapper = shallow(React.createElement(SingleSelectFieldBase, {
        isDisabled: false,
        onChange: onChangeStub,
        options: options,
        selectedValue: "bar"
      }));
      var instance = wrapper.instance();
      var baseSelectFieldWrapper = wrapper.find('BaseSelectField');
      expect(baseSelectFieldWrapper.length).toBe(1);
      expect(baseSelectFieldWrapper.prop('options')).toBe(options);
      expect(baseSelectFieldWrapper.prop('onChange')).toBe(instance.handleChange);
      expect(baseSelectFieldWrapper.prop('selectedValues')).toEqual(['bar']);
      expect(baseSelectFieldWrapper.prop('isDisabled')).toEqual(false);
    });
    test('should render a BaseSelectField with options that includes a clear option if shouldShowClearOption is true', function () {
      var intl = {
        formatMessage: jest.fn().mockImplementationOnce(function () {
          return 'Clear All';
        })
      };
      var wrapper = shallow(React.createElement(SingleSelectFieldBase, {
        intl: intl,
        isDisabled: false,
        onChange: onChangeStub,
        options: options,
        selectedValue: "bar",
        shouldShowClearOption: true
      }));
      var baseSelectFieldWrapper = wrapper.find('BaseSelectField');
      var expectedOptions = options;
      expectedOptions.unshift({
        value: CLEAR,
        displayText: 'Clear All'
      });
      expect(baseSelectFieldWrapper.prop('options')).toEqual(expectedOptions);
    });
    test('should strip out props that are multi-select specific when called', function () {
      var wrapper = shallow(React.createElement(SingleSelectFieldBase, {
        defaultValue: "foo",
        multiple: true,
        onChange: onChangeStub,
        options: options,
        placeholder: "Select something",
        selectedValue: "foo"
      }));
      var baseSelectFieldWrapper = wrapper.find('BaseSelectField');
      expect(baseSelectFieldWrapper.length).toBe(1);
      expect(baseSelectFieldWrapper.prop('options')).toBe(options);
      expect(baseSelectFieldWrapper.prop('onChange')).not.toBe(onChangeStub);
      expect(baseSelectFieldWrapper.prop('defaultValue')).toBeFalsy();
      expect(baseSelectFieldWrapper.prop('placeholder')).toBe('Select something');
      expect(baseSelectFieldWrapper.prop('multiple')).toBeFalsy();
    });
  });
  describe('handleChange()', function () {
    test('should call onChange() with an object with value of null when there are no selected items', function () {
      var onChangeMock = sandbox.mock().withArgs({
        value: null
      });
      var wrapper = shallow(React.createElement(SingleSelectFieldBase, {
        onChange: onChangeMock,
        options: options,
        selectedValue: "foo"
      }));
      var instance = wrapper.instance();
      instance.handleChange([]);
    });
    test('should call onChange() when there is a selected item', function () {
      var onChangeMock = sandbox.mock().withArgs('foo');
      var wrapper = shallow(React.createElement(SingleSelectFieldBase, {
        onChange: onChangeMock,
        options: options,
        selectedValue: "foo"
      }));
      var instance = wrapper.instance();
      instance.handleChange(['foo']);
    });
    test('should not call onChange() when there are more than 1 selected items (potentially an error)', function () {
      var onChangeMock = sandbox.mock().never();
      var wrapper = shallow(React.createElement(SingleSelectFieldBase, {
        onChange: onChangeMock,
        options: options,
        selectedValue: "foo"
      }));
      var instance = wrapper.instance();
      instance.handleChange(['foo', 'bar']);
    });
  });
});