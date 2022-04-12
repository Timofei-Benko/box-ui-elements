import * as React from 'react';
import { shallow } from 'enzyme';
import PreviewErrorNotification from '../PreviewErrorNotification';

var getWrapper = function getWrapper() {
  return shallow(React.createElement(PreviewErrorNotification, null));
};

describe('components/message-preview-content/PreviewErrorNotification.js', function () {
  test('should render correctly', function () {
    expect(getWrapper()).toMatchSnapshot();
  });
});