function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import noop from 'lodash/noop';
import { shallow } from 'enzyme';
import Instances from '../../../features/metadata-instance-editor/Instances';
import EmptyContent from '../../../features/metadata-instance-editor/EmptyContent';
import LoadingIndicator from '../../../components/loading-indicator/LoadingIndicator';
import LoadingIndicatorWrapper from '../../../components/loading-indicator/LoadingIndicatorWrapper';
import InlineError from '../../../components/inline-error/InlineError';
import { normalizeTemplates } from '../../../features/metadata-instance-editor/metadataUtil';
import messages from '../../common/messages';
import { MetadataSidebarComponent as MetadataSidebar } from '../MetadataSidebar';
import { FIELD_IS_EXTERNALLY_OWNED, FIELD_PERMISSIONS } from '../../../constants';
jest.mock('../../../features/metadata-instance-editor/metadataUtil', function () {
  return {
    normalizeTemplates: jest.fn()
  };
});
describe('elements/content-sidebar/Metadata/MetadataSidebar', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return shallow(React.createElement(MetadataSidebar, _extends({
      logger: {
        onReadyMetric: jest.fn()
      }
    }, props)), options);
  };

  test('should render Metadata sidebar component when instances and templates are available', function () {
    var getFile = jest.fn();
    var api = {
      getFileAPI: jest.fn().mockReturnValueOnce({
        getFile: getFile
      })
    };
    var wrapper = getWrapper({
      api: api
    });
    wrapper.setState({
      file: {},
      templates: [],
      editors: [{}]
    });
    expect(wrapper.find(LoadingIndicatorWrapper)).toHaveLength(1);
    expect(wrapper.find(Instances)).toHaveLength(1);
    expect(wrapper.find(EmptyContent)).toHaveLength(0);
    expect(wrapper.find(LoadingIndicator)).toHaveLength(0);
    expect(wrapper.find(InlineError)).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
    expect(getFile).toHaveBeenCalled();
    expect(api.getFileAPI).toHaveBeenCalled();
  });
  test('should render Metadata sidebar component with template add dropdown', function () {
    var getFile = jest.fn();
    var api = {
      getFileAPI: jest.fn().mockReturnValueOnce({
        getFile: getFile
      })
    };
    var wrapper = getWrapper({
      api: api
    });
    wrapper.setState({
      file: {
        permissions: {
          can_upload: true
        }
      },
      templates: [],
      editors: [{}]
    });
    expect(wrapper.find(LoadingIndicatorWrapper)).toHaveLength(1);
    expect(wrapper.find(Instances)).toHaveLength(1);
    expect(wrapper.find(EmptyContent)).toHaveLength(0);
    expect(wrapper.find(LoadingIndicator)).toHaveLength(0);
    expect(wrapper.find(InlineError)).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
    expect(getFile).toHaveBeenCalled();
    expect(api.getFileAPI).toHaveBeenCalled();
  });
  test('should render Metadata sidebar component with empty content when instances are empty', function () {
    var getFile = jest.fn();
    var api = {
      getFileAPI: jest.fn().mockReturnValueOnce({
        getFile: getFile
      })
    };
    var wrapper = getWrapper({
      api: api
    });
    wrapper.setState({
      file: {},
      templates: [],
      editors: []
    });
    expect(wrapper.find(LoadingIndicatorWrapper)).toHaveLength(1);
    expect(wrapper.find(Instances)).toHaveLength(0);
    expect(wrapper.find(EmptyContent)).toHaveLength(1);
    expect(wrapper.find(LoadingIndicator)).toHaveLength(0);
    expect(wrapper.find(InlineError)).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
    expect(getFile).toHaveBeenCalled();
    expect(api.getFileAPI).toHaveBeenCalled();
  });
  test('should render Metadata Sidebar component with template filters', function () {
    var templates = [];
    var selectedTemplateKey = 'narwhals';
    var getFile = jest.fn();
    var api = {
      getFileAPI: jest.fn().mockReturnValueOnce({
        getFile: getFile
      })
    };
    var wrapper = getWrapper({
      api: api,
      selectedTemplateKey: selectedTemplateKey
    });
    wrapper.setState({
      file: {},
      templates: templates,
      editors: [{}]
    });
    var instances = wrapper.find(Instances);
    expect(instances).toHaveLength(1);
    expect(instances.prop('selectedTemplateKey')).toBe(selectedTemplateKey);
    expect(wrapper.find(LoadingIndicatorWrapper)).toHaveLength(1);
    expect(wrapper.find(EmptyContent)).toHaveLength(0);
    expect(wrapper.find(LoadingIndicator)).toHaveLength(0);
    expect(wrapper.find(InlineError)).toHaveLength(0);
    expect(getFile).toHaveBeenCalled();
    expect(api.getFileAPI).toHaveBeenCalled();
  });
  test('should render loading indicator component when templates are not available', function () {
    var getFile = jest.fn();
    var api = {
      getFileAPI: jest.fn().mockReturnValueOnce({
        getFile: getFile
      })
    };
    var wrapper = getWrapper({
      api: api
    });
    wrapper.setState({
      file: {},
      editors: []
    });
    expect(wrapper.find(LoadingIndicatorWrapper)).toHaveLength(0);
    expect(wrapper.find(Instances)).toHaveLength(0);
    expect(wrapper.find(LoadingIndicator)).toHaveLength(1);
    expect(wrapper.find(InlineError)).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
    expect(getFile).toHaveBeenCalled();
    expect(api.getFileAPI).toHaveBeenCalled();
  });
  test('should render loading indicator component when instances are not available', function () {
    var getFile = jest.fn();
    var api = {
      getFileAPI: jest.fn().mockReturnValueOnce({
        getFile: getFile
      })
    };
    var wrapper = getWrapper({
      api: api
    });
    wrapper.setState({
      file: {},
      templates: []
    });
    expect(wrapper.find(LoadingIndicatorWrapper)).toHaveLength(0);
    expect(wrapper.find(Instances)).toHaveLength(0);
    expect(wrapper.find(LoadingIndicator)).toHaveLength(1);
    expect(wrapper.find(InlineError)).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
    expect(getFile).toHaveBeenCalled();
    expect(api.getFileAPI).toHaveBeenCalled();
  });
  test('should render loading indicator component when file is not available', function () {
    var getFile = jest.fn();
    var api = {
      getFileAPI: jest.fn().mockReturnValueOnce({
        getFile: getFile
      })
    };
    var wrapper = getWrapper({
      api: api
    });
    wrapper.setState({
      templates: [],
      editors: []
    });
    expect(wrapper.find(LoadingIndicatorWrapper)).toHaveLength(0);
    expect(wrapper.find(Instances)).toHaveLength(0);
    expect(wrapper.find(LoadingIndicator)).toHaveLength(1);
    expect(wrapper.find(InlineError)).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
    expect(getFile).toHaveBeenCalled();
    expect(api.getFileAPI).toHaveBeenCalled();
  });
  test('should render error when there was an error', function () {
    var getFile = jest.fn();
    var api = {
      getFileAPI: jest.fn().mockReturnValueOnce({
        getFile: getFile
      })
    };
    var wrapper = getWrapper({
      getViewer: jest.fn(),
      api: api
    });
    wrapper.setState({
      file: {},
      error: {}
    });
    expect(wrapper.find(LoadingIndicatorWrapper)).toHaveLength(0);
    expect(wrapper.find(Instances)).toHaveLength(0);
    expect(wrapper.find(LoadingIndicator)).toHaveLength(0);
    expect(wrapper.find(InlineError)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
    expect(getFile).toHaveBeenCalled();
    expect(api.getFileAPI).toHaveBeenCalled();
  });
  describe('constructor()', function () {
    var onReadyMetric;
    beforeEach(function () {
      var wrapper = getWrapper({}, {
        disableLifecycleMethods: true
      });
      onReadyMetric = wrapper.instance().props.logger.onReadyMetric;
    });
    test('should emit when js loaded', function () {
      expect(onReadyMetric).toHaveBeenCalledWith({
        endMarkName: expect.any(String)
      });
    });
  });
  describe('componentDidMount()', function () {
    test('should call fetch file', function () {
      var getFile = jest.fn();
      var api = {
        getFileAPI: jest.fn().mockReturnValueOnce({
          getFile: getFile
        })
      };
      getWrapper({
        api: api
      });
      expect(getFile).toHaveBeenCalled();
      expect(api.getFileAPI).toHaveBeenCalled();
    });
  });
  describe('onApiError()', function () {
    test('should set error state and call onError', function () {
      var error = {
        status: 429
      }; // user correctable error

      var code = 'code';
      var onError = jest.fn();
      var wrapper = getWrapper({
        onError: onError
      }, {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      var editors = [{
        instance: {
          id: 1
        }
      }, {
        instance: {
          id: 2
        }
      }, {
        instance: {
          id: 3
        }
      }];
      wrapper.setState({
        editors: editors
      });
      instance.setState = jest.fn();
      instance.onApiError(error, code, {
        foo: 'bar'
      });
      expect(instance.setState).toBeCalledWith({
        error: messages.sidebarMetadataEditingErrorContent,
        isLoading: false,
        foo: 'bar'
      });
      expect(onError).toBeCalledWith(error, code, {
        error: error,
        isErrorDisplayed: true
      });
    });
  });
  describe('canEdit()', function () {
    test('should return false when no file', function () {
      var wrapper = getWrapper({}, {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      expect(instance.canEdit()).toBeFalsy();
    });
    test('should return false when can_upload is missing', function () {
      var wrapper = getWrapper({}, {
        disableLifecycleMethods: true
      });
      wrapper.setState({
        file: {
          permissions: {}
        }
      });
      var instance = wrapper.instance();
      expect(instance.canEdit()).toBeFalsy();
    });
    test('should return false when can_upload is true', function () {
      var wrapper = getWrapper({}, {
        disableLifecycleMethods: true
      });
      wrapper.setState({
        file: {
          permissions: {
            can_upload: true
          }
        }
      });
      var instance = wrapper.instance();
      expect(instance.canEdit()).toBeTruthy();
    });
  });
  describe('getEditor()', function () {
    test('should return the correct editor', function () {
      var getEditors = jest.fn();
      var api = {
        getMetadataAPI: jest.fn().mockReturnValueOnce({
          getEditors: getEditors
        })
      };
      var wrapper = getWrapper({
        getViewer: jest.fn(),
        api: api
      }, {
        disableLifecycleMethods: true
      });
      var editors = [{
        instance: {
          id: 1
        }
      }, {
        instance: {
          id: 2
        }
      }, {
        instance: {
          id: 3
        }
      }];
      wrapper.setState({
        editors: editors
      });
      var instance = wrapper.instance();
      expect(instance.getEditor(2)).toBe(editors[1]);
    });
  });
  describe('onRemoveSuccessHandler()', function () {
    test('should remove the correct editor', function () {
      var getEditors = jest.fn();
      var api = {
        getMetadataAPI: jest.fn().mockReturnValueOnce({
          getEditors: getEditors
        })
      };
      var wrapper = getWrapper({
        getViewer: jest.fn(),
        api: api
      }, {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      var editors = [{
        instance: {
          id: 1
        }
      }, {
        instance: {
          id: 2
        }
      }, {
        instance: {
          id: 3
        }
      }];
      wrapper.setState({
        editors: editors
      });
      instance.setState = jest.fn();
      instance.onRemoveSuccessHandler(editors[1]);
      expect(instance.setState).toBeCalledWith({
        editors: [{
          instance: {
            id: 1
          }
        }, {
          instance: {
            id: 3
          }
        }]
      });
    });
  });
  describe('onRemove()', function () {
    test('should not do anything if editor not found', function () {
      var getEditors = jest.fn();
      var deleteMetadata = jest.fn();
      var api = {
        getMetadataAPI: jest.fn().mockReturnValueOnce({
          deleteMetadata: deleteMetadata,
          getEditors: getEditors
        })
      };
      var wrapper = getWrapper({
        api: api
      }, {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      var editors = [{
        instance: {
          id: 1
        }
      }, {
        instance: {
          id: 2
        }
      }, {
        instance: {
          id: 3
        }
      }];
      wrapper.setState({
        editors: editors
      });
      instance.setState = jest.fn();
      instance.onRemove(5);
      expect(deleteMetadata).not.toBeCalled();
    });
    test('should not do anything if no file object', function () {
      var getEditors = jest.fn();
      var deleteMetadata = jest.fn();
      var api = {
        getMetadataAPI: jest.fn().mockReturnValueOnce({
          deleteMetadata: deleteMetadata,
          getEditors: getEditors
        })
      };
      var wrapper = getWrapper({
        api: api
      }, {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      var editors = [{
        instance: {
          id: 1
        }
      }, {
        instance: {
          id: 2
        }
      }, {
        instance: {
          id: 3
        }
      }];
      wrapper.setState({
        editors: editors
      });
      instance.setState = jest.fn();
      instance.onRemove(1);
      expect(deleteMetadata).not.toBeCalled();
    });
    test('should call metadata delete api', function () {
      var file = {
        id: 'fileId'
      };
      var getEditors = jest.fn();
      var deleteMetadata = jest.fn();
      var api = {
        getMetadataAPI: jest.fn().mockReturnValue({
          deleteMetadata: deleteMetadata,
          getEditors: getEditors
        })
      };
      var wrapper = getWrapper({
        file: file,
        api: api
      }, {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      var editors = [{
        instance: {
          id: 1
        }
      }, {
        instance: {
          id: 2
        }
      }, {
        instance: {
          id: 3
        }
      }];
      wrapper.setState({
        editors: editors,
        file: file
      });
      instance.setState = jest.fn();
      instance.onRemove(1);
      expect(deleteMetadata).toBeCalledWith(file, editors[1].template, expect.any(Function), instance.onApiError);
    });
  });
  describe('onAddSuccessHandler()', function () {
    test('should add the new editor', function () {
      var getEditors = jest.fn();
      var api = {
        getMetadataAPI: jest.fn().mockReturnValueOnce({
          getEditors: getEditors
        })
      };
      var wrapper = getWrapper({
        api: api
      }, {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      wrapper.setState({
        editors: [{
          instance: {
            id: 1
          }
        }, {
          instance: {
            id: 2
          }
        }]
      });
      instance.setState = jest.fn();
      instance.onAddSuccessHandler({
        instance: {
          id: 3
        }
      });
      expect(instance.setState).toBeCalledWith({
        isLoading: false,
        editors: [{
          instance: {
            id: 1
          }
        }, {
          instance: {
            id: 2
          }
        }, {
          instance: {
            id: 3
          }
        }]
      });
    });
  });
  describe('onAdd()', function () {
    test('should not call metadata add api when no file object', function () {
      var getEditors = jest.fn();
      var createMetadata = jest.fn();
      var api = {
        getMetadataAPI: jest.fn().mockReturnValue({
          createMetadata: createMetadata,
          getEditors: getEditors
        })
      };
      var wrapper = getWrapper({
        api: api
      }, {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      instance.setState = jest.fn();
      instance.onAdd('template');
      expect(createMetadata).not.toBeCalled();
      expect(instance.setState).not.toBeCalled();
    });
    test('should call metadata add api', function () {
      var file = {
        id: 'fileId'
      };
      var getEditors = jest.fn();
      var createMetadata = jest.fn();
      var api = {
        getMetadataAPI: jest.fn().mockReturnValue({
          createMetadata: createMetadata,
          getEditors: getEditors
        })
      };
      var wrapper = getWrapper({
        file: file,
        api: api
      }, {
        disableLifecycleMethods: true
      });
      wrapper.setState({
        file: file
      });
      var instance = wrapper.instance();
      instance.setState = jest.fn();
      instance.onAdd('template');
      expect(createMetadata).toBeCalledWith(file, 'template', instance.onAddSuccessHandler, instance.onApiError);
      expect(instance.setState).toBeCalledWith({
        isLoading: true
      });
    });
  });
  describe('replaceEditor()', function () {
    test('should update the correct editor', function () {
      var getEditors = jest.fn();
      var api = {
        getMetadataAPI: jest.fn().mockReturnValueOnce({
          getEditors: getEditors
        })
      };
      var wrapper = getWrapper({
        api: api
      }, {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      var editors = [{
        instance: {
          id: 1
        }
      }, {
        instance: {
          id: 2
        }
      }, {
        instance: {
          id: 3
        }
      }];
      wrapper.setState({
        editors: editors
      });
      instance.setState = jest.fn();
      instance.replaceEditor(editors[1], {
        instance: {
          id: 5
        }
      });
      expect(instance.setState).toBeCalledWith({
        editors: [{
          instance: {
            id: 1
          }
        }, {
          instance: {
            id: 5
          }
        }, {
          instance: {
            id: 3
          }
        }]
      });
    });
  });
  describe('onSaveErrorHandler()', function () {
    test('should revert to the old editor', function () {
      var error = {
        status: 429
      }; // user correctable error

      var code = 'code';
      var oldEditor = {
        foo: 'bar'
      };
      var wrapper = getWrapper({}, {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      instance.replaceEditor = jest.fn();
      instance.onApiError = jest.fn();
      instance.onSaveErrorHandler(oldEditor, error, code);
      expect(instance.replaceEditor).toBeCalledWith(oldEditor, {
        foo: 'bar',
        hasError: true
      });
      expect(instance.onApiError).toBeCalledWith(error, code);
    });
  });
  describe('onSave()', function () {
    test('should not do anything if editor not found', function () {
      var getEditors = jest.fn();
      var updateMetadata = jest.fn();
      var api = {
        getMetadataAPI: jest.fn().mockReturnValueOnce({
          updateMetadata: updateMetadata,
          getEditors: getEditors
        })
      };
      var wrapper = getWrapper({
        api: api
      }, {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      wrapper.setState({
        editors: [{
          instance: {
            id: 1
          }
        }, {
          instance: {
            id: 2
          }
        }, {
          instance: {
            id: 3
          }
        }]
      });
      instance.setState = jest.fn();
      instance.onSave(5, {});
      expect(updateMetadata).not.toBeCalled();
    });
    test('should not do anything if no file', function () {
      var getEditors = jest.fn();
      var updateMetadata = jest.fn();
      var api = {
        getMetadataAPI: jest.fn().mockReturnValueOnce({
          updateMetadata: updateMetadata,
          getEditors: getEditors
        })
      };
      var wrapper = getWrapper({
        api: api
      }, {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      wrapper.setState({
        editors: [{
          instance: {
            id: 1
          }
        }, {
          instance: {
            id: 2
          }
        }, {
          instance: {
            id: 3
          }
        }]
      });
      instance.setState = jest.fn();
      instance.onSave(1, {});
      expect(updateMetadata).not.toBeCalled();
    });
    test('should call metadata save api', function () {
      var file = {
        id: 'fileId'
      };
      var getEditors = jest.fn();
      var updateMetadata = jest.fn();
      var getMetadataAPI = jest.fn().mockReturnValue({
        updateMetadata: updateMetadata,
        getEditors: getEditors
      });
      var wrapper = getWrapper({
        file: file,
        api: {
          getMetadataAPI: getMetadataAPI
        }
      }, {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      var editors = [{
        instance: {
          id: 1
        }
      }, {
        instance: {
          id: 2
        }
      }, {
        instance: {
          id: 3
        }
      }];
      wrapper.setState({
        editors: editors,
        file: file
      });
      instance.setState = jest.fn();
      instance.onSave(1, 'ops');
      expect(getMetadataAPI).toBeCalledWith(false);
      expect(updateMetadata).toBeCalledWith(file, editors[1].template, 'ops', expect.any(Function), expect.any(Function));
    });
  });
  describe('onModification()', function () {
    test('should not do anything if editor not found', function () {
      var getEditors = jest.fn();
      var updateMetadata = jest.fn();
      var api = {
        getMetadataAPI: jest.fn().mockReturnValueOnce({
          updateMetadata: updateMetadata,
          getEditors: getEditors
        })
      };
      var wrapper = getWrapper({
        api: api
      }, {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      wrapper.setState({
        editors: [{
          instance: {
            id: 1
          }
        }, {
          instance: {
            id: 2
          }
        }, {
          instance: {
            id: 3
          }
        }]
      });
      instance.setState = jest.fn();
      instance.onModification(5, {});
      expect(updateMetadata).not.toBeCalled();
    });
    test('should call metadata save api', function () {
      var getEditors = jest.fn();
      var updateMetadata = jest.fn();
      var api = {
        getMetadataAPI: jest.fn().mockReturnValue({
          updateMetadata: updateMetadata,
          getEditors: getEditors
        })
      };
      var wrapper = getWrapper({
        api: api
      }, {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      var editors = [{
        instance: {
          id: 1
        }
      }, {
        instance: {
          id: 2
        }
      }, {
        instance: {
          id: 3
        }
      }];
      wrapper.setState({
        editors: editors
      });
      instance.setState = jest.fn();
      instance.onModification(1, true);
      expect(instance.setState).toBeCalledWith({
        editors: [{
          instance: {
            id: 1
          },
          isDirty: true
        }, {
          instance: {
            id: 2
          }
        }, {
          instance: {
            id: 3
          }
        }]
      });
    });
  });
  describe('fetchFile()', function () {
    test('should call file api with correct options', function () {
      var getFile = jest.fn();
      var wrapper = getWrapper({
        fileId: 'fileId',
        api: {
          getFileAPI: jest.fn().mockReturnValueOnce({
            getFile: getFile
          })
        }
      }, {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      instance.componentDidMount = jest.fn();
      instance.fetchFile();
      expect(getFile).toBeCalledWith('fileId', instance.fetchFileSuccessCallback, instance.fetchFileErrorCallback, {
        fields: [FIELD_IS_EXTERNALLY_OWNED, FIELD_PERMISSIONS],
        refreshCache: true
      });
    });
  });
  describe('fetchFileSuccessCallback()', function () {
    test('should set state with the new file object and call metadata fetch when no prior file exists', function () {
      var wrapper = getWrapper({
        fileId: 'fileId'
      }, {
        disableLifecycleMethods: true
      });
      var file = {
        id: 'fileId'
      };
      var instance = wrapper.instance();
      instance.setState = jest.fn();
      instance.fetchFileSuccessCallback(file);
      expect(instance.setState).toBeCalledWith({
        file: file
      }, instance.fetchMetadata);
    });
    test('should set state with the new file object and call metadata fetch when prior file exists but with different permissions', function () {
      var wrapper = getWrapper({
        fileId: 'fileId'
      }, {
        disableLifecycleMethods: true
      });
      var file = {
        id: 'fileId',
        permissions: {
          can_upload: true
        }
      };
      var newFile = {
        id: 'fileId',
        permissions: {
          can_upload: false
        }
      };
      var instance = wrapper.instance();
      wrapper.setState({
        file: file
      });
      instance.setState = jest.fn();
      instance.fetchFileSuccessCallback(newFile);
      expect(instance.setState).toBeCalledWith({
        file: newFile
      }, instance.fetchMetadata);
    });
    test('should set state with the new file object but not call metadata fetch when prior file exists with same permissions', function () {
      var wrapper = getWrapper({
        fileId: 'fileId'
      }, {
        disableLifecycleMethods: true
      });
      var file = {
        id: 'fileId',
        permissions: {
          can_upload: true
        }
      };
      var instance = wrapper.instance();
      wrapper.setState({
        file: file
      });
      instance.setState = jest.fn();
      instance.fetchFileSuccessCallback(file);
      expect(instance.setState).toBeCalledWith({
        file: file
      }, noop);
    });
  });
  describe('fetchFileErrorCallback()', function () {
    test('should call the common error callback with file fetch error', function () {
      var wrapper = getWrapper({
        fileId: 'fileId'
      }, {
        disableLifecycleMethods: true
      });
      var e = new Error();
      var code = 'code';
      var instance = wrapper.instance();
      instance.onApiError = jest.fn();
      instance.fetchFileErrorCallback(e, code);
      expect(instance.onApiError).toBeCalledWith(e, code, {
        error: messages.sidebarFileFetchingErrorContent,
        file: undefined
      });
    });
  });
  describe('fetchMetadata()', function () {
    test('should not call the metadata api when no file', function () {
      var getMetadata = jest.fn();
      var getMetadataAPI = jest.fn().mockReturnValueOnce({
        getMetadata: getMetadata
      });
      var wrapper = getWrapper({
        fileId: 'fileId',
        api: {
          getMetadataAPI: getMetadataAPI
        },
        isFeatureEnabled: false
      }, {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      instance.fetchMetadata();
      expect(getMetadataAPI).not.toBeCalled();
      expect(getMetadata).not.toBeCalled();
    });
    test('should call metadata api with correct options with feature turned off', function () {
      var file = {
        id: 'fileId'
      };
      var getMetadata = jest.fn();
      var getMetadataAPI = jest.fn().mockReturnValueOnce({
        getMetadata: getMetadata
      });
      var wrapper = getWrapper({
        fileId: 'fileId',
        api: {
          getMetadataAPI: getMetadataAPI
        },
        isFeatureEnabled: false
      }, {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      wrapper.setState({
        file: file
      });
      instance.fetchMetadata();
      expect(getMetadataAPI).toBeCalledWith(false);
      expect(getMetadata).toBeCalledWith(file, instance.fetchMetadataSuccessCallback, instance.fetchMetadataErrorCallback, false, {
        refreshCache: true
      });
    });
    test('should call metadata api with correct options with feature defaulted to true', function () {
      var file = {
        id: 'fileId'
      };
      var getMetadata = jest.fn();
      var getMetadataAPI = jest.fn().mockReturnValueOnce({
        getMetadata: getMetadata
      });
      var wrapper = getWrapper({
        fileId: 'fileId',
        api: {
          getMetadataAPI: getMetadataAPI
        }
      }, {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      wrapper.setState({
        file: file
      });
      instance.fetchMetadata();
      expect(getMetadataAPI).toBeCalledWith(false);
      expect(getMetadata).toBeCalledWith(file, instance.fetchMetadataSuccessCallback, instance.fetchMetadataErrorCallback, true, {
        refreshCache: true
      });
    });
  });
  describe('fetchMetadataSuccessCallback()', function () {
    test('should set state with the new file object', function () {
      var editors = ['editor1', 'editor2'];
      var templates = ['template1', 'template2'];
      normalizeTemplates.mockReturnValue(templates);
      var wrapper = getWrapper({
        fileId: 'fileId'
      }, {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      instance.setState = jest.fn();
      instance.fetchMetadataSuccessCallback({
        editors: editors,
        templates: templates
      });
      expect(instance.setState).toBeCalledWith({
        editors: editors,
        error: undefined,
        isLoading: false,
        templates: templates
      });
      expect(normalizeTemplates).toHaveBeenCalledWith(templates, undefined, undefined);
    });
  });
  describe('fetchMetadataErrorCallback()', function () {
    test('should call the common error callback with file fetch error', function () {
      var wrapper = getWrapper({
        fileId: 'fileId'
      }, {
        disableLifecycleMethods: true
      });
      var e = new Error();
      var code = 'code';
      var instance = wrapper.instance();
      instance.onApiError = jest.fn();
      instance.fetchMetadataErrorCallback(e, code);
      expect(instance.onApiError).toBeCalledWith(e, code, {
        editors: undefined,
        error: messages.sidebarMetadataFetchingErrorContent,
        templates: undefined
      });
    });
  });
});