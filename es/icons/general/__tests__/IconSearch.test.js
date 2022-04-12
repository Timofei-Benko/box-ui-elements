import * as React from 'react';
import { shallow } from 'enzyme';
import IconSearch from '../IconSearch';
import { bdlGray40 } from '../../../styles/variables';
describe('icons/general/IconSearch', function () {
  test('should correctly render default icon with default color', function () {
    var dimension = 14;
    var wrapper = shallow(React.createElement(IconSearch, null));
    expect(wrapper.hasClass('icon-search')).toEqual(true);
    expect(wrapper.find('path').prop('fill')).toEqual(bdlGray40);
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(dimension);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(dimension);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#fcfcfc';
    var wrapper = shallow(React.createElement(IconSearch, {
      color: color
    }));
    expect(wrapper.find('path').prop('fill')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var dimension = 16;
    var wrapper = shallow(React.createElement(IconSearch, {
      height: dimension,
      width: dimension
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(dimension);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(dimension);
  });
  test('should correctly render icon with title', function () {
    var title = 'abcde';
    var wrapper = shallow(React.createElement(IconSearch, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});