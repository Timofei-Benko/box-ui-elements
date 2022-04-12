import React from 'react';
import { shallow } from 'enzyme';
import IconPointAnnotation from '../IconPointAnnotation';
describe('icons/annotations/IconPointAnnotation', function () {
  var render = function render() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(IconPointAnnotation, props));
  };

  test('should correctly render default icon', function () {
    var wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified class', function () {
    var className = 'foo';
    var wrapper = render({
      className: className
    });
    expect(wrapper.hasClass(className)).toEqual(true);
    expect(wrapper.hasClass('icon-annotation-point')).toEqual(true);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = render({
      width: width,
      height: height
    });
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = render({
      title: title
    });
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
  test('should correctly render icon with fill color', function () {
    var color = 'foo';
    var wrapper = render({
      color: color
    });
    expect(wrapper.find('path').prop('fill')).toEqual(color);
  });
});