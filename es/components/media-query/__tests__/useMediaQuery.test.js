import React from 'react';
import { mount } from 'enzyme';
import useMediaQuery from '../useMediaQuery';
var WIDTH = 999;
var HEIGHT = 998;

function FakeComponent(props) {
  var mediaProps = useMediaQuery();
  return React.createElement("div", null, props.children(mediaProps));
}

function setWindowProperty(prop, value) {
  Object.defineProperty(window, prop, {
    writable: true,
    value: value
  });
}

describe('components/media-query/useMediaQuery', function () {
  test('returns correct view width and height', function () {
    setWindowProperty('innerWidth', WIDTH);
    setWindowProperty('innerHeight', HEIGHT);
    var mountedComponent = mount(React.createElement(FakeComponent, null, function (mediaProps) {
      return React.createElement("div", null, React.createElement("div", {
        className: "height"
      }, mediaProps.viewHeight), React.createElement("div", {
        className: "width"
      }, mediaProps.viewWidth));
    }));
    expect(mountedComponent.find('.height').text()).toBe("".concat(HEIGHT));
    expect(mountedComponent.find('.width').text()).toBe("".concat(WIDTH));
  });
});