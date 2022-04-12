function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { shallow } from 'enzyme';
import RadioButton from '../RadioButton';
describe('components/radio/RadioButton', function () {
  var renderRadioButtons = function renderRadioButtons(props) {
    return React.createElement(RadioButton, _extends({
      description: "radio1desc",
      label: "Select things",
      name: "name1",
      value: "1"
    }, props));
  };

  test('should correctly render default component', function () {
    var component = shallow(renderRadioButtons());
    expect(component.find('.radio-container')).toBeTruthy();
    expect(component.find('label')).toBeTruthy();
    expect(component.find('input').prop('name')).toEqual('name1');
    expect(component.find('input').prop('checked')).toEqual(false);
    expect(component.find('input').prop('type')).toEqual('radio');
    expect(component.find('input').prop('value')).toEqual('1');
    expect(component.find('input').prop('value')).toEqual('1');
    expect(component.find('.radio-description').text()).toEqual('radio1desc');
    expect(component.find('span').at(1).text()).toEqual('Select things');
  });
  test('should be selected on when isSelected is true', function () {
    var component = shallow(renderRadioButtons({
      isSelected: true
    }));
    expect(component.find('input').prop('checked')).toEqual(true);
  });
  test('should pass rest of props to input', function () {
    var resinTarget = 'resin';
    var component = shallow(renderRadioButtons({
      'data-resin-target': resinTarget
    }));
    expect(component.find('input').prop('data-resin-target')).toEqual(resinTarget);
  });
  test('should add accessibility-hidden class when hideLabel is true', function () {
    var component = shallow(renderRadioButtons({
      hideLabel: true
    }));
    expect(component.find('.accessibility-hidden').length).toBe(1);
  });
});