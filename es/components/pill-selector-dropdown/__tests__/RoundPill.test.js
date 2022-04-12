import React from 'react';
import RoundPill from '../RoundPill';
describe('components/RoundPill-selector-dropdown/RoundPill', function () {
  var onRemoveStub = jest.fn();
  test('should render default component', function () {
    var wrapper = shallow(React.createElement(RoundPill, {
      onRemove: onRemoveStub,
      text: "box"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should set custom class name when provided', function () {
    var wrapper = shallow(React.createElement(RoundPill, {
      onRemove: onRemoveStub,
      text: "box",
      className: "MyClass"
    }));
    expect(wrapper.hasClass('MyClass')).toBe(true);
  });
  test('should render avatar if showAvatar prop is true', function () {
    var wrapper = shallow(React.createElement(RoundPill, {
      onRemove: onRemoveStub,
      showAvatar: true,
      text: "box"
    }));
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('LabelPillIcon')).toHaveLength(2);
  });
  test('should have the selected class when isSelected is true', function () {
    var wrapper = shallow(React.createElement(RoundPill, {
      isSelected: true,
      isDisabled: false,
      onRemove: onRemoveStub,
      text: "box"
    }));
    expect(wrapper.hasClass('bdl-RoundPill--selected')).toBe(true);
  });
  test('should generate LabelPill with error class when isValid prop is false', function () {
    var wrapper = shallow(React.createElement(RoundPill, {
      isValid: false,
      onRemove: onRemoveStub,
      text: "box"
    }));
    expect(wrapper.hasClass('bdl-RoundPill--error')).toBe(true);
  });
  test('should generate LabelPill with warning class when hasWarning prop is true', function () {
    var wrapper = shallow(React.createElement(RoundPill, {
      hasWarning: true,
      onRemove: onRemoveStub,
      text: "box"
    }));
    expect(wrapper.hasClass('bdl-RoundPill--warning')).toBe(true);
  });
  test('should generate LabelPill with error class when isValid is false and hasWarning is true', function () {
    var wrapper = shallow(React.createElement(RoundPill, {
      isValid: false,
      hasWarning: true,
      onRemove: onRemoveStub,
      text: "box"
    }));
    expect(wrapper.hasClass('bdl-RoundPill--error')).toBe(true);
  });
  test('should disable click handler and add class when disabled', function () {
    var onRemoveMock = jest.fn();
    var wrapper = shallow(React.createElement(RoundPill, {
      isDisabled: true,
      isValid: true,
      onRemove: onRemoveMock,
      text: "box"
    }));
    wrapper.simulate('click');
    expect(onRemoveMock).not.toBeCalled();
    expect(wrapper.childAt(0).hasClass('is-disabled'));
    expect(wrapper.hasClass('bdl-RoundPill--disabled')).toBe(true);
  });
  test('should not call click handler when isDisabled is true', function () {
    var wrapper = shallow(React.createElement(RoundPill, {
      onRemove: onRemoveStub,
      text: "box"
    }));
    wrapper.setProps({
      isDisabled: true
    });
    wrapper.find('LabelPillIcon').simulate('click');
    expect(onRemoveStub).toHaveBeenCalledTimes(0);
    wrapper.setProps({
      isDisabled: false
    });
    wrapper.find('LabelPillIcon').simulate('click');
    expect(onRemoveStub).toHaveBeenCalledTimes(1);
  });
  test('should do nothing when getPillImageUrl returns a rejected Promise', function () {
    var wrapper = shallow(React.createElement(RoundPill, {
      name: "name",
      id: "123",
      showAvatar: true,
      getPillImageUrl: function getPillImageUrl() {
        return Promise.reject(new Error());
      }
    }));
    expect(wrapper.state('avatarUrl')).toBe(undefined);
    var instance = wrapper.instance();
    instance.componentDidMount();
    setImmediate(function () {
      wrapper.update();
      expect(wrapper.state('avatarUrl')).toBeUndefined();
      expect(wrapper.find('LabelPillIcon').length).toBe(2);
      expect(wrapper.find('LabelPillIcon[avatarUrl]').length).toBe(0);
    });
  });
  test.each([[function (contact) {
    return "/test?id=".concat(contact.id);
  }, '/test?id=123'], [function (contact) {
    return Promise.resolve("/test?id=".concat(contact.id));
  }, '/test?id=123']])('should use the avatar URL when the prop (and show avatar) are provided', function (getPillImageUrl, expected) {
    var wrapper = shallow(React.createElement(RoundPill, {
      name: "name",
      id: "123",
      showAvatar: true,
      getPillImageUrl: getPillImageUrl
    }));
    expect(wrapper.state('avatarUrl')).toBe(undefined);
    var instance = wrapper.instance();
    instance.componentDidMount();
    setImmediate(function () {
      wrapper.update();
      expect(wrapper.state('avatarUrl')).toBe(expected);
      expect(wrapper.find('LabelPillIcon').length).toBe(2);
      expect(wrapper.find('LabelPillIcon[avatarUrl]').props().avatarUrl).toEqual(expected);
    });
  });
  test('should not have the avatar URL when the id prop is missing', function () {
    var wrapper = shallow(React.createElement(RoundPill, {
      name: "name",
      showAvatar: true,
      getPillImageUrl: function getPillImageUrl(contact) {
        return "/test?id=".concat(contact.id);
      }
    }));
    expect(wrapper.find('LabelPillIcon').length).toBe(2);
    expect(wrapper.find('LabelPillIcon[avatarUrl]').length).toBe(0);
  });
});