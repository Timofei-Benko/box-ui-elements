function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n            rawContent                           | expected\n            ", "              | ", "\n            ", "               | ", "\n            ", "             | ", "\n            ", " | ", "\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            editorState              | selectionState                          | expected\n            ", " | ", "             | ", "\n            ", " | ", "             | ", "\n            ", " | ", " | ", "\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            input                     | editorState\n            ", "       | ", "\n            ", " | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import { convertFromRaw, ContentState, EditorState } from 'draft-js';
import { addMention, getActiveMentionForEditorState, getFormattedCommentText } from '../utils';
var noMentionEditorState = EditorState.createWithContent(ContentState.createFromText('No mention here'));
var oneMentionEditorState = EditorState.createWithContent(ContentState.createFromText('Hey @foo'));
var twoMentionEditorState = EditorState.createWithContent(ContentState.createFromText('Hi @foo, meet @bar')); // one string beginning with "@"

var oneMentionSelectionState = oneMentionEditorState.getSelection().merge({
  anchorOffset: 8,
  focusOffset: 8
}); // two strings beginning with "@"

var twoMentionSelectionState = twoMentionEditorState.getSelection().merge({
  anchorOffset: 18,
  focusOffset: 18
}); // two strings beginning "@", cursor inside one

var twoMentionSelectionStateCursorInside = twoMentionEditorState.getSelection().merge({
  anchorOffset: 17,
  focusOffset: 17
});
var oneMentionExpectedMention = {
  mentionString: 'foo',
  mentionTrigger: '@',
  start: 4,
  end: 8
};
var twoMentionExpectedMention = {
  mentionString: 'bar',
  mentionTrigger: '@',
  start: 14,
  end: 18
};
var twoMentionCursorInsideExpectedMention = {
  mentionString: 'ba',
  mentionTrigger: '@',
  start: 14,
  end: 17
};
describe('components/form-elements/draft-js-mention-selector/utils', function () {
  describe('getActiveMentionForEditorState()', function () {
    test.each(_templateObject(), 'input is empty', EditorState.createEmpty(), 'input has no mention', noMentionEditorState)('should return null if $input', function (_ref) {
      var editorState = _ref.editorState;
      expect(getActiveMentionForEditorState(editorState)).toBeNull();
    });
    test('should return null when cursor is not over a mention', function () {
      var editorState = oneMentionEditorState;
      var selectionStateAtBeginning = editorState.getSelection().merge({
        anchorOffset: 0,
        focusOffset: 0
      });
      var editorStateWithForcedSelection = EditorState.acceptSelection(editorState, selectionStateAtBeginning);
      var result = getActiveMentionForEditorState(editorStateWithForcedSelection);
      expect(result).toBeNull();
    });
    test.each(_templateObject2(), oneMentionEditorState, oneMentionSelectionState, oneMentionExpectedMention, twoMentionEditorState, twoMentionSelectionState, twoMentionExpectedMention, twoMentionEditorState, twoMentionSelectionStateCursorInside, twoMentionCursorInsideExpectedMention)('should return the selected mention when it is selected', function (_ref2) {
      var editorState = _ref2.editorState,
          selectionState = _ref2.selectionState,
          expected = _ref2.expected;
      var editorStateWithForcedSelection = EditorState.acceptSelection(editorState, selectionState);
      var result = getActiveMentionForEditorState(editorStateWithForcedSelection);
      Object.keys(expected).forEach(function (key) {
        expect(result[key]).toEqual(expected[key]);
      });
    });
  });
  describe('addMention()', function () {
    test('should return updated string (plus space)', function () {
      var mention = {
        id: 1,
        name: 'Fool Name'
      };
      var editorStateWithLink = addMention(oneMentionEditorState, oneMentionExpectedMention, mention);
      expect(editorStateWithLink.getCurrentContent().getPlainText()).toEqual('Hey @Fool Name ');
    });
  });
  describe('getFormattedCommentText()', function () {
    var rawContentNoEntities = {
      blocks: [{
        text: 'Hey there',
        type: 'unstyled',
        entityRanges: []
      }],
      entityMap: {
        first: {
          type: 'MENTION',
          mutability: 'IMMUTABLE'
        }
      }
    };
    var rawContentOneEntity = {
      blocks: [{
        text: 'Hey @Becky',
        type: 'unstyled',
        entityRanges: [{
          offset: 4,
          length: 6,
          key: 'first'
        }]
      }],
      entityMap: {
        first: {
          type: 'MENTION',
          mutability: 'IMMUTABLE',
          data: {
            id: 1
          }
        }
      }
    };
    var rawContentTwoEntities = {
      blocks: [{
        text: 'I hung out with @Becky and @Shania',
        type: 'unstyled',
        entityRanges: [{
          offset: 16,
          length: 6,
          key: 'first'
        }, {
          offset: 27,
          length: 7,
          key: 'second'
        }]
      }],
      entityMap: {
        first: {
          type: 'MENTION',
          mutability: 'IMMUTABLE',
          data: {
            id: 1
          }
        },
        second: {
          type: 'MENTION',
          mutability: 'IMMUTABLE',
          data: {
            id: 2
          }
        }
      }
    };
    var rawContentTwoEntitiesOneLineBreak = {
      blocks: [{
        text: 'I hung out with @Becky and',
        type: 'unstyled',
        entityRanges: [{
          offset: 16,
          length: 6,
          key: 'first'
        }]
      }, {
        text: '@Shania yesterday',
        type: 'unstyled',
        entityRanges: [{
          offset: 0,
          length: 7,
          key: 'second'
        }]
      }],
      entityMap: {
        first: {
          type: 'MENTION',
          mutability: 'IMMUTABLE',
          data: {
            id: 1
          }
        },
        second: {
          type: 'MENTION',
          mutability: 'IMMUTABLE',
          data: {
            id: 2
          }
        }
      }
    }; // Test cases in order
    // no entities in the editor
    // one entity in the editor
    // two entities in the editor
    // two entities and a linebreak in the editor

    test.each(_templateObject3(), rawContentNoEntities, {
      text: 'Hey there',
      hasMention: false
    }, rawContentOneEntity, {
      text: 'Hey @[1:Becky]',
      hasMention: true
    }, rawContentTwoEntities, {
      text: 'I hung out with @[1:Becky] and @[2:Shania]',
      hasMention: true
    }, rawContentTwoEntitiesOneLineBreak, {
      text: 'I hung out with @[1:Becky] and\n@[2:Shania] yesterday',
      hasMention: true
    })('should return the correct result', function (_ref3) {
      var rawContent = _ref3.rawContent,
          expected = _ref3.expected;
      var blocks = convertFromRaw(rawContent);
      var dummyEditorState = EditorState.createWithContent(blocks);
      expect(getFormattedCommentText(dummyEditorState)).toEqual(expected);
    });
  });
});