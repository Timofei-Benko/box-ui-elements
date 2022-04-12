function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { shallow, mount } from 'enzyme';
import InfoIconWithTooltip from '../InfoIconWithTooltip';
import Label from '../Label';
var text = 'My Label';
describe('components/label/Label', function () {
  var defaultProps = {
    children: React.createElement("input", {
      type: "text"
    }),
    text: 'My Label'
  }; // eslint-disable-next-line @typescript-eslint/no-explicit-any

  var getMountedWrapper = function getMountedWrapper(props) {
    return mount(React.createElement(Label, _extends({}, defaultProps, props)));
  };

  test('should correctly render default element', function () {
    var wrapper = shallow(React.createElement(Label, {
      text: text
    }, React.createElement("input", {
      type: "text"
    })));
    expect(wrapper).toMatchSnapshot();
  });
  test('should render the hidden label when hideLabel is set', function () {
    var wrapper = shallow(React.createElement(Label, {
      hideLabel: true,
      text: text
    }, React.createElement("input", {
      type: "text"
    })));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render optional text when specified', function () {
    var wrapper = mount(React.createElement(Label, {
      showOptionalText: true,
      text: text
    }, React.createElement("input", {
      type: "text"
    })));
    expect(wrapper.find('.label-optional').length).toEqual(1); // Make sure text 'optional' appears in parentheses like '(optional)'

    expect(/.*\(.*\).*/.test(wrapper.find('.label-optional').html())).toEqual(true);
  });
  describe('with infoToolTip', function () {
    test('should get the given iconProps', function () {
      var infoIconProps = {
        a: 'a',
        b: 'b'
      };
      var wrapper = getMountedWrapper({
        infoTooltip: 'Test tooltip',
        infoIconProps: infoIconProps
      });
      expect(wrapper.find(InfoIconWithTooltip).prop('iconProps')).toEqual(expect.objectContaining(infoIconProps));
    });
    test('should get the tooltip text', function () {
      var wrapper = getMountedWrapper({
        infoTooltip: 'Test tooltip'
      });
      expect(wrapper.find(InfoIconWithTooltip).prop('tooltipText')).toEqual('Test tooltip');
    });
  });
});