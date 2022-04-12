import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import MenuItem from '../MenuItem';
var sandbox = sinon.sandbox.create();
describe('components/menu/MenuItem', function () {
  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  describe('render()', function () {
    test('should correctly render a list element with correct props', function () {
      var wrapper = shallow(React.createElement(MenuItem, null, "Test"));
      expect(wrapper.is('li')).toBe(true);
      expect(wrapper.hasClass('menu-item')).toBe(true);
      expect(wrapper.prop('role')).toEqual('menuitem');
      expect(wrapper.prop('tabIndex')).toEqual(-1);
    });
    test('should add class name when specified', function () {
      var wrapper = shallow(React.createElement(MenuItem, {
        className: "test"
      }, "Test"));
      expect(wrapper.hasClass('test')).toBe(true);
    });
    test('should add correct class and aria attributes when item is selectable', function () {
      var wrapper = shallow(React.createElement(MenuItem, {
        isSelectItem: true
      }, "Test"));
      expect(wrapper.hasClass('is-select-item')).toBe(true);
      expect(wrapper.prop('role')).toEqual('menuitemradio');
    });
    test('should add correct class and aria attributes when item is selected', function () {
      var wrapper = shallow(React.createElement(MenuItem, {
        isSelected: true,
        isSelectItem: true
      }, "Test"));
      expect(wrapper.hasClass('is-selected')).toBe(true);
      expect(wrapper.prop('aria-checked')).toBe(true);
    });
    test('should not render a RadarAnimation if showRadar is false', function () {
      var wrapper = shallow(React.createElement(MenuItem, {
        showRadar: false
      }, "Test"));
      expect(wrapper.find('RadarAnimation')).toMatchSnapshot();
    });
    test('should render a RadarAnimation if showRadar is true', function () {
      var wrapper = shallow(React.createElement(MenuItem, {
        showRadar: true
      }, "Test"));
      expect(wrapper.find('RadarAnimation')).toMatchSnapshot();
    });
  });
  describe('onClickHandler()', function () {
    test('should click when menu item has isDisabled prop', function () {
      var wrapper = shallow(React.createElement(MenuItem, {
        isDisabled: true,
        onClick: sandbox.mock().never()
      }, "Test"));
      wrapper.simulate('click', {
        preventDefault: sandbox.mock(),
        stopPropagation: sandbox.mock()
      });
    });
    test('should fire onClick when it exists', function () {
      var wrapper = shallow(React.createElement(MenuItem, {
        onClick: sandbox.mock()
      }, "Test"));
      wrapper.simulate('click', {
        preventDefault: sandbox.mock().never(),
        stopPropagation: sandbox.mock().never()
      });
    });
  });
});