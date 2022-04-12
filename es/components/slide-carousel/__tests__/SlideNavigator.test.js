function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import sinon from 'sinon';
import SlideButton from '../SlideButton';
import SlideNavigator from '../SlideNavigator';
var sandbox = sinon.sandbox.create();
describe('components/slide-carousel/SlideNavigator', function () {
  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  var defaultProps = {
    getButtonIdFromValue: function getButtonIdFromValue(val) {
      return "button-".concat(val);
    },
    getPanelIdFromValue: function getPanelIdFromValue(val) {
      return "panel-".concat(val);
    },
    onSelection: function onSelection(i) {
      return "blah".concat(i);
    },
    numOptions: 5,
    selectedIndex: 0
  };

  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(SlideNavigator, _extends({}, defaultProps, props)));
  };

  describe('handleKeyDown', function () {
    [// randow key shouldn't trigger a selection
    {
      currIndex: 0,
      numOptions: 5,
      key: 'A',
      expectedSelection: null
    }, // left arrow on first element should select last element
    {
      currIndex: 0,
      numOptions: 5,
      key: 'ArrowLeft',
      expectedSelection: 4
    }, // left arrow should select left element
    {
      currIndex: 3,
      numOptions: 5,
      key: 'ArrowLeft',
      expectedSelection: 2
    }, // right arrow should select right element
    {
      currIndex: 2,
      numOptions: 5,
      key: 'ArrowRight',
      expectedSelection: 3
    }, // right arrow on last element should select first element
    {
      currIndex: 4,
      numOptions: 5,
      key: 'ArrowRight',
      expectedSelection: 0
    }].forEach(function (_ref) {
      var currIndex = _ref.currIndex,
          numOptions = _ref.numOptions,
          key = _ref.key,
          expectedSelection = _ref.expectedSelection;
      test('should handle keypresses correctly', function () {
        var wrapper = getWrapper({
          selectedIndex: currIndex,
          numOptions: numOptions
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
  describe('handleSelection', function () {
    test('should call the right methods', function () {
      var onSelectionSpy = sandbox.spy();
      var focusOnButtonElementSpy = sandbox.spy();
      var wrapperInstance = getWrapper({
        onSelection: onSelectionSpy
      }).instance();
      wrapperInstance.focusOnButtonElement = focusOnButtonElementSpy;
      var index = 2;
      wrapperInstance.handleSelection(index);
      sinon.assert.calledWithExactly(onSelectionSpy, index);
      sinon.assert.calledWithExactly(focusOnButtonElementSpy, index);
    });
  });
  test('should create as many buttons as the given number of options', function () {
    var wrapper = getWrapper({
      numOptions: 7
    });
    expect(wrapper.children().filter(SlideButton).length).toBe(7);
  });
  test('should call handleKeyDown on key press', function () {
    var wrapper = getWrapper();
    sandbox.spy(wrapper.instance(), 'handleKeyDown');
    wrapper.setProps({});
    wrapper.simulate('keyDown', {
      key: 'A'
    });
    sinon.assert.calledOnce(wrapper.instance().handleKeyDown);
  });
  test('should use the getButtonIdFromValue prop to generate ids for slide buttons', function () {
    var getButtonIdFromValue = function getButtonIdFromValue(i) {
      return "unique".concat(i);
    };

    var wrapper = getWrapper({
      numOptions: 6,
      getButtonIdFromValue: getButtonIdFromValue
    });
    expect(wrapper.find(SlideButton).everyWhere(function (el, i) {
      return el.prop('id') === getButtonIdFromValue(i);
    })).toBe(true);
  });
  test('should use the getPanelIdFromValue prop to set ids on aria-controls', function () {
    var getPanelIdFromValue = function getPanelIdFromValue(i) {
      return "unique".concat(i);
    };

    var wrapper = getWrapper({
      numOptions: 6,
      getPanelIdFromValue: getPanelIdFromValue
    });
    expect(wrapper.find(SlideButton).everyWhere(function (el, i) {
      return el.prop('aria-controls') === getPanelIdFromValue(i);
    })).toBe(true);
  });
  test('should only mark the button associated to the current selection as selected', function () {
    var testIndex = 4;
    var wrapper = getWrapper({
      numOptions: 6,
      selectedIndex: testIndex
    });
    expect(wrapper.find(SlideButton).everyWhere(function (el, i) {
      return el.prop('isSelected') === (i === testIndex);
    })).toBe(true);
  });
  test('should remove all but the button associated to the selected slide from tabbing order', function () {
    var testIndex = 2;
    var wrapper = getWrapper({
      numOptions: 6,
      selectedIndex: testIndex
    });
    expect(wrapper.find(SlideButton).everyWhere(function (el, i) {
      return i === testIndex ? el.prop('tabIndex') === '0' : el.prop('tabIndex') === '-1';
    })).toBe(true);
  });
});