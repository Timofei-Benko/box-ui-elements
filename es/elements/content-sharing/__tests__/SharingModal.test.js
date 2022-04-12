function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n            displayInModal | description\n            ", "        | ", "\n            ", "       | ", "\n        "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n            permissionLevelFromUSM | permissionLevelObjectForAPI\n            ", "   | ", "\n            ", "       | ", "\n        "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n            accessLevelFromUSM   | accessLevelForAPI\n            ", " | ", "\n            ", "  | ", "\n            ", "    | ", "\n        "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n            displayInModal | description\n            ", "        | ", "\n            ", "       | ", "\n        "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n            status   | expectedErrorName\n            ", " | ", "\n            ", " | ", "\n            ", " | ", "\n            ", " | ", "\n            ", " | ", "\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            status   | expectedErrorName\n            ", " | ", "\n            ", " | ", "\n            ", " | ", "\n            ", " | ", "\n            ", " | ", "\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            expirationTimestampInSLSM      | expirationTimestampInUSM  | description\n            ", " | ", " | ", "\n            ", "                        | ", "                   | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { FormattedMessage } from 'react-intl';
import LoadingIndicator from '../../../components/loading-indicator/LoadingIndicator';
import SharingModal from '../SharingModal';
import Notification from '../../../components/notification/Notification';
import { DURATION_SHORT, TYPE_ERROR, TYPE_INFO } from '../../../components/notification/constants';
import SharedLinkSettingsModal from '../../../features/shared-link-settings-modal';
import UnifiedShareModal from '../../../features/unified-share-modal/UnifiedShareModal';
import { ACCESS_COLLAB, ACCESS_COMPANY, ACCESS_NONE, ACCESS_OPEN, PERMISSION_CAN_DOWNLOAD, PERMISSION_CAN_PREVIEW, TYPE_FILE, TYPE_FOLDER } from '../../../constants';
import { CONTENT_SHARING_SHARED_LINK_UPDATE_PARAMS } from '../constants';
import { ANYONE_WITH_LINK, ANYONE_IN_COMPANY, CAN_VIEW_DOWNLOAD, CAN_VIEW_ONLY, PEOPLE_IN_ITEM, INVITEE_PERMISSIONS_FILE, INVITEE_PERMISSIONS_FOLDER } from '../../../features/unified-share-modal/constants';
import { convertCollabsRequest, convertGroupContactsResponse, convertItemResponse, convertUserResponse, convertSharedLinkPermissions, convertSharedLinkSettings, convertUserContactsResponse, convertUserContactsByEmailResponse } from '../../../features/unified-share-modal/utils/convertData';
import { MOCK_COLLABS_REQUEST_USERS_AND_GROUPS, MOCK_COLLABS_CONVERTED_GROUPS, MOCK_COLLABS_CONVERTED_REQUEST, MOCK_COLLABS_CONVERTED_USERS, MOCK_CONTACTS_API_RESPONSE, MOCK_CONTACTS_BY_EMAIL_CONVERTED_RESPONSE, MOCK_CONTACTS_CONVERTED_RESPONSE, MOCK_CONVERTED_ENTERPRISE_USER_DATA, MOCK_CONVERTED_ITEM_DATA, MOCK_CONVERTED_ITEM_DATA_WITHOUT_SHARED_LINK, MOCK_CONVERTED_SETTINGS, MOCK_CONVERTED_USER_DATA, MOCK_GROUP_CONTACTS_API_RESPONSE, MOCK_GROUP_CONTACTS_CONVERTED_RESPONSE, MOCK_ITEM, MOCK_ITEM_API_RESPONSE, MOCK_ITEM_API_RESPONSE_WITHOUT_SHARED_LINK, MOCK_ITEM_ID, MOCK_NORMALIZED_SHARED_LINK_DATA, MOCK_NORMALIZED_SHARED_LINK_DATA_FOR_USM, MOCK_NULL_SHARED_LINK, MOCK_SETTINGS_WITH_ALL_FEATURES, MOCK_SHARED_LINK, MOCK_TIMESTAMP_MILLISECONDS, MOCK_TIMESTAMP_SECONDS, MOCK_USER_API_RESPONSE } from '../../../features/unified-share-modal/utils/__mocks__/USMMocks';
import SharingNotification from '../SharingNotification';
jest.mock('../../../api');
jest.mock('../../../features/unified-share-modal/utils/convertData'); // Stub the queryCommandSupported function, which is used in the Shared Link Settings Modal

global.document.queryCommandSupported = jest.fn();

var createAPIMock = function createAPIMock(fileAPI, folderAPI, usersAPI, collaborationsAPI, markerBasedGroupsAPI, markerBasedUsersAPI) {
  return {
    getFileAPI: jest.fn().mockReturnValue(fileAPI),
    getFileCollaborationsAPI: jest.fn().mockReturnValue({
      getCollaborations: jest.fn()
    }),
    getFolderAPI: jest.fn().mockReturnValue(folderAPI),
    getFolderCollaborationsAPI: jest.fn().mockReturnValue({
      getCollaborations: jest.fn()
    }),
    getUsersAPI: jest.fn().mockReturnValue(_objectSpread({
      getAvatarUrlWithAccessToken: jest.fn()
    }, usersAPI)),
    getCollaborationsAPI: jest.fn().mockReturnValue(collaborationsAPI),
    getMarkerBasedGroupsAPI: jest.fn().mockReturnValue(markerBasedGroupsAPI),
    getMarkerBasedUsersAPI: jest.fn().mockReturnValue(markerBasedUsersAPI)
  };
};

