function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            filterTerm                      | description\n            ", "             | ", "\n            ", "       | ", "\n            ", " | ", "\n            ", "               | ", "\n        "]);

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
import API from '../../../api';
import useContactsByEmail from '../hooks/useContactsByEmail';
import { MOCK_CONTACTS_API_RESPONSE, MOCK_CONTACTS_BY_EMAIL_CONVERTED_RESPONSE, MOCK_ITEM_ID } from '../../../features/unified-share-modal/utils/__mocks__/USMMocks';
var handleSuccess = jest.fn();
var handleError = jest.fn();
var transformUsersSpy = jest.fn().mockReturnValue(MOCK_CONTACTS_BY_EMAIL_CONVERTED_RESPONSE);

var createAPIMock = function createAPIMock(markerBasedUsersAPI) {
  return {
    getMarkerBasedUsersAPI: jest.fn().mockReturnValue(markerBasedUsersAPI)
  };
};

function FakeComponent(_ref) {
  var api = _ref.api,
      transformUsers = _ref.transformUsers;

  var _React$useState = React.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      getContactsByEmail = _React$useState2[0],
      setGetContactsByEmail = _React$useState2[1];

  var updatedGetContactsByEmailFn = useContactsByEmail(api, MOCK_ITEM_ID, {
    handleSuccess: handleSuccess,
    handleError: handleError,
    transformUsers: transformUsers
  });

  if (updatedGetContactsByEmailFn && !getContactsByEmail) {
    setGetContactsByEmail(function () {
      return updatedGetContactsByEmailFn;
    });
  }

  return getContactsByEmail && React.createElement("button", {
    onClick: getContactsByEmail,
    type: "submit"
  }, "\u266B Box UI Elements \u266B");
}

FakeComponent.propTypes = {
  api: function api() {
    return (typeof API === "function" ? PropTypes.instanceOf(API).isRequired : PropTypes.any.isRequired).apply(this, arguments);
  },
  transformUsers: PropTypes.func.isRequired
};
var MOCK_EMAIL = 'contentsharing@box.com';
describe('elements/content-sharing/hooks/useContactsByEmail', function () {
  var getUsersInEnterprise;
  var mockAPI;
  describe('with a successful API call', function () {
    beforeAll(function () {
      getUsersInEnterprise = jest.fn().mockImplementation(function (itemID, getUsersInEnterpriseSuccess) {
        return getUsersInEnterpriseSuccess(MOCK_CONTACTS_API_RESPONSE);
      });
      mockAPI = createAPIMock({
        getUsersInEnterprise: getUsersInEnterprise
      });
    });
    test('should set the value of getContactsByEmail() and retrieve contacts on invocation', function () {
      var fakeComponent;
      act(function () {
        fakeComponent = mount(React.createElement(FakeComponent, {
          api: mockAPI,
          transformUsers: transformUsersSpy
        }));
      });
      fakeComponent.update();
      var contacts = fakeComponent.find('button').invoke('onClick')({
        emails: [MOCK_EMAIL]
      });
      expect(getUsersInEnterprise).toHaveBeenCalledWith(MOCK_ITEM_ID, expect.anything(Function), expect.anything(Function), {
        filter_term: MOCK_EMAIL
      });
      expect(handleSuccess).toHaveBeenCalledWith(MOCK_CONTACTS_API_RESPONSE);
      expect(transformUsersSpy).toHaveBeenCalledWith(MOCK_CONTACTS_API_RESPONSE);
      return expect(contacts).resolves.toEqual(MOCK_CONTACTS_BY_EMAIL_CONVERTED_RESPONSE);
    });
    test('should return the entries from the API data if transformUsers() is not provided', function () {
      var fakeComponent;
      act(function () {
        fakeComponent = mount(React.createElement(FakeComponent, {
          api: mockAPI
        }));
      });
      fakeComponent.update();
      var contacts = fakeComponent.find('button').invoke('onClick')({
        emails: [MOCK_EMAIL]
      });
      expect(getUsersInEnterprise).toHaveBeenCalledWith(MOCK_ITEM_ID, expect.anything(Function), expect.anything(Function), {
        filter_term: MOCK_EMAIL
      });
      expect(handleSuccess).toHaveBeenCalledWith(MOCK_CONTACTS_API_RESPONSE);
      expect(transformUsersSpy).not.toHaveBeenCalled();
      expect(contacts).resolves.toEqual(MOCK_CONTACTS_API_RESPONSE.entries);
    });
    test('should set the value of getContactsByEmail() to an empty object when no results are found', function () {
      var EMPTY_USERS = {
        entries: []
      };
      getUsersInEnterprise = jest.fn().mockImplementation(function (itemID, getUsersInEnterpriseSuccess) {
        return getUsersInEnterpriseSuccess(EMPTY_USERS);
      });
      mockAPI = createAPIMock({
        getUsersInEnterprise: getUsersInEnterprise
      });
      var fakeComponent;
      act(function () {
        fakeComponent = mount(React.createElement(FakeComponent, {
          api: mockAPI,
          transformUsers: transformUsersSpy
        }));
      });
      fakeComponent.update();
      var contacts = fakeComponent.find('button').invoke('onClick')({
        emails: [MOCK_EMAIL]
      });
      expect(handleSuccess).toHaveBeenCalledWith(EMPTY_USERS);
      expect(transformUsersSpy).not.toHaveBeenCalled();
      return expect(contacts).resolves.toEqual({});
    });
    test.each(_templateObject(), 'contentsharing', 'not an object', {
      content: 'sharing'
    }, 'an object, but does not have an emails key', {
      emails: 'contentsharing'
    }, 'an object with the emails key, but filterTerm.emails is not an array', {
      emails: []
    }, 'an object with the emails key, but filterTerm.emails is an empty array')('should return an empty object when filterTerm is $description', function (_ref2) {
      var filterTerm = _ref2.filterTerm;
      var fakeComponent;
      act(function () {
        fakeComponent = mount(React.createElement(FakeComponent, {
          api: mockAPI
        }));
      });
      fakeComponent.update();
      var contacts = fakeComponent.find('button').invoke('onClick')(filterTerm);
      expect(getUsersInEnterprise).not.toHaveBeenCalled();
      expect(handleError).not.toHaveBeenCalled();
      return expect(contacts).resolves.toEqual({});
    });
  });
  describe('with a failed API call', function () {
    beforeAll(function () {
      getUsersInEnterprise = jest.fn().mockImplementation(function (itemID, getUsersInEnterpriseSuccess, getUsersInEnterpriseError) {
        return getUsersInEnterpriseError();
      });
      mockAPI = createAPIMock({
        getUsersInEnterprise: getUsersInEnterprise
      });
    });
    test('should set the value of getContactsByEmail() and call handleError() when invoked', function () {
      var fakeComponent;
      act(function () {
        fakeComponent = mount(React.createElement(FakeComponent, {
          api: mockAPI,
          transformUsers: transformUsersSpy
        }));
      });
      fakeComponent.update();
      var contacts = fakeComponent.find('button').invoke('onClick')({
        emails: [MOCK_EMAIL]
      });
      expect(getUsersInEnterprise).toHaveBeenCalledWith(MOCK_ITEM_ID, expect.anything(Function), expect.anything(Function), {
        filter_term: MOCK_EMAIL
      });
      expect(handleError).toHaveBeenCalled();
      expect(contacts).resolves.toBeFalsy();
    });
  });
});
import PropTypes from "prop-types";