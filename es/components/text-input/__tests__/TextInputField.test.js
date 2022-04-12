import React from 'react';
import TextInputField from '../TextInputField';
describe('components/text-input/TextInputField', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(TextInputField, props));
  };

  test('should render properly', function () {
    var wrapper = getWrapper({
      field: {
        name: 'input',
        value: 'value',
        onBlur: 'onblur',
        onChange: 'onchange'
      },
      form: {},
      label: 'Enter things'
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render properly with error', function () {
    var wrapper = getWrapper({
      field: {
        name: 'input',
        value: 'value',
        onBlur: 'onblur',
        onChange: 'onchange'
      },
      form: {
        errors: {
          input: 'error'
        },
        touched: {
          input: true
        }
      },
      label: 'Enter things'
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should hide optional label when required', function () {
    var wrapper = getWrapper({
      field: {
        name: 'input',
        value: 'value',
        onBlur: 'onblur',
        onChange: 'onchange'
      },
      form: {
        errors: {
          input: 'error'
        },
        touched: {
          input: true
        }
      },
      isRequired: true,
      label: 'Enter things'
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should forward innerRef to inputRef', function () {
    var wrapper = getWrapper({
      field: {
        name: 'input',
        value: 'value',
        onBlur: 'onblur',
        onChange: 'onchange'
      },
      form: {
        errors: {
          input: 'error'
        },
        touched: {
          input: true
        }
      },
      isRequired: true,
      label: 'Enter things',
      innerRef: 'ref'
    });
    expect(wrapper).toMatchSnapshot();
  });
});