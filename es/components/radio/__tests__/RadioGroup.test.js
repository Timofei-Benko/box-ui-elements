function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { RadioButton, RadioGroup } from '..';
var sandbox = sinon.sandbox.create();
describe('components/radio/RadioGroup', function () {
  afterEach(function () {
    sandbox.verifyAndRestore();
  });

  var renderRadioButtons = function renderRadioButtons(onChange, children) {
    children = children || [React.createElement(RadioButton, {
      key: "1",
      "data-resin-target": "resin1",
      description: "radio1desc",
      label: "Radio Button 1",
      value: "radio1"
    }), React.createElement(RadioButton, {
      key: "2",
      label: "Radio Button 2",
      value: "radio2"
    }), React.createElement(RadioButton, {
      key: "3",
      description: "radio3desc",
      label: "Radio Button 3",
      value: "radio3"
    }), React.createElement(RadioButton, {
      key: "4",
      label: "Radio Button 4",
      value: "radio4"
    })];
    return mount(React.createElement(RadioGroup, {
      name: "radiogroup",
      onChange: onChange,
      value: "radio3"
    }, children));
  };

  test('should correctly render component with radio buttons', function () {
    var component = renderRadioButtons();
    expect(component.find('.radio-group')).toBeTruthy();
    expect(component.find('input[name="radiogroup"]').length).toEqual(4);
    expect(component.find('.radio-description').at(0).text()).toEqual('radio1desc');
    expect(component.find('.radio-description').at(1).text()).toEqual('radio3desc');
  });
  test('should set correct value to input', function () {
    var component = renderRadioButtons();
    expect(component.find('input').at(0).prop('value')).toEqual('radio1');
    expect(component.find('input').at(0).prop('value')).toEqual('radio1');
  });
  test('should pass rest of props to input', function () {
    var component = renderRadioButtons();
    var inputEl = component.find('input').at(0);
    expect(inputEl.prop('data-resin-target')).toEqual('resin1');
  });
  test('should select the correct radio button based on value', function () {
    var component = renderRadioButtons();
    expect(component.find('input[name="radiogroup"]').at(2).prop('checked')).toEqual(true);
  });
  test('should call onChange callback when onchange triggers', function () {
    var onChange = sandbox.spy();
    var component = renderRadioButtons(onChange);
    var inputEl = component.find('input').at(0).getDOMNode();
    inputEl.value = 'radio4';
    var event = {
      target: inputEl
    };
    component.simulate('change', event);
    expect(onChange.calledWithMatch(event)).toBeTruthy();
  });
  test('should update state when change event is fired', function () {
    var component = renderRadioButtons();
    var inputEl = component.find('input').at(0).getDOMNode();
    inputEl.value = 'radio4';
    component.simulate('change', {
      target: inputEl
    });
    expect(component.state('value')).toEqual('radio4');
    expect(component.find('input[name="radiogroup"]').at(2).prop('checked')).toEqual(false);
    expect(component.find('input[name="radiogroup"]').at(3).prop('checked')).toEqual(true);
  });
  test('should preserve radio button component type and props', function () {
    var radioButtonProps = {
      'data-resin-target': 'resinTarget',
      description: 'description',
      label: 'label',
      randomProp: true,
      value: 'radio3'
    };

    var CustomRadioButton = function CustomRadioButton() {
      return React.createElement("span", null);
    };

    var component = renderRadioButtons(jest.fn(), React.createElement(CustomRadioButton, radioButtonProps));
    expect(component.find(CustomRadioButton).at(0).props()).toEqual(_objectSpread({}, radioButtonProps, {
      isSelected: true,
      name: 'radiogroup'
    }));
  });
});