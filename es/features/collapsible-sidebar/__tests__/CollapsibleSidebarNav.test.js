import React from 'react';
import Scrollbar from 'react-scrollbars-custom';
import { mountConnected } from '../../../test-utils/enzyme';
import { getScrollShadowClassName } from '../utils/scrollShadow';
import CollapsibleSidebarNav from '../CollapsibleSidebarNav';
import CollapsibleSidebarContext from '../CollapsibleSidebarContext';
jest.mock('../CollapsibleSidebarContext', function () {
  return {
    Provider: jest.fn()
  };
});
jest.mock('../utils/scrollShadow', function () {
  return {
    getScrollShadowClassName: jest.fn()
  };
});
describe('components/core/collapsible-sidebar/CollapsibleSidebarNav', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // Mounting to since we rely on ref values.
    return mountConnected(React.createElement(CollapsibleSidebarNav, props));
  };

  beforeEach(function () {
    CollapsibleSidebarContext.Provider.mockImplementation(function (_ref) {
      var children = _ref.children;
      return children;
    });
    getScrollShadowClassName.mockImplementation(function () {
      return 'foobar';
    });
  });
  afterEach(function () {
    jest.resetAllMocks();
  });
  test('render', function () {
    var sidebar = getWrapper({
      children: [React.createElement("span", {
        key: "1"
      }, "abc"), React.createElement("span", {
        key: "2"
      }, "def")],
      expanded: true,
      className: 'foo'
    });
    expect(sidebar).toMatchSnapshot();
  });
  test('passes customScrollBarProps to Scrollbar from react-scrollbars-custom', function () {
    var customProps = {
      noScrollY: true
    };
    var sidebar = getWrapper({
      children: [React.createElement("span", {
        key: "1"
      }, "abc"), React.createElement("span", {
        key: "2"
      }, "def")],
      expanded: true,
      className: 'foo',
      customScrollBarProps: customProps
    });
    expect(sidebar.find('Scrollbar').props()).toMatchObject(customProps);
  });
  test('should check scroll shadow if content height changes', function () {
    var sidebar = getWrapper({
      children: [React.createElement("span", {
        key: "1"
      }, "abc"), React.createElement("span", {
        key: "2"
      }, "def")]
    });
    sidebar.setProps({
      children: [React.createElement("span", {
        key: "1"
      }, "abc"), React.createElement("span", {
        key: "2"
      }, "def"), React.createElement("span", {
        key: "3"
      }, "foo")]
    });
    expect(getScrollShadowClassName).toBeCalled();
  });
  test('should check scroll shadow if scroller height changes', function () {
    var sidebar = getWrapper({
      children: [React.createElement("span", {
        key: "1"
      }, "abc"), React.createElement("span", {
        key: "2"
      }, "def")]
    });
    sidebar.instance().onUpdateHandler({
      clientHeight: 0
    }, {
      clientHeight: 100
    });
    expect(getScrollShadowClassName).toBeCalled();
  });
  test('scroll states are set when Scollbar component is scrolled', function () {
    var sidebar = getWrapper({
      children: [React.createElement("span", {
        key: "1"
      }, "abc"), React.createElement("span", {
        key: "2"
      }, "def")],
      expanded: true,
      className: 'foo'
    });
    sidebar.find(Scrollbar).prop('onScroll')();
    expect(sidebar.state().isScrolling).toBe(true);
    expect(sidebar.state().scrollShadowClassName).toBe('foobar');
  });
  test('should set shadowClassName based on shadowClass', function () {
    var sidebar = getWrapper({
      children: [React.createElement("span", {
        key: "1"
      }, "abc"), React.createElement("span", {
        key: "2"
      }, "def")],
      expanded: true,
      className: 'foo'
    });
    sidebar.setState({
      scrollShadowClassName: 'baz'
    });
    sidebar.instance().setScrollShadowState();
    expect(sidebar.state().scrollShadowClassName).toBe('foobar');
  });
});