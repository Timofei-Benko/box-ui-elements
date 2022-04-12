import * as React from 'react';
import { shallow } from 'enzyme';
import SandboxesInterstitialState from '../SandboxesInterstitialState';
describe('icons/states/SandboxesInterstitialState', function () {
  test('should correctly render default icon with default colors', function () {
    var wrapper = shallow(React.createElement(SandboxesInterstitialState, null));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified color', function () {
    var wrapper = shallow(React.createElement(SandboxesInterstitialState, {
      primaryColor: "#fcfcfc",
      secondaryColor: "#eee"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified width and height and default viewBox value', function () {
    var wrapper = shallow(React.createElement(SandboxesInterstitialState, {
      height: 200,
      width: 200
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with title', function () {
    var wrapper = shallow(React.createElement(SandboxesInterstitialState, {
      title: "abcde"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with custom class name', function () {
    var wrapper = shallow(React.createElement(SandboxesInterstitialState, {
      className: "interstitial"
    }));
    expect(wrapper).toMatchSnapshot();
  });
});