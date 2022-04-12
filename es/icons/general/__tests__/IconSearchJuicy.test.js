import * as React from 'react';
import { shallow } from 'enzyme';
import IconSearchJuicy from '../IconSearchJuicy';
import { bdlGray40 } from '../../../styles/variables';
describe('icons/general/IconSearchJuicy', function () {
  test('should correctly render default icon with default color', function () {
    var dimension = 14;
    var wrapper = shallow(React.createElement(IconSearchJuicy, null));
    expect(wrapper.hasClass('icon-search-juicy')).toEqual(true);
    expect(wrapper.find('path').prop('fill')).toEqual(bdlGray40);
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(dimension);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(dimension);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#fcfcfc';
    var wrapper = shallow(React.createElement(IconSearchJuicy, {
      color: color
    }));
    expect(wrapper.find('path').prop('fill')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var dimension = 16;
    var wrapper = shallow(React.createElement(IconSearchJuicy, {
      height: dimension,
      width: dimension
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(dimension);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(dimension);
  });
  test('should correctly render icon with title', function () {
    var title = 'abcde';
    var wrapper = shallow(React.createElement(IconSearchJuicy, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});