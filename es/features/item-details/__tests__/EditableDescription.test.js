function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { EditableDescriptionBase as EditableDescription } from '../EditableDescription';
describe('features/item-details/EditableDescription', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(EditableDescription, _extends({
      intl: {
        formatMessage: function formatMessage() {
          return 'message';
        }
      },
      onDescriptionChange: function onDescriptionChange() {}
    }, props)));
  };

  test('should render default component', function () {
    var wrapper = getWrapper({
      textAreaProps: {
        'data-resin-target': 'description'
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should set default value and additional props when specified', function () {
    var wrapper = getWrapper({
      textAreaProps: {
        minLength: 25
      },
      value: 'description'
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('handleBlur should call the description change handler', function () {
    var onDescriptionChange = jest.fn();
    var wrapper = getWrapper({
      value: 'description',
      onDescriptionChange: onDescriptionChange
    });
    wrapper.setState({
      value: 'new description'
    });
    wrapper.instance().handleBlur();
    expect(onDescriptionChange).toHaveBeenCalledWith('new description');
  });
  test('handleChange should set the state', function () {
    var wrapper = getWrapper({
      value: 'new description'
    });
    var mockEvent = {
      currentTarget: {
        value: 'new description'
      }
    };
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state().value).toEqual('new description');
  });
  test('should update the state when a new description prop is passed in', function () {
    var onDescriptionChange = jest.fn();
    var wrapper = getWrapper({
      value: 'description',
      onDescriptionChange: onDescriptionChange
    });
    wrapper.setProps({
      value: 'new description'
    });
    expect(wrapper.state().value).toEqual('new description');
  });
});