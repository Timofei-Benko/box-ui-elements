function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { mount } from 'enzyme';
import { AddTaskButtonComponent as AddTaskButton } from '../AddTaskButton';
jest.mock('../../../components/date-picker/DatePicker', function () {
  return function (props) {
    // only spread `input` attritutes to the input field
    var name = props.name,
        _props$value = props.value,
        value = _props$value === void 0 ? '' : _props$value,
        className = props.className,
        onChange = props.onChange,
        placeholder = props.placeholder;
    var localInputProps = {
      name: name,
      value: value,
      className: className,
      onChange: onChange,
      placeholder: placeholder
    };
    return React.createElement("input", _extends({
      type: "date"
    }, localInputProps, props.inputProps)) // eslint-disable-line react/prop-types
    ;
  };
});
describe('elements/content-sidebar/AddTaskButton', function () {
  /* 
  1. Pushing the open state into history keeps the sidebar open upon resize and refresh
  2. Preventing the sidebar from closing keeps the task modal open upon edit and resize 
  */
  test('should call history.replace state with force open state when task menu items are clicked', function () {
    var historyMock = {
      replace: jest.fn()
    };
    var wrapper = mount(React.createElement(AddTaskButton, {
      history: historyMock
    }));
    var button = wrapper.find('Button');
    button.simulate('click');
    var menuItem = wrapper.find('MenuItem').first();
    menuItem.simulate('click');
    expect(historyMock.replace).toHaveBeenCalledWith({
      state: {
        open: true
      }
    });
  });
  test('should set state.isTaskFormOpen to false and call onTaskModalClose when task modal is closed', function () {
    var onTaskModalCloseMock = jest.fn();
    var mockButtonRef = {
      current: {
        focus: jest.fn()
      }
    };
    var wrapper = shallow(React.createElement(AddTaskButton, {
      onTaskModalClose: onTaskModalCloseMock
    }));
    wrapper.instance().buttonRef = mockButtonRef;
    wrapper.setState({
      isTaskFormOpen: true
    });
    wrapper.instance().handleModalClose();
    expect(wrapper.state('isTaskFormOpen')).toBe(false);
    expect(mockButtonRef.current.focus).toHaveBeenCalledTimes(1);
    expect(onTaskModalCloseMock).toHaveBeenCalledTimes(1);
  });
});