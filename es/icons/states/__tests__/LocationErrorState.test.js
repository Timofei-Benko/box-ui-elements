import React from 'react';
import { shallow } from 'enzyme';
import LocationErrorState from '../LocationErrorState';
describe('icons/states/LocationErrorState', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(LocationErrorState, null));
    expect(wrapper.hasClass('bdl-LocationErrorState')).toBeTruthy();
  });
  test('should correctly render the icon with specified class', function () {
    var className = 'my-state';
    var wrapper = shallow(React.createElement(LocationErrorState, {
      className: className
    }));
    expect(wrapper.hasClass(className)).toBeTruthy();
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 20;
    var height = 15;
    var wrapper = shallow(React.createElement(LocationErrorState, {
      height: height,
      width: width
    }));
    expect(wrapper.prop('width')).toEqual(width);
    expect(wrapper.prop('height')).toEqual(height);
  });
  test('should correctly render svg with specified title', function () {
    var title = 'oh what ever';
    var wrapper = shallow(React.createElement(LocationErrorState, {
      title: title
    }));
    expect(wrapper.prop('title')).toEqual(title);
  });
  test('should override color in svg when specified', function () {
    var color = '#bdf';
    var wrapper = shallow(React.createElement(LocationErrorState, {
      color: color
    }));
    expect(wrapper).toMatchSnapshot();
  });
});