function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            groupsResponse                      | usersResponse                 | resolvedResponse                          | description\n            ", "                        | ", "                  | ", "                                     | ", "\n            ", "                               | ", "                         | ", "                                     | ", "\n            ", "                        | ", " | ", "       | ", "\n            ", " | ", "                  | ", " | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import API from '../../../api';
import useContacts from '../hooks/useContacts';
import { MOCK_CONTACTS_API_RESPONSE, MOCK_CONTACTS_CONVERTED_RESPONSE, MOCK_GROUP_CONTACTS_API_RESPONSE, MOCK_GROUP_CONTACTS_CONVERTED_RESPONSE, MOCK_ITEM_ID } from '../../../features/unified-share-modal/utils/__mocks__/USMMocks';
var handleSuccess = jest.fn();
var handleError = jest.fn();
var transformUsersSpy = jest.fn().mockReturnValue(MOCK_CONTACTS_CONVERTED_RESPONSE);
var transformGroupsSpy = jest.fn().mockReturnValue(MOCK_GROUP_CONTACTS_CONVERTED_RESPONSE);

var createAPIMock = function createAPIMock(markerBasedGroupsAPI, markerBasedUsersAPI) {
  return {
    getMarkerBasedGroupsAPI: jest.fn().mockReturnValue(markerBasedGroupsAPI),
    getMarkerBasedUsersAPI: jest.fn().mockReturnValue(markerBasedUsersAPI)
  };
};

function FakeComponent(_ref) {
  var api = _ref.api,
      transformGroups = _ref.transformGroups,
      transformUsers = _ref.transformUsers;

  var _React$useState = React.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      getContacts = _React$useState2[0],
      setGetContacts = _React$useState2[1];

  var updatedGetContactsFn = useContacts(api, MOCK_ITEM_ID, {
    handleSuccess: handleSuccess,
    handleError: handleError,
    transformGroups: transformGroups,
    transformUsers: transformUsers
  });

  if (updatedGetContactsFn && !getContacts) {
    setGetContacts(function () {
      return updatedGetContactsFn;
    });
  }

  return getContacts && React.createElement("button", {
    onClick: getContacts,
    type: "submit"
  }, "\u266B Box UI Elements \u266B");
}

