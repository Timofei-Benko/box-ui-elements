import React from 'react';
import { shallow } from 'enzyme';
import { bdlGray40 } from '../../../styles/variables';
import IconDoubleArrows from '../IconDoubleArrows';
describe('icons/general/IconDoubleArrows', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconDoubleArrows, null));
    expect(wrapper.hasClass('icon-double-arrows')).toEqual(true);
  });
  test('should correctly render default icon with default color', function () {
    var wrapper = shallow(React.createElement(IconDoubleArrows, null));
    expect(wrapper.find('path').prop('fill')).toEqual(bdlGray40);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#bfbfbf';
    var wrapper = shallow(React.createElement(IconDoubleArrows, {
      color: color
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 50;
    var height = 50;
    var wrapper = shallow(React.createElement(IconDoubleArrows, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'whazzah';
    var wrapper = shallow(React.createElement(IconDoubleArrows, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});