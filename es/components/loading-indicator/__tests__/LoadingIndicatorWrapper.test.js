import * as React from 'react';
import { shallow } from 'enzyme';
import LoadingIndicatorWrapper, { LoadingIndicatorWrapperPosition } from '../LoadingIndicatorWrapper';
describe('components/loading-indicator/LoadingIndicatorWrapper', function () {
  test('should render with default properties intact', function () {
    var wrapper = shallow(React.createElement(LoadingIndicatorWrapper, null, React.createElement("div", null)));
    expect(wrapper).toMatchSnapshot();
  });
  test('should render with children in default properties', function () {
    var child = React.createElement("div", null, "child");
    var wrapper = shallow(React.createElement(LoadingIndicatorWrapper, null, child));
    expect(wrapper).toMatchSnapshot();
  });
  test('should render loader properly when specificed', function () {
    var child = React.createElement("div", null, "child");
    var wrapper = shallow(React.createElement(LoadingIndicatorWrapper, {
      isLoading: true
    }, child));
    expect(wrapper).toMatchSnapshot();
  });
  test('should allow custom classnames on wrapper', function () {
    var child = React.createElement("div", null, "child");
    var wrapper = shallow(React.createElement(LoadingIndicatorWrapper, {
      className: "test-name",
      isLoading: true
    }, child));
    expect(wrapper).toMatchSnapshot();
  });
  test('should take in crawler position top', function () {
    var child = React.createElement("div", null, "child");
    var wrapper = shallow(React.createElement(LoadingIndicatorWrapper, {
      className: "test-name",
      crawlerPosition: LoadingIndicatorWrapperPosition.TOP,
      isLoading: true
    }, child));
    expect(wrapper).toMatchSnapshot();
  });
  test('should pass thru any rest properties', function () {
    var wrapper = shallow(React.createElement(LoadingIndicatorWrapper, {
      className: "test-name",
      "data-resin-target": "test",
      isLoading: true
    }, React.createElement("div", null)));
    expect(wrapper).toMatchSnapshot();
  });
  test('should hide content', function () {
    var wrapper = shallow(React.createElement(LoadingIndicatorWrapper, {
      className: "test-name",
      hideContent: true,
      isLoading: true
    }, React.createElement("div", null)));
    expect(wrapper).toMatchSnapshot();
  });
});