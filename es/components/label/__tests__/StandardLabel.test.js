import React from 'react';
import { shallow } from 'enzyme';
import StandardLabel from '../StandardLabel';
var labelContent = ['My Label'];
var tooltipText = 'This is my tooltip';
describe('components/label/StandardLabel', function () {
  test('should correctly render default element', function () {
    var wrapper = shallow(React.createElement(StandardLabel, {
      labelContent: labelContent
    }, React.createElement("input", {
      type: "text"
    })));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render text tooltip when specified', function () {
    var wrapper = shallow(React.createElement(StandardLabel, {
      labelContent: labelContent,
      tooltip: tooltipText
    }, React.createElement("input", {
      type: "text"
    })));
    expect(wrapper.find('Tooltip').length).toBe(1);
    expect(wrapper.find('Tooltip').prop('text')).toEqual(tooltipText);
  });
  test('should not render tooltip when no tooltip specified', function () {
    var wrapper = shallow(React.createElement(StandardLabel, {
      labelContent: labelContent
    }, React.createElement("input", {
      type: "text"
    })));
    expect(wrapper.find('Tooltip').length).toBe(0);
  });
});