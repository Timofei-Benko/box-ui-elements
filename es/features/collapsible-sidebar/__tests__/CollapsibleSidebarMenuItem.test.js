import * as React from 'react';
import Tooltip from '../../../components/tooltip';
import { mountConnected } from '../../../test-utils/enzyme';
import * as libDom from '../../../utils/dom';
import CollapsibleSidebarMenuItem from '../CollapsibleSidebarMenuItem';
import CollapsibleSidebarContext from '../CollapsibleSidebarContext';
jest.mock('../../../utils/dom', function () {
  return {
    useIsContentOverflowed: jest.fn()
  };
});
describe('components/core/collapsible-sidebar/__tests__/CollapsibleSidebarMenuItem', function () {
  var getWrapper = function getWrapper(props) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$isScrolling = _ref.isScrolling,
        isScrolling = _ref$isScrolling === void 0 ? false : _ref$isScrolling;

    return mountConnected(React.createElement(CollapsibleSidebarContext.Provider, {
      value: {
        isScrolling: isScrolling
      }
    }, React.createElement(CollapsibleSidebarMenuItem, props)));
  };

  beforeEach(function () {
    libDom.useIsContentOverflowed.mockReturnValue(false);
  });
  test('matches snapshot', function () {
    var wrapper = getWrapper({
      className: 'foo',
      text: 'bar',
      icon: 'bold'
    }, {
      isScrolling: false
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should show custom content when content is passed', function () {
    var testContent = 'Custom Content';
    var wrapper = getWrapper({
      className: 'foo',
      content: React.createElement("div", {
        className: "custom-div"
      }, testContent),
      icon: 'bold',
      text: 'bar'
    }, {
      isScrolling: false
    });
    expect(wrapper.find('.custom-div')).toHaveLength(1);
    expect(wrapper.find('.custom-div').text()).toBe(testContent);
    expect(wrapper.find('span.bdl-CollapsibleSidebar-menuItemLabel')).toHaveLength(1);
  });
  test('should allow tooltip if text is overflowing and not scrolling', function () {
    libDom.useIsContentOverflowed.mockReturnValue(true);
    var wrapper = getWrapper({
      text: 'bar',
      icon: 'bold'
    }, {
      isScrolling: false
    });
    expect(wrapper.find('.bdl-CollapsibleSidebar-menuItemToolTip').length).toBe(1);
    expect(wrapper.find(Tooltip).prop('isShown')).toBe(undefined); // can show on hover

    expect(wrapper.find(Tooltip).prop('isDisabled')).toBe(false);
  });
  test('should not render visible tooltip if text is overflowing and scrolling', function () {
    libDom.useIsContentOverflowed.mockReturnValue(true);
    var wrapper = getWrapper({
      text: 'bar',
      icon: 'bold'
    }, {
      isScrolling: true
    });
    expect(wrapper.find('.bdl-CollapsibleSidebar-menuItemToolTip').length).toBe(0);
  });
  test('should spread props to inner element', function () {
    var mouseEvent = jest.fn();
    var wrapper = getWrapper({
      className: 'foo',
      text: 'bar',
      icon: 'bold',
      onMouseOver: mouseEvent
    });
    var classNameTarget = wrapper.find('CollapsibleSidebarMenuItem__StyledMenuItem');
    var restTarget = wrapper.find('a');
    expect(restTarget.prop('onMouseOver')).toBe(mouseEvent);
    expect(classNameTarget.prop('className')).toBe('bdl-CollapsibleSidebar-menuItem foo');
  });
  test('should not show overflow action container', function () {
    var wrapper = getWrapper({
      className: 'foo',
      text: 'bar',
      icon: 'bold'
    });
    expect(wrapper.find('.bdl-CollapsibleSidebar-menuItemActionContainer').length).toBe(0);
  });
  test('should show overflow action by default', function () {
    var wrapper = getWrapper({
      className: 'foo',
      text: 'bar',
      icon: 'bold',
      overflowAction: React.createElement("div", null, "Hi")
    });
    expect(wrapper.find('.show-overflowAction').length).toBe(2);
    expect(wrapper.find('.bdl-CollapsibleSidebar-menuItemActionContainer').length).toBe(1);
  });
  test('should show overflow action on hover if showAction is set to hover', function () {
    var wrapper = getWrapper({
      className: 'foo',
      text: 'bar',
      icon: 'bold',
      overflowAction: React.createElement("div", null, "Hi"),
      showOverflowAction: 'hover'
    });
    expect(wrapper.find('.show-overflowAction').length).toBe(0);
    expect(wrapper.find('.bdl-CollapsibleSidebar-menuItemActionContainer').length).toBe(1);
  });
  test('should show link class name when it is set', function () {
    var wrapper = getWrapper({
      className: 'foo',
      text: 'bar',
      icon: 'bold',
      linkClassName: 'is-currentPage'
    });
    expect(wrapper.find('CollapsibleSidebarMenuItem__StyledLink.is-currentPage').length).toBe(1);
  });
});