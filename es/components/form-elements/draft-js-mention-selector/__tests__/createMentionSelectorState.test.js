import { convertToRaw } from 'draft-js';
import createMentionSelectorState from '../createMentionSelectorState';
describe('components/form-elements/draft-js-mention-selector/createMentionSelectorState', function () {
  test('restores mentions from string', function () {
    var stringWithMentions = "Hey @[123:Jim], do this";
    var editorState = createMentionSelectorState(stringWithMentions);
    var contentStateRaw = convertToRaw(editorState.getCurrentContent());
    expect(contentStateRaw.blocks[0].text).toEqual('Hey @Jim, do this');
    expect(contentStateRaw.entityMap[0].type).toEqual('MENTION');
    expect(contentStateRaw.entityMap[0].data.id).toEqual('123');
  });
  test('restores multiline mentions from string', function () {
    var stringWithMentions = "Hey @[456:Pam], do this\nand talk to @[789:Dwight]";
    var editorState = createMentionSelectorState(stringWithMentions);
    var contentStateRaw = convertToRaw(editorState.getCurrentContent());
    expect(contentStateRaw.entityMap[0].type).toEqual('MENTION');
    expect(contentStateRaw.entityMap[0].data.id).toEqual('456');
    expect(contentStateRaw.entityMap[1].type).toEqual('MENTION');
    expect(contentStateRaw.entityMap[1].data.id).toEqual('789');
    expect(contentStateRaw.blocks).toEqual(expect.arrayContaining([expect.objectContaining({
      text: "Hey @Pam, do this"
    })]));
    expect(contentStateRaw.blocks).toEqual(expect.arrayContaining([expect.objectContaining({
      text: "and talk to @Dwight"
    })]));
  });
});