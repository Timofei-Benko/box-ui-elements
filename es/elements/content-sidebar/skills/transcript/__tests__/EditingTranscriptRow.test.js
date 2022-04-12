import * as React from 'react';
import { shallow } from 'enzyme';
import EditingTranscriptRow from '../EditingTranscriptRow';
describe('elements/content-sidebar/Skills/Transcript/TranscriptRow', function () {
  test('should correctly render with time', function () {
    var wrapper = shallow(React.createElement(EditingTranscriptRow, {
      time: "123"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render without time', function () {
    var wrapper = shallow(React.createElement(EditingTranscriptRow, null));
    expect(wrapper).toMatchSnapshot();
  });
});