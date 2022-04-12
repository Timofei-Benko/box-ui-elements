import React from 'react';
import { shallow } from 'enzyme';
import IconCollectionItemLink from '../IconCollectionItemLink';
describe('icons/general/IconCollectionItemLink', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(IconCollectionItemLink, props));
  };

  test('should correctly render default icon', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(IconCollectionItemLink, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'task-icon';
    var wrapper = shallow(React.createElement(IconCollectionItemLink, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});