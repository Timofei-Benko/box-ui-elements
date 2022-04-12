import React from 'react';
import { shallow } from 'enzyme';
import withAnnotatorContext from '../withAnnotatorContext';
import { Action } from '../types';
var mockContext = jest.fn();
jest.mock('../AnnotatorContext', function () {
  return {
    Consumer: function Consumer(_ref) {
      var children = _ref.children;
      return children(mockContext());
    }
  };
});
describe('elements/common/annotator-context/withAnnotatorContext', function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // T is supposed to be allowed component props
  var Component = function Component(props) {
    return React.createElement("div", props);
  };

  var WrappedComponent = withAnnotatorContext(Component);

  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(WrappedComponent, props));
  };

  beforeEach(function () {
    return jest.resetAllMocks();
  });
  test('should apply the annotator context to the wrapped component as a prop', function () {
    var annotatorState = {
      annotation: {
        foo: 'bar'
      },
      action: Action.CREATE_START
    };
    var mockEmitAnnotatorChangeEvent = jest.fn();
    var mockEmitRemoveEvent = jest.fn();
    var mockGetAnnotationsMatchPath = jest.fn();
    var mockGetAnnotationsPath = jest.fn();
    mockContext.mockReturnValue({
      state: annotatorState,
      emitActiveChangeEvent: mockEmitAnnotatorChangeEvent,
      emitRemoveEvent: mockEmitRemoveEvent,
      getAnnotationsMatchPath: mockGetAnnotationsMatchPath,
      getAnnotationsPath: mockGetAnnotationsPath
    });
    var wrapper = getWrapper();
    var wrappedComponent = wrapper.dive().find(Component);
    var props = wrappedComponent.props();
    expect(wrappedComponent.exists()).toBeTruthy();
    expect(props.annotatorState).toEqual({
      annotation: {
        foo: 'bar'
      },
      action: Action.CREATE_START
    });
    expect(props.emitAnnotatorActiveChangeEvent).toEqual(mockEmitAnnotatorChangeEvent);
    expect(props.emitRemoveEvent).toEqual(mockEmitRemoveEvent);
    expect(props.getAnnotationsMatchPath).toEqual(mockGetAnnotationsMatchPath);
    expect(props.getAnnotationsPath).toEqual(mockGetAnnotationsPath);
  });
});