describe('elements/content-sharing/SharingModal', function () {
  // The visibility of the modal is set in the ContentSharing parent element, so we can only test whether the function for closing the modal was called
  var setIsVisibleMock = jest.fn();

  var getWrapper = function getWrapper(props) {
    return mount(React.createElement(SharingModal, _extends({
      isVisible: true,
      itemID: MOCK_ITEM_ID,
      language: "",
      setIsVisible: setIsVisibleMock
    }, props)));
  };

  var createSuccessMock = function createSuccessMock(responseFromAPI) {
    return function (id, successFn) {
      return Promise.resolve(responseFromAPI).then(function (response) {
        successFn(response);
      });
    };
  };

  var createMockItemData = function createMockItemData() {
    var accessLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : PEOPLE_IN_ITEM;
    var permissionLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CAN_VIEW_DOWNLOAD;
    return {
      item: MOCK_ITEM,
      sharedLink: _objectSpread({}, MOCK_NORMALIZED_SHARED_LINK_DATA, {
        accessLevel: accessLevel,
        permissionLevel: permissionLevel
      })
    };
  };

  beforeEach(function () {
    convertItemResponse.mockReturnValue(MOCK_CONVERTED_ITEM_DATA);
    convertUserResponse.mockReturnValue(MOCK_CONVERTED_USER_DATA);
    convertCollabsRequest.mockReturnValue(MOCK_COLLABS_CONVERTED_REQUEST);
  });
  afterEach(function () {
    jest.resetModules();
    jest.restoreAllMocks();
  });
  describe('loading states', function () {
    test.each([null, undefined, '', {}])('should show the LoadingIndicator if the api prop is %p',
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(api) {
        var wrapper;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return act(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee() {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          wrapper = getWrapper({
                            api: api,
                            itemType: TYPE_FILE
                          });

                        case 1:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                })));

              case 2:
                wrapper.update();
                expect(wrapper.exists(LoadingIndicator)).toBe(true);
                expect(wrapper.exists(UnifiedShareModal)).toBe(false);
                expect(wrapper.exists(SharedLinkSettingsModal)).toBe(false);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    test('should show nothing if isVisible is false',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var wrapper;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        wrapper = getWrapper({
                          api: {},
                          isVisible: false,
                          itemType: TYPE_FILE
                        });

                      case 1:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              })));

            case 2:
              wrapper.update();
              expect(wrapper.exists(LoadingIndicator)).toBe(false);
              expect(wrapper.exists(UnifiedShareModal)).toBe(false);
              expect(wrapper.exists(SharedLinkSettingsModal)).toBe(false);

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
  });
  describe('with successful GET requests to the Item and Users API', function () {
    var getUser;
    var getFile;
    var getFolderFields;
    beforeEach(function () {
      getUser = jest.fn().mockImplementation(createSuccessMock(MOCK_USER_API_RESPONSE));
      getFile = jest.fn().mockImplementation(createSuccessMock(MOCK_ITEM_API_RESPONSE));
      getFolderFields = jest.fn().mockImplementation(createSuccessMock(MOCK_ITEM_API_RESPONSE));
    });
    test('should call getFileAPI().getFile() if itemType is "file"',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var api, wrapper, usm;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              api = createAPIMock({
                getFile: getFile
              }, null, {
                getUser: getUser
              });
              _context6.next = 3;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee5() {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        wrapper = getWrapper({
                          api: api,
                          itemType: TYPE_FILE
                        });

                      case 1:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              })));

            case 3:
              wrapper.update();
              usm = wrapper.find(UnifiedShareModal);
              expect(getFile).toHaveBeenCalled();
              expect(convertItemResponse).toHaveBeenCalledWith(MOCK_ITEM_API_RESPONSE);
              expect(usm.prop('item')).toEqual(MOCK_ITEM);
              expect(usm.prop('sharedLink')).toEqual(MOCK_NORMALIZED_SHARED_LINK_DATA_FOR_USM);
              expect(usm.prop('inviteePermissions')).toEqual(INVITEE_PERMISSIONS_FILE);
              expect(wrapper.exists(SharingNotification)).toBe(true);

            case 11:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
    test('should call getFolderAPI().getFolderFields() if itemType is "folder"',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      var api, wrapper, usm;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              api = createAPIMock(null, {
                getFolderFields: getFolderFields
              }, {
                getUser: getUser
              });
              _context8.next = 3;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee7() {
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        wrapper = getWrapper({
                          api: api,
                          itemType: TYPE_FOLDER
                        });

                      case 1:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7);
              })));

            case 3:
              wrapper.update();
              usm = wrapper.find(UnifiedShareModal);
              expect(getFolderFields).toHaveBeenCalled();
              expect(convertItemResponse).toHaveBeenCalledWith(MOCK_ITEM_API_RESPONSE);
              expect(usm.prop('item')).toEqual(MOCK_ITEM);
              expect(usm.prop('sharedLink')).toEqual(MOCK_NORMALIZED_SHARED_LINK_DATA_FOR_USM);
              expect(usm.prop('inviteePermissions')).toEqual(INVITEE_PERMISSIONS_FOLDER);
              expect(wrapper.exists(SharingNotification)).toBe(true);

            case 11:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
    test('should call getUsersAPI().getUser() if item and sharedLink are defined, but currentUserID is not',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10() {
      var api, wrapper, usm;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              api = createAPIMock({
                getFile: getFile
              }, null, {
                getUser: getUser
              });
              _context10.next = 3;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee9() {
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        wrapper = getWrapper({
                          api: api,
                          itemType: TYPE_FILE
                        });

                      case 1:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, _callee9);
              })));

            case 3:
              wrapper.update();
              usm = wrapper.find(UnifiedShareModal);
              expect(getFile).toHaveBeenCalled();
              expect(getUser).toHaveBeenCalled();
              expect(convertUserResponse).toHaveBeenCalledWith(MOCK_USER_API_RESPONSE);
              expect(usm.prop('item')).toEqual(MOCK_ITEM);
              expect(usm.prop('sharedLink')).toEqual(MOCK_NORMALIZED_SHARED_LINK_DATA_FOR_USM);
              expect(wrapper.exists(SharingNotification)).toBe(true);

            case 11:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
    test('should toggle between the Unified Share Modal and the Shared Link Settings Modal',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee14() {
      var api, wrapper, usm, slsm;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              api = createAPIMock({
                getFile: getFile
              }, null, {
                getUser: getUser
              });
              _context14.next = 3;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee11() {
                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        wrapper = getWrapper({
                          api: api,
                          itemType: TYPE_FILE
                        });

                      case 1:
                      case "end":
                        return _context11.stop();
                    }
                  }
                }, _callee11);
              })));

            case 3:
              wrapper.update(); // Check that the Shared Link Settings Modal is hidden on load

              expect(wrapper.exists(SharedLinkSettingsModal)).toBe(false);
              usm = wrapper.find(UnifiedShareModal);
              _context14.next = 8;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee12() {
                return regeneratorRuntime.wrap(function _callee12$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        usm.invoke('onSettingsClick')();

                      case 1:
                      case "end":
                        return _context12.stop();
                    }
                  }
                }, _callee12);
              })));

            case 8:
              wrapper.update(); // Check that the Unified Share Modal disappears and the Shared Link Settings Modal appears

              expect(wrapper.exists(UnifiedShareModal)).toBe(false);
              slsm = wrapper.find(SharedLinkSettingsModal);
              _context14.next = 13;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee13() {
                return regeneratorRuntime.wrap(function _callee13$(_context13) {
                  while (1) {
                    switch (_context13.prev = _context13.next) {
                      case 0:
                        slsm.invoke('onRequestClose')();

                      case 1:
                      case "end":
                        return _context13.stop();
                    }
                  }
                }, _callee13);
              })));

            case 13:
              wrapper.update(); // Check that the Shared Link Settings Modal disappears and the Unified Share Modal appears

              expect(wrapper.exists(SharedLinkSettingsModal)).toBe(false);
              expect(wrapper.exists(UnifiedShareModal)).toBe(true);

            case 16:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    })));
    test('should disable shared link expiration for non-enterprise users',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee17() {
      var api, wrapper, usm, settingsModal;
      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              api = createAPIMock({
                getFile: getFile
              }, null, {
                getUser: getUser
              });
              _context17.next = 3;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee15() {
                return regeneratorRuntime.wrap(function _callee15$(_context15) {
                  while (1) {
                    switch (_context15.prev = _context15.next) {
                      case 0:
                        wrapper = getWrapper({
                          api: api,
                          itemType: TYPE_FILE
                        });

                      case 1:
                      case "end":
                        return _context15.stop();
                    }
                  }
                }, _callee15);
              })));

            case 3:
              wrapper.update();
              usm = wrapper.find(UnifiedShareModal);
              _context17.next = 7;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee16() {
                return regeneratorRuntime.wrap(function _callee16$(_context16) {
                  while (1) {
                    switch (_context16.prev = _context16.next) {
                      case 0:
                        usm.invoke('onSettingsClick')();

                      case 1:
                      case "end":
                        return _context16.stop();
                    }
                  }
                }, _callee16);
              })));

            case 7:
              wrapper.update();
              settingsModal = wrapper.find(SharedLinkSettingsModal);
              expect(settingsModal.prop('canChangeExpiration')).toBe(false);

            case 10:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    })));
    test('should enable shared link expiration for enterprise users',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee20() {
      var api, wrapper, usm, settingsModal;
      return regeneratorRuntime.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              convertUserResponse.mockReturnValue(MOCK_CONVERTED_ENTERPRISE_USER_DATA);
              api = createAPIMock({
                getFile: getFile
              }, null, {
                getUser: getUser
              });
              _context20.next = 4;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee18() {
                return regeneratorRuntime.wrap(function _callee18$(_context18) {
                  while (1) {
                    switch (_context18.prev = _context18.next) {
                      case 0:
                        wrapper = getWrapper({
                          api: api,
                          itemType: TYPE_FILE
                        });

                      case 1:
                      case "end":
                        return _context18.stop();
                    }
                  }
                }, _callee18);
              })));

            case 4:
              wrapper.update();
              usm = wrapper.find(UnifiedShareModal);
              _context20.next = 8;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee19() {
                return regeneratorRuntime.wrap(function _callee19$(_context19) {
                  while (1) {
                    switch (_context19.prev = _context19.next) {
                      case 0:
                        usm.invoke('onSettingsClick')();

                      case 1:
                      case "end":
                        return _context19.stop();
                    }
                  }
                }, _callee19);
              })));

            case 8:
              wrapper.update();
              settingsModal = wrapper.find(SharedLinkSettingsModal);
              expect(settingsModal.prop('canChangeExpiration')).toBe(true);

            case 11:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20);
    })));
    test('should show the LoadingIndicator while data is being retrieved',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee22() {
      var api, wrapper;
      return regeneratorRuntime.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              api = createAPIMock({
                getFile: getFile
              }, null, {
                getUser: getUser
              });
              _context22.next = 3;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee21() {
                return regeneratorRuntime.wrap(function _callee21$(_context21) {
                  while (1) {
                    switch (_context21.prev = _context21.next) {
                      case 0:
                        wrapper = getWrapper({
                          api: api,
                          itemType: TYPE_FILE
                        });

                      case 1:
                      case "end":
                        return _context21.stop();
                    }
                  }
                }, _callee21);
              })));

            case 3:
              expect(wrapper.exists(LoadingIndicator)).toBe(true);
              wrapper.update();
              expect(wrapper.exists(LoadingIndicator)).toBe(false);
              expect(wrapper.exists(UnifiedShareModal)).toBe(true);

            case 7:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22);
    })));
    test('should call setIsVisible() when the X button is pressed',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee24() {
      var api, wrapper;
      return regeneratorRuntime.wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              api = createAPIMock({
                getFile: getFile
              }, null, {
                getUser: getUser
              });
              _context24.next = 3;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee23() {
                return regeneratorRuntime.wrap(function _callee23$(_context23) {
                  while (1) {
                    switch (_context23.prev = _context23.next) {
                      case 0:
                        wrapper = getWrapper({
                          api: api,
                          displayInModal: true,
                          itemType: TYPE_FILE
                        });

                      case 1:
                      case "end":
                        return _context23.stop();
                    }
                  }
                }, _callee23);
              })));

            case 3:
              wrapper.update();
              act(function () {
                wrapper.find(UnifiedShareModal).invoke('onRequestClose')();
              });
              wrapper.update();
              expect(setIsVisibleMock).toHaveBeenCalledWith(false);

            case 7:
            case "end":
              return _context24.stop();
          }
        }
      }, _callee24);
    })));
    test.each(_templateObject(), MOCK_TIMESTAMP_MILLISECONDS, MOCK_TIMESTAMP_SECONDS, 'defined', null, null, 'null')('should set the correct timestamp props when sharedLink.expirationTimestamp is $description',
    /*#__PURE__*/
    function () {
      var _ref25 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee27(_ref26) {
        var expirationTimestampInSLSM, expirationTimestampInUSM, sharedLink, api, wrapper, usm;
        return regeneratorRuntime.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                expirationTimestampInSLSM = _ref26.expirationTimestampInSLSM, expirationTimestampInUSM = _ref26.expirationTimestampInUSM;
                sharedLink = _objectSpread({}, MOCK_SHARED_LINK, {
                  expirationTimestamp: expirationTimestampInSLSM
                });
                convertItemResponse.mockReturnValue(_objectSpread({}, MOCK_CONVERTED_ITEM_DATA, {
                  sharedLink: sharedLink
                }));
                api = createAPIMock({
                  getFile: getFile
                }, null, {
                  getUser: getUser
                });
                _context27.next = 6;
                return act(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee25() {
                  return regeneratorRuntime.wrap(function _callee25$(_context25) {
                    while (1) {
                      switch (_context25.prev = _context25.next) {
                        case 0:
                          wrapper = getWrapper({
                            api: api,
                            itemType: TYPE_FILE
                          });

                        case 1:
                        case "end":
                          return _context25.stop();
                      }
                    }
                  }, _callee25);
                })));

              case 6:
                wrapper.update();
                usm = wrapper.find(UnifiedShareModal);
                expect(usm.prop('sharedLink').expirationTimestamp).toBe(expirationTimestampInUSM);
                _context27.next = 11;
                return act(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee26() {
                  return regeneratorRuntime.wrap(function _callee26$(_context26) {
                    while (1) {
                      switch (_context26.prev = _context26.next) {
                        case 0:
                          usm.invoke('onSettingsClick')();

                        case 1:
                        case "end":
                          return _context26.stop();
                      }
                    }
                  }, _callee26);
                })));

              case 11:
                wrapper.update();
                expect(wrapper.find(SharedLinkSettingsModal).prop('expirationTimestamp')).toBe(expirationTimestampInSLSM);

              case 13:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27);
      }));

      return function (_x2) {
        return _ref25.apply(this, arguments);
      };
    }());
  });
  describe('with failed GET requests to the Item and/or Users API', function () {
    var api;
    var getFile;
    var getFolderFields;
    var getUser;
    beforeEach(function () {
      getFile = jest.fn().mockImplementation(function (id, successFn, failureFn) {
        return Promise.reject(new Error({
          status: '400'
        })).catch(function (response) {
          failureFn(response);
        });
      });
      getFolderFields = jest.fn().mockImplementation(function (id, successFn, failureFn) {
        return Promise.reject(new Error({
          status: '400'
        })).catch(function (response) {
          failureFn(response);
        });
      });
      getUser = jest.fn();
      api = createAPIMock({
        getFile: getFile
      }, {
        getFolderFields: getFolderFields
      }, {
        getUser: getUser
      });
    });
    test('should show the initial data error notification and skip the call to getUser() if the call to getFile() fails',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee29() {
      var wrapper;
      return regeneratorRuntime.wrap(function _callee29$(_context29) {
        while (1) {
          switch (_context29.prev = _context29.next) {
            case 0:
              _context29.next = 2;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee28() {
                return regeneratorRuntime.wrap(function _callee28$(_context28) {
                  while (1) {
                    switch (_context28.prev = _context28.next) {
                      case 0:
                        wrapper = getWrapper({
                          api: api,
                          itemType: TYPE_FILE
                        });

                      case 1:
                      case "end":
                        return _context28.stop();
                    }
                  }
                }, _callee28);
              })));

            case 2:
              wrapper.update();
              expect(getFile).toHaveBeenCalled();
              expect(getUser).not.toHaveBeenCalled();
              expect(convertItemResponse).not.toHaveBeenCalled();
              expect(wrapper.find(Notification).prop('type')).toBe(TYPE_ERROR);
              expect(wrapper.exists(UnifiedShareModal)).toBe(false);
              expect(wrapper.exists(SharingNotification)).toBe(false);

            case 9:
            case "end":
              return _context29.stop();
          }
        }
      }, _callee29);
    })));
    test('should show the initial data error notification and skip the call to getUser() if the call to getFolderFields() fails',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee31() {
      var wrapper;
      return regeneratorRuntime.wrap(function _callee31$(_context31) {
        while (1) {
          switch (_context31.prev = _context31.next) {
            case 0:
              _context31.next = 2;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee30() {
                return regeneratorRuntime.wrap(function _callee30$(_context30) {
                  while (1) {
                    switch (_context30.prev = _context30.next) {
                      case 0:
                        wrapper = getWrapper({
                          api: api,
                          itemType: TYPE_FOLDER
                        });

                      case 1:
                      case "end":
                        return _context30.stop();
                    }
                  }
                }, _callee30);
              })));

            case 2:
              wrapper.update();
              expect(getFolderFields).toHaveBeenCalled();
              expect(getUser).not.toHaveBeenCalled();
              expect(convertItemResponse).not.toHaveBeenCalled();
              expect(wrapper.find(Notification).prop('type')).toBe(TYPE_ERROR);
              expect(wrapper.exists(UnifiedShareModal)).toBe(false);
              expect(wrapper.exists(SharingNotification)).toBe(false);

            case 9:
            case "end":
              return _context31.stop();
          }
        }
      }, _callee31);
    })));
    test('should show the LoadingIndicator while data is being retrieved',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee33() {
      var wrapper;
      return regeneratorRuntime.wrap(function _callee33$(_context33) {
        while (1) {
          switch (_context33.prev = _context33.next) {
            case 0:
              _context33.next = 2;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee32() {
                return regeneratorRuntime.wrap(function _callee32$(_context32) {
                  while (1) {
                    switch (_context32.prev = _context32.next) {
                      case 0:
                        wrapper = getWrapper({
                          api: api,
                          itemType: TYPE_FOLDER
                        });

                      case 1:
                      case "end":
                        return _context32.stop();
                    }
                  }
                }, _callee32);
              })));

            case 2:
              expect(wrapper.exists(LoadingIndicator)).toBe(true);
              wrapper.update();
              expect(wrapper.exists(LoadingIndicator)).toBe(false);
              expect(wrapper.find(Notification).prop('type')).toBe(TYPE_ERROR);

            case 6:
            case "end":
              return _context33.stop();
          }
        }
      }, _callee33);
    })));
    test('should close the initial data error notification when onClose() is called',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee36() {
      var wrapper;
      return regeneratorRuntime.wrap(function _callee36$(_context36) {
        while (1) {
          switch (_context36.prev = _context36.next) {
            case 0:
              _context36.next = 2;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee34() {
                return regeneratorRuntime.wrap(function _callee34$(_context34) {
                  while (1) {
                    switch (_context34.prev = _context34.next) {
                      case 0:
                        wrapper = getWrapper({
                          api: api,
                          itemType: TYPE_FILE
                        });

                      case 1:
                      case "end":
                        return _context34.stop();
                    }
                  }
                }, _callee34);
              })));

            case 2:
              wrapper.update();
              _context36.next = 5;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee35() {
                return regeneratorRuntime.wrap(function _callee35$(_context35) {
                  while (1) {
                    switch (_context35.prev = _context35.next) {
                      case 0:
                        wrapper.find(Notification).invoke('onClose')();

                      case 1:
                      case "end":
                        return _context35.stop();
                    }
                  }
                }, _callee35);
              })));

            case 5:
              wrapper.update();
              expect(wrapper.exists(Notification)).toBe(false);

            case 7:
            case "end":
              return _context36.stop();
          }
        }
      }, _callee36);
    })));
  });
  describe('with successful item API calls, but an unsuccessful users API call', function () {
    var api;
    var getFile;
    var getFolderFields;
    var getUser;
    beforeEach(function () {
      getFile = jest.fn().mockImplementation(createSuccessMock(MOCK_ITEM_API_RESPONSE));
      getFolderFields = jest.fn().mockImplementation(createSuccessMock(MOCK_ITEM_API_RESPONSE));
      getUser = jest.fn().mockImplementation(function (id, successFn, failureFn) {
        return Promise.reject(new Error({
          status: '400'
        })).catch(function (response) {
          failureFn(response);
        });
      });
      api = createAPIMock({
        getFile: getFile
      }, {
        getFolderFields: getFolderFields
      }, {
        getUser: getUser
      });
    });
    test('should show the initial data error notification if the call to getFile() succeeds, but the call to getUser() fails',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee38() {
      var wrapper;
      return regeneratorRuntime.wrap(function _callee38$(_context38) {
        while (1) {
          switch (_context38.prev = _context38.next) {
            case 0:
              _context38.next = 2;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee37() {
                return regeneratorRuntime.wrap(function _callee37$(_context37) {
                  while (1) {
                    switch (_context37.prev = _context37.next) {
                      case 0:
                        wrapper = getWrapper({
                          api: api,
                          itemType: TYPE_FILE
                        });

                      case 1:
                      case "end":
                        return _context37.stop();
                    }
                  }
                }, _callee37);
              })));

            case 2:
              wrapper.update();
              expect(getFile).toHaveBeenCalled();
              expect(convertItemResponse).toHaveBeenCalledWith(MOCK_ITEM_API_RESPONSE);
              expect(getUser).toHaveBeenCalled();
              expect(convertUserResponse).not.toHaveBeenCalled();
              expect(wrapper.find(Notification).prop('type')).toBe(TYPE_ERROR);
              expect(wrapper.exists(UnifiedShareModal)).toBe(false);
              expect(wrapper.exists(SharingNotification)).toBe(false);

            case 10:
            case "end":
              return _context38.stop();
          }
        }
      }, _callee38);
    })));
    test('should show the initial data error notification if the call to getFolderFields() succeeds, but the call to getUser() fails',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee40() {
      var wrapper;
      return regeneratorRuntime.wrap(function _callee40$(_context40) {
        while (1) {
          switch (_context40.prev = _context40.next) {
            case 0:
              _context40.next = 2;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee39() {
                return regeneratorRuntime.wrap(function _callee39$(_context39) {
                  while (1) {
                    switch (_context39.prev = _context39.next) {
                      case 0:
                        wrapper = getWrapper({
                          api: api,
                          itemType: TYPE_FOLDER
                        });

                      case 1:
                      case "end":
                        return _context39.stop();
                    }
                  }
                }, _callee39);
              })));

            case 2:
              wrapper.update();
              expect(getFolderFields).toHaveBeenCalled();
              expect(convertItemResponse).toHaveBeenCalledWith(MOCK_ITEM_API_RESPONSE);
              expect(getUser).toHaveBeenCalled();
              expect(convertUserResponse).not.toHaveBeenCalled();
              expect(wrapper.find(Notification).prop('type')).toBe(TYPE_ERROR);
              expect(wrapper.exists(UnifiedShareModal)).toBe(false);
              expect(wrapper.exists(SharingNotification)).toBe(false);

            case 10:
            case "end":
              return _context40.stop();
          }
        }
      }, _callee40);
    })));
    test('should show the LoadingIndicator while data is being retrieved',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee42() {
      var wrapper;
      return regeneratorRuntime.wrap(function _callee42$(_context42) {
        while (1) {
          switch (_context42.prev = _context42.next) {
            case 0:
              _context42.next = 2;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee41() {
                return regeneratorRuntime.wrap(function _callee41$(_context41) {
                  while (1) {
                    switch (_context41.prev = _context41.next) {
                      case 0:
                        wrapper = getWrapper({
                          api: api,
                          itemType: TYPE_FOLDER
                        });

                      case 1:
                      case "end":
                        return _context41.stop();
                    }
                  }
                }, _callee41);
              })));

            case 2:
              expect(wrapper.exists(LoadingIndicator)).toBe(true);
              wrapper.update();
              expect(wrapper.exists(LoadingIndicator)).toBe(false);
              expect(wrapper.find(Notification).prop('type')).toBe(TYPE_ERROR);

            case 6:
            case "end":
              return _context42.stop();
          }
        }
      }, _callee42);
    })));
  });
  describe('with specific initial data errors', function () {
    test.each(_templateObject2(), '400', 'badRequestError', '401', 'noAccessError', '403', 'noAccessError', '404', 'notFoundError', '500', 'loadingError')('should show the correct error message when a call fails with a $status and the response is of type "ErrorResponseData"',
    /*#__PURE__*/
    function () {
      var _ref44 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee44(_ref45) {
        var status, expectedErrorName, getFolderFields, getUser, api, wrapper, initialDataErrorNotification;
        return regeneratorRuntime.wrap(function _callee44$(_context44) {
          while (1) {
            switch (_context44.prev = _context44.next) {
              case 0:
                status = _ref45.status, expectedErrorName = _ref45.expectedErrorName;
                getFolderFields = jest.fn().mockImplementation(function (id, successFn, failureFn) {
                  return Promise.reject(new Error()).catch(function () {
                    failureFn({
                      status: status
                    });
                  });
                });
                getUser = jest.fn();
                api = createAPIMock(null, {
                  getFolderFields: getFolderFields
                }, {
                  getUser: getUser
                });
                _context44.next = 6;
                return act(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee43() {
                  return regeneratorRuntime.wrap(function _callee43$(_context43) {
                    while (1) {
                      switch (_context43.prev = _context43.next) {
                        case 0:
                          wrapper = getWrapper({
                            api: api,
                            itemType: TYPE_FOLDER
                          });

                        case 1:
                        case "end":
                          return _context43.stop();
                      }
                    }
                  }, _callee43);
                })));

              case 6:
                wrapper.update();
                expect(getFolderFields).toHaveBeenCalled();
                initialDataErrorNotification = wrapper.find(Notification);
                expect(initialDataErrorNotification.prop('type')).toBe(TYPE_ERROR);
                expect(initialDataErrorNotification.find(FormattedMessage).prop('id')).toBe("be.contentSharing.".concat(expectedErrorName));

              case 11:
              case "end":
                return _context44.stop();
            }
          }
        }, _callee44);
      }));

      return function (_x3) {
        return _ref44.apply(this, arguments);
      };
    }());
    test.each(_templateObject3(), '400', 'badRequestError', '401', 'noAccessError', '403', 'noAccessError', '404', 'notFoundError', '500', 'loadingError')('should show the correct error message when a call fails with a $status and the response is of type "$AxiosError"',
    /*#__PURE__*/
    function () {
      var _ref47 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee46(_ref48) {
        var status, expectedErrorName, getFolderFields, getUser, api, wrapper, initialDataErrorNotification;
        return regeneratorRuntime.wrap(function _callee46$(_context46) {
          while (1) {
            switch (_context46.prev = _context46.next) {
              case 0:
                status = _ref48.status, expectedErrorName = _ref48.expectedErrorName;
                getFolderFields = jest.fn().mockImplementation(function (id, successFn, failureFn) {
                  return Promise.reject(new Error()).catch(function () {
                    failureFn({
                      response: {
                        status: status
                      }
                    });
                  });
                });
                getUser = jest.fn();
                api = createAPIMock(null, {
                  getFolderFields: getFolderFields
                }, {
                  getUser: getUser
                });
                _context46.next = 6;
                return act(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee45() {
                  return regeneratorRuntime.wrap(function _callee45$(_context45) {
                    while (1) {
                      switch (_context45.prev = _context45.next) {
                        case 0:
                          wrapper = getWrapper({
                            api: api,
                            itemType: TYPE_FOLDER
                          });

                        case 1:
                        case "end":
                          return _context45.stop();
                      }
                    }
                  }, _callee45);
                })));

              case 6:
                wrapper.update();
                expect(getFolderFields).toHaveBeenCalled();
                initialDataErrorNotification = wrapper.find(Notification);
                expect(initialDataErrorNotification.prop('type')).toBe(TYPE_ERROR);
                expect(initialDataErrorNotification.find(FormattedMessage).prop('id')).toBe("be.contentSharing.".concat(expectedErrorName));

              case 11:
              case "end":
                return _context46.stop();
            }
          }
        }, _callee46);
      }));

      return function (_x4) {
        return _ref47.apply(this, arguments);
      };
    }());
    test('should show the default error message when a call fails and the response is unparseable',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee48() {
      var getFolderFields, getUser, api, wrapper, initialDataErrorNotification;
      return regeneratorRuntime.wrap(function _callee48$(_context48) {
        while (1) {
          switch (_context48.prev = _context48.next) {
            case 0:
              getFolderFields = jest.fn().mockImplementation(function (id, successFn, failureFn) {
                return Promise.reject(new Error()).catch(function () {
                  failureFn({
                    response: undefined
                  });
                });
              });
              getUser = jest.fn();
              api = createAPIMock(null, {
                getFolderFields: getFolderFields
              }, {
                getUser: getUser
              });
              _context48.next = 5;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee47() {
                return regeneratorRuntime.wrap(function _callee47$(_context47) {
                  while (1) {
                    switch (_context47.prev = _context47.next) {
                      case 0:
                        wrapper = getWrapper({
                          api: api,
                          itemType: TYPE_FOLDER
                        });

                      case 1:
                      case "end":
                        return _context47.stop();
                    }
                  }
                }, _callee47);
              })));

            case 5:
              wrapper.update();
              expect(getFolderFields).toHaveBeenCalled();
              initialDataErrorNotification = wrapper.find(Notification);
              expect(initialDataErrorNotification.prop('type')).toBe(TYPE_ERROR);
              expect(initialDataErrorNotification.find(FormattedMessage).prop('id')).toBe("be.contentSharing.loadingError");

            case 10:
            case "end":
              return _context48.stop();
          }
        }
      }, _callee48);
    })));
  });
  describe('with successful PUT requests to the Item API', function () {
    var _test$each, _test$each2;

    var api;
    var share;
    var updateSharedLink;
    beforeAll(function () {
      share = jest.fn().mockImplementation(function (dataForAPI, accessType, successFn) {
        return Promise.resolve(MOCK_ITEM_API_RESPONSE).then(function (response) {
          successFn(response);
        });
      });
      updateSharedLink = jest.fn().mockImplementation(function (dataForAPI, sharedLinkParams, successFn) {
        return Promise.resolve(MOCK_ITEM_API_RESPONSE).then(function (response) {
          successFn(response);
        });
      });
      api = createAPIMock({
        getFile: jest.fn().mockImplementation(createSuccessMock(MOCK_ITEM_API_RESPONSE_WITHOUT_SHARED_LINK)),
        share: share,
        updateSharedLink: updateSharedLink
      }, {
        getFolderFields: jest.fn().mockImplementation(createSuccessMock(MOCK_ITEM_API_RESPONSE_WITHOUT_SHARED_LINK)),
        share: share,
        updateSharedLink: updateSharedLink
      }, {
        getUser: jest.fn().mockImplementation(createSuccessMock(MOCK_USER_API_RESPONSE))
      });
    });
    test('should call share() from onAddLink() and set a new shared link',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee51() {
      var wrapper, usm;
      return regeneratorRuntime.wrap(function _callee51$(_context51) {
        while (1) {
          switch (_context51.prev = _context51.next) {
            case 0:
              convertItemResponse.mockReturnValue(MOCK_CONVERTED_ITEM_DATA_WITHOUT_SHARED_LINK);
              _context51.next = 3;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee49() {
                return regeneratorRuntime.wrap(function _callee49$(_context49) {
                  while (1) {
                    switch (_context49.prev = _context49.next) {
                      case 0:
                        wrapper = getWrapper({
                          api: api,
                          itemType: TYPE_FOLDER
                        });

                      case 1:
                      case "end":
                        return _context49.stop();
                    }
                  }
                }, _callee49);
              })));

            case 3:
              wrapper.update();
              usm = wrapper.find(UnifiedShareModal);
              expect(usm.prop('sharedLink')).toEqual(MOCK_NULL_SHARED_LINK);
              convertItemResponse.mockReset();
              convertItemResponse.mockReturnValue(MOCK_CONVERTED_ITEM_DATA);
              _context51.next = 10;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee50() {
                return regeneratorRuntime.wrap(function _callee50$(_context50) {
                  while (1) {
                    switch (_context50.prev = _context50.next) {
                      case 0:
                        usm.invoke('onAddLink')();

                      case 1:
                      case "end":
                        return _context50.stop();
                    }
                  }
                }, _callee50);
              })));

            case 10:
              wrapper.update();
              expect(share).toHaveBeenCalledWith({
                id: MOCK_ITEM_ID,
                permissions: {}
              }, undefined, expect.anything(), expect.anything(), CONTENT_SHARING_SHARED_LINK_UPDATE_PARAMS);
              expect(wrapper.find(UnifiedShareModal).prop('sharedLink')).toEqual(MOCK_NORMALIZED_SHARED_LINK_DATA_FOR_USM);

            case 13:
            case "end":
              return _context51.stop();
          }
        }
      }, _callee51);
    })));
    test.each(_templateObject4(), true, 'USM instances', false, 'USF-only instances')('should call share() from onRemoveLink() and remove the existing shared link for $description',
    /*#__PURE__*/
    function () {
      var _ref55 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee54(_ref56) {
        var displayInModal, wrapper, usm;
        return regeneratorRuntime.wrap(function _callee54$(_context54) {
          while (1) {
            switch (_context54.prev = _context54.next) {
              case 0:
                displayInModal = _ref56.displayInModal;
                _context54.next = 3;
                return act(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee52() {
                  return regeneratorRuntime.wrap(function _callee52$(_context52) {
                    while (1) {
                      switch (_context52.prev = _context52.next) {
                        case 0:
                          wrapper = getWrapper({
                            api: api,
                            displayInModal: displayInModal,
                            itemType: TYPE_FILE
                          });

                        case 1:
                        case "end":
                          return _context52.stop();
                      }
                    }
                  }, _callee52);
                })));

              case 3:
                wrapper.update();
                usm = wrapper.find(UnifiedShareModal);
                expect(usm.prop('sharedLink')).toEqual(MOCK_NORMALIZED_SHARED_LINK_DATA_FOR_USM);
                convertItemResponse.mockReset();
                convertItemResponse.mockReturnValue(MOCK_CONVERTED_ITEM_DATA_WITHOUT_SHARED_LINK);
                _context54.next = 10;
                return act(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee53() {
                  return regeneratorRuntime.wrap(function _callee53$(_context53) {
                    while (1) {
                      switch (_context53.prev = _context53.next) {
                        case 0:
                          usm.invoke('onRemoveLink')();

                        case 1:
                        case "end":
                          return _context53.stop();
                      }
                    }
                  }, _callee53);
                })));

              case 10:
                wrapper.update();
                expect(share).toHaveBeenCalledWith({
                  id: MOCK_ITEM_ID,
                  permissions: {}
                }, ACCESS_NONE, expect.anything(), expect.anything(), CONTENT_SHARING_SHARED_LINK_UPDATE_PARAMS);

                if (displayInModal) {
                  expect(setIsVisibleMock).toHaveBeenCalledWith(false);
                } else {
                  expect(wrapper.find(UnifiedShareModal).prop('sharedLink')).toEqual(MOCK_NULL_SHARED_LINK);
                }

              case 13:
              case "end":
                return _context54.stop();
            }
          }
        }, _callee54);
      }));

      return function (_x5) {
        return _ref55.apply(this, arguments);
      };
    }());
    test.each(_templateObject5(), ANYONE_IN_COMPANY, ACCESS_COMPANY, ANYONE_WITH_LINK, ACCESS_OPEN, PEOPLE_IN_ITEM, ACCESS_COLLAB)('should call share() from changeSharedLinkAccessLevel() when given $accessLevelFromUSM access',
    /*#__PURE__*/
    function () {
      var _ref59 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee57(_ref60) {
        var accessLevelFromUSM, accessLevelForAPI, wrapper, usm;
        return regeneratorRuntime.wrap(function _callee57$(_context57) {
          while (1) {
            switch (_context57.prev = _context57.next) {
              case 0:
                accessLevelFromUSM = _ref60.accessLevelFromUSM, accessLevelForAPI = _ref60.accessLevelForAPI;
                _context57.next = 3;
                return act(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee55() {
                  return regeneratorRuntime.wrap(function _callee55$(_context55) {
                    while (1) {
                      switch (_context55.prev = _context55.next) {
                        case 0:
                          wrapper = getWrapper({
                            api: api,
                            itemType: TYPE_FOLDER
                          });

                        case 1:
                        case "end":
                          return _context55.stop();
                      }
                    }
                  }, _callee55);
                })));

              case 3:
                wrapper.update();
                usm = wrapper.find(UnifiedShareModal);
                expect(usm.prop('sharedLink')).toEqual(MOCK_NORMALIZED_SHARED_LINK_DATA_FOR_USM);
                convertItemResponse.mockReset();
                convertItemResponse.mockReturnValue(createMockItemData(accessLevelFromUSM));
                _context57.next = 10;
                return act(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee56() {
                  return regeneratorRuntime.wrap(function _callee56$(_context56) {
                    while (1) {
                      switch (_context56.prev = _context56.next) {
                        case 0:
                          usm.invoke('changeSharedLinkAccessLevel')(accessLevelFromUSM);

                        case 1:
                        case "end":
                          return _context56.stop();
                      }
                    }
                  }, _callee56);
                })));

              case 10:
                wrapper.update();
                expect(share).toHaveBeenCalledWith({
                  id: MOCK_ITEM_ID,
                  permissions: {}
                }, accessLevelForAPI, expect.anything(), expect.anything(), CONTENT_SHARING_SHARED_LINK_UPDATE_PARAMS);
                expect(wrapper.find(UnifiedShareModal).prop('sharedLink')).toEqual(_objectSpread({}, MOCK_NORMALIZED_SHARED_LINK_DATA_FOR_USM, {
                  accessLevel: accessLevelFromUSM
                }));

              case 13:
              case "end":
                return _context57.stop();
            }
          }
        }, _callee57);
      }));

      return function (_x6) {
        return _ref59.apply(this, arguments);
      };
    }());
    test.each(_templateObject6(), CAN_VIEW_DOWNLOAD, (_test$each = {}, _defineProperty(_test$each, PERMISSION_CAN_DOWNLOAD, true), _defineProperty(_test$each, PERMISSION_CAN_PREVIEW, false), _test$each), CAN_VIEW_ONLY, (_test$each2 = {}, _defineProperty(_test$each2, PERMISSION_CAN_DOWNLOAD, false), _defineProperty(_test$each2, PERMISSION_CAN_PREVIEW, true), _test$each2))('should call updateSharedLink() from changeSharedLinkPermissionLevel() when given $permissionLevelFromUSM permission',
    /*#__PURE__*/
    function () {
      var _ref63 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee60(_ref64) {
        var permissionLevelFromUSM, permissionLevelObjectForAPI, wrapper, usm;
        return regeneratorRuntime.wrap(function _callee60$(_context60) {
          while (1) {
            switch (_context60.prev = _context60.next) {
              case 0:
                permissionLevelFromUSM = _ref64.permissionLevelFromUSM, permissionLevelObjectForAPI = _ref64.permissionLevelObjectForAPI;
                convertSharedLinkPermissions.mockReturnValue(permissionLevelObjectForAPI);
                _context60.next = 4;
                return act(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee58() {
                  return regeneratorRuntime.wrap(function _callee58$(_context58) {
                    while (1) {
                      switch (_context58.prev = _context58.next) {
                        case 0:
                          wrapper = getWrapper({
                            api: api,
                            itemType: TYPE_FILE
                          });

                        case 1:
                        case "end":
                          return _context58.stop();
                      }
                    }
                  }, _callee58);
                })));

              case 4:
                wrapper.update();
                usm = wrapper.find(UnifiedShareModal);
                expect(usm.prop('sharedLink')).toEqual(MOCK_NORMALIZED_SHARED_LINK_DATA_FOR_USM);
                convertItemResponse.mockReset();
                convertItemResponse.mockReturnValue(createMockItemData(undefined, permissionLevelFromUSM));
                _context60.next = 11;
                return act(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee59() {
                  return regeneratorRuntime.wrap(function _callee59$(_context59) {
                    while (1) {
                      switch (_context59.prev = _context59.next) {
                        case 0:
                          usm.invoke('changeSharedLinkPermissionLevel')(permissionLevelFromUSM);

                        case 1:
                        case "end":
                          return _context59.stop();
                      }
                    }
                  }, _callee59);
                })));

              case 11:
                wrapper.update();
                expect(updateSharedLink).toHaveBeenCalledWith({
                  id: MOCK_ITEM_ID,
                  permissions: {}
                }, {
                  permissions: permissionLevelObjectForAPI
                }, expect.anything(), expect.anything(), CONTENT_SHARING_SHARED_LINK_UPDATE_PARAMS);
                expect(wrapper.find(UnifiedShareModal).prop('sharedLink')).toEqual(_objectSpread({}, MOCK_NORMALIZED_SHARED_LINK_DATA_FOR_USM, {
                  permissionLevel: permissionLevelFromUSM
                }));

              case 14:
              case "end":
                return _context60.stop();
            }
          }
        }, _callee60);
      }));

      return function (_x7) {
        return _ref63.apply(this, arguments);
      };
    }());
    test('should call updateSharedLink() from onSubmitSettings()',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee64() {
      var wrapper, usm;
      return regeneratorRuntime.wrap(function _callee64$(_context64) {
        while (1) {
          switch (_context64.prev = _context64.next) {
            case 0:
              convertSharedLinkSettings.mockReturnValue(MOCK_CONVERTED_SETTINGS);
              _context64.next = 3;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee61() {
                return regeneratorRuntime.wrap(function _callee61$(_context61) {
                  while (1) {
                    switch (_context61.prev = _context61.next) {
                      case 0:
                        wrapper = getWrapper({
                          api: api,
                          itemType: TYPE_FILE
                        });

                      case 1:
                      case "end":
                        return _context61.stop();
                    }
                  }
                }, _callee61);
              })));

            case 3:
              wrapper.update();
              usm = wrapper.find(UnifiedShareModal);
              expect(usm.prop('sharedLink')).toEqual(MOCK_NORMALIZED_SHARED_LINK_DATA_FOR_USM);
              _context64.next = 8;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee62() {
                return regeneratorRuntime.wrap(function _callee62$(_context62) {
                  while (1) {
                    switch (_context62.prev = _context62.next) {
                      case 0:
                        usm.invoke('onSettingsClick')();

                      case 1:
                      case "end":
                        return _context62.stop();
                    }
                  }
                }, _callee62);
              })));

            case 8:
              wrapper.update();
              convertItemResponse.mockReset();
              convertItemResponse.mockReturnValue({
                item: MOCK_ITEM,
                sharedLink: _objectSpread({}, MOCK_NORMALIZED_SHARED_LINK_DATA, {}, MOCK_CONVERTED_SETTINGS)
              });
              _context64.next = 13;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee63() {
                return regeneratorRuntime.wrap(function _callee63$(_context63) {
                  while (1) {
                    switch (_context63.prev = _context63.next) {
                      case 0:
                        wrapper.find(SharedLinkSettingsModal).invoke('onSubmit')(MOCK_SETTINGS_WITH_ALL_FEATURES);

                      case 1:
                      case "end":
                        return _context63.stop();
                    }
                  }
                }, _callee63);
              })));

            case 13:
              wrapper.update();
              expect(updateSharedLink).toHaveBeenCalledWith({
                id: MOCK_ITEM_ID,
                permissions: {}
              }, MOCK_CONVERTED_SETTINGS, expect.anything(), expect.anything(), CONTENT_SHARING_SHARED_LINK_UPDATE_PARAMS);
              expect(wrapper.find(UnifiedShareModal).prop('sharedLink')).toEqual(_objectSpread({}, MOCK_NORMALIZED_SHARED_LINK_DATA_FOR_USM, {}, MOCK_CONVERTED_SETTINGS));

            case 16:
            case "end":
              return _context64.stop();
          }
        }
      }, _callee64);
    })));
  });
  describe('with successful GET requests to the enterprise users and groups APIs', function () {
    var api;
    var getGroupsInEnterprise;
    var getUsersInEnterprise;
    beforeAll(function () {
      getGroupsInEnterprise = jest.fn().mockImplementation(function (itemID, successFn) {
        return Promise.resolve(MOCK_GROUP_CONTACTS_API_RESPONSE).then(function (response) {
          return successFn(response);
        });
      });
      getUsersInEnterprise = jest.fn().mockImplementation(function (itemID, successFn) {
        return Promise.resolve(MOCK_CONTACTS_API_RESPONSE).then(function (response) {
          return successFn(response);
        });
      });
      api = createAPIMock({
        getFile: jest.fn().mockImplementation(createSuccessMock(MOCK_ITEM_API_RESPONSE))
      }, null, {
        getUser: jest.fn().mockImplementation(createSuccessMock(MOCK_USER_API_RESPONSE))
      }, null, {
        getGroupsInEnterprise: getGroupsInEnterprise
      }, {
        getUsersInEnterprise: getUsersInEnterprise
      });
      convertGroupContactsResponse.mockReturnValue(MOCK_GROUP_CONTACTS_CONVERTED_RESPONSE);
      convertUserContactsResponse.mockReturnValue(MOCK_CONTACTS_CONVERTED_RESPONSE);
      convertUserContactsByEmailResponse.mockReturnValue(MOCK_CONTACTS_BY_EMAIL_CONVERTED_RESPONSE);
    });
    test('should call getUsersInEnterprise() and getGroupsInEnterprise() from getCollaboratorContacts() and return a converted response',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee67() {
      var MOCK_FILTER, wrapper, usm, response;
      return regeneratorRuntime.wrap(function _callee67$(_context67) {
        while (1) {
          switch (_context67.prev = _context67.next) {
            case 0:
              MOCK_FILTER = 'content';
              _context67.next = 3;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee65() {
                return regeneratorRuntime.wrap(function _callee65$(_context65) {
                  while (1) {
                    switch (_context65.prev = _context65.next) {
                      case 0:
                        wrapper = getWrapper({
                          api: api,
                          itemType: TYPE_FILE
                        });

                      case 1:
                      case "end":
                        return _context65.stop();
                    }
                  }
                }, _callee65);
              })));

            case 3:
              wrapper.update();
              usm = wrapper.find(UnifiedShareModal);
              _context67.next = 7;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee66() {
                return regeneratorRuntime.wrap(function _callee66$(_context66) {
                  while (1) {
                    switch (_context66.prev = _context66.next) {
                      case 0:
                        response = usm.invoke('getCollaboratorContacts')(MOCK_FILTER);

                      case 1:
                      case "end":
                        return _context66.stop();
                    }
                  }
                }, _callee66);
              })));

            case 7:
              wrapper.update();
              expect(getUsersInEnterprise).toHaveBeenCalledWith(MOCK_ITEM_ID, expect.anything(), expect.anything(), {
                filter_term: MOCK_FILTER
              });
              expect(getGroupsInEnterprise).toHaveBeenCalledWith(MOCK_ITEM_ID, expect.anything(Function), expect.anything(Function), {
                fields: 'name,permissions',
                filter_term: MOCK_FILTER
              });
              expect(response).resolves.toEqual([].concat(_toConsumableArray(MOCK_CONTACTS_CONVERTED_RESPONSE), _toConsumableArray(MOCK_GROUP_CONTACTS_CONVERTED_RESPONSE)));

            case 11:
            case "end":
              return _context67.stop();
          }
        }
      }, _callee67);
    })));
    test('should call getUsersInEnterprise() from getContactsByEmail() and return a converted response',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee70() {
      var MOCK_EMAIL, wrapper, usm, response;
      return regeneratorRuntime.wrap(function _callee70$(_context70) {
        while (1) {
          switch (_context70.prev = _context70.next) {
            case 0:
              MOCK_EMAIL = 'contentsharing@box.com';
              _context70.next = 3;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee68() {
                return regeneratorRuntime.wrap(function _callee68$(_context68) {
                  while (1) {
                    switch (_context68.prev = _context68.next) {
                      case 0:
                        wrapper = getWrapper({
                          api: api,
                          itemType: TYPE_FILE
                        });

                      case 1:
                      case "end":
                        return _context68.stop();
                    }
                  }
                }, _callee68);
              })));

            case 3:
              wrapper.update();
              usm = wrapper.find(UnifiedShareModal);
              _context70.next = 7;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee69() {
                return regeneratorRuntime.wrap(function _callee69$(_context69) {
                  while (1) {
                    switch (_context69.prev = _context69.next) {
                      case 0:
                        response = usm.invoke('getContactsByEmail')({
                          emails: [MOCK_EMAIL]
                        });

                      case 1:
                      case "end":
                        return _context69.stop();
                    }
                  }
                }, _callee69);
              })));

            case 7:
              wrapper.update();
              expect(getUsersInEnterprise).toHaveBeenCalledWith(MOCK_ITEM_ID, expect.anything(), expect.anything(), {
                filter_term: MOCK_EMAIL
              });
              expect(response).resolves.toEqual(MOCK_CONTACTS_BY_EMAIL_CONVERTED_RESPONSE);

            case 10:
            case "end":
              return _context70.stop();
          }
        }
      }, _callee70);
    })));
  });
  describe('with successful POST requests to the Collaborations API', function () {
    test.each(_templateObject7(), true, 'USM instances', false, 'USF-only instances')('should call addCollaboration() from sendInvites() and show a success notification for $description',
    /*#__PURE__*/
    function () {
      var _ref77 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee73(_ref78) {
        var displayInModal, itemData, addCollaboration, api, wrapper;
        return regeneratorRuntime.wrap(function _callee73$(_context73) {
          while (1) {
            switch (_context73.prev = _context73.next) {
              case 0:
                displayInModal = _ref78.displayInModal;
                itemData = {
                  id: MOCK_ITEM_ID,
                  type: TYPE_FOLDER
                };
                addCollaboration = jest.fn().mockImplementation(function (item, collab, successFn) {
                  return Promise.resolve().then(function () {
                    return successFn();
                  });
                });
                api = createAPIMock(null, {
                  getFolderFields: jest.fn().mockImplementation(createSuccessMock(MOCK_ITEM_API_RESPONSE))
                }, {
                  getUser: jest.fn().mockImplementation(createSuccessMock(MOCK_USER_API_RESPONSE))
                }, {
                  addCollaboration: addCollaboration
                }, null, {
                  getUsersInEnterprise: jest.fn().mockImplementation(createSuccessMock(MOCK_CONTACTS_API_RESPONSE))
                });
                _context73.next = 6;
                return act(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee71() {
                  return regeneratorRuntime.wrap(function _callee71$(_context71) {
                    while (1) {
                      switch (_context71.prev = _context71.next) {
                        case 0:
                          wrapper = getWrapper({
                            api: api,
                            displayInModal: displayInModal,
                            itemType: TYPE_FOLDER
                          });

                        case 1:
                        case "end":
                          return _context71.stop();
                      }
                    }
                  }, _callee71);
                })));

              case 6:
                wrapper.update();
                _context73.next = 9;
                return act(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee72() {
                  return regeneratorRuntime.wrap(function _callee72$(_context72) {
                    while (1) {
                      switch (_context72.prev = _context72.next) {
                        case 0:
                          wrapper.find(UnifiedShareModal).invoke('sendInvites')(MOCK_COLLABS_REQUEST_USERS_AND_GROUPS);

                        case 1:
                        case "end":
                          return _context72.stop();
                      }
                    }
                  }, _callee72);
                })));

              case 9:
                wrapper.update();
                MOCK_COLLABS_CONVERTED_USERS.forEach(function (user) {
                  expect(addCollaboration).toHaveBeenCalledWith(itemData, user, expect.anything(Function), expect.anything(Function));
                });
                MOCK_COLLABS_CONVERTED_GROUPS.forEach(function (group) {
                  expect(addCollaboration).toHaveBeenCalledWith(itemData, group, expect.anything(Function), expect.anything(Function));
                });
                expect(wrapper.find(Notification).prop('type')).toBe(TYPE_INFO);

                if (displayInModal) {
                  expect(setIsVisibleMock).toHaveBeenCalledWith(false);
                }

              case 14:
              case "end":
                return _context73.stop();
            }
          }
        }, _callee73);
      }));

      return function (_x8) {
        return _ref77.apply(this, arguments);
      };
    }());
  });
  describe('with non-blocking failed API requests', function () {
    var api;
    var share;
    var updateSharedLink;
    var getGroupsInEnterprise;
    var getUsersInEnterprise;
    var addCollaboration;

    var createShareFailureMock = function createShareFailureMock() {
      return jest.fn().mockImplementation(function (itemData, otherRequestData, successFn, failureFn) {
        return Promise.reject(new Error({
          status: '400'
        })).catch(function (response) {
          failureFn(response);
        });
      });
    };

    beforeAll(function () {
      share = createShareFailureMock();
      updateSharedLink = createShareFailureMock();
      addCollaboration = createShareFailureMock();
      getGroupsInEnterprise = jest.fn().mockImplementation(function (itemID, successFn, failureFn) {
        return Promise.reject(new Error({
          status: '400'
        })).catch(function (response) {
          failureFn(response);
        });
      });
      getUsersInEnterprise = jest.fn().mockImplementation(function (itemID, successFn, failureFn) {
        return Promise.reject(new Error({
          status: '400'
        })).catch(function (response) {
          failureFn(response);
        });
      });
      api = createAPIMock({
        getFile: jest.fn().mockImplementation(createSuccessMock(MOCK_ITEM_API_RESPONSE_WITHOUT_SHARED_LINK)),
        share: share,
        updateSharedLink: updateSharedLink
      }, {
        getFolderFields: jest.fn().mockImplementation(createSuccessMock(MOCK_ITEM_API_RESPONSE_WITHOUT_SHARED_LINK)),
        share: share,
        updateSharedLink: updateSharedLink
      }, {
        getUser: jest.fn().mockImplementation(createSuccessMock(MOCK_USER_API_RESPONSE))
      }, {
        addCollaboration: addCollaboration
      }, {
        getGroupsInEnterprise: getGroupsInEnterprise
      }, {
        getUsersInEnterprise: getUsersInEnterprise
      });
    });
    test.each(['changeSharedLinkAccessLevel', 'changeSharedLinkPermissionLevel', 'getCollaboratorContacts', 'onAddLink'])('should show an error notification if %s() fails',
    /*#__PURE__*/
    function () {
      var _ref81 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee76(usmFn) {
        var wrapper, notification;
        return regeneratorRuntime.wrap(function _callee76$(_context76) {
          while (1) {
            switch (_context76.prev = _context76.next) {
              case 0:
                _context76.next = 2;
                return act(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee74() {
                  return regeneratorRuntime.wrap(function _callee74$(_context74) {
                    while (1) {
                      switch (_context74.prev = _context74.next) {
                        case 0:
                          wrapper = getWrapper({
                            api: api,
                            itemType: TYPE_FOLDER
                          });

                        case 1:
                        case "end":
                          return _context74.stop();
                      }
                    }
                  }, _callee74);
                })));

              case 2:
                wrapper.update();
                expect(wrapper.exists(Notification)).toBe(false);
                _context76.next = 6;
                return act(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee75() {
                  return regeneratorRuntime.wrap(function _callee75$(_context75) {
                    while (1) {
                      switch (_context75.prev = _context75.next) {
                        case 0:
                          wrapper.find(UnifiedShareModal).invoke("".concat(usmFn))();

                        case 1:
                        case "end":
                          return _context75.stop();
                      }
                    }
                  }, _callee75);
                })));

              case 6:
                wrapper.update();
                notification = wrapper.find(Notification);
                expect(notification.prop('type')).toBe(TYPE_ERROR);
                expect(notification.prop('duration')).toBe(DURATION_SHORT);

              case 10:
              case "end":
                return _context76.stop();
            }
          }
        }, _callee76);
      }));

      return function (_x9) {
        return _ref81.apply(this, arguments);
      };
    }());
    test.each(['onRemoveLink', 'sendInvites'])('should call setIsVisible() and show a notification after %s() fails',
    /*#__PURE__*/
    function () {
      var _ref84 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee79(usmFn) {
        var wrapper, notification;
        return regeneratorRuntime.wrap(function _callee79$(_context79) {
          while (1) {
            switch (_context79.prev = _context79.next) {
              case 0:
                _context79.next = 2;
                return act(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee77() {
                  return regeneratorRuntime.wrap(function _callee77$(_context77) {
                    while (1) {
                      switch (_context77.prev = _context77.next) {
                        case 0:
                          wrapper = getWrapper({
                            api: api,
                            displayInModal: true,
                            itemType: TYPE_FOLDER
                          });

                        case 1:
                        case "end":
                          return _context77.stop();
                      }
                    }
                  }, _callee77);
                })));

              case 2:
                wrapper.update();
                _context79.next = 5;
                return act(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee78() {
                  return regeneratorRuntime.wrap(function _callee78$(_context78) {
                    while (1) {
                      switch (_context78.prev = _context78.next) {
                        case 0:
                          wrapper.find(UnifiedShareModal).invoke("".concat(usmFn))();

                        case 1:
                        case "end":
                          return _context78.stop();
                      }
                    }
                  }, _callee78);
                })));

              case 5:
                wrapper.update();
                expect(setIsVisibleMock).toHaveBeenCalledWith(false);
                notification = wrapper.find(Notification);
                expect(notification.prop('type')).toBe(TYPE_ERROR);
                expect(notification.prop('duration')).toBe(DURATION_SHORT);

              case 10:
              case "end":
                return _context79.stop();
            }
          }
        }, _callee79);
      }));

      return function (_x10) {
        return _ref84.apply(this, arguments);
      };
    }());
    test('should show an error notification if onSubmitSettings() fails',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee83() {
      var wrapper, notification;
      return regeneratorRuntime.wrap(function _callee83$(_context83) {
        while (1) {
          switch (_context83.prev = _context83.next) {
            case 0:
              convertSharedLinkSettings.mockReturnValue(MOCK_CONVERTED_SETTINGS);
              _context83.next = 3;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee80() {
                return regeneratorRuntime.wrap(function _callee80$(_context80) {
                  while (1) {
                    switch (_context80.prev = _context80.next) {
                      case 0:
                        wrapper = getWrapper({
                          api: api,
                          itemType: TYPE_FILE
                        });

                      case 1:
                      case "end":
                        return _context80.stop();
                    }
                  }
                }, _callee80);
              })));

            case 3:
              wrapper.update();
              _context83.next = 6;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee81() {
                return regeneratorRuntime.wrap(function _callee81$(_context81) {
                  while (1) {
                    switch (_context81.prev = _context81.next) {
                      case 0:
                        wrapper.find(UnifiedShareModal).invoke('onSettingsClick')();

                      case 1:
                      case "end":
                        return _context81.stop();
                    }
                  }
                }, _callee81);
              })));

            case 6:
              wrapper.update();
              expect(wrapper.exists(Notification)).toBe(false);
              _context83.next = 10;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee82() {
                return regeneratorRuntime.wrap(function _callee82$(_context82) {
                  while (1) {
                    switch (_context82.prev = _context82.next) {
                      case 0:
                        wrapper.find(SharedLinkSettingsModal).invoke('onSubmit')(MOCK_SETTINGS_WITH_ALL_FEATURES);

                      case 1:
                      case "end":
                        return _context82.stop();
                    }
                  }
                }, _callee82);
              })));

            case 10:
              wrapper.update();
              notification = wrapper.find(Notification);
              expect(notification.prop('type')).toBe(TYPE_ERROR);
              expect(notification.prop('duration')).toBe(DURATION_SHORT);

            case 14:
            case "end":
              return _context83.stop();
          }
        }
      }, _callee83);
    })));
    test('should do nothing if getContactsByEmail() fails',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee86() {
      var MOCK_EMAIL, wrapper, usm, response;
      return regeneratorRuntime.wrap(function _callee86$(_context86) {
        while (1) {
          switch (_context86.prev = _context86.next) {
            case 0:
              MOCK_EMAIL = 'contentsharing@box.com';
              _context86.next = 3;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee84() {
                return regeneratorRuntime.wrap(function _callee84$(_context84) {
                  while (1) {
                    switch (_context84.prev = _context84.next) {
                      case 0:
                        wrapper = getWrapper({
                          api: api,
                          itemType: TYPE_FILE
                        });

                      case 1:
                      case "end":
                        return _context84.stop();
                    }
                  }
                }, _callee84);
              })));

            case 3:
              wrapper.update();
              usm = wrapper.find(UnifiedShareModal);
              _context86.next = 7;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee85() {
                return regeneratorRuntime.wrap(function _callee85$(_context85) {
                  while (1) {
                    switch (_context85.prev = _context85.next) {
                      case 0:
                        response = usm.invoke('getContactsByEmail')({
                          emails: [MOCK_EMAIL]
                        });

                      case 1:
                      case "end":
                        return _context85.stop();
                    }
                  }
                }, _callee85);
              })));

            case 7:
              wrapper.update();
              expect(getUsersInEnterprise).toHaveBeenCalledWith(MOCK_ITEM_ID, expect.anything(), expect.anything(), {
                filter_term: MOCK_EMAIL
              });
              expect(response).resolves.toBeFalsy();
              expect(wrapper.exists(Notification)).toBeFalsy();

            case 11:
            case "end":
              return _context86.stop();
          }
        }
      }, _callee86);
    })));
  });
});