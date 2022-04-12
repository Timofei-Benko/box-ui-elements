function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';
import messages from '../../common/messages';
import { ContentOpenWithComponent as ContentOpenWith } from '../ContentOpenWith';
import { BOX_EDIT_INTEGRATION_ID, BOX_EDIT_SFC_INTEGRATION_ID } from '../../../constants';
import BoxToolsInstallMessage from '../BoxToolsInstallMessage';
jest.mock('lodash/uniqueId', function () {
  return function () {
    return 'uniqueId';
  };
});
var ABCD_INTEGRATION_ID = '1234';
var BLACKLISTED_ERROR_MESSAGE_KEY = 'boxToolsBlacklistedError';
var BOX_TOOLS_INSTALL_ERROR_MESSAGE_KEY = 'boxToolsInstallErrorMessage';
describe('elements/content-open-with/ContentOpenWith', function () {
  var fileId = '1234';
  var token = '4321';
  var wrapper;
  var instance;

  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(ContentOpenWith, props));
  };

  beforeEach(function () {
    wrapper = getWrapper({
      fileId: fileId,
      token: token
    });
    instance = wrapper.instance();
    jest.spyOn(global.console, 'error').mockImplementation();
  });
  afterEach(function () {
    jest.restoreAllMocks();
  });
  describe('componentDidMount()', function () {
    test('should fetch Open With data', function () {
      instance.fetchOpenWithData = jest.fn();
      instance.componentDidMount();
      expect(instance.fetchOpenWithData).toHaveBeenCalled();
    });
  });
  describe('componentDidUpdate()', function () {
    test('should reset loading state and get Open With data if the file ID has changed', function () {
      instance.fetchOpenWithData = jest.fn();
      instance.setState = jest.fn();
      instance.componentDidUpdate({
        fileId: '4321'
      });
      expect(instance.fetchOpenWithData).toHaveBeenCalled();
      expect(instance.setState).toHaveBeenCalledWith(_objectSpread({}, instance.initialState));
    });
  });
  describe('isBoxEditIntegration()', function () {
    test('should determine if the integration is a Box Edit integration', function () {
      expect(instance.isBoxEditIntegration(ABCD_INTEGRATION_ID)).toBe(false);
      expect(instance.isBoxEditIntegration(BOX_EDIT_INTEGRATION_ID)).toBe(true);
      expect(instance.isBoxEditIntegration(BOX_EDIT_SFC_INTEGRATION_ID)).toBe(true);
    });
  });
  describe('isBoxEditSFCIntegration()', function () {
    test('should determine if the integration is a Box Edit SFC integration', function () {
      expect(instance.isBoxEditSFCIntegration(ABCD_INTEGRATION_ID)).toBe(false);
      expect(instance.isBoxEditSFCIntegration(BOX_EDIT_INTEGRATION_ID)).toBe(false);
      expect(instance.isBoxEditSFCIntegration(BOX_EDIT_SFC_INTEGRATION_ID)).toBe(true);
    });
  });
  describe('fetchOpenWithData()', function () {
    var fileStub = jest.fn();
    var openWithStub = jest.fn();
    var api = {
      getFileAPI: function getFileAPI() {
        return {
          getFile: fileStub
        };
      },
      getOpenWithAPI: function getOpenWithAPI() {
        return {
          getOpenWithIntegrations: openWithStub
        };
      }
    };
    test('should should fetch Open With integrations', function () {
      instance = getWrapper({
        fileId: '1234',
        language: 'en-US'
      }).instance();
      instance.setState = jest.fn();
      instance.api = api;
      instance.fetchOpenWithData();
      expect(openWithStub).toHaveBeenCalledWith('1234', expect.any(Function), expect.any(Function));
    });
  });
  describe('fetchOpenWithSuccessHandler()', function () {
    var mockIntegrations = [];
    var boxEditIntegration = {};
    var extension = 'pdf';
    beforeEach(function () {
      instance.setState = jest.fn();
      mockIntegrations = [{
        isDisabled: false,
        name: 'ABCD',
        appIntegrationId: '2',
        disabledReasons: []
      }, {
        isDisabled: false,
        name: 'Google',
        appIntegrationId: '1',
        disabledReasons: []
      }];
      boxEditIntegration = {
        isDisabled: false,
        name: 'Open',
        appIntegrationId: BOX_EDIT_INTEGRATION_ID,
        disabledReasons: []
      };
    });
    test('should set the state with the new integrations and disable loading',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              instance.getIntegrationFileExtension = jest.fn();
              _context.next = 3;
              return instance.fetchOpenWithSuccessHandler(mockIntegrations);

            case 3:
              expect(instance.setState).toHaveBeenCalledWith({
                integrations: mockIntegrations,
                isLoading: false
              });
              expect(instance.getIntegrationFileExtension).not.toBeCalled();

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    test('should set the disabled reason if we are unable to get the extension before setting state',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              instance.getIntegrationFileExtension = jest.fn().mockRejectedValue(new Error('error'));
              instance.isBoxEditAvailable = jest.fn();
              instance.canOpenExtensionWithBoxEdit = jest.fn();
              _context2.next = 5;
              return instance.fetchOpenWithSuccessHandler([boxEditIntegration]);

            case 5:
              expect(instance.setState).toBeCalled();
              expect(instance.isBoxEditAvailable).not.toBeCalled();
              expect(instance.canOpenExtensionWithBoxEdit).not.toBeCalled();

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    test('should get the file extension and check box edit for availability and openability before setting state',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var integrationWithExtension;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              integrationWithExtension = _objectSpread({}, boxEditIntegration, {
                extension: extension
              });
              instance.getIntegrationFileExtension = jest.fn().mockResolvedValue({
                extension: extension
              });
              instance.isBoxEditAvailable = jest.fn().mockResolvedValue(true);
              instance.canOpenExtensionWithBoxEdit = jest.fn().mockResolvedValue(true);
              _context3.next = 6;
              return instance.fetchOpenWithSuccessHandler([].concat(_toConsumableArray(mockIntegrations), [boxEditIntegration]));

            case 6:
              expect(instance.setState).toBeCalledWith({
                integrations: [].concat(_toConsumableArray(mockIntegrations), [integrationWithExtension]),
                isLoading: false
              });
              expect(instance.isBoxEditAvailable).toBeCalled();
              expect(instance.canOpenExtensionWithBoxEdit).toBeCalled();

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    test('should set the disabled reason if Box Tools is not available before setting state',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              instance.getIntegrationFileExtension = jest.fn().mockResolvedValue({
                extension: extension
              });
              instance.isBoxEditAvailable = jest.fn().mockRejectedValue(new Error(BOX_TOOLS_INSTALL_ERROR_MESSAGE_KEY));
              instance.canOpenExtensionWithBoxEdit = jest.fn().mockResolvedValue();
              _context4.next = 5;
              return instance.fetchOpenWithSuccessHandler([boxEditIntegration]);

            case 5:
              expect(instance.setState).toBeCalledWith({
                integrations: [_objectSpread({}, boxEditIntegration, {
                  isDisabled: true,
                  // eslint-disable-next-line
                  disabledReasons: [React.createElement(BoxToolsInstallMessage, null)]
                })],
                isLoading: false
              });

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    test('should set the disabled reason if the file type is black listed by box tools before setting state',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              instance.getIntegrationFileExtension = jest.fn().mockResolvedValue({
                extension: extension
              });
              instance.isBoxEditAvailable = jest.fn().mockResolvedValue();
              instance.canOpenExtensionWithBoxEdit = jest.fn().mockRejectedValue(new Error(BLACKLISTED_ERROR_MESSAGE_KEY));
              _context5.next = 5;
              return instance.fetchOpenWithSuccessHandler([boxEditIntegration]);

            case 5:
              expect(instance.setState).toBeCalledWith({
                integrations: [_objectSpread({}, boxEditIntegration, {
                  isDisabled: true,
                  // eslint-disable-next-line
                  disabledReasons: [React.createElement(FormattedMessage, messages.boxToolsBlacklistedError)]
                })],
                isLoading: false
              });

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    test('should set the default disabled reason if there was a failure for an unknown reason',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              instance.getIntegrationFileExtension = jest.fn().mockRejectedValue(new Error('foo'));
              _context6.next = 3;
              return instance.fetchOpenWithSuccessHandler([boxEditIntegration]);

            case 3:
              expect(instance.setState).toBeCalledWith({
                integrations: [_objectSpread({}, boxEditIntegration, {
                  isDisabled: true,
                  // eslint-disable-next-line
                  disabledReasons: [React.createElement(FormattedMessage, messages.executeIntegrationOpenWithErrorHeader)]
                })],
                isLoading: false
              });

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
  });
  describe('getIntegrationFileExtension()', function () {
    test('should get the file extension', function () {
      var getFileExtensionStub = jest.fn();
      instance.api = {
        getFileAPI: function getFileAPI() {
          return {
            getFileExtension: getFileExtensionStub
          };
        }
      };
      instance.getIntegrationFileExtension();
      expect(getFileExtensionStub).toBeCalled();
    });
  });
  describe('isBoxEditAvailable()', function () {
    test('should resolve with result of box edit',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var checkBoxEditAvailabilityStub, result;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              checkBoxEditAvailabilityStub = jest.fn().mockResolvedValueOnce();
              instance.api = {
                getBoxEditAPI: function getBoxEditAPI() {
                  return {
                    checkBoxEditAvailability: checkBoxEditAvailabilityStub
                  };
                }
              };
              _context7.next = 4;
              return instance.isBoxEditAvailable();

            case 4:
              result = _context7.sent;
              expect(result).toBe(undefined);
              checkBoxEditAvailabilityStub = jest.fn().mockRejectedValue('Not Available!');
              _context7.prev = 7;
              _context7.next = 10;
              return instance.isBoxEditAvailable();

            case 10:
              _context7.next = 15;
              break;

            case 12:
              _context7.prev = 12;
              _context7.t0 = _context7["catch"](7);
              expect(_typeof(_context7.t0.message)).toBe('string');

            case 15:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[7, 12]]);
    })));
  });
  describe('canOpenExtensionWithBoxEdit()', function () {
    test('should resolve with result of box edit',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      var getAppForExtensionStub, result;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              getAppForExtensionStub = jest.fn().mockResolvedValueOnce();
              instance.api = {
                getBoxEditAPI: function getBoxEditAPI() {
                  return {
                    getAppForExtension: getAppForExtensionStub
                  };
                }
              };
              _context8.next = 4;
              return instance.canOpenExtensionWithBoxEdit('pdf');

            case 4:
              result = _context8.sent;
              expect(result).toBe(undefined);
              getAppForExtensionStub = jest.fn().mockRejectedValue('blacklisted!');
              _context8.prev = 7;
              _context8.next = 10;
              return instance.canOpenExtensionWithBoxEdit('js');

            case 10:
              _context8.next = 15;
              break;

            case 12:
              _context8.prev = 12;
              _context8.t0 = _context8["catch"](7);
              expect(_typeof(_context8.t0.message)).toBe('string');

            case 15:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[7, 12]]);
    })));
  });
  describe('fetchErrorHandler()', function () {
    test('should set the error state', function () {
      var mockError = new Error();
      instance.setState = jest.fn();
      instance.fetchErrorHandler(mockError);
      expect(instance.setState).toHaveBeenCalledWith({
        fetchError: mockError,
        isLoading: false
      });
    });
  });
  describe('onIntegrationClick()', function () {
    var api;
    var displayIntegration;
    beforeEach(function () {
      var executeStub = jest.fn();
      api = {
        getAppIntegrationsAPI: function getAppIntegrationsAPI() {
          return {
            execute: executeStub
          };
        }
      };
      displayIntegration = {
        appIntegrationId: '1',
        displayName: 'Google Docs'
      };
      instance.setState = jest.fn();
      instance.api = api;
    });
    it('should open a new window, set state, unload, title, and kick off the integration execution', function () {
      instance.window.open = jest.fn().mockReturnValue({
        onunload: null,
        document: {
          title: null
        }
      });
      instance.onIntegrationClick(displayIntegration);
      expect(instance.window.open).toBeCalled();
      expect(_typeof(instance.integrationWindow.onunload)).toEqual('function');
      expect(instance.integrationWindow.document.title).toEqual(displayIntegration.displayName);
      expect(instance.setState).toHaveBeenCalledWith({
        shouldRenderLoadingIntegrationPortal: true,
        shouldRenderErrorIntegrationPortal: false
      });
      expect(api.getAppIntegrationsAPI().execute).toBeCalled();
    });
    it('should not perform any window management for a box edit integration', function () {
      instance.isBoxEditIntegration = jest.fn().mockReturnValue(true);
      instance.executeBoxEditErrorHandler = jest.fn();
      instance.onIntegrationClick(displayIntegration);
      expect(api.getAppIntegrationsAPI().execute).toBeCalled();
      expect(instance.setState).not.toBeCalled();
      expect(api.getAppIntegrationsAPI().execute).toBeCalledWith(expect.any(String), expect.any(String), expect.any(Function), instance.executeBoxEditErrorHandler);
    });
  });
  describe('cleanupIntegrationWindow()', function () {
    it('should clear portal related state', function () {
      instance.setState = jest.fn();
      instance.cleanupIntegrationWindow();
      expect(instance.setState).toHaveBeenCalledWith({
        shouldRenderLoadingIntegrationPortal: false,
        shouldRenderErrorIntegrationPortal: false
      });
    });
  });
  describe('executeIntegrationSuccessHandler()', function () {
    var id = 3;
    var executeData = {
      method: 'GET',
      url: 'foo.com/bar'
    };
    beforeEach(function () {
      instance.isBoxEditIntegration = jest.fn();
      instance.executeBoxEditSuccessHandler = jest.fn();
      instance.executeOnlineIntegrationSuccessHandler = jest.fn();
      instance.onExecute = jest.fn();
    });
    test('should invoke the box edit success handler if we executed a box edit integration', function () {
      instance.isBoxEditIntegration.mockReturnValue(true);
      instance.executeIntegrationSuccessHandler(id, executeData);
      expect(instance.executeBoxEditSuccessHandler).toBeCalledWith(id, executeData);
    });
    test('should invoke the online success handler if we executed an online integration', function () {
      instance.isBoxEditIntegration.mockReturnValue(false);
      instance.executeIntegrationSuccessHandler(id, executeData);
      expect(instance.executeOnlineIntegrationSuccessHandler).toBeCalledWith(executeData);
      expect(instance.executeBoxEditSuccessHandler).not.toBeCalled();
    });
    test('should invoke the execute callback', function () {
      instance.onExecute = jest.fn();
      instance.executeIntegrationSuccessHandler(id, executeData);
      expect(instance.onExecute).toBeCalledWith(id);
    });
  });
  describe('executeOnlineIntegrationSuccessHandler()', function () {
    test('should set the post data in state for a POST integration', function () {
      var executeData = {
        method: 'POST',
        url: 'foo.com/bar'
      };
      instance.setState = jest.fn();
      instance.executeOnlineIntegrationSuccessHandler(executeData);
      expect(instance.setState).toBeCalledWith({
        executePostData: executeData
      });
    });
    test('should  null the integrationWindow', function () {
      instance.onExecute = jest.fn();
      var executeData = {
        method: 'GET',
        url: 'foo.com/bar'
      };
      instance.integrationWindow = {
        location: null,
        opener: 'url'
      };
      instance.executeOnlineIntegrationSuccessHandler(executeData);
      expect(instance.integrationWindow).toEqual(null);
    });
    test('should throw an error in the default case', function () {
      var executeData = {
        method: 'CRYPTO',
        url: 'foo.com/bar'
      };
      instance.executeIntegrationErrorHandler = jest.fn();
      instance.executeOnlineIntegrationSuccessHandler(executeData);
      expect(instance.executeIntegrationErrorHandler).toBeCalled();
    });
  });
  describe('executeBoxEditSuccessHandler()', function () {
    test('should use box edit to open the file', function () {
      var openFileStub = jest.fn().mockResolvedValue('open');
      var authCode = 'abcde';
      instance.api = {
        getBoxEditAPI: function getBoxEditAPI() {
          return {
            openFile: openFileStub
          };
        }
      };
      instance.isBoxEditSFCIntegration = jest.fn().mockReturnValue(true);
      var executeData = {
        url: "www.box.com/execute?file_id=1&auth_code=".concat(authCode, "&other_param=foo")
      };
      instance.executeBoxEditSuccessHandler('1234', executeData);
      expect(openFileStub).toBeCalledWith(fileId, {
        data: {
          auth_code: authCode,
          token: token,
          token_scope: 'file'
        }
      });
    });
    test('should call the onError callback when Box Tools cannot open a file ',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9() {
      var onError, error, openFileStub, authCode, executeData;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              onError = jest.fn();
              error = {
                error: 'error'
              };
              wrapper = getWrapper({
                fileId: fileId,
                token: token,
                onError: onError
              });
              instance = wrapper.instance();
              openFileStub = jest.fn().mockRejectedValue(error);
              authCode = 'abcde';
              instance.api = {
                getBoxEditAPI: function getBoxEditAPI() {
                  return {
                    openFile: openFileStub
                  };
                }
              };
              instance.isBoxEditSFCIntegration = jest.fn().mockReturnValue(true);
              executeData = {
                url: "www.box.com/execute?file_id=1&auth_code=".concat(authCode, "&other_param=foo")
              };
              _context9.next = 11;
              return instance.executeBoxEditSuccessHandler('1234', executeData);

            case 11:
              expect(onError).toBeCalledWith(error, 'execute_integrations_error', {
                error: error
              });

            case 12:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
  });
  describe('onExecuteFormSubmit()', function () {
    test('should clear out the form state data', function () {
      instance.setState = jest.fn();
      instance.onExecuteFormSubmit();
      expect(instance.setState).toBeCalledWith({
        executePostData: null
      });
    });
  });
  describe('onExecute()', function () {
    test('should call the user provided callback and clear the portal loading state', function () {});
    var propFunction = jest.fn();
    var id = '1';
    instance = getWrapper({
      onExecute: propFunction
    }).instance();
    instance.setState = jest.fn();
    instance.onExecute(id);
    expect(propFunction).toBeCalledWith(id);
    expect(instance.setState).toBeCalledWith({
      shouldRenderLoadingIntegrationPortal: false
    });
  });
  describe('executeIntegrationErrorHandler()', function () {
    test('should call the user provided callback and set the portal state', function () {
      var propFunction = jest.fn();
      instance = getWrapper({
        onError: propFunction
      }).instance();
      var errorCode = 'foo';
      instance.setState = jest.fn();
      var error = new Error();
      instance.executeIntegrationErrorHandler(error, errorCode);
      expect(propFunction).toBeCalledWith(error, errorCode, expect.any(Object));
      expect(instance.setState).toBeCalledWith({
        shouldRenderLoadingIntegrationPortal: false,
        shouldRenderErrorIntegrationPortal: true
      });
    });
  });
  describe('getDisplayIntegration()', function () {
    test('should return null iff there is not one integration', function () {
      instance.setState({
        integrations: null
      });
      var result = instance.getDisplayIntegration();
      expect(result).toEqual(null);
      instance.setState({
        integrations: ['ABCD', 'Google']
      });
      var multipleResult = instance.getDisplayIntegration();
      expect(multipleResult).toEqual(null);
      instance.setState({
        integrations: []
      });
      var emptyResult = instance.getDisplayIntegration();
      expect(emptyResult).toEqual(null);
    });
    test('should return the sole integration as the display integration', function () {
      instance = getWrapper({
        fileId: fileId
      }).instance();
      instance.setState({
        integrations: ['ABCD']
      });
      var result = instance.getDisplayIntegration();
      expect(result).toEqual('ABCD');
    });
  });
  describe('render()', function () {
    test('should render the Open With button when loading', function () {
      expect(wrapper).toMatchSnapshot();
    });
    test('should render the Open With button if there is one or fewer integrations', function () {
      instance.setState({
        integrations: ['ABCD'],
        isLoading: false
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render the Open With dropdown if there is more than one integration', function () {
      instance.setState({
        integrations: ['ABCD', 'Google Suite'],
        isLoading: false
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render the PortalContainer if the integration is loading', function () {
      instance.setState({
        integrations: ['ABCD', 'Google Suite'],
        shouldRenderLoadingIntegrationPortal: true
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render the PortalContainer if the integration is errored', function () {
      instance.setState({
        integrations: ['ABCD', 'Google Suite'],
        shouldRenderErrorIntegrationPortal: true
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render the ExecuteForm if we have data to post', function () {
      instance.setState({
        integrations: ['ABCD'],
        executePostData: {
          url: 'foo.com',
          params: [{
            foo: 'bar'
          }]
        }
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
});