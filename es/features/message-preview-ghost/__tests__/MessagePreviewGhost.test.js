import * as React from 'react';
import { shallow } from 'enzyme';
import MessagePreviewGhost from '../MessagePreviewGhost';

var getWrapper = function getWrapper() {
  return shallow(React.createElement(MessagePreviewGhost, null));
};

describe('components/message-preview-ghost/MessagePreviewGhost.js', function () {
  test('should render correctly', function () {
    expect(getWrapper()).toMatchSnapshot();
  });
});