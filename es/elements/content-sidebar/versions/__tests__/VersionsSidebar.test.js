function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { shallow } from 'enzyme/build';
import InlineError from '../../../../components/inline-error';
import messages from '../messages';
import VersionsMenu from '../VersionsMenu';
import VersionsSidebar from '../VersionsSidebar';
import PlainButton from '../../../../components/plain-button/PlainButton';
jest.mock('../../../common/nav-button', function () {
  return {
    BackButton: function BackButton() {
      return React.createElement("button", {
        type: "button"
      }, "Back");
    }
  };
});
describe('elements/content-sidebar/versions/VersionsSidebar', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(VersionsSidebar, _extends({
      parentName: "activity"
    }, props)));
  };

  describe('render', function () {
    test('should show the versions list if no error prop is provided', function () {
      var wrapper = getWrapper({
        versions: [{
          id: '12345'
        }]
      });
      expect(wrapper.exists(InlineError)).toBe(false);
      expect(wrapper.exists(VersionsMenu)).toBe(true);
      expect(wrapper).toMatchSnapshot();
    });
    test('should show an inline error if the prop is provided', function () {
      var wrapper = getWrapper({
        error: messages.versionFetchError,
        errorTitle: messages.versionServerError,
        versions: []
      });
      expect(wrapper.exists(InlineError)).toBe(true);
      expect(wrapper).toMatchSnapshot();
    });
    test('should show an upsell inline error if the errorUpsell prop is provided', function () {
      var wrapper = getWrapper({
        error: messages.versionNotAvailable,
        errorTitle: messages.versionAccessError,
        onUpgradeClick: function onUpgradeClick() {},
        versions: []
      });
      expect(wrapper.exists(InlineError)).toBe(true);
      expect(wrapper.exists(PlainButton)).toBe(true);
    });
    test('should show max versions text if max versions provided', function () {
      var versions = Array.from({
        length: 1000
      }).map(function (item, index) {
        return {
          id: index
        };
      });
      var wrapper = getWrapper({
        versions: versions
      });
      expect(wrapper.exists('[data-testid="max-versions"]')).toBe(true);
    });
  });
});