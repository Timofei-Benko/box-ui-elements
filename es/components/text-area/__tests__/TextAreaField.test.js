import React from 'react';
import TextAreaField from '../TextAreaField';
describe('components/text-area/TextAreaField', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(TextAreaField, props));
  };

  test('should render properly', function () {
    var wrapper = getWrapper({
      field: {
        name: 'textarea',
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
        name: 'textarea',
        value: 'value',
        onBlur: 'onblur',
        onChange: 'onchange'
      },
      form: {
        errors: {
          textarea: 'error'
        },
        touched: {
          textarea: true
        }
      },
      label: 'Enter things'
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should hide optional label when required', function () {
    var wrapper = getWrapper({
      field: {
        name: 'textarea',
        value: 'value',
        onBlur: 'onblur',
        onChange: 'onchange'
      },
      form: {
        errors: {
          textarea: 'error'
        },
        touched: {
          textarea: true
        }
      },
      isRequired: true,
      label: 'Enter things'
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should forward innerRef to textareaRef', function () {
    var wrapper = getWrapper({
      field: {
        name: 'textarea',
        value: 'value',
        onBlur: 'onblur',
        onChange: 'onchange'
      },
      form: {
        errors: {
          textarea: 'error'
        },
        touched: {
          textarea: true
        }
      },
      isRequired: true,
      label: 'Enter things',
      innerRef: 'ref'
    });
    expect(wrapper).toMatchSnapshot();
  });
});