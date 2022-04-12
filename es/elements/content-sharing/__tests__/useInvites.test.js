function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import API from '../../../api';
import useInvites from '../hooks/useInvites';
import { TYPE_FOLDER } from '../../../constants';
import { MOCK_COLLABS_API_RESPONSE, MOCK_COLLABS_CONVERTED_REQUEST, MOCK_COLLABS_REQUEST_USERS_AND_GROUPS, MOCK_COLLABS_CONVERTED_GROUPS, MOCK_COLLABS_CONVERTED_USERS, MOCK_ITEM_ID } from '../../../features/unified-share-modal/utils/__mocks__/USMMocks';
var itemData = {
  id: MOCK_ITEM_ID,
  type: TYPE_FOLDER
};
var successfulAPIResponse = MOCK_COLLABS_API_RESPONSE.entries[0];
var handleSuccess = jest.fn();
var handleError = jest.fn();
var transformRequestSpy = jest.fn().mockReturnValue(MOCK_COLLABS_CONVERTED_REQUEST);
var transformResponseSpy = jest.fn().mockReturnValue(successfulAPIResponse);

function FakeComponent(_ref) {
  var api = _ref.api,
      transformRequest = _ref.transformRequest,
      transformResponse = _ref.transformResponse;

  var _React$useState = React.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      sendInvites = _React$useState2[0],
      setSendInvites = _React$useState2[1];

  var updatedSendInvitesFn = useInvites(api, MOCK_ITEM_ID, TYPE_FOLDER, {
    handleSuccess: handleSuccess,
    handleError: handleError,
    transformRequest: transformRequest,
    transformResponse: transformResponse
  });

  if (updatedSendInvitesFn && !sendInvites) {
    setSendInvites(function () {
      return updatedSendInvitesFn;
    });
  }

  return sendInvites && React.createElement("button", {
    onClick: sendInvites,
    type: "submit"
  }, "\u266B Box UI Elements \u266B");
}

FakeComponent.propTypes = {
  api: function api() {
    return (typeof API === "function" ? PropTypes.instanceOf(API).isRequired : PropTypes.any.isRequired).apply(this, arguments);
  },
  transformRequest: PropTypes.func.isRequired,
  transformResponse: PropTypes.func.isRequired
};
describe('elements/content-sharing/hooks/useInvites', function () {
  var addCollaboration;
  var mockAPI;
  describe('with successful API calls', function () {
    beforeAll(function () {
      addCollaboration = jest.fn().mockImplementation(function (item, collab, addCollaborationSuccess) {
        addCollaborationSuccess(successfulAPIResponse);
      });
      mockAPI = {
        getCollaborationsAPI: jest.fn().mockReturnValue({
          addCollaboration: addCollaboration
        })
      };
    });
    test('should set the value of sendInvites() and send invites on invocation', function () {
      var fakeComponent;
      act(function () {
        fakeComponent = mount(React.createElement(FakeComponent, {
          api: mockAPI,
          transformRequest: transformRequestSpy,
          transformResponse: transformResponseSpy
        }));
      });
      fakeComponent.update();
      fakeComponent.find('button').invoke('onClick')(MOCK_COLLABS_REQUEST_USERS_AND_GROUPS);
      expect(transformRequestSpy).toHaveBeenCalledWith(MOCK_COLLABS_REQUEST_USERS_AND_GROUPS);
      MOCK_COLLABS_CONVERTED_USERS.forEach(function (user) {
        expect(addCollaboration).toHaveBeenCalledWith(itemData, user, expect.anything(Function), expect.anything(Function));
      });
      MOCK_COLLABS_CONVERTED_GROUPS.forEach(function (group) {
        expect(addCollaboration).toHaveBeenCalledWith(itemData, group, expect.anything(Function), expect.anything(Function));
      });
      expect(handleSuccess).toHaveBeenCalledWith(successfulAPIResponse);
      expect(transformResponseSpy).toHaveBeenCalledWith(successfulAPIResponse);
    });
    test('should return a null Promise if the transformation function is not provided', function () {
      var fakeComponent;
      act(function () {
        fakeComponent = mount(React.createElement(FakeComponent, {
          api: mockAPI
        }));
      });
      fakeComponent.update();
      var sendInvites = fakeComponent.find('button').invoke('onClick')(MOCK_COLLABS_REQUEST_USERS_AND_GROUPS);
      expect(addCollaboration).not.toHaveBeenCalled();
      return expect(sendInvites).resolves.toBeNull();
    });
  });
  describe('with failed API calls', function () {
    beforeAll(function () {
      addCollaboration = jest.fn().mockImplementation(function (item, collab, addCollaborationSuccess, addCollaborationError) {
        addCollaborationError();
      });
      mockAPI = {
        getCollaborationsAPI: jest.fn().mockReturnValue({
          addCollaboration: addCollaboration
        })
      };
    });
    test('should set the value of getContacts() and call handleError() when invoked', function () {
      var fakeComponent;
      act(function () {
        fakeComponent = mount(React.createElement(FakeComponent, {
          api: mockAPI,
          transformRequest: transformRequestSpy,
          transformResponse: transformResponseSpy
        }));
      });
      fakeComponent.update();
      fakeComponent.find('button').invoke('onClick')(MOCK_COLLABS_REQUEST_USERS_AND_GROUPS);
      expect(transformRequestSpy).toHaveBeenCalledWith(MOCK_COLLABS_REQUEST_USERS_AND_GROUPS);
      MOCK_COLLABS_CONVERTED_USERS.forEach(function (user) {
        expect(addCollaboration).toHaveBeenCalledWith(itemData, user, expect.anything(Function), expect.anything(Function));
      });
      MOCK_COLLABS_CONVERTED_GROUPS.forEach(function (group) {
        expect(addCollaboration).toHaveBeenCalledWith(itemData, group, expect.anything(Function), expect.anything(Function));
      });
      expect(handleError).toHaveBeenCalled();
      expect(transformResponseSpy).not.toHaveBeenCalled();
    });
  });
});
import PropTypes from "prop-types";