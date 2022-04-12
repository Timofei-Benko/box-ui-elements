function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            apiName                         | itemType\n            ", "   | ", "\n            ", " | ", "\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            apiName                         | itemType\n            ", "   | ", "\n            ", " | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { FormattedMessage } from 'react-intl';
import SharingNotification from '../SharingNotification';
import { TYPE_FILE, TYPE_FOLDER } from '../../../constants';
import { MOCK_AVATAR_URL_MAP, MOCK_COLLABS_API_RESPONSE, MOCK_COLLABS_CONVERTED_RESPONSE, MOCK_ITEM_ID, MOCK_ITEM_PERMISSIONS, MOCK_OWNER_EMAIL, MOCK_OWNER_ID, MOCK_SHARED_LINK } from '../../../features/unified-share-modal/utils/__mocks__/USMMocks';
import Notification from '../../../components/notification/Notification';
import { DURATION_SHORT } from '../../../components/notification/constants';
import NotificationsWrapper from '../../../components/notification/NotificationsWrapper';
import { convertCollabsResponse } from '../../../features/unified-share-modal/utils/convertData';
jest.mock('../../../api');
jest.mock('../../../features/unified-share-modal/utils/convertData');
describe('elements/content-sharing/SharingNotification', function () {
  var setChangeSharedLinkAccessLevelStub = jest.fn();
  var setChangeSharedLinkPermissionLevelStub = jest.fn();
  var setGetContactsStub = jest.fn();
  var setItemStub = jest.fn();
  var setOnAddLinkStub = jest.fn();
  var setOnRemoveLinkStub = jest.fn();
  var setSharedLinkStub = jest.fn();
  var setCollaboratorsListStub = jest.fn();
  var setOnSubmitSettingsStub = jest.fn();
  var setSendInvitesStub = jest.fn();
  var getAvatarUrlWithAccessTokenStub = jest.fn(function (userID) {
    return "https://api.box.com/2.0/users/".concat(userID, "/avatar?access_token=foo&pic_type=large");
  });

  var createAPIInstance = function createAPIInstance(getCollabStub) {
    return {
      getCollaborationsAPI: jest.fn().mockReturnValue({
        addCollaboration: jest.fn()
      }),
      getFileAPI: jest.fn().mockReturnValue({
        share: jest.fn(),
        updateSharedLink: jest.fn()
      }),
      getFileCollaborationsAPI: jest.fn().mockReturnValue({
        getCollaborations: getCollabStub
      }),
      getFolderAPI: jest.fn().mockReturnValue({
        share: jest.fn(),
        updateSharedLink: jest.fn()
      }),
      getFolderCollaborationsAPI: jest.fn().mockReturnValue({
        getCollaborations: getCollabStub
      }),
      getUsersAPI: jest.fn().mockReturnValue({
        getAvatarUrlWithAccessToken: getAvatarUrlWithAccessTokenStub
      })
    };
  };

  var getWrapper = function getWrapper(props) {
    return mount(React.createElement(SharingNotification, _extends({
      collaboratorsList: null,
      currentUserID: MOCK_OWNER_ID,
      getContacts: null,
      isDownloadAvailable: true,
      itemID: MOCK_ITEM_ID,
      itemType: TYPE_FOLDER,
      ownerEmail: MOCK_OWNER_EMAIL,
      ownerID: MOCK_OWNER_ID,
      permissions: MOCK_ITEM_PERMISSIONS,
      sendInvites: null,
      setChangeSharedLinkAccessLevel: setChangeSharedLinkAccessLevelStub,
      setChangeSharedLinkPermissionLevel: setChangeSharedLinkPermissionLevelStub,
      setCollaboratorsList: setCollaboratorsListStub,
      setGetContacts: setGetContactsStub,
      setItem: setItemStub,
      setOnAddLink: setOnAddLinkStub,
      setOnRemoveLink: setOnRemoveLinkStub,
      setOnSharedLink: setSharedLinkStub,
      setOnSubmitSettings: setOnSubmitSettingsStub,
      setSendInvites: setSendInvitesStub,
      sharedLink: MOCK_SHARED_LINK
    }, props)));
  };

  var apiInstance;
  var getCollaborations;
  describe('component rendering', function () {
    beforeAll(function () {
      getCollaborations = jest.fn();
      apiInstance = createAPIInstance(getCollaborations);
    });
    test('should call state setting functions',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              getWrapper({
                api: apiInstance
              });
              expect(setOnAddLinkStub).toHaveBeenCalled();
              expect(setOnRemoveLinkStub).toHaveBeenCalled();
              expect(setChangeSharedLinkAccessLevelStub).toHaveBeenCalled();
              expect(setChangeSharedLinkPermissionLevelStub).toHaveBeenCalled();
              expect(setGetContactsStub).toHaveBeenCalled();
              expect(setOnSubmitSettingsStub).toHaveBeenCalled();
              expect(setSendInvitesStub).toHaveBeenCalled();

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    test('should render a NotificationsWrapper',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var wrapper;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              wrapper = getWrapper({
                api: apiInstance
              });
              expect(wrapper.exists(NotificationsWrapper)).toBe(true);

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
  });
  describe('with successful GET requests to the Collaborations API', function () {
    beforeAll(function () {
      getCollaborations = jest.fn().mockImplementation(function (id, successFn) {
        return Promise.resolve(MOCK_COLLABS_API_RESPONSE).then(function (response) {
          successFn(response);
        });
      });
      apiInstance = createAPIInstance(getCollaborations);
      convertCollabsResponse.mockReturnValue(MOCK_COLLABS_CONVERTED_RESPONSE);
    });
    test.each(_templateObject(), 'getFileCollaborationsAPI', TYPE_FILE, 'getFolderCollaborationsAPI', TYPE_FOLDER)('should call $apiName().getCollaborations() if itemType is $itemType',
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(_ref4) {
        var itemType, wrapper;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                itemType = _ref4.itemType;
                _context4.next = 3;
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
                            api: apiInstance,
                            itemType: itemType
                          });

                        case 1:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                })));

              case 3:
                wrapper.update();
                expect(getCollaborations).toHaveBeenCalledWith(MOCK_ITEM_ID, expect.anything(), expect.anything());
                expect(convertCollabsResponse).toHaveBeenCalledWith(MOCK_COLLABS_API_RESPONSE, MOCK_AVATAR_URL_MAP, MOCK_OWNER_EMAIL, true);
                expect(setCollaboratorsListStub).toHaveBeenCalledWith(MOCK_COLLABS_CONVERTED_RESPONSE);
                expect(getAvatarUrlWithAccessTokenStub).toHaveBeenCalled();
                expect(wrapper.exists(Notification)).toBe(false);

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }());
  });
  describe('with failed GET requests to the Collaborations API', function () {
    beforeAll(function () {
      getCollaborations = jest.fn().mockImplementation(function (id, successFn, failureFn) {
        return Promise.reject(new Error({
          status: '400'
        })).catch(function (response) {
          failureFn(response);
        });
      });
      apiInstance = createAPIInstance(getCollaborations);
      convertCollabsResponse.mockReturnValue({
        collaborators: []
      });
    });
    test.each(_templateObject2(), 'getFileCollaborationsAPI', TYPE_FILE, 'getFolderCollaborationsAPI', TYPE_FOLDER)('should call $apiName().getCollaborations() if itemType is $itemType',
    /*#__PURE__*/
    function () {
      var _ref6 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(_ref7) {
        var itemType, wrapper, notification;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                itemType = _ref7.itemType;
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
                            api: apiInstance,
                            itemType: itemType
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
                expect(getCollaborations).toHaveBeenCalledWith(MOCK_ITEM_ID, expect.anything(), expect.anything());
                expect(setCollaboratorsListStub).toHaveBeenCalledWith({
                  collaborators: []
                });
                notification = wrapper.find(Notification);
                expect(notification.find(FormattedMessage).at(0).prop('id')).toBe('be.contentSharing.collaboratorsLoadingError');
                expect(notification.prop('duration')).toBe(DURATION_SHORT);

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x2) {
        return _ref6.apply(this, arguments);
      };
    }());
  });
});