import React from 'react';
import { MultiSelectFieldBase } from '../MultiSelectField';
import CLEAR from '../constants';
describe('components/select-field/MultiSelectField', function () {
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
  describe('MultiSelectField', function () {
    test('should render a BaseSelectField with a selectedValues prop matching passed in selected value when called', function () {
      var wrapper = shallow(React.createElement(MultiSelectFieldBase, {
        onChange: function onChange() {},
        options: options
      }));
      var baseSelectFieldWrapper = wrapper.find('BaseSelectField');
      expect(baseSelectFieldWrapper.length).toBe(1);
      expect(baseSelectFieldWrapper.prop('options')).toEqual(options);
      expect(baseSelectFieldWrapper.prop('multiple')).toBe(true);
    });
    test('should render a BaseSelectField with an options prop containing a clear option if shouldShowClearOption is true', function () {
      var intl = {
        formatMessage: jest.fn().mockImplementationOnce(function () {
          return 'Clear All';
        })
      };
      var wrapper = shallow(React.createElement(MultiSelectFieldBase, {
        intl: intl,
        onChange: function onChange() {},
        options: options,
        shouldShowClearOption: true
      }));
      var expectedOptions = [{
        value: CLEAR,
        displayText: 'Clear All'
      }].concat(options);
      var baseSelectFieldWrapper = wrapper.find('BaseSelectField');
      expect(baseSelectFieldWrapper.length).toBe(1);
      expect(baseSelectFieldWrapper.prop('options')).toEqual(expectedOptions);
    });
  });
});