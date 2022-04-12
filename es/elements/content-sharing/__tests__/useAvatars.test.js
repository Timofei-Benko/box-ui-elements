function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n        collaboratorsList                     | description\n        ", "                    | ", "\n        ", " | ", "\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n        collaboratorsList | description\n        ", "           | ", "\n        ", "      | ", "\n        ", "             | ", "\n        ", " | ", "\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        collaboratorsList                                    | avatarURLMap                                                  | description\n        ", " | ", " | ", "\n        ", "                         | ", "                        | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import useAvatars from '../hooks/useAvatars';
import { MOCK_AVATAR_URL_MAP, MOCK_AVATAR_URL_MAP_FOR_INCOMPLETE_ENTRIES, MOCK_COLLABS_API_RESPONSE, MOCK_COLLABS_API_RESPONSE_WITH_INCOMPLETE_ENTRIES, MOCK_ITEM_ID, MOCK_USER_IDS } from '../../../features/unified-share-modal/utils/__mocks__/USMMocks';
import { Collaborations } from '../../../common/types/core';
var getAvatarUrlWithAccessToken = jest.fn(function (userID) {
  return "https://api.box.com/2.0/users/".concat(userID, "/avatar?access_token=foo&pic_type=large");
});
var mockAPI = {
  getUsersAPI: jest.fn().mockReturnValue({
    getAvatarUrlWithAccessToken: getAvatarUrlWithAccessToken
  })
};

function FakeComponent(_ref) {
  var collaboratorsList = _ref.collaboratorsList;

  var _React$useState = React.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      avatarURLMap = _React$useState2[0],
      setAvatarURLMap = _React$useState2[1];

  var retrievedAvatarURLMap = useAvatars(mockAPI, MOCK_ITEM_ID, collaboratorsList);

  if (retrievedAvatarURLMap && !avatarURLMap) {
    setAvatarURLMap(JSON.stringify(retrievedAvatarURLMap));
  }

  return avatarURLMap && React.createElement("div", null, avatarURLMap);
}

FakeComponent.propTypes = {
  collaboratorsList: function collaboratorsList() {
    return (typeof Collaborations === "function" ? PropTypes.instanceOf(Collaborations).isRequired : PropTypes.any.isRequired).apply(this, arguments);
  }
};
describe('elements/content-sharing/hooks/useCollaborators', function () {
  test.each(_templateObject(), MOCK_COLLABS_API_RESPONSE_WITH_INCOMPLETE_ENTRIES, JSON.stringify(MOCK_AVATAR_URL_MAP_FOR_INCOMPLETE_ENTRIES), 'contains some incomplete entries', MOCK_COLLABS_API_RESPONSE, JSON.stringify(MOCK_AVATAR_URL_MAP), 'contains complete entries only')('should return the expected avatar URL map when collaborators list $description',
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(_ref3) {
      var collaboratorsList, avatarURLMap, fakeComponent;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              collaboratorsList = _ref3.collaboratorsList, avatarURLMap = _ref3.avatarURLMap;
              _context2.next = 3;
              return act(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        fakeComponent = mount(React.createElement(FakeComponent, {
                          collaboratorsList: collaboratorsList
                        }));

                      case 1:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              })));

            case 3:
              fakeComponent.update();
              expect(getAvatarUrlWithAccessToken).toHaveBeenCalled();
              expect(fakeComponent.find('div').text()).toBe(avatarURLMap);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
  test('should call getAvatarUrlWithAccessToken() with each user ID',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var fakeComponent;
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
                      fakeComponent = mount(React.createElement(FakeComponent, {
                        collaboratorsList: MOCK_COLLABS_API_RESPONSE
                      }));

                    case 1:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3);
            })));

          case 2:
            fakeComponent.update();
            MOCK_USER_IDS.forEach(function (userID) {
              return expect(getAvatarUrlWithAccessToken).toHaveBeenCalledWith(userID, MOCK_ITEM_ID);
            });

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  test.each(_templateObject2(), null, 'is null', undefined, 'is undefined', {}, 'is an empty object', {
    foo: 'bar'
  }, 'does not have entries')('should not generate avatar URLs when collaborators list $description', function (_ref7) {
    var collaboratorsList = _ref7.collaboratorsList;
    var fakeComponent;
    act(function () {
      fakeComponent = mount(React.createElement(FakeComponent, {
        collaboratorsList: collaboratorsList
      }));
    });
    fakeComponent.update();
    expect(getAvatarUrlWithAccessToken).not.toHaveBeenCalled();
  });
  test.each(_templateObject3(), {
    entries: []
  }, 'has an empty entries array', {
    entries: [null, undefined, '']
  }, 'contains incomplete entries only')('should return an empty object when collaborators list $description',
  /*#__PURE__*/
  function () {
    var _ref8 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(_ref9) {
      var collaboratorsList, fakeComponent;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              collaboratorsList = _ref9.collaboratorsList;
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
                        fakeComponent = mount(React.createElement(FakeComponent, {
                          collaboratorsList: collaboratorsList
                        }));

                      case 1:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              })));

            case 3:
              fakeComponent.update();
              expect(getAvatarUrlWithAccessToken).not.toHaveBeenCalled();
              expect(fakeComponent.find('div').text()).toBe('{}');

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x2) {
      return _ref8.apply(this, arguments);
    };
  }());
});
import PropTypes from "prop-types";