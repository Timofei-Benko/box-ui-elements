function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import CarouselHeader from '../CarouselHeader';
describe('components/slide-carousel/CarouselHeader', function () {
  var defaultProps = {
    title: 'Blah'
  };

  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(CarouselHeader, _extends({}, defaultProps, props)));
  };

  test('should render a title', function () {
    var testTitle = 'LoveAndHappiness';
    var wrapper = getWrapper({
      title: testTitle
    });
    expect(wrapper.find('h3.slide-carousel-title').text()).toBe(testTitle);
  });
  test('should render a container div', function () {
    var wrapper = getWrapper();
    expect(wrapper.is('div.slide-carousel-header')).toBe(true);
  });
});