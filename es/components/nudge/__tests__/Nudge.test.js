function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { shallow } from 'enzyme';
import RelayPlanet140 from '../../../illustration/RelayPlanet140';
import Nudge from '../Nudge';
var defaultProps = {
  buttonText: React.createElement("span", null, "Pellentesque in port"),
  content: React.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis rutrum turpis."),
  illustration: React.createElement(RelayPlanet140, {
    height: 170,
    width: 170
  }),
  isShown: true,
  header: React.createElement("h3", null, "Heading goes here"),
  onButtonClick: jest.fn(),
  onCloseButtonClick: jest.fn()
};

var getWrapper = function getWrapper(props) {
  return shallow(React.createElement(Nudge, _extends({}, defaultProps, props)));
};

describe('components/nudge/Nudge', function () {
  test('should correctly render Nudge', function () {
    var wrapper = getWrapper();
    expect(wrapper.hasClass('bdl-Nudge')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});