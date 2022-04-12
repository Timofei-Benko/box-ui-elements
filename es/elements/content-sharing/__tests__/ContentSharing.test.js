function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import Button from '../../../components/button/Button';
import { DEFAULT_HOSTNAME_API, TYPE_FOLDER } from '../../../constants';
import { MOCK_ITEM_ID, MOCK_CONVERTED_ITEM_DATA, MOCK_CONVERTED_USER_DATA, MOCK_COLLABS_CONVERTED_RESPONSE } from '../../../features/unified-share-modal/utils/__mocks__/USMMocks';
import SharingModal from '../SharingModal';
import ContentSharing from '../ContentSharing';
jest.mock('../../../features/unified-share-modal/utils/convertData', function () {
  return {
    convertCollabsResponse: jest.fn().mockReturnValue(MOCK_COLLABS_CONVERTED_RESPONSE),
    convertItemResponse: jest.fn().mockReturnValue(MOCK_CONVERTED_ITEM_DATA),
    convertUserResponse: jest.fn().mockReturnValue(MOCK_CONVERTED_USER_DATA)
  };
});
jest.mock('../../../api', function () {
  return jest.fn().mockImplementation(function () {
    return {
      getCollaborationsAPI: jest.fn().mockReturnValue({
        addCollaboration: jest.fn()
      }),
      getFolderAPI: jest.fn().mockReturnValue({
        getFolderFields: jest.fn()
      }),
      getFolderCollaborationsAPI: jest.fn().mockReturnValue({
        getCollaborations: jest.fn()
      }),
      getUsersAPI: jest.fn().mockReturnValue({
        getUser: jest.fn()
      })
    };
  });
});
var MOCK_TOKEN = 'token';
describe('elements/content-sharing/ContentSharing', function () {
  var customButton = React.createElement(Button, null, "Test Button");

  var getWrapper = function getWrapper(props) {
    return mount(React.createElement(ContentSharing, _extends({
      language: ""
    }, props)));
  };

  test('should add an onClick function to a custom button', function () {
    var wrapper;
    act(function () {
      wrapper = getWrapper({
        apiHost: DEFAULT_HOSTNAME_API,
        customButton: customButton,
        displayInModal: true,
        itemID: MOCK_ITEM_ID,
        itemType: TYPE_FOLDER,
        token: MOCK_TOKEN
      });
    });
    wrapper.update();
    expect(wrapper.exists(Button)).toBe(true);
  });
  test('should instantiate SharingModal on button click', function () {
    var wrapper;
    act(function () {
      wrapper = getWrapper({
        apiHost: DEFAULT_HOSTNAME_API,
        customButton: customButton,
        displayInModal: true,
        itemID: MOCK_ITEM_ID,
        itemType: TYPE_FOLDER,
        token: MOCK_TOKEN
      });
    });
    wrapper.update();
    var launchButton = wrapper.find(Button);
    act(function () {
      launchButton.invoke('onClick')();
    });
    wrapper.update();
    expect(wrapper.exists(SharingModal)).toBe(true);
    expect(wrapper.find(SharingModal).prop('isVisible')).toBe(true);
    expect(wrapper.exists(Button)).toBe(true);
  });
  test('should reinstantiate SharingModal', function () {
    var clickLaunchButton = function clickLaunchButton(launchButton, wrapper) {
      act(function () {
        launchButton.invoke('onClick')();
      });
      wrapper.update();
    };

    var setIsVisible = function setIsVisible(wrapper, isVisible) {
      act(function () {
        wrapper.find(SharingModal).invoke('setIsVisible')(isVisible);
      });
      wrapper.update();
    };

    var wrapper;
    act(function () {
      wrapper = getWrapper({
        apiHost: DEFAULT_HOSTNAME_API,
        customButton: customButton,
        displayInModal: true,
        itemID: MOCK_ITEM_ID,
        itemType: TYPE_FOLDER,
        token: MOCK_TOKEN
      });
    });
    wrapper.update();
    var launchButton = wrapper.find(Button);
    clickLaunchButton(launchButton, wrapper); // open modal

    expect(wrapper.exists(SharingModal)).toBe(true);
    expect(wrapper.find(SharingModal).prop('isVisible')).toBe(true);
    setIsVisible(wrapper, false); // close modal

    expect(wrapper.find(SharingModal).prop('isVisible')).toBe(false); // grab a fresh reference to SharingModal

    clickLaunchButton(launchButton, wrapper); // open modal again

    expect(wrapper.find(SharingModal).prop('isVisible')).toBe(true);
    setIsVisible(wrapper, false); // close modal again

    expect(wrapper.find(SharingModal).prop('isVisible')).toBe(false);
  });
  test('should reset isVisible when given a new uuid', function () {
    var setIsVisible = function setIsVisible(wrapper, isVisible) {
      act(function () {
        wrapper.find(SharingModal).invoke('setIsVisible')(isVisible);
      });
      wrapper.update();
    };

    var wrapper;
    act(function () {
      wrapper = getWrapper({
        apiHost: DEFAULT_HOSTNAME_API,
        displayInModal: true,
        itemID: MOCK_ITEM_ID,
        itemType: TYPE_FOLDER,
        token: MOCK_TOKEN,
        uuid: 'unique-id-0'
      });
    });
    wrapper.update();
    expect(wrapper.exists(SharingModal)).toBe(true);
    expect(wrapper.find(SharingModal).prop('isVisible')).toBe(true);
    setIsVisible(wrapper, false); // close modal

    expect(wrapper.find(SharingModal).prop('isVisible')).toBe(false);
    act(function () {
      wrapper.setProps({
        uuid: 'unique-id-1'
      });
    });
    wrapper.update();
    expect(wrapper.find(SharingModal).prop('isVisible')).toBe(true);
  });
  test.each([true, false])('should instantiate SharingModal automatically when no button exists and displayInModal is %s', function (_ref) {
    var displayInModal = _ref.displayInModal;
    var wrapper;
    act(function () {
      wrapper = getWrapper({
        apiHost: DEFAULT_HOSTNAME_API,
        displayInModal: displayInModal,
        itemID: MOCK_ITEM_ID,
        itemType: TYPE_FOLDER,
        token: MOCK_TOKEN
      });
    });
    wrapper.update();
    expect(wrapper.exists(SharingModal)).toBe(true);
    expect(wrapper.exists(Button)).toBe(false);
  });
});