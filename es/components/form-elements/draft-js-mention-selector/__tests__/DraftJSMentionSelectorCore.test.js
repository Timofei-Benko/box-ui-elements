function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { mount, shallow } from 'enzyme';
import { EditorState } from 'draft-js';
import sinon from 'sinon';
import * as utils from '../utils';
import DraftJSEditor from '../../../draft-js-editor';
import DraftJSMentionSelector from '../DraftJSMentionSelectorCore';
var sandbox = sinon.sandbox.create();
describe('components/form-elements/draft-js-mention-selector/DraftJSMentionSelector', function () {
  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  var requiredProps = {
    editorState: EditorState.createEmpty(),
    label: 'mention selector'
  };
  describe('render()', function () {
    test('should correctly render the component', function () {
      var wrapper = mount(React.createElement(DraftJSMentionSelector, requiredProps));
      expect(wrapper.childAt(0).hasClass('mention-selector-wrapper')).toBe(true);
      expect(wrapper.find(DraftJSEditor).length).toBe(1);
    });
    test('should correctly render the selector dropdown', function () {
      var wrapper = shallow(React.createElement(DraftJSMentionSelector, requiredProps));
      var dropdown = wrapper.find('SelectorDropdown');
      expect(dropdown.length).toBe(1);
      expect(dropdown.prop('onSelect')).toEqual(wrapper.instance().handleContactSelected);
    });
    [// no onMention method, no focus, activeMention set, mention string empty
    {
      onMention: undefined,
      isFocused: false,
      activeMention: {
        foo: 'bar'
      },
      shouldShowMentionStartState: false
    }, // no focus, activeMention set, mention string empty
    {
      onMention: sandbox.stub(),
      isFocused: false,
      activeMention: {
        foo: 'bar'
      },
      shouldShowMentionStartState: false
    }, // focus, activeMention set, mention string empty
    {
      onMention: sandbox.stub(),
      isFocused: true,
      activeMention: {
        foo: 'bar'
      },
      shouldShowMentionStartState: true
    }, // focus, activeMention set, mention string not empty
    {
      onMention: sandbox.stub(),
      isFocused: true,
      activeMention: {
        mentionString: 'bar'
      },
      shouldShowMentionStartState: false
    }].forEach(function (_ref) {
      var onMention = _ref.onMention,
          isFocused = _ref.isFocused,
          activeMention = _ref.activeMention,
          shouldShowMentionStartState = _ref.shouldShowMentionStartState;
      var wrapper = mount(React.createElement(DraftJSMentionSelector, _extends({}, requiredProps, {
        onMention: onMention
      })));
      wrapper.setState({
        activeMention: activeMention,
        isFocused: isFocused
      });

      if (shouldShowMentionStartState) {
        test('should show MentionStartState', function () {
          expect(wrapper.find('MentionStartState').length).toBe(1);
        });
      } else {
        test('should not show MentionStartState', function () {
          expect(wrapper.find('MentionStartState').length).toBe(0);
        });
      }
    });
  });
  describe('should announce amount of users tagged to screenReader users', function () {
    var args = {
      editorState: EditorState.createEmpty(),
      label: 'mention selector',
      contactsLoaded: true
    };
    var wrapper = mount(React.createElement(DraftJSMentionSelector, args));
    test('should show an alert', function () {
      expect(wrapper.find('[data-testid="accessibility-alert"]').length).toBe(1);
    });
  });
  describe('should not announce users tagged to screenReader users', function () {
    var args = {
      editorState: EditorState.createEmpty(),
      label: 'mention selector',
      contactsLoaded: false
    };
    var wrapper = mount(React.createElement(DraftJSMentionSelector, args));
    test('should not render any alert', function () {
      expect(wrapper.find('[data-testid="accessibility-alert"]').length).toBe(0);
    });
  });
  describe('shouldDisplayMentionLookup()', function () {
    var exampleMention = {
      mentionString: '@foo'
    };
    var exampleContacts = [{
      id: 1,
      name: 'foo'
    }];
    [// activeMention and contacts set
    {
      activeMention: exampleMention,
      contacts: exampleContacts,
      expected: true
    }, // activeMention unset, contacts set
    {
      activeMention: null,
      contacts: exampleContacts,
      expected: false
    }, // activeMention set, contacts empty
    {
      activeMention: exampleMention,
      contacts: [],
      expected: false
    }].forEach(function (_ref2) {
      var activeMention = _ref2.activeMention,
          contacts = _ref2.contacts,
          expected = _ref2.expected;
      var wrapper = shallow(React.createElement(DraftJSMentionSelector, _extends({}, requiredProps, {
        contacts: contacts
      })));
      wrapper.setState({
        activeMention: activeMention
      });
      var instance = wrapper.instance();

      if (expected) {
        test('should return true', function () {
          expect(instance.shouldDisplayMentionLookup()).toBe(true);
        });
      } else {
        test('should return false', function () {
          expect(instance.shouldDisplayMentionLookup()).toBe(false);
        });
      }
    });
  });
  describe('getActiveMentionForEditorState()', function () {
    test('should call getActiveMentionForEditorState from utils', function () {
      var wrapper = shallow(React.createElement(DraftJSMentionSelector, requiredProps));
      wrapper.setState({
        mentionPattern: 'testPattern'
      });
      var getMentionStub = sandbox.stub(utils, 'getActiveMentionForEditorState');
      wrapper.instance().getActiveMentionForEditorState('testState');
      expect(getMentionStub.calledWith('testState', 'testPattern')).toBe(true);
    });
  });
  describe('handleMention()', function () {
    [// a mention active
    {
      activeMention: {
        mentionString: 'bar'
      },
      expected: 'bar'
    }, // no mention active
    {
      activeMention: null,
      expected: ''
    }].forEach(function (_ref3) {
      var activeMention = _ref3.activeMention,
          expected = _ref3.expected;
      test('should call props.onMention with the appropriate string', function () {
        var wrapper = shallow(React.createElement(DraftJSMentionSelector, _extends({}, requiredProps, {
          onMention: sandbox.mock().withArgs(expected)
        })));
        wrapper.setState({
          activeMention: activeMention
        });
        var instance = wrapper.instance();
        instance.handleMention();
      });
    });
  });
  describe('handleContactSelected()', function () {
    var wrapper = shallow(React.createElement(DraftJSMentionSelector, _extends({}, requiredProps, {
      contacts: [{
        name: 'foo'
      }, {
        name: 'bar'
      }, {
        name: 'baz'
      }]
    })));
    var instance = wrapper.instance();
    test('should call addMention with the appropriate contact when called', function () {
      sandbox.mock(instance).expects('addMention').withArgs({
        name: 'foo'
      });
      instance.handleContactSelected(0);
    });
    test('should update state when called', function () {
      sandbox.stub(instance, 'addMention');
      sandbox.mock(instance).expects('setState').withArgs({
        activeMention: null,
        isFocused: true
      });
      instance.handleContactSelected(0);
    });
    test('should call handleMention when called', function () {
      sandbox.stub(instance, 'addMention');
      sandbox.mock(instance).expects('handleMention');
      instance.handleContactSelected(0);
    });
  });
  describe('handleBlur()', function () {
    test('should update state and call onBlur prop when called', function () {
      var event = {
        uno: 1
      };
      var wrapper = shallow(React.createElement(DraftJSMentionSelector, _extends({}, requiredProps, {
        onBlur: sandbox.mock().withArgs(event)
      })));
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('setState').withArgs({
        isFocused: false
      });
      instance.handleBlur(event);
    });
  });
  describe('handleFocus()', function () {
    test('should update state and call onFocus prop when called', function () {
      var event = {
        uno: 1
      };
      var wrapper = shallow(React.createElement(DraftJSMentionSelector, _extends({}, requiredProps, {
        onFocus: sandbox.mock().withArgs(event)
      })));
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('setState').withArgs({
        isFocused: true
      });
      instance.handleFocus(event);
    });
  });
  describe('handleChange()', function () {
    var nextEditorState = {
      zwei: '2'
    };
    test('should call onChange prop and setState when called', function () {
      var activeMention = {};
      var wrapper = shallow(React.createElement(DraftJSMentionSelector, _extends({}, requiredProps, {
        onChange: sandbox.mock().withArgs(nextEditorState)
      })));
      var instance = wrapper.instance();
      sandbox.stub(instance, 'getActiveMentionForEditorState').returns(activeMention);
      var setStateSpy = sandbox.spy(instance, 'setState');
      instance.handleChange(nextEditorState);
      expect(setStateSpy.calledWith({
        activeMention: activeMention
      })).toBe(true);
    });
    test('should call handleMention when called if there is an active mention', function () {
      var activeMention = {
        mentionString: 'foo'
      };
      var wrapper = shallow(React.createElement(DraftJSMentionSelector, _extends({}, requiredProps, {
        onChange: sandbox.mock().withArgs(nextEditorState)
      })));
      var instance = wrapper.instance();
      sandbox.stub(instance, 'getActiveMentionForEditorState').returns(activeMention);
      sandbox.mock(instance).expects('handleMention');
      instance.handleChange(nextEditorState);
    });
  });
  describe('addMention()', function () {
    test('should call addMention from utils', function () {
      var wrapper = shallow(React.createElement(DraftJSMentionSelector, _extends({}, requiredProps, {
        editorState: "testState"
      })));
      wrapper.setState({
        activeMention: 'testActiveMention'
      });
      var instance = wrapper.instance();
      var addMentionStub = sandbox.stub(utils, 'addMention').returns('testReturn');
      var setStateSpy = sandbox.spy(instance, 'setState');
      var handleChangeStub = sandbox.stub(instance, 'handleChange');
      instance.addMention('testMention');
      expect(addMentionStub.calledWith('testState', 'testActiveMention', 'testMention')).toBe(true);
      expect(setStateSpy.calledWith({
        activeMention: null
      })).toBe(true);
      expect(handleChangeStub.calledWith('testReturn')).toBe(true);
    });
  });
  describe('componentDidUpdate()', function () {
    test('should set active mention to null if empty contacts are passed in', function () {
      var contact = {
        id: 1,
        item: {},
        name: 'John',
        value: '867-5309'
      };
      var wrapper = shallow(React.createElement(DraftJSMentionSelector, _extends({}, requiredProps, {
        contacts: [contact]
      })));
      wrapper.setState({
        activeMention: {}
      });
      wrapper.setProps({
        contacts: []
      });
      expect(wrapper.state('activeMention')).toBe(null);
    });
  });
});