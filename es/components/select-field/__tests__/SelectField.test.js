import React from 'react';
import SelectField, { onSelect } from '../SelectField';
describe('components/select-feild/SelectField', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(SelectField, props));
  };

  test('should render properly for single select field', function () {
    var wrapper = getWrapper({
      field: {
        name: 'toggle',
        value: 'value',
        onBlur: 'onblur',
        onChange: 'onchange'
      },
      form: {},
      label: 'Enter things'
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render properly for multi select field', function () {
    var wrapper = getWrapper({
      field: {
        name: 'toggle',
        value: 'value',
        onBlur: 'onblur',
        onChange: 'onchange'
      },
      form: {},
      label: 'Enter things',
      multiple: true
    });
    expect(wrapper).toMatchSnapshot();
  });
  describe('onSelect()', function () {
    test('should call onChange with single value when using single select', function () {
      var name = 'name';
      var option = {
        value: 0
      };
      var onChange = jest.fn();
      onSelect(name, onChange, option);
      expect(onChange).toHaveBeenCalledWith({
        currentTarget: {
          name: name,
          value: option.value
        },
        target: {
          name: name,
          value: option.value
        }
      });
    });
    test('should call onChange with array of values when called with multiple select', function () {
      var name = 'name';
      var options = [{
        value: 0
      }, {
        value: 1
      }];
      var onChange = jest.fn();
      onSelect(name, onChange, options);
      expect(onChange).toHaveBeenCalledWith({
        currentTarget: {
          name: name,
          value: [0, 1]
        },
        target: {
          name: name,
          value: [0, 1]
        }
      });
    });
  });
});