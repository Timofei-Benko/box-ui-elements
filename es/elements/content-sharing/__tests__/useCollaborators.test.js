function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import API from '../../../api';
import useCollaborators from '../hooks/useCollaborators';
import { TYPE_FILE, TYPE_FOLDER } from '../../../constants';
import { MOCK_COLLABS_CONVERTED_RESPONSE, MOCK_ITEM_ID } from '../../../features/unified-share-modal/utils/__mocks__/USMMocks';
var handleSuccess = jest.fn().mockReturnValue(MOCK_COLLABS_CONVERTED_RESPONSE);
var handleError = jest.fn();

function FakeComponent(_ref) {
  var api = _ref.api,
      itemType = _ref.itemType;

  var _React$useState = React.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      collaboratorsList = _React$useState2[0],
      setCollaboratorsList = _React$useState2[1];

  var collabsResponse = useCollaborators(api, MOCK_ITEM_ID, itemType, {
    handleSuccess: handleSuccess,
    handleError: handleError
  });

  if (collabsResponse && !collaboratorsList) {
    setCollaboratorsList(JSON.stringify(collabsResponse));
  }

  return collaboratorsList && React.createElement("div", null, collaboratorsList);
}

FakeComponent.propTypes = {
  api: function api() {
    return (typeof API === "function" ? PropTypes.instanceOf(API).isRequired : PropTypes.any.isRequired).apply(this, arguments);
  },
  itemType: PropTypes.string.isRequired
};
var STRINGIFIED_MOCK_RESPONSE = JSON.stringify(MOCK_COLLABS_CONVERTED_RESPONSE);
describe('elements/content-sharing/hooks/useCollaborators', function () {
  var getCollaborations;
  var mockAPI;
  describe('with successful API calls', function () {
    beforeAll(function () {
      getCollaborations = jest.fn().mockImplementation(function (itemID, getCollabsSuccess) {
        getCollabsSuccess(MOCK_COLLABS_CONVERTED_RESPONSE);
      });
      mockAPI = {
        getFileCollaborationsAPI: jest.fn().mockReturnValue({
          getCollaborations: getCollaborations
        }),
        getFolderCollaborationsAPI: jest.fn().mockReturnValue({
          getCollaborations: getCollaborations
        })
      };
    });
    test.each([TYPE_FILE, TYPE_FOLDER])('should return collaborators for %s', function (itemType) {
      var fakeComponent;
      act(function () {
        fakeComponent = mount(React.createElement(FakeComponent, {
          api: mockAPI,
          itemType: itemType
        }));
      });
      fakeComponent.update();
      expect(getCollaborations).toHaveBeenCalledWith(MOCK_ITEM_ID, expect.anything(Function), expect.anything(Function));
      expect(handleSuccess).toHaveBeenCalled();
      expect(fakeComponent.find('div').text()).toBe(STRINGIFIED_MOCK_RESPONSE);
    });
  });
  describe('with failed API calls', function () {
    beforeAll(function () {
      getCollaborations = jest.fn().mockImplementation(function (itemID, getCollabsSuccess, getCollabsError) {
        getCollabsError();
      });
      mockAPI = {
        getFileCollaborationsAPI: jest.fn().mockReturnValue({
          getCollaborations: getCollaborations
        }),
        getFolderCollaborationsAPI: jest.fn().mockReturnValue({
          getCollaborations: getCollaborations
        })
      };
    });
    test.each([TYPE_FILE, TYPE_FOLDER])('should return collaborators for %s', function (itemType) {
      var fakeComponent;
      act(function () {
        fakeComponent = mount(React.createElement(FakeComponent, {
          api: mockAPI,
          itemType: itemType
        }));
      });
      fakeComponent.update();
      expect(getCollaborations).toHaveBeenCalledWith(MOCK_ITEM_ID, expect.anything(Function), expect.anything(Function));
      expect(handleError).toHaveBeenCalled();
      expect(fakeComponent.find('div').text()).toBe(JSON.stringify({
        entries: [],
        next_marker: null
      }));
    });
  });
});
import PropTypes from "prop-types";