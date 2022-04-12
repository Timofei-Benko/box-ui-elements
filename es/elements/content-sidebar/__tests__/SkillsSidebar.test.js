function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { shallow } from 'enzyme';
import noop from 'lodash/noop';
import LoadingIndicator from '../../../components/loading-indicator/LoadingIndicator';
import { SkillsSidebarComponent as SkillsSidebar } from '../SkillsSidebar';
import SidebarSkills from '../skills/SidebarSkills';
describe('elements/content-sidebar/Skills/SkillsSidebar', function () {
  var getWrapper = function getWrapper(props, options) {
    return shallow(React.createElement(SkillsSidebar, _extends({
      logger: {
        onReadyMetric: jest.fn()
      }
    }, props)), options);
  };

  test('should render skills sidebar component when cards are available', function () {
    var getSkills = jest.fn();
    var api = {
      getMetadataAPI: jest.fn().mockReturnValueOnce({
        getSkills: getSkills
      })
    };
    var wrapper = getWrapper({
      file: {},
      getPreviewer: jest.fn(),
      api: api
    });
    wrapper.setState({
      cards: []
    });
    expect(wrapper.find(SidebarSkills)).toHaveLength(1);
    expect(wrapper.find(LoadingIndicator)).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
    expect(getSkills).toHaveBeenCalled();
    expect(api.getMetadataAPI).toHaveBeenCalled();
  });
  test('should render loading indicator component when cards are not available', function () {
    var getSkills = jest.fn();
    var api = {
      getMetadataAPI: jest.fn().mockReturnValueOnce({
        getSkills: getSkills
      })
    };
    var wrapper = getWrapper({
      file: {},
      getPreviewer: jest.fn(),
      api: api
    });
    expect(wrapper.find(LoadingIndicator)).toHaveLength(1);
    expect(wrapper.find(SidebarSkills)).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
    expect(getSkills).toHaveBeenCalled();
    expect(api.getMetadataAPI).toHaveBeenCalled();
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
  describe('onSave()', function () {
    test('should not do anything when no card exists', function () {
      var updateSkills = jest.fn();
      var getMetadataAPI = jest.fn().mockReturnValueOnce({
        updateSkills: updateSkills
      });
      var api = {
        getMetadataAPI: getMetadataAPI
      };
      var wrapper = getWrapper({
        file: {
          permissions: {
            can_upload: true
          }
        },
        api: api
      }, {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      var cards = [];
      wrapper.setState({
        cards: cards
      });
      instance.onSave(0);
      expect(updateSkills).not.toBeCalled();
      expect(getMetadataAPI).not.toBeCalled();
    });
    test('should not do anything when upload permission isnt true', function () {
      var updateSkills = jest.fn();
      var getMetadataAPI = jest.fn().mockReturnValueOnce({
        updateSkills: updateSkills
      });
      var api = {
        getMetadataAPI: getMetadataAPI
      };
      var wrapper = getWrapper({
        file: {},
        api: api
      }, {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      var cards = [{}];
      wrapper.setState({
        cards: cards
      });
      instance.onSave(0);
      expect(updateSkills).not.toBeCalled();
      expect(getMetadataAPI).not.toBeCalled();
    });
    test('should not do anything when no ops', function () {
      var updateSkills = jest.fn();
      var getMetadataAPI = jest.fn().mockReturnValueOnce({
        updateSkills: updateSkills
      });
      var api = {
        getMetadataAPI: getMetadataAPI
      };
      var wrapper = getWrapper({
        file: {
          permissions: {
            can_upload: true
          }
        },
        api: api
      }, {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      var cards = [{}];
      wrapper.setState({
        cards: cards
      });
      instance.onSave(0);
      expect(updateSkills).not.toBeCalled();
      expect(getMetadataAPI).not.toBeCalled();
    });
    test('should call the skills api with coreect ops', function () {
      var file = {
        permissions: {
          can_upload: true
        }
      };
      var card = {
        entries: ['entry0', 'entry1', 'entry2', 'entry3', 'entry4', 'entry5', 'entry6', 'entry7', 'entry8', 'entry9', 'entry10', 'entry11', 'entry12']
      };
      var adds = ['entry13', 'entry14'];
      var removes = ['entry4', 'entry9', 'entry2', 'entry11', 'entry6', 'entry10', 'entry12'];
      var replaces = [{
        replaced: 'entry8',
        replacement: 'entry8-new'
      }, {
        replaced: 'entry1',
        replacement: 'entry1-new'
      }, {
        replaced: 'entry7',
        replacement: 'entry7-new'
      }];
      var updateSkills = jest.fn();
      var getMetadataAPI = jest.fn().mockReturnValueOnce({
        updateSkills: updateSkills
      });
      var api = {
        getMetadataAPI: getMetadataAPI
      };
      var wrapper = getWrapper({
        file: file,
        api: api
      }, {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      var cards = [card];
      wrapper.setState({
        cards: cards
      });
      instance.onSave(0, removes, adds, replaces);
      expect(getMetadataAPI).toBeCalledWith(false);
      expect(updateSkills).toBeCalledWith(file, [{
        op: 'test',
        path: '/cards/0',
        value: card
      }, {
        op: 'replace',
        path: '/cards/0/entries/8',
        value: 'entry8-new'
      }, {
        op: 'replace',
        path: '/cards/0/entries/1',
        value: 'entry1-new'
      }, {
        op: 'replace',
        path: '/cards/0/entries/7',
        value: 'entry7-new'
      }, {
        op: 'remove',
        path: '/cards/0/entries/12'
      }, {
        op: 'remove',
        path: '/cards/0/entries/11'
      }, {
        op: 'remove',
        path: '/cards/0/entries/10'
      }, {
        op: 'remove',
        path: '/cards/0/entries/9'
      }, {
        op: 'remove',
        path: '/cards/0/entries/6'
      }, {
        op: 'remove',
        path: '/cards/0/entries/4'
      }, {
        op: 'remove',
        path: '/cards/0/entries/2'
      }, {
        op: 'add',
        path: '/cards/0/entries/-',
        value: 'entry13'
      }, {
        op: 'add',
        path: '/cards/0/entries/-',
        value: 'entry14'
      }], expect.any(Function), expect.any(Function));
    });
  });
  describe('onSaveSuccessHandler()', function () {
    test('should save the updated cards and remove errored card', function () {
      var errors = {
        0: true,
        1: true
      };
      var wrapper = getWrapper({}, {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      wrapper.setState({
        errors: errors
      });
      instance.setState = jest.fn();
      instance.updatePreviewTranscript = jest.fn();
      instance.onSaveSuccessHandler(1, 'updated');
      expect(instance.updatePreviewTranscript).toBeCalledWith('updated');
      expect(instance.setState).toBeCalledWith({
        cards: 'updated',
        errors: {
          0: true
        }
      });
    });
  });
  describe('onSaveErrorHandler()', function () {
    test('should set flag for errored card', function () {
      var errors = {
        0: true
      };
      var wrapper = getWrapper({}, {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      wrapper.setState({
        errors: errors
      });
      instance.setState = jest.fn();
      instance.onSaveErrorHandler(1);
      expect(instance.setState).toBeCalledWith({
        errors: {
          0: true,
          1: true
        }
      });
    });
  });
  describe('fetchSkillsSuccessCallback()', function () {
    test('update state with fetched skills', function () {
      var wrapper = getWrapper({}, {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      instance.setState = jest.fn();
      instance.updatePreviewTranscript = jest.fn();
      instance.fetchSkillsSuccessCallback('cards');
      expect(instance.updatePreviewTranscript).toBeCalledWith('cards');
      expect(instance.setState).toBeCalledWith({
        cards: 'cards'
      });
    });
  });
  describe('componentDidMount()', function () {
    test('should fetch skills', function () {
      var getSkills = jest.fn();
      var getMetadataAPI = jest.fn().mockReturnValueOnce({
        getSkills: getSkills
      });
      var api = {
        getMetadataAPI: getMetadataAPI
      };
      var file = {
        permissions: {
          can_upload: true
        }
      };
      var wrapper = getWrapper({
        file: file,
        api: api
      });
      var instance = wrapper.instance();
      expect(getMetadataAPI).toBeCalledWith(false);
      expect(getSkills).toBeCalledWith(file, instance.fetchSkillsSuccessCallback, noop);
    });
  });
  describe('componentDidUpdate()', function () {
    var getSkills;
    var getMetadataAPI;
    var wrapper;
    beforeEach(function () {
      getSkills = jest.fn();
      getMetadataAPI = jest.fn().mockReturnValue({
        getSkills: getSkills
      });
      var api = {
        getMetadataAPI: getMetadataAPI
      };
      var file = {
        permissions: {
          can_upload: true
        }
      };
      wrapper = getWrapper({
        file: file,
        api: api,
        refreshIdentity: false
      });
      wrapper.instance();
    });
    test('should fetch skills if refreshIdentity changed', function () {
      wrapper.setProps({
        refreshIdentity: true
      });
      expect(getMetadataAPI).toBeCalledWith(false);
      expect(getSkills.mock.calls.length).toEqual(2);
    });
    test('should not fetch skills if refreshIdentity did not change', function () {
      wrapper.setProps({
        refreshIdentity: false
      });
      expect(getMetadataAPI).toBeCalledWith(false);
      expect(getSkills.mock.calls.length).toEqual(1);
    });
  });
});