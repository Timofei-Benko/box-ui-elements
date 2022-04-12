function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            testcase             | editorState                  | expectedResult\n            ", "           | ", "          | ", "\n            ", "       | ", "       | ", "\n            ", " | ", " | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { mount, shallow } from 'enzyme';
import { ContentState, EditorState } from 'draft-js';
import sinon from 'sinon';
import DraftJSMentionSelector from '..';
import * as messages from '../../input-messages';
var sandbox = sinon.sandbox.create();
describe('bcomponents/form-elements/draft-js-mention-selector/DraftJSMentionSelector', function () {
  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  var requiredProps = {
    contacts: [],
    label: 'label',
    name: 'name',
    onMention: function onMention() {}
  };
  describe('render()', function () {
    test('should correctly render the component', function () {
      var wrapper = shallow(React.createElement(DraftJSMentionSelector, requiredProps));
      expect(wrapper.find('FormInput').length).toBe(1);
    });
  });
  describe('getDerivedStateFromProps()', function () {
    test('should return contacts from props', function () {
      expect(DraftJSMentionSelector.getDerivedStateFromProps({
        contacts: []
      })).toEqual({
        contacts: []
      });
    });
    test('should return null if no contacts from props', function () {
      expect(DraftJSMentionSelector.getDerivedStateFromProps({})).toEqual(null);
    });
  });
  describe('componentDidUpdate()', function () {
    var mockGetDerivedStateFromEditorState;
    var mockCheckValidityIfAllowed;
    var spySetState;

    var setupInstance = function setupInstance(props) {
      var wrapper = shallow(React.createElement(DraftJSMentionSelector, props));
      var instance = wrapper.instance();
      mockGetDerivedStateFromEditorState = jest.fn();
      mockCheckValidityIfAllowed = jest.fn();
      spySetState = jest.spyOn(instance, 'setState');
      instance.getDerivedStateFromEditorState = mockGetDerivedStateFromEditorState;
      instance.checkValidityIfAllowed = mockCheckValidityIfAllowed;
      return wrapper;
    };

    test('should set new state in internal editor state mode when it changes', function () {
      var wrapper = setupInstance(requiredProps);
      mockGetDerivedStateFromEditorState.mockReturnValue({});
      wrapper.setState({
        internalEditorState: EditorState.createWithContent(ContentState.createFromText('hello'))
      });
      expect(mockGetDerivedStateFromEditorState).toHaveBeenCalled();
      expect(spySetState).toHaveBeenCalledWith({}, mockCheckValidityIfAllowed);
    });
    test('should check validity in internal editor state mode when it changes but derived state is null', function () {
      var wrapper = setupInstance(requiredProps);
      mockGetDerivedStateFromEditorState.mockReturnValue(null);
      wrapper.setState({
        internalEditorState: EditorState.createWithContent(ContentState.createFromText('hello'))
      });
      expect(mockGetDerivedStateFromEditorState).toHaveBeenCalled();
      expect(spySetState).not.toHaveBeenCalled();
    });
    test('should set new state in external editor state mode when it changes', function () {
      var initialProps = _objectSpread({}, requiredProps, {
        editorState: EditorState.createEmpty()
      });

      var wrapper = setupInstance(initialProps);
      mockGetDerivedStateFromEditorState.mockReturnValue({});
      wrapper.setProps({
        editorState: EditorState.createWithContent(ContentState.createFromText('hello'))
      });
      expect(mockGetDerivedStateFromEditorState).toHaveBeenCalled();
      expect(spySetState).toHaveBeenCalledWith({}, mockCheckValidityIfAllowed);
    });
    test('should check validity in external editor state mode when it changes but derived state is null', function () {
      var initialProps = _objectSpread({}, requiredProps, {
        editorState: EditorState.createEmpty()
      });

      var wrapper = setupInstance(initialProps);
      mockGetDerivedStateFromEditorState.mockReturnValue(null);
      wrapper.setProps({
        editorState: EditorState.createWithContent(ContentState.createFromText('hello'))
      });
      expect(mockGetDerivedStateFromEditorState).toHaveBeenCalled();
      expect(spySetState).not.toHaveBeenCalled();
    });
    test('should not call getDerivedStateFromEditorState in internal editor state mode if same reference', function () {
      var wrapper = setupInstance(requiredProps);
      var constantEditorState = EditorState.createWithContent(ContentState.createFromText('hello'));
      wrapper.setState({
        internalEditorState: constantEditorState
      });
      mockGetDerivedStateFromEditorState.mockClear();
      wrapper.setState({
        internalEditorState: constantEditorState
      });
      expect(mockGetDerivedStateFromEditorState).not.toHaveBeenCalled();
      expect(spySetState).not.toHaveBeenCalled();
    });
    test('should not call getDerivedStateFromEditorState in external editor state mode if same reference', function () {
      var constantEditorState = EditorState.createWithContent(ContentState.createFromText('hello'));

      var initialProps = _objectSpread({}, requiredProps, {
        editorState: constantEditorState
      });

      var wrapper = setupInstance(initialProps);
      wrapper.setProps({
        editorState: constantEditorState
      });
      expect(mockGetDerivedStateFromEditorState).not.toHaveBeenCalled();
      expect(spySetState).not.toHaveBeenCalled();
    });
  });
  describe('getDerivedStateFromEditorState', function () {
    var wrapper;
    var instance;
    var mockIsEditorStateEmpty;
    beforeEach(function () {
      wrapper = shallow(React.createElement(DraftJSMentionSelector, requiredProps));
      instance = wrapper.instance();
      mockIsEditorStateEmpty = jest.fn();
      instance.isEditorStateEmpty = mockIsEditorStateEmpty;
    });
    test('should return isTouched false if is new editor state', function () {
      mockIsEditorStateEmpty.mockReturnValueOnce(false).mockReturnValueOnce(true);
      expect(instance.getDerivedStateFromEditorState()).toEqual({
        isTouched: false,
        error: null
      });
    });
    test('should return isTouched true if editor state is dirty', function () {
      mockIsEditorStateEmpty.mockReturnValueOnce(true).mockReturnValueOnce(false);
      expect(instance.getDerivedStateFromEditorState()).toEqual({
        isTouched: true
      });
    });
    test('should return null if not new editor state nor dirty editor', function () {
      mockIsEditorStateEmpty.mockReturnValueOnce(true).mockReturnValueOnce(true);
      expect(instance.getDerivedStateFromEditorState()).toEqual(null);
    });
  });
  describe('getErrorFromValidityState()', function () {
    var minLength = 4;
    var maxLength = 9;
    [// too long optional string
    {
      str: 'foo bar baz woo',
      isRequired: false,
      expected: messages.tooLong(maxLength)
    }, // too short optional string
    {
      str: 'foo',
      isRequired: false,
      expected: messages.tooShort(minLength)
    }, {
      str: '',
      isRequired: true,
      expected: messages.valueMissing()
    }, // empty required string
    {
      str: '',
      isRequired: true,
      expected: messages.valueMissing()
    }, // good lemgth required string
    {
      str: 'all good',
      isRequired: true,
      expected: null
    }, // good length optional string
    {
      str: 'all good',
      isRequired: false,
      expected: null
    }].forEach(function (_ref) {
      var str = _ref.str,
          isRequired = _ref.isRequired,
          expected = _ref.expected;
      test('should return the correct error state', function () {
        var editorState = EditorState.createWithContent(ContentState.createFromText(str));
        var wrapper = shallow(React.createElement(DraftJSMentionSelector, _extends({}, requiredProps, {
          editorState: editorState,
          isRequired: isRequired,
          maxLength: maxLength,
          minLength: minLength
        })));
        var instance = wrapper.instance();
        var result = instance.getErrorFromValidityState();
        expect(result).toEqual(expected);
      });
    });
  });
  describe('handleBlur()', function () {
    [{
      validateOnBlur: true
    }, {
      validateOnBlur: false
    }].forEach(function (_ref2) {
      var validateOnBlur = _ref2.validateOnBlur;
      var wrapper = mount(React.createElement(DraftJSMentionSelector, _extends({}, requiredProps, {
        validateOnBlur: validateOnBlur
      })));
      var instance = wrapper.instance();
      afterEach(function () {
        instance.handleBlur({
          relatedTarget: document.createElement('div')
        });
      });

      if (validateOnBlur) {
        test('should call checkValidity when called', function () {
          sandbox.mock(instance).expects('checkValidity');
        });
      } else {
        test('should not call checkValidity when called', function () {
          sandbox.mock(instance).expects('checkValidity').never();
        });
      }
    });
  });
  describe('handleChange()', function () {
    var wrapper;
    var instance;
    var mockOnChange;
    var spySetState;

    var setup = function setup(props) {
      mockOnChange = jest.fn();
      wrapper = shallow(React.createElement(DraftJSMentionSelector, _extends({}, props, {
        onChange: mockOnChange
      })));
      instance = wrapper.instance();
      spySetState = jest.spyOn(instance, 'setState');
    };

    test('should call onChange and setState if internal editor state exists', function () {
      setup(_objectSpread({}, requiredProps));
      var dummyEditorState = EditorState.createEmpty();
      instance.handleChange(dummyEditorState);
      expect(mockOnChange).toHaveBeenCalledWith(dummyEditorState);
      expect(spySetState).toHaveBeenCalledWith({
        internalEditorState: dummyEditorState
      });
    });
    test('should call onChange and not setState if no internal editor state exists', function () {
      var dummyEditorState = EditorState.createEmpty();
      setup(_objectSpread({}, requiredProps, {
        editorState: dummyEditorState
      }));
      instance.handleChange(dummyEditorState);
      expect(mockOnChange).toHaveBeenCalledWith(dummyEditorState);
      expect(spySetState).not.toHaveBeenCalled();
    });
  });
  describe('handleValidityStateUpdateHandler()', function () {
    [{
      isTouched: true
    }, {
      isTouched: false
    }].forEach(function (_ref3) {
      var isTouched = _ref3.isTouched;
      var err = 'oh no';
      var wrapper = shallow(React.createElement(DraftJSMentionSelector, requiredProps));
      var instance = wrapper.instance();
      beforeEach(function () {
        wrapper.setState({
          isTouched: isTouched
        });
        sandbox.stub(instance, 'getErrorFromValidityState').returns(err);
      });
      afterEach(function () {
        instance.handleValidityStateUpdateHandler();
      });

      if (isTouched) {
        test('should update state', function () {
          sandbox.mock(instance).expects('setState').withArgs({
            error: err
          });
        });
      } else {
        test('should not update state', function () {
          sandbox.mock(instance).expects('setState').never();
        });
      }
    });
  });
  describe('checkValidity()', function () {
    test('should call handleValidityStateUpdateHandler when called', function () {
      var wrapper = shallow(React.createElement(DraftJSMentionSelector, requiredProps));
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('handleValidityStateUpdateHandler');
      instance.checkValidity();
    });
  });
  describe('isEditorStateEmpty', function () {
    var emptyEditorState = EditorState.createEmpty();
    var contentState = ContentState.createFromText('');
    var editorStateWithChangeType = EditorState.push(emptyEditorState, contentState, 'backspace-character');
    var nonEmptyEditorState = EditorState.createWithContent(ContentState.createFromText('hello'));
    test.each(_templateObject(), 'empty', emptyEditorState, true, 'not empty', nonEmptyEditorState, false, 'has change type', editorStateWithChangeType, false)('should return whether the editor state is empty or not: $testcase', function (_ref4) {
      var editorState = _ref4.editorState,
          expectedResult = _ref4.expectedResult;
      var wrapper = shallow(React.createElement(DraftJSMentionSelector, requiredProps));
      var instance = wrapper.instance();
      expect(instance.isEditorStateEmpty(editorState)).toEqual(expectedResult);
    });
  });
});