import React from 'react';
import Pill from '../Pill';
describe('components/pill-selector-dropdown/Pill', function () {
  var onRemoveStub = jest.fn();
  test('should render default component', function () {
    var wrapper = shallow(React.createElement(Pill, {
      onRemove: onRemoveStub,
      text: "box"
    }));
    expect(wrapper.hasClass('bdl-Pill')).toBe(true);
    expect(wrapper.hasClass('is-selected')).toBe(false);
    expect(wrapper.childAt(0).text()).toEqual('box');
    expect(wrapper.childAt(1).hasClass('close-btn')).toBe(true);
    expect(wrapper.find('.close-btn').prop('onClick')).toEqual(onRemoveStub);
  });
  test('should have the selected class when isSelected is true', function () {
    var wrapper = shallow(React.createElement(Pill, {
      isSelected: true,
      isDisabled: false,
      onRemove: onRemoveStub,
      text: "box"
    }));
    expect(wrapper.hasClass('is-selected')).toBe(true);
  });
  test('should generate pill with invalid class when pill is not valid', function () {
    var wrapper = shallow(React.createElement(Pill, {
      isValid: false,
      isSelected: true,
      onRemove: onRemoveStub,
      text: "box"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should disable click handler and add class when disabled', function () {
    var onRemoveMock = jest.fn();
    var wrapper = shallow(React.createElement(Pill, {
      isDisabled: true,
      isValid: true,
      onRemove: onRemoveMock,
      text: "box"
    }));
    wrapper.simulate('click');
    expect(onRemoveMock).not.toBeCalled();
    expect(wrapper.childAt(0).hasClass('is-disabled'));
  });
  test('should not call click handler when isDisabled is true', function () {
    var wrapper = shallow(React.createElement(Pill, {
      onRemove: onRemoveStub,
      text: "box"
    }));
    wrapper.setProps({
      isDisabled: true
    });
    wrapper.find('.close-btn').simulate('click');
    expect(onRemoveStub).toHaveBeenCalledTimes(0);
    wrapper.setProps({
      isDisabled: false
    });
    wrapper.find('.close-btn').simulate('click');
    expect(onRemoveStub).toHaveBeenCalledTimes(1);
  });
});