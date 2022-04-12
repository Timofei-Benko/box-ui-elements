function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import range from 'lodash/range';
import sinon from 'sinon';
import SlideCarousel from '../SlideCarousel';
import SlideCarouselPrimitive from '../SlideCarouselPrimitive';
import Slide from '../Slide';

var getSlides = function getSlides(numSlides) {
  return range(numSlides).map(function (i) {
    return shallow(React.createElement(Slide, null, "`Slide $", i, "`"));
  });
};

describe('components/slide-carousel/SlideCarousel', function () {
  var sandbox = sinon.sandbox.create();
  var defaultProps = {
    children: getSlides(5),
    initialIndex: 1
  };
  afterEach(function () {
    sandbox.verifyAndRestore();
  });

  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(SlideCarousel, _extends({}, defaultProps, props)));
  };

  describe('construction()', function () {
    test('should initialize selectedIndex as the initialIndex prop', function () {
      var wrapper = getWrapper({
        children: getSlides(5),
        initialIndex: 3
      });
      expect(wrapper.state('selectedIndex')).toBe(3);
    });
    test('initial index should be 0 if no children and no initialIndex passed', function () {
      var wrapper = getWrapper({
        children: getSlides(0),
        initialIndex: undefined
      });
      expect(wrapper.state('selectedIndex')).toBe(0);
    });
    test('initial index should default to 0', function () {
      var wrapper = getWrapper({
        initialIndex: undefined
      });
      expect(wrapper.state('selectedIndex')).toBe(0);
    });
    test('initial index will be less than zero if initialIndex is smaller than 0', function () {
      var wrapper = getWrapper({
        initialIndex: -5
      });
      expect(wrapper.state('selectedIndex')).toBe(-5);
    });
  });
  describe('render()', function () {
    test('should render a SlideCarouselPrimitive', function () {
      var wrapper = getWrapper();
      expect(wrapper.is(SlideCarouselPrimitive)).toBe(true);
    });
    test('should generate ID and pass to child', function () {
      var wrapper = getWrapper();
      expect(wrapper.prop('idPrefix')).toEqual(wrapper.instance().id);
    });
    test('should pass to immediate child 0 if the number of children is zero', function () {
      var wrapper = getWrapper({
        id: undefined,
        children: getSlides(0)
      });
      expect(wrapper.find('SlideCarouselPrimitive').prop('selectedIndex')).toBe(0);
    });
    test('should pass to immediate child 0 if state.selectedIndex is less than 0', function () {
      var wrapper = getWrapper({
        id: undefined
      });
      wrapper.setState({
        selectedIndex: -1
      });
      expect(wrapper.find('SlideCarouselPrimitive').prop('selectedIndex')).toBe(0);
    });
    test('should pass to immediate child the number of children -1 if the number of children is less than state.selectedIndex', function () {
      var wrapper = getWrapper({
        children: getSlides(5)
      });
      wrapper.setState({
        selectedIndex: 9999
      });
      expect(wrapper.find('SlideCarouselPrimitive').prop('selectedIndex')).toBe(4);
    });
    test('should set the selectedIndex to a floored value if state.selectedIndex is a fraction', function () {
      var wrapper = getWrapper({
        children: getSlides(5)
      });
      wrapper.setState({
        selectedIndex: 2.453
      });
      expect(wrapper.find('SlideCarouselPrimitive').prop('selectedIndex')).toBe(2);
    });
  });
  describe('setSelectedIndex()', function () {
    test('should update selectedIndex when setSelectedIndex is called', function () {
      var wrapper = getWrapper({
        children: getSlides(7)
      });
      wrapper.instance().setSelectedIndex(3);
      expect(wrapper.state('selectedIndex')).toBe(3);
      wrapper.instance().setSelectedIndex(1);
      expect(wrapper.state('selectedIndex')).toBe(1);
    });
  });
});