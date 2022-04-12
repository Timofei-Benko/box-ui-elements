function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n            fileVersionId | expectedCallCount\n            ", "      | ", "\n            ", "      | ", "\n        "]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n            activeAnnotationId | fileVersionId | location                                    | expectedPath                       | expectedState\n            ", "           | ", "      | ", "                        | ", " | ", "\n            ", "           | ", "  | ", "                        | ", " | ", "\n            ", "            | ", "      | ", "                        | ", "     | ", "\n            ", "            | ", "      | ", " | ", "     | ", "\n            ", "           | ", "      | ", " | ", " | ", "\n        "]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n            pathname                            | isOpen   | current             | expectedCount\n            ", "                              | ", " | ", "             | ", "\n            ", "                       | ", "  | ", "             | ", "\n            ", "                      | ", " | ", "             | ", "\n            ", "                      | ", "  | ", "             | ", "\n            ", "                      | ", " | ", " | ", "\n            ", "                      | ", "  | ", " | ", "\n            ", "       | ", "  | ", " | ", "\n            ", " | ", "  | ", " | ", "\n            ", "                       | ", "  | ", " | ", "\n            ", "                              | ", "  | ", " | ", "\n        "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n            hasItems     | expectedAddCount\n            ", " | ", "\n            ", "        | ", "\n        "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n            fileVersionId | annotationId | expectedPath\n            ", "      | ", "     | ", "\n            ", "      | ", " | ", "\n        "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n            fileVersionId | annotationId | expectedCallCount\n            ", "  | ", "     | ", "\n            ", "      | ", "     | ", "\n            ", "      | ", "     | ", "\n            ", "      | ", " | ", "\n        "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n            fileId   | expectedCount\n            ", " | ", "\n            ", " | ", "\n        "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n            annotation   | expectedCount\n            ", "        | ", "\n            ", " | ", "\n            ", "      | ", "\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            condition                                          | prevActiveAnnotationId | activeAnnotationId | isAnnotationsPath | expectedCount\n            ", "                   | ", "               | ", "           | ", "           | ", "\n            ", "                  | ", "               | ", "           | ", "           | ", "\n            ", "     | ", "               | ", "            | ", "           | ", "\n            ", " | ", "               | ", "            | ", "          | ", "\n            ", "   | ", "                | ", "           | ", "          | ", "\n            ", "       | ", "                | ", "           | ", "           | ", "\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            prevFileVersionId | fileVersionId | expectedCallCount\n            ", "          | ", "      | ", "\n            ", "          | ", "  | ", "\n            ", "          | ", "      | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { shallow } from 'enzyme';
import withSidebarAnnotations from '../withSidebarAnnotations';
describe('elements/content-sidebar/withSidebarAnnotations', function () {
  var TestComponent = function TestComponent(props) {
    return React.createElement("div", props);
  };

  var WrappedComponent = withSidebarAnnotations(TestComponent);
  var annotatorContextProps = {
    getAnnotationsMatchPath: jest.fn(),
    getAnnotationsPath: jest.fn()
  };
  var currentUser = {
    id: 'foo'
  };
  var file = {
    id: 'id',
    file_version: {
      id: '123'
    }
  };
  var feedAPI = {
    addAnnotation: jest.fn(),
    feedItems: jest.fn(),
    getCachedItems: jest.fn(),
    deleteAnnotation: jest.fn()
  };
  var api = {
    getFeedAPI: function getFeedAPI() {
      return feedAPI;
    }
  };

  var defaultProps = _objectSpread({
    api: api
  }, annotatorContextProps, {
    file: file
  });

  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(WrappedComponent, _extends({}, defaultProps, props)));
  };

  describe('constructor', function () {
    test('should call redirectDeeplinkedAnnotation', function () {
      getWrapper();
      expect(annotatorContextProps.getAnnotationsMatchPath).toHaveBeenCalledTimes(1);
    });
  });
  describe('componentDidUpdate', function () {
    test.each(_templateObject(), '122', '122', 0, '122', undefined, 0, '122', '123', 1)('should call updateActiveVersion if fileVersionId changes', function (_ref) {
      var prevFileVersionId = _ref.prevFileVersionId,
          fileVersionId = _ref.fileVersionId,
          expectedCallCount = _ref.expectedCallCount;
      var match = {
        params: {
          fileVersionId: fileVersionId
        }
      };
      var prevMatch = {
        params: {
          fileVersionId: prevFileVersionId
        }
      };
      var wrapper = getWrapper({
        location: 'foo'
      });
      var instance = wrapper.instance();
      instance.updateActiveVersion = jest.fn();
      annotatorContextProps.getAnnotationsMatchPath.mockReturnValueOnce(match).mockReturnValueOnce(prevMatch);
      wrapper.setProps({
        location: 'bar'
      });
      expect(instance.updateActiveVersion).toHaveBeenCalledTimes(expectedCallCount);
    });
    test.each(_templateObject2(), 'annotation ids are the same', '123', '123', true, 0, 'annotation ids are different', '123', '456', true, 1, 'annotation deselected on annotations path', '123', null, true, 1, 'annotation deselected not on annotations path', '123', null, false, 0, 'annotation selected not on annotations path', null, '123', false, 1, 'annotation selected on annotations path', null, '123', true, 1)('should call updateActiveAnnotation $expectedCount times if $condition', function (_ref2) {
      var prevActiveAnnotationId = _ref2.prevActiveAnnotationId,
          activeAnnotationId = _ref2.activeAnnotationId,
          isAnnotationsPath = _ref2.isAnnotationsPath,
          expectedCount = _ref2.expectedCount;
      var wrapper = getWrapper({
        annotatorState: {
          activeAnnotationId: prevActiveAnnotationId
        }
      });
      var instance = wrapper.instance();
      instance.updateActiveAnnotation = jest.fn();
      annotatorContextProps.getAnnotationsMatchPath.mockReturnValue(isAnnotationsPath);
      wrapper.setProps({
        annotatorState: {
          activeAnnotationId: activeAnnotationId
        }
      });
      expect(instance.updateActiveAnnotation).toHaveBeenCalledTimes(expectedCount);
    });
    test.each(_templateObject3(), {}, 1, undefined, 0, null, 0)('should call addAnnotation $expectedCount times if annotation changed to $annotation', function (_ref3) {
      var annotation = _ref3.annotation,
          expectedCount = _ref3.expectedCount;
      var wrapper = getWrapper();
      wrapper.instance().addAnnotation = jest.fn();
      wrapper.setProps({
        annotatorState: {
          annotation: annotation
        }
      });
      expect(wrapper.instance().addAnnotation).toHaveBeenCalledTimes(expectedCount);
    });
    test.each(_templateObject4(), '123', 0, '456', 1)('should call onVersionChange appropriately if file id changes to $fileId', function (_ref4) {
      var fileId = _ref4.fileId,
          expectedCount = _ref4.expectedCount;
      var onVersionChange = jest.fn();
      var wrapper = getWrapper({
        fileId: '123',
        onVersionChange: onVersionChange
      });
      wrapper.setProps({
        fileId: fileId
      });
      expect(onVersionChange).toHaveBeenCalledTimes(expectedCount);
    });
  });
  describe('redirectDeeplinkedAnnotation()', function () {
    var history = {
      replace: jest.fn()
    };
    var getAnnotationsMatchPath = jest.fn();
    var getAnnotationsPath = jest.fn();
    beforeEach(function () {
      jest.resetAllMocks();
    });
    test.each(_templateObject5(), undefined, '987', 0, '123', '987', 0, '124', '987', 1, '124', undefined, 1)('should call history.replace appropriately if router location annotationId=$annotationId and fileVersionId=$fileVersionId', function (_ref5) {
      var annotationId = _ref5.annotationId,
          fileVersionId = _ref5.fileVersionId,
          expectedCallCount = _ref5.expectedCallCount;
      var wrapper = getWrapper({
        file: file,
        getAnnotationsMatchPath: getAnnotationsMatchPath,
        getAnnotationsPath: getAnnotationsPath,
        history: history
      });
      var instance = wrapper.instance();
      getAnnotationsMatchPath.mockReturnValue({
        params: {
          annotationId: annotationId,
          fileVersionId: fileVersionId
        }
      });
      instance.redirectDeeplinkedAnnotation();
      expect(history.replace).toHaveBeenCalledTimes(expectedCallCount);
    });
    test.each(_templateObject6(), '124', '987', '/activity/annotations/123/987', '124', undefined, '/activity/annotations/123')('should call history.replace with $expectedPath', function (_ref6) {
      var fileVersionId = _ref6.fileVersionId,
          annotationId = _ref6.annotationId,
          expectedPath = _ref6.expectedPath;
      var wrapper = getWrapper({
        file: file,
        getAnnotationsMatchPath: getAnnotationsMatchPath,
        getAnnotationsPath: getAnnotationsPath,
        history: history
      });
      var instance = wrapper.instance();
      getAnnotationsMatchPath.mockReturnValue({
        params: {
          annotationId: annotationId,
          fileVersionId: fileVersionId
        }
      });
      getAnnotationsPath.mockReturnValue(expectedPath);
      instance.redirectDeeplinkedAnnotation();
      expect(history.replace).toHaveBeenCalledWith(expectedPath);
    });
  });
  describe('addAnnotation()', function () {
    var sidebarPanelsRef = {
      refresh: jest.fn()
    };
    beforeEach(function () {
      annotatorContextProps.getAnnotationsMatchPath.mockReturnValueOnce({
        params: {
          fileVersionId: '123'
        }
      });
    });
    test('should throw if no user', function () {
      var instance = getWrapper({
        annotatorState: {
          meta: {
            requestId: '123'
          }
        }
      }).instance();
      expect(function () {
        return instance.addAnnotation();
      }).toThrow('Bad box user!');
    });
    test('should do nothing if meta or requestId is not present', function () {
      var instance = getWrapper().instance();
      instance.addAnnotation(); // Only call to getAnnotationsMatchPath comes in the constructor, the one in addAnnotation should not occur

      expect(annotatorContextProps.getAnnotationsMatchPath).toHaveBeenCalledTimes(1);
    });
    test.each(_templateObject7(), undefined, 0, [], 1)('should add the annotation to the feed cache accordingly if the cache items is $hasItems', function (_ref7) {
      var hasItems = _ref7.hasItems,
          expectedAddCount = _ref7.expectedAddCount;
      var annotatorStateMock = {
        meta: {
          requestId: '123'
        }
      };
      var wrapper = getWrapper({
        annotatorState: annotatorStateMock,
        currentUser: currentUser
      });
      var instance = wrapper.instance();
      feedAPI.getCachedItems.mockReturnValueOnce({
        items: hasItems
      });
      instance.addAnnotation();
      expect(feedAPI.addAnnotation).toHaveBeenCalledTimes(expectedAddCount);
    });
    test.each(_templateObject8(), '/', false, null, 0, '/details', true, null, 0, '/activity', false, null, 0, '/activity', true, null, 0, '/activity', false, sidebarPanelsRef, 0, '/activity', true, sidebarPanelsRef, 1, '/activity/versions/12345', true, sidebarPanelsRef, 1, '/activity/versions/12345/67890', true, sidebarPanelsRef, 1, '/details', true, sidebarPanelsRef, 0, '/', true, sidebarPanelsRef, 0)('should refresh the sidebarPanels ref accordingly if pathname=$pathname, isOpen=$isOpen, current=$current', function (_ref8) {
      var current = _ref8.current,
          expectedCount = _ref8.expectedCount,
          isOpen = _ref8.isOpen,
          pathname = _ref8.pathname;
      var annotatorStateMock = {
        meta: {
          requestId: '123'
        }
      };
      var wrapper = getWrapper({
        annotatorState: annotatorStateMock,
        currentUser: currentUser,
        isOpen: isOpen,
        location: {
          pathname: pathname
        }
      });
      var instance = wrapper.instance();
      instance.sidebarPanels = {
        current: current
      };
      instance.addAnnotation();
      expect(sidebarPanelsRef.refresh).toHaveBeenCalledTimes(expectedCount);
    });
  });
  describe('updateActiveAnnotation()', function () {
    test.each(_templateObject9(), '234', '456', {
      pathname: '/'
    }, '/activity/annotations/456/234', {
      open: true
    }, '234', undefined, {
      pathname: '/'
    }, '/activity/annotations/123/234', {
      open: true
    }, null, '456', {
      pathname: '/'
    }, '/activity/annotations/456', undefined, null, '456', {
      pathname: '/',
      state: {
        foo: 'bar'
      }
    }, '/activity/annotations/456', {
      foo: 'bar'
    }, '234', '456', {
      pathname: '/',
      state: {
        foo: 'bar'
      }
    }, '/activity/annotations/456/234', {
      open: true
    })('should set location path based on match param fileVersionId=$fileVersionId and activeAnnotationId=$activeAnnotationId', function (_ref9) {
      var activeAnnotationId = _ref9.activeAnnotationId,
          fileVersionId = _ref9.fileVersionId,
          location = _ref9.location,
          expectedPath = _ref9.expectedPath,
          expectedState = _ref9.expectedState;
      annotatorContextProps.getAnnotationsMatchPath.mockReturnValue({
        params: {
          fileVersionId: fileVersionId
        }
      });
      annotatorContextProps.getAnnotationsPath.mockReturnValue(expectedPath);
      var annotatorState = {
        activeAnnotationId: activeAnnotationId
      };
      var history = {
        push: jest.fn(),
        replace: jest.fn()
      };
      var wrapper = getWrapper({
        annotatorState: annotatorState,
        history: history,
        location: location
      });
      var instance = wrapper.instance();
      instance.updateActiveAnnotation();
      expect(history.push).toHaveBeenCalledWith({
        pathname: expectedPath,
        state: expectedState
      });
    });
    test('should use the provided fileVersionId in the annotatorState if provided', function () {
      var annotatorState = {
        activeAnnotationFileVersionId: '456',
        activeAnnotationId: '123'
      };
      var history = {
        push: jest.fn(),
        replace: jest.fn()
      };
      var wrapper = getWrapper({
        annotatorState: annotatorState,
        history: history,
        location: {
          pathname: '/'
        }
      });
      var instance = wrapper.instance();
      instance.updateActiveAnnotation();
      expect(annotatorContextProps.getAnnotationsPath).toHaveBeenCalledWith('456', '123');
    });
    test('should fall back to the fileVersionId in the file if none other is provided', function () {
      var history = {
        push: jest.fn(),
        replace: jest.fn()
      };
      var wrapper = getWrapper({
        history: history,
        location: {
          pathname: '/'
        }
      });
      var instance = wrapper.instance();
      instance.updateActiveAnnotation();
      expect(annotatorContextProps.getAnnotationsPath).toHaveBeenCalledWith('123', undefined);
    });
  });
  describe('updateActiveVersion()', function () {
    var onVersionChange = jest.fn();
    var version = {
      type: 'file_version',
      id: '124'
    };
    beforeEach(function () {
      annotatorContextProps.getAnnotationsMatchPath.mockReturnValueOnce({
        params: {
          fileVersionId: '123'
        }
      });
    });
    test.each(_templateObject10(), '123', 0, '124', 1)('should onVersionChange $expectedCallCount times based on fileVersionId $fileVersionId', function (_ref10) {
      var fileVersionId = _ref10.fileVersionId,
          expectedCallCount = _ref10.expectedCallCount;
      var match = {
        params: {
          fileVersionId: fileVersionId
        }
      };
      var wrapper = getWrapper({
        file: file,
        onVersionChange: onVersionChange
      });
      var instance = wrapper.instance();
      annotatorContextProps.getAnnotationsMatchPath.mockReturnValueOnce(match);
      feedAPI.getCachedItems.mockReturnValueOnce({
        items: [version]
      });
      instance.updateActiveVersion();
      expect(onVersionChange).toHaveBeenCalledTimes(expectedCallCount);
    });
  });
});