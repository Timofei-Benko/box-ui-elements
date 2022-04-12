function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import sinon from 'sinon';
import InfiniteScroll from '../InfiniteScroll';
var sandbox = sinon.sandbox.create();
var mockOnLoadMore = jest.fn();
var threshold = 100;
var propsList = {
  isLoading: false,
  hasMore: false,
  useWindow: true,
  onLoadMore: mockOnLoadMore,
  threshold: threshold
};

var getSentinel = function getSentinel() {
  var nodes = document.querySelectorAll('[data-testid="sentinel"]');
  return nodes[nodes.length - 1];
};

describe('components/infinite-scroll/InfiniteScroll', function () {
  var attachTo;
  beforeEach(function () {
    var container = document.createElement('div');
    document.body.appendChild(container);
    attachTo = container;
  });
  afterEach(function () {
    mockOnLoadMore.mockReset();
    sandbox.verifyAndRestore();
  });
  it('should render with default props', function () {
    var component = mount(React.createElement(InfiniteScroll, propsList));
    expect(component).toMatchInlineSnapshot("\n<InfiniteScroll\n  hasMore={false}\n  isLoading={false}\n  onLoadMore={[MockFunction]}\n  threshold={100}\n  throttle={64}\n  useWindow={true}\n>\n  <div>\n    <div\n      data-testid=\"sentinel\"\n    />\n  </div>\n</InfiniteScroll>\n");
  });
  it('should render sentinel to calculate scroll position', function () {
    var component = mount(React.createElement(InfiniteScroll, propsList));
    expect(component.find('[data-testid="sentinel"]').length).toEqual(1);
  });
  it('should call onLoadMore if sentinel is in threshold range while scrolling in window', function () {
    var items = new Array(20).fill('ITEM');
    mount(React.createElement(InfiniteScroll, _extends({}, propsList, {
      hasMore: true
    }), React.createElement("div", null, items.map(function (item, i) {
      return React.createElement("div", {
        key: i,
        style: {
          height: '100px'
        }
      }, item);
    }))), {
      attachTo: attachTo
    });
    var sentinel = getSentinel();
    sandbox.stub(sentinel, 'getBoundingClientRect').returns({
      top: window.innerHeight + (threshold - 1)
    });
    window.dispatchEvent(new Event('scroll'));
    expect(mockOnLoadMore).toHaveBeenCalled();
  });
  it('should not call onLoadMore if sentinel is not in threshold range while scrolling in window', function () {
    var items = new Array(20).fill('ITEM');
    mount(React.createElement(InfiniteScroll, _extends({}, propsList, {
      hasMore: true
    }), React.createElement("div", null, items.map(function (item, i) {
      return React.createElement("div", {
        key: i
      }, item);
    }))), {
      attachTo: attachTo
    });
    var sentinel = getSentinel();
    sandbox.stub(sentinel, 'getBoundingClientRect').returns({
      top: window.innerHeight + (threshold + 1)
    });
    window.dispatchEvent(new Event('scroll'));
    expect(mockOnLoadMore).not.toHaveBeenCalled();
  });
  it('should call onLoadMore if sentinel is in threshold range while scrolling scrollContainerNode', function () {
    var scrollContainer = document.createElement('div');
    sandbox.stub(scrollContainer, 'getBoundingClientRect').returns({
      bottom: 500
    });
    var items = new Array(20).fill('ITEM');
    mount(React.createElement(InfiniteScroll, _extends({}, propsList, {
      hasMore: true,
      scrollContainerNode: scrollContainer,
      useWindow: false
    }), React.createElement("div", null, items.map(function (item, i) {
      return React.createElement("div", {
        key: i,
        style: {
          height: '100px'
        }
      }, item);
    }))), {
      attachTo: attachTo
    });
    var sentinel = getSentinel();
    sandbox.stub(sentinel, 'getBoundingClientRect').returns({
      top: 500 + (threshold - 1)
    });
    scrollContainer.dispatchEvent(new Event('scroll'));
    expect(mockOnLoadMore).toHaveBeenCalled();
  });
  it('should call onLoadMore if sentinel is in threshold range while scrolling scrollContainerNode', function () {
    var scrollContainer = document.createElement('div');
    sandbox.stub(scrollContainer, 'getBoundingClientRect').returns({
      bottom: 500
    });
    var items = new Array(20).fill('ITEM');
    mount(React.createElement(InfiniteScroll, _extends({}, propsList, {
      hasMore: true,
      scrollContainerNode: scrollContainer,
      useWindow: false
    }), React.createElement("div", null, items.map(function (item, i) {
      return React.createElement("div", {
        key: i,
        style: {
          height: '100px'
        }
      }, item);
    }))), {
      attachTo: attachTo
    });
    var sentinel = getSentinel();
    sandbox.stub(sentinel, 'getBoundingClientRect').returns({
      top: 500 + (threshold + 1)
    });
    scrollContainer.dispatchEvent(new Event('scroll'));
    expect(mockOnLoadMore).not.toHaveBeenCalled();
  });
  it('should reset event listeners on useWindow or scrollContainerNode update', function () {
    var component = mount(React.createElement(InfiniteScroll, propsList));
    var mockAddEventListeners = jest.spyOn(component.instance(), 'addEventListeners');
    var mockRemoveEventListeners = jest.spyOn(component.instance(), 'removeEventListeners');
    component.update();
    component.setProps({
      useWindow: false
    });
    expect(mockAddEventListeners).toHaveBeenCalledTimes(1);
    expect(mockRemoveEventListeners).toHaveBeenCalledTimes(1);
    component.setProps({
      scrollContainerNode: document.createElement('div')
    });
    expect(mockAddEventListeners).toHaveBeenCalledTimes(2);
    expect(mockRemoveEventListeners).toHaveBeenCalledTimes(2);
  });
  describe('with sentinel in range', function () {
    var component;
    var mockedOnLoadMore = jest.fn();
    beforeEach(function () {
      var items = new Array(20).fill('ITEM');
      component = mount(React.createElement(InfiniteScroll, _extends({}, propsList, {
        hasMore: true,
        onLoadMore: mockedOnLoadMore,
        useWindow: true
      }), React.createElement("div", null, items.map(function (item, i) {
        return React.createElement("div", {
          key: i,
          style: {
            height: '100px'
          }
        }, item);
      }))), {
        attachTo: attachTo
      });
      var sentinel = getSentinel();
      sandbox.stub(sentinel, 'getBoundingClientRect').returns({
        top: window.innerHeight + (threshold - 1)
      });
    });
    afterEach(function () {
      mockedOnLoadMore.mockReset();
    });
    it('should not call onLoadMore if isLoading', function () {
      component.setProps({
        isLoading: true
      }, function () {
        window.dispatchEvent(new Event('scroll'));
        expect(mockedOnLoadMore).not.toHaveBeenCalled();
      });
    });
    it('should not call onLoadMore if !hasMore', function () {
      component.setProps({
        hasMore: false
      }, function () {
        window.dispatchEvent(new Event('scroll'));
        expect(mockedOnLoadMore).not.toHaveBeenCalled();
      });
    });
  });
});