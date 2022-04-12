function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        commentText                           | expectedCallCount\n        ", "    | ", "\n        ", " | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { mount } from 'enzyme';
import Button from '../../../../../components/button/Button';
import Media from '../../../../../components/media';
import { CommentFormUnwrapped as CommentForm } from '../CommentForm';
jest.mock('../../Avatar', function () {
  return function () {
    return 'Avatar';
  };
});
var intlFake = {
  formatMessage: function formatMessage(message) {
    return message.id;
  }
};
describe('elements/content-sidebar/ActivityFeed/comment-form/CommentForm', function () {
  var render = function render(props) {
    return mount(React.createElement(CommentForm, _extends({
      getMentionWithQuery: function getMentionWithQuery() {},
      intl: intlFake,
      user: {
        id: 123,
        name: 'foo bar'
      }
    }, props)));
  };

  test('should correctly render initial state', function () {
    var wrapper = render();
    expect(wrapper.find('[contentEditable]').length).toEqual(1);
    expect(wrapper.find('.bcs-CommentFormControls').length).toEqual(0);
    expect(wrapper.find('.bcs-CommentFormControls').find('button').length).toEqual(0);
  });
  test('should call onFocus handler when input is focused', function () {
    var onFocusSpy = jest.fn();
    var wrapper = render({
      onFocus: onFocusSpy
    });
    var mentionSelector = wrapper.find('[contentEditable]');
    mentionSelector.simulate('focus');
    expect(onFocusSpy).toHaveBeenCalledTimes(1);
  });
  test('should call oncancel handler when input is canceled', function () {
    var onCancelSpy = jest.fn();
    var wrapper = render({
      isOpen: true,
      onCancel: onCancelSpy
    });
    var cancelButton = wrapper.find(Button).first();
    cancelButton.simulate('click');
    expect(onCancelSpy).toHaveBeenCalledTimes(1);
  });
  test('should render open comment input when isOpen is true', function () {
    var wrapper = render({
      isOpen: true
    });
    expect(wrapper.find(Media).hasClass('bcs-is-open')).toBe(true);
    expect(wrapper.find('.bcs-CommentFormControls').length).toEqual(1);
    expect(wrapper.find('.bcs-CommentFormControls').find('button').length).toEqual(2);
  });
  test('should set required to false on comment input when not open', function () {
    var wrapper = render();
    expect(wrapper.find('DraftJSMentionSelector').at(0).prop('isRequired')).toEqual(false);
  });
  test('should set required to true on comment input when isOpen is true', function () {
    var wrapper = render({
      isOpen: true
    });
    expect(wrapper.find('DraftJSMentionSelector').at(0).prop('isRequired')).toEqual(true);
  }); // Test cases in order
  // empty comment box
  // non empty comment box

  test.each(_templateObject(), {
    text: '',
    hasMention: false
  }, 0, {
    text: 'hey',
    hasMention: false
  }, 1)("should call createComment $expectedCallCount times", function (_ref) {
    var commentText = _ref.commentText,
        expectedCallCount = _ref.expectedCallCount;
    var createCommentSpy = jest.fn();
    var wrapper = render({
      createComment: createCommentSpy
    });
    var instance = wrapper.instance();
    instance.getFormattedCommentText = jest.fn().mockReturnValue(commentText);
    var form = wrapper.find('form');
    var formEl = form.getDOMNode();

    formEl.checkValidity = function () {
      return !!expectedCallCount;
    };

    form.simulate('submit', {
      target: formEl
    });
    expect(createCommentSpy).toHaveBeenCalledTimes(expectedCallCount);
  });
  test('should have editor state reflect tagged_message prop when not empty', function () {
    var wrapper = render({
      tagged_message: 'hey there'
    });
    expect(wrapper.find('DraftJSMentionSelector').at(0).prop('placeholder')).toBeUndefined();
    var content = wrapper.state().commentEditorState.getCurrentContent().getPlainText();
    expect(content).toEqual('hey there');
  });
  test('should have editor state reflect empty state when no tagged_message prop is passed', function () {
    var wrapper = render();
    expect(wrapper.find('DraftJSMentionSelector').at(0).prop('placeholder')).toEqual('be.contentSidebar.activityFeed.commentForm.commentWrite');
    var content = wrapper.state().commentEditorState.getCurrentContent().getPlainText();
    expect(content).toEqual('');
  });
  test('should not display trigger @mention selector when getMentionQuery prop is empty', function () {
    var wrapper = render({
      getMentionWithQuery: null
    });
    expect(wrapper.find('DraftJSMentionSelector').at(0).prop('onMention')).toEqual(null);
  });
  test('should not show mention tip is showTip is false', function () {
    var wrapper = render({
      showTip: false
    });
    expect(wrapper.find('.bcs-CommentForm-tip').length).toEqual(0);
  });
});