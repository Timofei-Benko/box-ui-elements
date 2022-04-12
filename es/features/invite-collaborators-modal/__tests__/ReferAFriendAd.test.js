import React from 'react';
import ReferAFriendAd from '../ReferAFriendAd';
describe('features/invite-collaborators-modal/ReferAFriendAd', function () {
  var getWrapper = function getWrapper() {
    return shallow(React.createElement(ReferAFriendAd, null));
  };

  describe('render()', function () {
    test('should render correctly', function () {
      expect(getWrapper()).toMatchSnapshot();
    });
  });
});