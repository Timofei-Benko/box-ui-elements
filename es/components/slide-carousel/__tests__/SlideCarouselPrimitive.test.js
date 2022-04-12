function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import range from 'lodash/range';
import CarouselHeader from '../CarouselHeader';
import Slide from '../Slide';
import SlideCarouselPrimitive from '../SlideCarouselPrimitive';
import SlideNavigator from '../SlideNavigator';

var getSlides = function getSlides(numSlides) {
  return range(numSlides).map(function (i) {
    return shallow(React.createElement(Slide, null, "`Slide $", i, "`"));
  });
};

describe('components/slide-carousel/SlideCarouselPrimitive', function () {
  var defaultProps = {
    children: getSlides(5),
    selectedIndex: 1
  };

  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(SlideCarouselPrimitive, _extends({}, defaultProps, props)));
  };

  test('should add the given class to the containing div', function () {
    expect(getWrapper({
      className: 'someClass'
    }).first().hasClass('someClass')).toBe(true);
  });
  test('should render a CarouselHeader with a given title', function () {
    var testTitle = 'Carousel Title';
    var wrapper = getWrapper({
      title: testTitle
    });
    expect(wrapper.find(CarouselHeader).prop('title')).toBe(testTitle);
  });
  test('should not render a CarouselHeader when no title is given', function () {
    var wrapper = getWrapper({
      title: ''
    });
    expect(wrapper.find(CarouselHeader).length).toBe(0);
  });
  test('should pass 0 as numOptions to navigator when childless', function () {
    var wrapper = getWrapper({
      children: getSlides(0)
    });
    expect(wrapper.find(SlideNavigator).prop('numOptions')).toBe(0);
  });
  test('should pass number of children to navigator', function () {
    var wrapper = getWrapper({
      children: getSlides(4)
    });
    expect(wrapper.find(SlideNavigator).prop('numOptions')).toBe(4);
  });
});