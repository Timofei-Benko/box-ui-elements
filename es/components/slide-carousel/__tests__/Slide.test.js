function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import Slide from '../Slide';
describe('components/slide-carousel/Slide', function () {
  var defaultProps = {
    className: 'classafrass',
    children: React.createElement("p", null, "Holla die Waldfee")
  };

  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(Slide, _extends({}, defaultProps, props)));
  };

  test('should render a container div', function () {
    var wrapper = getWrapper();
    expect(wrapper.is('div.slide-content')).toBe(true);
  });
  test('should add the given classname to the container div', function () {
    var wrapper = getWrapper({
      className: 'hallihallo'
    });
    expect(wrapper.hasClass('hallihallo')).toBe(true);
  });
  test('should pass children on to container', function () {
    var blahragraph = React.createElement("p", null, "blah ", React.createElement("b", null, "blah"), " blah");
    var wrapper = getWrapper({
      children: blahragraph
    });
    expect(wrapper.prop('children')).toEqual(blahragraph);
  });
});