import React from 'react';
import { shallow } from 'enzyme';
import IconCloud from '../IconCloud';
describe('icons/general/IconCloud', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconCloud, null));
    expect(wrapper.hasClass('icon-cloud')).toEqual(true);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconCloud, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconCloud, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
  test('should correctly render icon with filter applied', function () {
    var title = 'pity';
    var filter = {
      id: 'test',
      definition: React.createElement("div", null)
    };
    var wrapper = shallow(React.createElement(IconCloud, {
      filter: filter,
      title: title
    }));
    expect(wrapper).toMatchSnapshot();
  });
});