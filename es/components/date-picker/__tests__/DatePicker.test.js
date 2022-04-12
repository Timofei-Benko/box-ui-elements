function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n            customInputProp | renderedClassName                       | absentClassName                         | isDisabled | isRequired | resinTarget | description\n            ", "    | ", " | ", "  | ", "    | ", "    | ", " | ", "\n            ", "  | ", "  | ", " | ", "    | ", "    | ", " | ", "\n        "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n            props                        | buttonExists | description\n            ", "                        | ", "      | ", "\n            ", " | ", "     | ", "\n        "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n            isVisible | target                     | shouldStayClosed | visibility\n            ", "   | ", " | ", "          | ", "\n            ", "  | ", " | ", "         | ", "\n            ", "   | ", "                    | ", "         | ", "\n            ", "  | ", "                    | ", "         | ", "\n        "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n            key         | keyName\n            ", "  | ", "\n            ", " | ", "\n            ", "      | ", "\n        "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n            key         | keyName\n            ", "  | ", "\n            ", " | ", "\n            ", "      | ", "\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            customInputProp    | bound    | description\n            ", " | ", " | ", "\n            ", "              | ", "  | ", "\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        maxDate                            | minDate                            | maxAttr         | minAttr\n        ", " | ", " | ", " | ", "\n        ", "                            | ", "                            | ", " | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Pikaday from 'pikaday';
import noop from 'lodash/noop';
import { TooltipPosition } from '../../tooltip';
import DatePicker, { DateFormat, DatePickerBase } from '../DatePicker';
var DATE_PICKER_DEFAULT_INPUT_CLASS_NAME = 'date-picker-input';
var DATE_PICKER_CUSTOM_INPUT_CLASS_NAME = 'date-picker-custom-input';
var customInput = React.createElement("input", {
  className: DATE_PICKER_CUSTOM_INPUT_CLASS_NAME
});
var clock;
jest.mock('pikaday');
describe('components/date-picker/DatePicker', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return mount(React.createElement(DatePicker, _extends({
      name: "dateinput",
      label: "Date",
      placeholder: "a date"
    }, props)));
  };

  var getInputField = function getInputField(wrapper) {
    return wrapper.find('.date-picker-unix-time-input').at(0).getDOMNode();
  };

  beforeEach(function () {
    clock = sinon.useFakeTimers();
  });
  afterEach(function () {
    jest.restoreAllMocks();
    clock.restore();
  });
  test('should pass hideLabel to Label', function () {
    var wrapper = mount(React.createElement(DatePicker, {
      name: "dateinput",
      label: "Date",
      hideLabel: true,
      placeholder: "a date"
    }));
    expect(wrapper.find('Label').prop('hideLabel')).toBe(true);
  });
  test('should add resin target to datepicker input when specified', function () {
    var resinTarget = 'target';
    var wrapper = mount(React.createElement(DatePicker, {
      name: "dateinput",
      label: "Date",
      placeholder: "a date",
      resinTarget: resinTarget
    }));
    expect(wrapper.find('.date-picker-input').prop('data-resin-target')).toEqual(resinTarget);
  });
  test('should pass inputProps to datepicker input when provided', function () {
    var wrapper = mount(React.createElement(DatePicker, {
      name: "dateinput",
      label: "Date",
      placeholder: "a date",
      inputProps: {
        'data-prop': 'hello'
      }
    }));
    expect(wrapper.find('.date-picker-input').prop('data-prop')).toEqual('hello');
  });
  test('should set hidden input to readOnly', function () {
    var wrapper = mount(React.createElement(DatePicker, {
      name: "dateinput",
      label: "Date",
      placeholder: "a date"
    }));
    expect(wrapper.find('.date-picker-unix-time-input').prop('readOnly')).toBe(true);
  });
  test('should set value in UTC time when UTC date format is specified', function () {
    var expectedOffset = new Date().getTimezoneOffset() * 60 * 1000 * -1;
    var wrapper = mount(React.createElement(DatePicker, {
      name: "dateinput",
      label: "Date",
      placeholder: "a date",
      value: new Date(),
      dateFormat: DateFormat.UTC_TIME_DATE_FORMAT
    }));
    expect(getInputField(wrapper).value).toEqual(expectedOffset.toString());
  });
  test('should set value in utc iso format when utc iso date format is specified', function () {
    // utc time if clock is 0
    var expectedOffset = new Date().getTimezoneOffset() * 60 * 1000 * -1;
    var date = new Date(expectedOffset);
    var wrapper = mount(React.createElement(DatePicker, {
      name: "dateinput",
      label: "Date",
      placeholder: "a date",
      value: new Date(0),
      dateFormat: DateFormat.UTC_ISO_STRING_DATE_FORMAT
    }));
    expect(getInputField(wrapper).value).toEqual(date.toISOString());
  });
  test('should hide optional label text when specified', function () {
    var wrapper = mount(React.createElement(DatePicker, {
      name: "dateinput",
      label: "Date",
      placeholder: "a date",
      hideOptionalLabel: true
    }));
    expect(wrapper.find('Label').prop('showOptionalText')).toBe(false);
  });
  test('should set value if one is defined', function () {
    var wrapper = mount(React.createElement(DatePicker, {
      name: "dateinput",
      label: "Date",
      placeholder: "a date",
      value: new Date()
    }));
    expect(getInputField(wrapper).value).toEqual('0');
  });
  test('should set value in iso format when iso date format is specified', function () {
    var date = new Date(1461953802469);
    var wrapper = mount(React.createElement(DatePicker, {
      name: "dateinput",
      label: "Date",
      placeholder: "a date",
      value: date,
      dateFormat: DateFormat.ISO_STRING_DATE_FORMAT
    }));
    expect(getInputField(wrapper).value).toEqual(date.toISOString());
  });
  test('should show clear button when formatted date exists', function () {
    var wrapper = mount(React.createElement(DatePicker, {
      name: "dateinput",
      label: "Date",
      placeholder: "a date",
      value: new Date()
    }));
    expect(wrapper.find('PlainButton.date-picker-clear-btn').length).toEqual(1);
    expect(wrapper.find('ClearBadge16').length).toEqual(1);
  });
  test('should clear datepicker and call onChange() prop when clear button is clicked', function () {
    var onChangeSpy = jest.fn();
    var wrapper = mount(React.createElement(DatePicker, {
      name: "dateinput",
      label: "Date",
      placeholder: "a date",
      value: new Date(),
      onChange: onChangeSpy
    }));
    wrapper.find('PlainButton.date-picker-clear-btn').simulate('click', {
      preventDefault: noop
    });
    expect(onChangeSpy).toHaveBeenCalledWith(null, '');
  });
  test('should hide clear button when disabled is passed in', function () {
    var wrapper = mount(React.createElement(DatePicker, {
      isDisabled: true,
      label: "Date",
      name: "dateinput",
      placeholder: "a date",
      value: new Date()
    }));
    expect(wrapper.find('.date-picker-clear-btn').length).toEqual(0);
  });
  test('should not have clear button when isClearable prop is false', function () {
    var wrapper = mount(React.createElement(DatePicker, {
      name: "dateinput",
      isClearable: false,
      label: "Date",
      placeholder: "a date",
      value: new Date()
    }));
    expect(wrapper.find('.date-picker-clear-btn').length).toEqual(0);
    expect(wrapper.find('ClearBadge16').length).toEqual(0);
  });
  test.each(_templateObject(), new Date('2022-12-31T00:00:00'), new Date('2022-01-01T00:00:00'), '2022-12-31', '2022-01-01', null, null, '9999-12-31', '0001-01-01')('should pass { max: $maxAttr, min: $minAttr } attributes to date picker input', function (_ref) {
    var maxDate = _ref.maxDate,
        minDate = _ref.minDate,
        maxAttr = _ref.maxAttr,
        minAttr = _ref.minAttr;
    var wrapper = getWrapper({
      isAccessible: true,
      maxDate: maxDate,
      minDate: minDate
    });
    var dateInput = wrapper.find('.date-picker-input');
    expect(dateInput.prop('max')).toEqual(maxAttr);
    expect(dateInput.prop('min')).toEqual(minAttr);
  });
  test('should show alert icon when date value is after maximum date', function () {
    var wrapper = getWrapper({
      isAccessible: true,
      maxDate: new Date('2021-12-31T00:00:00')
    });
    expect(wrapper.find('Alert16').length).toEqual(0);
    wrapper.find('.date-picker-input').simulate('change', {
      target: {
        value: '2022-01-01'
      }
    });
    expect(wrapper.find('Alert16').length).toEqual(1);
  });
  test('should show alert icon when date value is before minimum date', function () {
    var wrapper = getWrapper({
      isAccessible: true,
      minDate: new Date('2022-01-01T00:00:00')
    });
    expect(wrapper.find('Alert16').length).toEqual(0);
    wrapper.find('.date-picker-input').simulate('change', {
      target: {
        value: '2021-12-31'
      }
    });
    expect(wrapper.find('Alert16').length).toEqual(1);
  });
  test('should show tooltip when error exists', function () {
    var wrapper = mount(React.createElement(DatePicker, {
      error: "error!",
      errorTooltipPosition: TooltipPosition.MIDDLE_RIGHT,
      label: "Date",
      name: "dateinput",
      placeholder: "a date"
    }));
    var tooltip = wrapper.find('Tooltip');
    expect(tooltip.prop('text')).toEqual('error!');
    expect(tooltip.prop('position')).toEqual('middle-right');
    expect(tooltip.prop('isShown')).toBe(true);
    expect(tooltip.prop('className')).toEqual('date-picker-error-tooltip');
  });
  test('should fire the onChange prop on blur if isTextInputAllowed is true', function () {
    var mockOnChangeHandler = jest.fn();
    var wrapper = getWrapper({
      isTextInputAllowed: true,
      onChange: mockOnChangeHandler,
      value: new Date()
    });
    wrapper.find('.date-picker-input').simulate('blur');
    expect(mockOnChangeHandler).toHaveBeenCalled();
  }); // eslint-disable-next-line @typescript-eslint/no-explicit-any

  var intlFake;

  var renderDatePicker = function renderDatePicker() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return mount(React.createElement(DatePickerBase, _extends({
      intl: intlFake,
      label: "Date",
      name: "dateinput",
      placeholder: "a date",
      onChange: noop,
      value: new Date()
    }, props)));
  };

  beforeEach(function () {
    intlFake = {
      formatMessage: function formatMessage(message) {
        return message.defaultMessage;
      },
      formatDate: function formatDate(date) {
        return date ? date.toString() : '';
      },
      locale: 'en-US'
    };
  });
  describe('componentDidMount()', function () {
    test('should set first day of week to Monday if locale is not US, CA, or JP', function () {
      renderDatePicker();
      expect(Pikaday).toBeCalledWith(expect.objectContaining({
        firstDay: 0
      }));
      intlFake.locale = 'en-UK';
      renderDatePicker();
      expect(Pikaday).toBeCalledWith(expect.objectContaining({
        firstDay: 1
      }));
    });
    test.each(_templateObject2(), {
      customInput: customInput
    }, false, 'false if customInput is provided', {}, true, 'true if customInput is not provided')('should set bound to $description', function (_ref2) {
      var customInputProp = _ref2.customInputProp,
          bound = _ref2.bound;
      renderDatePicker(customInputProp);
      expect(Pikaday).toHaveBeenCalledWith(expect.objectContaining({
        bound: bound
      }));
    });
  });
  describe('onSelectHandler()', function () {
    test('should call onChange prop with formatted date param', function () {
      var formattedDate = 1234567;
      var onChangeStub = jest.fn();
      var testDate = new Date();
      var wrapper = renderDatePicker({
        onChange: onChangeStub,
        value: testDate
      });
      var instance = wrapper.instance();
      instance.formatValue = jest.fn().mockReturnValueOnce(formattedDate);
      instance.onSelectHandler(testDate);
      expect(onChangeStub).toHaveBeenCalledWith(testDate, formattedDate);
    });
  });
  describe('focusDatePicker()', function () {
    test('should call focus on DatePicker input when called', function () {
      var wrapper = renderDatePicker();
      var instance = wrapper.instance();
      var inputEl = wrapper.find('input').at(0).getDOMNode();
      inputEl.focus = jest.fn();
      instance.focusDatePicker();
      expect(inputEl.focus).toHaveBeenCalled();
    });
  });
  describe('handleInputKeyDown()', function () {
    test('should stop propagation when datepicker is visible', function () {
      var wrapper = renderDatePicker();
      var instance = wrapper.instance();
      var inputEl = wrapper.find('input').at(0);
      var stopPropagationSpy = jest.fn();

      if (instance.datePicker) {
        instance.datePicker.isVisible = jest.fn().mockReturnValue(true);
      }

      inputEl.simulate('keyDown', {
        preventDefault: noop,
        stopPropagation: stopPropagationSpy,
        key: 'anything'
      });
      expect(stopPropagationSpy).toHaveBeenCalled();
    });
    test('should not stop propagation when datepicker is not visible', function () {
      var wrapper = renderDatePicker();
      var instance = wrapper.instance();
      var inputEl = wrapper.find('input').at(0);
      var stopPropagationSpy = jest.fn();

      if (instance.datePicker) {
        instance.datePicker.isVisible = jest.fn().mockReturnValue(false);
      }

      inputEl.simulate('keyDown', {
        preventDefault: noop,
        stopPropagation: stopPropagationSpy,
        key: 'anything'
      });
      expect(stopPropagationSpy).not.toHaveBeenCalled();
    });
    test('should not stop propagation when isKeyboardInputAllowed is enabled', function () {
      var wrapper = renderDatePicker({
        isKeyboardInputAllowed: true
      });
      var instance = wrapper.instance();
      var inputEl = wrapper.find('input').at(0);
      var stopPropagationSpy = jest.fn();

      if (instance.datePicker) {
        instance.datePicker.isVisible = jest.fn().mockReturnValue(true);
      }

      inputEl.simulate('keyDown', {
        preventDefault: noop,
        stopPropagation: stopPropagationSpy,
        key: 'anything'
      });
      expect(stopPropagationSpy).not.toHaveBeenCalled();
    });
    test('should prevent default on input when key pressed was not a Tab', function () {
      var wrapper = renderDatePicker();
      var inputEl = wrapper.find('input').at(0);
      var preventDefaultSpy = jest.fn();
      inputEl.simulate('keyDown', {
        preventDefault: preventDefaultSpy,
        stopPropagation: noop,
        key: 'ArrowDown'
      });
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
    test('should not prevent default on input when key pressed was a Tab', function () {
      var wrapper = renderDatePicker();
      var inputEl = wrapper.find('input').at(0);
      var preventDefaultSpy = jest.fn();
      inputEl.simulate('keyDown', {
        preventDefault: preventDefaultSpy,
        stopPropagation: noop,
        key: 'Tab'
      });
      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });
    test.each(_templateObject3(), 'Enter', 'enter key', 'Escape', 'escape key', ' ', 'spacebar')('should hide DatePicker when $keyName is pressed in the input field and the DatePicker is visible', function (_ref3) {
      var key = _ref3.key;
      var wrapper = renderDatePicker();
      var instance = wrapper.instance();
      var inputEl = wrapper.find('input').at(0);

      if (instance.datePicker) {
        instance.datePicker.isVisible = jest.fn().mockReturnValue(true);
        instance.datePicker.hide = jest.fn();
      }

      inputEl.simulate('keyDown', {
        preventDefault: noop,
        stopPropagation: noop,
        key: key
      });
      expect(instance.datePicker && instance.datePicker.hide).toHaveBeenCalled();
    });
    test.each(_templateObject4(), 'Enter', 'enter key', 'Escape', 'escape key', ' ', 'spacebar')('should not hide DatePicker when %s is pressed in the input field and the DatePicker is not visible', function (_ref4) {
      var key = _ref4.key;
      var wrapper = renderDatePicker();
      var instance = wrapper.instance();
      var inputEl = wrapper.find('input').at(0);

      if (instance.datePicker) {
        instance.datePicker.isVisible = jest.fn().mockReturnValue(false);
        instance.datePicker.hide = jest.fn();
      }

      inputEl.simulate('keyDown', {
        preventDefault: noop,
        stopPropagation: noop,
        key: key
      });
      expect(instance.datePicker && instance.datePicker.hide).not.toHaveBeenCalled();
    });
  });
  describe('handleInputBlur()', function () {
    test('should call onBlur prop when called', function () {
      var onBlurSpy = jest.fn();
      var wrapper = renderDatePicker({
        onBlur: onBlurSpy
      });
      var instance = wrapper.instance();
      var inputEl = wrapper.find('input').at(0);

      if (instance.datePicker) {
        instance.datePicker.isVisible = jest.fn().mockReturnValue(false);
      }

      inputEl.simulate('blur');
      expect(onBlurSpy).toHaveBeenCalled();
    });
    test.each(_templateObject5(), true, 'the DatePicker button', true, 'visible', false, 'the DatePicker button', false, 'not visible', true, null, false, 'visible', false, null, false, 'not visible')('should set shouldStayClosed when related/active target is $target and DatePicker is $visibility', function (_ref5) {
      var isVisible = _ref5.isVisible,
          target = _ref5.target,
          shouldStayClosed = _ref5.shouldStayClosed;
      var wrapper = renderDatePicker();
      var instance = wrapper.instance();
      var inputEl = wrapper.find('input').at(0);
      var targetEl = target ? wrapper.find('PlainButton.date-picker-open-btn').getDOMNode() : null;

      if (instance.datePicker) {
        instance.datePicker.isVisible = jest.fn().mockReturnValue(isVisible);
      }

      inputEl.simulate('blur', {
        relatedTarget: targetEl
      });
      expect(instance.shouldStayClosed).toEqual(shouldStayClosed);
    });
  });
  test('should reset shouldStayClosed after a brief delay', function () {
    var wrapper = renderDatePicker();
    var instance = wrapper.instance();
    var inputEl = wrapper.find('input').at(0);
    var datePickerButtonEl = wrapper.find('PlainButton.date-picker-open-btn').getDOMNode();

    if (instance.datePicker) {
      instance.datePicker.isVisible = jest.fn().mockReturnValue(true);
    }

    inputEl.simulate('blur', {
      relatedTarget: datePickerButtonEl
    });
    expect(instance.shouldStayClosed).toBe(true);
    clock.tick(400);
    expect(instance.shouldStayClosed).toBe(false);
  });
  describe('handleButtonClick()', function () {
    test('should call event.preventDefault when called', function () {
      var preventDefaultSpy = jest.fn();
      var wrapper = renderDatePicker();
      var datePickerButtonEl = wrapper.find('PlainButton.date-picker-open-btn');
      datePickerButtonEl.simulate('click', {
        preventDefault: preventDefaultSpy
      });
    });
    test('should not focus input when shouldStayClosed is true', function () {
      var wrapper = renderDatePicker();
      var instance = wrapper.instance();
      var datePickerButtonEl = wrapper.find('PlainButton.date-picker-open-btn');
      instance.shouldStayClosed = true;
      instance.focusDatePicker = jest.fn();
      datePickerButtonEl.simulate('click', {
        preventDefault: noop
      });
      expect(instance.focusDatePicker).not.toHaveBeenCalled();
    });
    test('should focus input when shouldStayClosed is false', function () {
      var wrapper = renderDatePicker();
      var instance = wrapper.instance();
      var datePickerButtonEl = wrapper.find('PlainButton.date-picker-open-btn');
      instance.shouldStayClosed = false;
      instance.focusDatePicker = jest.fn();
      datePickerButtonEl.simulate('click', {
        preventDefault: noop
      });
      expect(instance.focusDatePicker).toHaveBeenCalled();
    });
  });
  describe('render()', function () {
    test.each(_templateObject6(), {}, true, 'should render the date-picker-open btn by default', {
      isAlwaysVisible: true
    }, false, 'should not render the date-picker-open btn if isAlwaysVisible is true')('$description', function (_ref6) {
      var props = _ref6.props,
          buttonExists = _ref6.buttonExists;
      var wrapper = renderDatePicker(props);
      var buttonEl = wrapper.find('PlainButton.date-picker-open-btn');
      expect(buttonEl.exists()).toBe(buttonExists);
    });
    test('should render a disabled date-picker-open btn when DatePicker is disabled', function () {
      var wrapper = renderDatePicker({
        isDisabled: true
      });
      var buttonEl = wrapper.find('PlainButton.date-picker-open-btn');
      expect(buttonEl.prop('isDisabled')).toBe(true);
    });
    test.each(_templateObject7(), undefined, DATE_PICKER_DEFAULT_INPUT_CLASS_NAME, DATE_PICKER_CUSTOM_INPUT_CLASS_NAME, true, true, 'target', 'should render the default input field with provided props', customInput, DATE_PICKER_CUSTOM_INPUT_CLASS_NAME, DATE_PICKER_DEFAULT_INPUT_CLASS_NAME, true, true, 'target', 'should render the custom input field with provided props if provided')('$description', function (_ref7) {
      var customInputProp = _ref7.customInputProp,
          renderedClassName = _ref7.renderedClassName,
          absentClassName = _ref7.absentClassName,
          isDisabled = _ref7.isDisabled,
          isRequired = _ref7.isRequired,
          resinTarget = _ref7.resinTarget;
      var input = renderDatePicker({
        customInput: customInputProp,
        isDisabled: isDisabled,
        isRequired: isRequired,
        resinTarget: resinTarget
      }).find('input').at(0);
      expect(input.prop('className')).toBe(renderedClassName);
      expect(input.prop('className')).not.toBe(absentClassName);
      expect(input.prop('disabled')).toBe(isDisabled);
      expect(input.prop('required')).toBe(isRequired);
      expect(input.prop('aria-required')).toBe(isRequired);
      expect(input.prop('data-resin-target')).toEqual(resinTarget);
    });
  });
  describe('componentWillUnmount()', function () {
    test('should destroy the DatePicker widget', function () {
      var wrapper = renderDatePicker();
      var instance = wrapper.instance();

      if (instance.datePicker) {
        instance.datePicker.destroy = jest.fn();
      }

      wrapper.unmount();
      expect(instance.datePicker && instance.datePicker.destroy).toHaveBeenCalled();
    });
  });
  describe('UNSAFE_componentWillReceiveProps()', function () {
    test('should call setDate() when value changes', function () {
      var wrapper = renderDatePicker();
      var nextValue = new Date(123);
      var instance = wrapper.instance();

      if (instance.datePicker) {
        instance.datePicker.setDate = jest.fn();
      }

      wrapper.setProps({
        value: nextValue
      });
      expect(instance.datePicker && instance.datePicker.setDate).toHaveBeenCalledWith(nextValue);
    });
    test('should call setMinDate() when minDate prop is set after being null', function () {
      var currentDate = new Date(500);
      var wrapper = renderDatePicker({
        value: currentDate
      });
      var instance = wrapper.instance();

      if (instance.datePicker) {
        instance.datePicker.getDate = jest.fn().mockReturnValue(currentDate);
        instance.datePicker.gotoDate = jest.fn();
        instance.datePicker.setMinDate = jest.fn();
      }

      var minDate = new Date(100);
      wrapper.setProps({
        minDate: minDate
      });
      expect(instance.datePicker && instance.datePicker.setMinDate).toHaveBeenCalledWith(minDate);
      expect(instance.datePicker && instance.datePicker.gotoDate).not.toHaveBeenCalled(); // Current date is way ahead of timestamp 100
    });
    test('should call setMinDate() when minDate prop changes value', function () {
      var currentDate = new Date(500);
      var wrapper = renderDatePicker({
        value: currentDate,
        minDate: new Date(200)
      });
      var instance = wrapper.instance();

      if (instance.datePicker) {
        instance.datePicker.setMinDate = jest.fn();
      }

      var minDate = new Date(100);
      wrapper.setProps({
        minDate: minDate
      });
      expect(instance.datePicker && instance.datePicker.setMinDate).toHaveBeenCalledWith(minDate);
    });
    test('should call gotoDate() when minDate prop passed is further in the future than current date', function () {
      var currentDate = new Date(100);
      var wrapper = renderDatePicker({
        value: currentDate
      });
      var instance = wrapper.instance();

      if (instance.datePicker) {
        instance.datePicker.getDate = jest.fn().mockReturnValue(currentDate);
        instance.datePicker.gotoDate = jest.fn();
      }

      var minDate = new Date(500);
      wrapper.setProps({
        minDate: minDate
      });
      expect(instance.datePicker && instance.datePicker.gotoDate).toHaveBeenCalledWith(minDate);
    });
    test('should call setMaxDate() when maxDate prop after being null', function () {
      var currentDate = new Date(500);
      var wrapper = renderDatePicker({
        value: currentDate
      });
      var instance = wrapper.instance();

      if (instance.datePicker) {
        instance.datePicker.getDate = jest.fn().mockReturnValue(currentDate);
        instance.datePicker.gotoDate = jest.fn();
        instance.datePicker.setMaxDate = jest.fn();
      }

      var maxDate = new Date(1000000);
      wrapper.setProps({
        maxDate: maxDate
      });
      expect(instance.datePicker && instance.datePicker.setMaxDate).toHaveBeenCalledWith(maxDate);
      expect(instance.datePicker && instance.datePicker.gotoDate).not.toHaveBeenCalled(); // Current date is way behind of timestamp 1000000
    });
    test('should call setMaxDate() when maxDate prop changes value', function () {
      var currentDate = new Date(500);
      var wrapper = renderDatePicker({
        value: currentDate,
        maxDate: new Date(200000)
      });
      var instance = wrapper.instance();

      if (instance.datePicker) {
        instance.datePicker.getDate = jest.fn().mockReturnValue(currentDate);
        instance.datePicker.setMaxDate = jest.fn();
      }

      var maxDate = new Date(1000000);
      wrapper.setProps({
        maxDate: maxDate
      });
      expect(instance.datePicker && instance.datePicker.setMaxDate).toHaveBeenCalledWith(maxDate);
    });
    test('should call gotoDate() when maxDate prop passed is behind the current date', function () {
      var currentDate = new Date(1000000);
      var wrapper = renderDatePicker({
        value: currentDate
      });
      var instance = wrapper.instance();

      if (instance.datePicker) {
        instance.datePicker.getDate = jest.fn().mockReturnValue(currentDate);
        instance.datePicker.gotoDate = jest.fn();
      }

      var maxDate = new Date(500);
      wrapper.setProps({
        maxDate: maxDate
      });
      expect(instance.datePicker && instance.datePicker.gotoDate).toHaveBeenCalledWith(maxDate);
    });
  });
});