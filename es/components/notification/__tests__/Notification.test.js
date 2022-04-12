import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { TYPE_DEFAULT, TYPE_INFO, TYPE_WARN, TYPE_ERROR } from '../constants';
import { Notification } from '..';
var sandbox = sinon.sandbox.create();
var clock;
describe('components/notification/Notification', function () {
  beforeEach(function () {
    clock = sinon.useFakeTimers();
  });
  afterEach(function () {
    sandbox.verifyAndRestore();
    clock.restore();
  });
  test('should render a notification when initialized', function () {
    var wrapper = mount(React.createElement(Notification, null, "test"));
    expect(wrapper.find('div.notification').length).toBe(1);
    expect(wrapper.find('span').text()).toEqual('test');
  });
  [{
    type: 'info'
  }, {
    type: 'warn'
  }, {
    type: 'default'
  }, {
    type: 'error'
  }].forEach(function (_ref) {
    var type = _ref.type;
    test("should render a notification with ".concat(type, " styling when initialized"), function () {
      var component = mount(React.createElement(Notification, {
        type: type
      }, "test"));
      expect(component.find('div.notification').hasClass(type)).toBe(true);
    });
    test('should render a correct icon when initialized', function () {
      var component = mount(React.createElement(Notification, {
        type: type
      }, "test"));
      var infoBadge16Count = type === TYPE_DEFAULT ? 1 : 0;
      var CircleCheck16Count = type === TYPE_INFO ? 1 : 0;
      var XBadge16Count = type === TYPE_ERROR ? 1 : 0;
      var TriangleAlert16Count = type === TYPE_WARN ? 1 : 0;
      expect(component.find('InfoBadge16').length).toBe(infoBadge16Count);
      expect(component.find('XBadge16').length).toBe(XBadge16Count);
      expect(component.find('CircleCheck16').length).toBe(CircleCheck16Count);
      expect(component.find('TriangleAlert16').length).toBe(TriangleAlert16Count);
    });
  });
  [{
    overflowOption: undefined,
    expectedClass: 'wrap'
  }, {
    overflowOption: 'wrap',
    expectedClass: 'wrap'
  }, {
    overflowOption: 'ellipsis',
    expectedClass: 'ellipsis'
  }].forEach(function (_ref2) {
    var overflowOption = _ref2.overflowOption,
        expectedClass = _ref2.expectedClass;
    test("should render a notification with ".concat(expectedClass, " styling when passed the ").concat(overflowOption, " overflow option"), function () {
      var component = mount(React.createElement(Notification, {
        overflow: overflowOption
      }, "test"));
      expect(component.find('div.notification').hasClass(expectedClass)).toBe(true);
    });
  });
  test('should call the onClose when the close button is clicked', function () {
    var closeMock = sinon.spy();
    var component = mount(React.createElement("div", null, React.createElement(Notification, {
      onClose: closeMock
    }, "test")));
    var closeBtn = component.find('button');
    closeBtn.simulate('click');
    expect(closeMock.called).toBe(true);
  });
  test('should only call onClose once when the close button is clicked and the short duration expires', function () {
    var closeMock = sinon.spy();
    var component = mount(React.createElement(Notification, {
      duration: "short",
      onClose: closeMock
    }, "test"));
    var closeBtn = component.find('button');
    closeBtn.simulate('click');
    clock.tick(5000 + 10);
    expect(closeMock.calledOnce).toBe(true);
  });
  test('should call the onClose when the short duration expires', function () {
    var closeMock = sinon.spy();
    mount(React.createElement(Notification, {
      duration: "short",
      onClose: closeMock
    }, "test"));
    clock.tick(5000 + 10);
    expect(closeMock.called).toBe(true);
  });
  test('should call the onClose when the long duration expires', function () {
    var closeMock = sinon.spy();
    mount(React.createElement(Notification, {
      duration: "long",
      onClose: closeMock
    }, "test"));
    clock.tick(10000 + 10);
    expect(closeMock.called).toBe(true);
  });
  test('should only call onClose once when the close button is clicked and the long duration expires', function () {
    var closeMock = sinon.spy();
    var component = mount(React.createElement(Notification, {
      duration: "long",
      onClose: closeMock
    }, "test"));
    var closeBtn = component.find('button');
    closeBtn.simulate('click');
    clock.tick(10000 + 10);
    expect(closeMock.calledOnce).toBe(true);
  });
  test("should not call the onClose when the short duration hasn't expired", function () {
    var closeMock = sinon.spy();
    mount(React.createElement(Notification, {
      duration: "short",
      onClose: closeMock
    }, "test"));
    clock.tick(50);
    expect(closeMock.called).toBe(false);
  });
  test('should render buttons and text when multiple children are passed in', function () {
    var wrapper = mount(React.createElement(Notification, null, React.createElement("span", null, "test"), React.createElement("button", {
      type: "button",
      className: "btn"
    }, "dostuff")));
    expect(wrapper.find('span').text()).toEqual('test');
    expect(wrapper.find('.btn').text()).toEqual('dostuff');
  });
});