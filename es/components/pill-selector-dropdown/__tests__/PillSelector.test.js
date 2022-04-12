import React from 'react';
import { mount, shallow } from 'enzyme';
import { List, Record } from 'immutable';
import sinon from 'sinon';
import PillSelector from '../PillSelector';
var sandbox = sinon.sandbox.create();
describe('components/pill-selector-dropdown/PillSelector', function () {
  var onInputStub = sandbox.stub();
  var onRemoveStub = sandbox.stub();
  var OptionRecord = Record({
    text: '',
    value: ''
  });
  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  describe('render()', function () {
    test('should render default component', function () {
      var placeholder = 'test';
      var wrapper = shallow(React.createElement(PillSelector, {
        onInput: onInputStub,
        onRemove: onRemoveStub,
        placeholder: placeholder
      }));
      var input = wrapper.find('textarea');
      var selector = wrapper.find('.bdl-PillSelector');
      expect(wrapper.find('Tooltip').exists()).toBe(true);
      expect(selector.length).toBe(1);
      expect(input.length).toBe(1);
      expect(input.prop('onInput')).toEqual(onInputStub);
      expect(input.prop('placeholder')).toEqual(placeholder);
    });
    test('should render disabled component', function () {
      var wrapper = shallow(React.createElement(PillSelector, {
        disabled: true,
        onInput: function onInput() {},
        onRemove: function onRemove() {}
      }));
      expect(wrapper).toMatchSnapshot();
    });
    test('should add is-focused class when input is focused', function () {
      var wrapper = shallow(React.createElement(PillSelector, {
        onInput: onInputStub,
        onRemove: onRemoveStub
      }));
      wrapper.setState({
        isFocused: true
      });
      expect(wrapper.find('.is-focused').length).toBe(1);
    });
    test('should not add is-focused class when input is not focused', function () {
      var wrapper = shallow(React.createElement(PillSelector, {
        onInput: onInputStub,
        onRemove: onRemoveStub
      }));
      wrapper.setState({
        isFocused: false
      });
      expect(wrapper.find('.is-focused').length).toBe(0);
    });
    test('should add show-error class when error is given', function () {
      var wrapper = shallow(React.createElement(PillSelector, {
        error: "hello",
        onInput: onInputStub,
        onRemove: onRemoveStub
      }));
      expect(wrapper.find('.show-error').length).toBe(1);
    });
    test('should not add show-error class when error is not given', function () {
      var wrapper = shallow(React.createElement(PillSelector, {
        onInput: onInputStub,
        onRemove: onRemoveStub
      }));
      expect(wrapper.find('.show-error').length).toBe(0);
    });
    test('should render pills when there are selected options using legacy text attribute', function () {
      var options = [{
        text: 'test',
        value: 'test'
      }, {
        text: 'blah',
        value: 'hi'
      }];
      var wrapper = shallow(React.createElement(PillSelector, {
        onInput: onInputStub,
        onRemove: onRemoveStub,
        selectedOptions: options
      }));
      expect(wrapper.find('Pill').length).toBe(2);
    });
    test('should render RoundPill instead of standard Pill when showRoundedPills prop is true', function () {
      var options = [{
        text: 'test',
        value: 'test'
      }];
      var wrapper = shallow(React.createElement(PillSelector, {
        onInput: onInputStub,
        onRemove: onRemoveStub,
        selectedOptions: options,
        showRoundedPills: true
      }));
      expect(wrapper.find('RoundPill').length).toBe(1);
    });
    test('should render pills when there are selected options', function () {
      var options = [{
        displayText: 'test',
        value: 'test'
      }, {
        displayText: 'blah',
        value: 'hi'
      }];
      var wrapper = shallow(React.createElement(PillSelector, {
        onInput: onInputStub,
        onRemove: onRemoveStub,
        selectedOptions: options
      }));
      var pills = wrapper.find('Pill');
      expect(pills.length).toBe(2);
      expect(pills.at(0).prop('isValid')).toBeTruthy();
      expect(pills.at(1).prop('isValid')).toBeTruthy();
    });
    test('should render invalid pills when validator is provided and allowInvalidPills is true', function () {
      var validator = function validator(_ref) {
        var displayText = _ref.displayText;
        // W3C type="email" input validation
        var pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return pattern.test(displayText);
      };

      var options = [{
        displayText: 'test',
        value: 'test'
      }, {
        displayText: 'blah',
        value: 'hi'
      }];
      var wrapper = shallow(React.createElement(PillSelector, {
        allowInvalidPills: true,
        onInput: onInputStub,
        onRemove: onRemoveStub,
        selectedOptions: options,
        validator: validator
      }));
      var pills = wrapper.find('Pill');
      expect(pills.length).toBe(2);
      expect(pills.at(0).prop('isValid')).toBeFalsy();
      expect(pills.at(1).prop('isValid')).toBeFalsy();
    });
    test('should render round pills using the class name returned by getPillClassName', function () {
      var getPillClassName = function getPillClassName(_ref2) {
        var className = _ref2.className;
        return className;
      };

      var options = [{
        displayText: 'Pill 1',
        value: '1',
        className: 'MyClass1'
      }, {
        displayText: 'Pill 2',
        value: '2',
        className: 'MyClass2'
      }, {
        displayText: 'Pill 3',
        value: '3',
        className: 'MyClass2'
      }];
      var wrapper = shallow(React.createElement(PillSelector, {
        showRoundedPills: true,
        onInput: onInputStub,
        onRemove: onRemoveStub,
        selectedOptions: options,
        getPillClassName: getPillClassName
      }));
      var pills = wrapper.find('RoundPill');
      expect(pills.at(0).prop('className')).toBe(options[0].className);
      expect(pills.at(1).prop('className')).toBe(options[1].className);
      expect(pills.at(2).prop('className')).toBe(options[2].className);
    });
    test('should render pills when selected options are immutable', function () {
      var options = new List([new OptionRecord({
        text: 'test',
        value: 'test'
      }), new OptionRecord({
        text: 'blah',
        value: 'hi'
      })]);
      var wrapper = shallow(React.createElement(PillSelector, {
        onInput: onInputStub,
        onRemove: onRemoveStub,
        selectedOptions: options
      }));
      expect(wrapper.find('Pill').length).toBe(2);
    });
    test('should render pill as selected when selected index is set', function () {
      var options = [{
        text: 'test',
        value: 'test'
      }, {
        text: 'blah',
        value: 'hi'
      }];
      var wrapper = shallow(React.createElement(PillSelector, {
        onInput: onInputStub,
        onRemove: onRemoveStub,
        selectedOptions: options
      }));
      wrapper.setState({
        selectedIndex: 0
      });
      expect(wrapper.find('Pill').at(0).prop('isSelected')).toBe(true);
    });
    test('should render hidden pill selection helper', function () {
      var wrapper = shallow(React.createElement(PillSelector, {
        onInput: onInputStub,
        onRemove: onRemoveStub
      }));
      var hidden = wrapper.find('[data-testid="pill-selection-helper"]');
      var instance = wrapper.instance();
      expect(hidden.length).toBe(1);
      expect(hidden.prop('onBlur')).toEqual(instance.resetSelectedIndex);
    });
    test('should render class name on input when specified', function () {
      var className = 'test';
      var wrapper = shallow(React.createElement(PillSelector, {
        className: className,
        onInput: onInputStub,
        onRemove: onRemoveStub
      }));
      var input = wrapper.find('textarea');
      expect(input.hasClass('bdl-PillSelector-input')).toBe(true);
      expect(input.hasClass(className)).toBe(true);
    });
    test('should pass input props when specified', function () {
      var role = 'combobox';
      var wrapper = shallow(React.createElement(PillSelector, {
        inputProps: {
          role: role
        },
        onInput: onInputStub,
        onRemove: onRemoveStub
      }));
      expect(wrapper.find('textarea').prop('role')).toEqual(role);
    });
    test('should pass through additional props when specified', function () {
      var value = 'test';
      var wrapper = shallow(React.createElement(PillSelector, {
        onChange: function onChange() {},
        onInput: onInputStub,
        onRemove: onRemoveStub,
        value: value
      }));
      expect(wrapper.find('textarea').prop('value')).toEqual(value);
    });
    test('should not render placeholder when there are pills', function () {
      var options = [{
        text: 'test',
        value: 'test'
      }];
      var wrapper = shallow(React.createElement(PillSelector, {
        onInput: onInputStub,
        onRemove: onRemoveStub,
        selectedOptions: options
      }));
      expect(wrapper.find('textarea').prop('placeholder')).toEqual('');
    });
    test('should not render placeholder when there are immutable pills', function () {
      var options = new List([new OptionRecord({
        text: 'test',
        value: 'test'
      })]);
      var wrapper = shallow(React.createElement(PillSelector, {
        onInput: onInputStub,
        onRemove: onRemoveStub,
        selectedOptions: options
      }));
      expect(wrapper.find('textarea').prop('placeholder')).toEqual('');
    });
  });
  describe('onBlur', function () {
    test('should set isFocused to false when called', function () {
      var wrapper = shallow(React.createElement(PillSelector, {
        onInput: onInputStub,
        onRemove: onRemoveStub
      }));
      wrapper.setState({
        isFocused: true
      });
      var inputWrapper = wrapper.find('.bdl-PillSelector');
      inputWrapper.simulate('blur');
      expect(wrapper.state('isFocused')).toBe(false);
    });
  });
  describe('onClick', function () {
    test('should focus input when called', function () {
      var wrapper = mount(React.createElement(PillSelector, {
        onInput: onInputStub,
        onRemove: onRemoveStub
      }));
      sandbox.mock(wrapper.find('textarea').getDOMNode()).expects('focus');
      wrapper.simulate('click');
    });
  });
  describe('onFocus', function () {
    test('should set isFocused to true when called', function () {
      var wrapper = shallow(React.createElement(PillSelector, {
        onInput: onInputStub,
        onRemove: onRemoveStub
      }));
      var inputWrapper = wrapper.find('.bdl-PillSelector');
      inputWrapper.simulate('focus');
      expect(wrapper.state('isFocused')).toBe(true);
    });
  });
  describe('onKeyDown - Backspace', function () {
    test('should remove selected pill when backspace is pressed', function () {
      var option = {
        text: 'test',
        value: 'test'
      };
      var options = [option, {
        text: 'blah',
        value: 'blah'
      }];
      var wrapper = mount(React.createElement(PillSelector, {
        onInput: onInputStub,
        onRemove: onRemoveStub,
        selectedOptions: options
      }));
      var instance = wrapper.instance();
      wrapper.setState({
        selectedIndex: 0
      });
      sandbox.mock(instance).expects('resetSelectedIndex');
      sandbox.mock(wrapper.find('textarea').getDOMNode()).expects('focus');
      wrapper.simulate('keyDown', {
        key: 'Backspace',
        preventDefault: sandbox.mock(),
        stopPropagation: sandbox.mock()
      });
      expect(onRemoveStub.calledWith(option, 0)).toBe(true);
    });
    test('should not prevent default when backspace is pressed and the input has value', function () {
      var wrapper = mount(React.createElement(PillSelector, {
        onChange: function onChange() {},
        onInput: onInputStub,
        onRemove: onRemoveStub,
        value: "test"
      }));
      wrapper.simulate('keyDown', {
        key: 'Backspace',
        preventDefault: sandbox.mock().never(),
        stopPropagation: sandbox.mock().never()
      });
    });
    test('should call onRemove() when backspace is pressed and there are pills but no input value', function () {
      var option = {
        text: 'test',
        value: 'test'
      };
      var options = [{
        text: 'blah',
        value: 'blah'
      }, option];
      var wrapper = mount(React.createElement(PillSelector, {
        onInput: onInputStub,
        onRemove: onRemoveStub,
        selectedOptions: options
      }));
      wrapper.simulate('keyDown', {
        key: 'Backspace',
        preventDefault: sandbox.mock(),
        stopPropagation: sandbox.mock()
      });
      expect(onRemoveStub.calledWith(option, 1)).toBe(true);
    });
    test('should call onRemove() when backspace is pressed and there are immutable pills but no input value', function () {
      var option = new OptionRecord({
        text: 'test',
        value: 'test'
      });
      var options = new List([new OptionRecord({
        text: 'blah',
        value: 'blah'
      }), option]);
      var wrapper = mount(React.createElement(PillSelector, {
        onInput: onInputStub,
        onRemove: onRemoveStub,
        selectedOptions: options
      }));
      wrapper.simulate('keyDown', {
        key: 'Backspace',
        preventDefault: sandbox.mock(),
        stopPropagation: sandbox.mock()
      });
      expect(onRemoveStub.calledWith(option, 1)).toBe(true);
    });
    test('should not call onRemove() when backspace is pressed and there are no pills and no input value', function () {
      var wrapper = mount(React.createElement(PillSelector, {
        onInput: onInputStub,
        onRemove: onRemoveStub
      }));
      wrapper.simulate('keyDown', {
        key: 'Backspace',
        preventDefault: sandbox.mock().never(),
        stopPropagation: sandbox.mock().never()
      });
      expect(onRemoveStub.calledOnce).toBe(false);
    });
  });
  describe('onKeyDown - ArrowLeft', function () {
    test('should select previous pill when left arrow is pressed and pill is selected', function () {
      var wrapper = mount(React.createElement(PillSelector, {
        onInput: onInputStub,
        onRemove: onRemoveStub
      }));
      wrapper.setState({
        selectedIndex: 1
      });
      wrapper.simulate('keyDown', {
        key: 'ArrowLeft',
        preventDefault: sandbox.mock(),
        stopPropagation: sandbox.mock()
      });
      expect(wrapper.state('selectedIndex')).toEqual(0);
    });
    test('should keep first pill selected when left arrow is pressed and first pill is selected', function () {
      var wrapper = mount(React.createElement(PillSelector, {
        onInput: onInputStub,
        onRemove: onRemoveStub
      }));
      wrapper.setState({
        selectedIndex: 0
      });
      wrapper.simulate('keyDown', {
        key: 'ArrowLeft',
        preventDefault: sandbox.mock(),
        stopPropagation: sandbox.mock()
      });
      expect(wrapper.state('selectedIndex')).toEqual(0);
    });
    test('should select last pill when left arrow is pressed, input does not have value, and there are pills', function () {
      var options = [{
        text: 'test',
        value: 'test'
      }, {
        text: 'blah',
        value: 'blah'
      }];
      var wrapper = mount(React.createElement(PillSelector, {
        onInput: onInputStub,
        onRemove: onRemoveStub,
        selectedOptions: options
      }));
      sandbox.mock(wrapper.find('[data-testid="pill-selection-helper"]').getDOMNode()).expects('focus');
      wrapper.simulate('keyDown', {
        key: 'ArrowLeft',
        preventDefault: sandbox.mock(),
        stopPropagation: sandbox.mock()
      });
      expect(wrapper.state('selectedIndex')).toEqual(1);
    });
    test('should not prevent default when left arrow is pressed and the input has value', function () {
      var wrapper = mount(React.createElement(PillSelector, {
        onChange: function onChange() {},
        onInput: onInputStub,
        onRemove: onRemoveStub,
        value: "test"
      }));
      wrapper.simulate('keyDown', {
        key: 'ArrowLeft',
        preventDefault: sandbox.mock().never(),
        stopPropagation: sandbox.mock().never()
      });
    });
  });
  describe('onKeyDown - ArrowRight', function () {
    test('should deselect last pill when right arrow is pressed and last pill is selected', function () {
      var options = [{
        text: 'test',
        value: 'test'
      }, {
        text: 'blah',
        value: 'blah'
      }];
      var wrapper = mount(React.createElement(PillSelector, {
        onInput: onInputStub,
        onRemove: onRemoveStub,
        selectedOptions: options
      }));
      var instance = wrapper.instance();
      wrapper.setState({
        selectedIndex: 1
      });
      sandbox.mock(instance).expects('resetSelectedIndex');
      sandbox.mock(wrapper.find('textarea').getDOMNode()).expects('focus');
      wrapper.simulate('keyDown', {
        key: 'ArrowRight',
        preventDefault: sandbox.mock(),
        stopPropagation: sandbox.mock()
      });
    });
    test('should select next pill when right arrow is pressed and selected pill is not last', function () {
      var options = [{
        text: 'test',
        value: 'test'
      }, {
        text: 'blah',
        value: 'blah'
      }];
      var wrapper = mount(React.createElement(PillSelector, {
        onInput: onInputStub,
        onRemove: onRemoveStub,
        selectedOptions: options
      }));
      wrapper.setState({
        selectedIndex: 0
      });
      wrapper.simulate('keyDown', {
        key: 'ArrowRight',
        preventDefault: sandbox.mock(),
        stopPropagation: sandbox.mock()
      });
      expect(wrapper.state('selectedIndex')).toEqual(1);
    });
    test('should not prevent default when right arrow is pressed and no pill is selected', function () {
      var wrapper = mount(React.createElement(PillSelector, {
        onInput: onInputStub,
        onRemove: onRemoveStub
      }));
      wrapper.simulate('keyDown', {
        key: 'ArrowRight',
        preventDefault: sandbox.mock().never(),
        stopPropagation: sandbox.mock().never()
      });
    });
  });
  describe('onRemove', function () {
    test('should call onRemove() when pill onRemove is triggered', function () {
      var option = {
        text: 'test',
        value: 'test'
      };
      var options = [option, {
        text: 'blah',
        value: 'blah'
      }];
      var wrapper = shallow(React.createElement(PillSelector, {
        onInput: onInputStub,
        onRemove: onRemoveStub,
        selectedOptions: options
      }));
      wrapper.find('Pill').at(0).prop('onRemove')();
      expect(onRemoveStub.calledWith(option, 0)).toBe(true);
    });
    test('should call onRemove() when immutable pill onRemove is triggered', function () {
      var option = new OptionRecord({
        text: 'test',
        value: 'test'
      });
      var options = new List([option, new OptionRecord({
        text: 'blah',
        value: 'blah'
      })]);
      var wrapper = shallow(React.createElement(PillSelector, {
        onInput: onInputStub,
        onRemove: onRemoveStub,
        selectedOptions: options
      }));
      wrapper.find('Pill').at(0).prop('onRemove')();
      expect(onRemoveStub.calledWith(option, 0)).toBe(true);
    });
  });
  describe('resetSelectedIndex()', function () {
    test('should reset selected index when called', function () {
      var wrapper = shallow(React.createElement(PillSelector, {
        onInput: onInputStub,
        onRemove: onRemoveStub
      }));
      var instance = wrapper.instance();
      wrapper.setState({
        selectedIndex: 1
      });
      instance.resetSelectedIndex();
      expect(wrapper.state('selectedIndex')).toEqual(-1);
    });
  });
});