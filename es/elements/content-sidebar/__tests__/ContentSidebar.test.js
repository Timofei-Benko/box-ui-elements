function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import noop from 'lodash/noop';
import { mount } from 'enzyme';
import { SIDEBAR_FIELDS_TO_FETCH } from '../../../utils/fields';
import { ContentSidebarComponent as ContentSidebar } from '../ContentSidebar';
import SidebarUtils from '../SidebarUtils';
jest.mock('../SidebarUtils');
jest.mock('../Sidebar', function () {
  return 'sidebar';
});
var file = {
  id: 'I_AM_A_FILE'
};
describe('elements/content-sidebar/ContentSidebar', function () {
  var rootElement;

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return mount(React.createElement(ContentSidebar, _extends({
      logger: {
        onReadyMetric: jest.fn()
      }
    }, props)), {
      attachTo: rootElement
    });
  };

  beforeEach(function () {
    SidebarUtils.canHaveSidebar = jest.fn().mockReturnValueOnce(true);
    rootElement = document.createElement('div');
    document.body.appendChild(rootElement); // Prevent componentDidMount from triggering API calls

    ContentSidebar.prototype.componentDidMount = jest.fn();
  });
  afterEach(function () {
    document.body.removeChild(rootElement);
  });
  describe('constructor()', function () {
    var onReadyMetric;
    beforeEach(function () {
      var wrapper = getWrapper();
      onReadyMetric = wrapper.instance().props.logger.onReadyMetric;
    });
    test('should emit when js loaded', function () {
      expect(onReadyMetric).toHaveBeenCalledWith({
        endMarkName: expect.any(String)
      });
    });
  });
  describe('componentDidUpdate', function () {
    test('should fetch the file data when the id changes', function () {
      var wrapper = getWrapper({
        fileId: '123'
      });
      var instance = wrapper.instance();
      var newProps = {
        fileId: '456'
      };
      instance.setState = jest.fn();
      instance.fetchFile = jest.fn();
      instance.componentDidUpdate(newProps);
      expect(instance.fetchFile).toBeCalled();
      expect(instance.setState).not.toBeCalled();
    });
    test('should not fetch the file data if the id has not changed', function () {
      var wrapper = getWrapper({
        fileId: '123'
      });
      var instance = wrapper.instance();
      var newProps = {
        fileId: '123'
      };
      instance.fetchFile = jest.fn();
      instance.setState({
        view: 'activityFeed'
      });
      instance.setState = jest.fn();
      instance.componentDidUpdate(newProps);
      expect(instance.fetchFile).not.toBeCalled();
      expect(instance.setState).not.toBeCalled();
    });
  });
  describe('fetchFile()', function () {
    var fileStub;
    var wrapper;
    var instance;
    var fetchFileSuccessCallback;
    beforeEach(function () {
      wrapper = getWrapper({
        file: file,
        fileId: file.id
      });
      instance = wrapper.instance();
      fileStub = jest.fn();
      fetchFileSuccessCallback = jest.fn();
      instance.api = {
        getFileAPI: function getFileAPI() {
          return {
            getFile: fileStub
          };
        }
      };
      instance.fetchFileSuccessCallback = fetchFileSuccessCallback;
      instance.setState = jest.fn();
    });
    test('should not fetch the file when sidebar is not configured to show anything', function () {
      SidebarUtils.canHaveSidebar = jest.fn().mockReturnValueOnce(false);
      instance.fetchFile();
      expect(SidebarUtils.canHaveSidebar).toBeCalledWith(instance.props);
      expect(fileStub).not.toBeCalled();
      expect(instance.setState).toBeCalled();
    });
    test('should fetch the file with forceFetch', function () {
      SidebarUtils.canHaveSidebar = jest.fn().mockReturnValueOnce(true);
      instance.fetchFile({
        forceFetch: true
      });
      expect(SidebarUtils.canHaveSidebar).toBeCalledWith(instance.props);
      expect(fileStub).toBeCalledWith(file.id, fetchFileSuccessCallback, instance.errorCallback, {
        forceFetch: true,
        fields: SIDEBAR_FIELDS_TO_FETCH
      });
      expect(instance.setState).toBeCalled();
    });
    test('should fetch the file without forceFetch', function () {
      SidebarUtils.canHaveSidebar = jest.fn().mockReturnValueOnce(true);
      instance.fetchFile();
      expect(SidebarUtils.canHaveSidebar).toBeCalledWith(instance.props);
      expect(fileStub).toBeCalledWith(file.id, fetchFileSuccessCallback, instance.errorCallback, {
        fields: SIDEBAR_FIELDS_TO_FETCH
      });
      expect(instance.setState).toBeCalled();
    });
  });
  describe('fetchMetadataSuccessCallback()', function () {
    var setState;
    var wrapper;
    var instance;
    beforeEach(function () {
      setState = jest.fn();
      wrapper = getWrapper();
      instance = wrapper.instance();
      instance.setState = setState;
    });
    test('should set metadataEditors', function () {
      var editorsData = {
        editors: 'editors'
      };
      instance.fetchMetadataSuccessCallback(editorsData);
      expect(setState).toBeCalledWith({
        metadataEditors: 'editors'
      });
    });
  });
  describe('fetchFileSuccessCallback()', function () {
    var setState;
    var wrapper;
    var instance;
    beforeEach(function () {
      setState = jest.fn();
      wrapper = getWrapper();
      instance = wrapper.instance();
      instance.setState = setState;
    });
    test('should set the state with the file and view and then call fetchMetadata', function () {
      instance.fetchMetadata = jest.fn();
      instance.fetchFileSuccessCallback(file);
      expect(instance.setState).toBeCalledWith({
        file: file,
        isLoading: false
      }, instance.fetchMetadata);
    });
  });
  describe('fetchMetadata()', function () {
    var wrapper;
    var instance;
    test('should fetch metadata if the feature is enabled and can have the sidebar', function () {
      var getMetadata = jest.fn();
      var getMetadataAPI = jest.fn().mockReturnValueOnce({
        getMetadata: getMetadata
      });
      wrapper = getWrapper({
        metadataSidebarProps: {
          isFeatureEnabled: false
        }
      });
      wrapper.setState({
        file: file
      });
      instance = wrapper.instance();
      instance.api = {
        getMetadataAPI: getMetadataAPI
      };
      SidebarUtils.canHaveMetadataSidebar = jest.fn().mockReturnValueOnce(true);
      instance.fetchMetadata();
      expect(SidebarUtils.canHaveMetadataSidebar).toBeCalledWith(instance.props);
      expect(getMetadataAPI).toBeCalledWith(false);
      expect(getMetadata).toBeCalledWith(file, instance.fetchMetadataSuccessCallback, noop, false);
    });
    test('should not fetch metadata if the feature is enabled', function () {
      var getMetadata = jest.fn();
      var getMetadataAPI = jest.fn().mockReturnValueOnce({
        getMetadata: getMetadata
      });
      wrapper = getWrapper({
        metadataSidebarProps: {
          isFeatureEnabled: true
        }
      });
      instance = wrapper.instance();
      instance.api = {
        getMetadataAPI: getMetadataAPI
      };
      SidebarUtils.canHaveMetadataSidebar = jest.fn().mockReturnValueOnce(true);
      instance.fetchMetadata();
      expect(SidebarUtils.canHaveMetadataSidebar).not.toBeCalled();
      expect(getMetadataAPI).not.toBeCalled();
      expect(getMetadata).not.toBeCalled();
    });
    test('should not fetch the metadata if we cannot have the sidebar', function () {
      var getMetadata = jest.fn();
      var getMetadataAPI = jest.fn().mockReturnValueOnce({
        getMetadata: getMetadata
      });
      wrapper = getWrapper({
        metadataSidebarProps: {
          isFeatureEnabled: false
        }
      });
      instance = wrapper.instance();
      instance.api = {
        getMetadataAPI: getMetadataAPI
      };
      SidebarUtils.canHaveMetadataSidebar = jest.fn().mockReturnValueOnce(false);
      instance.fetchMetadata();
      expect(SidebarUtils.canHaveMetadataSidebar).toBeCalledWith(instance.props);
      expect(getMetadataAPI).not.toBeCalled();
      expect(getMetadata).not.toBeCalled();
    });
  });
  describe('refresh()', function () {
    var wrapper;
    var instance;
    beforeEach(function () {
      wrapper = getWrapper();
      instance = wrapper.instance();
    });
    test('should call sidebarRef refresh method when refresh is called', function () {
      var refresh = jest.fn();
      instance.sidebarRef = {
        refresh: refresh
      };
      instance.refresh();
      expect(refresh).toHaveBeenCalled();
    });
  });
});