import React from 'react';
import { shallow } from 'enzyme';
import ErrorBoundary from '../ErrorBoundary';
import { ERROR_CODE_UNEXPECTED_EXCEPTION } from '../../../../constants';
describe('elements/ErrorBoundary', function () {
  var WrappedComponent = function WrappedComponent() {
    return React.createElement("div", null, "Test");
  };

  var wrappedError = new Error('ERROR');

  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(ErrorBoundary, props, React.createElement(WrappedComponent, null)));
  };

  var simulateError = function simulateError(wrapper) {
    wrapper.find(WrappedComponent).simulateError(wrappedError);
  };

  describe('render()', function () {
    test('should render the wrapped component when no error is thrown', function () {
      var wrapper = getWrapper();
      expect(wrapper).toMatchSnapshot();
    });
    test('should render default error component an error is thrown', function () {
      var wrapper = getWrapper();
      simulateError(wrapper);
      expect(wrapper.find('DefaultError').exists()).toBe(true);
    });
    test('should render the component specified when an error is thrown', function () {
      var ErrorComponent = function ErrorComponent() {
        return React.createElement("div", null, "Error");
      };

      var wrapper = getWrapper({
        errorComponent: ErrorComponent
      });
      simulateError(wrapper);
      expect(wrapper.find(ErrorComponent).exists()).toBe(true);
    });
  });
  describe('componentDidCatch()', function () {
    var origin = 'some_component';
    test('should set the error state and call the onError callback', function () {
      var onError = jest.fn();
      var wrapper = getWrapper({
        onError: onError,
        errorOrigin: origin
      });
      simulateError(wrapper);
      expect(onError).toHaveBeenCalledWith({
        type: 'error',
        code: ERROR_CODE_UNEXPECTED_EXCEPTION,
        message: wrappedError.message,
        origin: origin,
        context_info: expect.objectContaining({
          isErrorDisplayed: true
        })
      });
    });
  });
});