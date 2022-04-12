function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { List, Record } from 'immutable';
import PillSelectorDropdown from '../PillSelectorDropdown';
describe('components/pill-selector-dropdown/PillSelectorDropdown', function () {
  var OptionRecord = Record({
    text: '',
    value: ''
  });

  var getWrapper = function getWrapper(props, children) {
    var options = children || React.createElement(React.Fragment, null, React.createElement("div", null, "Option 1"), React.createElement("div", null, "Option 2"));
    return shallow(React.createElement(PillSelectorDropdown, _extends({
      inputProps: {
        'aria-label': 'test'
      },
      onInput: jest.fn(),
      onRemove: jest.fn(),
      onSelect: jest.fn()
    }, props), options));
  };

  describe('render()', function () {
    test('should render selector dropdown', function () {
      var className = 'test';
      var children = 'hi';
      var wrapper = getWrapper({
        className: className
      }, children);
      var instance = wrapper.instance();
      var selectorDropdown = wrapper.find('SelectorDropdown');
      expect(selectorDropdown.is('SelectorDropdown')).toBe(true);
      expect(selectorDropdown.hasClass('bdl-PillSelectorDropdown')).toBe(true);
      expect(selectorDropdown.hasClass(className)).toBe(true);
      expect(selectorDropdown.prop('onEnter')).toEqual(instance.handleEnter);
      expect(selectorDropdown.prop('onSelect')).toEqual(instance.handleSelect);
      expect(selectorDropdown.contains(children)).toBe(true);
    });
    test('should render pill selector', function () {
      var inputProps = {
        'aria-label': 'test'
      };
      var wrapper = getWrapper({
        inputProps: inputProps
      });
      wrapper.setState({
        inputValue: 'value'
      });
      var pillSelector = shallow(wrapper.find('SelectorDropdown').prop('selector'));
      var instance = pillSelector.instance();
      expect(pillSelector.prop('onInput')).toEqual(instance.handleInput);
      expect(pillSelector.prop('onPaste')).toEqual(instance.handlePaste);
      expect(pillSelector.instance().props.value).toEqual('value');
    });
    test('should render disabled pill selector', function () {
      var wrapper = getWrapper({
        disabled: true
      });
      wrapper.setState();
      expect(wrapper).toMatchSnapshot();
    });
    test('should call addPillsFromInput when pill selector is blurred', function () {
      var wrapper = getWrapper();
      wrapper.setState({
        inputValue: 'value'
      });
      var instance = wrapper.instance();
      var addPillsFromInputMock = jest.fn();
      instance.addPillsFromInput = addPillsFromInputMock;
      instance.handleBlur();
      expect(addPillsFromInputMock).toHaveBeenCalledTimes(1);
    });
    test.each([['test', true], ['', false]])('should render Label component when label exists', function (value, expected) {
      var labelProp = {
        label: value
      };
      var wrapper = getWrapper(labelProp);
      expect(wrapper.exists('Label')).toBe(expected);
    });
  });
  describe('parsePills', function () {
    test('should return a formatted map of pills', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      var inputValues = 'value1, value2,value3';
      wrapper.setState({
        inputValue: inputValues
      });
      var result = instance.parsePills(inputValues);
      expect(result).toEqual([{
        displayText: 'value1',
        text: 'value1',
        value: 'value1'
      }, {
        displayText: 'value2',
        text: 'value2',
        value: 'value2'
      }, {
        displayText: 'value3',
        text: 'value3',
        value: 'value3'
      }]);
    });
    test('should only return pills that pass validator if one is provided and allowInvalidPills is false', function () {
      var validator = function validator(text) {
        // W3C type="email" input validation
        var pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return pattern.test(text);
      };

      var wrapper = getWrapper({
        validator: validator
      });
      var instance = wrapper.instance();
      var inputValues = 'aaron@example.com, bademail,hello@gmail.com';
      wrapper.setState({
        inputValue: inputValues
      });
      var result = instance.parsePills(inputValues);
      expect(result).toEqual([{
        displayText: 'aaron@example.com',
        text: 'aaron@example.com',
        value: 'aaron@example.com'
      }, {
        displayText: 'hello@gmail.com',
        text: 'hello@gmail.com',
        value: 'hello@gmail.com'
      }]);
    });
    test('should ignore validator if one is provided but allowInvalidPills is true', function () {
      var validator = function validator(text) {
        // W3C type="email" input validation
        var pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return pattern.test(text);
      };

      var wrapper = getWrapper({
        allowInvalidPills: true,
        validator: validator
      });
      var instance = wrapper.instance();
      var inputValues = 'aaron@example.com, bademail, hello@gmail.com';
      wrapper.setState({
        inputValue: inputValues
      });
      var result = instance.parsePills(inputValues);
      expect(result).toEqual([{
        displayText: 'aaron@example.com',
        text: 'aaron@example.com',
        value: 'aaron@example.com'
      }, {
        displayText: 'bademail',
        text: 'bademail',
        value: 'bademail'
      }, {
        displayText: 'hello@gmail.com',
        text: 'hello@gmail.com',
        value: 'hello@gmail.com'
      }]);
    });
    test('should not map pills to options when custom parser returns array of objects', function () {
      var wrapper = getWrapper({
        allowInvalidPills: true
      });
      wrapper.setState({
        inputValue: 'a,b'
      });

      var _wrapper$instance = wrapper.instance(),
          parsePills = _wrapper$instance.parsePills;

      var stringParser = function stringParser(input) {
        return input.split(',');
      };

      var optionParser = function optionParser(input) {
        return input.split(',').map(function (token) {
          return {
            customProp: token
          };
        });
      };

      wrapper.setProps({
        parseItems: stringParser
      });
      expect(parsePills('a,b')).toStrictEqual([{
        displayText: 'a',
        text: 'a',
        value: 'a'
      }, {
        displayText: 'b',
        text: 'b',
        value: 'b'
      }]);
      wrapper.setProps({
        parseItems: optionParser
      });
      expect(parsePills('a,b')).toStrictEqual([{
        customProp: 'a'
      }, {
        customProp: 'b'
      }]);
    });
  });
  describe('addPillsFromInput', function () {
    test('should not call onSelect and onPillCreate if allowCustomPills prop is not provided', function () {
      var onPillCreateMock = jest.fn();
      var onSelectMock = jest.fn();
      var wrapper = getWrapper({
        onPillCreate: onPillCreateMock,
        onSelect: onSelectMock
      });
      var instance = wrapper.instance();
      var inputValue = 'value';
      wrapper.setState({
        inputValue: inputValue
      });
      instance.addPillsFromInput(inputValue);
      expect(onPillCreateMock).not.toHaveBeenCalled();
      expect(onSelectMock).not.toHaveBeenCalled();
    });
    test('should "select" each pill, create a user pill, reset inputValue, and not call props.validateForError if valid pills exist', function () {
      var pills = [{
        text: 'value1',
        value: 'value1'
      }, {
        text: 'value2',
        value: 'value2'
      }, {
        text: 'value3',
        value: 'value3'
      }];
      var onInputMock = jest.fn();
      var onPillCreateMock = jest.fn();
      var onSelectMock = jest.fn();
      var validateForErrorMock = jest.fn();
      var wrapper = getWrapper({
        allowCustomPills: true,
        onInput: onInputMock,
        onPillCreate: onPillCreateMock,
        onSelect: onSelectMock,
        validateForError: validateForErrorMock
      });
      var instance = wrapper.instance();
      instance.parsePills = jest.fn().mockReturnValue(pills);
      instance.addPillsFromInput();
      expect(wrapper.state('inputValue')).toEqual('');
      expect(onInputMock).toBeCalledWith('');
      expect(onPillCreateMock).toBeCalledWith(pills);
      expect(onSelectMock).toBeCalledWith(pills);
      expect(validateForErrorMock).not.toBeCalled();
    });
    test('should call props.validateForError if no pills were added but input exists', function () {
      var pills = [];
      var selectedOptions = [{
        text: 'a pill',
        value: 'pill'
      }];
      var onInputMock = jest.fn();
      var onPillCreateMock = jest.fn();
      var onSelectMock = jest.fn();
      var validateForErrorMock = jest.fn();
      var wrapper = getWrapper({
        allowCustomPills: true,
        onInput: onInputMock,
        onPillCreate: onPillCreateMock,
        onSelect: onSelectMock,
        selectedOptions: selectedOptions,
        validateForError: validateForErrorMock
      });
      var instance = wrapper.instance();
      wrapper.setState({
        inputValue: 'value1'
      });
      instance.parsePills = jest.fn().mockReturnValue(pills);
      instance.addPillsFromInput();
      expect(onInputMock).not.toBeCalled();
      expect(onPillCreateMock).not.toBeCalled();
      expect(onSelectMock).not.toBeCalled();
      expect(validateForErrorMock).toBeCalled();
    });
    test('should call props.validateForError if no pills were added and no options are selected', function () {
      var pills = [];
      var selectedOptions = [];
      var onInputMock = jest.fn();
      var onPillCreateMock = jest.fn();
      var onSelectMock = jest.fn();
      var validateForErrorMock = jest.fn();
      var wrapper = getWrapper({
        allowCustomPills: true,
        onInput: onInputMock,
        onPillCreate: onPillCreateMock,
        onSelect: onSelectMock,
        selectedOptions: selectedOptions,
        validateForError: validateForErrorMock
      });
      var instance = wrapper.instance();
      wrapper.setState({
        inputValue: ''
      });
      instance.parsePills = jest.fn().mockReturnValue(pills);
      instance.addPillsFromInput();
      expect(onInputMock).not.toBeCalled();
      expect(onPillCreateMock).not.toBeCalled();
      expect(onSelectMock).not.toBeCalled();
      expect(validateForErrorMock).toBeCalled();
    });
    test('should not call props.validateForError if no pills were added, input is empty, and options are selected', function () {
      var pills = [];
      var selectedOptions = [{
        text: 'a pill',
        value: 'pill'
      }];
      var onInputMock = jest.fn();
      var onPillCreateMock = jest.fn();
      var onSelectMock = jest.fn();
      var validateForErrorMock = jest.fn();
      var wrapper = getWrapper({
        allowCustomPills: true,
        onInput: onInputMock,
        onPillCreate: onPillCreateMock,
        onSelect: onSelectMock,
        selectedOptions: selectedOptions,
        validateForError: validateForErrorMock
      });
      var instance = wrapper.instance();
      var inputValue = '';
      wrapper.setState({
        inputValue: inputValue
      });
      instance.parsePills = jest.fn().mockReturnValue(pills);
      instance.addPillsFromInput(inputValue);
      expect(onInputMock).not.toBeCalled();
      expect(onPillCreateMock).not.toBeCalled();
      expect(onSelectMock).not.toBeCalled();
      expect(validateForErrorMock).not.toBeCalled();
    });
    test('should clear unmatched input after attempting to add pills when shouldClearUnmatchedInput is set to true', function () {
      var onPillCreateMock = jest.fn();
      var onSelectMock = jest.fn();
      var wrapper = getWrapper({
        allowCustomPills: true,
        onPillCreate: onPillCreateMock,
        onSelect: onSelectMock
      });
      var onInput = jest.fn();
      var initialValue = 'abc';

      var _wrapper$instance2 = wrapper.instance(),
          addPillsFromInput = _wrapper$instance2.addPillsFromInput;

      wrapper.setProps({
        onInput: onInput,
        parseItems: function parseItems() {
          return [];
        }
      });
      wrapper.setState({
        inputValue: initialValue
      });
      wrapper.setProps({
        shouldClearUnmatchedInput: false
      });
      addPillsFromInput(initialValue);
      expect(wrapper.state().inputValue).toBe(initialValue);
      expect(onInput).toHaveBeenCalledTimes(0);
      wrapper.setProps({
        shouldClearUnmatchedInput: true
      });
      addPillsFromInput(initialValue);
      expect(wrapper.state().inputValue).toBe('');
      expect(onInput).toHaveBeenCalledWith('');
      expect(onInput).toHaveBeenCalledTimes(1);
      expect(onPillCreateMock).not.toBeCalled();
      expect(onSelectMock).not.toBeCalled();
    });
  });
  describe('handleInput', function () {
    test('should update inputValue state when called', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.handleInput({
        target: {
          value: 'test'
        }
      });
      expect(wrapper.state('inputValue')).toEqual('test');
    });
    test('should call onInput() with value when called', function () {
      var onInputMock = jest.fn();
      var wrapper = getWrapper({
        onInput: onInputMock
      });
      var instance = wrapper.instance();
      instance.handleInput({
        target: {
          value: 'test'
        }
      });
      expect(onInputMock).toBeCalledWith('test', {
        target: {
          value: 'test'
        }
      });
    });
  });
  describe('handleEnter()', function () {
    test('should do nothing when in composition mode', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      var event = {
        preventDefault: jest.fn()
      };
      instance.addPillsFromInput = jest.fn();
      instance.handleCompositionStart();
      instance.handleEnter(event);
      expect(event.preventDefault).not.toHaveBeenCalled();
      expect(instance.addPillsFromInput).not.toHaveBeenCalled();
    });
    test('should call addPillsFromInput and prevent default when called', function () {
      var wrapper = getWrapper();
      var addPillsFromInputMock = jest.fn();
      var preventDefaultMock = jest.fn();
      var instance = wrapper.instance();
      instance.addPillsFromInput = addPillsFromInputMock;
      instance.handleEnter({
        preventDefault: preventDefaultMock
      });
      expect(addPillsFromInputMock).toBeCalledTimes(1);
      expect(preventDefaultMock).toBeCalled();
    });
  });
  describe('handlePaste', function () {
    test('should not call onPillCreate prop method with invalid input', function () {
      var onInputMock = jest.fn();
      var onPillCreateMock = jest.fn();
      var mockPastedValue = 'pastedValue';
      var mockEvent = {
        clipboardData: {
          getData: function getData() {
            return mockPastedValue;
          }
        },
        preventDefault: jest.fn()
      };
      var wrapper = getWrapper({
        allowCustomPills: true,
        allowInvalidPills: false,
        onInput: onInputMock,
        onPillCreate: onPillCreateMock,
        validator: function validator() {
          return false;
        }
      });
      var instance = wrapper.instance();
      instance.handlePaste(mockEvent);
      expect(onInputMock).toHaveBeenCalledWith(mockPastedValue, mockEvent);
      expect(onPillCreateMock).not.toHaveBeenCalled();
    });
    test('should call onPillCreate prop method with valid input', function () {
      var onInputMock = jest.fn();
      var onPillCreateMock = jest.fn();
      var mockPastedValue = 'test@example.com';
      var mockEvent = {
        clipboardData: {
          getData: function getData() {
            return mockPastedValue;
          }
        },
        preventDefault: jest.fn()
      };
      var wrapper = getWrapper({
        allowCustomPills: true,
        onInput: onInputMock,
        onPillCreate: onPillCreateMock
      });
      var instance = wrapper.instance();
      instance.handlePaste(mockEvent);
      expect(onInputMock).toHaveBeenCalledWith(mockPastedValue, mockEvent);
      expect(onPillCreateMock).toHaveBeenCalled();
    });
  });
  describe('handleSelect', function () {
    test('should call onSelect() with option and event when called', function () {
      var option = {
        text: 'b',
        value: 'b'
      };
      var options = [{
        text: 'a',
        value: 'a'
      }, option];
      var onSelectMock = jest.fn();
      var onPillCreateMock = jest.fn();
      var wrapper = getWrapper({
        onSelect: onSelectMock,
        onPillCreate: onPillCreateMock,
        selectorOptions: options
      });
      var instance = wrapper.instance();
      var event = {
        type: 'click'
      };
      instance.handleSelect(1, event);
      expect(onSelectMock).toBeCalledWith([option], event);
      expect(onPillCreateMock).toBeCalledWith([option]);
    });
    test('should call onSelect() with immutable option and event when called', function () {
      var option = new OptionRecord({
        text: 'b',
        value: 'b'
      });
      var options = new List([new OptionRecord({
        text: 'a',
        value: 'a'
      }), option]);
      var onSelectMock = jest.fn();
      var onPillCreateMock = jest.fn();
      var wrapper = getWrapper({
        onSelect: onSelectMock,
        onPillCreate: onPillCreateMock,
        selectorOptions: options
      });
      var instance = wrapper.instance();
      var event = {
        type: 'click'
      };
      instance.handleSelect(1, event);
      expect(onSelectMock).toBeCalledWith([option], event);
      expect(onPillCreateMock).toBeCalledWith([option]);
    });
    test('should call handleInput() with empty string value when called', function () {
      var options = [{
        text: 'a',
        value: 'a'
      }];
      var handleInputMock = jest.fn();
      var wrapper = getWrapper({
        selectorOptions: options
      });
      var instance = wrapper.instance();
      instance.handleInput = handleInputMock;
      instance.handleSelect(0, {});
      expect(handleInputMock).toBeCalledWith({
        target: {
          value: ''
        }
      });
    });
  });
  describe('handleBlur', function () {
    test('should call onBlur() and addPillsFromInput() when underlying input is blurred', function () {
      var onBlur = jest.fn();
      var wrapper = getWrapper({
        onBlur: onBlur
      });
      var instance = wrapper.instance();
      var event = {
        type: 'blur'
      };
      instance.addPillsFromInput = jest.fn();
      instance.handleBlur(event);
      expect(instance.addPillsFromInput).toHaveBeenCalled();
      expect(onBlur).toHaveBeenCalled();
    });
  });
  describe('handleCompositionStart()', function () {
    test('should set composition mode', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.setState = jest.fn();
      instance.handleCompositionStart();
      expect(instance.setState).toHaveBeenCalledWith({
        isInCompositionMode: true
      });
    });
  });
  describe('handleCompositionEnd()', function () {
    test('should unset composition mode', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.setState = jest.fn();
      instance.handleCompositionEnd();
      expect(instance.setState).toHaveBeenCalledWith({
        isInCompositionMode: false
      });
    });
  });
});