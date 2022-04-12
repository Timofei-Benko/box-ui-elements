function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import CollaboratorAvatarItem from '../CollaboratorAvatarItem';
describe('features/collaborator-avatars/CollaboratorAvatarItem', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(CollaboratorAvatarItem, _extends({
      id: 1,
      name: "foo bar"
    }, props)));
  };

  describe('render()', function () {
    test('should render default component', function () {
      var wrapper = getWrapper();
      expect(wrapper).toMatchSnapshot();
    });
    test('should render custom avatar', function () {
      var wrapper = getWrapper({
        hasCustomAvatar: true,
        avatarUrl: 'http://foo.bar'
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render avatar with expiration if we allow badging', function () {
      var wrapper = getWrapper({
        allowBadging: true,
        expiration: {
          executeAt: 'January 1, 2009'
        }
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should not render badges with expiration, but badging not allowed', function () {
      var wrapper = getWrapper({
        allowBadging: false,
        expiration: {
          executeAt: 'January 1, 2009'
        }
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should not render badges with expiration lacking an execution date value', function () {
      var wrapper = getWrapper({
        allowBadging: true,
        expiration: {
          executeAt: null
        }
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render avatar with external collab if all preconditions are met', function () {
      var wrapper = getWrapper({
        allowBadging: true,
        isExternalCollab: true,
        email: 'test@example.org',
        expiration: {
          executeAt: null
        }
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should not render avatar if badges are disabled', function () {
      var wrapper = getWrapper({
        allowBadging: false,
        isExternalCollab: true,
        email: 'test@example.org',
        expiration: {
          executeAt: null
        }
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should not render if external collab is disabled', function () {
      var wrapper = getWrapper({
        allowBadging: true,
        isExternalCollab: false,
        email: 'test@example.org',
        expiration: {
          executeAt: null
        }
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
});