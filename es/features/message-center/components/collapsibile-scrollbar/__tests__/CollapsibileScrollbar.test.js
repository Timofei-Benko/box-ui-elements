import React from 'react';
import Scrollbar from 'react-scrollbars-custom';
import { act } from 'react-dom/test-utils';
import { mountConnected } from '../../../../../test-utils/enzyme';
import { getScrollShadowClassName } from '../../../../collapsible-sidebar/utils/scrollShadow';
import CollapsibleScrollbar from '../CollapsibleScrollbar';
jest.mock('../../../../collapsible-sidebar/utils/scrollShadow', function () {
  return {
    getScrollShadowClassName: jest.fn()
  };
});
describe('components/message-center/components/collapsible-scrollbar/CollapsibleScrollbar', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return mountConnected(React.createElement(CollapsibleScrollbar, props));
  };

  beforeEach(function () {
    getScrollShadowClassName.mockImplementation(function () {
      return 'foobar';
    });
  });
  afterEach(function () {
    jest.resetAllMocks();
  });
  test('should check scroll shadow if content height changes', function () {
    var scrollbar = getWrapper({
      children: [React.createElement("span", {
        key: "1"
      }, "abc"), React.createElement("span", {
        key: "2"
      }, "def")]
    });
    scrollbar.setProps({
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
    var scrollbar = getWrapper({
      children: [React.createElement("span", {
        key: "1"
      }, "abc"), React.createElement("span", {
        key: "2"
      }, "def")]
    });
    scrollbar.find(Scrollbar).prop('onUpdate')({
      clientHeight: 0
    }, {
      clientHeight: 100
    });
    expect(getScrollShadowClassName).toBeCalled();
  });
  test('scroll states are set when Scollbar component is scrolled', function () {
    var scrollbar = getWrapper({
      children: [React.createElement("span", {
        key: "1"
      }, "abc"), React.createElement("span", {
        key: "2"
      }, "def")],
      expanded: true,
      className: 'foo'
    });
    act(function () {
      scrollbar.find(Scrollbar).prop('onScroll')({
        scrollHeight: 100,
        clientHeight: 200,
        scrollTop: 0
      }, {
        scrollHeight: 100,
        clientHeight: 200,
        scrollTop: 10
      });
    });
    scrollbar.update();
    expect(scrollbar.find('[data-testid="content-wrapper"]').hasClass('is-scrolling')).toBe(true);
    expect(scrollbar.find(Scrollbar).hasClass('foobar')).toBe(true);
  });
});