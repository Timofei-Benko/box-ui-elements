function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            inputValue                                                    | expectedItems\n            ", "                                            | ", "\n            ", " | ", "\n            ", "               | ", "\n            ", "                          | ", "\n            ", "                                                      | ", "\n            ", "                                             | ", "\n        "]);

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
import { FormattedMessage } from 'react-intl';
import { emailValidator } from '../../../utils/validators';
import { ContactsFieldBase as ContactsField } from '../ContactsField';
import messages from '../messages';
describe('features/unified-share-modal/ContactsField', function () {
  var contactsFromServer = [{
    email: 'w@example.com',
    id: '9875',
    isExternalUser: false,
    name: 'W User',
    type: 'user'
  }, {
    email: 'x@example.com',
    id: '12345',
    isExternalUser: false,
    name: 'X User',
    type: 'group'
  }, {
    email: 'y@example.com',
    id: '23456',
    isExternalUser: true,
    name: 'Y User',
    type: 'user'
  }, {
    email: 'z@example.com',
    id: '34567',
    isExternalUser: false,
    name: 'Z User',
    type: 'user'
  }];
  var expectedContacts = [{
    email: 'x@example.com',
    id: '12345',
    isExternalUser: false,
    text: 'X User',
    type: 'group',
    value: 'x@example.com'
  }, {
    email: 'y@example.com',
    id: '23456',
    isExternalUser: true,
    text: 'Y User',
    type: 'user',
    value: 'y@example.com'
  }, {
    email: 'z@example.com',
    id: '34567',
    isExternalUser: false,
    text: 'Z User',
    type: 'user',
    value: 'z@example.com'
  }];
  var suggestions = {
    // expectedContacts[1]
    '23456': {
      id: '23456',
      userScore: 0.5,
      email: 'y@example.com',
      name: 'Y User',
      type: 'user',
      isExternalUser: false
    },
    // expectedContacts[2]
    '34567': {
      id: '34567',
      userScore: 0.1,
      email: 'z@example.com',
      name: 'Z User',
      type: 'user',
      isExternalUser: true
    }
  };
  var intl = {
    formatMessage: jest.fn()
  };

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(ContactsField, _extends({
      disabled: false,
      error: "",
      fieldRef: {
        current: document.createElement('input')
      },
      getContacts: jest.fn(),
      intl: intl,
      label: React.createElement(FormattedMessage, messages.inviteFieldLabel),
      onContactAdd: jest.fn(),
      onContactRemove: jest.fn(),
      onInput: jest.fn(),
      selectedContacts: expectedContacts,
      validateForError: jest.fn(),
      validator: jest.fn()
    }, props)));
  };

  describe('addSuggestedContacts()', function () {
    test('should sort suggestions by highest score without duplication', function () {
      var wrapper = getWrapper({
        suggestedCollaborators: suggestions
      });
      var result = wrapper.instance().addSuggestedContacts(expectedContacts);
      expect(result.map(function (c) {
        return c.id;
      })).toEqual([expectedContacts[1].id, expectedContacts[2].id, expectedContacts[0].id]);
    });
    test('should setState with number of suggested items showing', function () {
      var wrapper = getWrapper({
        suggestedCollaborators: suggestions
      });
      wrapper.instance().addSuggestedContacts(expectedContacts);
      expect(wrapper.state().numSuggestedShowing).toEqual(2);
    });
  });
  describe('filterContacts()', function () {
    test('should return an empty set when the input value is blank (default)', function () {
      var wrapper = getWrapper();
      wrapper.setState({
        pillSelectorInputValue: ''
      });
      var options = wrapper.instance().filterContacts([]);
      expect(options.length).toEqual(0);
    });
    test('should return the user based on the input value set in state', function () {
      var wrapper = getWrapper({
        selectedContacts: []
      });
      wrapper.setState({
        pillSelectorInputValue: 'x@'
      });
      var options = wrapper.instance().filterContacts(contactsFromServer);
      expect(options.length).toEqual(1);
      expect(options[0]).toEqual(expectedContacts[0]);
    });
    test('should not return the user if that user is already selected', function () {
      var wrapper = getWrapper({
        selectedContacts: [expectedContacts[0]]
      });
      wrapper.setState({
        contacts: [contactsFromServer[0]],
        pillSelectorInputValue: 'x@'
      });
      var options = wrapper.instance().filterContacts(contactsFromServer);
      expect(options.length).toEqual(0);
    });
    test('should only call addSuggestedContacts() when has suggestedCollaborators', function () {
      var wrapper = getWrapper({
        selectedContacts: []
      });
      var addSuggestedContactsMock = jest.fn(function (c) {
        return c;
      });
      wrapper.setState({
        pillSelectorInputValue: 'x@'
      });
      wrapper.instance().addSuggestedContacts = addSuggestedContactsMock;
      wrapper.instance().filterContacts(contactsFromServer);
      expect(addSuggestedContactsMock).not.toHaveBeenCalled();
      wrapper.setProps({
        suggestedCollaborators: {
          '12345': {
            id: 12345
          },
          '23456': {
            id: 23456
          }
        }
      });
      wrapper.instance().filterContacts(contactsFromServer);
      expect(addSuggestedContactsMock).toHaveBeenCalled();
    });
    test('Should return contacts in the correct format', function () {
      var wrapper = getWrapper({
        selectedContacts: [],
        suggestedCollaborators: suggestions
      });
      wrapper.setState({
        pillSelectorInputValue: 'user'
      });
      var result = wrapper.instance().filterContacts(contactsFromServer);
      expect(result).toMatchSnapshot();
    });
  });
  describe('getContactsPromise()', function () {
    test('should set state with contacts',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var getContacts, wrapper;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              getContacts = jest.fn().mockReturnValue(Promise.resolve(contactsFromServer));
              wrapper = getWrapper({
                getContacts: getContacts,
                selectedContacts: []
              });
              wrapper.setState({
                pillSelectorInputValue: 'x@'
              });
              _context.next = 5;
              return wrapper.instance().getContactsPromise('x@');

            case 5:
              expect(wrapper.state('contacts')).toEqual([expectedContacts[0]]);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    test('should return silently if promise gets canceled',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var error, getContacts, wrapper;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              error = new Error();
              error.isCanceled = true;
              getContacts = jest.fn().mockReturnValue(Promise.reject(error));
              wrapper = getWrapper({
                getContacts: getContacts
              });
              wrapper.setState({
                contacts: expectedContacts
              });
              _context2.next = 7;
              return expect(wrapper.instance().getContactsPromise('test')).resolves.toBe(undefined);

            case 7:
              expect(wrapper.state('contacts')).toEqual(expectedContacts);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    test('should rethrow if promise is not canceled',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var err, getContacts, wrapper;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              err = new Error();
              err.isCanceled = false;
              getContacts = jest.fn().mockReturnValue(Promise.reject(err));
              wrapper = getWrapper({
                getContacts: getContacts
              });
              _context3.next = 6;
              return expect(wrapper.instance().getContactsPromise('test')).rejects.toThrow();

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
  describe('handlePillSelectorInput()', function () {
    test('should call getContacts() and set state', function () {
      var getContacts = jest.fn().mockReturnValue(Promise.resolve(contactsFromServer));
      var onInput = jest.fn();
      var wrapper = getWrapper({
        getContacts: getContacts,
        onInput: onInput
      });
      wrapper.instance().handlePillSelectorInput('a');
      expect(wrapper.state('pillSelectorInputValue')).toEqual('a');
      expect(onInput).toHaveBeenCalled();
    });
    test('should get avatar URLs when prop is provided',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var getContacts, getContactAvatarUrlMock, wrapper;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              getContacts = jest.fn().mockReturnValue(Promise.resolve(contactsFromServer));
              getContactAvatarUrlMock = jest.fn(function (contact) {
                return "/test?id=".concat(contact.id);
              });
              wrapper = getWrapper({
                getContactAvatarUrl: getContactAvatarUrlMock,
                getContacts: getContacts,
                showContactAvatars: true
              });
              wrapper.instance().handlePillSelectorInput('w');
              _context4.next = 6;
              return wrapper.instance().getContactsPromise('w');

            case 6:
              expect(wrapper.find('PillSelectorDropdown ContactDatalistItem').props().getContactAvatarUrl).toBeDefined();

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    test('should reset contacts if input is empty',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var getContacts, onInput, wrapper;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              getContacts = jest.fn().mockReturnValue(Promise.resolve(contactsFromServer));
              onInput = jest.fn();
              wrapper = getWrapper({
                getContacts: getContacts,
                onInput: onInput
              });
              wrapper.setState({
                pillSelectorInputValue: ''
              });
              _context5.next = 6;
              return wrapper.instance().handlePillSelectorInput('');

            case 6:
              expect(wrapper.state('contacts')).toEqual([]);
              expect(onInput).toHaveBeenCalled();

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
  });
  describe('parseItems()', function () {
    test.each(_templateObject(), 'a@example.com', ['a@example.com'], 'Foo Bar <fbar@example.com>; Test User <test@example.com>', ['fbar@example.com', 'test@example.com'], 'not_an_email; Test User <test@example.com>', ['test@example.com'], 'malformed,emailtest@example.com', [], '123', [], 'not_an_email', [])('should correctly parse pill selector input "$inputValue" and return $expectedItems', function (_ref6) {
      var inputValue = _ref6.inputValue,
          expectedItems = _ref6.expectedItems;
      var wrapper = getWrapper({
        validator: emailValidator
      });

      var _wrapper$find$props = wrapper.find('PillSelectorDropdown').props(),
          parseItems = _wrapper$find$props.parseItems;

      expect(parseItems(inputValue)).toEqual(expectedItems);
    });
  });
  describe('render', function () {
    test('should render default component', function () {
      var wrapper = getWrapper();
      expect(wrapper).toMatchSnapshot();
    });
    var contactsFromServerLarge = [].concat(contactsFromServer, [{
      email: 'a@example.com',
      id: '12',
      isExternalUser: true,
      name: 'a b',
      type: 'user'
    }, {
      email: 'b@example.com',
      id: '13',
      isExternalUser: false,
      name: 'a b',
      type: 'user'
    }, {
      email: 'c@example.com',
      id: '14',
      isExternalUser: true,
      name: 'a c',
      type: 'user'
    }, {
      email: 'd@example.com',
      id: '14',
      isExternalUser: false,
      name: 'a d',
      type: 'user'
    }, {
      email: 'e@example.com',
      id: '14',
      isExternalUser: true,
      name: 'a e',
      type: 'user'
    }]);
    var getContacts = jest.fn().mockReturnValue(Promise.resolve(contactsFromServerLarge));
    test('should have scrollable dropdown if contacts > 5',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var wrapper;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              wrapper = getWrapper({
                getContacts: getContacts,
                selectedContacts: []
              });
              wrapper.setState({
                pillSelectorInputValue: 'a'
              });
              _context6.next = 4;
              return wrapper.instance().getContactsPromise('a');

            case 4:
              expect(wrapper).toMatchSnapshot();

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
    test('should pass overlayTitle when there are suggested collabs',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var wrapper;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              wrapper = getWrapper({
                getContacts: getContacts,
                suggestedCollaborators: {
                  '12': {
                    id: 12,
                    userScore: 1
                  }
                }
              });
              wrapper.setState({
                pillSelectorInputValue: 'a'
              });
              _context7.next = 4;
              return wrapper.instance().getContactsPromise('a');

            case 4:
              expect(wrapper.find('PillSelectorDropdown').props()).toBeDefined();

            case 5:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
    test('should render divider at the correct index when there are suggested collabs',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      var wrapper;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              wrapper = getWrapper({
                getContacts: getContacts,
                suggestedCollaborators: {
                  '12': {
                    id: 12,
                    userScore: 1
                  }
                }
              });
              wrapper.setState({
                pillSelectorInputValue: 'a'
              });
              _context8.next = 4;
              return wrapper.instance().getContactsPromise('a');

            case 4:
              expect(wrapper.find('PillSelectorDropdown').props().dividerIndex).toBe(1);

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
  });
});