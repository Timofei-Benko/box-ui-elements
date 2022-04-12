import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Overlay from '../Overlay';
var sandbox = sinon.sandbox.create();
var clock;
describe('components/flyout/Overlay', function () {
  beforeEach(function () {
    clock = sandbox.useFakeTimers();
  });
  afterEach(function () {
    sandbox.verifyAndRestore();
    clock.restore();
  });
  describe('render()', function () {
    test('should render a div with correct props when called', function () {
      var id = 'overlay';
      var wrapper = mount(React.createElement(Overlay, {
        className: "hey",
        id: id
      }, React.createElement("p", null, "Hi")));
      expect(wrapper.childAt(0).is('FocusTrap')).toBe(true);
      expect(wrapper.find('div.overlay').length).toBe(1);
      expect(wrapper.childAt(0).prop('className')).toEqual('hey');
      expect(wrapper.childAt(0).prop('id')).toEqual('overlay');
      expect(wrapper.childAt(0).prop('tabIndex')).toEqual(0);
    });
  });
  describe('closeOverlay()', function () {
    test('should call onClose() from props when called', function () {
      var id = 'overlay-0';
      var wrapper = mount(React.createElement(Overlay, {
        className: "hey",
        id: id,
        onClose: sandbox.mock()
      }, React.createElement("p", null, "123")));
      var instance = wrapper.instance();
      sandbox.stub(instance, 'focusFirstItem');
      instance.closeOverlay();
      clock.tick(0);
    });
    test('should call onClose() from props when called', function () {
      var id = 'overlay-0';
      var wrapper = mount(React.createElement(Overlay, {
        className: "hey",
        id: id,
        onClose: sandbox.mock()
      }, React.createElement("p", null, "123")));
      var instance = wrapper.instance();
      sandbox.stub(instance, 'focusFirstItem');
      instance.closeOverlay();
      clock.tick(0);
    });
  });
  describe('handleKeyDown()', function () {
    var id = 'overlay-0';
    var wrapper;
    beforeEach(function () {
      wrapper = mount(React.createElement(Overlay, {
        className: "hey",
        id: id
      }, React.createElement("p", null, "123")));
    });
    test('should call closeOverlay() when event.key is escape', function () {
      var event = {
        key: 'Escape',
        stopPropagation: sandbox.mock(),
        preventDefault: sandbox.mock()
      };
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('closeOverlay');
      instance.handleOverlayKeyDown(event);
    });
    test('should not prevent default or stop propagation when event.key is not Escape', function () {
      var instance = wrapper.instance();
      var event = {
        key: 'LOL',
        target: {
          id: 'randomstuff'
        },
        stopPropagation: sandbox.mock().never(),
        preventDefault: sandbox.mock().never()
      };
      instance.handleOverlayKeyDown(event);
    });
  });
});