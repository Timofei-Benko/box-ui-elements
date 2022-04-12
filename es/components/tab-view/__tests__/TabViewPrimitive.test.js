import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { Tab, TabViewPrimitive } from '..';
var sandbox = sinon.sandbox.create();
describe('components/tab-view/TabViewPrimitive', function () {
  afterEach(function () {
    sandbox.verifyAndRestore();
  });

  var simulateKeyDown = function simulateKeyDown(comp, key) {
    var shouldStopEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var isShiftKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    // conveniently ensuring that the keydown event is attached to the tablist element,
    // not the entire container
    comp.find('[role="tablist"]').at(0).simulate('keyDown', {
      key: key,
      shiftKey: isShiftKey,
      preventDefault: shouldStopEvent ? sandbox.mock() : sandbox.mock().never(),
      stopPropagation: shouldStopEvent ? sandbox.mock() : sandbox.mock().never()
    });
  };

  test('should render tabview ui with tabs', function () {
    var onTabFocus = function onTabFocus() {};

    var onTabSelect = function onTabSelect() {};

    var component = shallow(React.createElement(TabViewPrimitive, {
      focusedIndex: 0,
      onTabFocus: onTabFocus,
      onTabSelect: onTabSelect,
      resetActiveTab: function resetActiveTab() {},
      resetFocusedTab: function resetFocusedTab() {},
      selectedIndex: 0
    }, React.createElement(Tab, {
      title: "tab1"
    }, "Tab 1"), React.createElement(Tab, {
      title: "tab2"
    }, "Tab 2")));
    expect(component.hasClass('tab-view')).toBe(true);
    expect(component.instance().handleKeyDown).toEqual(component.instance().handleKeyDown);
    expect(component.find('.tabs').find('button').length).toEqual(2);
    expect(component.find({
      tabIndex: 0
    }).toBeFalsy);
  });
  test('should render tabview ui with link tabs', function () {
    var onTabFocus = function onTabFocus() {};

    var onTabSelect = function onTabSelect() {};

    var component = shallow(React.createElement(TabViewPrimitive, {
      focusedIndex: 0,
      onTabFocus: onTabFocus,
      onTabSelect: onTabSelect,
      resetActiveTab: function resetActiveTab() {},
      resetFocusedTab: function resetFocusedTab() {},
      selectedIndex: 0
    }, React.createElement(Tab, {
      title: "tab1"
    }, "Tab 1"), React.createElement(Tab, {
      href: "https://www.box.com/",
      title: "tab2"
    })));
    expect(component.find('.tabs').find('button').length).toEqual(1);
    expect(component.find('.tabs').find('LinkButton').length).toEqual(1);
  });
  test('should select appropriate tab when passed selectedIndex', function () {
    var onTabFocus = function onTabFocus() {};

    var onTabSelect = function onTabSelect() {};

    var component = shallow(React.createElement(TabViewPrimitive, {
      focusedIndex: 0,
      onTabFocus: onTabFocus,
      onTabSelect: onTabSelect,
      resetActiveTab: function resetActiveTab() {},
      resetFocusedTab: function resetFocusedTab() {},
      selectedIndex: 1
    }, React.createElement(Tab, {
      title: "tab1"
    }, "Tab 1"), React.createElement(Tab, {
      title: "tab2"
    }, "Tab 2")));
    var tabs = component.find('.tabs').find('button');
    expect(tabs.at(0).hasClass('is-selected')).toBe(false);
    expect(tabs.at(1).hasClass('is-selected')).toBe(true);
  });
  test('should call onTabSelect when tab selected', function () {
    var onTabFocus = sinon.spy();
    var onTabSelect = sinon.spy();
    var event = {
      type: 'click'
    };
    var component = shallow(React.createElement(TabViewPrimitive, {
      focusedIndex: 0,
      onTabFocus: onTabFocus,
      onTabSelect: onTabSelect,
      resetActiveTab: function resetActiveTab() {},
      resetFocusedTab: function resetFocusedTab() {},
      selectedIndex: 1
    }, React.createElement(Tab, {
      title: "tab1"
    }, "Tab 1"), React.createElement(Tab, {
      title: "tab2"
    }, "Tab 2")));
    var tabTwoButton = component.find('.tabs').find('button').at(1).find('button');
    tabTwoButton.simulate('click', event);
    expect(onTabSelect.calledWith(1)).toBe(true);
    expect(onTabFocus.calledWith(1)).toBe(true);
  });
  test('should select the right tab on ArrowRight', function () {
    var onTabFocus = sinon.mock().withArgs(1);
    var onTabSelect = sinon.mock().never();
    var component = mount(React.createElement(TabViewPrimitive, {
      focusedIndex: 0,
      onTabFocus: onTabFocus,
      onTabSelect: onTabSelect,
      resetActiveTab: function resetActiveTab() {},
      resetFocusedTab: function resetFocusedTab() {},
      selectedIndex: 0
    }, React.createElement(Tab, {
      title: "tab1"
    }, "Tab 1"), React.createElement(Tab, {
      title: "tab2"
    }, "Tab 2")));
    simulateKeyDown(component, 'ArrowRight', true);
  });
  test('should focus first tab on ArrowRight from the last tab', function () {
    var onTabFocus = sinon.mock().withArgs(1);
    var onTabSelect = sinon.mock().never();
    var component = mount(React.createElement(TabViewPrimitive, {
      focusedIndex: 0,
      onTabFocus: onTabFocus,
      onTabSelect: onTabSelect,
      resetActiveTab: function resetActiveTab() {},
      resetFocusedTab: function resetFocusedTab() {},
      selectedIndex: 1
    }, React.createElement(Tab, {
      title: "tab1"
    }, "Tab 1"), React.createElement(Tab, {
      title: "tab2"
    }, "Tab 2")));
    simulateKeyDown(component, 'ArrowRight', true);
  });
  test('should focus the left tab on ArrowLeft', function () {
    var onTabFocus = sinon.mock().withArgs(0);
    var onTabSelect = sinon.mock().never();
    var component = mount(React.createElement(TabViewPrimitive, {
      focusedIndex: 1,
      onTabFocus: onTabFocus,
      onTabSelect: onTabSelect,
      resetActiveTab: function resetActiveTab() {},
      resetFocusedTab: function resetFocusedTab() {},
      selectedIndex: 1
    }, React.createElement(Tab, {
      title: "tab1"
    }, "Tab 1"), React.createElement(Tab, {
      title: "tab2"
    }, "Tab 2")));
    simulateKeyDown(component, 'ArrowLeft', true);
  });
  test('should focus last tab on ArrowLeft from the first tab', function () {
    var onTabFocus = sinon.mock().withArgs(2);
    var onTabSelect = sinon.mock().never();
    var component = mount(React.createElement(TabViewPrimitive, {
      focusedIndex: 0,
      onTabFocus: onTabFocus,
      onTabSelect: onTabSelect,
      resetActiveTab: function resetActiveTab() {},
      resetFocusedTab: function resetFocusedTab() {},
      selectedIndex: 0
    }, React.createElement(Tab, {
      title: "tab1"
    }, "Tab 1"), React.createElement(Tab, {
      title: "tab2"
    }, "Tab 2"), React.createElement(Tab, {
      title: "tab2"
    }, "Tab 3")));
    simulateKeyDown(component, 'ArrowLeft', true);
  });
  test('should reset selected tab on Escape', function () {
    var onTabFocus = sinon.mock().never();
    var onTabSelect = sinon.mock().never();
    var resetActiveTab = sinon.mock();
    var component = mount(React.createElement(TabViewPrimitive, {
      focusedIndex: 0,
      onTabFocus: onTabFocus,
      onTabSelect: onTabSelect,
      resetActiveTab: resetActiveTab,
      resetFocusedTab: function resetFocusedTab() {},
      selectedIndex: 0
    }, React.createElement(Tab, {
      title: "tab1"
    }, "Tab 1"), React.createElement(Tab, {
      title: "tab2"
    }, "Tab 2")));
    simulateKeyDown(component, 'Escape', false);
  });
  describe('render()', function () {
    [{
      tabsContainerOffsetLeft: 1,
      isDynamic: true,
      style: {
        left: '1px'
      }
    }, {
      tabsContainerOffsetLeft: 1,
      isDynamic: false,
      style: {}
    }].forEach(function (_ref) {
      var tabsContainerOffsetLeft = _ref.tabsContainerOffsetLeft,
          isDynamic = _ref.isDynamic,
          style = _ref.style;
      test('should render tabs with correct style', function () {
        var component = shallow(React.createElement(TabViewPrimitive, {
          focusedIndex: 0,
          isDynamic: isDynamic,
          onTabFocus: sandbox.stub(),
          onTabSelect: sandbox.stub(),
          resetActiveTab: sandbox.stub(),
          resetFocusedTab: sandbox.stub(),
          selectedIndex: 0
        }, React.createElement(Tab, {
          title: "tab1"
        }, "Tab 1"), React.createElement(Tab, {
          title: "tab2"
        }, "Tab 2")));
        component.setState({
          tabsContainerOffsetLeft: tabsContainerOffsetLeft
        });
        var tab = component.find('.tabs');
        expect(tab.prop('style')).toEqual(style);
      });
    });
  });
  describe('Dynamic Tabs', function () {
    describe('scrollToTab', function () {
      var component;
      beforeEach(function () {
        var onTabFocus = sinon.mock();
        var onTabSelect = sinon.mock();
        component = mount(React.createElement(TabViewPrimitive, {
          focusedIndex: 0,
          isDynamic: true,
          onTabFocus: onTabFocus,
          onTabSelect: onTabSelect,
          resetActiveTab: function resetActiveTab() {},
          resetFocusedTab: function resetFocusedTab() {},
          selectedIndex: 0
        }, React.createElement(Tab, {
          title: "tab1"
        }, "Tab 1"), React.createElement(Tab, {
          title: "tab2"
        }, "Tab 2")));
      });
      test('should not throw an error if scroll to index is out of bound', function () {
        component.instance().scrollToTab(-1);
        component.instance().scrollToTab(3); // 3 is more than the number of tabs
      });
      test('should not do anything if component is not dynamic', function () {
        component = mount(React.createElement(TabViewPrimitive, {
          focusedIndex: 0,
          isDynamic: true,
          onTabFocus: function onTabFocus() {},
          onTabSelect: function onTabSelect() {},
          resetActiveTab: function resetActiveTab() {},
          resetFocusedTab: function resetFocusedTab() {},
          selectedIndex: 0
        }, React.createElement(Tab, {
          title: "tab1"
        }, "Tab 1"), React.createElement(Tab, {
          title: "tab2"
        }, "Tab 2")));
        var instance = component.instance();
        instance.setState = sinon.mock();
        component.instance().scrollToTab(0);
        expect(instance.setState.never()).toBeTruthy();
      });
      test("should set tabsContainerOffsetLeft to 0 if last element's anchor point does not go beyond the view port width", function () {
        var tabsElements = [{
          offsetLeft: 0,
          offsetWidth: 1
        }, {
          offsetLeft: 1,
          offsetWidth: 1
        }];
        var instance = component.instance();
        instance.tabsElements = tabsElements;
        instance.tabsContainer = {
          offsetWidth: 100
        };
        instance.setState = sinon.mock();
        component.instance().scrollToTab(1);
        expect(instance.setState.calledWith({
          tabsContainerOffsetLeft: 0
        })).toBeTruthy();
      });
      test("should set tabsContainerOffsetLeft to -100 if last element's anchor point goes beyond the view port width", function () {
        var tabsElements = [{
          offsetLeft: 100,
          offsetWidth: 100
        }];
        var instance = component.instance();
        instance.tabsElements = tabsElements;
        instance.tabsContainer = {
          offsetWidth: 100
        };
        instance.setState = sinon.mock();
        component.instance().scrollToTab(0);
        expect(instance.setState.calledWith({
          tabsContainerOffsetLeft: -100
        })).toBeTruthy();
      });
    });
    describe('life cycle methods', function () {
      var component;
      beforeEach(function () {
        var onTabFocus = sinon.mock();
        var onTabSelect = sinon.mock();
        component = mount(React.createElement(TabViewPrimitive, {
          focusedIndex: 1,
          isDynamic: true,
          onTabFocus: onTabFocus,
          onTabSelect: onTabSelect,
          resetActiveTab: function resetActiveTab() {},
          resetFocusedTab: function resetFocusedTab() {},
          selectedIndex: 0
        }, React.createElement(Tab, {
          title: "tab1"
        }, "Tab 1"), React.createElement(Tab, {
          title: "tab2"
        }, "Tab 2")));
      });
      describe('componentDidMount', function () {
        test('should call scrollToTab when mounted to make sure the scroll position is correct and the button visiblity is adjusted', function () {
          var instance = component.instance();
          instance.scrollToTab = sinon.mock();
          instance.componentDidMount();
          expect(instance.scrollToTab.calledWith(1)).toBeTruthy();
        });
        test('should not call scrollToTab when mounted to make sure the scroll position is correct and the button visiblity is adjusted', function () {
          var instance = component.instance();
          component.setProps({
            isDynamic: false
          });
          instance.scrollToTab = sinon.mock();
          instance.componentDidMount();
          expect(instance.scrollToTab.never).toBeTruthy();
        });
      });
      describe('componentDidUpdate', function () {
        test('should not call focusOnTabElment if component is not dynamic', function () {
          var instance = component.instance();
          instance.focusOnTabElement = sinon.mock();
          component.setProps({
            focusedIndex: 0,
            isDynamic: false
          });
          expect(instance.focusOnTabElement.never).toBeTruthy();
        });
        test('should call focusOnTabElment if it was changed', function () {
          var instance = component.instance();
          instance.focusOnTabElement = sinon.mock();
          var prevFocusedIndex = 2;
          var newFocusedIndex = component.props().focusedIndex;
          instance.componentDidUpdate({
            focusedIndex: prevFocusedIndex,
            isDynamic: true
          });
          expect(instance.focusOnTabElement.calledWith(newFocusedIndex)).toBeTruthy();
        });
        test('should do nothing if it is not dynamic', function () {
          var instance = component.instance();
          instance.scrollToTab = sinon.mock();
          instance.componentDidUpdate({
            focusedIndex: 0,
            isDynamic: false,
            selectedIndex: 0
          });
          expect(instance.scrollToTab.never).toBeTruthy();
        });
        test('should call scrollToTab with focusedIndex if it was changed', function () {
          var instance = component.instance();
          instance.scrollToTab = sinon.mock();
          component.setProps({
            focusedIndex: 2,
            isDynamic: true,
            selectedIndex: component.props().selectedIndex
          });
          expect(instance.scrollToTab.calledWith(2)).toBeTruthy();
        });
        test('should call scrollToTab with selectedIndex if it was changed', function () {
          var instance = component.instance();
          instance.scrollToTab = sinon.mock();
          var selectedIndex = 2;
          component.setProps({
            focusedIndex: component.props().focusedIndex,
            isDynamic: true,
            selectedIndex: selectedIndex
          });
          expect(instance.scrollToTab.calledWith(selectedIndex)).toBeTruthy();
        });
      });
    });
    describe('arrows', function () {
      var component;
      var onTabFocus;
      beforeEach(function () {
        onTabFocus = sinon.mock();
        var onTabSelect = sinon.mock();
        component = mount(React.createElement(TabViewPrimitive, {
          focusedIndex: 0,
          isDynamic: true,
          onTabFocus: onTabFocus,
          onTabSelect: onTabSelect,
          resetActiveTab: function resetActiveTab() {},
          resetFocusedTab: function resetFocusedTab() {},
          selectedIndex: 0
        }, React.createElement(Tab, {
          title: "tab1"
        }, "Tab 1"), React.createElement(Tab, {
          title: "tab2"
        }, "Tab 2"), React.createElement(Tab, {
          title: "tab3"
        }, "Tab 2")));
      });
      describe('right arrow', function () {
        test('should make hidden if there is no tabsContainer meaning it has not been rendered', function () {
          var result = component.instance().isRightArrowVisible();
          expect(result).toBeFalsy();
        });
        test('should make hidden if last element is inside the viewport', function () {
          var instance = component.instance();
          instance.setState({
            tabsContainerOffsetLeft: 100
          });
          var lastElementIsInsideOfTabsContainer = {
            offsetLeft: 0,
            offsetWidth: 50
          };
          instance.tabsElements = [lastElementIsInsideOfTabsContainer];
          instance.tabsContainer = {
            offsetWidth: 200
          };
          expect(instance.isRightArrowVisible()).toBeFalsy();
        });
        test('should make visible if the last element is outside the viewport', function () {
          var instance = component.instance();
          instance.setState({
            tabsContainerOffsetLeft: 100
          });
          var lastElementIsOutsideOfTabsContainer = {
            offsetLeft: 100,
            offsetWidth: 100
          };
          instance.tabsElements = [lastElementIsOutsideOfTabsContainer];
          instance.tabsContainer = {
            offsetWidth: 100
          };
          expect(instance.isRightArrowVisible()).toBeTruthy();
        });
        test('should call onTabFocus when clicked', function () {
          component.find('button.right-arrow').simulate('click');
          expect(onTabFocus.calledWith(1)).toBeTruthy();
        });
      });
      describe('left arrow', function () {
        test('should make hidden when tabsContainer offset left is 0', function () {
          var instance = component.instance();
          instance.tabsContainer = {};
          component.setProps({
            focusedIndex: 0
          });
          component.setProps({
            selectedIndex: 0
          });
          component.setState({
            tabsContainerOffsetLeft: 0
          });
          expect(instance.isLeftArrowVisible()).toBeFalsy();
        });
        test('should make hidden when tabsContainer offset left is 0 when focus index is not 0', function () {
          var instance = component.instance();
          instance.tabsContainer = {};
          component.setProps({
            focusedIndex: 1
          });
          component.setState({
            tabsContainerOffsetLeft: 0
          });
          expect(instance.isLeftArrowVisible()).toBeFalsy();
        });
        test('should make hidden when tabsContainer offset left is 0 when select index is not 0', function () {
          var instance = component.instance();
          instance.tabsContainer = {};
          component.setProps({
            selectedIndex: 1
          });
          component.setState({
            tabsContainerOffsetLeft: 0
          });
          expect(instance.isLeftArrowVisible()).toBeFalsy();
        });
        test('should make visible when tabsContainer offset left is not 0 and the focused is not 0', function () {
          var instance = component.instance();
          instance.tabsContainer = {};
          component.setProps({
            focusedIndex: 1
          });
          component.setState({
            tabsContainerOffsetLeft: 1
          });
          expect(instance.isLeftArrowVisible()).toBeTruthy();
        });
        test('should make visible when tabsContainer offset left is not 0 and the selected index is not 0', function () {
          var instance = component.instance();
          instance.tabsContainer = {};
          component.setProps({
            selectedIndex: 1
          });
          component.setState({
            tabsContainerOffsetLeft: 1
          });
          expect(instance.isLeftArrowVisible()).toBeTruthy();
        });
        test('should call onTabFocus when clicked', function () {
          component.find('button.left-arrow').simulate('click');
          expect(onTabFocus.calledWith(-1)).toBeTruthy();
        });
      });
    });
    describe('accessibility with Tab key', function () {
      test('should refocus on the selected tab', function () {
        var resetFocusedTab = sinon.mock();
        var component = mount(React.createElement(TabViewPrimitive, {
          focusedIndex: 0,
          isDynamic: true,
          onTabFocus: function onTabFocus() {},
          onTabSelect: function onTabSelect() {},
          resetActiveTab: function resetActiveTab() {},
          resetFocusedTab: resetFocusedTab,
          selectedIndex: 1
        }, React.createElement(Tab, {
          title: "tab1"
        }, "Tab 1"), React.createElement(Tab, {
          title: "tab2"
        }, "Tab 2")));
        simulateKeyDown(component, 'Tab', false);
        expect(resetFocusedTab.calledOnce).toBeTruthy();
      });
    });
    describe('focusOnTabElement', function () {
      var onTabFocus;
      var onTabSelect;
      var component;
      beforeEach(function () {
        onTabFocus = sinon.mock().withArgs(1);
        onTabSelect = sinon.mock().never();
        component = mount(React.createElement(TabViewPrimitive, {
          focusedIndex: 0,
          isDynamic: true,
          onTabFocus: onTabFocus,
          onTabSelect: onTabSelect,
          resetActiveTab: function resetActiveTab() {},
          resetFocusedTab: function resetFocusedTab() {},
          selectedIndex: 0
        }, React.createElement(Tab, {
          title: "tab1"
        }, "Tab 1"), React.createElement(Tab, {
          title: "tab2"
        }, "Tab 2")));
      });
      test('should not throw when index is less than 0', function () {
        component.instance().focusOnTabElement(-1);
      });
      test('should not throw when index is larger than then number of tabs', function () {
        component.instance().focusOnTabElement(3);
      });
    });
  });
});