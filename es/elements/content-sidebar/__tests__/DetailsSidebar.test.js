function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { shallow } from 'enzyme';
import * as React from 'react';
import messages from '../../common/messages';
import { getBadItemError } from '../../../utils/error';
import { SIDEBAR_FIELDS_TO_FETCH } from '../../../utils/fields';
import { DetailsSidebarComponent as DetailsSidebar } from '../DetailsSidebar';
jest.mock('../SidebarFileProperties', function () {
  return 'SidebarFileProperties';
});
jest.mock('../SidebarAccessStats', function () {
  return 'SidebarAccessStats';
});
jest.mock('../SidebarClassification', function () {
  return 'SidebarClassification';
});
var file = {
  id: 'foo',
  description: 'bar'
};
describe('elements/content-sidebar/DetailsSidebar', function () {
  var api;
  var getFile;
  var getStats;
  var setFileDescription;
  var onError = jest.fn();

  var getWrapper = function getWrapper(props, options) {
    return shallow(React.createElement(DetailsSidebar, _extends({
      api: api,
      fileId: file.id,
      logger: {
        onReadyMetric: jest.fn()
      },
      onError: onError
    }, props)), options);
  };

  beforeEach(function () {
    getFile = jest.fn().mockResolvedValue(file);
    getStats = jest.fn();
    setFileDescription = jest.fn();
    api = {
      getFileAPI: jest.fn().mockImplementation(function () {
        return {
          getFile: getFile,
          setFileDescription: setFileDescription
        };
      }),
      getFileAccessStatsAPI: jest.fn().mockImplementation(function () {
        return {
          getFileAccessStats: getStats
        };
      })
    };
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
  describe('render()', function () {
    test('should render an empty container if there is no file information', function () {
      // TODO: replace this test with proper loading and error cases once files call split out
      var wrapper = getWrapper({}, {
        disableLifecycleMethods: true
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render DetailsSidebar with all components', function () {
      var wrapper = getWrapper({
        classification: {
          definition: 'message',
          name: 'name'
        },
        hasProperties: true,
        hasNotices: true,
        hasAccessStats: true,
        hasClassification: true,
        hasRetentionPolicy: true,
        hasVersions: true,
        onClassificationClick: function onClassificationClick() {}
      }, {
        disableLifecycleMethods: true
      });
      wrapper.setState({
        file: file
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render DetailsSidebar with properties', function () {
      var wrapper = getWrapper({
        hasProperties: true
      }, {
        disableLifecycleMethods: true
      });
      wrapper.setState({
        file: file
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render DetailsSidebar with notices', function () {
      var wrapper = getWrapper({
        hasNotices: true
      }, {
        disableLifecycleMethods: true
      });
      wrapper.setState({
        file: file
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render DetailsSidebar with access stats', function () {
      var wrapper = getWrapper({
        hasAccessStats: true
      }, {
        disableLifecycleMethods: true
      });
      wrapper.setState({
        file: file
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render DetailsSidebar with versions', function () {
      var wrapper = getWrapper({
        hasVersions: true
      }, {
        disableLifecycleMethods: true
      });
      wrapper.setState({
        file: file
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render empty SidebarContent', function () {
      var wrapper = getWrapper({});
      expect(wrapper.find('SidebarContent').children()).toHaveLength(0);
    });
  });
  describe('componentDidMount()', function () {
    var wrapper;
    var instance;
    beforeEach(function () {
      wrapper = getWrapper({}, {
        disableLifecycleMethods: true
      });
      wrapper.setState({
        file: file
      });
      instance = wrapper.instance();
      instance.fetchFile = jest.fn();
      instance.fetchAccessStats = jest.fn();
    });
    test('should fetch the file information', function () {
      instance.componentDidMount();
      expect(instance.fetchFile).toHaveBeenCalled();
      expect(instance.fetchAccessStats).not.toHaveBeenCalled();
    });
    test('should fetch the file info and access stats', function () {
      wrapper.setProps({
        hasAccessStats: true,
        hasClassification: true
      });
      instance.componentDidMount();
      expect(instance.fetchFile).toHaveBeenCalled();
      expect(instance.fetchAccessStats).toHaveBeenCalled();
    });
  });
  describe('fetchAccessStatsSuccessCallback()', function () {
    var wrapper;
    var instance;
    beforeEach(function () {
      wrapper = getWrapper({
        hasAccessStats: true
      }, {
        disableLifecycleMethods: true
      });
      instance = wrapper.instance();
      instance.setState = jest.fn();
    });
    test('should short circuit if access stats is disabled', function () {
      wrapper.setProps({
        hasAccessStats: false
      });
      instance.fetchAccessStatsSuccessCallback('stats');
      expect(instance.setState).not.toHaveBeenCalled();
    });
    test('should update the file state', function () {
      instance.fetchAccessStatsSuccessCallback('stats');
      expect(instance.setState).toBeCalledWith({
        isLoadingAccessStats: false,
        accessStats: 'stats',
        accessStatsError: undefined
      });
    });
  });
  describe('fetchAccessStatsErrorCallback()', function () {
    var wrapper;
    var instance;
    beforeEach(function () {
      wrapper = getWrapper({
        hasAccessStats: true
      }, {
        disableLifecycleMethods: true
      });
      instance = wrapper.instance();
      instance.setState = jest.fn();
    });
    test('should short circuit if access stats is disabled', function () {
      wrapper.setProps({
        hasAccessStats: false
      });
      instance.fetchAccessStatsSuccessCallback('stats');
      expect(instance.setState).not.toHaveBeenCalled();
    });
    test('should set a maskError if there is an error in fetching the access stats', function () {
      instance.fetchAccessStatsErrorCallback();
      expect(instance.setState).toBeCalledWith({
        isLoadingAccessStats: false,
        accessStats: undefined,
        accessStatsError: {
          maskError: {
            errorHeader: messages.fileAccessStatsErrorHeaderMessage,
            errorSubHeader: messages.defaultErrorMaskSubHeaderMessage
          }
        }
      });
    });
    test('should set an error if user is forbidden from fetching the access stats', function () {
      var error = {
        status: 403
      };
      instance.fetchAccessStatsErrorCallback(error);
      expect(instance.setState).toBeCalledWith({
        isLoadingAccessStats: false,
        accessStats: undefined,
        accessStatsError: {
          error: messages.fileAccessStatsPermissionsError
        }
      });
    });
  });
  describe('fetchAccessStats()', function () {
    var wrapper;
    var instance;
    beforeEach(function () {
      wrapper = getWrapper({
        hasAccessStats: true
      }, {
        disableLifecycleMethods: true
      });
      instance = wrapper.instance();
    });
    test('should short circuit if it is already fetching', function () {
      wrapper.setState({
        isLoadingAccessStats: true
      });
      instance.fetchAccessStats();
      expect(getStats).not.toHaveBeenCalled();
    });
    test('should fetch the file access stats', function () {
      instance.setState = jest.fn();
      instance.fetchAccessStats();
      expect(instance.setState).toBeCalledWith({
        isLoadingAccessStats: true
      });
      expect(getStats).toBeCalledWith(file.id, instance.fetchAccessStatsSuccessCallback, instance.fetchAccessStatsErrorCallback);
    });
  });
  describe('descriptionChangeErrorCallback()', function () {
    test('should set an inlineError if there is an error in updating the file description', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.setState = jest.fn();
      instance.descriptionChangeErrorCallback('file');
      expect(instance.setState).toBeCalledWith({
        file: 'file',
        fileError: {
          inlineError: {
            title: messages.fileDescriptionInlineErrorTitleMessage,
            content: messages.defaultInlineErrorContentMessage
          }
        }
      });
    });
  });
  describe('descriptionChangeSuccessCallback()', function () {
    test('should update the file state', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.setState = jest.fn();
      instance.descriptionChangeSuccessCallback('file');
      expect(instance.setState).toBeCalledWith({
        file: 'file',
        fileError: undefined
      });
    });
  });
  describe('onDescriptionChange()', function () {
    var wrapper;
    var instance;
    beforeEach(function () {
      wrapper = getWrapper();
      wrapper.setState({
        file: file
      });
      instance = wrapper.instance();
      instance.fetchFile = jest.fn();
      instance.descriptionChangeErrorCallback = jest.fn();
    });
    test('should throw an error if there is no file', function () {
      wrapper.setState({
        file: undefined
      });
      expect(function () {
        instance.onDescriptionChange();
      }).toThrow(getBadItemError());
    });
    test('should short circuit if the description is the same as it was before', function () {
      instance.onDescriptionChange(file.description);
      expect(setFileDescription).not.toHaveBeenCalled();
    });
    test('should set the file description', function () {
      var newDescription = 'baz';
      instance.onDescriptionChange(newDescription);
      setFileDescription.mockResolvedValue();
      expect(setFileDescription).toHaveBeenCalledWith(file, newDescription, expect.any(Function), instance.descriptionChangeErrorCallback);
    });
  });
  describe('fetchFile()', function () {
    var wrapper;
    var instance;
    beforeEach(function () {
      wrapper = getWrapper({
        file: file
      });
      instance = wrapper.instance();
    });
    test('should fetch the file info', function () {
      instance.fetchFile();
      expect(getFile).toHaveBeenCalledWith(file.id, instance.fetchFileSuccessCallback, instance.fetchFileErrorCallback, {
        fields: SIDEBAR_FIELDS_TO_FETCH
      });
    });
  });
  describe('fetchFileSuccessCallback()', function () {
    var wrapper;
    var instance;
    beforeEach(function () {
      wrapper = getWrapper({
        file: file
      });
      instance = wrapper.instance();
    });
    test('should fetch the file info', function () {
      instance.setState = jest.fn();
      instance.fetchFileSuccessCallback(file);
      expect(instance.setState).toHaveBeenCalledWith({
        file: file
      });
    });
  });
  describe('fetchFileErrorCallback()', function () {
    var wrapper;
    var instance;
    beforeEach(function () {
      wrapper = getWrapper({
        file: file
      });
      instance = wrapper.instance();
      instance.setState = jest.fn();
    });
    test('should set the error ', function () {
      var error = {
        status: 500
      };
      var code = 'error_code_foo';
      instance.setState = jest.fn();
      instance.fetchFileErrorCallback(error, code);
      expect(instance.setState).toHaveBeenCalledWith({
        file: undefined
      });
      expect(onError).toBeCalledWith(error, code, {
        e: error
      });
    });
  });
  describe('componentDidUpdate()', function () {
    var wrapper;
    var instance;
    beforeEach(function () {
      wrapper = getWrapper({
        file: file,
        hasAccessStats: false,
        hasClassification: false,
        refreshIdentity: false
      });
      instance = wrapper.instance();
      instance.fetchAccessStats = jest.fn();
    });
    test('should fetch the access stats data if the access stats visibility changed', function () {
      wrapper.setProps({
        hasAccessStats: true
      });
      expect(instance.fetchAccessStats).toHaveBeenCalled();
    });
  });
  describe('refresh', function () {
    test('should refetch data when refresh is called', function () {
      var instance = getWrapper().instance();
      var fetchAccessStats = jest.fn();
      instance.fetchAccessStats = fetchAccessStats;
      instance.refresh();
      expect(fetchAccessStats).toHaveBeenCalled();
    });
  });
});