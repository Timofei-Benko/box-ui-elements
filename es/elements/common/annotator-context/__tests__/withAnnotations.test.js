function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n            fileVersionId | annotationId | expectedPath\n            ", "  | ", " | ", "\n            ", "  | ", "      | ", "\n            ", "      | ", " | ", "\n            ", "      | ", "      | ", "\n            ", "      | ", "     | ", "\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            annotationId | fileVersionId | expectedAnnotationId | expectedFileVersionId\n            ", "      | ", "      | ", "              | ", "\n            ", "     | ", "      | ", "             | ", "\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            status            | annotation        | error        | expectedAction         | expectedAnnotation | expectedError\n            ", " | ", " | ", " | ", " | ", "  | ", "\n            ", " | ", " | ", " | ", "   | ", "  | ", "\n            ", "   | ", " | ", " | ", "   | ", "  | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { shallow } from 'enzyme';
import { createMemoryHistory } from 'history';
import { Action, AnnotatorContext, withAnnotations, Status } from '../index';
describe('elements/common/annotator-context/withAnnotations', function () {
  var defaults = {
    className: 'foo',
    onAnnotator: jest.fn(),
    onError: jest.fn(),
    onPreviewDestroy: jest.fn()
  };

  var MockComponent = function MockComponent(props) {
    return React.createElement("div", props);
  };

  var WrappedComponent = withAnnotations(MockComponent);

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(WrappedComponent, _extends({}, defaults, props)));
  };

  var getContextProvider = function getContextProvider(wrapper) {
    return wrapper.find(AnnotatorContext.Provider);
  };

  var mockAnnotator = {};
  beforeEach(function () {
    mockAnnotator = {
      addListener: jest.fn(),
      emit: jest.fn(),
      removeAllListeners: jest.fn(),
      removeListener: jest.fn()
    };
  });
  describe('constructor', function () {
    test('should parse the history location pathname to initialize state with activeAnnotationId', function () {
      var history = createMemoryHistory({
        initialEntries: ['/activity/annotations/123/456']
      });
      var wrapper = getWrapper({
        history: history,
        location: history.location
      });
      expect(wrapper.state('activeAnnotationId')).toBe('456');
    });
    test('should not initialize state with activeAnnotationId if history path does not match deeplink schema', function () {
      var history = createMemoryHistory({
        initialEntries: ['/activity/annotations/456']
      });
      var wrapper = getWrapper({
        history: history,
        location: history.location
      });
      expect(wrapper.state('activeAnnotationId')).toBe(null);
    });
  });
  test('should pass onAnnotator and onPreviewDestroy as props on the wrapped component', function () {
    var wrapper = getWrapper();
    var wrappedComponent = wrapper.find(MockComponent);
    expect(wrappedComponent.exists()).toBeTruthy();
    expect(wrappedComponent.props().onAnnotator).toBeTruthy();
    expect(wrappedComponent.props().onPreviewDestroy).toBeTruthy();
  });
  test('should pass the context on to the AnnotatorContext.Provider', function () {
    var wrapper = getWrapper();
    var instance = wrapper.instance();
    var contextProvider = getContextProvider(wrapper);
    expect(contextProvider.exists()).toBeTruthy();
    expect(contextProvider.prop('value').emitActiveChangeEvent).toEqual(instance.emitActiveChangeEvent);
    expect(contextProvider.prop('value').emitRemoveEvent).toEqual(instance.emitRemoveEvent);
    expect(contextProvider.prop('value').getAnnotationsMatchPath).toEqual(instance.getMatchPath);
    expect(contextProvider.prop('value').getAnnotationsPath).toEqual(instance.getAnnotationsPath);
    expect(contextProvider.prop('value').state).toEqual({
      action: null,
      activeAnnotationFileVersionId: null,
      activeAnnotationId: null,
      annotation: null,
      error: null,
      meta: null
    });
  });
  describe('emitActiveChangeEvent', function () {
    test('should call annotator emit on action', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance(); // Set the annotator on the withAnnotations instance

      instance.handleAnnotator(mockAnnotator);
      instance.emitActiveChangeEvent('123');
      expect(mockAnnotator.emit).toBeCalled();
      expect(mockAnnotator.emit).toBeCalledWith('annotations_active_set', '123');
    });
  });
  describe('emitRemoveEvent', function () {
    test('should call annotator on delete with a delete event', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.handleAnnotator(mockAnnotator);
      instance.emitRemoveEvent('123');
      expect(mockAnnotator.emit).toBeCalledWith('annotations_remove', '123');
    });
  });
  describe('handleAnnotationCreate()', function () {
    var mockAnnotation = {
      foo: 'bar'
    };
    var mockError = new Error('boo');
    test.each(_templateObject(), Status.PENDING, mockAnnotation, undefined, Action.CREATE_START, mockAnnotation, null, Status.SUCCESS, mockAnnotation, undefined, Action.CREATE_END, mockAnnotation, null, Status.ERROR, mockAnnotation, mockError, Action.CREATE_END, mockAnnotation, mockError)('should update the context provider value if $status status received', function (_ref) {
      var status = _ref.status,
          annotation = _ref.annotation,
          error = _ref.error,
          expectedAction = _ref.expectedAction,
          expectedAnnotation = _ref.expectedAnnotation,
          expectedError = _ref.expectedError;
      var wrapper = getWrapper();
      var eventData = {
        annotation: annotation,
        meta: {
          status: status,
          requestId: '123'
        },
        error: error
      };
      wrapper.instance().handleAnnotationCreate(eventData);
      var contextProvider = getContextProvider(wrapper);
      expect(contextProvider.exists()).toBeTruthy();
      expect(contextProvider.prop('value').state).toEqual({
        action: expectedAction,
        activeAnnotationFileVersionId: null,
        activeAnnotationId: null,
        annotation: expectedAnnotation,
        error: expectedError,
        meta: {
          status: status,
          requestId: '123'
        }
      });
    });
    test('should invoke the onError prop if provided', function () {
      var onError = jest.fn();
      var wrapper = getWrapper({
        onError: onError
      });
      wrapper.instance().handleAnnotationCreate({
        error: mockError,
        meta: {
          requestId: '123',
          status: Status.ERROR
        }
      });
      expect(onError).toHaveBeenCalledWith(mockError, 'create_annotation_error', {
        showNotification: true
      });
    });
  });
  describe('handleActiveChange()', function () {
    test.each(_templateObject2(), null, '456', null, '456', '123', '456', '123', '456')('should update activeAnnotationId state to reflect value $annotationId', function (_ref2) {
      var annotationId = _ref2.annotationId,
          fileVersionId = _ref2.fileVersionId,
          expectedAnnotationId = _ref2.expectedAnnotationId,
          expectedFileVersionId = _ref2.expectedFileVersionId;
      var wrapper = getWrapper();
      wrapper.instance().handleActiveChange({
        annotationId: annotationId,
        fileVersionId: fileVersionId
      });
      var contextProvider = getContextProvider(wrapper);
      var _contextProvider$prop = contextProvider.prop('value').state,
          activeAnnotationFileVersionId = _contextProvider$prop.activeAnnotationFileVersionId,
          activeAnnotationId = _contextProvider$prop.activeAnnotationId;
      expect(contextProvider.exists()).toBeTruthy();
      expect(activeAnnotationFileVersionId).toEqual(expectedFileVersionId);
      expect(activeAnnotationId).toEqual(expectedAnnotationId);
    });
  });
  describe('handleAnnotationFetchError()', function () {
    test('should call onError', function () {
      var instance = getWrapper().instance();
      var mockError = new Error();
      instance.handleAnnotationFetchError({
        error: mockError
      });
      expect(defaults.onError).toHaveBeenCalledWith(mockError, 'fetch_annotations_error', {
        showNotification: true
      });
    });
  });
  describe('handlePreviewDestroy()', function () {
    test('should reset state and annotator', function () {
      var wrapper = getWrapper();
      wrapper.instance().handleAnnotator(mockAnnotator);
      wrapper.setState({
        activeAnnotationId: '123',
        activeAnnotationFileVersionId: '456'
      });
      wrapper.instance().handlePreviewDestroy();
      expect(wrapper.state()).toEqual({
        action: null,
        activeAnnotationFileVersionId: null,
        activeAnnotationId: null,
        annotation: null,
        error: null,
        meta: null
      });
    });
    test('should not reset state if called with false', function () {
      var wrapper = getWrapper();
      wrapper.instance().handleAnnotator(mockAnnotator);
      wrapper.setState({
        activeAnnotationId: '123',
        activeAnnotationFileVersionId: '456'
      });
      wrapper.instance().handlePreviewDestroy(false);
      expect(wrapper.state('activeAnnotationId')).toBe('123');
      expect(wrapper.state('activeAnnotationFileVersionId')).toBe('456');
    });
    test.each([true, false])('should remove all annotator event listeners', function (shouldReset) {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.handleAnnotator(mockAnnotator);
      instance.handlePreviewDestroy(shouldReset);
      expect(mockAnnotator.removeListener).toBeCalledWith('annotations_active_change', instance.handleActiveChange);
      expect(mockAnnotator.removeListener).toBeCalledWith('annotations_create', instance.handleAnnotationCreate);
      expect(mockAnnotator.removeListener).toBeCalledWith('annotations_fetch_error', instance.handleAnnotationFetchError);
    });
  });
  describe('getAnnotationsPath()', function () {
    test.each(_templateObject3(), undefined, undefined, '/activity', undefined, null, '/activity', '123', undefined, '/activity/annotations/123', '123', null, '/activity/annotations/123', '123', '456', '/activity/annotations/123/456')('should return $expectedPath', function (_ref3) {
      var fileVersionId = _ref3.fileVersionId,
          annotationId = _ref3.annotationId,
          expectedPath = _ref3.expectedPath;
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      expect(instance.getAnnotationsPath(fileVersionId, annotationId)).toBe(expectedPath);
    });
  });
});