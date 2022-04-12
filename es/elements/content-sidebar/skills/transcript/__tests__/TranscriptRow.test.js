import * as React from 'react';
import { shallow } from 'enzyme';
import TranscriptRow from '../TranscriptRow';
describe('elements/content-sidebar/Skills/Transcript/TranscriptRow', function () {
  test('should correctly render read when editing', function () {
    var wrapper = shallow(React.createElement(TranscriptRow, {
      isEditing: true
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render read when not editing', function () {
    var wrapper = shallow(React.createElement(TranscriptRow, null));
    expect(wrapper).toMatchSnapshot();
  });
});