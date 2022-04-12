import React from 'react';
import { shallow } from 'enzyme';
import ErrorMask from '../../../components/error-mask/ErrorMask';
import InlineError from '../../../components/inline-error/InlineError';
import withErrorHandling from '../withErrorHandling';
describe('elements/withErrorHandling', function () {
  var WrappedComponent = function WrappedComponent() {
    return React.createElement("div", null);
  };

  var WithErrorHandlingComponent = withErrorHandling(WrappedComponent);

  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(WithErrorHandlingComponent, props));
  };

  var fakeMessage = {
    id: 'foo',
    description: 'bar',
    defaultMessage: 'baz'
  };
  test('should render a ErrorMask', function () {
    var props = {
      maskError: {
        errorHeader: fakeMessage
      }
    };
    var wrapper = getWrapper(props);
    expect(wrapper.find(ErrorMask)).toHaveLength(1);
    expect(wrapper.find(WrappedComponent).exists()).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render a ErrorMask with sub header', function () {
    var props = {
      maskError: {
        errorHeader: fakeMessage,
        errorSubHeader: fakeMessage
      }
    };
    var wrapper = getWrapper(props);
    expect(wrapper.find(ErrorMask)).toHaveLength(1);
    expect(wrapper.find(WrappedComponent).exists()).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render an ErrorMask if both maskError and inlineError props passed', function () {
    var props = {
      maskError: {
        errorHeader: fakeMessage
      },
      inlineError: {
        title: fakeMessage,
        content: fakeMessage
      }
    };
    var wrapper = getWrapper(props);
    expect(wrapper.find(ErrorMask)).toHaveLength(1);
    expect(wrapper.find(InlineError).exists()).toBe(false);
    expect(wrapper.find(WrappedComponent).exists()).toBe(false);
  });
  test('should render an InlineError, along with the wrapped component', function () {
    var props = {
      inlineError: {
        title: fakeMessage,
        content: fakeMessage
      }
    };
    var wrapper = getWrapper(props);
    expect(wrapper.find(ErrorMask).exists()).toBe(false);
    expect(wrapper.find(InlineError)).toHaveLength(1);
    expect(wrapper.find(WrappedComponent)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render the wrapped component', function () {
    var props = {};
    var wrapper = getWrapper(props);
    expect(wrapper.find(ErrorMask).exists()).toBe(false);
    expect(wrapper.find(InlineError).exists()).toBe(false);
    expect(wrapper.find(WrappedComponent)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
});