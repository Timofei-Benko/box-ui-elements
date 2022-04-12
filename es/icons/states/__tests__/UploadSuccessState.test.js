import React from 'react';
import { shallow } from 'enzyme';
import UploadSuccessState from '../UploadSuccessState';
import { bdlBoxBlue } from '../../../styles/variables';
describe('icons/states/UploadSuccesstState', function () {
  test('should correctly render default icon', function () {
    var wrapper = shallow(React.createElement(UploadSuccessState, null));
    expect(wrapper.hasClass('upload-success-state')).toEqual(true);
    expect(wrapper.find('rect').at(0).prop('fill')).toEqual(bdlBoxBlue);
    expect(wrapper.find('rect').at(1).prop('fill')).toEqual(bdlBoxBlue);
    expect(wrapper.find('rect').at(2).prop('fill')).toEqual(bdlBoxBlue);
    expect(wrapper.find('path').prop('fill')).toEqual(bdlBoxBlue);
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(50);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(49);
  });
  test('should correctly render icon with specified color', function () {
    var color = '#ffffff';
    var wrapper = shallow(React.createElement(UploadSuccessState, {
      color: color
    }));
    expect(wrapper.find('rect').at(0).prop('fill')).toEqual(color);
    expect(wrapper.find('rect').at(1).prop('fill')).toEqual(color);
    expect(wrapper.find('rect').at(2).prop('fill')).toEqual(color);
    expect(wrapper.find('path').prop('fill')).toEqual(color);
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(UploadSuccessState, {
      height: height,
      width: width
    }));
    expect(wrapper.find('AccessibleSVG').prop('width')).toEqual(width);
    expect(wrapper.find('AccessibleSVG').prop('height')).toEqual(height);
  });
  test('should correctly render icon with title', function () {
    var title = 'fool';
    var wrapper = shallow(React.createElement(UploadSuccessState, {
      title: title
    }));
    expect(wrapper.find('AccessibleSVG').prop('title')).toEqual(title);
  });
});