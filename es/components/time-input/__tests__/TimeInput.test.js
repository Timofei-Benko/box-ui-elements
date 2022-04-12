import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import debounce from 'lodash/debounce'; // @ts-ignore flow import

import TextInput from '../../text-input';
import { TimeInputComponent as TimeInput } from '../TimeInput';
import { parseTimeFromString } from '../TimeInputUtils';
jest.mock('../TimeInputUtils');
jest.mock('lodash/debounce');
var VALID_INPUT = '3:00 am';
var INVALID_INPUT = '300000';
var FORMATTED_TIME_OBJECT = {
  hours: 3,
  minutes: 0,
  displayTime: '3:00 AM'
};
describe('src/components/time-input/TimeInput', function () {
  var getWrapper = function getWrapper(props) {
    return mount(React.createElement(TimeInput, props));
  }; // eslint-disable-next-line @typescript-eslint/no-explicit-any


  var intlFake;
  beforeEach(function () {
    intlFake = {
      formatTime: jest.fn().mockReturnValue('3:00 AM')
    }; // eslint-disable-next-line @typescript-eslint/no-explicit-any

    debounce.mockImplementation(function (fn) {
      return fn;
    }); // eslint-disable-next-line @typescript-eslint/no-explicit-any

    parseTimeFromString.mockImplementation(function () {
      return {
        hours: 3,
        minutes: 0
      };
    });
  });
  test('should render TextInput', function () {
    var wrapper = getWrapper({
      intl: intlFake
    });
    expect(wrapper.exists(TextInput)).toBe(true);
  });
  test.each([true, false])('should format input on blur when isRequired is %s', function (isRequired) {
    var onBlurSpy = jest.fn();
    var wrapper = getWrapper({
      intl: intlFake,
      isRequired: isRequired,
      onBlur: onBlurSpy
    });
    var inputField = wrapper.find('input');
    act(function () {
      inputField.simulate('change', {
        target: {
          value: VALID_INPUT
        }
      });
    });
    act(function () {
      inputField.simulate('blur');
    });
    expect(parseTimeFromString).toHaveBeenCalledWith(VALID_INPUT, isRequired);
    expect(intlFake.formatTime).toHaveBeenCalled();
    expect(onBlurSpy).toHaveBeenCalledWith(FORMATTED_TIME_OBJECT);
  });
  test.each([true, false])('should not format input on blur when value has an invalid format and isRequired is %s', function (isRequired) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parseTimeFromString.mockImplementation(function () {
      throw new SyntaxError();
    });
    var onBlurSpy = jest.fn();
    var onChangeSpy = jest.fn();
    var onErrorSpy = jest.fn();
    var wrapper = getWrapper({
      intl: intlFake,
      isRequired: isRequired,
      onBlur: onBlurSpy,
      onChange: onChangeSpy,
      onError: onErrorSpy
    });
    var inputField = wrapper.find('input');
    act(function () {
      inputField.simulate('change', {
        target: {
          value: INVALID_INPUT
        }
      });
    });
    act(function () {
      inputField.simulate('blur');
    });
    expect(parseTimeFromString).toHaveBeenCalledWith(INVALID_INPUT, isRequired);
    expect(intlFake.formatTime).not.toHaveBeenCalled();
    expect(onChangeSpy).not.toHaveBeenCalledWith(FORMATTED_TIME_OBJECT);
    expect(onBlurSpy).not.toHaveBeenCalled();
    expect(onErrorSpy).toHaveBeenCalled();
  });
  test.each([true, false])('should format input on change when isRequired is %s', function (isRequired) {
    var onBlurSpy = jest.fn();
    var onChangeSpy = jest.fn();
    var wrapper = getWrapper({
      intl: intlFake,
      isRequired: isRequired,
      onBlur: onBlurSpy,
      onChange: onChangeSpy
    });
    var inputField = wrapper.find('input');
    act(function () {
      inputField.simulate('change', {
        target: {
          value: VALID_INPUT
        }
      });
    });
    expect(parseTimeFromString).toHaveBeenCalledWith(VALID_INPUT, isRequired);
    expect(intlFake.formatTime).toHaveBeenCalled();
    expect(onBlurSpy).toHaveBeenCalledWith(FORMATTED_TIME_OBJECT);
    expect(onChangeSpy).toHaveBeenCalledWith(FORMATTED_TIME_OBJECT);
  });
});