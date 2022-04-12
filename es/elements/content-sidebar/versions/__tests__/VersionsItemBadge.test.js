import * as React from 'react';
import { render } from 'enzyme/build';
import VersionsItemBadge from '../VersionsItemBadge';
describe('elements/content-sidebar/versions/VersionsItemBadge', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return render(React.createElement(VersionsItemBadge, props));
  };

  describe('render', function () {
    test('should match its snapshot', function () {
      var wrapper = getWrapper({
        versionNumber: '1'
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
});