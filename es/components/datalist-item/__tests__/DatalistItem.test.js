import React from 'react';
import sinon from 'sinon';
import DatalistItem from '..';
var sandbox = sinon.sandbox.create();
describe('components/datalist-item/DatalistItem', function () {
  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  describe('render()', function () {
    test('should render default component', function () {
      var child = 'Test';
      var wrapper = shallow(React.createElement(DatalistItem, null, child));
      expect(wrapper.is('li')).toBe(true);
      expect(wrapper.hasClass('datalist-item')).toBe(true);
      expect(wrapper.prop('id')).toBeTruthy();
      expect(wrapper.text()).toEqual(child);
    });
    test('should render the correct classes when className and isActive are specified', function () {
      var className = 'test';
      var wrapper = shallow(React.createElement(DatalistItem, {
        className: className,
        isActive: true
      }, "Test"));
      expect(wrapper.hasClass('datalist-item')).toBe(true);
      expect(wrapper.hasClass('is-active')).toBe(true);
      expect(wrapper.hasClass(className)).toBe(true);
    });
    test('should render the correct aria-selected according to isSelected prop', function () {
      var isSelectedValue = true;
      var wrapper = shallow(React.createElement(DatalistItem, {
        isSelected: isSelectedValue
      }, "test"));
      expect(wrapper.prop('aria-selected')).toBe(isSelectedValue);
    });
    test('should render custom attributes when specified', function () {
      var wrapper = shallow(React.createElement(DatalistItem, {
        "data-resin-target": "test"
      }, "Test"));
      expect(wrapper.prop('data-resin-target')).toEqual('test');
    });
    test('should not override id or role on li when props are specified', function () {
      var id = 'test';
      var role = 'listitem';
      var wrapper = shallow(React.createElement(DatalistItem, {
        id: id,
        role: role
      }, "Test"));
      expect(wrapper.prop('id')).not.toEqual(id);
      expect(wrapper.prop('role')).toEqual('option');
    });
  });
  describe('setActiveItemID()', function () {
    test('should call setActiveItemID() in componentDidUpdate when isActive is true', function () {
      var setActiveItemIDSpy = sandbox.spy();
      shallow(React.createElement(DatalistItem, {
        isActive: true,
        setActiveItemID: setActiveItemIDSpy
      }, "Test"));
      expect(setActiveItemIDSpy.calledOnce).toBe(true);
    });
    test('should call setActiveItemID() when prop isActive becomes true', function () {
      var setActiveItemIDSpy = sandbox.spy();
      var wrapper = shallow(React.createElement(DatalistItem, {
        setActiveItemID: setActiveItemIDSpy
      }, "Test"));
      wrapper.setProps({
        isActive: true
      });
      expect(setActiveItemIDSpy.calledOnce).toBe(true);
    });
  });
});