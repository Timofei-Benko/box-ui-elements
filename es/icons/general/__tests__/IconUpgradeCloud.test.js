import React from 'react';
import { shallow } from 'enzyme';
import IconUpgradeCloud from '../IconUpgradeCloud';
describe('icons/general/IconUpgradeCloud', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(IconUpgradeCloud, null));
    expect(wrapper.hasClass('icon-upgrade-cloud')).toEqual(true);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(IconUpgradeCloud, {
      color: color
    }));
    expect(wrapper.find('rect').first().prop('fill')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 16;
    var wrapper = shallow(React.createElement(IconUpgradeCloud, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(IconUpgradeCloud, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});