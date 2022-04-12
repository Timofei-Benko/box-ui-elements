import React from 'react';
import { shallow } from 'enzyme';
import { bdlBoxBlue } from '../../../styles/variables';
import UploadFilePaywallState from '../UploadFilePaywallState';
describe('icons/states/UploadFilePaywallState', function () {
  test('should correctly render default svg', function () {
    var wrapper = shallow(React.createElement(UploadFilePaywallState, null));
    expect(wrapper.is('AccessibleSVG')).toBe(true);
    expect(wrapper.hasClass('upload-file-paywall-state')).toBe(true);
    expect(wrapper.prop('height')).toEqual(129);
    expect(wrapper.prop('width')).toEqual(133);
    expect(wrapper.find('path').at(0).prop('fill')).toEqual(bdlBoxBlue);
  });
  test('should correctly render svg with specified class', function () {
    var className = 'my-state';
    var wrapper = shallow(React.createElement(UploadFilePaywallState, {
      className: className
    }));
    expect(wrapper.hasClass(className)).toBe(true);
  });
  test('should correctly render svg with specified color', function () {
    var color = '#123456';
    var wrapper = shallow(React.createElement(UploadFilePaywallState, {
      color: color
    }));
    expect(wrapper.find('path').at(0).prop('fill')).toEqual(color);
  });
  test('should correctly render svg with specified width and height', function () {
    var width = 17;
    var height = 21;
    var wrapper = shallow(React.createElement(UploadFilePaywallState, {
      height: height,
      width: width
    }));
    expect(wrapper.prop('height')).toEqual(height);
    expect(wrapper.prop('width')).toEqual(width);
  });
  test('should correctly render svg with specified title', function () {
    var title = 'oh hi there';
    var wrapper = shallow(React.createElement(UploadFilePaywallState, {
      title: title
    }));
    expect(wrapper.prop('title')).toEqual(title);
  });
});