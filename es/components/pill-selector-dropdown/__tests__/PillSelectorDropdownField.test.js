function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import defaultInputParser from '../defaultInputParser';
import PillSelectorDropdownField from '../PillSelectorDropdownField';
jest.mock('../defaultInputParser', function () {
  return jest.fn();
});
describe('components/pill-selector-dropdown/PillSelectorDropdownField', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(PillSelectorDropdownField, _extends({
      field: {},
      form: {}
    }, props)));
  };

  test('should render PillSelectorDropdown with default dropdown renderer', function () {
    var wrapper = getWrapper({
      options: [{
        displayText: 'value1',
        value: 'value1'
      }, {
        displayText: 'value2',
        value: 'value2'
      }, {
        displayText: 'value3',
        value: 'value3'
      }]
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render error when touched', function () {
    var wrapper = getWrapper({
      field: {
        name: 'pill'
      },
      form: {
        errors: {
          pill: 'error'
        },
        touched: {
          pill: true
        }
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render PillSelectorDropdown with no dropdown when no options', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  describe('createFakeEventTarget()', function () {
    test('should return a event target like object', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      expect(instance.createFakeEventTarget('foo', 'bar')).toEqual({
        target: {
          name: 'foo',
          value: 'bar'
        }
      });
    });
  });
  describe('handleInput()', function () {
    test('should set input value in state', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.setState = jest.fn();
      instance.handleInput('foo');
      expect(instance.setState).toHaveBeenCalledWith({
        inputText: 'foo'
      });
    });
    test('should call handleBlur() when input text is cleared out', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.handleBlur = jest.fn();
      instance.setState = jest.fn();
      instance.forceUpdate();
      instance.handleInput('', 'foo');
      expect(instance.setState).toHaveBeenCalledWith({
        inputText: ''
      });
      expect(instance.handleBlur).toHaveBeenCalledWith('foo');
    });
    test('should be called when underlying pill selector onInput is called', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.handleInput = jest.fn();
      instance.forceUpdate();
      wrapper.prop('onInput')();
      expect(instance.handleInput).toHaveBeenCalled();
    });
    test('should call its onInput prop when provided', function () {
      var onInput = jest.fn();
      var wrapper = getWrapper({
        onInput: onInput
      });
      var instance = wrapper.instance();
      instance.handleInput('foo');
      expect(onInput).toHaveBeenCalledWith('foo', undefined);
    });
  });
  describe('handleSelect()', function () {
    test('should call onChange with added values', function () {
      var onChange = jest.fn();
      var wrapper = getWrapper({
        field: {
          name: 'pill',
          onChange: onChange,
          value: [{
            displayText: 'foo'
          }]
        }
      });
      var instance = wrapper.instance();
      instance.setState = jest.fn();
      instance.handleSelect([{
        displayText: 'bar'
      }]);
      expect(onChange).toHaveBeenCalledWith({
        target: {
          name: 'pill',
          value: [{
            displayText: 'foo'
          }, {
            displayText: 'bar'
          }]
        }
      });
    });
    test('should not add new values if they are just empty spaces', function () {
      var onChange = jest.fn();
      var wrapper = getWrapper({
        field: {
          name: 'pill',
          onChange: onChange,
          value: [{
            displayText: 'foo'
          }]
        }
      });
      var instance = wrapper.instance();
      instance.setState = jest.fn();
      instance.handleSelect([{
        displayText: '   '
      }, {
        displayText: '   '
      }]);
      expect(onChange).toHaveBeenCalledWith({
        target: {
          name: 'pill',
          value: [{
            displayText: 'foo'
          }]
        }
      });
    });
    test('should be called when onSelect is called', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.handleSelect = jest.fn();
      instance.forceUpdate();
      wrapper.prop('onSelect')();
      expect(instance.handleSelect).toHaveBeenCalled();
    });
  });
  describe('handleRemove()', function () {
    test('should call onChange with updated values', function () {
      var onChange = jest.fn();
      var wrapper = getWrapper({
        field: {
          name: 'pill',
          onChange: onChange,
          value: ['foo', 'bar']
        }
      });
      var instance = wrapper.instance();
      instance.setState = jest.fn();
      instance.handleRemove('bar', 1);
      expect(onChange).toHaveBeenCalledWith({
        target: {
          name: 'pill',
          value: ['foo']
        }
      });
    });
    test('should be called when onRemove is called', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.handleRemove = jest.fn();
      instance.forceUpdate();
      wrapper.prop('onRemove')();
      expect(instance.handleRemove).toHaveBeenCalled();
    });
    test('should default value to empty array when its not been initialized', function () {
      var onChange = jest.fn();
      var wrapper = getWrapper({
        field: {
          name: 'pill',
          onChange: onChange
        }
      });
      var instance = wrapper.instance();
      instance.setState = jest.fn();
      instance.handleRemove('bar', 1);
      expect(onChange).toHaveBeenCalledWith({
        target: {
          name: 'pill',
          value: []
        }
      });
    });
  });
  describe('handleParseItems()', function () {
    var options = [{
      displayText: 'displayText1',
      value: 'value1'
    }, {
      displayText: 'displayText2',
      value: 'value2'
    }];
    test('should call default parser when inputParser is not provided', function () {
      var field = {
        value: [options[0]]
      };
      var wrapper = getWrapper({
        inputParser: undefined,
        options: options,
        field: field
      });
      wrapper.instance().handleParseItems('abc');
      expect(defaultInputParser).toHaveBeenCalledTimes(1);
      expect(defaultInputParser).toHaveBeenCalledWith('abc', options, field.value);
    });
    test('should call inputParser with inputValue, options and selectedOptions', function () {
      var inputParser = jest.fn();
      var field = {
        value: [options[0]]
      };
      var wrapper = getWrapper({
        inputParser: inputParser,
        options: options,
        field: field
      });
      wrapper.instance().handleParseItems('abc');
      expect(inputParser).toHaveBeenCalledTimes(1);
      expect(inputParser).toHaveBeenCalledWith('abc', options, field.value);
    });
    test('should default value to empty array when its not been initialized', function () {
      var inputParser = jest.fn();
      var field = {};
      var wrapper = getWrapper({
        inputParser: inputParser,
        options: options,
        field: field
      });
      wrapper.instance().handleParseItems('abc');
      expect(inputParser).toHaveBeenCalledTimes(1);
      expect(inputParser).toHaveBeenCalledWith('abc', options, []);
    });
  });
  describe('handleBlur()', function () {
    test('should call onBlur with blur event', function () {
      var onBlur = jest.fn();
      var wrapper = getWrapper({
        field: {
          onBlur: onBlur
        }
      });
      var instance = wrapper.instance();
      instance.setState = jest.fn();
      instance.handleBlur('foo');
      expect(onBlur).toHaveBeenCalledWith('foo');
    });
    test('should call onBlur with fake event target when original event is missing', function () {
      var onBlur = jest.fn();
      var wrapper = getWrapper({
        field: {
          name: 'pill',
          onBlur: onBlur
        }
      });
      var instance = wrapper.instance();
      instance.setState = jest.fn();
      instance.handleBlur();
      expect(onBlur).toHaveBeenCalledWith({
        target: {
          name: 'pill'
        }
      });
    });
    test('should be called when onBlur is called', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.handleBlur = jest.fn();
      instance.forceUpdate();
      wrapper.prop('onBlur')();
      expect(instance.handleBlur).toHaveBeenCalled();
    });
  });
});