function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            annotationFileVersionId | selectedVersionId | locationType | setStateCount\n            ", "                | ", "          | ", "    | ", "\n            ", "                | ", "          | ", "    | ", "\n            ", "                | ", "          | ", "        | ", "\n            ", "            | ", "          | ", "    | ", "\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            called   | showAnnotationsControls\n            ", "  | ", "\n            ", " | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import noop from 'lodash/noop';
import { shallow } from 'enzyme';
import * as TokenService from '../../../utils/TokenService';
import PreviewMask from '../PreviewMask';
import SidebarUtils from '../../content-sidebar/SidebarUtils';
import { ContentPreviewComponent as ContentPreview } from '../ContentPreview';
import { PREVIEW_FIELDS_TO_FETCH } from '../../../utils/fields';
jest.mock('../../common/Internationalize', function () {
  return 'mock-internationalize';
});
describe('elements/content-preview/ContentPreview', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(ContentPreview, _extends({
      logger: {
        onReadyMetric: jest.fn(),
        onPreviewMetric: jest.fn()
      }
    }, props)));
  };

  var PERFORMANCE_TIME = 100;
  var props;
  var file;
  beforeEach(function () {
    global.Box = {};

    global.Box.Preview = function Preview() {
      this.updateFileCache = jest.fn();
      this.show = jest.fn();
      this.updateToken = jest.fn();
      this.addListener = jest.fn();
      this.updateExperiences = jest.fn();
    };

    global.performance = {
      now: jest.fn().mockReturnValue(PERFORMANCE_TIME)
    };
  });
  afterEach(function () {
    delete global.Box;
  });
  describe('constructor()', function () {
    var onReadyMetric;
    beforeEach(function () {
      var wrapper = getWrapper();
      onReadyMetric = wrapper.instance().props.logger.onReadyMetric;
    });
    test('should emit when js loaded', function () {
      expect(onReadyMetric).toHaveBeenCalledWith({
        endMarkName: expect.any(String)
      });
    });
  });
  describe('componentDidUpdate()', function () {
    test('should not reload preview if component updates but we should not load preview',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var wrapper, instance;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              file = {
                id: '123'
              };
              props = {
                hasSidebar: true,
                token: 'token',
                fileId: file.id
              };
              wrapper = getWrapper(props);
              wrapper.setState({
                file: file
              });
              instance = wrapper.instance();
              instance.shouldLoadPreview = jest.fn().mockReturnValue(false);
              instance.loadPreview = jest.fn();
              wrapper.setProps({
                hasSidebar: false
              });
              expect(instance.loadPreview).toHaveBeenCalledTimes(0);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    test('should destroy preview before attempting to load it', function () {
      file = {
        id: '123'
      };
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.destroyPreview = jest.fn();
      instance.shouldLoadPreview = jest.fn().mockReturnValue(true);
      instance.loadPreview = jest.fn();
      wrapper.setState({
        file: file
      });
      expect(instance.destroyPreview).toHaveBeenCalledWith(false);
      expect(instance.loadPreview).toHaveBeenCalledTimes(1);
    });
    test('should destroy preview and reset selectedVersion state on new fileId', function () {
      file = {
        id: '123'
      };
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.destroyPreview = jest.fn();
      instance.fetchFile = jest.fn();
      wrapper.setProps({
        fileId: '456'
      });
      expect(instance.destroyPreview).toHaveBeenCalledWith();
      expect(wrapper.state('selectedVersion')).toBe(undefined);
      expect(instance.fetchFile).toHaveBeenCalledWith('456');
    });
  });
  describe('shouldLoadPreview()', function () {
    var wrapper;
    var instance;
    beforeEach(function () {
      wrapper = getWrapper(props);
      instance = wrapper.instance();
      file = {
        id: '123',
        file_version: {
          id: '1'
        }
      };
      wrapper.setState({
        file: file
      });
      instance.preview = new global.Box.Preview();
    });
    test('should return true if file version ID has changed', function () {
      var oldFile = {
        id: '123',
        file_version: {
          id: '1234'
        }
      };
      expect(instance.shouldLoadPreview({
        file: oldFile
      })).toBe(true);
    });
    test('should return true if file object has newly been populated', function () {
      wrapper.setState({
        file: {
          id: '123'
        }
      });
      expect(instance.shouldLoadPreview({
        file: undefined
      })).toBeTruthy();
    });
    test('should return false if file has not changed', function () {
      expect(instance.shouldLoadPreview({
        file: file
      })).toBe(false);
    });
    test('should return true if the currently-selected version ID has changed', function () {
      expect(instance.shouldLoadPreview({
        selectedVersion: {
          id: '12345'
        }
      })).toBe(true);
    });
    test('should return true if the selected version is missing and the previous selection was an old version', function () {
      wrapper.setState({
        selectedVersion: {
          id: undefined
        }
      });
      expect(instance.shouldLoadPreview({
        selectedVersion: {
          id: '12345'
        }
      })).toBe(true);
    });
    test('should return false if the selected version is missing but the previous selection was the current version', function () {
      wrapper.setState({
        selectedVersion: {
          id: undefined
        }
      });
      expect(instance.shouldLoadPreview({
        selectedVersion: {
          id: '1'
        }
      })).toBe(false);
    });
  });
  describe('canDownload()', function () {
    var wrapper;
    var instance;
    beforeEach(function () {
      file = {
        id: '123',
        permissions: {
          can_download: true
        },
        is_download_available: true
      };
    });
    test('should return true when all conditions are met', function () {
      wrapper = getWrapper(props);
      instance = wrapper.instance();
      wrapper.setState({
        file: file
      });
      expect(instance.canDownload()).toBeTruthy();
    });
    test('should return false if canDownload is false', function () {
      props.canDownload = false;
      wrapper = getWrapper(props);
      instance = wrapper.instance();
      wrapper.setState({
        file: file
      });
      expect(instance.canDownload()).toBeFalsy();
    });
    test('should return false if can_download is false', function () {
      props.canDownload = true;
      file.permissions.can_download = false;
      wrapper = getWrapper(props);
      instance = wrapper.instance();
      wrapper.setState({
        file: file
      });
      expect(instance.canDownload()).toBeFalsy();
    });
    test('should return false if is_download_available is false', function () {
      props.canDownload = true;
      file.is_download_available = false;
      wrapper = getWrapper(props);
      instance = wrapper.instance();
      wrapper.setState({
        file: file
      });
      expect(instance.canDownload()).toBeFalsy();
    });
  });
  describe('handleCanPrint()', function () {
    beforeEach(function () {
      file = {
        id: '123',
        permissions: {
          can_download: true
        },
        is_download_available: true
      };
    });
    test.each([[true, true], [false, false]])('should set canPrint to %s when ability to print is %s', function (expected, value) {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      var canPrintMock = jest.fn().mockReturnValue(value);
      wrapper.setState({
        file: file
      });
      instance.preview = {
        canPrint: canPrintMock
      };
      instance.handleCanPrint();
      expect(canPrintMock).toBeCalled();
      expect(wrapper.state('canPrint')).toEqual(expected);
    });
    it('should show print icon if printCheck is not available', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.preview = {};
      instance.destroyPreview = jest.fn();
      wrapper.setState({
        file: file
      });
      instance.handleCanPrint();
      expect(wrapper.state('canPrint')).toEqual(true);
    });
  });
  describe('loadPreview()', function () {
    beforeEach(function () {
      // Fresh global preview object
      global.Box = {};

      global.Box.Preview = function Preview() {
        this.addListener = jest.fn();
        this.updateFileCache = jest.fn();
        this.show = jest.fn();
        this.removeAllListeners = jest.fn();
        this.destroy = jest.fn();
      };

      file = {
        id: '123'
      };
      props = {
        onMetric: jest.fn(),
        token: 'token',
        fileId: file.id
      };
    });
    test('should bind onPreviewError prop to preview "preview_error" event',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var wrapper, instance;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              wrapper = getWrapper(_objectSpread({}, props, {
                onError: jest.fn()
              }));
              wrapper.setState({
                file: file
              });
              instance = wrapper.instance();
              instance.onPreviewError = jest.fn();
              _context2.next = 6;
              return instance.loadPreview();

            case 6:
              expect(instance.preview.addListener).toHaveBeenCalledWith('preview_error', instance.onPreviewError);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    test('should bind onPreviewMetric prop to preview "preview_metric" event',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var wrapper, instance;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              wrapper = getWrapper(props);
              wrapper.setState({
                file: file
              });
              instance = wrapper.instance();
              instance.onPreviewMetric = jest.fn();
              _context3.next = 6;
              return instance.loadPreview();

            case 6:
              expect(instance.preview.addListener).toHaveBeenCalledWith('preview_metric', instance.onPreviewMetric);

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    test('should bind onPreviewLoad method to preview "load" event',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var wrapper, instance;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              wrapper = getWrapper(props);
              wrapper.setState({
                file: file
              });
              instance = wrapper.instance();
              _context4.next = 5;
              return instance.loadPreview();

            case 5:
              expect(instance.preview.addListener).toHaveBeenCalledWith('load', instance.onPreviewLoad);

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    test('should call preview show with correct params',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var wrapper, instance;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              wrapper = getWrapper(props);
              wrapper.setState({
                file: file
              });
              instance = wrapper.instance();
              _context5.next = 5;
              return instance.loadPreview();

            case 5:
              expect(instance.preview.show).toHaveBeenCalledWith(file.id, expect.any(Function), expect.objectContaining({
                container: expect.stringContaining('.bcpr-content'),
                header: 'none',
                showDownload: false,
                showLoading: false,
                showProgress: false,
                skipServerUpdate: true,
                useHotkeys: false
              }));

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    test('should call preview show with file version params if provided',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var wrapper, instance;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              wrapper = getWrapper(props);
              wrapper.setState({
                file: _objectSpread({}, file, {
                  file_version: {
                    id: '67890'
                  }
                }),
                selectedVersion: {
                  id: '12345'
                }
              });
              instance = wrapper.instance();
              _context6.next = 5;
              return instance.loadPreview();

            case 5:
              expect(instance.preview.show).toHaveBeenCalledWith(file.id, expect.any(Function), expect.objectContaining({
                container: expect.stringContaining('.bcpr-content'),
                fileOptions: _defineProperty({}, file.id, {
                  fileVersionId: '12345',
                  currentFileVersionId: '67890'
                }),
                header: 'none',
                showDownload: false,
                showLoading: false,
                showProgress: false,
                skipServerUpdate: true,
                useHotkeys: false
              }));

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
    test('should call preview show with activeAnnotationId if provided',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var wrapper, instance;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              wrapper = getWrapper(_objectSpread({}, props, {
                annotatorState: {
                  activeAnnotationId: '123'
                }
              }));
              wrapper.setState({
                file: file
              });
              instance = wrapper.instance();
              _context7.next = 5;
              return instance.loadPreview();

            case 5:
              expect(instance.preview.show).toHaveBeenCalledWith(file.id, expect.any(Function), expect.objectContaining({
                fileOptions: _defineProperty({}, file.id, {
                  annotations: {
                    activeId: '123'
                  }
                })
              }));

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
    test('should call preview show with startAt params if provided',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      var wrapper, instance;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              wrapper = getWrapper(props);
              wrapper.setState({
                file: file,
                startAt: {
                  unit: 'pages',
                  value: 3
                }
              });
              instance = wrapper.instance();
              _context8.next = 5;
              return instance.loadPreview();

            case 5:
              expect(instance.preview.show).toHaveBeenCalledWith(file.id, expect.any(Function), expect.objectContaining({
                container: expect.stringContaining('.bcpr-content'),
                header: 'none',
                showDownload: false,
                skipServerUpdate: true,
                useHotkeys: false,
                fileOptions: _defineProperty({}, file.id, {
                  startAt: {
                    unit: 'pages',
                    value: 3
                  }
                })
              }));

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
    test('should use boxAnnotations instance if provided',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9() {
      var boxAnnotations, wrapper, instance;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              boxAnnotations = jest.fn();
              wrapper = getWrapper(_objectSpread({}, props, {
                boxAnnotations: boxAnnotations
              }));
              wrapper.setState({
                file: file
              });
              instance = wrapper.instance();
              _context9.next = 6;
              return instance.loadPreview();

            case 6:
              expect(instance.preview.show).toHaveBeenCalledWith(file.id, expect.any(Function), expect.objectContaining({
                boxAnnotations: boxAnnotations
              }));

            case 7:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
    test.each(_templateObject(), true, true, false, false)('should call onAnnotationCreate $called if showAnnotationsControls is $showAnnotationsControls',
    /*#__PURE__*/
    function () {
      var _ref10 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(_ref11) {
        var called, showAnnotationsControls, onAnnotator, wrapper, instance;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                called = _ref11.called, showAnnotationsControls = _ref11.showAnnotationsControls;
                onAnnotator = jest.fn();
                wrapper = getWrapper(_objectSpread({}, props, {
                  showAnnotationsControls: showAnnotationsControls,
                  onAnnotator: onAnnotator
                }));
                wrapper.setState({
                  file: file
                });
                instance = wrapper.instance();
                _context10.next = 7;
                return instance.loadPreview();

              case 7:
                if (called) {
                  expect(instance.preview.addListener).toHaveBeenCalledWith('annotator_create', onAnnotator);
                } else {
                  expect(instance.preview.addListener).not.toHaveBeenCalledWith('annotator_create', onAnnotator);
                }

              case 8:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      return function (_x) {
        return _ref10.apply(this, arguments);
      };
    }());
  });
  describe('fetchFile()', function () {
    var getFileStub;
    var instance;
    beforeEach(function () {
      file = {
        id: '123'
      };
      props = {
        token: 'token',
        fileId: file.id,
        contentSidebarProps: {
          hasSkills: true
        }
      };
      var wrapper = getWrapper(props);
      instance = wrapper.instance();
      getFileStub = jest.fn();
      instance.api = {
        getFileAPI: function getFileAPI() {
          return {
            getFile: getFileStub
          };
        }
      };
    });
    test('should fetch the file with provided success and error callbacks', function () {
      var success = jest.fn();
      var error = jest.fn();
      SidebarUtils.canHaveSidebar = jest.fn().mockReturnValueOnce(true);
      instance.fetchFile(file.id, success, error, {
        forceFetch: false,
        refreshCache: true
      });
      expect(getFileStub).toBeCalledWith(file.id, success, error, {
        forceFetch: false,
        refreshCache: true,
        fields: PREVIEW_FIELDS_TO_FETCH
      });
    });
    test('should fetch the file with default success and error callback', function () {
      instance.fetchFileSuccessCallback = jest.fn();
      instance.fetchFileErrorCallback = jest.fn();
      SidebarUtils.canHaveSidebar = jest.fn().mockReturnValueOnce(true);
      instance.fetchFile(file.id);
      expect(getFileStub).toBeCalledWith(file.id, instance.fetchFileSuccessCallback, instance.fetchFileErrorCallback, {
        fields: PREVIEW_FIELDS_TO_FETCH
      });
    });
    test('should fetch the file without sidebar fields', function () {
      instance.fetchFileSuccessCallback = jest.fn();
      instance.fetchFileErrorCallback = jest.fn();
      SidebarUtils.canHaveSidebar = jest.fn().mockReturnValueOnce(false);
      instance.fetchFile(file.id);
      expect(getFileStub).toBeCalledWith(file.id, instance.fetchFileSuccessCallback, instance.fetchFileErrorCallback, {
        fields: PREVIEW_FIELDS_TO_FETCH
      });
    });
    test('should short circuit if there is no fileId', function () {
      instance.fetchFile(null);
      expect(getFileStub).not.toBeCalled();
    });
  });
  describe('fetchFileSuccessCallback()', function () {
    var instance;
    beforeEach(function () {
      var wrapper = getWrapper(props);
      instance = wrapper.instance();
    });
    test('should set state to the new file', function () {
      instance.fetchFileSuccessCallback(file);
      expect(instance.state.file).toEqual(file);
      expect(instance.state.error).toBeUndefined();
      expect(instance.state.isReloadNotificationVisible).toEqual(false);
    });
    test('should set the state to new file if watermarked', function () {
      var newFile = _objectSpread({}, file);

      newFile.watermark_info = {
        is_watermarked: true
      };
      instance.setState({
        file: file
      });
      instance.fetchFileSuccessCallback(newFile);
      expect(instance.state.file).toEqual(newFile);
      expect(instance.state.error).toBeUndefined();
      expect(instance.state.isReloadNotificationVisible).toEqual(false);
    });
    test('should not set new file in state if sha1 matches', function () {
      var newFile = _objectSpread({}, file);

      newFile.file_version = {
        sha1: 'sha'
      };
      file.file_version = {
        sha1: 'sha'
      };
      instance.setState({
        file: file
      });
      instance.fetchFileSuccessCallback(newFile);
      expect(instance.state.file).toEqual(file);
    });
    test('should not set new file in state but show notification if sha1 changes', function () {
      var newFile = _objectSpread({}, file);

      newFile.file_version = {
        sha1: 'sha1'
      };
      file.file_version = {
        sha1: 'sha2'
      };
      instance.setState({
        file: file,
        isFileError: true,
        isReloadNotificationVisible: true
      });
      instance.fetchFileSuccessCallback(newFile);
      expect(instance.stagedFile).toEqual(newFile);
      expect(instance.state.file).toEqual(file);
      expect(instance.state.error).toBeUndefined();
      expect(instance.state.isReloadNotificationVisible).toBeTruthy();
    });
  });
  describe('fetchFileErrorCallback()', function () {
    var instance;
    var error;
    var onError;
    beforeEach(function () {
      onError = jest.fn();
      var wrapper = getWrapper(_objectSpread({}, props, {
        onError: onError
      }));
      instance = wrapper.instance();
      instance.fetchFile = jest.fn();
      error = new Error('foo');
    });
    test('should set the error state from the error object', function () {
      instance.fetchFileErrorCallback(error, 'code');
      expect(instance.state.error).toEqual({
        code: 'code',
        message: 'foo'
      });
      expect(instance.fetchFile).not.toBeCalled();
      expect(instance.file).toBeUndefined();
      expect(onError).toHaveBeenCalled();
    });
    test('should use the code from response if it exists', function () {
      instance.fetchFileErrorCallback({
        code: 'specialCode',
        message: 'specialMessage'
      }, 'code');
      expect(instance.state.error).toEqual({
        code: 'specialCode',
        message: 'specialMessage'
      });
      expect(instance.fetchFile).not.toBeCalled();
      expect(instance.file).toBeUndefined();
      expect(onError).toHaveBeenCalled();
    });
    test('should set isLoading to false', function () {
      instance.setState({
        isLoading: true
      });
      instance.fetchFileErrorCallback({
        code: 'specialCode',
        message: 'specialMessage'
      }, 'code');
      expect(instance.state.isLoading).toBe(false);
    });
  });
  describe('getTotalFileFetchTime()', function () {
    var instance;
    var startTime = 1.23;
    var endTime = 5.46;
    beforeEach(function () {
      props = {
        token: 'token',
        fileId: file.id
      };
      var wrapper = getWrapper(props);
      instance = wrapper.instance();
      instance.fetchFileStartTime = startTime;
      instance.fetchFileEndTime = endTime;
    });
    test('should return the default if no start time', function () {
      instance.fetchFileStartTime = null;
      var totalMetrics = instance.getTotalFileFetchTime();
      expect(totalMetrics).toEqual(0);
    });
    test('should return the default if no end time', function () {
      instance.fetchFileEndTime = null;
      var totalMetrics = instance.getTotalFileFetchTime();
      expect(totalMetrics).toEqual(0);
    });
    test('should return the total fetching time', function () {
      var total = instance.getTotalFileFetchTime();
      expect(total).toEqual(4);
    });
  });
  describe('addFetchFileTimeToPreviewMetrics()', function () {
    var instance;
    var metrics = {
      conversion: 0,
      rendering: 100,
      total: 100
    };
    var FETCHING_TIME = 200;
    beforeEach(function () {
      props = {
        token: 'token',
        fileId: file.id
      };
      var wrapper = getWrapper(props);
      instance = wrapper.instance();
      instance.getTotalFileFetchTime = jest.fn().mockReturnValue(FETCHING_TIME);
    });
    test('should add the total file fetching time to rendering if the file was converted', function () {
      var totalMetrics = instance.addFetchFileTimeToPreviewMetrics(metrics);
      var conversion = metrics.conversion,
          rendering = metrics.rendering;
      var totalRendering = rendering + FETCHING_TIME;
      expect(instance.getTotalFileFetchTime).toBeCalled();
      expect(totalMetrics).toEqual({
        conversion: conversion,
        rendering: totalRendering,
        total: conversion + totalRendering,
        preload: undefined
      });
    });
    test('should add the total file fetching time to conversion if the file was not converted', function () {
      var CONVERSION_TIME = 50;
      var totalMetrics = instance.addFetchFileTimeToPreviewMetrics(_objectSpread({}, metrics, {
        conversion: CONVERSION_TIME
      }));
      var rendering = metrics.rendering;
      var totalConversion = CONVERSION_TIME + FETCHING_TIME;
      expect(instance.getTotalFileFetchTime).toBeCalled();
      expect(totalMetrics).toEqual({
        conversion: totalConversion,
        rendering: rendering,
        total: rendering + totalConversion,
        preload: undefined
      });
    });
    test('should add the total file fetching time to preload if it exists', function () {
      var PRELOAD_TIME = 20;
      var totalMetrics = instance.addFetchFileTimeToPreviewMetrics(_objectSpread({}, metrics, {
        preload: PRELOAD_TIME
      }));
      var conversion = metrics.conversion,
          rendering = metrics.rendering;
      var totalRendering = rendering + FETCHING_TIME;
      expect(instance.getTotalFileFetchTime).toBeCalled();
      expect(totalMetrics).toEqual({
        conversion: conversion,
        rendering: totalRendering,
        total: conversion + totalRendering,
        preload: PRELOAD_TIME + FETCHING_TIME
      });
    });
  });
  describe('onPreviewLoad()', function () {
    var instance;
    var data = {
      foo: 'bar',
      metrics: {
        time: {
          conversion: 5,
          rendering: 50,
          total: 150
        }
      }
    };
    var totalTimeMetrics = {
      conversion: 100,
      rendering: 50,
      total: 150
    };
    beforeEach(function () {
      props = {
        collection: [{}, {}],
        fileId: file.id,
        onLoad: jest.fn(),
        token: 'token'
      };
      var wrapper = getWrapper(props);
      instance = wrapper.instance();
      instance.preview = {};
      instance.focusPreview = jest.fn();
      instance.prefetch = jest.fn();
      instance.getFileIndex = jest.fn().mockReturnValue(0);
      instance.addFetchFileTimeToPreviewMetrics = jest.fn().mockReturnValue(totalTimeMetrics);
    });
    test('should modify the timing metrics to add in the total file fetching time', function () {
      instance.onPreviewLoad(data);
      expect(instance.addFetchFileTimeToPreviewMetrics).toBeCalledWith(data.metrics.time);
      expect(props.onLoad).toBeCalledWith(_objectSpread({}, data, {
        metrics: {
          time: totalTimeMetrics
        }
      }));
    });
    test('should call prefetch if filesToPrefetch is not empty', function () {
      instance.onPreviewLoad(data);
      expect(instance.prefetch).toBeCalled();
    });
    test('should set isLoading to false', function () {
      instance.onPreviewLoad(data);
      expect(instance.state.isLoading).toBe(false);
    });
  });
  describe('onPreviewMetric()', function () {
    var wrapper;
    var instance;
    var onPreviewMetric;
    var data = {
      foo: 'bar',
      file_info_time: 0,
      convert_time: 0,
      download_response_time: 20,
      full_document_load_time: 20,
      value: 40
    };
    var FETCHING_TIME = 20;
    beforeEach(function () {
      props = {
        token: 'token',
        fileId: '123'
      };
      wrapper = getWrapper(props);
      instance = wrapper.instance();
      instance.getTotalFileFetchTime = jest.fn().mockReturnValue(FETCHING_TIME);
      onPreviewMetric = instance.props.logger.onPreviewMetric;
    });
    test('should add in the total file fetching time to load events', function () {
      data.event_name = 'load';
      instance.onPreviewMetric(data);
      expect(onPreviewMetric).toBeCalledWith(_objectSpread({}, data, {
        file_info_time: FETCHING_TIME,
        value: data.value + FETCHING_TIME
      }));
    });
    test('should not emit a load time related metric if invalid load time is present', function () {
      data.event_name = 'load';
      data.value = 0;
      instance.getTotalFileFetchTime = jest.fn().mockReturnValue(0);
      instance.onPreviewMetric(data);
      expect(onPreviewMetric).not.toBeCalled();
    });
  });
  describe('render()', function () {
    test('should render PreviewMask', function () {
      var wrapper = getWrapper(props);
      expect(wrapper.find(PreviewMask).exists()).toBe(true);
    });
    test('should render PreviewMask with the current file extension if available', function () {
      var fileId = '123';
      var wrapper = getWrapper({
        fileId: fileId
      });
      wrapper.setState({
        file: {
          extension: 'pdf',
          id: fileId
        }
      });
      expect(wrapper.find(PreviewMask).prop('extension')).toBe('pdf');
    });
    test('should render PreviewMask with no extension if the file id recently changed', function () {
      var fileId = '123';
      var wrapper = getWrapper({
        fileId: fileId
      });
      wrapper.setState({
        file: {
          extension: 'pdf',
          id: fileId
        }
      });
      wrapper.setProps({
        fileId: '456'
      }); // New file id means the internal file state is stale

      expect(wrapper.find(PreviewMask).prop('extension')).toBe('');
    });
    test('should render nothing if there is no fileId', function () {
      var wrapper = getWrapper({
        fileId: null
      });
      expect(wrapper.getElement()).toBe(null);
    });
  });
  describe('loadFileFromStage()', function () {
    test('should set new file in state if it exists', function () {
      var wrapper = getWrapper(props);
      var instance = wrapper.instance();
      instance.setState({
        isReloadNotificationVisible: true,
        isFileError: true
      });
      file = {
        id: '123'
      };
      instance.stagedFile = file;
      instance.loadFileFromStage();
      expect(instance.state.file).toEqual(file);
      expect(instance.stagedFile).toBeUndefined();
      expect(instance.state.isReloadNotificationVisible).toBeFalsy();
      expect(instance.state.error).toBeUndefined();
    });
  });
  describe('closeReloadNotification()', function () {
    test('should set new file in state if it exists', function () {
      var wrapper = getWrapper(props);
      var instance = wrapper.instance();
      instance.setState({
        isReloadNotificationVisible: true
      });
      instance.closeReloadNotification();
      expect(instance.state.isReloadNotificationVisible).toBeFalsy();
    });
  });
  describe('prefetch()', function () {
    test('should prefetch files',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11() {
      var wrapper, instance, options;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              props.token = jest.fn();
              wrapper = getWrapper(props);
              instance = wrapper.instance();
              options = {
                refreshCache: false
              };
              instance.fetchFile = jest.fn();
              TokenService.default.cacheTokens = jest.fn().mockReturnValueOnce(Promise.resolve());
              _context11.next = 8;
              return instance.prefetch(['1', '2', '3']);

            case 8:
              expect(TokenService.default.cacheTokens).toHaveBeenCalledWith(['file_1', 'file_2', 'file_3'], props.token);
              expect(instance.fetchFile).toHaveBeenCalledTimes(3);
              expect(instance.fetchFile).toHaveBeenNthCalledWith(1, '1', noop, noop, options);
              expect(instance.fetchFile).toHaveBeenNthCalledWith(2, '2', noop, noop, options);
              expect(instance.fetchFile).toHaveBeenNthCalledWith(3, '3', noop, noop, options);

            case 13:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })));
  });
  describe('updatePreviewToken()', function () {
    var instance;
    var token = 'token';
    beforeEach(function () {
      var wrapper = getWrapper({
        token: token,
        fileId: 'foo'
      });
      instance = wrapper.instance();
    });
    test('should update the preview token and not reload', function () {
      instance.preview = new global.Box.Preview();
      instance.updatePreviewToken();
      expect(instance.preview.updateToken).toBeCalledWith(token, false);
    });
  });
  describe('componentDidUpdate()', function () {
    var wrapper;
    var instance;
    var token = 'token';
    beforeEach(function () {
      wrapper = getWrapper({
        token: token,
        fileId: 'foo'
      });
      instance = wrapper.instance();
      instance.fetchFile = jest.fn();
      instance.destroyPreview = jest.fn();
      instance.shouldLoadPreview = jest.fn();
      instance.updatePreviewToken = jest.fn();
      instance.loadPreview = jest.fn();
    });
    test('should destroy preview and load the file if fileId changed', function () {
      wrapper.setProps({
        fileId: 'bar'
      });
      expect(instance.destroyPreview).toBeCalledTimes(1);
      expect(instance.fetchFile).toBeCalledTimes(1);
    });
    test('should update the loading state if fileId changes', function () {
      wrapper.setState({
        isLoading: false
      }); // Simulate existing preview

      wrapper.setProps({
        fileId: 'bar'
      });
      expect(wrapper.state('isLoading')).toBe(true);
    });
    test("should load preview if fileId hasn't changed and shouldLoadPreview returns true", function () {
      instance.shouldLoadPreview = jest.fn().mockReturnValue(true);
      wrapper.setProps({
        foo: 'bar'
      });
      expect(instance.loadPreview).toBeCalledTimes(1);
    });
    test("should update the loading state if fileId hasn't changed and shouldLoadPreview returns true", function () {
      instance.shouldLoadPreview = jest.fn().mockReturnValue(true);
      wrapper.setState({
        isLoading: false
      }); // Simulate existing preview

      wrapper.setProps({
        fileId: 'bar'
      });
      expect(wrapper.state('isLoading')).toBe(true);
    });
    test('should update the preview with the new token if it changes', function () {
      wrapper.setProps({
        token: 'bar'
      });
      expect(instance.updatePreviewToken).toBeCalledTimes(1);
    });
    test('should update experiences in preview when previewExperiences changes',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee12() {
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              instance.preview = new global.Box.Preview();
              wrapper.setProps({
                previewExperiences: {}
              });
              expect(instance.preview.updateExperiences).toBeCalledTimes(1);

            case 3:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    })));
  });
  describe('getDerivedStateFromProps()', function () {
    var wrapper;
    var token = 'token';
    var initialFileId = 'foo';
    var newFileId = 'bar';
    var currentFileId = 'currentFileId';
    var prevFileIdProp = 'prevFileIdProp';
    beforeEach(function () {
      wrapper = getWrapper({
        token: token,
        fileId: initialFileId
      });
      expect(wrapper.state(currentFileId)).toBe(initialFileId);
    });
    test('should update the currentFileId in state if the fileId prop changes', function () {
      wrapper.setProps({
        fileId: newFileId
      });
      expect(wrapper.state(currentFileId)).toBe(newFileId);
    });
    test('should not update the currentFileId in state if the fileId prop stays the same', function () {
      wrapper.setState({
        currentFileId: newFileId
      });
      expect(wrapper.state(currentFileId)).toBe(newFileId);
      wrapper.setProps({
        fileId: initialFileId,
        foo: 'baz'
      });
      expect(wrapper.state(currentFileId)).toBe(newFileId);
    });
    test('should update preview if navigation occurs then browser back clicked', function () {
      // navigation
      wrapper.setState({
        currentFileId: newFileId
      });
      expect(wrapper.state(prevFileIdProp)).toBe(initialFileId);
      expect(wrapper.state(currentFileId)).toBe(newFileId); // URL update

      wrapper.setProps({
        fileId: newFileId,
        foo: 'baz'
      });
      expect(wrapper.state(currentFileId)).toBe(newFileId);
      expect(wrapper.state(prevFileIdProp)).toBe(newFileId); // browser back

      wrapper.setProps({
        fileId: initialFileId,
        foo: 'baz'
      });
      expect(wrapper.state(prevFileIdProp)).toBe(initialFileId);
      expect(wrapper.state(currentFileId)).toBe(initialFileId);
    });
    test('should have the correct state when navigation and props update', function () {
      // navigation
      wrapper.setState({
        currentFileId: newFileId
      });
      expect(wrapper.state(prevFileIdProp)).toBe(initialFileId);
      expect(wrapper.state(currentFileId)).toBe(newFileId); // URL update

      wrapper.setProps({
        fileId: newFileId
      });
      expect(wrapper.state(currentFileId)).toBe(newFileId);
      expect(wrapper.state(prevFileIdProp)).toBe(newFileId); // browser back

      wrapper.setProps({
        fileId: initialFileId
      });
      expect(wrapper.state(prevFileIdProp)).toBe(initialFileId);
      expect(wrapper.state(currentFileId)).toBe(initialFileId); // browser forward

      wrapper.setProps({
        fileId: newFileId
      });
      expect(wrapper.state(prevFileIdProp)).toBe(newFileId);
      expect(wrapper.state(currentFileId)).toBe(newFileId); // browser back

      wrapper.setProps({
        fileId: initialFileId
      });
      expect(wrapper.state(prevFileIdProp)).toBe(initialFileId);
      expect(wrapper.state(currentFileId)).toBe(initialFileId); // navigation

      wrapper.setState({
        currentFileId: newFileId
      });
      expect(wrapper.state(prevFileIdProp)).toBe(initialFileId);
      expect(wrapper.state(currentFileId)).toBe(newFileId); // URL update

      wrapper.setProps({
        fileId: newFileId
      });
      expect(wrapper.state(currentFileId)).toBe(newFileId);
      expect(wrapper.state(prevFileIdProp)).toBe(newFileId);
    });
  });
  describe('canAnnotate()', function () {
    var wrapper;
    var instance;
    beforeEach(function () {
      file = {
        id: '123',
        permissions: {
          can_annotate: true
        }
      };
    });
    test('should return true if showAnnotations prop is true and there are annotations edit permissions', function () {
      wrapper = getWrapper(_objectSpread({}, props, {
        showAnnotations: true
      }));
      instance = wrapper.instance();
      wrapper.setState({
        file: file
      });
      expect(instance.canAnnotate()).toBeTruthy();
    });
    test('should return false if showAnnotations prop is false (default is false)', function () {
      wrapper = getWrapper(props);
      instance = wrapper.instance();
      wrapper.setState({
        file: file
      });
      expect(instance.canAnnotate()).toBeFalsy();
    });
    test('should return false if can_annotate permission is false', function () {
      wrapper = getWrapper(_objectSpread({}, props, {
        showAnnotations: true
      }));
      wrapper = getWrapper(props);
      instance = wrapper.instance();
      file.permissions.can_annotate = false;
      wrapper.setState({
        file: file
      });
      expect(instance.canAnnotate()).toBeFalsy();
    });
  });
  describe('canViewAnnotations()', function () {
    var wrapper;
    var instance;
    beforeEach(function () {
      props.showAnnotations = true;
      file = {
        id: '123',
        permissions: {
          can_annotate: true,
          can_view_annotations_all: false,
          can_view_annotations_self: false
        }
      };
    });
    test('should return true if showAnnotations prop is true and has can_annotate permission', function () {
      wrapper = getWrapper(props);
      instance = wrapper.instance();
      instance.canAnnotate = jest.fn().mockReturnValue(true);
      wrapper.setState({
        file: file
      });
      expect(instance.canViewAnnotations()).toBeTruthy();
    });
    test('should return true if showAnnotations prop is true and has can view all annotations', function () {
      file.permissions = {
        can_annotate: false,
        can_view_annotations_all: true,
        can_view_annotations_self: false
      };
      wrapper = getWrapper(props);
      instance = wrapper.instance();
      wrapper.setState({
        file: file
      });
      expect(instance.canViewAnnotations()).toBeTruthy();
    });
    test('should return true if showAnnotations prop is true and has can view self annotations', function () {
      file.permissions = {
        can_annotate: false,
        can_view_annotations_all: false,
        can_view_annotations_self: true
      };
      wrapper = getWrapper(props);
      instance = wrapper.instance();
      wrapper.setState({
        file: file
      });
      expect(instance.canViewAnnotations()).toBeTruthy();
    });
    test('should return false if showAnnotations prop is false', function () {
      props.showAnnotations = false;
      wrapper = getWrapper(props);
      instance = wrapper.instance();
      wrapper.setState({
        file: file
      });
      expect(instance.canViewAnnotations()).toBeFalsy();
    });
    test('should return false if there are no view or edit permissions', function () {
      wrapper = getWrapper(props);
      props.showAnnotations = true;
      file.permissions = {
        can_annotate: false,
        can_view_annotations_all: false,
        can_view_annotations_self: false
      };
      instance = wrapper.instance();
      wrapper.setState({
        file: file
      });
      expect(instance.canViewAnnotations()).toBeFalsy();
    });
  });
  describe('componentWillUnmount()', function () {
    var wrapper;
    var instance;
    beforeEach(function () {
      wrapper = getWrapper(props, {
        disableLifecycleMethods: true
      });
      instance = wrapper.instance();
      instance.api = {
        destroy: jest.fn()
      };
      instance.destroyPreview = jest.fn();
    });
    test('shoud destroy the API and preview', function () {
      instance.componentWillUnmount();
      expect(instance.api.destroy).toHaveBeenCalledWith(false);
      expect(instance.destroyPreview).toHaveBeenCalled();
    });
  });
  describe('handleAnnotationSelect', function () {
    test.each(_templateObject2(), '123', '124', 'page', 1, '124', '124', 'page', 0, '123', '124', '', 0, undefined, '124', 'page', 0)('should call onVersionChange $onVersionChangeCount times and setState $setStateCount times', function (_ref14) {
      var annotationFileVersionId = _ref14.annotationFileVersionId,
          selectedVersionId = _ref14.selectedVersionId,
          locationType = _ref14.locationType,
          setStateCount = _ref14.setStateCount;
      var annotation = {
        id: '123',
        file_version: {
          id: annotationFileVersionId
        },
        target: {
          location: {
            type: locationType
          }
        }
      };
      var emit = jest.fn();
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      jest.spyOn(instance, 'getViewer').mockReturnValue({
        emit: emit
      });
      wrapper.setState({
        selectedVersion: {
          id: selectedVersionId
        }
      });
      instance.setState = jest.fn();
      instance.handleAnnotationSelect(annotation);
      expect(instance.setState).toHaveBeenCalledTimes(setStateCount);
      expect(emit).toBeCalledWith('scrolltoannotation', {
        id: annotation.id,
        target: annotation.target
      });
    });
  });
});