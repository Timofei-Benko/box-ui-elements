function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { shallow } from 'enzyme';
import LabelPrimitive from '../LabelPrimitive';
var labelContent = ['My Label'];
describe('components/label/LabelPrimitive', function () {
  test('should correctly render default element', function () {
    var wrapper = shallow(React.createElement(LabelPrimitive, {
      labelContent: labelContent
    }, React.createElement("input", {
      type: "text"
    })));
    expect(wrapper.find('label').length).toEqual(1);
    expect(wrapper.find('span.label').length).toEqual(1);
    expect(wrapper.find('.label').prop('children')).toEqual(labelContent);
    expect(wrapper.find('input').length).toEqual(1);
    expect(wrapper.find('.label-optional').length).toEqual(0);
  });
  test('should set the passed classNames', function () {
    var className = 'this is a test';
    var wrapper = shallow(React.createElement(LabelPrimitive, {
      className: className,
      labelContent: labelContent
    }, React.createElement("input", {
      type: "text"
    })));
    expect(wrapper.find('.label').prop('className')).toEqual('label bdl-Label this is a test');
  });
  test('should fire passed mouse enter handler', function () {
    var firedCount = 0;
    var rest = {
      onMouseEnter: function onMouseEnter() {
        firedCount += 1;
      }
    };
    var wrapper = shallow(React.createElement(LabelPrimitive, _extends({
      labelContent: labelContent
    }, rest), React.createElement("input", {
      type: "text"
    })));
    var label = wrapper.find('.label');
    label.simulate('mouseEnter');
    expect(firedCount).toEqual(1);
  });
  test('should fire passed mouse leave handler', function () {
    var firedCount = 0;
    var rest = {
      onMouseLeave: function onMouseLeave() {
        firedCount += 1;
      }
    };
    var wrapper = shallow(React.createElement(LabelPrimitive, _extends({
      labelContent: labelContent
    }, rest), React.createElement("input", {
      type: "text"
    })));
    var label = wrapper.find('.label');
    label.simulate('mouseLeave');
    expect(firedCount).toEqual(1);
  });
});