function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n            isEditSettingAvailable | isAllowEditSharedLinkForFileEnabled | canShow  | expected | should\n            ", "               | ", "                            | ", " | ", "     | ", "\n            ", "                | ", "                            | ", " | ", "     | ", "\n            ", "                | ", "                             | ", " | ", "     | ", "\n            ", "                | ", "                             | ", "  | ", "     | ", "\n        "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n            accessLevel          | should\n            ", " | ", "\n            ", "  | ", "\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n        config                                | emailButtonExists | description\n        ", "                          | ", "           | ", "\n        ", "                     | ", "           | ", "\n        ", "  | ", "           | ", "\n        ", " | ", "          | ", "\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        permissionLevel      | testID\n        ", "          | ", "\n        ", " | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import sinon from 'sinon';
import { ANYONE_IN_COMPANY, ANYONE_WITH_LINK, CAN_EDIT, CAN_VIEW_DOWNLOAD } from '../constants';
import SharedLinkSection from '../SharedLinkSection';
var sandbox = sinon.sandbox.create();
describe('features/unified-share-modal/SharedLinkSection', function () {
  var intl = {
    formatMessage: sandbox.spy()
  };
  var defaultItem = {
    grantedPermissions: {
      itemShare: true
    }
  };

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(SharedLinkSection, _extends({
      autofocusSharedLink: false,
      changeSharedLinkAccessLevel: sandbox.stub(),
      changeSharedLinkPermissionLevel: sandbox.stub(),
      intl: intl,
      item: defaultItem,
      itemType: "file",
      onDismissTooltip: function onDismissTooltip() {},
      showSharedLinkSettingsCallout: true,
      tooltips: {}
    }, props)));
  };

  test('should render default component with shared link', function () {
    expect(getWrapper({
      sharedLink: {
        accessLevel: 'peopleInYourCompany',
        canChangeAccessLevel: true,
        enterpriseName: 'Box',
        expirationTimestamp: 0,
        url: 'https://example.com/shared-link'
      }
    })).toMatchSnapshot();
  });
  test('should render default component with no sharedLink', function () {
    expect(getWrapper({
      sharedLink: {
        url: ''
      }
    })).toMatchSnapshot();
  });
  test('should render GuideTooltip with isShown set to true if canShow is true', function () {
    var wrapper = getWrapper({
      isAllowEditSharedLinkForFileEnabled: true,
      sharedLink: {
        accessLevel: ANYONE_WITH_LINK,
        canChangeAccessLevel: false,
        enterpriseName: 'Box',
        expirationTimestamp: 0,
        isEditSettingAvailable: true,
        permissionLevel: CAN_EDIT,
        url: 'https://example.com/shared-link'
      },
      sharedLinkEditTooltipTargetingApi: {
        canShow: true,
        onComplete: jest.fn(),
        onShow: jest.fn()
      }
    });
    expect(wrapper.find('GuideTooltip').props().isShown).toBe(true);
  });
  test('should call onClose when GuideTooltip is dismissed', function () {
    var onClose = jest.fn();
    var wrapper = getWrapper({
      isAllowEditSharedLinkForFileEnabled: true,
      sharedLink: {
        accessLevel: ANYONE_WITH_LINK,
        canChangeAccessLevel: false,
        enterpriseName: 'Box',
        expirationTimestamp: 0,
        isEditSettingAvailable: true,
        permissionLevel: CAN_EDIT,
        url: 'https://example.com/shared-link'
      },
      sharedLinkEditTooltipTargetingApi: {
        canShow: true,
        onClose: onClose,
        onShow: jest.fn()
      }
    });
    wrapper.find('GuideTooltip').dive().simulate('dismiss');
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  test.each(_templateObject(), CAN_EDIT, 'shared-link-editable-publicly-available-message', CAN_VIEW_DOWNLOAD, 'shared-link-publicly-available-message')('should render correct message based on permissionLevel and when accessLevel is ANYONE_WITH_LINK', function (_ref) {
    var testID = _ref.testID,
        permissionLevel = _ref.permissionLevel;
    var wrapper = getWrapper({
      sharedLink: {
        accessLevel: ANYONE_WITH_LINK,
        canChangeAccessLevel: false,
        enterpriseName: 'Box',
        expirationTimestamp: 0,
        url: 'https://example.com/shared-link',
        permissionLevel: permissionLevel
      }
    });
    expect(wrapper.find("[data-testid=\"".concat(testID, "\"]")).length).toEqual(1);
  });
  test('should render a default component when there is a shared link but user lacks permission to toggle off', function () {
    var wrapper = getWrapper({
      sharedLink: {
        accessLevel: 'peopleInYourCompany',
        canChangeAccessLevel: false,
        enterpriseName: 'Box',
        expirationTimestamp: 0,
        url: 'https://example.com/shared-link'
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render default components with proper tooltip state while submitting request', function () {
    var wrapper = getWrapper({
      sharedLink: {
        url: ''
      },
      submitting: true
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should account for shared link expirations being set', function () {
    var wrapper = getWrapper({
      sharedLink: {
        accessLevel: 'peopleInYourCompany',
        canChangeAccessLevel: true,
        enterpriseName: 'Box',
        expirationTimestamp: 1519404618000,
        url: 'https://example.com/shared-link'
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render settings link when handler is provided and shared link is enabled', function () {
    var wrapper = getWrapper({
      onSettingsClick: jest.fn(),
      sharedLink: {
        accessLevel: 'peopleInYourCompany',
        canChangeAccessLevel: true,
        enterpriseName: 'Box',
        expirationTimestamp: 0,
        url: 'https://example.com/shared-link'
      },
      trackingProps: {
        sharedLinkSettingsButtonProps: {
          'data-resin-target': 'settings'
        }
      }
    });
    var btn = wrapper.find('.shared-link-settings-btn');
    btn.simulate('click');
    expect(btn).toMatchSnapshot();
  });
  test('should not render settings link when handler not provided', function () {
    var wrapper = getWrapper({
      sharedLink: {
        accessLevel: 'peopleInYourCompany',
        canChangeAccessLevel: true,
        enterpriseName: 'Box',
        expirationTimestamp: 0,
        url: 'https://example.com/shared-link'
      },
      onSettingsClick: undefined
    });
    expect(wrapper.find('.shared-link-settings-btn').length).toBe(0);
  });
  test('should render proper dropdown override when viewing an editable box note', function () {
    var wrapper = getWrapper({
      item: _objectSpread({
        accessLevel: 'peopleInYourCompany',
        description: 'some description',
        extension: 'boxnote',
        id: 12345,
        name: 'text.boxnote',
        type: 'file'
      }, defaultItem),
      sharedLink: {
        isEditAllowed: true,
        url: 'http://example.com/s/abc',
        isNewSharedLink: false
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render without SharedLinkPermissionMenu if access level is "people in item"', function () {
    var wrapper = getWrapper({
      sharedLink: {
        accessLevel: 'peopleInThisItem',
        canChangeAccessLevel: true,
        enterpriseName: 'Box',
        expirationTimestamp: 0,
        url: 'https://example.com/shared-link'
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
  [{
    isDownloadSettingAvailable: true
  }, {
    isDownloadSettingAvailable: false
  }].forEach(function (_ref2) {
    var isDownloadSettingAvailable = _ref2.isDownloadSettingAvailable;
    test('should render proper list of permission options based on the the download setting availability', function () {
      var wrapper = getWrapper({
        sharedLink: {
          accessLevel: 'peopleInYourCompany',
          canChangeAccessLevel: true,
          enterpriseName: 'Box',
          isDownloadSettingAvailable: isDownloadSettingAvailable,
          expirationTimestamp: 0,
          url: 'https://example.com/shared-link'
        }
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
  [{
    isEditSettingAvailable: true
  }, {
    isEditSettingAvailable: false
  }].forEach(function (_ref3) {
    var isEditSettingAvailable = _ref3.isEditSettingAvailable;
    test('should render proper list of permission options based on the the edit setting availability', function () {
      var wrapper = getWrapper({
        sharedLink: {
          accessLevel: 'peopleInYourCompany',
          canChangeAccessLevel: true,
          enterpriseName: 'Box',
          isEditSettingAvailable: isEditSettingAvailable,
          expirationTimestamp: 0,
          url: 'https://example.com/shared-link'
        }
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
  test('should render disabled create shared link message when item share is false and url is empty', function () {
    var sharedLink = {
      url: '',
      canChangeAccessLevel: true
    };
    var item = {
      grantedPermissions: {
        itemShare: false
      }
    };
    var wrapper = getWrapper({
      sharedLink: sharedLink,
      item: item
    });
    var tooltip = wrapper.find('.usm-disabled-message-tooltip');
    expect(tooltip).toMatchSnapshot();
  });
  test('should render disabled remove shared link message when url is not empty and canChangeAccessLevel is false', function () {
    var sharedLink = {
      url: 'https://example.com/shared-link',
      canChangeAccessLevel: false
    };
    var wrapper = getWrapper({
      sharedLink: sharedLink
    });
    var tooltip = wrapper.find('.usm-disabled-message-tooltip');
    expect(tooltip).toMatchSnapshot();
  });
  test.each(_templateObject2(), undefined, true, 'should render email shared link button when config is undefined', {
    foo: 'bar'
  }, true, 'should render email shared link button when config does not contain showEmailSharedLinkForm', {
    showEmailSharedLinkForm: true
  }, true, 'should render email shared link button when config.showEmailSharedLinkForm is true', {
    showEmailSharedLinkForm: false
  }, false, 'should not render email shared link button when config.showEmailSharedLinkForm is false')('$description', function (_ref4) {
    var config = _ref4.config,
        emailButtonExists = _ref4.emailButtonExists;
    var sharedLink = {
      url: 'https://example.com/shared-link'
    };
    var wrapper = getWrapper({
      config: config,
      sharedLink: sharedLink
    });
    expect(wrapper.exists('.email-shared-link-btn')).toBe(emailButtonExists);
  });
  describe('componentDidMount()', function () {
    test('should attempt shared link creation when component is mounted with initial, empty shared link data', function () {
      var sharedLink = {
        url: '',
        isNewSharedLink: false
      };
      var addSharedLink = jest.fn();
      var wrapper = getWrapper({
        addSharedLink: addSharedLink,
        submitting: false,
        autoCreateSharedLink: true,
        sharedLink: sharedLink
      });
      expect(addSharedLink).toBeCalledTimes(1);
      expect(wrapper.state().isAutoCreatingSharedLink).toBe(true);
    });
    test('should note attempt shared link creation when component is mounted with a shared link', function () {
      var sharedLink = {
        url: 'sftp://example.org/',
        isNewSharedLink: false
      };
      var addSharedLink = jest.fn();
      var wrapper = getWrapper({
        addSharedLink: addSharedLink,
        submitting: false,
        autoCreateSharedLink: true,
        sharedLink: sharedLink
      });
      expect(addSharedLink).toBeCalledTimes(0);
      expect(wrapper.state().isAutoCreatingSharedLink).toBe(false);
    });
  });
  describe('componentDidUpdate()', function () {
    afterEach(function () {
      global.navigator.clipboard = undefined;
    });
    test('should render correct shared link message when permissionLevel is elevated to CAN_EDIT and accessLevel is ANYONE_IN_COMPANY', function () {
      var sharedLink = {
        accessLevel: ANYONE_IN_COMPANY,
        url: 'http://example.com/',
        isNewSharedLink: false,
        permissionLevel: CAN_VIEW_DOWNLOAD
      };
      var wrapper = getWrapper({
        sharedLink: sharedLink
      });
      wrapper.setProps({
        sharedLink: {
          accessLevel: ANYONE_IN_COMPANY,
          url: 'http://example.com/',
          isNewSharedLink: false,
          permissionLevel: CAN_EDIT
        }
      });
      expect(wrapper.find("[data-testid=\"shared-link-elevated-editable-company-available-message\"]").length).toEqual(1);
    });
    test.each(_templateObject3(), ANYONE_IN_COMPANY, 'updated to a non CAN_EDIT permission', ANYONE_WITH_LINK, 'accessLevel is updated to a non ANYONE_IN_COMPANY access level')('should no longer show warning message after permissionLevel is elevated to CAN_EDIT and then $should', function (_ref5) {
      var accessLevel = _ref5.accessLevel;
      var sharedLink = {
        accessLevel: ANYONE_IN_COMPANY,
        url: 'http://example.com/',
        isNewSharedLink: false,
        permissionLevel: CAN_VIEW_DOWNLOAD
      };
      var wrapper = getWrapper({
        sharedLink: sharedLink
      });
      wrapper.setProps({
        sharedLink: {
          accessLevel: ANYONE_IN_COMPANY,
          url: 'http://example.com/',
          isNewSharedLink: false,
          permissionLevel: CAN_EDIT
        }
      });
      expect(wrapper.find("[data-testid=\"shared-link-elevated-editable-company-available-message\"]").length).toEqual(1);
      wrapper.setProps({
        sharedLink: {
          accessLevel: accessLevel,
          url: 'http://example.com/',
          isNewSharedLink: false,
          permissionLevel: CAN_VIEW_DOWNLOAD
        }
      });
      expect(wrapper.find("[data-testid=\"shared-link-elevated-editable-company-available-message\"]").length).toEqual(0);
    });
    test('should call addSharedLink when modal is triggered to create a URL', function () {
      var sharedLink = {
        url: '',
        isNewSharedLink: false
      };
      var addSharedLink = jest.fn();
      var wrapper = getWrapper({
        addSharedLink: addSharedLink,
        submitting: true,
        autoCreateSharedLink: true,
        sharedLink: sharedLink
      });
      expect(wrapper.state().isAutoCreatingSharedLink).toBe(false);
      wrapper.setProps({
        submitting: false
      });
      expect(addSharedLink).toBeCalledTimes(1);
      expect(wrapper.state().isAutoCreatingSharedLink).toBe(true);
      wrapper.setProps({
        sharedLink: {
          url: 'http://example.com/',
          isNewSharedLink: true
        }
      });
      expect(wrapper.state().isAutoCreatingSharedLink).toBe(false);
    });
    test('should not call addSharedLink when modal is triggered to fetch existing URL', function () {
      var sharedLink = {
        url: 'http://example.com/',
        isNewSharedLink: false
      };
      var addSharedLink = jest.fn();
      var wrapper = getWrapper({
        addSharedLink: addSharedLink,
        submitting: true,
        autoCreateSharedLink: true,
        sharedLink: sharedLink
      });
      expect(wrapper.state().isAutoCreatingSharedLink).toBe(false);
      wrapper.setProps({
        submitting: false
      });
      expect(addSharedLink).toBeCalledTimes(0);
      expect(wrapper.state().isAutoCreatingSharedLink).toBe(false);
    });
    test('should handle attempt to copy when the clipboard API is available and request is successful',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var sharedLink, addSharedLink, onCopyInitMock, onCopySuccessMock, onCopyErrorMock, writeTextSuccessMock, wrapper;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              expect.assertions(6);
              sharedLink = {
                url: '',
                isNewSharedLink: false
              };
              addSharedLink = jest.fn();
              onCopyInitMock = jest.fn();
              onCopySuccessMock = jest.fn();
              onCopyErrorMock = jest.fn();
              writeTextSuccessMock = jest.fn(function () {
                return Promise.resolve();
              });
              navigator.clipboard = {
                writeText: writeTextSuccessMock
              };
              wrapper = getWrapper({
                addSharedLink: addSharedLink,
                autoCreateSharedLink: true,
                onCopyError: onCopyErrorMock,
                onCopyInit: onCopyInitMock,
                onCopySuccess: onCopySuccessMock,
                sharedLink: sharedLink,
                submitting: true,
                triggerCopyOnLoad: true
              });
              wrapper.setProps({
                submitting: false
              });
              wrapper.setProps({
                sharedLink: {
                  url: 'http://example.com/',
                  isNewSharedLink: true
                }
              });
              _context.next = 13;
              return new Promise(function (r) {
                return setTimeout(r, 0);
              });

            case 13:
              expect(onCopyInitMock).toBeCalledTimes(1);
              expect(writeTextSuccessMock).toBeCalledTimes(1);
              expect(onCopySuccessMock).toBeCalledTimes(1);
              expect(wrapper.find('TextInputWithCopyButton').prop('triggerCopyOnLoad')).toBe(true);
              expect(wrapper.state('isCopySuccessful')).toEqual(true);
              expect(onCopyErrorMock).toBeCalledTimes(0);

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    test('should only initiate copy when we specifically request a copy to be triggered', function () {
      var sharedLink = {
        url: '',
        isNewSharedLink: false
      };
      var addSharedLink = jest.fn();
      var onCopyInitMock = jest.fn();
      var onCopySuccessMock = jest.fn();
      var onCopyErrorMock = jest.fn();
      var writeTextSuccessMock = jest.fn(function () {
        return Promise.resolve();
      });
      navigator.clipboard = {
        writeText: writeTextSuccessMock
      };
      var wrapper = getWrapper({
        addSharedLink: addSharedLink,
        autoCreateSharedLink: true,
        autofocusSharedLink: true,
        onCopyError: onCopyErrorMock,
        onCopyInit: onCopyInitMock,
        onCopySuccess: onCopySuccessMock,
        sharedLink: sharedLink,
        submitting: true,
        triggerCopyOnLoad: false
      });
      wrapper.setProps({
        submitting: false
      });
      wrapper.setProps({
        sharedLink: {
          url: 'http://example.com/',
          isNewSharedLink: true
        }
      });
      expect(onCopyInitMock).toBeCalledTimes(0);
      expect(writeTextSuccessMock).toBeCalledTimes(0);
      expect(onCopySuccessMock).toBeCalledTimes(0);
      expect(onCopyErrorMock).toBeCalledTimes(0);
    });
    test('should handle attempt to copy when the clipboard request fails',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var sharedLink, addSharedLink, onCopyInitMock, onCopySuccessMock, onCopyErrorMock, writeTextRejectMock, wrapper;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              expect.assertions(6);
              sharedLink = {
                url: '',
                isNewSharedLink: false
              };
              addSharedLink = jest.fn();
              onCopyInitMock = jest.fn();
              onCopySuccessMock = jest.fn();
              onCopyErrorMock = jest.fn();
              writeTextRejectMock = jest.fn(function () {
                return Promise.reject();
              });
              navigator.clipboard = {
                writeText: writeTextRejectMock
              };
              wrapper = getWrapper({
                addSharedLink: addSharedLink,
                autoCreateSharedLink: true,
                onCopyError: onCopyErrorMock,
                onCopyInit: onCopyInitMock,
                onCopySuccess: onCopySuccessMock,
                sharedLink: sharedLink,
                submitting: true,
                triggerCopyOnLoad: true
              });
              wrapper.setProps({
                submitting: false
              });
              wrapper.setProps({
                sharedLink: {
                  url: 'http://example.com/',
                  isNewSharedLink: true
                }
              });
              _context2.next = 13;
              return new Promise(function (r) {
                return setTimeout(r, 0);
              });

            case 13:
              expect(onCopyInitMock).toBeCalledTimes(1);
              expect(writeTextRejectMock).toBeCalledTimes(1);
              expect(onCopySuccessMock).toBeCalledTimes(0);
              expect(onCopyErrorMock).toBeCalledTimes(1);
              expect(wrapper.find('TextInputWithCopyButton').prop('triggerCopyOnLoad')).toBe(false);
              expect(wrapper.state('isCopySuccessful')).toEqual(false);

            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    test.each(_templateObject4(), false, false, false, 0, 'should not call onShow if user cannot edit and ESL FF is off and canShow is false', true, false, false, 0, 'should not call onShow if user can edit but ESL FF is off and canShow is false', true, true, false, 0, 'should not call onShow if user can edit and ESL FF is on but canShow is false', true, true, true, 1, 'should call onShow if user can edit and ESL FF is on and canShow is true')('$should', function (_ref8) {
      var canShow = _ref8.canShow,
          isAllowEditSharedLinkForFileEnabled = _ref8.isAllowEditSharedLinkForFileEnabled,
          isEditSettingAvailable = _ref8.isEditSettingAvailable,
          expected = _ref8.expected;
      var onShow = jest.fn();
      var onComplete = jest.fn();
      var wrapper = getWrapper({
        isAllowEditSharedLinkForFileEnabled: isAllowEditSharedLinkForFileEnabled,
        sharedLink: {
          accessLevel: ANYONE_WITH_LINK,
          canChangeAccessLevel: false,
          enterpriseName: 'Box',
          expirationTimestamp: 0,
          isEditSettingAvailable: isEditSettingAvailable,
          permissionLevel: CAN_EDIT,
          url: 'https://example.com/shared-link'
        },
        sharedLinkEditTooltipTargetingApi: {
          canShow: false,
          onComplete: onComplete,
          onShow: onShow
        }
      });
      wrapper.setProps({
        sharedLinkEditTooltipTargetingApi: {
          canShow: canShow,
          onComplete: onComplete,
          onShow: onShow
        }
      });
      expect(onShow).toHaveBeenCalledTimes(expected);
    });
  });
});