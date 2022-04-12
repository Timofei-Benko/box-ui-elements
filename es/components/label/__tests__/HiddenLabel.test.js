import React from 'react';
import { shallow } from 'enzyme';
import HiddenLabel from '../HiddenLabel';
var labelContent = ['My Label'];
var expectedClassName = 'accessibility-hidden';
describe('components/label/HiddenLabel', function () {
  test('should correctly render default element', function () {
    var wrapper = shallow(React.createElement(HiddenLabel, {
      labelContent: labelContent
    }, React.createElement("input", {
      type: "text"
    })));
    expect(wrapper.find('LabelPrimitive').length).toEqual(1);
    expect(wrapper.find('LabelPrimitive').prop('labelContent')).toEqual(labelContent);
  });
  test('should set the className on LabelPrimitive that hides the label text', function () {
    var wrapper = shallow(React.createElement(HiddenLabel, {
      labelContent: labelContent
    }, React.createElement("input", {
      type: "text"
    })));
    expect(wrapper.find('LabelPrimitive').prop('className')).toEqual(expectedClassName);
  });
});