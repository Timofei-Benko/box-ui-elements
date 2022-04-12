function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { Tab, TabView } from '..';
var sandbox = sinon.sandbox.create();
describe('components/tab-view/TabView', function () {
  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  test('should render tabview with tabs', function () {
    var component = shallow(React.createElement(TabView, null, React.createElement(Tab, {
      title: "tab1"
    }, "Tab 1"), React.createElement(Tab, {
      title: "tab2"
    }, "Tab 2")));
    expect(component.find('TabViewPrimitive').length).toEqual(1);
    expect(component.props().selectedIndex).toEqual(0);
    expect(component.props().onTabSelect).toEqual(component.instance().handleOnTabSelect);
    expect(_typeof(component.props().resetActiveTab)).toBe('function');
  });
  test('should set state when handleOnTabSelect() is called', function () {
    var component = shallow(React.createElement(TabView, null, React.createElement(Tab, {
      title: "tab1"
    }, "Tab 1"), React.createElement(Tab, {
      title: "tab2"
    }, "Tab 2")));
    component.instance().handleOnTabSelect(100);
    expect(component.state('selectedIndex')).toEqual(100);
  });
  test('should call onTabSelect when handleOnTabSelect() is called', function () {
    var cb = jest.fn();
    var component = shallow(React.createElement(TabView, {
      onTabSelect: cb
    }, React.createElement(Tab, {
      title: "tab1"
    }, "Tab 1"), React.createElement(Tab, {
      title: "tab2"
    }, "Tab 2")));
    var selectedTabId = 100;
    component.instance().handleOnTabSelect(selectedTabId);
    expect(cb).toHaveBeenCalledWith(selectedTabId);
  });
  test('should set state when handleOnTabFocus() is called', function () {
    var component = shallow(React.createElement(TabView, null, React.createElement(Tab, {
      title: "tab1"
    }, "Tab 1"), React.createElement(Tab, {
      title: "tab2"
    }, "Tab 2")));
    component.instance().handleOnTabFocus(100);
    expect(component.state('focusedIndex')).toEqual(100);
  });
  test('should use defaultSelectedIndex when defined', function () {
    var component = shallow(React.createElement(TabView, {
      defaultSelectedIndex: 1
    }, React.createElement(Tab, {
      title: "tab1"
    }, "Tab 1"), React.createElement(Tab, {
      title: "tab2"
    }, "Tab 2")));
    expect(component.find('TabViewPrimitive').length).toEqual(1);
    expect(component.props().selectedIndex).toEqual(1);
    expect(component.props().focusedIndex).toEqual(1);
  });
  test('should reset focused tab to selected tab when resetFocusedTab is called', function () {
    var component = shallow(React.createElement(TabView, {
      defaultSelectedIndex: 0
    }, React.createElement(Tab, {
      title: "tab1"
    }, "Tab 1"), React.createElement(Tab, {
      title: "tab2"
    }, "Tab 2")));
    var selectedIndex = 1;
    component.setState({
      selectedIndex: selectedIndex,
      focusedIndex: 2
    });
    expect(component.props().selectedIndex).toEqual(selectedIndex);
    component.instance().resetFocusedTab();
    component.update();
    expect(component.props().focusedIndex).toEqual(selectedIndex);
  });
  test('should reset selected Tab to default when resetActiveTab is called', function () {
    var component = shallow(React.createElement(TabView, {
      defaultSelectedIndex: 0
    }, React.createElement(Tab, {
      title: "tab1"
    }, "Tab 1"), React.createElement(Tab, {
      title: "tab2"
    }, "Tab 2")));
    component.setState({
      selectedIndex: 1
    });
    expect(component.props().selectedIndex).toEqual(1);
    component.instance().resetActiveTab();
    component.update();
    expect(component.props().selectedIndex).toEqual(0);
  });
  test('should render Tabs with resin data on the buttons', function () {
    var component = mount(React.createElement(TabView, {
      defaultSelectedIndex: 0
    }, React.createElement(Tab, {
      "data-resin-tag": "test1",
      title: "tab1"
    }, "Tab 1"), React.createElement(Tab, {
      "data-resin-tag": "test2",
      title: "tab2"
    }, "Tab 2")));
    expect(component.find('button').at(0).prop('data-resin-tag')).toEqual('test1');
    expect(component.find('button').at(1).prop('data-resin-tag')).toEqual('test2');
  });
  describe('life cycle methods', function () {
    var component;
    beforeEach(function () {
      component = mount(React.createElement(TabView, {
        defaultSelectedIndex: 0
      }, React.createElement(Tab, {
        title: "tab1"
      }, "Tab 1"), React.createElement(Tab, {
        title: "tab2"
      }, "Tab 2")));
    });
    describe('componentDidUpdate', function () {
      test('should not call resetActiveTab if defaultSelectedIndex was not changed', function () {
        var instance = component.instance();
        var resetActiveTabSpy = jest.spyOn(instance, 'resetActiveTab');
        instance.componentDidUpdate({
          defaultSelectedIndex: 0
        });
        expect(resetActiveTabSpy).not.toHaveBeenCalled();
      });
      test('should call resetActiveTab if defaultSelectedIndex was changed', function () {
        var instance = component.instance();
        var resetActiveTabSpy = jest.spyOn(instance, 'resetActiveTab');
        instance.componentDidUpdate({
          defaultSelectedIndex: 1
        });
        expect(resetActiveTabSpy).toHaveBeenCalled();
      });
    });
  });
  describe('handleKeyUp', function () {
    var component;
    beforeEach(function () {
      component = mount(React.createElement(TabView, {
        defaultSelectedIndex: 0
      }, React.createElement(Tab, {
        "data-resin-tag": "test1",
        title: "tab1"
      }, "Tab 1"), React.createElement(Tab, {
        "data-resin-tag": "test2",
        title: "tab2"
      }, "Tab 2")));
    });
    test('should set show outline state to true when tabpanel obtained focused with the Tab key', function () {
      component.instance().setState = sandbox.mock();
      component.instance().getActiveDocElement = sandbox.mock().returns({
        getAttribute: sandbox.mock().returns('tabpanel')
      });
      component.instance().handleKeyUp({
        key: 'Tab'
      });
      expect(component.instance().setState.calledWith({
        showOutline: true
      })).toBeTruthy();
    });
    test('should set show outline state to false when tabpanel does not have focus and outlet was set to true', function () {
      component.setState({
        showOutline: true
      });
      expect(component.state('showOutline')).toBeTruthy();
      component.instance().setState = sandbox.mock();
      component.instance().getActiveDocElement = sandbox.mock().returns({
        getAttribute: sandbox.mock().returns('not-tabpanel')
      });
      component.instance().handleKeyUp({
        key: 'randomkey'
      });
      expect(component.instance().setState.calledWith({
        showOutline: false
      })).toBeTruthy();
    });
  });
});