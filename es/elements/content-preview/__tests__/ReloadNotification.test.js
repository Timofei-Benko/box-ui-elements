import React from 'react';
import { shallow } from 'enzyme';
import ReloadNotification from '../ReloadNotification';

var getWrapper = function getWrapper() {
  return shallow(React.createElement(ReloadNotification, null));
};

describe('elements/content-preview/ReloadNotification', function () {
  describe('render()', function () {
    test('should render correctly', function () {
      var wrapper = getWrapper();
      expect(wrapper).toMatchSnapshot();
    });
  });
});