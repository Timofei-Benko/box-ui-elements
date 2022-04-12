function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import sinon from 'sinon';
import { Editor, EditorState } from 'draft-js';
import DraftJSEditor from '..';
var sandbox = sinon.sandbox.create();
describe('components/draft-js-editor/DraftJSEditor', function () {
  var requiredProps = {
    editorState: EditorState.createEmpty(),
    label: 'Label text',
    description: 'talesss',
    onBlur: function onBlur() {},
    onChange: sandbox.stub(),
    onFocus: function onFocus() {}
  };
  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  describe('render()', function () {
    test('should correctly render the component', function () {
      var wrapper = shallow(React.createElement(DraftJSEditor, requiredProps));
      var tooltip = wrapper.find('Tooltip');
      expect(wrapper.hasClass('draft-js-editor')).toBe(true);
      expect(tooltip.length).toBe(1);
      expect(tooltip.children().is('div')).toBe(true);
      expect(wrapper.find(Editor).length).toBe(1);
    });
    test('should hide label when specified', function () {
      var wrapper = shallow(React.createElement(DraftJSEditor, _extends({}, requiredProps, {
        hideLabel: true
      })));
      expect(wrapper.find('.bdl-Label').hasClass('accessibility-hidden')).toBe(true);
    });
    test('should render optional message', function () {
      var wrapper = shallow(React.createElement(DraftJSEditor, _extends({}, requiredProps, {
        isRequired: false
      })));
      expect(wrapper.find('OptionalFormattedMessage').exists()).toBe(true);
    });
    test('should set description when specified', function () {
      var wrapper = shallow(React.createElement(DraftJSEditor, requiredProps));
      expect(wrapper.find('.screenreader-description').text()).toEqual(requiredProps.description);
    });
    test('should call handleChange when <Editor /> onchange called', function () {
      var wrapper = shallow(React.createElement(DraftJSEditor, requiredProps));
      var instance = wrapper.instance();
      sandbox.mock(instance).expects('handleChange');
      wrapper.setProps({});
      var editor = wrapper.find(Editor);
      editor.prop('onChange')();
    });
    test('should render with a11y props when inputProps is passed in', function () {
      var inputProps = {
        'aria-activedescendant': 'active',
        'aria-autocomplete': 'list',
        'aria-expanded': true,
        'aria-owns': 'id',
        role: 'textbox'
      };
      var wrapper = shallow(React.createElement(DraftJSEditor, _extends({}, requiredProps, {
        inputProps: inputProps
      })));
      var editor = wrapper.find(Editor);
      expect(editor.prop('ariaActiveDescendantID')).toEqual(inputProps['aria-activedescendant']);
      expect(editor.prop('ariaAutoComplete')).toEqual(inputProps['aria-autocomplete']);
      expect(editor.prop('ariaExpanded')).toEqual(inputProps['aria-expanded']);
      expect(editor.prop('ariaOwneeID')).toEqual(inputProps['aria-owns']);
      expect(editor.prop('role')).toEqual('textbox');
    });
  });
  describe('handleChange()', function () {
    test('should call passed-in onChange handler when called', function () {
      var wrapper = shallow(React.createElement(DraftJSEditor, _extends({}, requiredProps, {
        onChange: sandbox.mock()
      })));
      var instance = wrapper.instance();
      instance.handleChange();
    });
  });
  describe('handleReturn()', function () {
    var returnKeyEvent = {
      key: 'Enter'
    };
    [{
      isReturnHandled: true
    }, {
      isReturnHandled: false
    }].forEach(function (_ref) {
      var isReturnHandled = _ref.isReturnHandled;
      var wrapper = shallow(React.createElement(DraftJSEditor, _extends({}, requiredProps, {
        onReturn: sandbox.stub().withArgs(returnKeyEvent).returns(isReturnHandled)
      })));
      var instance = wrapper.instance();
      var handleResult = instance.handleReturn(returnKeyEvent);
      expect(handleResult).toEqual(isReturnHandled ? 'handled' : 'not-handled');
    });
    test('should return <not-handled> if onReturn prop is not set', function () {
      var wrapper = shallow(React.createElement(DraftJSEditor, requiredProps));
      var instance = wrapper.instance();
      var handleResult = instance.handleReturn(returnKeyEvent);
      expect(handleResult).toEqual('not-handled');
    });
  });
});