FakeComponent.propTypes = {
  api: function api() {
    return (typeof API === "function" ? PropTypes.instanceOf(API).isRequired : PropTypes.any.isRequired).apply(this, arguments);
  },
  transformGroups: PropTypes.func.isRequired,
  transformUsers: PropTypes.func.isRequired
};
var MOCK_FILTER = 'Elements';
describe('elements/content-sharing/hooks/useContacts', function () {
  var getGroupsInEnterprise;
  var getUsersInEnterprise;
  var mockAPI;
  describe('with successful API calls', function () {
    beforeAll(function () {
      getGroupsInEnterprise = jest.fn().mockImplementation(function (itemID, getGroupsInEnterpriseSuccess) {
        return getGroupsInEnterpriseSuccess(MOCK_GROUP_CONTACTS_API_RESPONSE);
      });
      getUsersInEnterprise = jest.fn().mockImplementation(function (itemID, getUsersInEnterpriseSuccess) {
        return getUsersInEnterpriseSuccess(MOCK_CONTACTS_API_RESPONSE);
      });
      mockAPI = createAPIMock({
        getGroupsInEnterprise: getGroupsInEnterprise
      }, {
        getUsersInEnterprise: getUsersInEnterprise
      });
    });
    test('should set the value of getContacts() and retrieve contacts on invocation', function () {
      var fakeComponent;
      act(function () {
        fakeComponent = mount(React.createElement(FakeComponent, {
          api: mockAPI,
          transformGroups: transformGroupsSpy,
          transformUsers: transformUsersSpy
        }));
      });
      fakeComponent.update();
      var btn = fakeComponent.find('button');
      expect(btn.prop('onClick')).toBeDefined();
      var contacts = btn.invoke('onClick')(MOCK_FILTER);
      expect(getUsersInEnterprise).toHaveBeenCalledWith(MOCK_ITEM_ID, expect.anything(Function), expect.anything(Function), {
        filter_term: MOCK_FILTER
      });
      expect(getGroupsInEnterprise).toHaveBeenCalledWith(MOCK_ITEM_ID, expect.anything(Function), expect.anything(Function), {
        fields: 'name,permissions',
        filter_term: MOCK_FILTER
      });
      expect(handleSuccess).toHaveBeenCalledWith(MOCK_CONTACTS_API_RESPONSE);
      expect(handleSuccess).toHaveBeenCalledWith(MOCK_GROUP_CONTACTS_API_RESPONSE);
      expect(transformGroupsSpy).toHaveBeenCalledWith(MOCK_GROUP_CONTACTS_API_RESPONSE);
      expect(transformUsersSpy).toHaveBeenCalledWith(MOCK_CONTACTS_API_RESPONSE);
      return expect(contacts).resolves.toEqual([].concat(_toConsumableArray(MOCK_CONTACTS_CONVERTED_RESPONSE), _toConsumableArray(MOCK_GROUP_CONTACTS_CONVERTED_RESPONSE)));
    });
    test('should return the entries from the API data if transformUsers() is not provided', function () {
      var fakeComponent;
      act(function () {
        fakeComponent = mount(React.createElement(FakeComponent, {
          api: mockAPI
        }));
      });
      fakeComponent.update();
      var btn = fakeComponent.find('button');
      expect(btn.prop('onClick')).toBeDefined();
      var contacts = btn.invoke('onClick')(MOCK_FILTER);
      expect(getUsersInEnterprise).toHaveBeenCalledWith(MOCK_ITEM_ID, expect.anything(Function), expect.anything(Function), {
        filter_term: MOCK_FILTER
      });
      expect(getGroupsInEnterprise).toHaveBeenCalledWith(MOCK_ITEM_ID, expect.anything(Function), expect.anything(Function), {
        fields: 'name,permissions',
        filter_term: MOCK_FILTER
      });
      expect(handleSuccess).toHaveBeenCalledWith(MOCK_CONTACTS_API_RESPONSE);
      expect(handleSuccess).toHaveBeenCalledWith(MOCK_GROUP_CONTACTS_API_RESPONSE);
      expect(transformGroupsSpy).not.toHaveBeenCalled();
      expect(transformUsersSpy).not.toHaveBeenCalled();
      return expect(contacts).resolves.toEqual([].concat(_toConsumableArray(MOCK_CONTACTS_API_RESPONSE.entries), _toConsumableArray(MOCK_GROUP_CONTACTS_API_RESPONSE.entries)));
    });
    test('should set the value of getContacts() to an empty array when no results are found', function () {
      var EMPTY_GROUPS = {
        entries: []
      };
      var EMPTY_USERS = {
        entries: []
      };
      getGroupsInEnterprise = jest.fn().mockImplementation(function (itemID, getGroupsInEnterpriseSuccess) {
        return getGroupsInEnterpriseSuccess(EMPTY_GROUPS);
      });
      getUsersInEnterprise = jest.fn().mockImplementation(function (itemID, getUsersInEnterpriseSuccess) {
        return getUsersInEnterpriseSuccess(EMPTY_USERS);
      });
      mockAPI = createAPIMock({
        getGroupsInEnterprise: getGroupsInEnterprise
      }, {
        getUsersInEnterprise: getUsersInEnterprise
      });
      var fakeComponent;
      act(function () {
        fakeComponent = mount(React.createElement(FakeComponent, {
          api: mockAPI,
          transformGroups: transformGroupsSpy,
          transformUsers: transformUsersSpy
        }));
      });
      fakeComponent.update();
      var btn = fakeComponent.find('button');
      expect(btn.prop('onClick')).toBeDefined();
      var contacts = btn.invoke('onClick')(MOCK_FILTER);
      expect(handleSuccess).toHaveBeenCalledWith(EMPTY_GROUPS);
      expect(handleSuccess).toHaveBeenCalledWith(EMPTY_USERS);
      expect(transformGroupsSpy).not.toHaveBeenCalled();
      expect(transformUsersSpy).not.toHaveBeenCalled();
      return expect(contacts).resolves.toEqual([]);
    });
    /**
     * A successful API call will always return an entries array. However, the Flow definitions
     * for GroupCollection and UserCollection mark "entries" as optional, so we still need to test
     * for the hypothetical case in which the entries array is undefined.
     */

    test.each(_templateObject(), undefined, undefined, [], 'both responses are undefined', {}, {}, [], 'both responses are defined, but do not contain an entries array', undefined, MOCK_CONTACTS_API_RESPONSE, MOCK_CONTACTS_CONVERTED_RESPONSE, 'users response is defined, and groups response is undefined', MOCK_GROUP_CONTACTS_API_RESPONSE, undefined, MOCK_GROUP_CONTACTS_CONVERTED_RESPONSE, 'groups response is defined, and users response is undefined')('should set the value of getContacts() when $description', function (_ref2) {
      var groupsResponse = _ref2.groupsResponse,
          usersResponse = _ref2.usersResponse,
          resolvedResponse = _ref2.resolvedResponse;
      getGroupsInEnterprise = jest.fn().mockImplementation(function (itemID, getGroupsInEnterpriseSuccess) {
        return getGroupsInEnterpriseSuccess(groupsResponse);
      });
      getUsersInEnterprise = jest.fn().mockImplementation(function (itemID, getUsersInEnterpriseSuccess) {
        return getUsersInEnterpriseSuccess(usersResponse);
      });
      mockAPI = createAPIMock({
        getGroupsInEnterprise: getGroupsInEnterprise
      }, {
        getUsersInEnterprise: getUsersInEnterprise
      });
      var fakeComponent;
      act(function () {
        fakeComponent = mount(React.createElement(FakeComponent, {
          api: mockAPI,
          transformGroups: transformGroupsSpy,
          transformUsers: transformUsersSpy
        }));
      });
      fakeComponent.update();
      var btn = fakeComponent.find('button');
      expect(btn.prop('onClick')).toBeDefined();
      var contacts = btn.invoke('onClick')(MOCK_FILTER);
      return expect(contacts).resolves.toEqual(resolvedResponse);
    });
  });
  describe('with failed API calls', function () {
    beforeAll(function () {
      getGroupsInEnterprise = jest.fn().mockImplementation(function (itemID, getGroupsInEnterpriseSuccess, getGroupsInEnterpriseError) {
        return getGroupsInEnterpriseError();
      });
      getUsersInEnterprise = jest.fn().mockImplementation(function (itemID, getUsersInEnterpriseSuccess, getUsersInEnterpriseError) {
        return getUsersInEnterpriseError();
      });
      mockAPI = createAPIMock({
        getGroupsInEnterprise: getGroupsInEnterprise
      }, {
        getUsersInEnterprise: getUsersInEnterprise
      });
    });
    test('should set the value of getContacts() and call handleError() when invoked', function () {
      var fakeComponent;
      act(function () {
        fakeComponent = mount(React.createElement(FakeComponent, {
          api: mockAPI,
          transformGroups: transformGroupsSpy,
          transformUsers: transformUsersSpy
        }));
      });
      fakeComponent.update();
      var btn = fakeComponent.find('button');
      expect(btn.prop('onClick')).toBeDefined();
      var contacts = btn.invoke('onClick')(MOCK_FILTER);
      expect(getUsersInEnterprise).toHaveBeenCalledWith(MOCK_ITEM_ID, expect.anything(Function), expect.anything(Function), {
        filter_term: MOCK_FILTER
      });
      expect(getGroupsInEnterprise).toHaveBeenCalledWith(MOCK_ITEM_ID, expect.anything(Function), expect.anything(Function), {
        fields: 'name,permissions',
        filter_term: MOCK_FILTER
      });
      expect(handleError).toHaveBeenCalled();
      expect(contacts).resolves.toBeFalsy();
    });
  });
});
import PropTypes from "prop-types";