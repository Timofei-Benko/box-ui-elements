function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import range from 'lodash/range';
import sinon from 'sinon';
import SlidePanels from '../SlidePanels';
import Slide from '../Slide';
var sandbox = sinon.sandbox.create();

var getSlides = function getSlides(numSlides) {
  return range(numSlides).map(function (i) {
    return shallow(React.createElement(Slide, null, "`Slide $", i, "`"));
  });
};

describe('components/slide-carousel/SlidePanels', function () {
  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  var defaultProps = {
    getPanelIdFromValue: function getPanelIdFromValue(val) {
      return "panel-".concat(val);
    },
    onSelection: function onSelection(i) {
      return "blah".concat(i);
    },
    selectedIndex: 0
  };

  var getNode = function getNode(props) {
    return React.createElement(SlidePanels, _extends({}, defaultProps, props));
  };

  var getWrapper = function getWrapper(props) {
    return shallow(getNode(props));
  };

  describe('handleKeyDown', function () {
    [// randow key shouldn't trigger a selection
    {
      currIndex: 0,
      numSlides: 5,
      key: 'A',
      expectedSelection: null
    }, // left arrow on first element should select last element
    {
      currIndex: 0,
      numSlides: 5,
      key: 'ArrowLeft',
      expectedSelection: 4
    }, // left arrow should select left element
    {
      currIndex: 3,
      numSlides: 5,
      key: 'ArrowLeft',
      expectedSelection: 2
    }, // right arrow should select right element
    {
      currIndex: 2,
      numSlides: 5,
      key: 'ArrowRight',
      expectedSelection: 3
    }, // right arrow on last eklement should select first element
    {
      currIndex: 4,
      numSlides: 5,
      key: 'ArrowRight',
      expectedSelection: 0
    }].forEach(function (_ref) {
      var currIndex = _ref.currIndex,
          numSlides = _ref.numSlides,
          key = _ref.key,
          expectedSelection = _ref.expectedSelection;
      test('should handle keypresses correctly', function () {
        var wrapper = getWrapper({
          selectedIndex: currIndex,
          children: getSlides(numSlides)
        });
        var instance = wrapper.instance();
        instance.handleSelection = sandbox.spy();
        var shouldStopEvent = ['ArrowLeft', 'ArrowRight'].includes(key);
        var onKeyEvent = {
          key: key,
          preventDefault: shouldStopEvent ? sandbox.mock() : sandbox.mock().never(),
          stopPropagation: shouldStopEvent ? sandbox.mock() : sandbox.mock().never()
        };
        instance.handleKeyDown(onKeyEvent);

        if (expectedSelection === null) {
          sinon.assert.notCalled(instance.handleSelection);
        } else {
          sinon.assert.calledWithExactly(instance.handleSelection, expectedSelection);
        }
      });
    });
  });
  test('handleSelection should focus the container and call the onSelection prop with the right index', function () {
    var focusOnContainerElementSpy = sandbox.spy();
    var onSelectionSpy = sandbox.spy();
    var wrapperInstance = getWrapper({
      onSelection: onSelectionSpy
    }).instance();
    wrapperInstance.focusOnContainerElement = focusOnContainerElementSpy;
    var index = 2;
    wrapperInstance.handleSelection(index);
    sinon.assert.calledWithExactly(onSelectionSpy, index);
    sinon.assert.calledOnce(focusOnContainerElementSpy);
  });
  test('should render a div for every child', function () {
    var wrapper = getWrapper({
      children: getSlides(5)
    });
    expect(wrapper.find('div.slide-panel').length).toBe(5);
  });
  test('should only show the selected slide', function () {
    var wrapper = getWrapper({
      children: getSlides(5),
      selectedIndex: 3
    });
    expect(wrapper.children().everyWhere(function (el, i) {
      var isHidden = el.prop('aria-hidden');
      return i === 3 ? !isHidden : isHidden;
    })).toBe(true);
  });
  test('should use the getPanelIdFromValue prop to generate ids for slides', function () {
    var getPanelIdFromValue = function getPanelIdFromValue(i) {
      return "unique".concat(i);
    };

    var wrapper = getWrapper({
      children: getSlides(5),
      getPanelIdFromValue: getPanelIdFromValue
    });
    expect(wrapper.children().everyWhere(function (el, i) {
      return el.prop('id') === getPanelIdFromValue(i);
    })).toBe(true);
  });
});