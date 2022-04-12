/* eslint-disable no-console */
import React from 'react';
import { shallow } from 'enzyme';
import RadioGroupField from '../RadioGroupField';
describe('components/radio/RadioGroupField', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(RadioGroupField, props));
  };

  test('should render properly', function () {
    var wrapper = getWrapper({
      children: [],
      className: 'bdl-CupcakeFlavors',
      field: {
        name: 'radiogroup',
        value: 'value',
        onBlur: function onBlur() {
          return console.log('blur');
        },
        onChange: function onChange() {
          return console.log('change');
        }
      },
      name: 'Cupcake Flavors'
    });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop('value')).toBe('value');
  });
  test('should render a basic RadioGroup when no field property is provided', function () {
    var wrapper = getWrapper({
      children: [],
      className: ''
    });
    expect(wrapper).toMatchSnapshot();
  });
});